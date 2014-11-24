define(function(require) {
	var Levels = require("games/sokoban/levels");
	var tiles  = require("games/sokoban/tiles");
	var Tray  = require("games/sokoban/tray");
	var Stage  = require("libs/stage");
	var Handlers = require("games/sokoban/handlers");
	var CommandList = require("games/sokoban/commandList");

	var Sokoban = function(){
		this.stage = null;
		this.init();
		this.commandList = new CommandList();
		this.handlers = new Handlers(this.stage, this.commandList);
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
			'A': 'author'
		},
		'xsb': {
			'@': 'player',
			'#': 'wall',
			' ': 'empty',
			'$': 'box',
			'*': 'target+box',
			'.': 'target-box',
			'|': 'new line',
			'A': 'author'
		}
	};

	Sokoban.simpleLevel = "WWWWWA;WPB-WA;WWWWWA";
	Sokoban.levelsCollections = {
		"./games/sokoban/levels.json": 'iso',
		"./games/sokoban/niveles_homs.json": 'xsb',
		"./games/sokoban/levels_erim_sever.json": 'xsb',
	};

	Sokoban.prototype.init = function() {
		this.stage = new Stage();
		this.levels = new Levels(Sokoban.levelsCollections);
	};

	Sokoban.prototype.start = function(data) {
		var tray = new Tray( Sokoban.simpleLevel, Sokoban.symbols.iso );
		tiles.recalculateWalls( tray.getTiles() );
 		this.stage.addGame( tray );
 		this.handlers.refresh();
	};

	return Sokoban;
});

