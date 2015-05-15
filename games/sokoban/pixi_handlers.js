//XXX: detect handlers by userAgent/device

define(function(require) {
	var KeyHandlers 	= require("games/sokoban/handlers/keyHandlers");
	var TouchHandlers 	= require("games/sokoban/handlers/pixi_touchHandlers");
	var CommandList 	= require("games/sokoban/commandList");

	var Handlers = function(room, callback) {
		this.commandList 	= new CommandList;
		this.touchHandlers 	= new TouchHandlers( this.commandList, room.logic, callback );
		this.keyHandlers 	= new KeyHandlers( this.commandList, callback );
		this.commandList.reset({//Record instance required
			update:function(moves, pushes){
				console.log("moves:"+moves, "pushes:"+pushes);
			}
		});
		this.keyHandlers.refresh(room.logic);
	};

	return Handlers;
});

