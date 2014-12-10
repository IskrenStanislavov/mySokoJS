
define(function(require) {
	var KeyHandlers = require("games/sokoban/handlers/keyHandlers");
	var TouchHandlers = require("games/sokoban/handlers/touchHandlers");
	var MouseHandlers = require("games/sokoban/handlers/mouseHandlers");

	var Handlers = function(stage, commandList) {
		this.stage = stage;
		this.commandList = commandList;
		if ( createjs.Touch.isSupported() ){
			this.touchHandlers = new TouchHandlers( commandList, stage );
		} else {
			this.keyHandlers = new KeyHandlers( commandList );
			this.mouseHandlers = new MouseHandlers( commandList, stage );
		}
		this.init();
	};

	$.extend(Handlers.prototype, {

		"init": function() {
			this.keyHandlers && this.keyHandlers.init();
			this.touchHandlers && this.touchHandlers.init();
			this.mouseHandlers && this.mouseHandlers.init();
			//XXX: interesting will be mouse & touch handling separation
		},

		"refresh": function() {
			this.keyHandlers && this.keyHandlers.refresh();
			this.touchHandlers && this.touchHandlers.refresh();
			this.mouseHandlers && this.mouseHandlers.refresh();
		}

	});

	return Handlers;
});

