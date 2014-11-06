
define(function(require) {
	// var Level = function(level) {
	// 	// this.data = level.data;
	// 	// level.data = undefined;
	// 	$.extend(this, level);
	// };
	var Levels = function( levels_data ) {
		this.init(levels_data);
	};

	Levels.prototype.init = function(levels_data, callback) {
		var that = this;
		var keys = Object.keys(levels_data);
		var i = keys.length;
		keys.forEach(function(path, ix){
			$.getJSON(path, function(data) {
					console.error(data);
					Object.keys(data).forEach(function(key, i) {
						// that.levels.push(new Level(data[key]));
						that.levels.push(data[key]);
					});
					i -= 1;
					if ( i === 0 ) {
						callback && callback();
					}
				})
				// var data = cat(path);
				// console.error(path);

		});

	};

	return Levels;
});

