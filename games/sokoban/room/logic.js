define(function(require) {
	var Command = require("games/sokoban/command");
	var CommandList = require("games/sokoban/commandList");
	var tileConfig  = require('games/sokoban/tiles/config');

	var Logic = function(player, interior){
		this.player = player;
		this.interior = interior;
		this.directions = Logic.directions;
	};

	var Direction = function(id, oppositeId, name, worksOn, sign) {
		this.id = id;
		this.oppositeId = oppositeId;
		this.direction = name;
		this.neighboursIndexes = {"Forward":{},"Revert":{}};
		var pN = this.neighboursIndexes.Forward;
		pN[worksOn] = [1*sign, 2*sign];
		pN[worksOn==="row"?"column":"row"] = [0,0];
		pN.history = "forward";
		pN.onTargetIndexes = {"push":[1,2,0],"move":[1,0]};
		// pN.worksOn = worksOn;
		var pNr = this.neighboursIndexes.Revert;
		pNr[worksOn] = [-1*sign, -2*sign];
		pNr[worksOn==="row"?"column":"row"] = [0,0];
		pNr.history = "backward";
		pNr.onTargetIndexes = {"push":[0,1,2],"move":[0,1]};
		// pNr.worksOn = worksOn;
		this.toString = function(){return this.direction;}
	};

	Direction.prototype.getRevertNeighbours = function() {
		return this.revertNeighboursIdexes;
	};

	Direction.prototype.getTiles = function( tiles, player ) {
		var ni = this.neighboursIndexes.Forward;
		var t1 = tiles[player.row + ni.row[0]] &&
				 tiles[player.row + ni.row[0]][player.column + ni.column[0]];
		var t2 = tiles[player.row + ni.row[1]] &&
				 tiles[player.row + ni.row[1]][player.column + ni.column[1]];
		return [t1, t2];
	};

	Logic.directions = {
		"Up"	: new Direction( 0, 1, "Up"		, "row"		, -1 ),
		"Down"	: new Direction( 1, 0, "Down"	, "row"		, +1 ),
		"Left"	: new Direction( 2, 3, "Left"	, "column"	, -1 ),
		"Right"	: new Direction( 3, 2, "Right"	, "column"	, +1 ),
//Touch related
		"Revert": new Direction( 4,-1, "Revert"	, "column"	, +1 ),
	};

	Logic.prototype.checkForSolved = function(){
		if ( this.inDrag() ) {
			return false;
		}
		var checkedTiles = _.flatten(this.interior).filter(function(tile){
			if (tile.isBox() && !tile.onTarget){
				return tile;
			}
		});

		return !checkedTiles.length;
	};

	Logic.prototype.performAction = function(){
		return false;
	};

	Logic.prototype.getCloseTiles = function(direction) {
		return direction.getTiles(this.interior, this.player);
	};

	Logic.prototype.getActionData = function( direction ) {
		var tiles = this.getCloseTiles( direction );
		if ( tiles[0].isFree() ) {
			return new Command("move", direction, this.player, tiles, this.interior);
		} else if ( tiles[0].isBox() && tiles[1].isFree() ) {
			return new Command("push", direction, this.player, tiles, this.interior);
		}

		return false;
	};

	Logic.prototype.getAllowedMoves = function( direction ) {};//solver related in future

//Touch related
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
		var potentialDistance = _(distances).min();
		// console.warn(distances); 
		if ( potentialDistance > 0 ){
			return null;
		}
		if ( distances.left === potentialDistance ) {
			return Logic.directions.Left;
		} else if ( distances.right === potentialDistance ){
			return Logic.directions.Right;
		} else if ( distances.top === potentialDistance ) {
			return Logic.directions.Up;
		} else if ( distances.bottom === potentialDistance ) {
			return Logic.directions.Down;
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

	Logic.prototype.inDrag = function(){
		return this.drag && this.drag.inProgress;
	};

	Logic.prototype.startDrag = function( startEvent ) {
		this.drag = new Dragging( startEvent );
		console.log(this.drag);
		this.drag.getActionData = this.getActionData.bind(this);
		return this.drag;
	};

	Logic.prototype.updateDragPosition = function( dragEvent ) {
		// dragEvent is touchmove/mousemove event, but not the original w3c one
		this.drag.updatePosition( dragEvent );
	};

	Logic.prototype.endDrag = function( dragEvent ) {
		// dragEvent is touchmove/mousemove event, but not the original w3c one
		var drags = this.drag.end( dragEvent );
		this.drag = null;
		return drags;
	};

	return Logic;
});

