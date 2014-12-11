//Tile factory pattern used - ??? to be used ???


//XXX: GROUND layer with unmovable tiles ("target", "wall" & "empty" place): "ground" or "base"
//XXX: "1st-FLOOR" layer with movable (crates & player) & unmovable tiles (walls): 


// playerTile can move, handlers controlled
// wall - never moves, always in state: "full"
// target - never moves, but can have states: empty, box, player
// empty - doesn move, but can exchange with player only!
// box Tile can move - player can move it towards the direction

//друг вариант е просто да се сменят позициите на които се намират кутийките и играча ни

	// Sokoban.standartLevel = {
	// 	'P': 'player',
	// 	'W': 'wall',
	// 	' ': 'empty',
	// 	'B': 'box',
	// 	'+': 'target+box',
	// 	'-': 'target-box',
	// 	';': 'new line',
	// };

define(function(require) {
	var createjs	= require('libs/easeljs-0.7.1.min');

	var Tile = function(data){
		// this.isTarget = false;
		// this.hasPlayer = false;
		this.initialize(Tile.animationSS, data.kind);
		$.extend(this, Tile.dimensions);
		this.setPositions(data.row||0, data.column||0);
		this.kind = data.kind || "empty";
		this.calculate(data.kind);
	};

	var TileFactory = function(){
		// ground level tiles: target, box-initial positions & player initial positions, initial walls
		this.target = Object.create( Tile, {"kind": "target"} );
		this.empty = Object.create( Tile, {"kind": "empty"} );

		// 1st floor tiles
		this.player =  Tile( {"kind": "player"} );
		this.wall =  Tile( {"kind": "wall"} );
		this.box =  Tile( {"kind": "wall"} );
	};

	Tile.dimensions = {
		'width' : 50,
		'height': 50,
	};

	// $.extend(Tile.prototype, new createjs.Sprite());
	// Tile.prototype = Object.create(createjs.Sprite);
	Tile.prototype = new createjs.Sprite();
	$.extend(Tile.prototype, Tile.dimensions);

	Tile.prototype.getKind = function(){
		return this.kind;
	};

	// Tile.prototype.zIndex = function(){
	// 	return this.kind;
	// };

	Tile.prototype.resetToInitial = function(){
		$.extend(this, this.initialPositions);
		this.x = this.width * this.column;
		this.y = this.height * this.row;
	};

	Tile.prototype.setPositions = function(row, column){
		this.initialPositions = {
			"row": row,
			"column": column,
		};
		this.resetToInitial();
	};

	Tile.prototype.calculate = function(row, column){
		if (!Tile.dimensions) {
			throw "first set the Tile configurations";
		}
		this.hasPlayer = false;
		if ( this.getKind() === 'player' ) {
			this.hasPlayer = true;
			this.name = "player";
		}// else {console.log(kind);}
	};

	Tile.prototype.playerIn = function(){
		this.hasPlayer = true;
	};

	Tile.prototype.playerOut = function(){
		this.hasPlayer = false;
	};

	Tile.prototype.isPlayer = function(){
		return !!this.hasPlayer;
	};

	//XXX: Tile.success - animate "win" for the current tile when solved or moved to the correct place
	//XXX: Tile.begin - plays animation when the game starts
	//XXX: Tile.move - plays animation when the player moves the main caracter
	//XXX: Tile.undo - plays animation when the player moves back in the history
	//XXX: TIle.still - static image

	Tile.kinds = {
			"empty":0,
			'player':1,
			'box':2,
			// 'box+start':[],

			"target":7,
			"target-box":7,
			'target+player':8,
			'target+player+up':35,
			'target+player+up+start':[42,48],
			'target+player+left':36,
			'target+player+down':37,
			'target+player+right':38,
			'target+box':9,

			'wall+cross':14,
			'wall+horizontal':15,
			'wall+core':16,
			'wall+vertical':21,
			'wall':22,

			'player+up':28,
			'player+up+start':[42,48],
			'player+left':29,
			'player+down':30,
			'player+right':31,

			'author':23,
	};

	Tile.spriteConfig = {
		'images'	: ["img/NightShift3 - Gerry Wiseman7f.png"],
		'animations': Tile.kinds,
		'frames'	: $.extend({}, Tile.dimensions),
	};

	Tile.animationSS = new createjs.SpriteSheet(Tile.spriteConfig);

	recalculateWalls = function(sortedTiles) {
		console.error("Walls not ready yet");
		// var that = this;
		// sortedTiles.forEach(function(tile, i) {
		// 	if (tile.kind === Tile.kinds.wall){
		// 		console.log('');
		// 	}
		// });
	};

	return {
		'Tile':Tile,
		'recalculateWalls': recalculateWalls,
	};

});
