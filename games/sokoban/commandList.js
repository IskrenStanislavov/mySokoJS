// holds player's actions with undo & redo functionallity

define(function(require) {

	var CommandList = function() {
		this.position = -1;
		this.list = [];
		this.pushes = 0;
		this.moves = 0;
	};

	CommandList.prototype.reset = function( records ){
		this.actionsRecords = records;
		this.position = -1;
		this.clearFrom(0);
		this.pushes = 0;
		this.moves = 0;
		this.updateActionsInfo();
	};

	CommandList.prototype.updateActionsInfo = function() {
		this.actionsRecords.update(this.moves, this.pushes);
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
		this.updateActionsInfo();
	};

	CommandList.prototype.addDrags = function( dragCommands ) {
		if ( this.shouldReplace() ) {
			this.clearFrom( this.position + 1 );
		}
		this.list.push(dragCommands);

		this.moves += dragCommands.countMoves();
		this.pushes += dragCommands.countPushes();
		dragCommands.execute();
		this.position += 1;
		this.updateActionsInfo();
	};

	CommandList.prototype.goBack = function() {
		var command = this.list[this.position];
		this.moves -= command.countMoves();
		this.pushes -= command.countPushes();
		command.undo();
		this.position -= 1;
		this.updateActionsInfo();
	};

	CommandList.prototype.goForward = function() {
		this.position += 1;
		var command = this.list[this.position];
		this.moves += command.countMoves();
		this.pushes += command.countPushes();
		command.redo();
		this.updateActionsInfo();
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

