define(function(require) {
	var Levels = require("games/sokoban/levels");
	var tiles  = require("games/sokoban/tiles");
	var Tray  = require("games/sokoban/tray");
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

	Sokoban.simpleLevel = "WWWWW;WPB-W;WWWWW";
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
		var tray = new Tray(Sokoban.simpleLevel, Sokoban.symbols.iso);
 		this.stage.addGame(tray);
	};

	return Sokoban;
});

