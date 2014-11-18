
define(function(require) {

	var Handlers = function(stage, commandList) {
		this.stage = stage;
		this.commandList = commandList;
		this.init();	
	};

	$.extend(Handlers.prototype, {
		"init": function() {
			document.onkeydown = this.handleKeyDown.bind(this);
			if ( createjs.Touch.isSupported() ){
				createjs.Touch.enable(this.stage);
			}
		},

		"handleDown": function( event ) {
			event.remove();
			this.startX = event.stageX;
			this.startY = event.stageY;
			console.log('down', event, 'down at:('+event.stageX+','+event.stageY+')');
		},

		"handleMove": function( event ) {
			event.target.off('pressmove', this.handleMove, this);
			// console.log('move', event);
			var deltaX = this.startX - event.stageX;
			var deltaY = this.startY - event.stageY;
			var xCondition = (Math.abs(deltaX) > event.target.width);
			var yCondition = (Math.abs(deltaY) > event.target.height);
			if ( xCondition || yCondition ) {
				event.remove();
				if (Math.abs(deltaX) > Math.abs(deltaY)){
					if (deltaX > 0){
						this.startX += event.target.width;
						this.commandList.addMove("Right");
					} else {
						this.startX -= event.target.width;
						this.commandList.addMove("Left");
					}
				} else {
					if (deltaY > 0){
						this.startY += event.target.height;
						this.commandList.addMove("Up");
					} else {
						this.startY -= event.target.height;
						this.commandList.addMove("Down");
					}
				}
			}
		},

		"handleUp": function( event ) {
			console.log('up', event);
			this.allowTouches(event.target);
			event.remove();
			// this.startX = event.x;
			// this.startY = event.y;
		},

		"refresh": function() {
			this.stage.children.forEach(function(child){
				if (!!child.isPlayer && child.isPlayer()){
					this.allowTouches(child);
				}
			}.bind(this));
		},

		"allowTouches": function(target){
			var ctx = this;
			// target.
			target.off('mousedown', this.handleDown, ctx);
			target.off('pressmove', this.handleMove, ctx);
			target.off('pressup', this.handleUp, ctx);

			target.on('mousedown', this.handleDown, ctx);
			target.on('pressmove', this.handleMove, ctx);
			target.on('pressup', this.handleUp, ctx);
		},

		"detach": function(){
			document.onkeydown = null;
			document.onkeyup = function(){
				document.onkeydown = this.handleKeyDown.bind(this);
			}.bind(this);
		},

		'handleKeyDown': function(evt) {
			var doDetach = false;
			evt = (evt) ? evt : ((window.event) ? window.event : null);

			if (evt) {
				if (evt.keyCode === 37) {
					this.commandList.addMove("Left");
					doDetach = true;
				} else if (evt.keyCode === 38) {
					this.commandList.addMove("Up");
					doDetach = true;
				} else if (evt.keyCode === 39) {
					this.commandList.addMove("Right");
					doDetach = true;
				} else if (evt.keyCode === 40) {
					this.commandList.addMove("Down");
					doDetach = true;
				} else if (evt.keyCode === 90) {
					if (evt.ctrlKey) {
						doDetach = true;
						this.commandList.goBack();
					}
				} else if (evt.keyCode === 89) {
					if (evt.ctrlKey) {
						doDetach = true;
						this.commandList.goForward();
					}
				}

				if (doDetach){
					this.detach();
					this.stopBubbleEvent(evt);
				}
			}
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
		},

	});

	return Handlers;
});
