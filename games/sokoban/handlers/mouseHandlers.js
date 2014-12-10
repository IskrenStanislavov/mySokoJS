
define(function(require) {
	var createjs	= require('libs/easeljs-0.7.1.min');

	var Handlers = function(commandList, stage) {
		this.stage = stage;
		this.commandList = commandList;
	};

	$.extend(Handlers.prototype, {
		"init": function() {
			// enabled mouse over / out events
			// this.stage.enableMouseOver(10);
			// this.stage.mouseMoveOutside = false; // no tracking when mouse leaves the canvas
			console.warn("mouse");
			// createjs.Touch.enable(this.stage, {singleTouch:true});// doesnt work here
		},

		"refresh": function() {
			if ( !this.stage.children ) {
				return;
			}
			var player = this.stage.getChildByName("player");
			player && this.allowTouches(player);

		},

		"allowTouches": function(target) {
			console.warn("mouse/touch added to target");
			var ctx = this;
			target.on("mousedown", function(e){
				console.warn("mousedown handled on stage");
				this.stage.removeAllEventListeners('click');
			}, this);
		}
	});

	return Handlers;
});
