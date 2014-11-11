
define(function(require) {
	var Tile  = require("games/sokoban/tiles").Tile;

	Tray = function(level, iso){
		// for (var i=)
		this.parse( level, iso );
		this.width =  this.columns * Tile.dimensions.width;
		this.height = (this.rows+1) * Tile.dimensions.height;
		// this.recalculate_walls();
	};

	Tray.prototype.parse = function(stringLevel, iso) {
		this.rows = 0;
		this.columns = 0;
		var cCol = 0;
		var kind;

		this.tiles = [];
		this.matrixOfTiles = [[]]
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
				this.tiles.push(new Tile({
					"row":this.rows,
					"column":cCol,
					"kind":kind,
				}));
				this.matrixOfTiles[this.rows].push(this.tiles[ this.tiles.length-1 ]);
				cCol += 1;
			}
		}
	};

	Tray.prototype.getTiles = function( ) {
		return this.matrixOfTiles;
	};

	return Tray;
});

