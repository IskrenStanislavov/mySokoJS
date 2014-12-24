// XXX:
//  delta X
//  delta Y
// detect S
// detect V
// detect acc


define(function(require) {
	var createjs	= require('libs/easeljs-0.7.1.min');

	var Handlers = function(commandList, stage) {
		this.stage = stage;
		this.commandList = commandList;
		var canvas = document.getElementById('game');
		var h1 = document.getElementsByTagName('h1')[0];
		document.onresize = function(e) {
			window.scrollTo(0,1);
		};
		document.addEventListener("orientationchange", function() {
			window.scrollTo(0,1);
		});
		document.onmousemove = document.ontouchmove = function(e) {
			e.preventDefault();
			if (e.target.nodeName !== "CANVAS") {
				e.preventDefault();
			}
		};
	};

	$.extend(Handlers.prototype, {
		"init": function() {
			console.warn("touch");
			document.ondrag = function(event){
				alert();
			}.bind(this);
			// enable touch interactions if supported on the current device:
			createjs.Touch.enable( this.stage, true, true ); //single touch, prevent default
		},

		"handleDown": function( event ) {
			this.downFlag = true;
			this.startX = event.stageX;
			this.startY = event.stageY;
			console.log('down', event, 'down at:('+event.stageX+','+event.stageY+')');
		},

		// "logDown": function( event ) {
		// 	var x = event.target.column;
		// 	var y = event.target.row;
		// 	var kind = event.target.getKind();
		// 	console.log('tile:', kind, 'down at:('+x+','+y+')');
		// },

		"handleMove": function( event ) {
			// XXX: check if stopBubbling disables the sliding of the page on the top and the bottom
			this.stopBubbleEvent(event);

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
			} else if (!this.interior){
				this.interior = this.stage.getChildByName("interior");
			}
			var player = this.interior.getChildByName("player");
			this.allowTouches(player);
			// this.stage.children.forEach(function(child){
			// 	if (!!child.isPlayer && child.isPlayer()){
			// 		this.allowTouches(child);
			// 	// } else {
			// 	// 	this.justLog(child);
			// 	}
			// }.bind(this));
		},

		"allowTouches": function(target) {

			var ctx = this;
			target.removeAllEventListeners('mousedown');
			target.removeAllEventListeners('pressmove');
			target.removeAllEventListeners('pressup');
			target.on('mousedown', this.handleDown, ctx);
			target.on('pressmove', this.handleMove, ctx);
			target.on('pressup', this.handleUp, ctx);
			// target.on('mouseup', function(){
			// 	alert('mouseup');
			// }, ctx);
		}, 

		'stopBubbleEvent': function(e) {
			//e.cancelBubble is supported by IE - this will kill the bubbling process.
			if (document.all) {
				e.keyCode = 0;
				e.cancelBubble = true;
				e.returnValue = false;
				e.retainFocus = true;
			}

			//e.stopPropagation works in Firefox.
			if (e.stopPropagation) {
				e.stopPropagation();
				e.preventDefault();
			}
			return false;
		}

	});

	return Handlers;
});

