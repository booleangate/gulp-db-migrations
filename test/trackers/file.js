var FileTracker = require("../../source/trackers/file"),
	spec = require("./shared-spec.js"),
	fs = require("fs");
	

var fixturesDir = __dirname + "/fixtures/",
	filenameConfig = {
		writable: {
			empty: {filename: fixturesDir + "/writable/empty.json"},
			nonEmpty: {filename: fixturesDir + "/writable/non-empty.json"}
		},
		readOnly: {filename: fixturesDir + "/read-only.json"}
	};

// Reset fixture files to expected start states. This makes me sad.  Tried to use mockfs to mock these files,
// but it caused problems with other require statements.  After 1.5 hours fighting with it, I don't care anymore.
fs.truncateSync(filenameConfig.writable.empty.filename, 0);
fs.chmodSync(filenameConfig.readOnly.filename, 0444);

// Run the shared/generic tests for the file tracker.
spec(FileTracker, "file", filenameConfig);
