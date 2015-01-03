define(function(require) {
	var Tiles  = require("games/sokoban/tiles");
	var roomConfig  = require("games/sokoban/room/config");
	var Logic  = require("games/sokoban/room/logic");
	var parse  = require("games/sokoban/room/parser");
	var parseWalls  = require("games/sokoban/room/walls");
	var joinFloor  = require("games/sokoban/room/floor");
	var joinInterior  = require("games/sokoban/room/interior");

	var Room = function(stage, level, iso){
		this.stage = stage;
		this.level = level;
		this.rows = 0; 		//set in the parse() call
		this.columns = 0; 	//set in the parse() call
		this.player = null; //set in the parse() call
		this.parse( level, roomConfig.roomKinds[iso] );
		if (this.propertyIsEnumerable(roomConfig.wallsLayer)){
			parseWalls(this[roomConfig.wallsLayer]);
		}
		this.stage.addChild( joinFloor.call(this, this.floorTiles) );
		this.stage.addChild( joinInterior.call(this, this.interiorTiles) );
		this.stage.canvas.width  = this.columns * Tiles.dimensions.width;
		this.stage.canvas.height = (this.rows+1) * Tiles.dimensions.height;
		// this.stage.update();

		this.logic = new Logic(this.player, this.interiorTiles, this.floorTiles);
	};

	Room.prototype.parse = parse;

	return Room;
});

