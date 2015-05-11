define(function(require){
    var CustomLoader = require("libs/loader");
    new CustomLoader({resources:[
        "img/sprite.json",
        ], onComplete: function(){
            alert("loader working");
        }
    });
});
