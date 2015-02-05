define(function(require) {

	var createjs	= require('libs/easeljs-0.7.1.min');
	var Stage = function( canvasId, settings ){
		createjs.Stage.call(this, canvasId);

		this.initSettings(settings);
	};

	$.extend(Stage.prototype, createjs.Stage.prototype);

	$.extend(Stage.prototype, {
		initSettings: function(settings) {
			this.enableMouseOver(-1);
			this.enableDOMEvents(false);// mouse events

			createjs.Ticker.useRAF = true;
			createjs.Ticker.setFPS(25);
			createjs.Ticker.addEventListener("tick", this);//update the stage

			if ( settings && settings.showBG ) {
				this.bg = new createjs.Shape();
				this.bg.graphics.beginFill("black").drawRect(0, 0, 10000, 10000);
				this.addChild(this.bg);
			}
		},

	});

	return Stage; 
});
