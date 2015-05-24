define(function(require) {
	var Levels = require("games/sokoban/levels");
	var Room  = require("games/sokoban/room");
	var Stage  = require("libs/stage");
	var Handlers = require("games/sokoban/handlers");
	var CommandList = require("games/sokoban/commandList");
	var TileFactory = require('games/sokoban/tiles');

	var Sokoban = function(){
		Stage.call(this, "game", {"showBG":true});
		this.init();
	};

	Sokoban.prototype = Object.create(Stage.prototype);

	Sokoban.prototype.init = function() {
		this.commandList = new CommandList();
		this.tileFactory = new TileFactory();
		this.handlers = new Handlers(this, this.commandList);
		this.levels = new Levels(function(){
			this.start();
		}.bind(this));
		this.levels.load();
	};

	Sokoban.prototype.start = function() {
		var level = this.levels.getLevelData();
		this.currentRoom = this.addChild(new Room( level, this.tileFactory ));

		this.setAutoFit(this.currentRoom);
		this.resize();

		this.commandList.reset(this.currentRoom.records);
		this.handlers.refresh(this.currentRoom);

		var that = this;
		var solveCheck = setInterval(function(){
			if ( that.currentRoom.isSolved() ){
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

