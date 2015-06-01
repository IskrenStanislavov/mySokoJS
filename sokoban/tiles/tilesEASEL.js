// in this file is the sprite related logic of the tiles

//XXX: Tile.success - animate "win" for the current tile when solved or moved to the correct place
//XXX: Tile.begin - plays animation when the game starts
//XXX: Tile.move - plays animation when the player moves the main caracter
//XXX: Tile.undo - plays animation when the player moves back in the history
//XXX: TIle.still - static image
//XXX: TIle.onTarget - changes tile to be on a target place - can be a setter/getter


define(function(require) {
	var tileConfig  = require('sokoban/config/tiles');

	var Tile = function(data){
		this.name = this.kind = data.kind;
		var spriteSheet = new createjs.SpriteSheet(tileConfig[data.kind]);
		createjs.Sprite.call(this, spriteSheet);
		this.positionAt(data.row, data.column);
		this.setOnTarget(data.onTarget);
		if (this.isWall()){
			this.gotoAndStop(data.texture);
		}

	};

	Tile.prototype = Object.create( createjs.Sprite.prototype );

	Tile.dimensions = tileConfig.dimensions;

	Tile.prototype.dimensions = tileConfig.dimensions;
	Tile.prototype.row = 0;
	Tile.prototype.column = 0;

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
			this.gotoAndStop( "onTarget" );
		} else {
			this.gotoAndStop( "normal" );
		}
	};

	Tile.prototype.isOnTarget = function(){
		return this.onTarget;
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

	return Tile;

});
