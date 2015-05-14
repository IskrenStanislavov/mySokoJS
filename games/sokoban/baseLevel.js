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
		if (data.grid){
			//loaded from storage
			this.grid = data.grid;
			return;
		}

		var iso = roomConfig.roomKinds[this.format];
		var rows = this.rawString.split(iso.newLineSymbol).map(function(row, rowIndex){
			return row;
		});
		var countColumns = rows.reduce(function(a, b){ return (a.length>b.length)? a: b; }).length;
		rows = rows.map(function(row){
			return row.ljust(countColumns, iso.emptyTile).split('');
		});

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

