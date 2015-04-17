/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
"use strict";

const { Ci } = require("chrome");
const tabs = require("sdk/tabs");
const { newURI } = require("sdk/url/utils");
const { search } = require("sdk/places/history");

const { PlacesUtils: {
  history: hstsrv,
  asyncHistory
} } = require("resource://gre/modules/PlacesUtils.jsm");

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
        id: i,
        url: activeTab.url
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

  target.port.on("history:delete:url", function(data) {
    var url = data.url;

    hstsrv.removePage(newURI(url));
    target.port.emit("history:deleted:url", {
      id: data.id
    });
  });

  target.port.on("history:delete:all", function(data) {
    hstsrv.removeAllPages();
    target.port.emit("history:deleted:all", {
      id: data.id
    });
  });

  target.port.on("history:add:url", function(data) {
    let url = data.url;
    let now = Date.now() * 1000;
    let transitionLink = Ci.nsINavHistoryService.TRANSITION_LINK;

    asyncHistory.updatePlaces({
      uri: newURI(url),
      visits: [{visitDate: now, transitionType: transitionLink}]
    }, {
      handleError: () => {},
      handleResult: () => {},
      handleCompletion: () => {
        target.port.emit("history:added:url", {
          id: data.id
        });
      }
    });
  });

  target.port.on("history:get:topsites", function(data) {
    search({}, {
      count: 8,
      sort: "visitCount",
      descending: true
    }).on("end", function (results) {
      target.port.emit("history:got:topsites", {
        id: data.id,
        urls: results
      });
    });
  });
}
exports.setup = setup;
