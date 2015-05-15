
define(function(require) {
	var Logic   = require("games/sokoban/room/logic");
	var Direction  = require('games/sokoban/room/direction');

	var Handlers = function( commandList, callback ) {
		this.callback = callback;
		this.commandList = commandList;
		this.currentKeyDown = null;
		this.config = {'moves':{
			// keyCode | action
			37: Direction.instances.Left,
			38: Direction.instances.Up,
			39: Direction.instances.Right,
			40: Direction.instances.Down,
		}, "history":{
			90: "undo",//ctrl+Z
			89: "redo",//ctrl+Y
			82: "revertAll"//ctrl+R
		}}
		document.onkeydown = this.keyDown.bind(this);
		document.onkeyup = this.keyUp.bind(this);
	};

	$.extend(Handlers.prototype, {

		'getEvent': function(evt) {
			return (evt) ? evt : ((window.event) ? window.event : null);
		},

		'keyDown': function(evt) {
			if ( this.logic.checkForSolved() ){
				//wait for a new puzzle
				return;
			}
			if ( this.logic.inDrag() ){
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
			if ( change === "undo" ) {
				this.commandList.goBack();
			} else if ( change === "redo" ) {
				this.commandList.goForward();
			} else if ( change === "revertAll" ){
				this.commandList.revertAll();
			}
			return !!change;
		},

		'handleSingleKey': function(keyId) {
			var move = this.config.moves[keyId];
			if (!move){
				return !!move;
			}

			var action = this.logic.getActionData(move);
			if ( action ){
				this.commandList.addCommand( action );
			}
			return !!move;
		},

		"keyUp": function(evt) {
			evt = this.getEvent(evt);
			if ( evt.keyCode === this.currentKeyDown ) {
				this.currentKeyDown = null;
			}
			if ( this.logic.checkForSolved() ){
				this.callback && this.callback();
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

		"refresh": function(logic) {
			this.logic = logic;
			return null;
		}

	});

	return Handlers;
});

