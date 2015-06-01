// Sokoban TODO: board like array of the tiles!!!! 

define(function(require){
    require("libs/zepto.min");
    require("libs/functions");
	var RoomsContainer 	= require("sokoban/rooms");
	var Room  			= require("sokoban/room");
	var Stage  			= require("libs/stage");
	var Handlers 		= require("sokoban/handlers");

	var Sokoban = function(){
		Stage.call(this, "game", {"showBG":true});
		this.handlers = new Handlers(this);
		this.levels = new RoomsContainer(function(){
			this.start();
		}.bind(this));
	};

	Sokoban.prototype = Object.create(Stage.prototype);

	Sokoban.prototype.start = function() {
		var level = this.levels.getLevelData();
		this.currentRoom = this.addChild(new Room( level ));

		this.setAutoFit(this.currentRoom);
		this.resize();

		this.handlers.refresh(this.currentRoom);

		var that = this;
		var solveCheck = setInterval(function(){
			if ( that.currentRoom.isSolved() ){
				clearInterval(solveCheck);
				setTimeout(function(){
					that.removeChild(that.currentRoom);
					that.levels.markAsSolved();
					that.start();
				},1000);
			};
		}, 500);
	};
	return new Sokoban();
});


