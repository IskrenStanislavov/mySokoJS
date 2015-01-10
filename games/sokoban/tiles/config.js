//Tile factory pattern used - ??? to be used ???


//XXX: GROUND layer with unmovable tiles ("target", "wall" & "empty" place): "ground" or "base"
//XXX: "1st-FLOOR" layer with movable (crates & player) & unmovable tiles (walls): 


// playerTile can move, handlers controlled
// wall - never moves, always in state: "full"
// target - never moves, but can have states: empty, box, player
// empty - doesn move, but can exchange with player only!
// box Tile can move - player can move it towards the direction

//друг вариант е просто да се сменят позициите на които се намират кутийките и играча ни

define(function(require) {

	var Config = new Object();

	Config.imageSrc = "img/skin.png";

	Config.dimensions = {
		'width' : 50,
		'height': 50,
	};

	Config.kinds = {//tileKind n tileAnimations
			"transparent":-1,
			"empty":0,
			'player':1,
			'box':2,
			// 'box+start':[],

			"target":7,
			// "target-box":7,
			'target+player':8,
			'target+player+up':35,
			'target+player+up+start':[42,48],
			'target+player+left':36,
			'target+player+down':37,
			'target+player+right':38,
			'target+box':9,

			'wall':22,

			'player+up':28,
			'player+up+start':[42,48],
			'player+left':29,
			'player+down':30,
			'player+right':31,

			'author':23,
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

	Config.WallKinds = {
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

	// Config.groundFloorTiles = ["target"];

	Config.firstFloorTiles = ["player", "wall", "box", "transparent", "empty", "author"];

	Config.getSpriteData = function(kind) {
		var data = {
			'images'	: [Config.imageSrc],
			'animations': {},
			'frames'	: Config.dimensions,
		};
		data.animations[kind] = Config.kinds[kind];
		if ( kind === "wall" ) {
			$.extend(data.animations, Config.WallKinds);
			// Object.keys(Config.WallKinds).forEach(function(key){
			// 	var wallAnim = [key];
			// 	[key] = wallAnim;
			// });
		}
        return data;
	};

	return Config;

});
