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

var jpm = path.join(__dirname, "..", "node_modules", "jpm", "bin", "jpm")

function make(options) {
  var cwd = options.cwd || process.cwd();
  var basePackage = options.basePackage ? require(options.basePackage) : {};
  
  return new Promise(function(resolve) {
    // mk tmp dir
    var tmpobj = tmp.dirSync({
      mode: "0777",
      prefix: 'chromeTailor_'
    });
    var tmpDir = tmpobj.name;
    console.log("Made " + tmpDir)

    // copy data folder to the tmp directory
    var data = options.jetpack || path.join(__dirname, "..", "node_modules", "chrome-tailor-jetpack");
    copy(data, tmpDir);
    console.log("Copied chrome-tailor loader");

    // copy the chrome extension to tmp/data/crx
    var crxPath = path.join(tmpDir, "data", "crx");
    copy(cwd, crxPath);
    console.log("Copied chrome extension");

    // create a package.json
    console.log("Creating package.json...");
    var chromeManifest = require(path.join(cwd, "manifest.json"));
    var packageJSON = convertManifest(chromeManifest, basePackage);
    fs.writeFileSync(path.join(tmpDir, "package.json"), JSON.stringify(packageJSON) + "\n");
    console.log("Wrote package.json");

    process.on("close", function() {
      console.log("Cleaning..");
      // Manual cleanup
      //tmpobj.removeCallback();
    });

    resolve(tmpDir);
  });
}
exports.make = make;
