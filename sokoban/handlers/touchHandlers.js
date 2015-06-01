// XXX: can undo redo functionality in context menu
// see: http://www.javascripttoolbox.com/lib/contextmenu/

define(function(require) {
	var Signal = require('libs/signals.min');
	var Dragging  = require('logics/dragging');

	var Handlers = function(commandList) {
		this.commandList = commandList;
		this.action      = new Signal();
	};

	Handlers.prototype.handleDown = function( event ) {
	    if ( event.nativeEvent.button == 2 ) { 
	        return; 
	    } 
		if ( this.inDrag() ){
			return event.preventDefault();
		}
		this.drag = new Dragging( event );
		this.drag.getActionData = this.logic.getActionData.bind(this.logic);
		this.action.dispatch({type:"touch", action:"startDrag", direction:null});
	};

	Handlers.prototype.handleMove = function( event ) {
		if ( !this.inDrag() ){
			return;
		}
		this.stopBubbleEvent(event);
		this.drag.updatePosition(event);
		this.action.dispatch({type:"touch", action:"drag", direction:null});
	};

	Handlers.prototype.handleUp = function( event ) {
		if ( !this.inDrag() ){
			return;
		}
		this.commandList.addCommand(this.drag.end(event));
		this.drag = null;

		this.action.dispatch({type:"touch", action:"endDrag", direction:null});
	};

	Handlers.prototype.inDrag = function(){
		return this.drag && this.drag.inProgress;
	};

	Handlers.prototype.refresh = function(logic, stage) {
		// enable touch interactions if supported on the current device:
		this.logic = logic;
		this.stage = stage;
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

