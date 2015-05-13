//xsb format: http://sokosolve.sourceforge.net/FileFormatXSB.html

define(function(require) {
    var PIXI        = require("libs/pixi");
	var BaseLevel   = require("games/sokoban/pixi_base_level");

	var config = {
		'collectionsToLoad': 1,
		'collections': [
			{"path":   "games/sokoban/levels/niveles_homs.json",
			"parseData": function(data){
				var author = data.autorDeNivel;
				var collectionName = data.nombreDeNivel;
				Object.keys(data.niveles).forEach(function( levelName, index ) {
					this.levels.push( new BaseLevel(author, collectionName, data.niveles[levelName], "xsb", levelName) );
				}.bind(this));


				localStorage.setItem("gameLevels", JSON.stringify(this.levels));
				this.collectionsToLoad -= 1;
				this.collectionsToLoad === 0 && this.onLoadCallback && this.onLoadCallback(this.levels);
			}},
			{"path":   "games/sokoban/levels/levels_erim_sever.json",
			"format": "xsb",
			"parseData": function(data){
						// that.levels.push(new Level(data[key]));
				return;
			}}
		],
	};

		// this.loader = new LevelsLoader({
		// 	accumulateIn: this.levels,
		// 	onComplete: function(loadedLevels){
		// 		console.log("loadedLevels", loadedLevels);
		// 		this.levels = loadedLevels;
		// 		this.initLevelSolvedCheck();
		// 		this.start();
		// 	}.bind(this)
		// });

	var LevelsLoader = function(settings){
		this.accumulateIn = settings.accumulateIn;
		this.onLoadCallback = settings.onComplete;
		if ( !localStorage.getItem("levelsPackagesLoaded", 0) ){
			this.load();
		} else {
			this.levels = JSON.parse(localStorage.getItem("gameLevels",null));
			return this.levels
		}
	};

	LevelsLoader.prototype.load = function(){
		this.collectionsToLoad = config.collectionsToLoad;
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
	}

	return LevelsLoader;
});
