define(function(require) {
	var tileConfig  = require('sokoban/config/tiles');

	var InfoBox = function() {
		createjs.Container.call(this);
		this.set({
			"x": 0.5 * tileConfig.dimensions.width,
			"name": "info",
		});
		// this.texts = roomConfig.texts;
		this.texts = {
			"title": {
				'text': "Authors:",
				'font' : "22px Verdana",
				"lineHeight":22,
				'color':"#7f4746",
				// 'color':"#998892",
				"x":19,
			},
			"names": {
				'text': "\n\nGerry Wiseman - skin\nIskren Stanislavov - logics",
				'font' : "13px Arial",
				"lineHeight":16,
				'color':"#998892",
			},
			"actionsLabel":{
				'text': "Moves:\nPushes:",
				'font' : "13px Arial",
				"lineHeight":18,
				'color':"#998892",
				"x":0,
				"y":100,
			},
			"actionsCount":{
				'text': "0\n0",
				'font' : "bold 14px Arial",
				"lineHeight":18,
				'color':"#7f4746",
				"x":50,
				"y":100,
			},
		};

		this.addChild(new createjs.Text()).set(this.texts.title);
		this.addChild(new createjs.Text()).set(this.texts.names);
		this.addChild(new createjs.Text()).set(this.texts.actionsLabel);
		this.counts = this.addChild(new createjs.Text()).set(this.texts.actionsCount);
	};

	InfoBox.prototype = Object.create(createjs.Container.prototype);
	InfoBox.prototype.update = function(obj) {
		this.counts.text = [obj.moves, obj.pushes].join('\n');
	};
	return InfoBox;
});

