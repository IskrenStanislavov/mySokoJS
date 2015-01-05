// holds player's actions with undo & redo functionallity

define(function(require) {

	var DomRecord = require("games/sokoban/DOM/records");

	var CommandList = function(  ) {
		this.position = -1;
		this.list = [];
		this.pushes = 0;
		this.moves = 0;
		this.domRecord = new DomRecord();
	};

	CommandList.prototype.reset = function(){
		this.position = -1;
		this.clearFrom(0);
		this.pushes = 0;
		this.moves = 0;
	};

	CommandList.prototype.updateMovesInfo = function( command ) {
		this.domRecord.update(this.moves, this.pushes);
	};

	CommandList.prototype.addCommand = function( command ) {
		if ( this.shouldReplace() ) {
			this.clearFrom( this.position + 1 );
		}
		this.list.push(command);

		this.moves += command.countMoves();
		this.pushes += command.countPushes();
		command.execute();
		this.position += 1;
		this.updateMovesInfo();
	};

	CommandList.prototype.goBack = function() {
		var command = this.list[this.position];
		this.moves -= command.countMoves();
		this.pushes -= command.countPushes();
		command.undo();
		this.position -= 1;
		this.updateMovesInfo();
	};

	CommandList.prototype.goForward = function() {
		this.position += 1;
		var command = this.list[this.position];
		this.moves += command.countMoves();
		this.pushes += command.countPushes();
		command.redo();
		this.updateMovesInfo();
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
		return this.list.length > 0 && this.position >= 0;
	};

	CommandList.prototype.canMakeRedo = function( ) {
		return this.list.length-1 > this.position;
	};


	return CommandList;
});

