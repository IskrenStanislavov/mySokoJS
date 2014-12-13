// in this file is the sprite related logic of the tiles

//XXX: separate sprite from move and maths logics
if (typeof Object.beget !== 'function') {
	Object.beget = function(o) {
    	var F = function() {};
        F.prototype = o;
        return new F();
    };
}

define(function(require) {
	var createjs	= require('libs/easeljs-0.7.1.min');
	var tileConfig  = require('games/sokoban/tiles/config');
	var SpriteBase  = require('games/sokoban/tiles/spriteBase');
	var Floor = tileConfig.Floors;

	var Tile = function(kind, floor, sprite){
		this.kind = kind;
		this.floor = floor;

		if ( sprite === undefined ) {
			sprite = new SpriteBase(kind, floor);
		}
		this.sprite = sprite.clone();
	};

	Tile.dimensions = tileConfig.dimensions;

	Tile.prototype.dimensions = tileConfig.dimensions;
	Tile.prototype.initialPositions = {"row":0, "column":0};
	Tile.prototype.row = 0;
	Tile.prototype.column = 0;

	Tile.prototype.cloneAt = function(row, column) {
		// var clonning = this.clone(); //doesnt work - returns Sprite instance
		var clonning = new Tile(this.kind, this.floor, this.sprite);
		clonning.initialPositions.row = row;
		clonning.initialPositions.column = column;
		clonning.positionAt(row, column);
		return clonning;
	};

	Tile.prototype.positionAt = function(row, column){
		// used to reposition the tile
		this.row = row;
		this.column = column;
		this.sprite.x = this.dimensions.width * this.column;
		this.sprite.y = this.dimensions.height * this.row;
		console.warn(this.kind, "positioned@", this.sprite.x, this.sprite.y);
	};

	Tile.prototype.getKind = function(){
		return this.kind;
	};

	Tile.prototype.isPlayer = function(){
		return this.kind === "player";
	};

	//XXX: Tile.success - animate "win" for the current tile when solved or moved to the correct place
	//XXX: Tile.begin - plays animation when the game starts
	//XXX: Tile.move - plays animation when the player moves the main caracter
	//XXX: Tile.undo - plays animation when the player moves back in the history
	//XXX: TIle.still - static image

	return Tile;

});
