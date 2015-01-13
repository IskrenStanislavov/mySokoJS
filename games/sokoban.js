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
		this.init();
	};

	Sokoban.prototype.init = function() {
		this.stage = new Stage();
		this.levels = new Levels();
		this.commandList = new CommandList();
		this.handlers = new Handlers(this.stage, this.commandList);
		this.start();
	};

	Sokoban.prototype.start = function(levelIndex) {
		if (levelIndex === undefined){
			levelIndex = -1;
		}
		var level = this.levels.getLevel(levelIndex);
		// this.currentRoom = new Room( this.stage, level.levelData, level.format );
		this.currentRoom = new Room( this.stage, level );
		this.commandList.reset(this.currentRoom.records);
 		this.handlers.refresh(this.currentRoom);
 		var that = this;
 		var solveCheck = setInterval(function(){
 			if ( that.currentRoom.logic.checkForSolved() ){
 				clearInterval(solveCheck);
 				that.stage.on("pressup",function(){
 					setTimeout(function(){
		 				that.stage.children.length=0;
			 			that.start(levelIndex+1);
 					},5000);
 				},that, true);
 			};
 		}, 100);
	};

	return Sokoban;
});

