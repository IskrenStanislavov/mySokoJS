//XXX: detect handlers by userAgent/device

define(function(require) {
	var KeyHandlers = require("games/sokoban/handlers/keyHandlers");
	var TouchHandlers = require("games/sokoban/handlers/touchHandlers");
	var MouseHandlers = require("games/sokoban/handlers/mouseHandlers");

	var Handlers = function(stage, commandList) {
		this.stage = stage;
		this.commandList = commandList;
		this.touchHandlers = new TouchHandlers( commandList, stage );
		// this.mouseHandlers = new MouseHandlers( commandList, stage );
		this.keyHandlers = new KeyHandlers( commandList );
		this.init();
	};

	$.extend(Handlers.prototype, {

		"init": function() {
			//XXX: consider if needed mouse & touch handling separation
			this.keyHandlers && this.keyHandlers.init();
			this.touchHandlers && this.touchHandlers.init();
			// this.mouseHandlers && this.mouseHandlers.init();
		},

		"refresh": function(room) {
			this.keyHandlers && this.keyHandlers.refresh(room.logic);
			this.touchHandlers && this.touchHandlers.refresh(room.logic);
			// this.mouseHandlers && this.mouseHandlers.refresh(room.logic);
		}

	});

	return Handlers;
});

