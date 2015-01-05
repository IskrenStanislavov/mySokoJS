// holds player's actions with undo & redo functionallity

define(function(require) {

	var Command = function( kind, dir, player, tiles, interiorTiles ) {
		this.kind = kind;
		this.direction = dir;
		this.player = player;
		this.tiles = tiles;
		this.interiorTiles = interiorTiles;
		this.list = []; // touch moves or a single keyboard move
		// this.movesDOM = $("section#moves p#turns>span");
	};

	// Command.prototype.addMove = function( move ) {
	// 	if ( this.shouldReplace() ) {
	// 		this.clearFrom( this.position + 1 );
	// 	}
	// 	this.list.push(command);
	// 	this.position += 1;

	// 	command.execute();

	// 	console.log( command.toString() );// console.error( this.list );
	// };

	Command.prototype.isPush = function() {
		// this.tiles[this.tiles.length-1] && this.tiles[this.tiles.length-1].isEmpty();
		return this.kind === "push";
	};

	Command.prototype.countPushes = function() {
		//XXX: touches & longer move
		return ( this.kind === "push" ) * 1;
	};

	Command.prototype.countMoves = function() {
		//XXX: touches & longer move
		return 1;
	};

	Command.prototype.do = function(ni) {
		var p = this.player
		var f = this.tiles[0];
		var l = this.tiles[1];
		// var ni = this.direction.neighboursIdexes;
		if ( this.isPush() ) {
			// p ++
			// f ++
			// l-- --
			p.positionAt(p.row + ni.row[0], p.column + ni.column[0]);
			f.positionAt(f.row + ni.row[0], f.column + ni.column[0]);
			l.positionAt(l.row - ni.row[1], l.column - ni.column[1]);
			this.interiorTiles[p.row][p.column] = p;
			this.interiorTiles[f.row][f.column] = f;
			this.interiorTiles[l.row][l.column] = l;
		} else {
			// p ++;
			// f --;
			//XXX: probably not the best choice
			p.positionAt(p.row + ni.row[0], p.column + ni.column[0]);
			f.positionAt(f.row - ni.row[0], f.column - ni.column[0]);
			this.interiorTiles[p.row][p.column] = p;
			this.interiorTiles[f.row][f.column] = f;
		}
	};

	Command.prototype.execute = function() {
		this.do(this.direction.neighboursIdexes);
		console.log("execute", this.toString() );
	};

	Command.prototype.undo = function() {
		var ni = this.direction.getRevertNeighbours();
		this.do(ni);
		console.log("undo", this.toString() );
	};

	Command.prototype.redo = function() {
		this.do(this.direction.neighboursIdexes);
		console.log("redo", this.toString() );
	};

	Command.prototype.toString = function() {
		return ("Command:{kind:"+this.kind+", direction:"+this.direction+"}");
	};




	return Command;
});

