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
		this.iso = roomConfig.roomKinds[this.format];
	};

	BaseLevel.prototype.parseGrid = function() {
		this.rows = this.rawString.split(this.iso.newLineSymbol).map(function(row, rowIndex){
			console.log(row);
			return row;
		});
		this.countRows = this.rows.length;
		this.countColumns = this.rows.reduce(function(a, b){ return (a.length>b.length)? a: b; }).length;
		this.rows = this.rows.map(function(row){
			return row.ljust(this.countColumns, this.iso.emptyTile).split('');
		}.bind(this));
		this.rows.forEach(function(r){console.log(r);});
	};

	return BaseLevel;
});

