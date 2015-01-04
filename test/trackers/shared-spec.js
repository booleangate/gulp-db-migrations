"use strict";

var assert = require("chai").assert;

var script1 = "script1.sql",
	script2 = "script2.sql";

exports.executedScripts = {};
exports.executedScripts[script1] = new Date().getTime();
exports.executedScripts[script2] = new Date().getTime();
	
exports.test = function(Tracker, type, config) {
	suite("Executed Script Tracker", function() {
		test("Non-writeable tracker (" + type + ") throws exceptions on initialization", function() {
			var tracker = new Tracker(config.nonWritable);
			
			assert.throws(tracker.initialize.bind(tracker), /Refusing to do any migrations/);
		});
		
		test("Writeable tracker (" + type + ") doesn't throw exceptions on initialization", function() {
			var tracker = new Tracker(config.writable.nonEmpty);
	
			assert.doesNotThrow(tracker.initialize.bind(tracker));
			
			tracker.configure(config.writable.empty);
			
			assert.doesNotThrow(tracker.initialize.bind(tracker));
		});
		
		test("Can get expected scripts from non-empty " + type, function() {
			var tracker = new Tracker(config.writable.nonEmpty),
				executedScripts = tracker.getExecutedScripts();
			
			assert.isObject(executedScripts);
			testScriptTrackerEntry(executedScripts, script1);
			testScriptTrackerEntry(executedScripts, script2);
			assert.lengthOf(Object.keys(executedScripts), Object.keys(exports.executedScripts).length);
		});
		
		test("Can get expected scripts from empty " + type, function() {
			var tracker = new Tracker(config.writable.empty),
				executedScripts = tracker.getExecutedScripts();
			
			assert.isObject(executedScripts);
			assert.deepEqual(executedScripts, {});
			assert.lengthOf(Object.keys(executedScripts), 0);
		});
		
		test("Can add executed scripts to writable tracker " + type, function() {
			var tracker = new Tracker(config.writable.empty),
				executedScripts;
	
			// Add one file		
			tracker.addExecutedScript("new-script1.sql");
			executedScripts = tracker.getExecutedScripts();
			testScriptTrackerEntry(executedScripts, "new-script1.sql");
			assert.lengthOf(Object.keys(executedScripts), 1);
			
			// Add another file
			tracker.addExecutedScript("new-script2.sql");
			testScriptTrackerEntry(executedScripts, "new-script2.sql");
			assert.lengthOf(Object.keys(executedScripts), 2);
			
			// Reload the tracker to confirm that we always get the correct scripts and that we aren't just 
			// hitting the cache.
			tracker = new Tracker(config.writable.nonEmpty);
			executedScripts = tracker.getExecutedScripts();
			testScriptTrackerEntry(executedScripts, script1);
			testScriptTrackerEntry(executedScripts, script2);
			assert.lengthOf(Object.keys(executedScripts), Object.keys(exports.executedScripts).length);
		});
		
		function testScriptTrackerEntry(executedScripts, entry) {
			assert.notDeepEqual(executedScripts, {}, "Executed scripts should not be empty");
			assert.property(executedScripts, entry, "Did not find expected script");
			assert.isNumber(executedScripts[entry], "Expected script value to be a timestamp");
		}
	});
};
