
define(function(require) {
	
	var Handlers = function( commandList ) {
		this.commandList = commandList;
		this.currentKeyDown = null;
		this.room = null;
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
			var stopBubble = true;
			evt = this.getEvent(evt);
			// XXX: following if can be rewritten - ctrl state && object for keyIds

			if (evt) {
				if (evt.ctrlKey) {
					if (evt.keyCode === 90) {
						this.commandList.goBack();
					} else if (evt.keyCode === 89) {
						this.commandList.goForward();
					} else {
						stopBubble = false;
					}
					//XXX: can be thought about ctrl+left.. as а go to the most left posible
				} else if ( !evt.altKey ) { // actually not really needed
					if (evt.keyCode === 37) {
						this.commandList.addMove("Left");
					} else if (evt.keyCode === 38) {
						this.commandList.addMove("Up");
					} else if (evt.keyCode === 39) {
						this.commandList.addMove("Right");
					} else if (evt.keyCode === 40) {
						this.commandList.addMove("Down");
					} else {
						stopBubble = false;
					}
				} else {
					stopBubble = false;
				}

				if (stopBubble) {
					this.currentKeyDown = evt.keyCode;
					this.stopBubbleEvent(evt);
				}
			}
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

