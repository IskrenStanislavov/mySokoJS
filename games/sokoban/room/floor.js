define(function(require) {
	var createjs	= require('libs/easeljs-0.7.1.min');
	require('libs/underscore');

	var joinFloor = function(tiles) {
		this.floorContainer = new createjs.Container();
		_.flatten(tiles, true).forEach(function(tile){
			this.floorContainer.addChild(tile.sprite);
		}.bind(this));
		this.floorContainer.name = "floor";
		return this.floorContainer;
	};

	return joinFloor;
});

