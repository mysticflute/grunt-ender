/*
 * grunt-ender
 * https://github.com/endium/grunt-ender
 *
 * Copyright (c) 2013 Nathan McWilliams
 * Licensed under the MIT license.
 */

"use strict";

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerTask("ender", "Execute the Ender build", function(target) {
    var ender = require("ender");
    var util = require("util");
    var file = require("file");

    var options = this.options({
      output: "ender"
    });

    if (!options.dependencies) { grunt.fail.warn("No ender dependencies specified!"); }

    // find the output path and ensure it exists.
    var out = options.output;
    var parentDirs = out.substring(0, out.lastIndexOf("/") || out.length()); // text after the last slash is the file, not a dir
    file.mkdirsSync(parentDirs);

    // figure out the dependencies
    var dependencies = options.dependencies.reduce(function(x, y) { return x + " " + y; });

    var done = this.async();

    // hand off to ender
    if (grunt.option("info")) {
      // `grunt ender --info`
      ender.exec(util.format("ender info --use %s", out));
    }  else if (target && target !== "build") {
      // `grunt ender:info` or `grunt ender:refresh`, etc...
      ender.exec(util.format("ender %s --use %s", target, out));
    } else {
      // `grunt ender`
      ender.exec(util.format("ender build %s --output %s", dependencies, out), function(error) {
        if (error) { grunt.fail.warn("Could not build ender script!\n--> " + error); }
        done();
        grunt.event.emit("grunt_ender_build_done");
      });
    }
  });
};
