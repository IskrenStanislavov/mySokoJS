	// - player position - P - verify its one
	// - walls - W
	// - empty box places - E
	// - target - T - verify that boxes and targets are same the quantity
	// - boxes - B - verify that boxes and targets are same the quantity
// $.ajax({
//   type: 'GET',
//   url: '/projects',
//   // data to be added to query string:
//   // data: { name: 'Zepto.js' },
//   // type of data we are expecting in return:
//   dataType: 'json',
//   timeout: 300,
//   // context: $('body'),
//   success: function(data){
//     // Supposing this JSON payload was received:
//     //   {"project": {"id": 42, "html": "<div>..." }}
//     // append the HTML to context object.
//     this.append(data.project.html)
//   },
//   error: function(xhr, type){
//     alert('Ajax error!')
//   }
// });

define(function(require) {
	var Levels = require("games/sokoban/levels");

	var Sokoban = function(){
		this.init();
	};

	Sokoban.standartLevel = {
		'P': 'player',
		'W': 'wall',
		' ': 'empty',
		'B': 'box',
		'+': 'target+box',
		'-': 'target-box',
		';': 'new line',
	};
	Sokoban.simpleLevel = "WWWW;WP+W;WWWW";
	Sokoban.levelsFile = "./games/sokoban/levels.json";
	Sokoban.viewConfig = {
		'canvasId': "game",
		'tileSize': 50,
	};


	Sokoban.prototype.init = function() {
		this.config = Sokoban.config;
		this.viewConfig = Sokoban.viewConfig;

		this.canvas = document.getElementById(this.viewConfig.canvasId);
		
	};

	Sokoban.prototype.start = function(data) {
		this.levels = new Levels(Sokoban.levelsFile);
		this.
	};

	return Sokoban;
});

