/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
"use strict";

const self = require("sdk/self");
const { ActionButton } = require("sdk/ui/button/action");
const { Panel } = require("sdk/panel");
const { setTimeout } = require("sdk/timers");
const notifications = require("sdk/notifications");

const setupChromeAPI = require("./lib/chrome-api-parent").setup;

function create(options) {
  let icon = options.default_icon || "";
  let label = options.default_title || "blank";
  let url = options.default_popup || "";

  let button = ActionButton({
    id: "my-button",
    label: label,
    icon: getURL(icon),
    onClick: function(state) {
      let panel = Panel({
        contentURL: getURL(url),
        contentScriptWhen: "start",
        contentScriptFile: self.data.url("chrome-api-child.js"),
        onHide: () => setTimeout(() => panel.destroy(), 500)
      });

      setupChromeAPI({ target: panel });

      panel.show({
        position: button
      });
    }
  });

  return null;
}
exports.create = create;

function getURL(path) {
  return self.data.url("./crx/" + path);
}
