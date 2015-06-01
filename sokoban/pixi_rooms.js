//xsb format: http://sokosolve.sourceforge.net/FileFormatXSB.html

define(function(require) {
    var PIXI       	 = require("libs/pixi");
	var Room  		 = require("sokoban/pixi_room");
	var IntroRoom 	 = require("sokoban/pixi_introRoom");
	var LevelsLoader = require("sokoban/levels/levelsLoader");

	var LevelsContainer = function() {
		PIXI.DisplayObjectContainer.call(this);
		this.currentLevel = -1;
		this.levels = [];
		var that = this;
		this.loader = new LevelsLoader({
			accumulateIn: this.levels,
			onComplete: function(loadedLevels){
				this.start(function(){
					setTimeout(function(){
						that.next();
					},1000);
				});
			}.bind(this)
		});

	};
			

	LevelsContainer.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);

	LevelsContainer.prototype.markAsSolved = function() {
		if (this.currentLevel === -1){
			this.currentLevel = localStorage.getItem("currentLevel", 0) - 1;
		}
		this.currentLevel = (this.currentLevel + 1) % this.levels.length;
		localStorage.setItem("currentLevel", (this.currentLevel));
	};

	LevelsContainer.prototype.start = function(callback){
		var levelRoom;
		if ( !~this.currentLevel ) { //-1
			levelRoom = new IntroRoom(callback);
		} else {
			this.currentLevel = JSON.parse(localStorage.getItem("currentLevel") || 0);
			levelRoom = new Room(this.levels[this.currentLevel], callback);
		}
		this.currentLevelObject = this.addChild(levelRoom);
		return this.currentLevelObject;
	};

	LevelsContainer.prototype.next = function(){
		this.markAsSolved();
		this.removeChild(this.currentLevelObject);
		var that = this;
		this.start(function(){
			setTimeout(function(){
				that.next();
			},1000);
		});
	};

	return LevelsContainer;
});
