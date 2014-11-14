
define(function(require) {

	var Handlers = function(commandList) {
		this.commandList = commandList;
		this.init();	
	};

	$.extend(Handlers.prototype, {
		"init": function() {
			document.onkeydown = this.handleKeyDown.bind(this);
	        // createjs.Touch.enable(this.freeSpinsStage);

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
				}
				this.stopBubbleEvent(evt);
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

