define(function(require) {
	var Config = {
		"iso": {
			"P": ["empty", 	"player"],//"player"
			"*": ["target", "player"],//"target+player",
			"W": ["empty", 	"wall"	],//"wall",
			" ": ["empty", 	null	],//"empty",
			"B": ["empty", 	"box"	],//"box",
			"+": ["target", "box"	],//"target+box",
			"-": ["target", null	],//"target",
			";": {"newLine": true	}, //"new line",
			"A": ["author", null	],//"author"
		},
		"xsb": {
			"@": ["empty", 	"player"],//"player"
			"+": ["target", "player"],//"target+player",
			"#": ["empty", 	"wall"	],//"wall",
			" ": ["empty", 	null	],//"empty",
			"$": ["empty", 	"box"	],//"box",
			"*": ["target", "box"	],//"target+box",
			".": ["target", null	],//"target",
			"|": {"newLine": true	}, //"new line",
			"A": ["author", null	],//"author"
		}
	};

	return Config;
});

