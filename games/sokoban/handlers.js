
define(function(require) {

	var Handlers = function() {
		this.init();	
	};

	$.extend(Handlers.prototype, {
		"init": function() {
			document.onkeydown = this.handleKeyDown.bind(this);
	        // createjs.Touch.enable(this.freeSpinsStage);

		},

		'handleKeyDown': function(evt) {
			evt = (evt) ? evt : ((window.event) ? window.event : null);

			if (evt) {
				if (evt.keyCode === 37) {
					this.commandList.addMove("Left");
				} else if (evt.keyCode === 38) {
					this.commandList.addMove("Up");
				} else if (evt.keyCode === 39) {
					this.commandList.addMove("Right");
				} else if (evt.keyCode === 40) {
					this.commandList.addMove("Down");
				} else if (evt.keyCode === 90) {
					if (evt.ctrlKey) {
						this.commandList.goBack();
					}
				} else if (evt.keyCode === 89) {
					if (evt.ctrlKey) {
						this.commandList.goForward();
					}
				}
				this.stopBubbleEvent(evt);
				// pintarEstado();
						// if(posH>0){
						// 	if (aNivelActual[posV].charAt(posH-1)==" " || aNivelActual[posV].charAt(posH-1)=="."){
						// 		numM++;
						// 		inJugador(posV,posH-1);	
						// 		outBloque(posV,posH);
						// 		strMovimientos += "l";
						// 		posH = posH - 1;
						// 	}else if (aNivelActual[posV].charAt(posH-1)=="$" || aNivelActual[posV].charAt(posH-1)=="*"){
						// 		if(posH-2>0){
						// 			c = aNivelActual[posV].charAt(posH-2);
						// 			if (c == " " || c == "."){
						// 				numP++;
						// 				inTesoro(posV,posH-2);
						// 				outBloque(posV,posH-1);
						// 				inJugador(posV,posH-1);
						// 				outBloque(posV,posH);
						// 				strMovimientos += "L";
						// 				posH = posH - 1;
						// 			}
						// 		}
						// 	}
		    // 			}
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

