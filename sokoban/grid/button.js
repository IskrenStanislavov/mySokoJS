define(function(require) {
    var PIXI        = require("libs/pixi");
    var GridPoint   = require("libs/grid_point");

	var GridButton = function( icon, column, row ) {
		PIXI.DisplayObjectContainer.call(this);

		this.background = this.addChild(new PIXI.Sprite.fromFrame("wall_normal"));
		this.main = this.addChild(new PIXI.Sprite.fromFrame(icon));
		this.position = new GridPoint(column, row);
	};
	GridButton.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);

	return GridButton;
});
