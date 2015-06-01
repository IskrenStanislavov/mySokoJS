//xsb format: http://sokosolve.sourceforge.net/FileFormatXSB.html

define(function(require) {

	var Room  		 = require("sokoban/roomEASEL");
	var IntroRoom 	 = require("sokoban/introRoomEASEL");
	var LevelsLoader = require("sokoban/levels/levelsLoader");

	var LevelsContainer = function() {
		createjs.Container.call(this);
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
		this.W = 1024;
		this.H = 768;
	};

	LevelsContainer.prototype = Object.create(createjs.Container.prototype);

	LevelsContainer.prototype.markAsSolved = function() {
		console.log("level solved");
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
		this.W = levelRoom.W + 200;
		this.H = levelRoom.H;
		this.currentLevelObject = this.addChild(levelRoom);
		levelRoom.handlers.refresh(levelRoom.logic, this.parent);
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
