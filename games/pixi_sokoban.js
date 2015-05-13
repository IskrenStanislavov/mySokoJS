define(function(require) {
	var LevelsContainer = require("games/sokoban/pixi_levelsContainer");
	var Stage  			= require("libs/custom_stage");
    var PIXI        	= require("libs/pixi");

	var Sokoban = function(){
		Stage.call(this, {
			debugBG: true,
			contextMenu: false,
			stageColor: "black",
			canvasId: "game"
		});
		// var Handlers = require("games/sokoban/pixi_handlers");
		// var CommandList = require("games/sokoban/commandList");

		// that.currentLevel = that.addChild(new Room(that.levels.getLevelData()));
		// that.handlers = new Handlers(that, that.commandList);
		// that.commandList.reset(that.currentLevel.records);
		// that.handlers.refresh(that.currentLevel);
		this.addChild(new LevelsContainer());

	};

	Sokoban.prototype = Object.create(Stage.prototype);

	return Sokoban;
});

