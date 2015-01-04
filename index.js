var fs = require("fs"),
	log = require("npmlog"),
	mixin = require("mixin");

// Pretty, pretty log messages.
log.enableColor();

const DEFAULT_OPTIONS = {
	scriptsDir: null,
	trackInDb: true,
	trackerFile: ".db-migrations.json", // Only used if not tracking in the DB
	logPrefix: "db-migrations",
	interactive: false,
	continueOnError: false, // Only applicable for interactive mode
	autoRegisterTasks: true,
	taskNames: {
		update: "db-update"
	}
};

var userOptions = DEFAULT_OPTIONS;
	
function checkTrackerFile(trackerFile) {
	// Ensure that we can write to the tracker file.
	try {
		fs.openSync(trackerFile, "a+");
	} catch (e) {
		log.error(LOG_PREFIX, "Refusing to do any migrations until we cant write to the tracker file, " + trackerFile);
		process.exit(1);
	}
}

function getExecutedScripts(trackerFile) {
	try {
		return JSON.parse(fs.readFileSync(trackerFile));
	} catch (e) {
		checkTrackerFile(trackerFile);
	}
		
	return {};
}

function canExecute(script, executedScripts, isInteractive) {
	var isExecuted = typeof executedScripts[script] !== "undefined",
		generalOptions = "(s)kip, (i)gnore, (a)bort)",
		executeOptions = "(e)xecute, " + generalOptions,
		reExecuteOptions = "(r)execute, " + generalOptions;
	 
	if (isInteractive) {
		if (isExecuted) {
			log.info(LOG_PREFIX, "Re-execute " + script + "? " + reExecuteOptions);
		} else {
			log.info(LOG_PREFIX, "Execute " + script + "? " + executeOptions);
		}
		return false;
	}
	
	return !isExecuted;
}

function update(onComplete) {
	// Configurable options
	var trackerFile = ".db-migrations.json",
		scriptsDir = "applications/server/configs/db/";
	
	var executedScripts = getExecutedScripts(trackerFile),
		scripts = [];
	
	// Get all scripts that could be executed.
	scripts = fs.readdirSync(scriptsDir);
	
	// Ensure that scriptsDir always ends in a directory seperator.	
	if (scriptsDir.substr(-1) !== "/") {
		scriptsDir += "/";
	}
	
	var isInteractive = false;
	
	try {
		scripts.forEach(function(script) {
			// This script has already been executed, ignore it.
			
			if (canExecute(script, executedScripts, isInteractive)) {
				log.info(LOG_PREFIX, "Executing " + script);
				
				// Execute the script
				// TODO
			} else {
				log.info(LOG_PREFIX, "Skipping " + script);
			}
			
			// Track each executed script.
			if (typeof executedScripts[script] === "undefined") {
				executedScripts[script] = new Date().getTime();
			}
		});
	} catch(e) {
		log.error(LOG_PREFIX, e);
	}
	
	// Write executed scripts
	fs.writeFileSync(trackerFile, JSON.stringify(executedScripts));
	onComplete();
}

function config(options) {
	if (typeof options === "undefined") {
		userOptions = DEFAULT_OPTIONS;
	} else {
		// Deep mixin
		mixin(userOptions, DEFAULT_OPTIONS);
	}
};

module.exports = {
	config: config,
	uptdate: update
};
