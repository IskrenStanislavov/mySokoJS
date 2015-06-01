define(function(require) {
	var Command = require("sokoban/command");
	var Dragging  = require('sokoban/room/dragging');
	var Direction  = require('sokoban/room/direction');

	var Logic = function(interior){
		this.interior = interior;
		this.directions = Direction.instances;

		var flat = interior.reduce(function(a, b){
			return a.concat(b);
		});
		this.player = flat.filter(function(tile){
			if (tile.isPlayer()){
				return tile;
			}
		})[0];
		this.boxTiles = flat.filter(function(tile){
			if (tile.isBox()){
				return tile;
			}
		});
	};

	Logic.prototype.isSolved = function(){
		if ( this.inDrag() ) {
			return false;
		}
		return this.boxTiles.filter(function(tile){
			if (!tile.onTarget){
				return tile;
			}
		}).length==0;
	};

	Logic.prototype.performAction = function(){
		return false;
	};

	Logic.prototype.getCloseTiles = function(direction) {
		return direction.getTiles(this.interior, this.player);
	};

	Logic.prototype.getActionData = function( direction ) {
		direction = Direction.getInstance(direction);
		var tiles = this.getCloseTiles( direction );
		if ( tiles[0].isFree() ) {
			return new Command("move", direction, this.player, tiles, this.interior);
		} else if ( tiles[0].isBox() && tiles[1].isFree() ) {
			return new Command("push", direction, this.player, tiles, this.interior);
		}

		return false;
	};

	Logic.prototype.getAllowedMoves = function( direction ) {};//solver related in future

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

