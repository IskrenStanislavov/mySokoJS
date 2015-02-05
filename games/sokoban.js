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

	Sokoban.prototype.start = function(levelIndex) {
		if (levelIndex === undefined){
			console.log(levelIndex);
			levelIndex = localStorage.getItem("currentLevel");
			if (levelIndex === null){
				levelIndex = -1;
			} else {
				levelIndex = JSON.parse(levelIndex);
			}
		}
		localStorage.setItem("currentLevel", levelIndex);
		var level = this.levels.getLevel(levelIndex);
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
 				that.on("pressup",function(){
 					setTimeout(function(){
		 				// that.children.length=0;
						that.removeChild(this.currentRoom);
			 			that.start(levelIndex+1);
 					},5000);
 				},that, true);
 			};
 		}, 100);
	};

	return Sokoban;
});

