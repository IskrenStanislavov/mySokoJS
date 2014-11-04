define(function(require) {
	require("libs/zepto.min");
	var Sokoban = require("games/sokoban");
	new Sokoban().start({'level':0});
});

