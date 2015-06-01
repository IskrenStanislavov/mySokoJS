define(function(require) {
	var Command = require("logics/command");
	// var Dragging  = require('logics/dragging');
	var Direction  = require('logics/direction');

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
		return this._inDrag === true;
	};

	Logic.prototype.startDrag = function( startEvent ) {
		this._inDrag = true;
	};

	Logic.prototype.endDrag = function( dragEvent ) {
		this._inDrag = false;
	};

	return Logic;
});

