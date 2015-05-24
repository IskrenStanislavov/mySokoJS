define(function(require) {
    var PIXI  		= require("libs/pixi");

	InfoBox = function() {
		PIXI.DisplayObjectContainer.call(this);
		this.authorLabel = this.addChild(new PIXI.Text("Authors:", {
			font: "22px Verdana",
			fill: '#7f4746',
			align: 'left',
			lineHeight:22,
		}));
		this.authorLabel.position = new PIXI.Point(19, 0);

		this.authorsNames = this.addChild(new PIXI.Text("\n\ngraphics by Gerry Wiseman\n     code by Iskren Stanislavov", {
			font: "13px Arial",
			fill: '#998892',
			align: 'left',
			lineHeight:16,
		}));
		this.authorsNames.position = new PIXI.Point(0, 0);

		this.countLabels = this.addChild(new PIXI.Text("Moves:\nPushes:", {
			font: "13px Arial",
			fill: '#998892',
			align: 'left',
			lineHeight:18,
		}));
		this.countLabels.position = new PIXI.Point(0, 100);

		this.countLabels = this.addChild(new PIXI.Text("0\n0", {
			font: "bold 14px Arial",
			fill: '#7f4746',
			align: 'left',
			lineHeight:18,
		}));
		this.countLabels.position = new PIXI.Point(50, 100);

	};
	InfoBox.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);

	InfoBox.prototype.update = function(moves, pushes) {
		this.countLabels.setText( moves + "\n" + pushes );
	};

	return InfoBox;
});

