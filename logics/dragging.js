define(function(require) {
	var Command    = require("logics/command");
	var DragList   = require("logics/dragList");
	var Direction  = require('logics/direction');
	var tileConfig = require('sokoban/config/tiles');

	var Dragging = function( startEvent ) {
		this.player = startEvent.target;
		this.startEvent = startEvent;
		this.dragEvents = [];
		this.dragDirections = [];
		this.dragCommands = new DragList();
		this.inProgress = true;
	};

	Dragging.prototype.getDirection = function( nextDrag ){
		var distances = {
			"left": nextDrag.stageX - this.player.x,
			"right": this.player.x + tileConfig.deltaX - nextDrag.stageX,
			"top": nextDrag.stageY - this.player.y,
			"bottom": this.player.y + tileConfig.deltaY - nextDrag.stageY,
		};
		var potentialDistance = Object.keys(distances).map(function(a,i){
			return distances[a];
		}).reduce(function(a,b){
			return a<b? a:b;
		});
		// console.warn(distances);
		if ( potentialDistance > 0 ){
			return null;
		}
		if ( distances.left === potentialDistance ) {
			return Direction.instances.Left;
		} else if ( distances.right === potentialDistance ){
			return Direction.instances.Right;
		} else if ( distances.top === potentialDistance ) {
			return Direction.instances.Up;
		} else if ( distances.bottom === potentialDistance ) {
			return Direction.instances.Down;
		}
		return null;
	};

	Dragging.prototype.isReverting = function(direction){
		if (!this.dragDirections.length){
			return false;
		}
		var lastDirection  = this.dragDirections[this.dragDirections.length-1];
		if ( lastDirection.id === direction.oppositeId ) {
			return true;
		} else {
			return false;
		}
	};

	Dragging.prototype.updatePosition = function( nextDrag ){
		var direction = this.getDirection(nextDrag);
		if (!direction) {
			return;
		} else if ( this.isReverting(direction) ) {
			this.dragCommands.goBack();
			this.dragCommands.cleanUp();
			this.dragEvents.length -= 1;
			this.dragDirections.length -= 1;
			return;
		} else {
			this.dragEvents.push(nextDrag);
			this.dragDirections.push(direction);

			var action = this.getActionData(direction);
			if ( action ){
				this.addCommand( action );
			}
		}
	};

	Dragging.prototype.end = function() {
		this.inProgress = false;
		return this;
	};

	Dragging.prototype.execute = function(){
		this.dragCommands.execute();
	};

	Dragging.prototype.undo = function(){
		this.dragCommands.undo();
	};

	Dragging.prototype.redo = function(){
		this.dragCommands.redo();
	};

	Dragging.prototype.countMoves = function() {
		return this.dragCommands.moves;
	};

	Dragging.prototype.countPushes = function() {
		return this.dragCommands.pushes;
	};

	Dragging.prototype.addCommand = function( action ) {
		this.dragCommands.addCommand( action )
	};

	return Dragging;
});

