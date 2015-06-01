define(function(require) {
	var CommandList  = require("logics/commandList");
	var SokobanLogic = require("logics/sokoban");
	var Direction    = require('logics/direction');

	var KeyHandlers 	= require("sokoban/handlers/keyHandlers");

    var PIXI        = require("libs/pixi");
	var Tile 		= require('sokoban/tiles/tilesPIXI');
	var tileConfig  = require('sokoban/config/tiles');
	var Directions 	= require("sokoban/room/pixi_directions");
	var InfoBox  	= require("sokoban/infoBoxPIXI");


	
	var Room = function( level, callback ){
		PIXI.DisplayObjectContainer.call(this);
		this.rows = level.grid.length;
		this.columns = level.grid[0].length;

		// this.setDimentions();
		this.W = this.columns * tileConfig.width;
		this.H = this.rows * tileConfig.height;
		// this.parseTiles();
		var that = this;
		this.tiles = level.grid.map(function(row, iRow){
			return row.map(function(tileData, iColumn){
				return that.addChild(new Tile(tileData));
			});
		});

		this.logic = new SokobanLogic(this.tiles);

		//graphix
		this.directions = this.addChild(new Directions(this.logic, this.rows, this.columns));
		this.directions.position.set(0, this.H);
		this.infoBox = this.addChild(new InfoBox());
		this.infoBox.position.set(this.W + 4, 0);

		//history
		this.commandList 	= new CommandList();

		//handlers
		this.keyHandlers 	= new KeyHandlers( callback );
		this.keyHandlers.action.add(this.handleAction, this);

		this.onComplete = callback;
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

		if (this.logic.isSolved() && this.onComplete){
			this.onComplete();
			this.onComplete = null;
		}
	};

	return Room;
});

