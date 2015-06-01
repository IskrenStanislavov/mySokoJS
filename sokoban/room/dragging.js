define(function(require) {
	var Command = require("sokoban/command");
	var CommandList = require("sokoban/commandList");
	var tileConfig  = require('sokoban/config/tiles');
	var Direction  = require('sokoban/room/direction');

	var DragCommandList = function(){
		CommandList.apply(this); //	this.list = [];
		this.done = true;
	}
	DragCommandList.prototype = new CommandList();
	DragCommandList.prototype.updateActionsInfo = function(){
		return;// no move update needed
	};
	DragCommandList.prototype.CommandList_execute = DragCommandList.prototype.execute
	DragCommandList.prototype.execute = function(){
		if (this.done) return;
		else {
			this.CommandList_execute.apply(this, arguments);
		}
	};
	DragCommandList.prototype.undo = function(){
		if (!this.done) return;
		else {
			var index = this.list.length - 1;
			while ( index >= 0 ){
				this.list[index].undo();
				index -= 1;
			}
		}
	};

	DragCommandList.prototype.redo = function(){
		if (!this.done) return;
		else {
			this.list.forEach(function( subCommand ){
				subCommand.redo();
			});
		}
	};

	var Dragging = function( startEvent ) {
		this.player = startEvent.target;
		this.startEvent = startEvent;
		this.dragEvents = [];
		this.dragDirections = [];
		this.dragCommands = new DragCommandList();
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

