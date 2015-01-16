define(function(require) {
	var Tiles  = require("games/sokoban/tiles");
	var roomConfig  = require("games/sokoban/room/config");
	var Logic  = require("games/sokoban/room/logic");
	var Records  = require("games/sokoban/room/records");
	var parse  = require("games/sokoban/room/parser");
	var parseWalls  = require("games/sokoban/room/walls");
	var joinInterior  = require("games/sokoban/room/interior");

	var Room = function(stage, level){
		this.stage = stage;
		this.level = level;
		this.rows = 0; 		//set in the parse() call
		this.columns = 0; 	//set in the parse() call
		this.player = null; //set in the parse() call
		this.parse( level.levelData, roomConfig.roomKinds[level.format] );
		if (this.propertyIsEnumerable(roomConfig.wallsLayer)){
			parseWalls(this[roomConfig.wallsLayer]);
		}
		this.stage.addChild( joinInterior.call(this, this.interiorTiles) );
		this.stage.canvas.width  = this.columns * Tiles.dimensions.width + roomConfig.additionalWidth;
		this.stage.canvas.height = (this.rows+1) * Tiles.dimensions.height;

		if (this.columns > this.rows+1) {
			$(this.stage.canvas).css("width", "100%");
			$(this.stage.canvas).css("height", "");
		} else {
			$(this.stage.canvas).css("width", "");
			$(this.stage.canvas).css("height", "100%");
		}
		// this.stage.update();
		this.initInformations();
		this.logic = new Logic(this.player, this.interiorTiles);
	};

	Room.prototype.parse = parse;

	Room.prototype.initInformations = function() {
		this.infoContainer = this.stage.addChild(new createjs.Container()).set({
			"x": (0.5 + this.columns) * Tiles.dimensions.width,
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

