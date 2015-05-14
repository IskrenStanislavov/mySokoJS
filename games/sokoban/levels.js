//xsb format: http://sokosolve.sourceforge.net/FileFormatXSB.html

define(function(require) {
	var roomConfig  = require("games/sokoban/room/config");
	var BaseLevel  	= require("games/sokoban/baseLevel");

	var testLevelData = "WWWWWW;WP B-W;WWWWWW";//solvable
	if (true){
		testLevelData = "WWWWWW;WP-B-W;WWWWWW";//test box on a target; n player on a target
	}
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

	var config = {
		'collectionsToLoad': 1,
		'testLevel': new BaseLevel("Isko", "intro", testLevelData, "iso"),
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
						// that.levels.push(new BaseLevel(data[key]));
				return;
			}}
		],
	};
		


	var Levels = function( callback ) {
		this.onLoadCallback = callback;
		this.currentLevel = -1;
	};

	Levels.prototype.load = function() {
		this.collectionsToLoad = config.collectionsToLoad;
		this.levels = JSON.parse(localStorage.getItem("gameLevels",null));
		if ( !this.levels || !this.levels.length ) {
			this.levels = [];
			var that = this;
			config.collections.forEach(function(collection, ix) {
				$.getJSON(collection.path, collection.parseData.bind(that) );
			});
		} else {
			this.onLoadCallback && this.onLoadCallback();
		}

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
			rawLevelData = config.testLevel;
		} else {
			this.currentLevel = JSON.parse(localStorage.getItem("currentLevel") || 0);
			rawLevelData = this.levels[this.currentLevel];
		}
		return rawLevelData;
	};

	return Levels;
});

