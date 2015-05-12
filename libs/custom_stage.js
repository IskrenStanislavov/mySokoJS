define(function(require) {
	var PIXI        = require("libs/pixi");
	require('libs/zepto.min')

	var Stage = function( canvas, settings ){
		this.renderer = PIXI.autoDetectRenderer(100, 100, {
		    "view":document.getElementById("game"),
		    "clearBeforeRender":true,
		    "transparent": false,
		    "resolution":1,
		    "roundPixels": true,
		    "antialias": true
		});
		this.canvas = this.renderer.view;
		document.body.appendChild(this.canvas);


		this.color = 0x3065a2;
		this.color = "black";
		PIXI.Stage.call(this, this.color);

		this.update = function(){
		    this.renderer.render(this);
		    requestAnimFrame(this.update);
		}.bind(this);
		requestAnimFrame(function(){
			this.update();
		}.bind(this));


		this.initSettings(settings);
		this.fittable = null;
		this.autoFitListeners()
	};


	Stage.prototype = Object.create( PIXI.Stage.prototype );

	Stage.prototype.initSettings = function(settings) {
		// this.enableMouseOver(-1);
		// this.enableDOMEvents(false);// mouse events

		// PIXI.Ticker.useRAF = true;
		// PIXI.Ticker.setFPS(25);
		// PIXI.Ticker.addEventListener("tick", this);//update the stage

		if ( settings && settings.showBG ) {
			this.bg = this.addChild(new PIXI.Graphics()).beginFill("black").drawRect(0, 0, 10000, 10000);
			
		}
	};

	Stage.prototype.setAutoFit = function(fittable) {
		this.fittable = fittable;
	};

	//XXX: http://html5hub.com/screen-size-management-in-mobile-html5-games/

	Stage.prototype.autoFitListeners = function() {
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
		document.addEventListener("orientationchange", viewport);
		window.addEventListener('resize', viewport, true);
	};

	Stage.prototype.resize = function() {
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
		scaleH = Math.min(scaleH,1);

		//choose proper scale factor
		var scale = (screenW >= scaleH * this.fittable.W) ?
			scaleH : 
			(screenW / this.fittable.W);
		this.canvas.width  = this.fittable.W;
		this.canvas.height = this.fittable.H;
		if ( !this.canvas.width || !this.canvas.height ){
			throw "zero dimensions";
		}
		this.renderer.resize(this.fittable.W, this.fittable.H)
		$(this.canvas).css("width", Math.floor(this.fittable.W * scale).toString()+"px");
		$(this.canvas).css("height", Math.floor(this.fittable.H * scale).toString()+"px");
	};

	return Stage; 
});
