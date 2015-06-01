define(function(require) {
	var CommandList 	= require("sokoban/commandList");
	var SokobanLogic  = require("sokoban/room/logic");
	var Direction   = require('sokoban/room/direction');

	var Handlers 	= require("sokoban/handlers");

	var Tile 		= require("sokoban/tiles/tilesEASEL");
	var tileConfig  = require('sokoban/config/tiles');
	// var Directions 	= require("sokoban/room/pixi_directions");
	var InfoBox  	= require("sokoban/infoBoxEASEL");


	// var Logic  = require("sokoban/room/logic");

	// var roomConfig  = require("sokoban/config/room");

	// var Records  = require("sokoban/room/records");

	var Room = function( level, levelCompleteCallback ){
		createjs.Container.call(this);
		this.rows = level.grid.length;
		this.columns = level.grid[0].length;

		// this.setDimentions();
		this.W = this.columns * tileConfig.width;
		this.H = this.rows * tileConfig.height;
		// this.parseTiles();
		var that = this;
		this.interiorTiles = level.grid.map(function(row, iRow){
			return row.map(function(tileData, iColumn){
				return that.addChild(new Tile(tileData));
			});
		});

		this.logic = new SokobanLogic(this.interiorTiles);

		//graphix
		// this.directions = this.addChild(new Directions(this.logic, this.rows, this.columns));
		// this.directions.position.set(0, this.H);
		this.infoBox = this.addChild(new InfoBox());
		this.infoBox.x =this.W + 4;

		//history
		this.commandList 	= new CommandList();

		//handlers
		this.handlers 	= new Handlers( this.commandList, levelCompleteCallback );
		this.handlers.keyHandlers.action.add(this.handleAction, this);
	};

	Room.prototype = Object.create(createjs.Container.prototype);

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

