//xsb format: http://sokosolve.sourceforge.net/FileFormatXSB.html

define(function(require) {
    var PIXI       	 = require("libs/pixi");
	var Room  		 = require("games/sokoban/pixi_level");
	var BaseLevel  	 = require("games/sokoban/pixi_base_level");
	var TestLevel 	 = require("games/sokoban/pixi_test_level");
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
		var rawLevelData;
		if ( !~this.currentLevel ) { //-1
			rawLevelData = new TestLevel();
		} else {
			this.currentLevel = JSON.parse(localStorage.getItem("currentLevel") || 0);
			console.log("level:", this.currentLevel);
			rawLevelData = this.levels[this.currentLevel];
		}
		this.currentLevelObject = this.addChild(new Room(rawLevelData));
		return this.currentLevelObject;
	};

	LevelsContainer.prototype.next = function(){
		this.markAsSolved();
		this.removeChild(this.currentLevelObject);
		this.start();
	};

	return LevelsContainer;
});
