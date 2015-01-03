// holds player's actions with undo & redo functionallity

define(function(require) {

	var Command = function( kind, dir, player, tiles ) {
		this.kind = kind;
		this.direction = dir;
		this.tiles = tiles;
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

	Command.prototype.execute = function() {
		// if ( this.isPush() ) {
		// 	this.tiles[]
		// }
		console.log("execute", this.toString() );
	};

	Command.prototype.undo = function() {
		console.log("undo", this.toString() );
	};

	Command.prototype.redo = function() {
		console.log("redo", this.toString() );
	};

	Command.prototype.toString = function() {
		return ("Command:{kind:"+this.kind+", direction:"+this.direction+"}");
	};




	return Command;
});

