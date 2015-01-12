
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


	var Levels = function( levels_data ) {
		this.testLevel = new Level("Isko", "test", testLevelData, "iso");
		this.levels = [];
		this.collections = [
			// {"path":   "games/sokoban/levels/levels_iskren.json", "format": "iso", "parseData": 
			// function(data){
			// 	return;
			// }.bind(this)},
			{"path":   "games/sokoban/levels/niveles_homs.json",
			"parseData": function(data){
				var author = data.autorDeNivel;
				var collectionName = data.nombreDeNivel;
				Object.keys(data.niveles).forEach(function( levelName, index ) {
					this.levels.push( new Level(author, collectionName, data.niveles[levelName], "xsb", levelName) );
				}.bind(this));
				return;
			}.bind(this)},
			{"path":   "games/sokoban/levels/levels_erim_sever.json",
			"format": "xsb",
			"parseData": function(data){
						// that.levels.push(new Level(data[key]));
				return;
			}.bind(this)}
		];
		this.init();
	};



	Levels.prototype.init = function() {
		var that = this;
		this.collections.forEach(function(collection, ix) {
			console.warn(collection.path);
			$.getJSON(collection.path, collection.parseData );
		});

	};

	Levels.prototype.getLevel = function(index){
		if ( !~index ) { //-1
			return this.testLevel;
		}
		return this.levels[index];
	};

	return Levels;
});

