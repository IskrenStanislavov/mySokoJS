define(function(require){
    var CustomLoader = require("libs/loader");
    var Stage        = require("libs/custom_stage");
    var PIXI        = require("libs/pixi");

    new CustomLoader({resources:[
        "img/sprite.json",
        ], onComplete: function(){
            var stage = new Stage();
            window.app = stage.addChild(PIXI.Sprite.fromFrame("player_normal"));
            stage.setAutoFit({W:200,H:350});
            stage.resize();
        }
    });
});
