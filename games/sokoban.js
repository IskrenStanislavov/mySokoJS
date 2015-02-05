//XXX: http://html5hub.com/screen-size-management-in-mobile-html5-games/

//xsb format: http://sokosolve.sourceforge.net/FileFormatXSB.html
define(function(require) {
	var Levels = require("games/sokoban/levels");
	var tiles  = require("games/sokoban/tiles");
	var Room  = require("games/sokoban/room");
	var Stage  = require("libs/stage");
	var Handlers = require("games/sokoban/handlers");
	var CommandList = require("games/sokoban/commandList");

	var Sokoban = function(){
		Stage.call(this, "game", {"showBG":true});
		this.viewport = new Viewport(this.canvas);
		this.init();
	};
	Sokoban.prototype = Object.create(Stage.prototype);

	Sokoban.prototype.init = function() {
		this.commandList = new CommandList();
		this.handlers = new Handlers(this, this.commandList);
		this.levels = new Levels(function(){
			this.start();
		}.bind(this));
		this.levels.load();
	};

	Sokoban.prototype.start = function(levelIndex) {
		if (levelIndex === undefined){
			console.log(levelIndex);
			levelIndex = localStorage.getItem("currentLevel");
			if (levelIndex === null){
				levelIndex = -1;
			} else {
				levelIndex = JSON.parse(levelIndex);
			}
		}
		localStorage.setItem("currentLevel", levelIndex);
		var level = this.levels.getLevel(levelIndex);
		this.currentRoom = new Room( level );
		this.addChild(this.currentRoom);

		this.viewport.setFittable(this.currentRoom);
		this.viewport.resize();

		this.commandList.reset(this.currentRoom.records);
 		this.handlers.refresh(this.currentRoom);
 		var that = this;
 		var solveCheck = setInterval(function(){
 			if ( that.currentRoom.logic.checkForSolved() ){
 				clearInterval(solveCheck);
 				that.on("pressup",function(){
 					setTimeout(function(){
		 				// that.children.length=0;
						that.removeChild(this.currentRoom);
			 			that.start(levelIndex+1);
 					},5000);
 				},that, true);
 			};
 		}, 100);
	};

var Viewport = function( canvas ){
	this.canvas = canvas;
	this.fittable = null;
};

Viewport.prototype.setFittable = function(fittable) {
	this.fittable = fittable;
};

	Viewport.prototype.attachEvents = function() {
		this.canvas.oncontextmenu = function (e) {
		    e.preventDefault();
		};
		var viewport = function() {
			window.scrollTo(0,1);
			this.resize();
		}.bind(this)
		document.onmousemove = document.ontouchmove = function(e) {
			e.preventDefault();
		};
		document.removeEventListener("orientationchange");
		document.addEventListener("orientationchange", viewport);
		window.removeEventListener('resize');
		window.addEventListener('resize', viewport, true);
	};

	Viewport.prototype.resize = function() {
		if ( !this.fittable ){
			return;
		}

		//we neeed the current; XXX: may store it n update it on orientation changes
		//XXX: can store the scale factors for both orientations
		//XXX: and change the chosen one on each orientation change
		var screenW = window.innerWidth
			|| document.documentElement.clientWidth
			|| document.body.clientWidth;

		var screenH = window.innerHeight
			|| document.documentElement.clientHeight
			|| document.body.clientHeight;

		var scaleH = screenH / this.fittable.H;

		//choose proper scale factor
		var scale = (screenW >= scaleH * this.fittable.W) ?
			scaleH : 
			(screenW / this.fittable.W);
		this.canvas.width  = this.fittable.W;
		this.canvas.height = this.fittable.H;
		if ( !this.canvas.width || !this.canvas.height ){
			throw "zero dimensions";
		}
		$(this.canvas).css("width", Math.floor(this.fittable.W * scale).toString()+"px");
		$(this.canvas).css("height", Math.floor(this.fittable.H * scale).toString()+"px");
	};

	return Sokoban;
});

