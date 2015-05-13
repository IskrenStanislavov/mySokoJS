//xsb format: http://sokosolve.sourceforge.net/FileFormatXSB.html

define(function(require) {
    var PIXI        = require("libs/pixi");
	var Room  		= require("games/sokoban/pixi_level");
	var BaseLevel   = require("games/sokoban/pixi_base_level");
	var TestLevel 	= require("games/sokoban/pixi_test_level");

	var config = {
		'collectionsToLoad': 1,
		'testLevel': new TestLevel(),
		'collections': [
			// {"path":   "games/sokoban/levels/levels_iskren.json", "format": "iso", "parseData": 
			// function(data){
			// 	return;
			// }},
			{"path":   "games/sokoban/levels/niveles_homs.json",
			"parseData": function(data){
				var author = data.autorDeNivel;
				var collectionName = data.nombreDeNivel;
				Object.keys(data.niveles).forEach(function( levelName, index ) {
					this.levels.push( new BaseLevel(author, collectionName, data.niveles[levelName], "xsb", levelName) );
				}.bind(this));


				localStorage.setItem("gameLevels", JSON.stringify(this.levels));
				this.collectionsToLoad -= 1;
				this.collectionsToLoad === 0 && this.onLoadCallback && this.onLoadCallback();
			}},
			{"path":   "games/sokoban/levels/levels_erim_sever.json",
			"format": "xsb",
			"parseData": function(data){
						// that.levels.push(new Level(data[key]));
				return;
			}}
		],
	};
		


	var Levels = function( callback ) {
		PIXI.DisplayObjectContainer.call(this);
		this.onLoadCallback = callback;

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
	Levels.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);

	Levels.prototype.markAsSolved = function() {
		localStorage.setItem("currentLevel", (this.currentLevel+1)%this.levels.length);
		this.removeChild(this.currentLevelObject);

	};

	Levels.prototype.start = function(){
		this.currentLevel = JSON.parse(localStorage.getItem("currentLevel") || -1);
		console.log("level:", this.currentLevel);
		if ( !~this.currentLevel ) { //-1
			return this.addChild(new Room(config.testLevel));
		}
		this.children.length=0;

		this.currentLevelObject = this.addChild(new Room(this.levels[this.currentLevel]));
		return this.currentLevelObject;
	};

	Levels.prototype.next = function(){
		this.markAsSolved();
		this.start();
	};

	return Levels;
});

