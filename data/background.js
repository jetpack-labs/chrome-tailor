/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
"use strict";

const self = require("sdk/self");
const pageWorker = require("sdk/page-worker");

const setupChromeAPI = require("./lib/chrome-api-parent").setup;

function create(options) {
  let pageURL = options.page ? getURL(options.page) : self.data.url("default-background.html");
  let scripts = (options.scripts || []).map(script => getURL(script));
  let contentScripts = [ self.data.url("chrome-api-child.js") ].concat(scripts);
  console.log(contentScripts)

  var backgroundPage = pageWorker.Page({
    contentURL: pageURL,
    contentScriptWhen: "start",
    contentScriptFile: [ self.data.url("chrome-api-child.js") ].concat(scripts),
    contentScriptOptions: {
      rootURI: getURL("")
    }
  });

  setupChromeAPI({ target: backgroundPage });

  return backgroundPage;
}
exports.create = create;

function getURL(path) {
  return self.data.url("./crx/" + path);
}
