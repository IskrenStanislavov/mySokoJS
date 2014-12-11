// in this file is the sprite related logic of the tiles

//XXX: separate sprite from move and maths logics

define(function(require) {
	var createjs	= require('libs/easeljs-0.7.1.min');
	var tileConfig  = require('games/sokoban/tiles/config');
	var Floor = tileConfig.Floors;

	var Sprite = function(kind, floor){
		this.kind = kind;
		this.floor = floor;
		this.initialize(
			new createjs.SpriteSheet(tileConfig.getSpriteData(this.kind)),
			this.kind
		);
		if ( this.kind === "player" ){
			this.name = this.kind;
		}

	};

	$.extend(Sprite, tileConfig);
	Sprite.prototype = new createjs.Sprite();
	Sprite.prototype.Sprite_cloneProps = Sprite.prototype.cloneProps;// Sprite.

	// createjs.Sprite.clone() calls createjs.Sprite.cloneProps()
	Sprite.prototype.cloneProps = function( obj ) {
		// call parent function
		this.Sprite_cloneProps( obj );
		// copy additional data
		obj.kind = this.kind;
		obj.floor = this.floor;
		if (this.name === "player") {
			obj.name = this.name
		};
	};

	return Sprite;

});
