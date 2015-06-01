define(function(require) {
    var PIXI  		= require("libs/pixi");
    var Room  		= require("games/sokoban/pixi_room");
	var BaseLevel  	= require("games/sokoban/baseLevel");

	var IntroRoom = function(callback) {
		this.initLevelData({
			testCorners: false,
		});
		Room.call(this,  new BaseLevel({
			author: "Isko",
			collectionName: "intro",
			rawString: this.xData,
			format: "iso",
			levelName: "IntroScreen"
		}), callback);
	};

	IntroRoom.prototype = Object.create(Room.prototype);

	IntroRoom.prototype.initLevelData = function(settings) {
		this.xData = "WWWWWW;WP-B-W;WWWWWW";//test box on a target; n player on a target
		//for corner testing
		if (settings.testCorners){
			//cross & single edges
			this.xData +=";      ";
			this.xData +="; W W  ";
			this.xData +=";WWW   ";
			this.xData +="; W    ";
			//T junction: right
			this.xData +=";      ";
			this.xData +="; W    ";
			this.xData +=";WW WW ";
			this.xData +="; W WW ";
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
	};

	return IntroRoom;
});

