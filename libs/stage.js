define(function(require) {

	var createjs	= require('libs/easeljs-0.7.1.min');
	var Stage = function(){
        this.enableMouseOver(-1);
        this.enableDOMEvents(false);// mouse events
		this.init();
		this.width = this.canvas.width;
		this.height = this.canvas.height;

		// this.events = {
		// 	'imageLoadingDone':new Signal()
		// },
	};

	$.extend(Stage.prototype, new createjs.Stage("game"));

	$.extend(Stage.prototype, {
		init: function() {
			this.initialize("game");// parent init
			createjs.Ticker.useRAF = true;
			createjs.Ticker.setFPS(25);
			createjs.Ticker.addEventListener("tick", this);//update the stage

			// this.circle = new createjs.Shape();
			// this.circle.graphics.beginFill("red").drawCircle(0, 0, 50);
			// this.circle.x = 100;
			// this.circle.y = 100;
			// this.addChild(this.circle);
			// this.update();
		},

	});

	return Stage; 
});
