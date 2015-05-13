// XXX: can undo redo functionality in context menu
// see: http://www.javascripttoolbox.com/lib/contextmenu/

define(function(require) {
	var Logic       = require("games/sokoban/room/logic");

	var Handlers = function(commandList, logic) {
		this.logic = logic;
		this.commandList = commandList;
	};

	$.extend(Handlers.prototype, {

		"handleDown": function( event ) {
		    if ( event.nativeEvent.button == 2 ) { 
		        alert('rightclick');
		        return; 
		    } 
			if ( this.logic.inDrag() ){
				return event.preventDefault();
			}
			if ( this.logic.checkForSolved() ){
				//wait for a new puzzle
				return;
			}
			this.logic.startDrag(event);
			console.log('down', event, 'down at:('+this.startX+','+this.startY+')');
		},

		"handleMove": function( event ) {
			if ( !this.logic.inDrag() ){
				return;
			}
			if ( this.logic.checkForSolved() ){
				//wait for a new puzzle
				return;
			}

			this.stopBubbleEvent(event);
			this.logic.updateDragPosition(event);
		},

		"handleUp": function( event ) {
			if ( !this.logic.inDrag() ){
				return;
			}
			if ( this.logic.checkForSolved() ){
				//wait for a new puzzle
				return;
			}
			// this.logic.endDrag( event );
			this.commandList.addCommand(this.logic.endDrag( event ));
			console.log('  up', event);
		},

		"refresh": function(logic) {
			if ( !this.stage.children ) {
				return;
			}
			// this.stage.interactive = true;
			// this.stage.mousedown = this.stage.touchstart = this.handleDown.bind(this);
			// this.stage.mousemove = this.stage.touchmove = this.handleMove.bind(this);
			// this.stage.mouseup = this.stage.touchend = this.handleUp.bind(this);
			// this.stage.on('pressup', this.handleUp, this);
			this.logic = logic;
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

