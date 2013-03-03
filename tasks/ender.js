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
      config: "package.json"
    });

    // the package.json file may have already been loaded, so try and look for it, otherwise just read it
    var pkg = grunt.config("pkg") || grunt.config("package") || grunt.file.readJSON(options.config);

    // our configuration should be under a "grunt" object on the ender key
    var config = pkg.ender.grunt;

    // if it doesn't exist then complain
    if (!config) { grunt.fail.warn("No ender configuration specified in package.json!"); }

    // find the output path and ensure it exists.
    var location = config.output;
    var parentDirs = location.substring(0, location.lastIndexOf("/") || location.length()); // text after the last slash is the file, not a dir
    file.mkdirsSync(parentDirs);

    // figure out the dependencies
    var dependencies = config.dependencies.reduce(function(x, y) { return x + " " + y; });

    var done = this.async();

    // hand off to ender
    if (grunt.option("info")) {
      // `grunt ender --info`
      ender.exec(util.format("ender info --use %s", location));
    } else if (target && target !== "build") {
      // `grunt ender:info` or `grunt ender:refresh`, etc...
      ender.exec(util.format("ender %s --use %s", target, location));
    } else {
      // `grunt ender`
      ender.exec(util.format("ender build %s --output %s", dependencies, location), function(error) {
        if (error) { grunt.fail.warn("Could not build ender script!\n--> " + error); }
        done();
      });
    }
  });
};
