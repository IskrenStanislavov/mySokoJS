
// playerTile can move, handlers controlled
// wall - never moves, always in state: "full" - different
// target - never moves, but can have states: empty, box, player - changed
// empty - doesn move, but can exchange with player only!
// box Tile can move - player can move it towards the direction

//реализирано по този начин:
//друг вариант е просто да се сменят позициите на които се намират кутийките и играча ни

define(function(require) {

	var Config = new Object();

	Config.imageSrc = "img/skin.png";

	Config.dimensions = {
		'width' : 50,
		'height': 50,
	};

	Config.delta = Config.deltaX = Config.deltaY = Config.dimensions.width; 

	Config.kinds = {//tileKind n tileAnimations
			"transparent":-1,
			"empty":0,
			'player':1,
			'box':2,
			// 'box+start':[],

			// "target":7,
			// "target-box":7,
			// 'target+player':8,
			// 'target+player+up':35,
			// 'target+player+up+start':[42,48],
			// 'target+player+left':36,
			// 'target+player+down':37,
			// 'target+player+right':38,
			// 'target+box':9,

			'wall':22,

			// 'player+up':28,
			// 'player+up+start':[42,48],
			// 'player+left':29,
			// 'player+down':30,
			// 'player+right':31,

			'author':23,
			'info': 24,
			'undo': 25,
			'redo': 26,
	};

	Config.onTarget = {
		"player": 8,
		"empty": 7,
		"box": 9
	};

	Config.Floors = {
		"ground": 0,
		"first": 1
	};

	var baseData = {
		'images'	: [Config.imageSrc],
		'animations': {},
		'frames'	: Config.dimensions,
	};

	Config.wall = Object.create(baseData);
	Config.wall.animations = {
		"wall": 		22,
		"Ttop": 		 3,
		"Tright": 		 4,
		"Tbottom": 		 5,
		"Tleft": 		 6,

		"topLeftL": 	10,
		"topRightL": 	11,
		"bottomRightL": 12,
		"bottomLeftL": 	13,

		"rightEdge": 	17,
		"leftEdge": 	18,
		"bottomEdge": 	19,
		"topEdge": 		20,

		"vertical": 	21,
		"horizontal": 	15,
		"cross": 		14,
		"core": 		16,
		// "wall"
	};

	Config.player = Object.create(baseData);
	Config.player.animations = {
		'player': 1,
		// 'normal': 1,
		// "onTarget": 8,
	};

	Config.box = Object.create(baseData);
	Config.box.animations = {
		'box': 2,
		// 'normal': 2,
		// "onTarget": 9,
	};

	Config.transparent = Object.create(baseData);
	Config.transparent.animations = {
		"transparent":-1,
		// 'normal': -1,
		// "onTarget": -1,
	};

	Config.empty = Object.create(baseData);
	Config.empty.animations = {
		"empty": 0,
		// "normal": 0,
		// "onTarget": 7,
	};
	Config.author = Object.create(baseData);
	Config.author.animations = {
		"author": 23,
		// "normal": 23,
		// "onTarget": 23,
	};


	Config.firstFloorTiles = ["player", "wall", "box", "transparent", "empty", "author"];

	Config.getSpriteData = function(kind) {
		if ( kind === "wall" ) {
			return baseWall;
		}
		data = Object.create(baseData);
		data.animations[kind] = Config.kinds[kind];
        return data;
	};

	return Config;

});
