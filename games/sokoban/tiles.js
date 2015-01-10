//Tile factory pattern used - ??? to be used ???


//XXX: GROUND layer with unmovable tiles ("target", "wall" & "empty" place): "ground" or "base"
//XXX: "1st-FLOOR" layer with movable (crates & player) & unmovable tiles (walls): 


// playerTile can move, handlers controlled
// wall - never moves, always in state: "full"
// target - never moves, but can have states: empty, box, player
// empty - doesn move, but can exchange with player only!
// box Tile can move - player can move it towards the direction

//друг вариант е просто да се сменят позициите на които се намират кутийките и играча ни

define(function(require) {
	var TileFactory = require('games/sokoban/tiles/factory');
	var TileConfig = require('games/sokoban/tiles/config');
	var factory = new TileFactory();

	//XXX: Tile.success - animate "win" for the current tile when solved or moved to the correct place
	//XXX: Tile.begin - plays animation when the game starts
	//XXX: Tile.move - plays animation when the player moves the main caracter
	//XXX: Tile.undo - plays animation when the player moves back in the history
	//XXX: TIle.still - static image

	return {
		// 'Tile':Tile,
		'newTile': factory.newTile.bind(factory),
		"player": factory.player,
		"dimensions": TileConfig.dimensions,
	};

});
