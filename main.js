define(function(require){
    require("libs/zepto.min");
    require("libs/functions");

    var CustomLoader = require("libs/loader");
    var Sokoban        = require("games/pixi_sokoban");

    new CustomLoader({resources:[
        "img/sprite.json",
        "img/arrow.jpg",
        ], onComplete: function(){
            window.app = new Sokoban();
        }
    });
});
