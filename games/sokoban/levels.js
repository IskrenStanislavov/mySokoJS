
define(function(require) {
	// var Level = function(level) {
	// 	// this.data = level.data;
	// 	// level.data = undefined;
	// 	$.extend(this, level);
	// };
	var Levels = function( path ) {
		this.init(path);
	};

	Levels.prototype.init = function(path, callback) {
		var that = this;
		$.getJSON(path, function(data) {
			console.error(data);
			Object.keys(data).forEach(function(key, i) {
				// that.levels.push(new Level(data[key]));
				that.levels.push(data[key]);
			});
			callback && callback();
		})
		// var data = cat(path);
		// console.error(path);
	};

	return Levels;
});

