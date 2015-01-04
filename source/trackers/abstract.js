"use strict";

var util = require("../util");


function AbstractTracker(config) {
	this.configure(config);
}

AbstractTracker.prototype.configure = function(config) {
	throw Util.getClassName(this) + ".configure() is not yet implemented";
};

AbstractTracker.prototype.initialize = function() {
	throw Util.getClassName(this) + ".initialize() is not yet implemented";
};

AbstractTracker.prototype.getExecutedScripts = function() {
	throw Util.getClassName(this) + ".getExecutedScripts() is not yet implemented";
};

AbstractTracker.prototype.addExecutedScript = function(scriptName) {
	throw Util.getClassName(this) + ".addExecutedScript() is not yet implemented";
};


module.exports = AbstractTracker;
