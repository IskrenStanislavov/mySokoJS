define(function(require) {
	var roomConfig  = require("games/sokoban/room/config");
	var Logic  = require("games/sokoban/room/logic");
	var Records  = require("games/sokoban/room/records");
	var parseWalls  = require("games/sokoban/room/walls");

	
	var Room = function( level, tileFactory ){
		createjs.Container.call(this);
		this.tileFactory = tileFactory;
		this.iso = level.iso;
		this.grid = level.parseGrid();
		this.rows = this.grid.length;
		this.columns = this.grid[0].length;
		this.parseTiles();
		this.parseWalls(this.interiorTiles);
		this.setDimentions();

		this.initInformations();
		this.logic = new Logic(this.player, this.interiorTiles);
	};
	Room.prototype = Object.create(createjs.Container.prototype);


	Room.prototype.parseTiles = function() {
		var iso = this.iso;
		var that = this;
		this.interiorTiles = this.grid.map(function(row, iRow){
			return row.map(function(symbol, iColumn){
				var tile = that.addChild(that.tileFactory.newTile({
					"row"	: iRow,
					"column": iColumn,
					"kind"	: iso[symbol].interior || "empty",
					"onTarget": iso[symbol].onTarget,

				}));
				if (!that.player && tile.isPlayer()){
					that.player = tile;
				}
				return tile;
			});
		});
	};
	Room.prototype.parseWalls = parseWalls;
	Room.prototype.setDimentions = function(){
		this.W = this.columns * this.tileFactory.dimensions.width;
		this.W += roomConfig.additionalWidth;
		this.H = this.rows * this.tileFactory.dimensions.height;
	};

	Room.prototype.initInformations = function() {
		this.infoContainer = this.addChild(new createjs.Container()).set({
			"x": (0.5 + this.columns) * this.tileFactory.dimensions.width,
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
				'text': "108\n97",
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

