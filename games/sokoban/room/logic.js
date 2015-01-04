define(function(require) {
	var Command = require("games/sokoban/command");

	var Logic = function(player, interior, floor){
		this.player = player;
		this.interior = interior;
		this.floor = floor;
		this.directions = Logic.directions;
	};

	var Direction = function(id, name, worksOn, sign) {
		this.id = id;
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
		"Up"	: new Direction( 0, "Up"	, "row"		, -1 ),
		"Down"	: new Direction( 1, "Down"	, "row"		, +1 ),
		"Left"	: new Direction( 2, "Left"	, "column"	, -1 ),
		"Right"	: new Direction( 3, "Right"	, "column"	, +1 ),
	};

	Logic.prototype.gameInProgress = function(){
		return true;
	};

	Logic.prototype.checkForSolved = function(){
		return false;
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
			return new Command("move", direction, this.player, tiles);
		} else if ( tiles[0].isBox() && tiles[1].isFree() ) {
			return new Command("push", direction, this.player, tiles);
		}

		return false;
	};

	Logic.prototype.getAllowedMoves = function( direction ) {};//solver connected

	return Logic;
});

