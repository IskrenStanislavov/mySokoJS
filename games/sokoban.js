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
		Stage.call(this, "game", {"showBG":true});
		this.init();
	};
	Sokoban.prototype = Object.create(Stage.prototype);

	Sokoban.prototype.init = function() {
		this.commandList = new CommandList();
		this.handlers = new Handlers(this, this.commandList);
		this.levels = new Levels(function(){
			this.start();
		}.bind(this));
		this.levels.load();
	};

	Sokoban.prototype.start = function() {
		var level = this.levels.getLevel();
		this.currentRoom = new Room( level );
		this.addChild(this.currentRoom);

		this.setAutoFit(this.currentRoom);
		this.resize();

		this.commandList.reset(this.currentRoom.records);
 		this.handlers.refresh(this.currentRoom);
 		var that = this;
 		var solveCheck = setInterval(function(){
 			if ( that.currentRoom.logic.checkForSolved() ){
 				clearInterval(solveCheck);
 					setTimeout(function(){
		 				// that.children.length=0;
						that.removeChild(that.currentRoom);
						that.levels.markAsSolved();
			 			that.start();
 					},1000);
 			};
 		}, 100);
	};

	return Sokoban;
});

