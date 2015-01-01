
define(function(require) {
	var Command = require("games/sokoban/command");

	var Handlers = function( commandList ) {
		this.commandList = commandList;
		this.currentKeyDown = null;
		this.room = null;
		this.config = {'moves':{
			// keyCode | action
			37: "Left",
			38: "Up",
			39: "Right",
			40: "Down",
		}, "history":{
			90: "undo",
			89: "redo"
		}}
	};

	$.extend(Handlers.prototype, {

		"init": function() {
			document.onkeydown = this.keyDown.bind(this);
			document.onkeyup = this.keyUp.bind(this);
			console.warn("keys");
		},

		'getEvent': function(evt) {
			return (evt) ? evt : ((window.event) ? window.event : null);
		},

		'keyDown': function(evt) {
			if ( this.room === null || this.room.checkForSolved() ){
				//wait for a new puzzle
				return;
			}
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
		},

		'handleCtrlCombination': function( keyId ) {
			//XXX: think of ctrl+left.. as а go to the most left.. posible
			var change = this.config.history[keyId];
			if (change === "undo") {
				this.commandList.goBack();
			} else if (change === "redo") {
				this.commandList.goForward();
			}
			return !!change;
		},

		'handleSingleKey': function(keyId) {
			var move = this.config.moves[keyId];
			this.commandList.addMove(move);
			return !!move;
		},

		"keyUp": function(evt) {
			evt = this.getEvent(evt);
			if ( evt.keyCode === this.currentKeyDown ) {
				this.currentKeyDown = null;
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

		"refresh": function(room) {
			this.room = room;
			return null;
		}

	});

	return Handlers;
});

