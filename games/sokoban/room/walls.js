// recalculate the walls after initial parsing

// explanation: each side would have a number
//                  2 (index 1)
//                  .
//                  |
// (index 4) 16 .---.---. 4 (index 2)
//                 |\1 (index 0)
//                 .
//                8 (index 3)
//  1 = (1<<(isWall() * middleIndex)
//  2 = (1<<(isWall() * topIndex)
//  4 = (1<<(isWall() * rightIndex)
//  8 = (1<<(isWall() * bottomIndex)
// 16 = (1<<(isWall() * leftIndex)

// all of them will be full sum
// three of them will be full sum '-' the missing one
// three of them will be full sum '-' the missing two

define(function(require) {
	var WEIGHT_TO_WALL = {
		"31": 'cross', //all

		"29": 'Ttop', 		// 31-2 (top)
		"27": 'Tright', 		// 31-4 (right)
		"23": 'Tbottom', 		// 31-8 (bottom)
		"15": 'Tleft', 		// 31-16 (left)

		"25": 'topRightL', 		// 31-2-4 (top,right)
		"19": 'bottomRightL', 		// 31-4-8 (right,bottom)
		 "7": 'bottomLeftL', 		// 31-8-16 (bottom,left)
		"13": 'topLeftL',		// 31-16-2 (left,top)

		"11": 'vertical', 	// 31-4-16 (right,left)
		"21": 'horizontal',	// 31-8-2 (bottom,top)

		"17": 'leftEdge',	 	// (1<<4) + 1
		 "9": 'bottomEdge',	// (1<<3) + 1
		 "5": 'rightEdge', 	// (1<<2) + 1
		 "3": 'topEdge',	 	// (1<<1) + 1
	};

	var Walls = function(bunchOfTiles) {
		var lastColumn = bunchOfTiles[0].length - 1;
		var lastRow = bunchOfTiles.length - 1;
		bunchOfTiles.forEach(function(tileRow, rowIndex) {
			tileRow.forEach(function(tile, colIndex) {
				if ( !tile.isWall() ){
					return;
				}
				var weight   = 1;
				var above  = rowIndex > 0         ? bunchOfTiles[rowIndex -1][colIndex].isWall() : 0;
				weight += above * (1<<1);
				var below  = rowIndex < lastRow   ? bunchOfTiles[rowIndex +1][colIndex].isWall() : 0;
				weight += below * (1<<3);
				var left   = colIndex > 0         ? tileRow[colIndex -1].isWall() : 0;
				weight += left * (1<<4);
				var right  = colIndex < lastColumn? tileRow[colIndex +1].isWall() : 0;
				weight += right * (1<<2);


				if (weight !== 1){
					tile.redrawWall(WEIGHT_TO_WALL[weight]);
				}
			});
		});
	};

	return Walls;
});
