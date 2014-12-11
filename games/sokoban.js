//XXX: http://html5hub.com/screen-size-management-in-mobile-html5-games/

//xsb format: http://sokosolve.sourceforge.net/FileFormatXSB.html
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
			'*': 'target+player',
			'W': 'wall',
			' ': 'empty',
			'B': 'box',
			'+': 'target+box',
			'-': 'target',
			';': 'new line',
			'A': 'author'
		},
		'xsb': {
			'@': 'player',
			'+': 'target+player',
			'#': 'wall',
			' ': 'empty',
			'$': 'box',
			'*': 'target+box',
			'.': 'target',
			'|': 'new line',
			'A': 'author'
		}
	};

	Sokoban.simpleLevel = "WWWWWA;WPB-WA;WWWWWA";
	Sokoban.levelsCollections = {
		"./games/sokoban/levels/levels_iskren.json": 'iso',
		"./games/sokoban/levels/niveles_homs.json": 'xsb',
		"./games/sokoban/levels/levels_erim_sever.json": 'xsb',
	};

	Sokoban.prototype.init = function() {
		this.stage = new Stage();
		this.levels = new Levels(Sokoban.levelsCollections);
	};

	Sokoban.prototype.start = function(data) {
		var tray = new Tray( this.stage, Sokoban.simpleLevel, Sokoban.symbols.iso );
		tiles.recalculateWalls( tray.getTiles() );
		// tray.presentToStage(this.stage);
 		this.handlers.refresh();
	};

	return Sokoban;
});

