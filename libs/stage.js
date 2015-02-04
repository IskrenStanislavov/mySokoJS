define(function(require) {

	var createjs	= require('libs/easeljs-0.7.1.min');
	var Stage = function(){
		createjs.Stage.call(this, "game");

		this.init();
	};

	$.extend(Stage.prototype, createjs.Stage.prototype);

	$.extend(Stage.prototype, {
		init: function() {
			this.enableMouseOver(-1);
			this.enableDOMEvents(false);// mouse events

			createjs.Ticker.useRAF = true;
			createjs.Ticker.setFPS(25);
			createjs.Ticker.addEventListener("tick", this);//update the stage

			this.bg = new createjs.Shape();
			this.bg.graphics.beginFill("black").drawRect(0, 0, 10000, 10000);
			this.addChild(this.bg);
			this.update();
		},

	});

	return Stage; 
});
