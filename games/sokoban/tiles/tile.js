// in this file is the sprite related logic of the tiles

//XXX: Tile.success - animate "win" for the current tile when solved or moved to the correct place
//XXX: Tile.begin - plays animation when the game starts
//XXX: Tile.move - plays animation when the player moves the main caracter
//XXX: Tile.undo - plays animation when the player moves back in the history
//XXX: TIle.still - static image
//XXX: TIle.onTarget - changes tile to be on a target place - can be a setter/getter


define(function(require) {
	var tileConfig  = require('games/sokoban/tiles/config');

	var Tile = function(kind, spriteSheet){
		this.name = this.kind = kind;
		if ( spriteSheet === undefined ) {
			spriteSheet = new createjs.SpriteSheet(tileConfig[kind]);
		}
		createjs.Sprite.call(this, spriteSheet);
	};

	Tile.prototype = Object.create( createjs.Sprite.prototype );

	Tile.dimensions = tileConfig.dimensions;

	Tile.prototype.dimensions = tileConfig.dimensions;
	Tile.prototype.initialPositions = {"row":0, "column":0};
	Tile.prototype.row = 0;
	Tile.prototype.column = 0;

	Tile.prototype.cloneAt = function(row, column, onTarget) {
		// var clonning = this.clone(); //doesnt work - returns Sprite instance
		//spriteSheet.clone() cannot be cloned!!
		var clonning = new Tile(this.kind, this.spriteSheet);
		clonning.initialPositions.row = row;
		clonning.initialPositions.column = column;
		clonning.positionAt(row, column);
		if (this.isPlayer()) {
			clonning.name = "player";
		}
		clonning.setOnTarget(onTarget);
		return clonning;
	};

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
			this.gotoAndStop( this.kind );
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

	Tile.prototype.redrawWall = function(newWall) {
		this.gotoAndStop(newWall);
	};

	Tile.prototype.isPlayer = function(){
		return this.kind === "player";
	};

	Tile.prototype.setFree = function(){
		return this.kind = "transparent";
	};



	return Tile;

});
