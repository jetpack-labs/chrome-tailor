/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
"use strict";

const self = require("sdk/self");
const { getURL } = require("./crx");

// the chrome extension data is in data/crx
const manifest = require("./data/crx/manifest.json");

const background = require("./background");
var backgroundPage;

const browserAction = require("./browser_action");
var browserActionBtn;

const overrides = require("./overrides");

if (manifest.background) {
  backgroundPage = background.create(manifest.background);
  console.log("Created background page!");
}

if (manifest.browser_action) {
  browserActionBtn = browserAction.create(manifest.browser_action);
  console.log("Created browser_action!");
}

if (manifest.chrome_url_overrides) {
  overrides.setup(manifest.chrome_url_overrides);
  console.log("Overrides completed!");
}
