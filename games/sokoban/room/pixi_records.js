define(function(require) {

	var Records = function( container ) {
		this.counts = container;
	};

	Records.prototype.update = function( moves, pushes ) {
		this.counts.setText([moves,pushes].join('\n'));
	};

	return Records;
});

