//XXX: http://html5hub.com/screen-size-management-in-mobile-html5-games/

//xsb format: http://sokosolve.sourceforge.net/FileFormatXSB.html
define(function(require) {
	var Levels = require("games/sokoban/levels");
	var tiles  = require("games/sokoban/tiles");
	var Room  = require("games/sokoban/room");
	var Stage  = require("libs/stage");
	var Handlers = require("games/sokoban/handlers");
	var CommandList = require("games/sokoban/commandList");

	var Sokoban = function(){
		this.stage = null;
		this.init();
		this.commandList = new CommandList();
		this.handlers = new Handlers(this.stage, this.commandList);
	};

	//corners
	Sokoban.simpleLevel = "WWWWWA;WPB-WA;WWWWWA";
	//cross & single edges
	Sokoban.simpleLevel +=";     ";
	Sokoban.simpleLevel +="; W   ";
	Sokoban.simpleLevel +=";WWW  ";
	Sokoban.simpleLevel +="; W   ";
	//T junction: right
	Sokoban.simpleLevel +=";     ";
	Sokoban.simpleLevel +="; W   ";
	Sokoban.simpleLevel +=";WW   ";
	Sokoban.simpleLevel +="; W   ";
	//T junction: left
	Sokoban.simpleLevel +=";     ";
	Sokoban.simpleLevel +="; W   ";
	Sokoban.simpleLevel +="; WW  ";
	Sokoban.simpleLevel +="; W   ";
	//T junction: bottom
	Sokoban.simpleLevel +=";     ";
	Sokoban.simpleLevel +="; W   ";
	Sokoban.simpleLevel +=";WWW  ";
	//T junction: top
	Sokoban.simpleLevel +=";     ";
	Sokoban.simpleLevel +=";WWW  ";
	Sokoban.simpleLevel +="; W   ";

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
		var demoRoom = new Room( this.stage, Sokoban.simpleLevel, "iso" );
		// room.recalculateWalls( demoRoom.getTiles() );
		// demoRoom.presentToStage(this.stage);
 		this.handlers.refresh();
	};

	return Sokoban;
});

