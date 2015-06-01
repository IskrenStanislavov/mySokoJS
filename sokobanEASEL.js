// Sokoban TODO: board like array of the tiles!!!! 

define(function(require){
    require("libs/zepto.min");
    require("libs/functions");

    var CustomLoader    = require("libs/loader");
	var RoomsContainer 	= require("sokoban/roomsEASEL");
	var Stage  			= require("libs/stageEASEL");
	var Handlers 		= require("sokoban/handlers");

	var handlers;

	sokoban = new Stage("game", {"showBG":true});
	sokoban.addChild(new RoomsContainer());
	sokoban.resize()
	window.sokoban = sokoban;
});
