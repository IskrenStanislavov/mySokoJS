//Tile factory pattern used - ??? to be used ???


// GROUND layer with static tiles ("target", "wall"-no & "empty" place): "ground" or "base"
// "1st-FLOOR" layer with movable (crates & player) & unmovable tiles (walls): 


// playerTile can move, handlers controlled
// wall - never moves, always in state: "full"
// target - never moves, but can have states: empty, box, player
// empty - doesn move, but can exchange with player only!
// box Tile can move - player can move it towards the direction

//друг вариант е просто да се сменят позициите на които се намират кутийките и играча ни

define(function(require) {
	var createjs	= require('libs/easeljs-0.7.1.min');
	var Tile 		= require('games/sokoban/tiles/tile');
	var Config 		= require('games/sokoban/tiles/config');
	var Floor 		= Config.Floors;

	var Factory = function(){
		// ground level tiles: target, box-initial positions & player initial positions, initial walls
		this.bases = {};
		var that = this;

		Config.firstFloorTiles.forEach(function( kind, idx ) {
			that.bases[kind] = new Tile( kind );
			// console.warn(kind);
		});

		this.player =  this.bases["player"];
	};

	$.extend(Factory.prototype, {
		"newTile": function(data) {
			return this.bases[data.kind].cloneAt(data.row, data.column, data.onTarget );
		},
	});

	return Factory;

});
