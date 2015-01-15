"use strict";

var spec = require("./shared-spec.js"),
	rewire = require("rewire");
	
var FileTracker = rewire("../../source/trackers/file");

var config = {
	writable: {
		empty: {
			filename: "/writable/empty.json"
		},
		nonEmpty: {
			filename: "/writable/non-empty.json"
		}
	},
	nonWritable: {
		filename: "/read-only.json"
	}
};

/* 
 * Override the behavior of fs in the FileTracker module only.
 */ 
/*eslint-disable no-underscore-dangle */
var fs = FileTracker.__get__("fs");
/*eslint-enable no-underscore-dangle */

/**
 * Should throw an exception for non-wrtiable files.  All other files should succeed.
 */
fs.openSync = function(filename) {
	if (filename === config.nonWritable.filename) {
		throw new Error();
	}
};

/**
 * Should return a JSON string for the non-empty file; otherwise, an empty string.
 */
fs.readFileSync = function(filename) {
	if (filename === config.writable.nonEmpty.filename) {
		return JSON.stringify(spec.executedScripts);
	}
	
	return "";
};

/**
 * Should do nothing.
 */
fs.writeFileSync = function() {};
	
// Run the shared/generic tests for the file tracker.
spec.test(FileTracker, "file", config);
