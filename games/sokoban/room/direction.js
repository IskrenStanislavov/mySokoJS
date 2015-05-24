define(function(require) {

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

	Direction.instances = {
		"Up"	: new Direction( 0, 1, "Up"		, "row"		, -1 ),
		"Down"	: new Direction( 1, 0, "Down"	, "row"		, +1 ),
		"Left"	: new Direction( 2, 3, "Left"	, "column"	, -1 ),
		"Right"	: new Direction( 3, 2, "Right"	, "column"	, +1 ),
//Touch related
		"Revert": new Direction( 4,-1, "Revert"	, "column"	, +1 ),
	};

	Direction.getInstance = function(d){
		if (!!d.direction){return d;}
		return Direction.instances[d.capitalize()];
	};

	return Direction;
});

