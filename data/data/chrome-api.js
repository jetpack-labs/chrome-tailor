/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
"use strict";

// chrome.tabs.query(queryInfo, function(tabs) {

var chrome = createObjectIn(unsafeWindow, { defineAs: "chrome" });
var tabs = createObjectIn(chrome, { defineAs: "tabs" });

var chrome = {
  tabs: {}
};

function tabsQuery(options, callback) {
  callback(unsafeWindow.JSON.parse(JSON.stringify([{
    url: "about:home"
  }])));
}
exportFunction(tabsQuery, tabs, { defineAs: "query" });
