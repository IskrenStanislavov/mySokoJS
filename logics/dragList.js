define(function(require) {
	var CommandList = require("logics/commandList");

	var DragList = function(){
		CommandList.apply(this); //	this.list = [];
		this.done = true;
	};
	DragList.prototype = new CommandList();
	DragList.prototype.CommandList_execute = DragList.prototype.execute;
	DragList.prototype.execute = function(){
		if (this.done) return;
		else {
			this.CommandList_execute.apply(this, arguments);
		}
	};
	DragList.prototype.undo = function(){
		if (!this.done) return;
		else {
			var index = this.list.length - 1;
			while ( index >= 0 ){
				this.list[index].undo();
				index -= 1;
			}
		}
	};

	DragList.prototype.redo = function(){
		if (!this.done) return;
		else {
			this.list.forEach(function( subCommand ){
				subCommand.redo();
			});
		}
	};

	return DragList;
});
