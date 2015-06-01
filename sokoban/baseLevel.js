//xsb format: http://sokosolve.sourceforge.net/FileFormatXSB.html

define(function(require) {
	var roomConfig  = require("sokoban/config/room");
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


	var BaseLevel = function(data) {
		// PIXI.DisplayObjectContainer.call(this);
		this.author 	= data.author;
		this.collection = data.collectionName;
		this.rawString 	= data.rawString;
		this.format 	= data.format;
		this.levelName 	= data.levelName;

		// take the ready grid when loaded from storage
		if (data.grid) {
			this.grid 	 = data.grid;
			this.texture = data.texture;
			return;
		}

		var iso = roomConfig.roomKinds[this.format];
		// split rows
		var rows = this.rawString.split(iso.newLineSymbol).map(function(row, rowIndex){ return row; });
		//calculate number of columns
		var countColumns = rows.reduce(function(a, b){ return (a.length>b.length)? a: b; }).length;
		//fill with spaces at the end if not a rectangular shape
		rows = rows.map(function(row){ return row.ljust(countColumns, iso.emptyTile).split(''); });

		var that = this;

		this.grid = rows.map(function(row, iRow){
			return row.map(function(symbol, iColumn){
				var texture = "normal"
				if (symbol === iso.wallSymbol){
					texture = that.getWallTextureAt(rows, iRow, iColumn);
				}
				var tileData = {
					"row"	  : iRow,
					"column"  : iColumn,
					"kind"	  : iso[symbol].interior || "empty",
					"texture" : texture || "normal",
					"onTarget": iso[symbol].onTarget
				};
				return tileData;
			});
		});
	};

	BaseLevel.prototype.getWallTextureAt = function(grid, iRow, iColumn){
		// Wall calculation explanation: each side would have a number
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

		// if all sides are walls then the weight should be sum of all them (31)
		// if three side are walls then it will be full sum '-' the missing one
		// if two side are walls then it will be full sum '-' the missing two

		var lastColumn = grid[0].length - 1;
		var lastRow = grid.length - 1;
		var symbol = grid[iRow][iColumn];

		var weight   = 1;
		weight += iRow > 0             && grid[iRow-1][iColumn] === symbol  ?  2: 0; //above
		weight += iColumn < lastColumn && grid[iRow][iColumn +1] === symbol ?  4: 0; //right
		weight += iRow < lastRow       && grid[iRow+1][iColumn] === symbol  ?  8: 0; //below
		weight += iColumn > 0          && grid[iRow][iColumn -1] === symbol ? 16: 0; //left

		if (weight !== 1){
			return WEIGHT_TO_WALL[weight];
		} else {
			return "normal";
		}
	};

	return BaseLevel;
});

