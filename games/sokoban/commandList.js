// holds player's actions with undo & redo functionallity

define(function(require) {
	var Signal = require('libs/signals.min');

	var CommandList = function() {
		this.position = -1;
		this.list = [];
		this.pushes = 0;
		this.moves = 0;
		this.modified = new Signal();
	};

	CommandList.prototype.reset = function(){
		this.position = -1;
		this.clearFrom(0);
		this.pushes = 0;
		this.moves = 0;
		this.modified.dispatch(this.moves, this.pushes);
	};

	CommandList.prototype.addCommand = function( command ) {
		if ( this.shouldReplace() ) {
			this.cleanUp();
		}
		this.list.push(command);

		this.moves += command.countMoves();
		this.pushes += command.countPushes();
		command.execute();
		this.position += 1;
		this.modified.dispatch(this.moves, this.pushes);
	};

	CommandList.prototype.goBack = function() {
		if ( !this.canMakeUndo() ){
			return;
		}
		this.rawUndo();
	};

	CommandList.prototype.rawUndo = function() {
		var command = this.list[this.position];
		this.moves -= command.countMoves();
		this.pushes -= command.countPushes();
		command.undo();
		this.position -= 1;
		this.modified.dispatch(this.moves, this.pushes);
	};

	CommandList.prototype.cleanUp = function() {
		this.clearFrom( this.position + 1 );
	};

	CommandList.prototype.goForward = function() {
		if ( !this.canMakeRedo() ){
			return;
		}
		this.position += 1;
		var command = this.list[this.position];
		this.moves += command.countMoves();
		this.pushes += command.countPushes();
		command.redo();
		this.modified.dispatch(this.moves, this.pushes);
	};

	CommandList.prototype.shouldReplace = function( ) {
		return this.position !== this.list.length-1;
	};

	CommandList.prototype.clearFrom = function( forgetFromIndex ) {
		// inspired by http://www.untitleddesigns.com/2011/javascript-replace-array-contents/
		// var newListState = this.list.splice(forgetFromIndex, this.length - forgetFromIndex);
		// this.list.length = 0;
		// Array.prototype.push.apply(this.list, newListState);
		// and shortened to:
		this.list.length = forgetFromIndex;
	};

	CommandList.prototype.canMakeUndo = function( ) {
		return this.list.length > 0 && this.position >= 0 && !this.list[this.position].inProgress;
	};

	CommandList.prototype.canMakeRedo = function( ) {
		return this.list.length-1 > this.position;
	};

	CommandList.prototype.revertAll = function( ) {
		while ( this.canMakeUndo() ){
			this.rawUndo();
		}
	};

	return CommandList;
});

