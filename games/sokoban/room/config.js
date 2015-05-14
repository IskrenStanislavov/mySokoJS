define(function(require) {
	var Config = {
		"additionalWidth":200,
		"roomKinds": {
			"iso": {
				"newLineSymbol":";",
				"emptyTile":" ",
				"P": {
					"onTarget": false,
					"interior":	"player"
				},
				"*": {
					"onTarget": true,
					"interior":"player"
				},
				"W": {
					"onTarget": false,
					"interior":	"wall"
				},
				" ": {
					"onTarget": false,
					"interior":	"empty"
				},
				"B": {
					"onTarget": false,
					"interior":	"box"
				},
				"+": {
					"onTarget": true,
					"interior":"box"
				},
				"-": {
					"onTarget": true,
					"interior":"empty"
				},
				";": {
					"newLine": true,
				},
				"A": {
					"onTarget": false,
					"interior":"author"
				},
			},
			"xsb": {
				"newLineSymbol":"|",
				"emptyTile":" ",
				"@": {
					"onTarget": false,
					"interior":	"player"
				},
				"+": {
					"onTarget": true,
					"interior":"player"
				},
				"#": {
					"onTarget": false,
					"interior":	"wall"
				},
				" ": {
					"onTarget": false,
					"interior":	"empty"
				},
				"$": {
					"onTarget": false,
					"interior":	"box"
				},
				"*": {
					"onTarget": true,
					"interior":"box"
				},
				".": {
					"onTarget": true,
					"interior":"empty"
				},
				"|": {
					"newLine": true,
				},
				"A": {
					"onTarget": false,
					"interior":"author",
				},
			}
		}
	};

	return Config;
});

