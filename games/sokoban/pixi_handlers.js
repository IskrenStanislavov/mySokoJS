//XXX: detect handlers by userAgent/device

define(function(require) {
	var KeyHandlers 	= require("games/sokoban/handlers/keyHandlers");
	var TouchHandlers 	= require("games/sokoban/handlers/pixi_touchHandlers");

	var Handlers = function(commandList, logic, callback) {
		this.touchHandlers 	= new TouchHandlers( commandList, logic, callback );
		this.keyHandlers 	= new KeyHandlers( commandList, callback );
		this.keyHandlers.refresh(logic);
	};

	return Handlers;
});

