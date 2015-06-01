//XXX: detect handlers by userAgent/device

define(function(require) {
	var KeyHandlers = require("sokoban/handlers/keyHandlers");
	var TouchHandlers = require("sokoban/handlers/touchHandlers");

	var Handlers = function(commandList, callback) {
		this.touchHandlers = new TouchHandlers( commandList, callback );
		this.keyHandlers = new KeyHandlers( callback );
	};

	Handlers.prototype.refresh = function(logic, stage) {
		this.touchHandlers && this.touchHandlers.refresh(logic, stage);
	};

	return Handlers;
});

