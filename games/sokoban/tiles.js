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
		this.isTarget = false;
		this.hasPlayer = false;
		this.row 	= data.row 		|| 0;
		this.column = data.column	|| 0;
		this.initialize(Tile.animationSS, "empty");
		this.calculate(data.kind);
	};
	$.extend(Tile.prototype, new createjs.Sprite());

	Tile.prototype.calculate = function(kind){
		if (!Tile.dimensions) {
			throw "first set the Tile configurations";
		}
		$.extend(this, Tile.dimensions);
		// this.animation = new createjs.Sprite(Tile.animationSS, "empty");
		this.x = this.width * this.column;
		this.y = this.height * this.row;
		this.gotoAndPlay(kind);
		this.hasPlayer = false;
		if ( kind === 'player' ) {
			this.hasPlayer = true;
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
		images: ["img/NightShift3 - Gerry Wiseman7f.png"],
		animations:Tile.kinds,
	};

	recalculateWalls = function(sortedTiles) {
		console.error("Walls not ready yet");
		// var that = this;
		// sortedTiles.forEach(function(tile, i) {
		// 	if (tile.kind === Tile.kinds.wall){
		// 		console.log('');
		// 	}
		// });
	};


	var build = function(config) { 
		Tile.dimensions = {
			'width': config.width,
			'height': config.height,
		};
		Tile.spriteConfig.frames = $.extend({}, Tile.dimensions);
		Tile.animationSS = new createjs.SpriteSheet(Tile.spriteConfig);

	}

	return {
		'Tile':Tile,
		'build': build,
		'recalculateWalls': recalculateWalls,
	};

});
