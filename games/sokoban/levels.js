//xsb format: http://sokosolve.sourceforge.net/FileFormatXSB.html

define(function(require) {
	var roomConfig  = require("games/sokoban/room/config");
	var BaseLevel  	= require("games/sokoban/baseLevel");
	var LevelsLoader = require("games/sokoban/levels/levelsLoader");

	var testLevelData = "WWWWWW;WP-B-W;WWWWWW";//test box on a target; n player on a target

	//for corner testing
	if (false){
		//cross & single edges
		testLevelData +=";      ";
		testLevelData +="; W    ";
		testLevelData +=";WWW   ";
		testLevelData +="; W    ";
		//T junction: right
		testLevelData +=";      ";
		testLevelData +="; W    ";
		testLevelData +=";WW    ";
		testLevelData +="; W    ";
		//T junction: left
		testLevelData +=";      ";
		testLevelData +="; W    ";
		testLevelData +="; WW   ";
		testLevelData +="; W    ";
		//T junction: bottom
		testLevelData +=";      ";
		testLevelData +="; W    ";
		testLevelData +=";WWW   ";
		//T junction: top
		testLevelData +=";      ";
		testLevelData +=";WWW   ";
		testLevelData +="; W    ";
	}

	var Levels = function( callback ) {
		// this.onLoadCallback = callback;
		this.currentLevel = -1;
		this.levels = [];
		var that = this;
		this.loader = new LevelsLoader({
			accumulateIn: this.levels,
			onComplete: function(loadedLevels){
				// this.levels = loadedLevels;
				callback&& callback();
			}.bind(this)
		});

	};

	Levels.prototype.markAsSolved = function() {
		if (this.currentLevel === -1){
			this.currentLevel = localStorage.getItem("currentLevel", 0) - 1;
		}
		this.currentLevel = (this.currentLevel + 1) % this.levels.length;
		localStorage.setItem("currentLevel", (this.currentLevel));
	};

	Levels.prototype.getLevelData = function(){
		var rawLevelData;
		if ( !~this.currentLevel ) { //-1
			rawLevelData = new BaseLevel({
				author: "Isko",
				collectionName: "intro",
				rawString: testLevelData,
				format: "iso",
				levelName: "IntroScreen"
			});
		} else {
			this.currentLevel = JSON.parse(localStorage.getItem("currentLevel", 0));
			rawLevelData = this.levels[this.currentLevel];
		}
		return rawLevelData;
	};

	return Levels;
});

