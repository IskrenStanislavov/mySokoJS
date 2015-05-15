define(function(require) {
	var SokobanLogic  = require("games/sokoban/room/logic");
	var Records  = require("games/sokoban/room/records");
    var PIXI        = require("libs/pixi");
	var Tile 		= require('games/sokoban/tiles/pixi_tiles');
	var tileConfig  = require('games/sokoban/tiles/pixi_config');
	var Handlers = require("games/sokoban/pixi_handlers");

	
	var Room = function( level ){
		PIXI.DisplayObjectContainer.call(this);
		this.player = null;
		this.grid = level.grid;
		this.parseTiles();
		this.setDimentions();

		this.logic = new SokobanLogic(this.player, this.interiorTiles);


		// that.currentLevel = this;
		// this.recordsBox = new Records();
		// that.handlers = new Handlers(that, that.commandList);
		// that.commandList.reset(this.recordsBox);
		this.handlers = new Handlers(this);//includes the CommandList, need the Record
	};
	Room.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);

	Room.prototype.parseTiles = function() {
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
	};

	Room.prototype.setDimentions = function(){
		this.W = this.grid[0].length * tileConfig.dimensions.width;
		this.H = (this.grid.length+1) * tileConfig.dimensions.height;
	};

	return Room;
});

