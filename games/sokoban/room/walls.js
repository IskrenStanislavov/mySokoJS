// recalculate the walls after initial parsing

define(function(require) {
	var Tiles  = require("games/sokoban/tiles");

	var Walls = function(bunchOfTiles) {
		var walls = [];
		var lastColumn = bunchOfTiles[0].length - 1;
		var lastRow = bunchOfTiles.length - 1;
		bunchOfTiles.forEach(function(tileRow, rowIndex) {
			// console.log("row:"+rowIndex);
			walls.push([]);
			tileRow.forEach(function(tile, colIndex) {
				if (tile.isWall() ) {

					var above = false;
					var below = false;
					if ( rowIndex === 0 ) {
						// above = false;
						below = bunchOfTiles[rowIndex+1][colIndex].isWall();
					} else if ( rowIndex === lastRow ) {
						above = bunchOfTiles[rowIndex-1][colIndex].isWall();
						// below = false;
					} else {
						above = bunchOfTiles[rowIndex-1][colIndex].isWall();
						below = bunchOfTiles[rowIndex+1][colIndex].isWall();
					}

					var left = false;
					var right = false;
					if ( colIndex === 0 ) {
						// left = false;
						right = tileRow[colIndex+1].isWall();
					} else if ( colIndex === lastColumn ) {
						left = tileRow[colIndex-1].isWall();
						// right = false;
					} else {
						left = tileRow[colIndex-1].isWall();
						right = tileRow[colIndex+1].isWall();
					}

				}
			});
		});
		console.warn(walls);
	};

	return Walls;
});

