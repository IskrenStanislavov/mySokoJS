//XXX: separate ground and first floors in two different files; even rename to floors

define(function(require) {
	var Tiles  = require("games/sokoban/tiles");
	var roomConfig  = require("games/sokoban/room/config");
	var parse  = require("games/sokoban/room/parser");
	var joinFloor  = require("games/sokoban/room/floor");
	var joinInterior  = require("games/sokoban/room/interior");

	var Room = function(stage, level, iso){
		this.stage = stage;
		parse.call(this, level, roomConfig[iso] );
		this.stage.addChild( joinFloor.call(this, this.floorTiles) );
		this.stage.addChild( joinInterior.call(this, this.interiorTiles) );
	};

	// Room.prototype.getTiles = function( ) {
	// 	return this.matrixOfTiles;
	// };

	return Room;
});

