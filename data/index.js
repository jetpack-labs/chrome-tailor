/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
"use strict";

const self = require("sdk/self");
const pageWorker = require("sdk/page-worker");
const { ActionButton } = require("sdk/ui/button/action");
const { Panel } = require("sdk/panel");

// the chrome extension data is in data/crx
const manifest = require("./data/crx/manifest.json");

if (manifest.browser_action) {
  let icon = manifest.browser_action.default_icon || "";
  let label = manifest.browser_action.default_title || "blank";
  let url = manifest.browser_action.default_popup || "";

  let button = ActionButton({
    id: "my-button",
    label: label,
    icon: getURL(icon),
    onClick: function(state) {
      panel.show({
        position: button
      });
    }
  });
  console.log("Created Button!")

  let panel = Panel({
    contentURL: getURL(url),
    contentScriptWhen: "start",
    contentScriptFile: self.data.url("chrome-api.js")
  });
  console.log("Created Panel!")
}

/*
var backgroundPage = pageWorker.Page({
  contentURL: getURL(url)
})
*/

function getURL(path) {
  return self.data.url("./crx/" + path);
}
