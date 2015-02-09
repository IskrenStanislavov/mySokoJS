
define(function(require) {
	var TileFactory = require('games/sokoban/tiles/factory');
	var TileConfig = require('games/sokoban/tiles/config');
	var factory = new TileFactory();

	return {
		'newTile': factory.newTile.bind(factory),
		"player": factory.player,
		"dimensions": TileConfig.dimensions,
	};

});
