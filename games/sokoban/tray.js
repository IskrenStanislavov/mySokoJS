
define(function(require) {
	var tiles  = require("games/sokoban/tiles");

	Tray = function(level, iso){
		// for (var i=)
		this.parse( level, iso );
		this.width =  this.columns * Tile.dimensions.width;
		this.height = (this.rows+1) * Tile.dimensions.height;
	};

	Tray.prototype.parse = function(stringLevel, iso) {
		//this will parse only the ground floor - 	Config.groundFloorTiles = ["target", "empty", "author"];
		this.rows = 0;
		this.columns = 0;
		this.player = null;
		var cCol = 0;
		var kind;
		var tile;

		this.tiles = [];
		this.matrixOfTiles = [[]];
		this.tilesByKinds = [[]];
		for ( var i=0; i<stringLevel.length; i+=1 ) {
			symbol = stringLevel[i];
			kind = iso[symbol]
			if (!kind) {
				throw "Tile misconfig:" + symbol;
			} else if (kind === 'new line') {
				this.rows += 1;
				this.columns = Math.max(this.columns, cCol);
				this.matrixOfTiles.push([]);
				this.tilesByKinds.push([]);
				cCol = 0;
			} else {
				tile = tiles.newTile({
					"row":this.rows,
					"column":cCol,
					"kind":kind,
				});
				this.tiles.push(tile);
				this.matrixOfTiles[this.rows].push(tile);
				this.tilesByKinds[this.rows].push(kind);
				cCol += 1;
				if (!this.player && tile && tile.isPlayer()){
					this.player = tile;
				}
			}
		}
		console.warn(this.tilesByKinds);
	};

	Tray.prototype.parseOriginal = function(stringLevel, iso) {
		this.rows = 0;
		this.columns = 0;
		this.player = null;
		var cCol = 0;
		var kind;
		var tile;

		this.tiles = [];
		this.matrixOfTiles = [[]];
		for ( var i=0; i<stringLevel.length; i+=1 ) {
			symbol = stringLevel[i];
			kind = iso[symbol]
			if (!kind) {
				throw "Tile misconfig:" + symbol;
			} else if (kind === 'new line') {
				this.rows += 1;
				this.columns = Math.max(this.columns, cCol);
				this.matrixOfTiles.push([]);
				cCol = 0;
			} else {
				tile = tiles.newTile({
					"row":this.rows,
					"column":cCol,
					"kind":kind,
				});
				this.tiles.push(tile);
				this.matrixOfTiles[this.rows].push(tile);
				cCol += 1;
				if (!this.player && tile && tile.isPlayer()){
					this.player = tile;
				}
			}
		}
	};

	Tray.prototype.getTiles = function( ) {
		return this.matrixOfTiles;
	};

	return Tray;
});

