// XXX: can undo redo functionality in context menu
// see: http://www.javascripttoolbox.com/lib/contextmenu/

define(function(require) {
	var Logic       = require("logics/sokoban");

	var Handlers = function(commandList, stage, callback) {
		this.commandList = commandList;
	};

	Handlers.prototype.handleDown = function( event ) {
	    if ( event.nativeEvent.button == 2 ) { 
	        alert('rightclick');
	        return; 
	    } 
		if ( this.logic.inDrag() ){
			return event.preventDefault();
		}
		if ( this.logic.isSolved() ){
			//wait for a new puzzle
			return;
		}
		this.logic.startDrag(event);
		console.log('down', event, 'down at:('+this.startX+','+this.startY+')');
	};

	Handlers.prototype.handleMove = function( event ) {
		if ( !this.logic.inDrag() ){
			return;
		}
		if ( this.logic.isSolved() ){
			//wait for a new puzzle
			return;
		}

		this.stopBubbleEvent(event);
		this.logic.updateDragPosition(event);
		this.stage.update();
	};

	Handlers.prototype.handleUp = function( event ) {
		if ( !this.logic.inDrag() ){
			return;
		}
		if ( this.logic.isSolved() ){
			//wait for a new puzzle
			return;
		}
		// this.logic.endDrag( event );
		this.commandList.addCommand(this.logic.endDrag( event ));
		console.log('  up', event);
	};

	Handlers.prototype.refresh = function(logic, stage) {
		// enable touch interactions if supported on the current device:
		this.stage = stage;
		this.logic = logic;
		createjs.Touch.enable( this.stage, true, true ); //single touch, prevent default
		this.stage.on('mousedown', this.handleDown, this);
		this.stage.on('pressmove', this.handleMove, this);
		this.stage.on('pressup', this.handleUp, this);
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

