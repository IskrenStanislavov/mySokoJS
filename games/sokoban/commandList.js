
define(function(require) {

	var CommandList = function(  ) {
		this.position = null;
		this.list = [];
		this.autoIter = true;
	};

	CommandList.prototype.addMove = function( command ) {
		if (this.position === null){
			this.position = -1;
			this.list = [];
		}
		if ( this.position !== this.list.length-1 ) {
			this.list = this.list.slice(0, this.position+1);
		}
		this.list.push(command);
		if (this.autoIter){
			this.position += 1;
		}
		console.log( "added move:" + command ); console.error( this.list );
	};

	CommandList.prototype.goBack = function( command ) {
		if ( this.list.length > 0 && this.position >= 1 ){
			console.log("undo", "from:",this.position, "to:",this.position-1);
			this.position -= 1;
		}
	};

	CommandList.prototype.goForward = function( command ) {
		if ( this.list.length-1 > this.position ){
			console.log("redo", "from:",this.position, "to:",this.position+1, "(max:"+(this.list.length-1)+")");
			this.position += 1;
		}
	};

	return CommandList;
});

