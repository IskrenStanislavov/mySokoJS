// parsing levels into a room
// each room consist of two different containers:
// - basic or floor
// - interior with movable objects (except the walls of course)

define(function(require) {
	var Tiles  = require("games/sokoban/tiles");
	var parse = function(stringLevel, iso) {
		var cCol = 0;
		var kind;
		var tile;

		this.floorTiles = [[]];
		this.interiorTiles = [[]];
		for ( var i=0; i<stringLevel.length; i+=1 ) {
			symbol = stringLevel[i];
			if ( iso[symbol] === undefined ) {
				throw "Tile misconfig:" + symbol;
			} else if (iso[symbol].newLine) {
				this.rows += 1;
				this.columns = Math.max(this.columns, cCol);
				this.floorTiles.push([]);
				this.interiorTiles.push([]);
				cCol = 0;
			} else {
				this.floorTiles[this.rows].push(Tiles.newTile({
					"row": this.rows,
					"column": cCol,
					"kind": iso[symbol].floor,
				}));
				this.interiorTiles[this.rows].push(Tiles.newTile({
					"row": this.rows,
					"column": cCol,
					//use transparent Tile instead of null:
					"kind": iso[symbol].interior || "transparent",
					"onTarget": this.floorTiles[this.rows][cCol].isTarget(),
				}));
				cCol += 1;
			}
		}
	};

	return parse;
});

