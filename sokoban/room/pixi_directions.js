define(function(require) {
    var PIXI        = require("libs/pixi");
    var GridButton  = require("sokoban/grid/button");
    var tileConfig  = require('sokoban/tiles/pixi_config');

	var Directions = function( logics, nRows, nColumns ) {
		PIXI.DisplayObjectContainer.call(this);

		this.middleColumn = (nColumns-1)/2;

		this.background = this.addChild(new PIXI.TilingSprite( new PIXI.Texture.fromFrame("empty_normal"), nColumns*tileConfig.width, 3*tileConfig.height));
		this.undo = this.addChild(new GridButton("icon_undo", 0, 0));
		this.redo = this.addChild(new GridButton("icon_redo", nColumns-1, 0));

		this.up = this.addChild(new GridButton("up.png", this.middleColumn, 0));
		this.down = this.addChild(new GridButton("down.png", this.middleColumn, 2));
		this.left = this.addChild(new GridButton("left.png", this.middleColumn-1, 1));
		this.right = this.addChild(new GridButton("right.png", this.middleColumn+1, 1));
	};

	Directions.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
	return Directions;
});
