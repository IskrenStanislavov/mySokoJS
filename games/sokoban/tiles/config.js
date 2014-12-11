//Tile factory pattern used - ??? to be used ???


//XXX: GROUND layer with unmovable tiles ("target", "wall" & "empty" place): "ground" or "base"
//XXX: "1st-FLOOR" layer with movable (crates & player) & unmovable tiles (walls): 


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

	var Config = new Object();

	Config.imageSrc = "img/NightShift3 - Gerry Wiseman7f.png";

	Config.dimensions = {
		'width' : 50,
		'height': 50,
	};

	Config.kinds = {//tileKind n tileAnimations
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

	Config.Floors = {
		"ground": 0,
		"first": 1
	};

	Config.groundFloorTiles = ["target", "empty", "author"];

	Config.firstFloorTiles = ["player", "wall", "box"];

	Config.getSpriteData = function(kind) {
		var data = {
			'images'	: [Config.imageSrc],
			'animations': {},
			'frames'	: Config.dimensions,
		};
		data.animations[kind] = Config.kinds[kind];
        return data;
	};

	return Config;

});
