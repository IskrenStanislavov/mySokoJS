//xsb format: http://sokosolve.sourceforge.net/FileFormatXSB.html

define(function(require) {
    var PIXI        = require("libs/pixi");
	var BaseLevel  	= require("games/sokoban/pixi_base_level");


	var TestLevel = function(testCorners) {

		this.xData = "WWWWWW;WP B-W;WWWWWW";//solvable
		if (true){
			this.xData = "WWWWWW;WP-B-W;WWWWWW";//test box on a target; n player on a target
		}
		//for corner testing
		if (testCorners!==undefined){
			//cross & single edges
			this.xData +=";      ";
			this.xData +="; W    ";
			this.xData +=";WWW   ";
			this.xData +="; W    ";
			//T junction: right
			this.xData +=";      ";
			this.xData +="; W    ";
			this.xData +=";WW    ";
			this.xData +="; W    ";
			//T junction: left
			this.xData +=";      ";
			this.xData +="; W    ";
			this.xData +="; WW   ";
			this.xData +="; W    ";
			//T junction: bottom
			this.xData +=";      ";
			this.xData +="; W    ";
			this.xData +=";WWW   ";
			//T junction: top
			this.xData +=";      ";
			this.xData +=";WWW   ";
			this.xData +="; W    ";
		}
		BaseLevel.call(this,"Isko", "intro", this.xData, "iso");
	};
	TestLevel.prototype = Object.create(BaseLevel.prototype);

	return TestLevel;
});

