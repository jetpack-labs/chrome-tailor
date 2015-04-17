/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
"use strict";

const tabs = require("sdk/tabs");

function setup(options) {
  var target = options.target;

  target.port.on("tabs:duplicate", function(data) {
    var tabID = data.tabId;
    var id = data.id;
    var url = tabs[tabID].url;

    tabs.open({
      url: url,
      onLoad: tab => {
        target.port.emit("tabs:duplicated", {
          id: id,
          tab: {
            url: url,
            title: tab.title,
            // TODO: implement this!
            favIconUrl: undefined
          }
        });
      }
    });
  });

  target.port.on("tabs:remove", function(data) {
    var tabIDs = (Array.isArray(data.tabs) ? data.tabs : [ data.tabs ]).sort();
    var id = data.id;
    for (let i = tabIDs.length - 1, tabID; i >= 0; i--) {
      let tab = tabs[tabIDs[i]];
      tab.close();
    }

    target.port.emit("tabs:removed", {
      id: id
    });
  });

  target.port.on("tabs:query", function(data) {
    var result = [];
    for (let tab of tabs) {
      result.push({
        url: tab.url
      });
    }
    target.port.emit("tabs:query:result", {
      id: data.id,
      tabs: result
    })
  });

  target.port.on("tabs:get:current", function(data) {
    var i = 0;
    var activeTab = tabs.activeTab;
    for (let tab of tabs) {
      if (tab === activeTab) {
        break;
      }
      i++;
    }

    target.port.emit("tabs:got:current", {
      id: data.id,
      tab: {
        id: i
      }
    })
  });

  target.port.on("tabs:create", function(data) {
    var url = data.options.url;

    tabs.open({
      url: url,
      onLoad: tab => {
        target.port.emit("tabs:created", {
          id: data.id,
          tab: {
            url: url,
            title: tab.title,
            // TODO: implement this!
            favIconUrl: undefined
          }
        });
      }
    });
  });
}
exports.setup = setup;
