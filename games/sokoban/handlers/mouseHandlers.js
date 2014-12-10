
define(function(require) {
	var createjs	= require('libs/easeljs-0.7.1.min');

	var Handlers = function(commandList, stage) {
		this.stage = stage;
		this.commandList = commandList;
	};

	$.extend(Handlers.prototype, {
		"init": function() {
			// enabled mouse over / out events
			this.stage.enableMouseOver(10);
			this.stage.mouseMoveOutside = false; // no tracking when mouse leaves the canvas
			this.stage.addEventListener('click', function(evt){
				console.warn("clickOK")
			})
			console.warn("mouse");
			// createjs.Touch.enable(this.stage, {singleTouch:true});// doesnt work here
		},

		"handleDown": function( event ) {
			this.startX = event.stageX;
			this.startY = event.stageY;
			console.log('down', event, 'down at:('+event.stageX+','+event.stageY+')');
		},

		"logDown": function( event ) {
			var x = event.target.column;
			var y = event.target.row;
			var kind = event.target.getKind();
			console.log('tile:', kind, 'down at:('+x+','+y+')');
		},

		"handleMove": function( event ) {
			// console.log('move', event);
			var deltaX = this.startX - event.stageX;
			var deltaY = this.startY - event.stageY;
			var xCondition = (Math.abs(deltaX) > event.target.width);
			var yCondition = (Math.abs(deltaY) > event.target.height);
			if ( xCondition || yCondition ) {
				event.remove();
				this.stage.removeChild(event.target);
				this.stage.addChild(event.target);
				if (Math.abs(deltaX) > Math.abs(deltaY)){
					if (deltaX > 0){
						// this.startX += event.target.width;
						this.commandList.addMove("Right");
					} else {
						// this.startX -= event.target.width;
						this.commandList.addMove("Left");
					}
				} else {
					if (deltaY > 0){
						// this.startY += event.target.height;
						this.commandList.addMove("Up");
					} else {
						// this.startY -= event.target.height;
						this.commandList.addMove("Down");
					}
				}
				// event.target.x = this.startX;
				// event.target.y = this.startY;
			}
		},

		"handleUp": function( event ) {
			console.log('up', event);
			event.remove();
			this.allowTouches(event.target);
			// this.startX = event.x;
			// this.startY = event.y;
		},

		"refresh": function() {
			if ( !this.stage.children ) {
				return;
			}
			var player = this.stage.getChildByName("player");
			this.allowTouches(player);
			// this.stage.children.forEach(function(child){
			// 	child
			// 	if (!!child.isPlayer && child.isPlayer()){
			// 		this.allowTouches(child);
			// 	// } else {
			// 	// 	this.justLog(child);
			// 	}
			// }.bind(this));
		},

		"justLog": function(target) {
			var ctx = this;
			target.removeAllEventListeners('mousedown');
			target.removeAllEventListeners('pressmove');
			target.removeAllEventListeners('pressup');
			target.on('mousedown', this.logDown, ctx);
			// target.on('pressmove', this.handleMove, ctx);
			// target.on('pressup', this.handleUp, ctx);
		},

		"allowTouches": function(target) {
console.warn("mouse/touch added to target");
			var ctx = this;
			target.addEventListener("click", function(e){
				console.warn("mousedown handled on stage");
				this.stage.removeAllEventListeners('click');
			}, this);
		}

	});

	return Handlers;
});

