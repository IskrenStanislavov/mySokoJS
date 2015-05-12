define(function(require) {
	var Levels = require("games/sokoban/pixi_levels");
	var Stage  = require("libs/custom_stage");
	var Handlers = require("games/sokoban/pixi_handlers");
	// var CommandList = require("games/sokoban/commandList");
    var PIXI        = require("libs/pixi");

	var Sokoban = function(){
		Stage.call(this);
		this.addChild(PIXI.Sprite.fromFrame("player_normal"));
		var that = this;
		that.levels = that.addChild(new Levels(this.start.bind(this)));

	};

	Sokoban.prototype = Object.create(Stage.prototype);

	Sokoban.prototype.start = function() {
		var that = this;
		// that.currentRoom = that.addChild(new Room(that.levels.getLevelData()));
		// that.handlers = new Handlers(that, that.commandList);
		// that.commandList.reset(that.currentRoom.records);
		// that.handlers.refresh(that.currentRoom);
		that.currentRoom = that.levels.next();
		that.setAutoFit({
			W: that.currentRoom.width,
			H: that.currentRoom.height
		});
		that.resize();
		var solveCheck = setInterval(function(){
			if ( that.currentRoom.logic.checkForSolved() ){
				clearInterval(solveCheck);
				setTimeout(function(){
					that.removeChild(that.currentRoom);
					that.levels.markAsSolved();
					that.start();
				},1000);
			};
		}, 500);
	};

	return Sokoban;
});

