//xsb format: http://sokosolve.sourceforge.net/FileFormatXSB.html

define(function(require) {
    var PIXI        = require("libs/pixi");
	var Room  		= require("games/sokoban/pixi_level");
	var TestLevel 	= require("games/sokoban/pixi_test_level");

	var Level = function(author, collectionName, levelData, format, levelName) {
		// PIXI.DisplayObjectContainer.call(this);
		this.author = author;
		this.collection = collectionName;
		this.levelData = levelData;
		this.format = format;
		this.levelName = levelName;
		// this.data = level.data;
		// level.data = undefined;
	};
	// Level.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);

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
					this.levels.push( new Level(author, collectionName, data.niveles[levelName], "xsb", levelName) );
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
	};

	Levels.prototype.next = function(){
		this.currentLevel = JSON.parse(localStorage.getItem("currentLevel") || -1);
		console.log("level:", this.currentLevel);
		if ( !~this.currentLevel ) { //-1
			return this.addChild(new Room(config.testLevel));
		}
		this.children.length=0;

		return this.addChild(new Room(this.levels[this.currentLevel]));
	};

	return Levels;
});

