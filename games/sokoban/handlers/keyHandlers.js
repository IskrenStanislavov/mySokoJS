
define(function(require) {
	var Logic   = require("games/sokoban/room/logic");

	var Handlers = function( commandList, stage ) {
		this.commandList = commandList;
		this.stage = stage;
		this.currentKeyDown = null;
		this.config = {'moves':{
			// keyCode | action
			37: Logic.directions.Left,
			38: Logic.directions.Up,
			39: Logic.directions.Right,
			40: Logic.directions.Down,
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
			if ( !this.logic.gameInProgress() || this.logic.checkForSolved() ){
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
			if (!move){
				return !!move;
			}
			var action = this.logic.getActionData(move);
			if ( action ){
				this.commandList.addCommand( action );
				this.stage.update();
			}
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

		"refresh": function(logic) {
			this.logic = logic;
			return null;
		}

	});

	return Handlers;
});

