define(function(require) {

	var createjs	= require('libs/easeljs-0.7.1.min');
	var Stage = function(){
		$.extend(this, new createjs.Stage("game"));
		this.init();
		this.width = this.canvas.width;
		this.height = this.canvas.height;

		// this.events = {
		// 	'imageLoadingDone':new Signal()
		// },
	};

	$.extend(Stage.prototype, {
		init: function() {
			// enabled mouse over / out events
			this.enableMouseOver(10);
			this.mouseMoveOutside = false; // no tracking when mouse leaves the canvas

			createjs.Ticker.useRAF = true;
			createjs.Ticker.setFPS(25);
			createjs.Ticker.addEventListener("tick", this);//update the stage
			// enable touch interactions if supported on the current device:
			createjs.Touch.enable(this, {singleTouch:true});
		},
		add:function(child) {
			this.addChild(child);
		},

		addGame: function(tray) {
			var that = this;
			this.canvas.width  = tray.width;
			this.canvas.height = tray.height;

			tray.tiles && tray.tiles.forEach(function(tile, i){
				that.add(tile);
			});
			tray.player && that.addChildAt(tray.player, tray.tiles.length);
		}

	});

	return Stage; 
});