"use strict";

var mysql = require("mysql"),
	util = require("../util");

function AbstractAdapter(config) {
	// See configure method for all class properties
	this.configure(config);
}

AbstractAdapter.prototype.configure = function(config) {
	Util.setProperty(this, config, "host");
	Util.setProperty(this, config, "username");
	Util.setProperty(this, config, "password");
};

AbstractAdapter.prototype.connect = function() {
	throw Util.getClassName(this) + ".connect() is not yet implemented";
};

AbstractAdapter.prototype.executeScript = function(scriptName) {
	throw Util.getClassName(this) + ".executeScript() is not yet implemented";
}; 

AbstractAdapter.prototype.startTransaction = function() {
	throw Util.getClassName(this) + ".startTransaction() is not yet implemented";
}; 

AbstractAdapter.prototype.commit = function() {
	throw Util.getClassName(this) + ".commit() is not yet implemented";
};

AbstractAdapter.prototype.rollback = function() {
	throw Util.getClassName(this) + ".rollback() is not yet implemented";
};

module.exports = AbstractAdapter;
