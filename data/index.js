/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
"use strict";

const self = require("sdk/self");
const pageWorker = require("sdk/page-worker");
// the chrome extension data is in data/crx
const manifest = require("./data/crx/manifest.json");

const browserAction = require("./browser_action");

if (manifest.browser_action) {
  browserAction.create(manifest.browser_action);
  console.log("Created browser_action!");
}

/*
var backgroundPage = pageWorker.Page({
  contentURL: getURL(url)
})
*/

function getURL(path) {
  return self.data.url("./crx/" + path);
}
