// holds player's actions with undo & redo functionallity

define(function(require) {

	var Command = function( kind, dir, player, tiles, interiorTiles ) {
		this.isPush = (kind === "push");
		this.kind = kind;
		this.direction = dir;
		this.player = player;
		this.tiles = tiles;
		this.interiorTiles = interiorTiles;
		this.list = []; // touch moves or a single keyboard move
		this.onTarget = [ player.isOnTarget(), this.tiles[0].isOnTarget(), this.tiles[1] && this.tiles[1].isOnTarget() ];
		this.pushes = this.isPush * 1;
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


	Command.prototype.countPushes = function() {
		//XXX: touches & longer move
		return this.pushes;
	};

	Command.prototype.countMoves = function() {
		//XXX: touches & longer move
		return 1;
	};

	Command.prototype.do = function(ni) {
		var p = this.player
		var f = this.tiles[0];
		var l = this.tiles[1];
		if ( this.isPush ) {
			p.positionAt(p.row + ni.row[0], p.column + ni.column[0]);
			f.positionAt(f.row + ni.row[0], f.column + ni.column[0]);
			l.positionAt(l.row - ni.row[1], l.column - ni.column[1]);
			if (ni.history === "forward"){
				l.setOnTarget(this.onTarget[0]);
				p.setOnTarget(this.onTarget[1]);
				f.setOnTarget(this.onTarget[2]);
			} else {
				p.setOnTarget(this.onTarget[0]);
				f.setOnTarget(this.onTarget[1]);
				l.setOnTarget(this.onTarget[2]);
			}
			this.interiorTiles[p.row][p.column] = p;
			this.interiorTiles[f.row][f.column] = f;
			this.interiorTiles[l.row][l.column] = l;
		} else {
			p.positionAt(p.row + ni.row[0], p.column + ni.column[0]);
			f.positionAt(f.row - ni.row[0], f.column - ni.column[0]);
			if (ni.history === "forward"){
				p.setOnTarget(this.onTarget[1]);
				f.setOnTarget(this.onTarget[0]);
			} else {
				p.setOnTarget(this.onTarget[0]);
				f.setOnTarget(this.onTarget[1]);
			}
			this.interiorTiles[p.row][p.column] = p;
			this.interiorTiles[f.row][f.column] = f;
		}
	};

	Command.prototype.execute = function() {
		this.do(this.direction.neighboursIndexes.Forward);
		console.log("execute", this.toString() );
	};

	Command.prototype.undo = function() {
		this.do(this.direction.neighboursIndexes.Revert);
		console.log("undo", this.toString() );
	};

	Command.prototype.redo = function() {
		this.do(this.direction.neighboursIndexes.Forward);
		console.log("redo", this.toString() );
	};

	Command.prototype.toString = function() {
		return ("Action:{kind:"+this.kind+", direction:"+this.direction+"}");
	};

	return Command;
});

