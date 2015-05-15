// in this file is the sprite related logic of the tiles

//XXX: Tile.success - animate "win" for the current tile when solved or moved to the correct place
//XXX: Tile.begin - plays animation when the game starts
//XXX: Tile.move - plays animation when the player moves the main caracter
//XXX: Tile.undo - plays animation when the player moves back in the history
//XXX: TIle.still - static image
//XXX: TIle.onTarget - changes tile to be on a target place - can be a setter/getter


define(function(require) {
	var tileConfig  = require('games/sokoban/tiles/pixi_config');
	var PIXI        = require("libs/pixi");

	var Tile = function(tileData){
		var texturesData = tileConfig[tileData.kind];
		this.name = this.kind = tileData.kind;
		this.tileTextures = {};
		Object.keys(tileConfig[tileData.kind].animations).forEach(function(key, idx){
			this.tileTextures[key] = PIXI.Texture.fromFrame(tileData.kind+"_"+key);
		}.bind(this));
		PIXI.Sprite.call(this, this.tileTextures.normal);

		this.initialPositions.row = tileData.row;
		this.initialPositions.column = tileData.column;
		this.positionAt(tileData.row, tileData.column);
		this.setOnTarget(tileData.onTarget);

		if (this.isWall()) {
			this.setTexture(this.tileTextures[tileData.texture]);
		}
	};

	Tile.prototype = Object.create( PIXI.Sprite.prototype );

	Tile.dimensions = tileConfig.dimensions;

	Tile.prototype.dimensions = tileConfig.dimensions;
	Tile.prototype.initialPositions = {"row":0, "column":0};


	Tile.prototype.positionAt = function(row, column){
		// used to reposition the tile
		this.row = row;
		this.column = column;
		this.x = this.dimensions.width * this.column;
		this.y = this.dimensions.height * this.row;
		// console.warn(this.kind, "positioned@", this.x, this.y);
	};

	Tile.prototype.setOnTarget = function( value ){
		this.onTarget = value;
		if (value){
			this.setTexture(this.tileTextures.onTarget);
		} else {
			this.setTexture(this.tileTextures.normal);
		}
	};

	Tile.prototype.isOnTarget = function(){
		return this.onTarget;
	};

	Tile.prototype.getKind = function(){
		return this.kind;
	};

	Tile.prototype.isWall = function(){
		return this.kind === "wall";
	};

	Tile.prototype.isBox = function(){
		return this.kind === "box";
	};

	Tile.prototype.isFree = function(){
		return this.kind === "empty";
	};

	Tile.prototype.isPlayer = function(){
		return this.kind === "player";
	};

	Tile.prototype.setFree = function(){
		return this.kind = "transparent";
	};



	return Tile;

});
