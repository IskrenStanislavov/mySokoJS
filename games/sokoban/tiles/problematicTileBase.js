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
	var Floor = tileConfig.Floors;

	var Tile = function(kind, floor, sprite){
		this.kind = kind;
		this.floor = floor;
		var animationSS = new createjs.SpriteSheet(tileConfig.getSpriteData(this.kind));
		this.initialize(animationSS, this.kind);
	};

	// Tile.prototype = tileConfig;
	$.extend(Tile, tileConfig);
	Tile.prototype = new createjs.Sprite();
	// Tile.prototype = Object.create(createjs.Sprite);
	Tile.prototype.Sprite_cloneProps = Tile.prototype.cloneProps;// Sprite.
	Tile.prototype.row = 0; // this.row = data.row || 0;
	Tile.prototype.column = 0; // this.column = data.column || 0;
	Tile.prototype.isTarget = false;
	Tile.prototype.hasPlayer = false;
	// Tile.prototype.initialPositions = {
	// 	"row": 0,
	// 	"column": 0,
	// };

	Tile.prototype.cloneProps = function( obj ) {
		// call parent function
		this.Sprite_cloneProps( obj );
		// copy additional data
		obj.kind = this.kind;
		if (this.name === "player") {
			obj.name = this.name
		};
		obj.floor = this.floor;
		obj.initialPositions = {
			"row": this.row,
			"column": this.column,
		};
		// obj.prototype = Object.beget(Tile.prototype);
		$.extend(obj.prototype, Tile.prototype);
	};

	Tile.prototype.cloneAt = function(row, column) {
		// var clonning = this.clone(); //doesnt work - returns Sprite instance
		var clonning = this.clone();
		clonning.initialPositions.row = row;
		clonning.initialPositions.column = column;
		clonning.positionAt(row, column);
		return clonning;
	};

	Tile.prototype.positionAt = function(row, column){
		// used to reposition the tile
		this.row = row;
		this.column = column;
		this.x = this.width * this.column;
		this.y = this.height * this.row;
	};

	Tile.prototype.getKind = function(){
		return this.kind;
	};

	// Tile.prototype.zIndex = function(){
	// 	return this.kind;
	// };

	Tile.prototype.isPlayer = function(){
		return this.name === "player";
	};

	//XXX: Tile.success - animate "win" for the current tile when solved or moved to the correct place
	//XXX: Tile.begin - plays animation when the game starts
	//XXX: Tile.move - plays animation when the player moves the main caracter
	//XXX: Tile.undo - plays animation when the player moves back in the history
	//XXX: TIle.still - static image

	return Tile;

});
