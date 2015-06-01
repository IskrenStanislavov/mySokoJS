define(function(require) {

	var Records = function( container ) {
		this.counts = container;
	};

	Records.prototype.update = function( moves, pushes ) {
		this.counts.text = [moves,pushes].join('\n');
	};

	return Records;
});

