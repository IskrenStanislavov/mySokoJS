//XXX: separate ground and first floors in two different files; even rename to floors

define(function(require) {
	var Tiles  = require("games/sokoban/tiles");

	var Room = function(stage, level, iso){
		// for (var i=)
		this.stage = stage;
		this.parse( level, iso );
		// this.stage = stage;
	};

	Room.prototype.presentToStage = function(stage) {
		stage.canvas.width  = this.columns * Tiles.dimensions.width;
		stage.canvas.height = (this.rows+1) * Tiles.dimensions.height;

		console.warn(this.tiles);
		if ( this.tiles.length > 0 ) {
			this.tiles.forEach(function(tile, i){
				if (tile !== Tiles.player){
					stage.addChild(tile.sprite);
				}
			});
		}
		this.player && stage.addChildAt(this.player.sprite, this.tiles.length);
	};

	Room.prototype.parse = function(stringLevel, iso) {
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
				tile = Tiles.newTile({
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
		this.presentToStage(this.stage);
	};

	Room.prototype.parseOriginal = function(stringLevel, iso) {
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

	Room.prototype.getTiles = function( ) {
		return this.matrixOfTiles;
	};

	return Room;
});

