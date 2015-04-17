/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
"use strict";

const self = require("sdk/self");
const { ActionButton } = require("sdk/ui/button/action");
const { Panel } = require("sdk/panel");
const { setTimeout } = require("sdk/timers");
const tabs = require("sdk/tabs");

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
        contentScriptFile: self.data.url("chrome-api.js"),
        onHide: () => setTimeout(() => panel.destroy(), 500)
      });
      panel.port.on("tabs:query", function(data) {
        var result = [];
        for (let tab of tabs) {
          result.push({
            url: tab.url
          });
        }
        panel.port.emit("tabs:query:result", {
          id: data.id,
          tabs: result
        })
      });
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
