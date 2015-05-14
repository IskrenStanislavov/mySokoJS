//xsb format: http://sokosolve.sourceforge.net/FileFormatXSB.html

define(function(require) {
	var roomConfig  = require("games/sokoban/room/config");

	var BaseLevel = function(data) {
		// PIXI.DisplayObjectContainer.call(this);
		this.author 	= data.author;
		this.collection = data.collectionName;
		this.rawString 	= data.rawString;
		this.format 	= data.format;
		this.levelName 	= data.levelName;

		// take the ready grid when loaded from storage
		if (data.grid) {
			this.grid = data.grid;
			return;
		}

		var iso = roomConfig.roomKinds[this.format];
		// split rows
		var rows = this.rawString.split(iso.newLineSymbol).map(function(row, rowIndex){ return row; });
		//calculate number of columns
		var countColumns = rows.reduce(function(a, b){ return (a.length>b.length)? a: b; }).length;
		//fill with spaces at the end if not a rectangular shape
		rows = rows.map(function(row){ return row.ljust(countColumns, iso.emptyTile).split(''); });

		this.grid = rows.map(function(row, iRow){
			return row.map(function(symbol, iColumn){
				var tileData = {
					"row"	: iRow,
					"column": iColumn,
					"kind"	: iso[symbol].interior || "empty",
					"onTarget": iso[symbol].onTarget
				};
				return tileData;
			});
		});
	};

	return BaseLevel;
});

