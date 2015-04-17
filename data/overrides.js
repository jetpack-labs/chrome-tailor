/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
"use strict";

const self = require("sdk/self");
const { get, set } = require("sdk/preferences/service");
const { getURL } = require("./crx");
const { when: unload } = require("sdk/system/unload");

function setup(options) {
  var newtab = options.newtab;
  if (newtab) {
    let newNewTab = getURL(newtab);
    let oldNewTab = get("browser.newtab.url", "");
    set("browser.newtab.url", newNewTab);

    // unload cleanup
    unload(() => {
      let currentNewTab = get("browser.newtab.url", "");
      if (currentNewTab == newNewTab) {
        set("browser.newtab.url", oldNewTab);
      }
    });
  }
}
exports.setup = setup;
