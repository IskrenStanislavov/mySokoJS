define(function(require) {
	var CommandList 	= require("sokoban/commandList");
	var SokobanLogic  = require("sokoban/room/logic");
	var Direction   = require('sokoban/room/direction');

	var KeyHandlers 	= require("sokoban/handlers/keyHandlers");

    var PIXI        = require("libs/pixi");
	var Tile 		= require('sokoban/tiles/pixi_tiles');
	var tileConfig  = require('sokoban/tiles/pixi_config');
	var Directions 	= require("sokoban/room/pixi_directions");
	var InfoBox  	= require("sokoban/pixi_infoBox");


	
	var Room = function( level, levelCompleteCallback ){
		PIXI.DisplayObjectContainer.call(this);
		this.player = null;
		this.grid = level.grid;
		this.rows = this.grid.length;
		this.columns = this.grid[0].length;

		// this.setDimentions();
		this.W = this.columns * tileConfig.width;
		this.H = this.rows * tileConfig.height;
		// this.parseTiles();
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

		this.logic = new SokobanLogic(this.player, this.interiorTiles);

		//graphix
		this.directions = this.addChild(new Directions(this.logic, this.rows, this.columns));
		this.directions.position.set(0, this.H);
		this.infoBox = this.addChild(new InfoBox());
		this.infoBox.position.set(this.W + 4, 0);

		//history
		this.commandList 	= new CommandList();

		//handlers
		this.keyHandlers 	= new KeyHandlers( levelCompleteCallback );
		this.keyHandlers.refresh(this.logic);

		this.keyHandlers.action.add(this.handleAction, this);
	};

	Room.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);

	Room.prototype.isSolved = function() {
		return this.logic.isSolved();
	};

	Room.prototype.handleAction = function(eData){
		switch(eData.action){
			case "move":
			var action = this.logic.getActionData(eData.direction);
			if ( action ){
				this.commandList.addCommand( action );
			}
			break;

			case "undo":
			this.commandList.goBack();
			break;

			case "redo":
			this.commandList.goForward();
			break;

			case "revertAll":
			this.commandList.revertAll();
			break;

			default:
			return;
		}
		var moves = this.commandList.moves;
		var pushes = this.commandList.pushes;
		this.infoBox.update(moves, pushes);
	};

	return Room;
});

