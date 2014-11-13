
define(function(require) {

	var Handlers = function() {
		this.init();	
	};

	$.extend(Handlers.prototype, {
		"init": function() {
			document.onkeydown = this.handleKeyDown.bind(this);
		},

		'handleKeyDown': function(evt) {
			evt = (evt) ? evt : ((window.event) ? event : null);

			if (evt) {
				console.log(evt.keyCode);
				switch (evt.keyCode-evt.keyCode) {
					case 37: //left
						if(posH>0){
							if (aNivelActual[posV].charAt(posH-1)==" " || aNivelActual[posV].charAt(posH-1)=="."){
								numM++;
								inJugador(posV,posH-1);	
								outBloque(posV,posH);
								strMovimientos += "l";
								posH = posH - 1;
							}else if (aNivelActual[posV].charAt(posH-1)=="$" || aNivelActual[posV].charAt(posH-1)=="*"){
								if(posH-2>0){
									c = aNivelActual[posV].charAt(posH-2);
									if (c == " " || c == "."){
										numP++;
										inTesoro(posV,posH-2);
										outBloque(posV,posH-1);
										inJugador(posV,posH-1);
										outBloque(posV,posH);
										strMovimientos += "L";
										posH = posH - 1;
									}
								}
							}
		    		}
						break;    
					case 38: //up
						if(posV>0){
							if (aNivelActual[posV-1].charAt(posH)==" " || aNivelActual[posV-1].charAt(posH)=="."){
								numM++;
								inJugador(posV-1,posH);
								outBloque(posV,posH);
								strMovimientos += "u";
								posV = posV - 1;
							}else if (aNivelActual[posV-1].charAt(posH)=="$" || aNivelActual[posV-1].charAt(posH)=="*"){
								if(posV-2>0){
									c = aNivelActual[posV-2].charAt(posH);
									if (c == " " || c == "."){
										numP++;
										inTesoro(posV-2,posH);
										outBloque(posV-1,posH);
										inJugador(posV-1,posH);
										outBloque(posV,posH);
										strMovimientos += "U";
										posV = posV - 1;
									}	
								}
							}
						}
		        break;    
					case 39: //right
						if(posH<maxH){
							if (aNivelActual[posV].charAt(posH+1)==" " || aNivelActual[posV].charAt(posH+1)=="."){
								numM++;
								inJugador(posV,posH+1);
								outBloque(posV,posH);
								strMovimientos += "r";
								posH = posH + 1;
							}else if (aNivelActual[posV].charAt(posH+1)=="$" || aNivelActual[posV].charAt(posH+1)=="*"){
								if(posH+2<maxH){
									c = aNivelActual[posV].charAt(posH+2);
									if (c == " " || c == "."){
										numP++;
										inTesoro(posV,posH+2);
										outBloque(posV,posH+1);
										inJugador(posV,posH+1);
										outBloque(posV,posH);
										strMovimientos += "R";
										posH = posH + 1;
									}	
								}
		    			}
		    		}
						break;    
					case 40: //down
						if(posV<maxV){
							if (aNivelActual[posV+1].charAt(posH)==" " || aNivelActual[posV+1].charAt(posH)=="."){
								numM++;
								inJugador(posV+1,posH);
								outBloque(posV,posH);
								strMovimientos += "d";
								posV = posV + 1;
							}else if(aNivelActual[posV+1].charAt(posH)=="$" || aNivelActual[posV+1].charAt(posH)=="*"){
								if(posV+2<maxV){
									c = aNivelActual[posV+2].charAt(posH);
									if (c == " " || c == "."){
										numP++;
										inTesoro(posV+2,posH);
										outBloque(posV+1,posH);
										inJugador(posV+1,posH);
										outBloque(posV,posH);
										strMovimientos += "D";
										posV = posV + 1;
									}	
								}
		    			}
		    		}
						break;    
					case 90: //Z
						if (evt.ctrlKey){
							this.commandList.goBack();
						}
						break;
					case 89: //Y
						if (evt.ctrlKey){
							this.commandList.goForward();
						}
						break;
				}
				this.stopBubbleEvent(evt);
				pintarEstado();
			}
		},

		'stopBubbleEvent': function(e){
			//e.cancelBubble is supported by IE - this will kill the bubbling process.
			if (document.all){
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

