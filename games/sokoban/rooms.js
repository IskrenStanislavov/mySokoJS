//xsb format: http://sokosolve.sourceforge.net/FileFormatXSB.html

define(function(require) {
	var roomConfig   = require("games/sokoban/room/config");
	var IntroRoom    = require("games/sokoban/introRoom");
	var LevelsLoader = require("games/sokoban/levels/levelsLoader");

	var Levels = function( callback ) {
		// this.onLoadCallback = callback;
		this.currentLevel = -1;
		this.levels = [];
		var that = this;
		this.loader = new LevelsLoader({
			accumulateIn: this.levels,
			onComplete: function(loadedLevels){
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
		var baseLevel;
		if ( !~this.currentLevel ) { //-1
			baseLevel = new IntroRoom();
		} else {
			this.currentLevel = JSON.parse(localStorage.getItem("currentLevel", 0));
			baseLevel = this.levels[this.currentLevel];
		}
		return baseLevel;
	};

	return Levels;
});

