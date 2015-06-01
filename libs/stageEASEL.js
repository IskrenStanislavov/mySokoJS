define(function(require) {

	var Stage = function( canvasId, settings ){
		createjs.Stage.call(this, canvasId);

		this.initSettings(settings);
		this.fittable = null;
		this.autoFitListeners()
	};

	Stage.prototype = Object.create( createjs.Stage.prototype );

	Stage.prototype._update = Stage.prototype.update;
	Stage.prototype.update = function(){
		this.resize();
		this._update();
	};

	Stage.prototype._getChildAt = Stage.prototype.getChildAt;
	Stage.prototype.getChildAt = function(index){
		if (index < 0){
			index += this.children.length;
		}
		return this._getChildAt(index);
	};

	Stage.prototype.initSettings = function(settings) {
		this.enableMouseOver(-1);
		this.enableDOMEvents(false);// mouse events

		createjs.Ticker.useRAF = true;
		createjs.Ticker.setFPS(25);
		createjs.Ticker.addEventListener("tick", this.update.bind(this));//update the stage

		if ( settings && settings.showBG ) {
			this.bg = new createjs.Shape();
			this.bg.graphics.beginFill("black").drawRect(0, 0, 10000, 10000);
			this.addChild(this.bg);
		}
	};

	Stage.prototype.setAutoFit = function() {
		if (this.children.length===0) {
			return;
		}
		this.fittable = this.getChildAt(-1);
		if ( !this.fittable.W || !this.fittable.H ){
			return;
		}

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
		$(this.canvas).css("width", Math.floor(this.fittable.W * scale).toString()+"px");
		$(this.canvas).css("height", Math.floor(this.fittable.H * scale).toString()+"px");
	};

	return Stage; 
});
