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
					var longerings = 0;

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
					longerings += above;
					longerings += below;

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
					longerings += left;
					longerings += right;


					if ( longerings === 4 ) {//4
						tile.redrawWall( 'cross' );
					} else if ( longerings === 3 ) {
						if ( !above ){
							tile.redrawWall( 'Ttop' );
						} else if ( !right ){
							tile.redrawWall( 'Tright' );
						} else if ( !left ) {
							tile.redrawWall( 'Tleft' );
						} else {
							tile.redrawWall( 'Tbottom' );
						}
					} else if ( longerings === 2 ) {
						if ( left && right ){//2
							tile.redrawWall( 'horizontal' );
						} else if ( below && above ){//2
							tile.redrawWall( 'vertical' );
						} else if ( below && right ){ //2
							tile.redrawWall( 'topLeftL' );
						} else if ( below && left ){ //2
							tile.redrawWall( 'topRightL' );
						} else if ( above && right ){ //2
							tile.redrawWall( 'bottomLeftL' );
						} else if ( above && left ){ //2
							tile.redrawWall( 'bottomRightL' );
						}
					} else if ( longerings === 1 ) {
						if ( left ){//2
							tile.redrawWall( 'leftEdge' );
						} else if ( right ) {
							tile.redrawWall( 'rightEdge' );
						} else if ( above ) {
							tile.redrawWall( 'topEdge' );
						} else if ( below ) {
							tile.redrawWall( 'bottomEdge' );
						}
					}


				}
			});
		});
		console.warn(walls);
	};

	return Walls;
});
