
define(function(require) {
	var createjs	= require('libs/easeljs-0.7.1.min');

	var Handlers = function(stage, commandList) {
		this.stage = stage;
		this.commandList = commandList;
	};

	$.extend(Handlers.prototype, {
		"init": function() {
			if ( createjs.Touch.isSupported() ){
				console.warn("touch");
				createjs.Touch.enable(this.stage);
			} else{
				console.warn("mouse");
			} // else: mouse events
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
			this.stage.children.forEach(function(child){
				if (!!child.isPlayer && child.isPlayer()){
					this.allowTouches(child);
				} else {
					this.justLog(child);
				}
			}.bind(this));
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
			var ctx = this;
			target.removeAllEventListeners('mousedown');
			target.removeAllEventListeners('pressmove');
			target.removeAllEventListeners('pressup');
			target.on('mousedown', this.handleDown, ctx);
			target.on('pressmove', this.handleMove, ctx);
			target.on('pressup', this.handleUp, ctx);
		}

	});

	return Handlers;
});

