//xsb format: http://sokosolve.sourceforge.net/FileFormatXSB.html

define(function(require) {
	var BaseLevel   = require("games/sokoban/baseLevel");

	var config = {
		'collectionsToLoad': 1,
		'collections': [
			{"path":   "games/sokoban/levels/collections/niveles_homs.json",
			"parseData": function(data){
				Object.keys(data.niveles).forEach(function( levelName, index ) {
					this.levels.push( new BaseLevel({
						author: data.autorDeNivel,
						collectionName: data.nombreDeNivel,
						rawString: data.niveles[levelName],
						format: "xsb",
						levelName: levelName
					}));
				}.bind(this));


				localStorage.setItem("gameLevels", JSON.stringify(this.levels));
				this.collectionsToLoad -= 1;
				this.collectionsToLoad === 0 && this.onLoadCallback && this.onLoadCallback(this.levels);
			}},
			{"path":   "games/sokoban/levels/collections/levels_erim_sever.json",
			"format": "xsb",
			"parseData": function(data){
						// that.levels.push(new Level(data[key]));
				return;
			}}
		],
	};

	var LevelsLoader = function(settings){
		this.levels = settings.accumulateIn;
		this.onLoadCallback = settings.onComplete;
		if ( !localStorage.getItem("levelsPackagesLoaded", 0) ){
			this.load();
		} else {
			this.levels.push.apply(this.levels, JSON.parse(localStorage.getItem("gameLevels")));
			this.levels = this.levels.map(function(level){
				return new BaseLevel(level);
			});
			return this.levels;
		}
	};

	LevelsLoader.prototype.load = function(){
		this.collectionsToLoad = config.collectionsToLoad;
		var that = this;
		config.collections.forEach(function(collection, ix) {
			$.getJSON(collection.path, collection.parseData.bind(that) );
		});
	}

	return LevelsLoader;
});
