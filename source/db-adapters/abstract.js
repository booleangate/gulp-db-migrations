"use strict";

var Util = require("../util");

function AbstractAdapter(config) {
	// See configure method for all class properties
	this.configure(config);
}

AbstractAdapter.prototype.configure = function(config) {
	Util.setProperty(this, config, "host");
	Util.setProperty(this, config, "username");
	Util.setProperty(this, config, "password");
};

AbstractAdapter.prototype.connect = function(/*onComplete*/) {
	throw Util.getClassName(this) + ".connect() is not yet implemented";
};

AbstractAdapter.prototype.executeScript = function(/*scriptContent, onComplete*/) {
	throw Util.getClassName(this) + ".executeScript() is not yet implemented";
}; 

AbstractAdapter.prototype.startTransaction = function(/*onComplete*/) {
	throw Util.getClassName(this) + ".startTransaction() is not yet implemented";
}; 

AbstractAdapter.prototype.commit = function(/*onComplete*/) {
	throw Util.getClassName(this) + ".commit() is not yet implemented";
};

AbstractAdapter.prototype.rollback = function(/*onComplete*/) {
	throw Util.getClassName(this) + ".rollback() is not yet implemented";
};

module.exports = AbstractAdapter;
