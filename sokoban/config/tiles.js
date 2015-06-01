define(function(require) {

	var Config = {
		'width' : 50,
		'height': 50,
	};
	Config.dimensions = Object.create(Config);

	Config.delta = Config.deltaX = Config.deltaY = Config.dimensions.width; 

	var baseData = {
		'images'	: ["img/skin.png"],
		'animations': {},
		'frames'	: Config.dimensions,
	};

	Config.wall = Object.create(baseData);
	Config.wall.animations = {
		"normal": 		22,
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
	};

	Config.player = Object.create(baseData);
	Config.player.animations = {
		'normal': 1,
		"onTarget": 8,
	};

	Config.box = Object.create(baseData);
	Config.box.animations = {
		'normal': 2,
		"onTarget": 9,
	};

	Config.empty = Object.create(baseData);
	Config.empty.animations = {
		"normal": 0,
		"onTarget": 7,
	};
	Config.author = Object.create(baseData);
	Config.author.animations = {
		"normal": 23,
		"onTarget": 23,
	};

	return Config;

});
