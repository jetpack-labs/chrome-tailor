/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
"use strict";

var path = require("path");
var extend = require("lodash").extend;
var execute = require("jpm/lib/task");
var make = require("./mk-tmp-dir").make;

function run(options) {
  var cwd = options.cwd || process.cwd();

  return make(options).
    then(function(tmpDir) {
      process.chdir(tmpDir);
      var manifest = require(path.resolve(tmpDir, "package.json"));
      return execute(manifest, extend(options, { command: "run" }));
    });
}
exports.run = run;
