define(function(require) {
	var roomConfig  = require("games/sokoban/room/config");
	var Logic  = require("games/sokoban/room/logic");
	var Records  = require("games/sokoban/room/records");
	var parseWalls  = require("games/sokoban/room/walls");
    var PIXI        = require("libs/pixi");
	var Tile 		= require('games/sokoban/tiles/pixi_tiles');
	var tileConfig  = require('games/sokoban/tiles/pixi_config');

	
	var Room = function( level ){
		PIXI.DisplayObjectContainer.call(this);
		// var Handlers = require("games/sokoban/pixi_handlers");
		// var CommandList = require("games/sokoban/commandList");

		// that.currentLevel = that.addChild(new Room(that.levels.getLevelData()));
		// that.handlers = new Handlers(that, that.commandList);
		// that.commandList.reset(that.currentLevel.records);
		// that.handlers.refresh(that.currentLevel);
		this.level = level;
		this.parseTiles();
		this.parseWalls(this.interiorTiles);
		this.W = this.columns * tileConfig.dimensions.width;
		this.H = (this.rows+1) * tileConfig.dimensions.height;

		this.logic = new Logic(this.player, this.interiorTiles);
	};
	Room.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);


	Room.prototype.parseTiles = function() {
		var cCol = 0;
		var stringLevel = this.level.levelData;
		var iso = roomConfig.roomKinds[this.level.format];

		this.rows = 0;
		this.columns = 0;
		this.player = null;

		this.interiorTiles = [[]];
		for ( var i=0; i<stringLevel.length; i+=1 ) {
			symbol = stringLevel[i];
			if ( iso[symbol] === undefined ) {
				throw "Tile misconfig:" + symbol;
			} else if (iso[symbol].newLine) {
				this.rows += 1;
				this.columns = Math.max(this.columns, cCol);
				this.interiorTiles.push([]);
				cCol = 0;
			} else {
				var tile = this.addChild(new Tile({
					"row": this.rows,
					"column": cCol,
					"kind": iso[symbol].interior || "empty",
					"onTarget": iso[symbol].onTarget,
				}));
				this.interiorTiles[this.rows].push(tile);
				if (!this.player && tile.kind === "player"){
					this.player = tile;
				}
				cCol += 1;
			}
		}
	};
	Room.prototype.parseWalls = parseWalls;

	return Room;
});

