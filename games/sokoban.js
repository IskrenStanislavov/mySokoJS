define(function(require) {
	var Levels = require("games/sokoban/levels");
	var tiles  = require("games/sokoban/tiles");
	var Stage  = require("libs/stage");

	var Sokoban = function(){
		this.init();
	};

	Sokoban.symbols = {
		'iso': {
			'P': 'player',
			'W': 'wall',
			' ': 'empty',
			'B': 'box',
			'+': 'target+box',
			'-': 'target-box',
			';': 'new line',
		},
		'xsb': {
			'@': 'player',
			'#': 'wall',
			' ': 'empty',
			'$': 'box',
			'*': 'target+box',
			'.': 'target-box',
			'|': 'new line',
		}
	};

	Sokoban.simpleLevel = "WWWW;WP+W;WWWW";
	Sokoban.tileConfig = {
		'width': 50,
		'height':50,
	};
	Sokoban.levelsCollections = {
		"./games/sokoban/levels.json": 'iso',
		"./games/sokoban/niveles_homs.json": 'xsb',
		"./games/sokoban/levels_erim_sever.json": 'xsb',
	};

	Sokoban.prototype.init = function() {
		// this.tileConfig = Sokoban.tileConfig;
		this.stage = new Stage();
		this.levels = new Levels(Sokoban.levelsCollections);
	};

	Sokoban.prototype.start = function(data) {
		tiles.build(Sokoban.tileConfig);
		var test = new tiles.Tile({
			"row": 0,
			"column":1,
			"kind":"wall",
		});
		// console.error(test);
 		this.stage.add(test);
	};

	return Sokoban;
});

