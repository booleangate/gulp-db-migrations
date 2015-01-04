var assert = require("chai").assert;
	
module.exports = function(Tracker, type, config) {
	suite("File tracker", function() {
		test("Non-writeable tracker (" + type + ") throws exceptions on initialization", function() {
			var tracker = new Tracker(config.readOnly);
			
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
			testScriptTrackerEntry(executedScripts, "script2.sql");
		});
		
		test("Can add executed scripts to writable tracker " + type, function() {
			var tracker = new Tracker(config.writable.empty),
				executedScripts;
	
			// Add one file		
			tracker.addExecutedScript("foo");
			executedScripts = tracker.getExecutedScripts();
			testScriptTrackerEntry(executedScripts, "foo");
			assert.lengthOf(Object.keys(executedScripts), 1);
			
			// Add another file
			tracker.addExecutedScript("bar");
			testScriptTrackerEntry(executedScripts, "bar");
			assert.lengthOf(Object.keys(executedScripts), 2);
			
			// Reload the tracker and config that everything is there and that we aren't just hitting the cache.
			tracker = new Tracker(config.writable.empty),
			executedScripts = tracker.getExecutedScripts();
			testScriptTrackerEntry(executedScripts, "foo");
			testScriptTrackerEntry(executedScripts, "bar");
			assert.lengthOf(Object.keys(executedScripts), 2);
		});
		
		function testScriptTrackerEntry(executedScripts, entry) {
			assert.notDeepEqual(executedScripts, {}, "Executed scripts should not be empty");
			assert.property(executedScripts, entry, "Did not find expected script");
			assert.isNumber(executedScripts[entry], "Expected script value to be a timestamp");
		}
	});
};