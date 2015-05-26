define(function(require) {
	var CommandList 	= require("games/sokoban/commandList");
	var SokobanLogic  = require("games/sokoban/room/logic");
	var Direction   = require('games/sokoban/room/direction');

	var KeyHandlers 	= require("games/sokoban/handlers/keyHandlers");

    var PIXI        = require("libs/pixi");
	var Tile 		= require('games/sokoban/tiles/pixi_tiles');
	var tileConfig  = require('games/sokoban/tiles/pixi_config');
	var Directions 	= require("games/sokoban/room/pixi_directions");


	
	var Room = function( level, levelCompleteCallback ){
		PIXI.DisplayObjectContainer.call(this);
		this.player = null;
		this.grid = level.grid;
		this.rows = this.grid.length;
		this.columns = this.grid[0].length;

		this.parseTiles();
		this.setDimentions();

		this.directions = this.addChild(new Directions(this.logic, this.rows, this.columns));
		this.directions.position.set(0, this.H);

		this.infoBox = this.addChild(new InfoBox());
		this.infoBox.position.set(this.W + 4, 0);

		var that = this;

		this.logic = new SokobanLogic(this.player, this.interiorTiles);
		this.commandList 	= new CommandList();

		this.keyHandlers 	= new KeyHandlers( levelCompleteCallback );
		this.keyHandlers.refresh(this.logic);

		this.keyHandlers.action.add(this.handleAction, this);
	};

	Room.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);

	Room.prototype.isSolved = function() {
		return this.logic.isSolved();
	};

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
		this.W = this.columns * tileConfig.width;
		this.H = this.rows * tileConfig.height;
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

