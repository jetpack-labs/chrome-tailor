/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
"use strict";

var url = require("url");

function convertManifest(manifest) {
  var result = {};
  var smallName = manifest.name.toLowerCase().replace(/\s/g, "-");
  result.id = smallName + "@chrome-tailor";
  result.title = manifest.name;
  result.description = manifest.description;
  result.version = manifest.version;

  var permissions = manifest.permissions;

  return result;
}
exports.convertManifest = convertManifest;
