
define(function(require) {
	var Tile  = require("games/sokoban/tiles").Tile;

	Tray = function(){
		this.width = 3*Tile.dimensions.width;
		this.height = 3*Tile.dimensions.height;
		this.tiles = [
			new Tile({
				"row": 0,
				"column":0,
				"kind":"wall",
			}),
			new Tile({
				"row": 0,
				"column":1,
				"kind":"wall",
			}),
			new Tile({
				"row": 1,
				"column":0,
				"kind":"player",
			}),
			new Tile({
				"row": 1,
				"column":1,
				"kind":"empty",
			}),
			new Tile({
				"row": 2,
				"column":0,
				"kind":"box",
			}),
			new Tile({
				"row": 2,
				"column":1,
				"kind":"wall",
			}),
		];
	}
	return Tray;
});

