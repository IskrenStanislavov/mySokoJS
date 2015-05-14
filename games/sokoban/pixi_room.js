define(function(require) {
	var SokobanLogic  = require("games/sokoban/room/logic");
	var Records  = require("games/sokoban/room/records");
	var parseWalls  = require("games/sokoban/room/walls");
    var PIXI        = require("libs/pixi");
	var Tile 		= require('games/sokoban/tiles/pixi_tiles');
	var tileConfig  = require('games/sokoban/tiles/pixi_config');
	var Handlers = require("games/sokoban/pixi_handlers");

	
	var Room = function( level ){
		PIXI.DisplayObjectContainer.call(this);

		this.level = level;
		this.parseTiles();
		this.parseWalls(this.interiorTiles);
		this.W = this.columns * tileConfig.dimensions.width;
		this.H = (this.rows+1) * tileConfig.dimensions.height;

		this.logic = new SokobanLogic(this.player, this.interiorTiles);


		// that.currentLevel = this;
		// this.recordsBox = new Records();
		// that.handlers = new Handlers(that, that.commandList);
		// that.commandList.reset(this.recordsBox);
		this.handlers = new Handlers(this);//includes the CommandList
	};
	Room.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);

	Room.prototype.parseGrid = function(stringLevel) {
		stringLevel.split();
		this.level.rawString
		console.log(stringLevel);

	};


	Room.prototype.parseTiles = function() {
		var cCol = 0;
		var stringLevel = this.level.rawString;
		var iso = this.level.iso;
		this.level.parseGrid();

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

