define(function(require) {
	var Logic  = require("games/sokoban/room/logic");

	var roomConfig  = require("games/sokoban/room/config");

	var Records  = require("games/sokoban/room/records");
	var Tile 		= require('games/sokoban/tiles/tile');
	var tileConfig  = require('games/sokoban/tiles/config');
	var InfoBox  	= require("games/sokoban/infoBox");

	var Room = function( level ){
		createjs.Container.call(this);
		this.grid = level.grid;
		this.rows = this.grid.length;
		this.columns = this.grid[0].length;
		//this.parseTiles();
		var that = this;
		this.interiorTiles = this.grid.map(function(row, iRow){
			return row.map(function(tileData, iColumn){
				var tile = that.addChild(new Tile(tileData));
				if (!that.player && tile.isPlayer()){
					that.player = tile;
				}
				return tile;
			});
		});

		// this.setDimentions();
		this.W = this.columns * tileConfig.dimensions.width;
		this.W += roomConfig.additionalWidth;
		this.H = this.rows * tileConfig.dimensions.height;


		this.infoBox = this.addChild(new InfoBox());
		this.infoBox.set({x:(0.5 + this.columns) * tileConfig.dimensions.width});
		this.records = new Records(this.infoBox.counts);

		this.logic = new Logic(this.player, this.interiorTiles);
	};

	Room.prototype = Object.create(createjs.Container.prototype);

	Room.prototype.isSolved = function() {
		return this.logic.isSolved();
	};

	return Room;
});

