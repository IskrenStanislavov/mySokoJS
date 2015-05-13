//xsb format: http://sokosolve.sourceforge.net/FileFormatXSB.html

define(function(require) {
	var BaseLevel = function(author, collectionName, levelData, format, levelName) {
		// PIXI.DisplayObjectContainer.call(this);
		this.author = author;
		this.collection = collectionName;
		this.levelData = levelData;
		this.format = format;
		this.levelName = levelName;
	};
	// BaseLevel.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
	return BaseLevel;
});

