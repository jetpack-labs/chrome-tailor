/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
"use strict";

var fs = require('fs');
var path = require("path");
var cp = require("child_process");
var copy = require("fs-extra").copySync;
var tmp = require("tmp");
var Promise = require("bluebird");
var jpmXPI = require("jpm/lib/xpi");
//var mkdir = require('mkdirp');

var convertManifest = require("./package").convertManifest;
var make = require("./mk-tmp-dir").make;

var jpm = path.join(__dirname, "..", "node_modules", "jpm", "bin", "jpm")

function xpi(options) {
  var cwd = options.cwd || process.cwd();

  return make(options).
    then(function(tmpDir) {
      process.chdir(tmpDir);

      // jpm xpi the tmp folder
      console.log("Creating xpi...");
      var manifest = require(path.resolve(tmpDir, "package.json"));
      return jpmXPI(manifest, {
        xpiPath: cwd,
        verbose: true
      });
    }).
    then(function(xpiPath) {
      process.chdir(cwd);
      console.log("Created xpi at " + xpiPath);

      console.log("Done!");
      return xpiPath;
    });
}
exports.xpi = xpi;
