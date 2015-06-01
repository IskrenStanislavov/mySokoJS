define(function(require){
    require("libs/zepto.min");
    require("libs/functions");

    var CustomLoader    = require("libs/loader");
	var RoomsContainer 	= require("sokoban/pixi_rooms");
	var Stage  			= require("libs/custom_stage");

    new CustomLoader({resources:[
        "img/sprite.json",
        "img/arrow.png",
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
