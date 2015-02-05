
define(function(require) {
	var Level = function(author, collectionName, levelData, format, levelName) {
		this.author = author;
		this.collection = collectionName;
		this.levelData = levelData;
		this.format = format;
		this.levelName = levelName;
		// this.data = level.data;
		// level.data = undefined;
		
	};
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
		'testLevel': new Level("Isko", "test", testLevelData, "iso"),
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
		this.onLoadCallback = callback;
	};

	Levels.prototype.load = function() {
		this.collectionsToLoad = config.collectionsToLoad;
		this.levels = JSON.parse(localStorage.getItem("gameLevels",null));
		if ( !this.levels || !this.levels.length ) {
			this.levels = [];
			var that = this;
			config.collections.forEach(function(collection, ix) {
				console.warn(collection.path);
				$.getJSON(collection.path, collection.parseData.bind(that) );
			});
		} else {
			this.onLoadCallback && this.onLoadCallback();
		}

	};

	Levels.prototype.getLevel = function(index){
		if ( !~index ) { //-1
			return config.testLevel;
		}
		return this.levels[index];
	};

	return Levels;
});

