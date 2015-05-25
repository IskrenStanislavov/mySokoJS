define(function(require) {
	var roomConfig  = require("games/sokoban/room/config");
	var Logic  = require("games/sokoban/room/logic");
	var Records  = require("games/sokoban/room/records");
	var Tile 		= require('games/sokoban/tiles/tile');
	var tileConfig  = require('games/sokoban/tiles/config');

	var Room = function( level ){
		createjs.Container.call(this);
		this.grid = level.grid;
		this.rows = this.grid.length;
		this.columns = this.grid[0].length;
		this.parseTiles();
		this.setDimentions();

		this.initInformations();
		this.logic = new Logic(this.player, this.interiorTiles);

		this.allBoxes = this.interiorTiles.reduce(function(a, b){
			return a.concat(b);
		}).filter(function(tile){
			if (tile.isBox()){
				return tile;
			}
		});

	};
	Room.prototype = Object.create(createjs.Container.prototype);

	Room.prototype.isSolved = function() {
		if ( this.logic.inDrag() ) {
			return false;
		}
		var solved = this.allBoxes.every(function(boxTile){
			return !!boxTile.onTarget;
		});
		return solved;
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
		this.W = this.columns * tileConfig.dimensions.width;
		this.W += roomConfig.additionalWidth;
		this.H = this.rows * tileConfig.dimensions.height;
	};

	Room.prototype.initInformations = function() {
		this.infoContainer = this.addChild(new createjs.Container()).set({
			"x": (0.5 + this.columns) * tileConfig.dimensions.width,
			"name": "info",
		});

		// this.texts = roomConfig.texts;
		this.texts = {
			"title": {
				'text': "Authors:",
				'font' : "22px Verdana",
				"lineHeight":22,
				'color':"#7f4746",
				// 'color':"#998892",
				"x":19,
			},
			"names": {
				'text': "\n\nGerry Wiseman - skin\nIskren Stanislavov - logics",
				'font' : "13px Arial",
				"lineHeight":16,
				'color':"#998892",
			},
			"actionsLabel":{
				'text': "Moves:\nPushes:",
				'font' : "13px Arial",
				"lineHeight":18,
				'color':"#998892",
				"x":0,
				"y":100,
			},
			"actionsCount":{
				'text': "0\n0",
				'font' : "bold 14px Arial",
				"lineHeight":18,
				'color':"#7f4746",
				"x":50,
				"y":100,
			},
		};

		this.infoContainer.addChild(new createjs.Text()).set(this.texts.title);
		this.infoContainer.addChild(new createjs.Text()).set(this.texts.names);
		this.infoContainer.addChild(new createjs.Text()).set(this.texts.actionsLabel);
		this.counts = this.infoContainer.addChild(new createjs.Text()).set(this.texts.actionsCount);
		this.records = new Records(this.counts);
	};

	return Room;
});

