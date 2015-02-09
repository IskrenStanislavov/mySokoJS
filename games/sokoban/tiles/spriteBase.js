// in this file is the sprite related logic of the tiles

//XXX: separate sprite from move and maths logics

define(function(require) {
	var createjs	= require('libs/easeljs-0.7.1.min');
	var tileConfig  = require('games/sokoban/tiles/config');
	var Floor = tileConfig.Floors;

	var Sprite = function(kind){
		this.name = this.kind = kind;
		createjs.Sprite.call(this, new createjs.SpriteSheet(tileConfig[this.kind]));
		this.gotoAndStop(kind);

	};

	$.extend(Sprite, tileConfig);
	Sprite.prototype = Object.create( createjs.Sprite.prototype );
	Sprite.prototype.Sprite_cloneProps = Sprite.prototype.cloneProps;// Sprite.

	// createjs.Sprite.clone() calls createjs.Sprite.cloneProps()
	Sprite.prototype.cloneProps = function( obj ) {
		// call parent function
		this.Sprite_cloneProps( obj );
		// copy additional data
		obj.kind = this.kind;
		if (this.name === "player") {
			obj.name = this.name
		};
	};

	return Sprite;

});
