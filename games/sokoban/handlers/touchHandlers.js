// XXX: can undo redo functionality in context menu
// see: http://www.javascripttoolbox.com/lib/contextmenu/

define(function(require) {
	var createjs	= require('libs/easeljs-0.7.1.min');
	var Logic       = require("games/sokoban/room/logic");

	var Handlers = function(commandList, stage) {
		this.stage = stage;
		this.commandList = commandList;
		this.room = null;
		var canvas = document.getElementById('game');
		canvas.oncontextmenu = function (e) {
		    e.preventDefault();
		};
		document.onresize = function(e) {
			window.scrollTo(0,1);
		};
		document.addEventListener("orientationchange", function() {
			window.scrollTo(0,1);
		});
		document.onmousemove = document.ontouchmove = function(e) {
			e.preventDefault();
		};
	};

	$.extend(Handlers.prototype, {
		"init": function() {
			console.warn("touch");
			// enable touch interactions if supported on the current device:
			createjs.Touch.enable( this.stage, true, true ); //single touch, prevent default
		},

		"handleDown": function( event ) {
			if ( this.logic.inDrag() ){
				return event.preventDefault();
			}
			if ( !this.logic.gameInProgress() || this.logic.checkForSolved() ){
				//wait for a new puzzle
				return;
			}

			if ( !this.logic.gameInProgress() || this.logic.checkForSolved() ){
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
			if ( !this.logic.gameInProgress() || this.logic.checkForSolved() ){
				//wait for a new puzzle
				return;
			}

			this.stopBubbleEvent(event);
			var direction = this.logic.addDrag(event);
			if (!direction){
				return;
			}
			if (direction.id === Logic.directions.Revert.id){
				return this.commandList.goBack();
			}
			this.stage.removeChild(event.target);
			this.stage.addChild(event.target);
			console.log('move', direction);
			var action = this.logic.getActionData(direction);
			if ( action ){
				this.commandList.addCommand( action );
				this.stage.update();
			}
		},

		"handleUp": function( event ) {
			if ( !this.logic.inDrag() ){
				return;
			}
			if ( !this.logic.gameInProgress() || this.logic.checkForSolved() ){
				//wait for a new puzzle
				return;
			}
			// this.logic.endDrag( event );
			this.commandList.addDrags(this.logic.endDrag( event ));
			console.log('  up', event);
		},

		"refresh": function(logic) {
			if ( !this.stage.children ) {
				return;
			} else if (!this.interior){
				this.interior = this.stage.getChildByName("interior");
			}
			var player = this.interior.getChildByName("player");
			player.on('mousedown', this.handleDown, this);
			player.on('pressmove', this.handleMove, this);
			player.on('pressup', this.handleUp, this);
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

