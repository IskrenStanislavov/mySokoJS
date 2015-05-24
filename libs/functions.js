String.prototype.ljust = String.prototype.ljust || function( width, padding ) {
	padding = padding || " ";
	padding = padding.substr( 0, 1 );
	if( this.length < width )
		return this + padding.repeat( width - this.length );
	else
		return this;
};

String.prototype.rjust = String.prototype.rjust || function( width, padding ) {
	padding = padding || " ";
	padding = padding.substr( 0, 1 );
	if( this.length < width )
		return padding.repeat( width - this.length ) + this;
	else
		return this;
};

String.prototype.center = String.prototype.center || function( width, padding ) {
	padding = padding || " ";
	padding = padding.substr( 0, 1 );
	if( this.length < width ) {
		var len		= width - this.length;
		var remain	= ( len % 2 == 0 ) ? "" : padding;
		var pads	= padding.repeat( parseInt( len / 2 ) );
		return pads + this + pads + remain;
	}
	else
		return this;
};

String.prototype.capitalize = String.prototype.capitalize || function() {
    return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
};

Storage.prototype.setObject = Storage.prototype.setObject || function(key, value) {
    this.setItem(key, JSON.stringify(value));
};

Storage.prototype.getObject = Storage.prototype.getObject || function(key, defaultValue) {
    return JSON.parse(this.getItem(key), defaultValue);
};

define(function(require){
	return;
});