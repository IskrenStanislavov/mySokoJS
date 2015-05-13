//xsb format: http://sokosolve.sourceforge.net/FileFormatXSB.html

define(function(require) {
    var PIXI       	 = require("libs/pixi");
	var Room  		 = require("games/sokoban/pixi_level");
	var BaseLevel  	 = require("games/sokoban/pixi_base_level");
	var LevelsLoader = require("games/sokoban/levels/pixi_levelsLoader");


	var config = LevelsLoader
		


	var LevelsContainer = function() {
		PIXI.DisplayObjectContainer.call(this);
		this.onLoadCallback = callback = function(){
			this.initLevelSolvedCheck();
			this.start();
		}.bind(this);

		this.collectionsToLoad = config.collectionsToLoad;
		this.levels = JSON.parse(localStorage.getItem("gameLevels",null));
		if ( !this.levels || !this.levels.length ) {
			this.levels = [];
			var that = this;
			config.collections.forEach(function(collection, ix) {
				$.getJSON(collection.path, collection.parseData.bind(that) );
			});
		} else {
			setTimeout(function(){
				callback && callback();
			},500);
		}

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
		localStorage.setItem("currentLevel", (this.currentLevel+1)%this.levels.length);
		this.removeChild(this.currentLevelObject);

	};

	LevelsContainer.prototype.start = function(){
		this.currentLevel = JSON.parse(localStorage.getItem("currentLevel") || -1);
		console.log("level:", this.currentLevel);
		if ( !~this.currentLevel ) { //-1
			return this.addChild(new Room(config.testLevel));
		}
		this.children.length=0;

		this.currentLevelObject = this.addChild(new Room(this.levels[this.currentLevel]));
		return this.currentLevelObject;
	};

	LevelsContainer.prototype.next = function(){
		this.markAsSolved();
		this.start();
	};

	return LevelsContainer;
});
