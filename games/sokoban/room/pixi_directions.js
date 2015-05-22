define(function(require) {
    var PIXI        = require("libs/pixi");
    var GridPoint   = require("libs/grid_point");
    var tileConfig  = require('games/sokoban/tiles/pixi_config');

	var Directions = function( logics, nRows, nColumns ) {
		PIXI.DisplayObjectContainer.call(this);

		this.middleColumn = (nColumns-1)/2;
		console.log(this.middleColumn);

		this.background = this.addChild(new PIXI.TilingSprite( new PIXI.Texture.fromFrame("empty_normal"), nColumns*tileConfig.width, 3*tileConfig.height));

		this.undo = this.addChild(new PIXI.Sprite.fromFrame("icon_undo"));
		this.undo.position = new GridPoint(0,0);
		this.redo = this.addChild(new PIXI.Sprite.fromFrame("icon_redo"));
		this.redo.position = new GridPoint(nColumns-1, 0);
		this.up = this.addChild(new PIXI.Sprite.fromFrame("up.png"));
		this.up.position = new GridPoint(this.middleColumn, 0);
		this.down = this.addChild(new PIXI.Sprite.fromFrame("down.png"));
		this.down.position = new GridPoint(this.middleColumn, 2);
		this.left = this.addChild(new PIXI.Sprite.fromFrame("left.png"));
		this.left.position = new GridPoint(this.middleColumn-1,1);
		this.right = this.addChild(new PIXI.Sprite.fromFrame("right.png"));
		this.right.position = new GridPoint(this.middleColumn+1,1);

	};

	Directions.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
	return Directions;
});
