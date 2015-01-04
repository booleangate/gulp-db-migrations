var gulp = require("gulp"),
	mocha = require("gulp-mocha");

process.env.NODE_PATH = "./source:" + (process.env.NODE_PATH || "");

gulp.task("lint", function() {
	
});

gulp.task("test", function() {
	return gulp.src("./test/**/*.js")
		.pipe(mocha({
			ui: "tdd"
		}));
});

gulp.task("default", ["lint", "test"]);
