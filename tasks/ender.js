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

    // the package.json file may have already been loaded, so try and look for it, otherwise just read it
    var pkg = grunt.config("pkg") || grunt.config("package") || grunt.file.readJSON("package.json");

    // our configuration should be under a "grunt" object on the ender key
    var config = pkg.ender.grunt;

    if (!config) { grunt.fail.warn("No ender configuration specified in package.json!"); }

    var location = config.output;
    var dependencies = config.dependencies.reduce(function(x, y) { return x + " " + y; });

    var done = this.async();

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
