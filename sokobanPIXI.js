define(function(require){
    require("libs/zepto.min");
    require("libs/functions");

    var CustomLoader    = require("libs/loader");
	var RoomsContainer 	= require("sokoban/roomsPIXI");
	var Stage  			= require("libs/stagePIXI");

    new CustomLoader({resources:[
        "img/sprite.json",
        "img/arrows.json",
        ], onComplete: function(){
            var sokoban = new Stage({
				debugBG: true,
				contextMenu: false,
				stageColor: "black",
				canvasId: "game"
			});
			sokoban.addChild(new RoomsContainer());
			window.sokoban = sokoban;
        }
    });
});
