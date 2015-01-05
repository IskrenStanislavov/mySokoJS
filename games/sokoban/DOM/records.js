// holds player's actions with undo & redo functionallity

define(function(require) {

	var Records = function(  ) {
		// XXX: can go in the canvas as well
		this.movesDOM = $("#turns>span");
		this.pushesDOM = $("#pushes>span");
		this.update(0, 0);
	};

	Records.prototype.update = function( moves, pushes ) {
		this.movesDOM[0].innerHTML = moves.toString();
		this.pushesDOM[0].innerHTML = pushes.toString();
	};

	return Records;
});

