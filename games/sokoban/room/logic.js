define(function(require) {
	var Command = require("games/sokoban/command");
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
		var pN = this.neighboursIdexes = new Object();
		pN[worksOn] = [1*sign, 2*sign];
		pN[worksOn==="row"?"column":"row"] = [0,0];
		pN.worksOn = worksOn;
		pN.sign = sign;
		var pNr = this.revertNeighboursIdexes = new Object();
		pNr[worksOn] = [-1*sign, -2*sign];
		pNr[worksOn==="row"?"column":"row"] = [0,0];
		pNr.worksOn = worksOn;
		pNr.sign = -sign;
	};

	Direction.prototype.getRevertNeighbours = function() {
		return this.revertNeighboursIdexes;
	};

	Direction.prototype.getTiles = function( tiles, player ) {
		var ni = this.neighboursIdexes;
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

	Logic.prototype.gameInProgress = function(){
		return true;
	};

	Logic.prototype.checkForSolved = function(){
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

	Logic.prototype.getAllowedMoves = function( direction ) {};//solver connected

//Touch related

	var Dragging = function( startEvent ) {
		this.player = startEvent.target;
		this.startEvent = startEvent;
		this.dragEvents = [];
		this.dragDirections = [];		
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

	Dragging.prototype.pushPosition = function( nextDrag ){
		var direction = this.getDirection(nextDrag);
		if (!direction) {
			return;
		} else if ( this.isReverting(direction) ) {
			this.dragEvents.length -= 1;
			this.dragDirections.length -= 1;
			return Logic.directions.Revert;
		} else {
			this.dragEvents.push(nextDrag);
			this.dragDirections.push(direction);
		}
		return direction;
	};

	Dragging.prototype.collectDragDirections = function( startEvent ) {
		this.finnished = true;
		return this.dragDirections;
	};

	Logic.prototype.inDrag = function(){
		return this.drag && !this.drag.finnished;
	};

	Logic.prototype.startDrag = function( startEvent ) {
		this.drag = new Dragging( startEvent );
	};

	Logic.prototype.addDrag = function( dragEvent ) {
		// dragEvent is touchmove/mousemove event, but not the original w3c one
		return this.drag.pushPosition( dragEvent );
	};

	Logic.prototype.endDrag = function( dragEvent ) {
		// dragEvent is touchmove/mousemove event, but not the original w3c one
		var drags = this.drag.collectDragDirections( dragEvent );
		this.drag = null;
		return drags;
	};

	return Logic;
});

