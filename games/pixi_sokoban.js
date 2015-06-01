define(function(require) {
	var RoomsContainer 	= require("games/sokoban/pixi_rooms");
	var Stage  			= require("libs/custom_stage");
    var PIXI        	= require("libs/pixi");

	var Sokoban = function(){
		Stage.call(this, {
			debugBG: true,
			contextMenu: false,
			stageColor: "black",
			canvasId: "game"
		});
		this.addChild(new RoomsContainer());
	};

	Sokoban.prototype = Object.create(Stage.prototype);

	return Sokoban;
});

