"use strict";

var fs = require("fs"),
	AbstractTracker = require("./abstract");

function FileTracker(config) {
	this.configure(config);
	this.executedScripts = null;
}

// Extend AbstractTracker
require("util").inherits(FileTracker, AbstractTracker);


FileTracker.prototype.configure = function(config) {
	this.filename = config ? config.filename : null;
};

/**
 * Ensure that the tracking file is present and writable.
 */
FileTracker.prototype.initialize = function() {
	try {
		fs.openSync(this.filename, "a+");
	} catch (e) {
		throw new Error("Refusing to do any migrations until we cant write to the tracker file, " + this.filename);
	}
};

FileTracker.prototype.getExecutedScripts = function() {
	var content;
	
	if (this.executedScripts === null) {
		content = fs.readFileSync(this.filename);
		
		this.executedScripts = content.length > 1 ? JSON.parse(content) : {};
	}
	
	return this.executedScripts;
};

FileTracker.prototype.addExecutedScript = function(scriptName) {
	if (this.executedScripts === null) {
		this.getExecutedScripts();
	}
	
	this.executedScripts[scriptName] = new Date().getTime();
	
	fs.writeFileSync(this.filename, JSON.stringify(this.executedScripts));
};


module.exports = FileTracker;
