define(function(require) {
	var PIXI        = require("libs/pixi");
	require('libs/zepto.min')

	var Stage = function( settings ){
		this.renderer = PIXI.autoDetectRenderer(100, 100, {
		    "view":document.getElementById((settings && settings.canvasId) || "game"),
		    "clearBeforeRender":true,
		    "transparent": false,
		    "resolution":1,
		    "roundPixels": true,
		    "antialias": true
		});
		this.canvas = this.renderer.view;
		document.body.appendChild(this.canvas);

		this.color = (settings && settings.stageColor) || "black";
		PIXI.Stage.call(this, this.color);


		if ( settings && settings.debugBG ) {
			this.addChild(PIXI.Sprite.fromFrame("player_normal"));
		}

		this.update = function(){
			this.resize();
		    this.renderer.render(this);
		    requestAnimFrame(this.update);
		}.bind(this);
		requestAnimFrame(function(){
			this.update();
		}.bind(this));


		this.fittable = null;
		this.autoFitListeners()
	};


	Stage.prototype = Object.create( PIXI.Stage.prototype );

	Stage.prototype._getChildAt = Stage.prototype.getChildAt;
	Stage.prototype.getChildAt = function(index){
		if (index < 0){
			index += this.children.length;
		}
		return this._getChildAt(index);
	};

	Stage.prototype.setAutoFit = function() {
		if (this.children.length===0) {
			return;
		}
		this.fittable = {
			W: this.getChildAt(-1).width,
			H: this.getChildAt(-1).height,
		};
	};

	//XXX: http://html5hub.com/screen-size-management-in-mobile-html5-games/

	Stage.prototype.disableContextMenu = function() {
		this.canvas.oncontextmenu = function (e) {
		    e.preventDefault();
		};
	};
	Stage.prototype.autoFitListeners = function() {
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
		this.setAutoFit();
		if ( !this.fittable || !this.fittable.H ||!this.fittable.W ){
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
