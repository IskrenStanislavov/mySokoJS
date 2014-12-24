// recalculate the walls after initial parsing

define(function(require) {
	var Tiles  = require("games/sokoban/tiles");

	var Walls = function(bunchOfTiles) {
		var walls = [];
		bunchOfTiles.forEach(function(tileRow, rowIndex) {
			console.log("row:"+rowIndex);
			walls.push([]);
			tileRow.forEach(function(tile, colIndex) {

				if ( tile && tile.isWall() ) {
					console.log("col:"+colIndex+"+X");
					walls[rowIndex][colIndex] ="X";
				} else {
					console.log("col:"+colIndex+"+_");
					walls[rowIndex][colIndex] = "_";
				}

			});
		});
		console.warn(walls);
	};

	return Walls;
});

