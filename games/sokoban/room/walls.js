// recalculate the walls after initial parsing

define(function(require) {
	var Tiles  = require("games/sokoban/tiles");
	var roomConfig  = require("games/sokoban/room/config");
	var parse  = require("games/sokoban/room/parser");
	var joinFloor  = require("games/sokoban/room/floor");
	var joinInterior  = require("games/sokoban/room/interior");

	var Room = function(stage, level, iso){
		this.stage = stage;
		this.level = level;
		this.rows = 0; 		//set in the parse() call
		this.columns = 0; 	//set in the parse() call
		this.player = null; //set in the parse() call
		parse.call(this, level, roomConfig[iso] );
		this.stage.addChild( joinFloor.call(this, this.floorTiles) );
		this.stage.addChild( joinInterior.call(this, this.interiorTiles) );
		this.stage.canvas.width  = this.columns * Tiles.dimensions.width;
		this.stage.canvas.height = (this.rows+1) * Tiles.dimensions.height;
	};

	// Room.prototype.getWallTiles = function( ) {
	// 	return this.matrixOfTiles;
	// };

	return Room;
});

