//XXX: detect handlers by userAgent/device

define(function(require) {
	var KeyHandlers = require("games/sokoban/handlers/keyHandlers");
	var TouchHandlers = require("games/sokoban/handlers/touchHandlers");

	var Handlers = function(stage, commandList) {
		this.stage = stage;
		this.commandList = commandList;
		this.touchHandlers = new TouchHandlers( commandList, stage );
		this.keyHandlers = new KeyHandlers( commandList, stage );
		this.init();
	};

	$.extend(Handlers.prototype, {

		"init": function() {
			//XXX: consider if needed mouse & touch handling separation
			this.keyHandlers && this.keyHandlers.init();
			this.touchHandlers && this.touchHandlers.init();
		},

		"refresh": function(room) {
			this.keyHandlers && this.keyHandlers.refresh(room.logic);
			this.touchHandlers && this.touchHandlers.refresh(room.logic);
		}

	});

	return Handlers;
});

