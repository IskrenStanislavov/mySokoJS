define(function(require) {
	var CommandList  = require("logics/commandList");
	var SokobanLogic = require("logics/sokoban");
	var Direction    = require('logics/direction');

	var Handlers 	= require("sokoban/handlers");

	var Tile 		= require("sokoban/tiles/tilesEASEL");
	var tileConfig  = require('sokoban/config/tiles');
	var InfoBox  	= require("sokoban/infoBoxEASEL");

	var Room = function( level, levelCompleteCallback ){
		createjs.Container.call(this);
		this.rows = level.grid.length;
		this.columns = level.grid[0].length;

		this.W = this.columns * tileConfig.width;
		this.H = this.rows * tileConfig.height;

		var that = this;
		this.interiorTiles = level.grid.map(function(row, iRow){
			return row.map(function(tileData, iColumn){
				return that.addChild(new Tile(tileData));
			});
		});

		this.logic = new SokobanLogic(this.interiorTiles);

		//graphix
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

