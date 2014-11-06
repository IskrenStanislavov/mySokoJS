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
		if (!Tile.config) {
			throw "first set the Tile configurations";
		}
		// this.animation = new createjs.Sprite(Tile.animationSS, "empty");
		this.x = Tile.config.width * this.row;
		this.y = Tile.config.height * this.column;
		this.play(kind);

		this.hasPlayer = true;
	};

	Tile.prototype.playerIn = function(){
		this.hasPlayer = true;
	};

	Tile.prototype.playerOut = function(){
		this.hasPlayer = false;
	};

	Tile.animationSS = new createjs.SpriteSheet({
		images: ["img/NightShift3 - Gerry Wiseman7f.png"],
		frames: {width:50, height:50},
		animations: {
			"empty":0,
			'player':1,
			'box':2,
			// 'box+start':[],

			"target":7,
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
			},
	});

	var build = function(config) { 
		Tile.config = config;
	}

	return {
		'Tile':Tile,
		'build': build,
	};

});
