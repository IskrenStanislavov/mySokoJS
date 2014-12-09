
define(function(require) {
	var KeyHandlers = require("games/sokoban/handlers/keyHandlers");
	var TouchHandlers = require("games/sokoban/handlers/touchHandlers");

	var Handlers = function(stage, commandList) {
		this.stage = stage;
		this.commandList = commandList;
		this.keyHandlers = new KeyHandlers( commandList );
		this.touchHandlers = new TouchHandlers( commandList, stage );
		this.init();
	};

	$.extend(Handlers.prototype, {

		"init": function() {
			this.keyHandlers.init();
			this.touchHandlers.init();
			//XXX: interesting will be mouse & touch handling separation
		},

		"refresh": function() {
			this.keyHandlers.refresh();
			this.touchHandlers.refresh();
		}

	});

	return Handlers;
});

