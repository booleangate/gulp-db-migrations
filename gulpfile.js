"use strict";

var gulp = require("gulp"),
	lint = require("gulp-eslint"),
	mocha = require("gulp-mocha");

process.env.NODE_PATH = "./source:" + (process.env.NODE_PATH || "");

gulp.task("lint", function() {
	return gulp.src(["gulpfile.js", "source/**/*.js", "test/**/*.js"])
		.pipe(lint({
			globals: {
				suite: true,
				test: true
			},
			rules: {
				// Removing whitespace can be handled by a build tool
				"no-trailing-spaces": 0,
				// All functions that are being used before their definition are function statements,
				// not function expressions. As such hoisting isn't a problem and we can ignore this.
				"no-use-before-define": 0
			},
			envs: ["node"]
		}))
        .pipe(lint.format())
        .pipe(lint.failOnError());
});

gulp.task("test", function() {
	return gulp.src("./test/**/*.js")
		.pipe(mocha({
			ui: "tdd"
		}));
});

gulp.task("default", ["lint", "test"]);
