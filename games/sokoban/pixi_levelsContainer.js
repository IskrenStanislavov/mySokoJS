//xsb format: http://sokosolve.sourceforge.net/FileFormatXSB.html

define(function(require) {
    var PIXI       	 = require("libs/pixi");
	var Room  		 = require("games/sokoban/pixi_room");
	var IntroRoom 	 = require("games/sokoban/pixi_intro_room");
	var LevelsLoader = require("games/sokoban/levels/pixi_levelsLoader");

	var LevelsContainer = function() {
		PIXI.DisplayObjectContainer.call(this);
		this.currentLevel = -1;
		this.levels = [];
		this.loader = new LevelsLoader({
			accumulateIn: this.levels,
			onComplete: function(loadedLevels){
				console.log("loadedLevels", loadedLevels);
				this.levels = loadedLevels;
				this.initLevelSolvedCheck();
				this.start();
			}.bind(this)
		});

	};
			

	LevelsContainer.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);

	LevelsContainer.prototype.initLevelSolvedCheck = function() {
		var that = this;
		setInterval(function(){
			if ( that.currentLevelObject.logic.checkForSolved() ){
				setTimeout(function(){
					that.next();
				},1000);
			};
		}, 500);


	};

	LevelsContainer.prototype.markAsSolved = function() {
		if (this.currentLevel === -1){
			this.currentLevel = localStorage.getItem("currentLevel", 0) - 1;
		}
		this.currentLevel = (this.currentLevel + 1) % this.levels.length;
		localStorage.setItem("currentLevel", (this.currentLevel));
	};

	LevelsContainer.prototype.start = function(){
		var levelRoom;
		if ( !~this.currentLevel ) { //-1
			levelRoom = new IntroRoom();
		} else {
			this.currentLevel = JSON.parse(localStorage.getItem("currentLevel") || 0);
			levelRoom = new Room(this.levels[this.currentLevel]);
		}
		this.currentLevelObject = this.addChild(levelRoom);
		return this.currentLevelObject;
	};

	LevelsContainer.prototype.next = function(){
		this.markAsSolved();
		this.removeChild(this.currentLevelObject);
		this.start();
	};

	return LevelsContainer;
});
