//XXX: detect handlers by userAgent/device

define(function(require) {
	var KeyHandlers = require("games/sokoban/handlers/keyHandlers");
	var TouchHandlers = require("games/sokoban/handlers/pixi_touchHandlers");

	var Handlers = function(stage, commandList) {
		this.stage = stage;
		this.commandList = commandList;
		this.touchHandlers = new TouchHandlers( commandList, stage );
		this.keyHandlers = new KeyHandlers( commandList, stage );
	};

	$.extend(Handlers.prototype, {

		"init": function() {
			//XXX: consider if needed mouse & touch handling separation
		},

		"refresh": function(room) {
			this.keyHandlers && this.keyHandlers.refresh(room.logic);
			this.touchHandlers && this.touchHandlers.refresh(room.logic);
		}

	});

	return Handlers;
});

