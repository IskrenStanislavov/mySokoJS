define(function(require) {
    var PIXI        = require("libs/pixi");
	var tileConfig  = require('games/sokoban/tiles/pixi_config');

	var Directions = function() {
		PIXI.DisplayObjectContainer.call(this);
		var tileWidth = tileConfig.dimensions.width;
		var tileHeight = tileConfig.dimensions.height;

		this.right = this.addChild(new PIXI.Sprite.fromImage("img/arrow.jpg"));
		this.right.rotation = 0;
		this.right.position.set(tileWidth, 0);

		this.left = this.addChild(new PIXI.Sprite.fromImage("img/arrow.jpg"));
		this.left.rotation = -Math.PI;
		this.left.position.set(0, tileHeight);

		this.up = this.addChild(new PIXI.Sprite.fromImage("img/arrow.jpg"));
		this.up.rotation = -Math.PI*0.5;
		this.up.position.set(0, 0);

		this.down = this.addChild(new PIXI.Sprite.fromImage("img/arrow.jpg"));
		this.down.rotation = Math.PI*0.5;
		this.down.position.set(tileWidth, tileHeight);


	};
	Directions.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
	return Directions;
});
