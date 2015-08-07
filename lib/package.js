/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
"use strict";

var url = require("url");
var defaultsDeep = require("lodash").defaultsDeep;

function convertManifest(manifest, basePackage) {
  basePackage = basePackage !== undefined ? basePackage : {};

  var result = {};
  var smallName = manifest.name.toLowerCase().replace(/\s/g, "-");
  result.id = smallName + "@chrome-tailor";
  result.title = manifest.name;
  result.author = manifest.author;
  result.description = manifest.description;
  result.version = manifest.version;
  result.homepageURL = manifest.homepage_url;

  var permissions = manifest.permissions;

  return defaultsDeep(basePackage, result);
}
exports.convertManifest = convertManifest;
