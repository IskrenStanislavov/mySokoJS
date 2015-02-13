define(function(require) {
	var roomConfig  = require("games/sokoban/room/config");
	var Logic  = require("games/sokoban/room/logic");
	var Records  = require("games/sokoban/room/records");
	var parseWalls  = require("games/sokoban/room/walls");
	require('libs/underscore');

	
	var Room = function( level, tileFactory ){
		createjs.Container.call(this);
		this.tileFactory = tileFactory;
		this.level = level;
		this.parseTiles();
		this.parseWalls(this.interiorTiles);
		this.W = this.columns * this.tileFactory.dimensions.width + roomConfig.additionalWidth;
		this.H = (this.rows+1) * this.tileFactory.dimensions.height;

		this.initInformations();
		this.logic = new Logic(this.player, this.interiorTiles);
	};
	Room.prototype = Object.create(createjs.Container.prototype);


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
				var tile = this.addChild(this.tileFactory.newTile({
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

