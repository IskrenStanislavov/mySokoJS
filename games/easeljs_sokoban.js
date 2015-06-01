define(function(require) {
	var LevelsContainer = require("games/sokoban/pixi_levelsContainer");
	var Stage  			= require("libs/custom_stage");
    var PIXI        	= require("libs/pixi");

	var Sokoban = function(){
		Stage.call(this, "game", {"showBG":true});

		// Stage.call(this, {
		// 	debugBG: true,
		// 	contextMenu: false,
		// 	stageColor: "black",
		// 	canvasId: "game"
		// });
		this.addChild(new LevelsContainer());
	};

	Sokoban.prototype = Object.create(Stage.prototype);

	return Sokoban;
});

