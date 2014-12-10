//Tile factory pattern used

// playerTile can move, handlers controlled
// wall - never moves, always in state: "full"
// target - never moves, but can have states: empty, box, player
// empty - doesn move, but can exchange with player only!
// box Tile can move - player can move it towards the direction

//друг вариант е просто да се сменят позициите на които се намират кутийките и играча ни

	// Sokoban.standartLevel = {
	// 	'P': 'player',
	// 	'W': 'wall',
	// 	' ': 'empty',
	// 	'B': 'box',
	// 	'+': 'target+box',
	// 	'-': 'target-box',
	// 	';': 'new line',
	// };

define(function(require) {
	var createjs	= require('libs/easeljs-0.7.1.min');

	var Tile = function(data){
		// this.isTarget = false;
		// this.hasPlayer = false;
		this.initialize(Tile.animationSS, data.kind);
		$.extend(this, Tile.dimensions);
		this.setPositions(data.row||0, data.column||0);
		this.kind = data.kind || "empty";
		this.calculate(data.kind);
	};

	Tile.dimensions = {
		'width' : 50,
		'height': 50,
	};

	$.extend(Tile.prototype, Tile.dimensions);
	$.extend(Tile.prototype, new createjs.Sprite());

	Tile.prototype.getKind = function(){
		return this.kind;
	};

	// Tile.prototype.zIndex = function(){
	// 	return this.kind;
	// };

	Tile.prototype.resetToInitial = function(){
		$.extend(this, this.initialPositions);
		this.x = this.width * this.column;
		this.y = this.height * this.row;
	};

	Tile.prototype.setPositions = function(row, column){
		this.initialPositions = {
			"row": row,
			"column": column,
		};
		this.resetToInitial();
	};

	Tile.prototype.calculate = function(row, column){
		if (!Tile.dimensions) {
			throw "first set the Tile configurations";
		}
		this.hasPlayer = false;
		if ( this.getKind() === 'player' ) {
			this.hasPlayer = true;
			this.name = "player";
		}// else {console.log(kind);}
	};

	Tile.prototype.playerIn = function(){
		this.hasPlayer = true;
	};

	Tile.prototype.playerOut = function(){
		this.hasPlayer = false;
	};

	Tile.prototype.isPlayer = function(){
		return !!this.hasPlayer;
	};

	Tile.kinds = {
			"empty":0,
			'player':1,
			'box':2,
			// 'box+start':[],

			"target":7,
			"target-box":7,
			'target+player':8,
			'target+player+up':35,
			'target+player+up+start':[42,48],
			'target+player+left':36,
			'target+player+down':37,
			'target+player+right':38,
			'target+box':9,

			'wall+cross':14,
			'wall+horizontal':15,
			'wall+core':16,
			'wall+vertical':21,
			'wall':22,

			'player+up':28,
			'player+up+start':[42,48],
			'player+left':29,
			'player+down':30,
			'player+right':31,

			'author':23,
	};

	Tile.spriteConfig = {
		'images'	: ["img/NightShift3 - Gerry Wiseman7f.png"],
		'animations': Tile.kinds,
		'frames'	: $.extend({}, Tile.dimensions),
	};

	Tile.animationSS = new createjs.SpriteSheet(Tile.spriteConfig);

	recalculateWalls = function(sortedTiles) {
		console.error("Walls not ready yet");
		// var that = this;
		// sortedTiles.forEach(function(tile, i) {
		// 	if (tile.kind === Tile.kinds.wall){
		// 		console.log('');
		// 	}
		// });
	};

	return {
		'Tile':Tile,
		'recalculateWalls': recalculateWalls,
	};

});
