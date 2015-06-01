//XXX: detect handlers by userAgent/device

define(function(require) {
	var KeyHandlers = require("sokoban/handlers/keyHandlers");
	var TouchHandlers = require("sokoban/handlers/touchHandlers");
	var CommandList = require("sokoban/commandList");

	var Handlers = function(stage, commandList) {
		this.stage = stage;
		this.commandList = new CommandList();

		this.touchHandlers = new TouchHandlers( this.commandList, stage );
		this.keyHandlers = new KeyHandlers( function(){return;} );

		this.keyHandlers.action.add(this.handleAction, this);

	};

	$.extend(Handlers.prototype, {

		"refresh": function(room) {
			this.room = room;
			this.keyHandlers && this.keyHandlers.refresh(room.logic);
			this.touchHandlers && this.touchHandlers.refresh(room.logic);
		}

	});

	Handlers.prototype.handleAction = function(eData){
		switch(eData.action){
			case "move":
			var action = this.room.logic.getActionData(eData.direction);
			if ( action ){
				this.commandList.addCommand( action );
			}
			break;

			case "undo":
			this.commandList.goBack();
			break;

			case "redo":
			this.commandList.goForward();
			break;

			case "revertAll":
			this.commandList.revertAll();
			break;

			default:
			return;
		}
		var moves = this.commandList.moves;
		var pushes = this.commandList.pushes;
		this.room.records.update(moves, pushes);
	};

	return Handlers;
});

