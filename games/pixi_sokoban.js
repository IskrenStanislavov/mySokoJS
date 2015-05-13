define(function(require) {
	var Levels = require("games/sokoban/pixi_levels");
	var Stage  = require("libs/custom_stage");
    var PIXI        = require("libs/pixi");

	var Sokoban = function(){
		Stage.call(this);
		this.addChild(PIXI.Sprite.fromFrame("player_normal"));
		this.levels = this.addChild(new Levels(this.start.bind(this)));

	};

	Sokoban.prototype = Object.create(Stage.prototype);

	Sokoban.prototype.start = function() {
		var that = this;
		// var Handlers = require("games/sokoban/pixi_handlers");
		// var CommandList = require("games/sokoban/commandList");

		// that.currentLevel = that.addChild(new Room(that.levels.getLevelData()));
		// that.handlers = new Handlers(that, that.commandList);
		// that.commandList.reset(that.currentLevel.records);
		// that.handlers.refresh(that.currentLevel);
		that.currentLevel = that.levels.next();
		that.setAutoFit({
			W: that.currentLevel.width,
			H: that.currentLevel.height
		});
		that.resize();
		var solveCheck = setInterval(function(){
			if ( that.currentLevel.logic.checkForSolved() ){
				clearInterval(solveCheck);
				setTimeout(function(){
					that.levels.markAsSolved();
					that.start();
				},1000);
			};
		}, 500);
	};

	return Sokoban;
});

