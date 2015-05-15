//Tile factory pattern used - ??? to be used ???

// each tile has a onTarget propery that modifies the image



// playerTile can move, handlers controlled
// box Tile can move - player can move it towards the direction

// wall - never moves, always in state: "full"
// target - never moves, but can have states: empty, box, player
// empty - doesn move, but can exchange with player only!

define(function(require) {
	var Tile 		= require('games/sokoban/tiles/tile');
	var Config 		= require('games/sokoban/tiles/config');

	var Factory = function(){
		// ground level tiles: target, box-initial positions & player initial positions, initial walls
		this.bases = {};
		var that = this;

		Config.firstFloorTiles.forEach(function( kind, idx ) {
			that.bases[kind] = new Tile( kind );
			// console.warn(kind);
		});

		this.dimensions = Config.dimensions;
	};

	$.extend(Factory.prototype, {
		"newTile": function(data) {
			var tile = this.bases[data.kind].cloneAt(data.row, data.column, data.onTarget )
			if (tile.isWall()){
				tile.redrawWall(data.texture);
			}
			return tile;
		},
	});

	return Factory;
});
