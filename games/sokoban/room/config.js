define(function(require) {
	var Config = {
		"wallsLayer":"interiorTiles",
		"roomKinds": {
			"iso": {
				"P": {
					"floor":"empty",
					"interior":	"player"
				},
				"*": {
					"floor":"target",
					"interior":"player"
				},
				"W": {
					"floor":"empty",
					"interior":	"wall"
				},
				" ": {
					"floor":"empty",
					"interior":	null
				},
				"B": {
					"floor":"empty",
					"interior":	"box"
				},
				"+": {
					"floor":"target",
					"interior":"box"
				},
				"-": {
					"floor":"target",
					"interior":null
				},
				";": {
					"newLine": true,
				},
				"A": {
					"floor":"author",
					"interior":null
				},
			},
			"xsb": {
				"@": {
					"floor":"empty",
					"interior":	"player"
				},
				"+": {
					"floor":"target",
					"interior":"player"
				},
				"#": {
					"floor":"empty",
					"interior":	"wall"
				},
				" ": {
					"floor":"empty",
					"interior":	null
				},
				"$": {
					"floor":"empty",
					"interior":	"box"
				},
				"*": {
					"floor":"target",
					"interior":"box"
				},
				".": {
					"floor":"target",
					"interior":null
				},
				"|": {
					"newLine": true,
				},
				"A": {
					"floor":"author",
					"interior":null
				},
			}
		}
	};

	return Config;
});

