
define(function(require) {
	var Signal = require('libs/signals.min');

	var Handlers = function() {
		this.currentKeyDown = null;
		this.action = new Signal();
		this.config = {'moves':{
			// keyCode | action
			37: "left",
			38: "up",
			39: "right",
			40: "down",
		}, "history":{
			90: "undo",//ctrl+Z
			89: "redo",//ctrl+Y
			82: "revertAll"//ctrl+R
		}}
		document.onkeydown = this.keyDown.bind(this);
		document.onkeyup = this.keyUp.bind(this);
	};


	Handlers.prototype.getEvent = function(evt) {
		return (evt) ? evt : ((window.event) ? window.event : null);
	};

	Handlers.prototype.keyDown = function(evt) {
		if (this.currentKeyDown !== null){
			return;
		}
		evt = this.getEvent(evt);
		if (evt) {
			var stopBubble;
			if ( evt.ctrlKey ) {
				stopBubble = this.handleCtrlCombination(evt.keyCode);
			} else {
				stopBubble = this.handleSingleKey(evt.keyCode);
			}
			if (stopBubble) {
				this.currentKeyDown = evt.keyCode;
				this.stopBubbleEvent(evt);
			}
		}
	};

	Handlers.prototype.handleCtrlCombination = function( keyId ) {
		//XXX: think of ctrl+left.. as а go to the most left.. posible
		var change = this.config.history[keyId];
		if ( change ){
			this.action.dispatch({type:"key", action:change, direction:null});
		}
		return !!change;
	};

	Handlers.prototype.handleSingleKey = function(keyId) {
		var move = this.config.moves[keyId];
		if (move){
			this.action.dispatch({type:"key", action:"move", direction:move});
		}
		return !!move;
	};

	Handlers.prototype.keyUp = function(evt) {
		evt = this.getEvent(evt);
		if ( evt.keyCode === this.currentKeyDown ) {
			this.currentKeyDown = null;
		}
	};

	Handlers.prototype.stopBubbleEvent = function(e) {
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
	};

	return Handlers;
});

