define(function(require) {
	var roomConfig  = require("games/sokoban/room/config");
	var Logic  = require("games/sokoban/room/logic");
	var Records  = require("games/sokoban/room/records");
	var parseWalls  = require("games/sokoban/room/walls");
    var PIXI        = require("libs/pixi");
	var Tile 		= require('games/sokoban/tiles/pixi_tiles');
	var tileConfig  = require('games/sokoban/tiles/pixi_config');

	
	var Room = function( level ){
		PIXI.DisplayObjectContainer.call(this);
		this.level = level;
		this.parseTiles();
		this.parseWalls(this.interiorTiles);
		this.W = this.columns * tileConfig.dimensions.width + roomConfig.additionalWidth;
		this.H = (this.rows+1) * tileConfig.dimensions.height;

		this.initInformations();
		this.logic = new Logic(this.player, this.interiorTiles);
	};
	Room.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);


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

	Room.prototype.initInformations = function() {
		this.infoContainer = this.addChild(new PIXI.DisplayObjectContainer())
		this.infoContainer.x = (0.5 + this.columns) * tileConfig.dimensions.width;
		// this.infoContainer.name = info;

		// this.texts = roomConfig.texts;
		this.texts = [
			{
				text: "Authors:",
				type:"label",
				style: {
					font: "22px Verdana",
					fill: '#7f4746',
					align: 'left',
					lineHeight:22,
				},
				position: new PIXI.Point(19, 0)
			},
			{
				text: "\n\nGerry Wiseman - skin\nIskren Stanislavov - logics",
				type:"label",
				style: {
					font: "13px Arial",
					fill: '#998892',
					align: 'left',
					lineHeight:16,
				},
				position: new PIXI.Point(0, 0)
			},
			{
				text: "Moves:\nPushes:",
				type:"label",
				style: {
					font: "13px Arial",
					fill: '#998892',
					align: 'left',
					lineHeight:18,
				},
				position: new PIXI.Point(0, 100)
			},
			{
				text: "108\n97",
				type:"counts",
				style: {
					font: "bold 14px Arial",
					fill: '#7f4746',
					align: 'left',
					lineHeight:18,
					
				},
				position: new PIXI.Point(50, 100)
			},
		];
		this.texts.forEach(function(textData,i){
			var textObject;
			textObject = this.infoContainer.addChild(new PIXI.Text(textData.text, textData.style));
			textObject.position = textData.position;
			if (textData.type === "counts"){
					this.records = new Records(textObject);
			}
		}.bind(this));
	};

	return Room;
});

