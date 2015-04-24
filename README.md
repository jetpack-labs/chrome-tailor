# Chrome Tailor

Creates Firefox extensions from Google Chrome extensions.

Note: currently only works for Firefox 38+


## Usage

`chrome-tailor` has two commands: `run` and `xpi`, with details below. Some options are:

* `-b, --binary <path>` Use the specified Firefox binary to run the add-on. Used in `run` and `test`.
* `--jetpack <path>` **For Development** Path to [chrome tailor jetpack][chrome-tailor-jetpack].
* `--sdk <path>` **For Development** Path to [addon-sdk][addon-sdk].
* `-b, --binary <path>` Use the specified Firefox binary to run the add-on. Used in `run` and `test`.
* `-v, --verbose` Prints additional debugging information.


### Commands

* `chrome-tailor run` Runs the current add-on on Firefox.
* `chrome-tailor crx` Creates a `.crx` file.
* `chrome-tailor xpi` Creates a `.xpi` file.


## Install

In order to install you must first have `npm` installed.  Then to install `chrome-tailor` run this command:

    npm install chrome-tailor -g


## Usage

To try a Google Chrome extension's source on Firefox Nightly, run this command:

    chrome-tailor run -b nightly


## Currently Implemented [Google Chrome APIs][GCAPIs]

* chrome.browserAction.onClick.addListener
* chrome.extension.getURL
* chrome.extension.inIncognitoContext
* chrome.extension.isAllowedIncognitoAccess
* chrome.extension.isAllowedFileSchemeAccess
* chrome.extension.setUpdateUrlData
* chrome.history.addUrl
* chrome.history.deleteAll
* chrome.history.deleteUrl
* chrome.runtime.onMessage.addListener
* chrome.runtime.sendMessage
* chrome.tabs.create
* chrome.tabs.duplicate
* chrome.tabs.executeScript
* chrome.tabs.getCurrent
* chrome.tabs.query
* chrome.tabs.remove
* chrome.tabs.sendMessage
* chrome.topSites.get


## Currently Supported `manifest.json` Properties

    {
      "name": "",
      "author": "",
      "description": "",
      "version": "",
      "homepage_url": "",
      "browser_action": {
        "default_icon": "",
        "default_title": "",
        "default_popup": "",
      },
      "background": {
        "script": "", // or ..
        "page": ""
      },
      "content_scripts": [
        // ...
      ],
      "permissions": [
        "history",
        "tabs",
        "topSites"
      ],
      overrides: {
        "newtab": ""
      }
    }


[GCAPIs]:https://developer.chrome.com/extensions/api_index
[chrome-tailor-jetpack]:https://github.com/jetpack-labs/chrome-tailor-jetpack
[addon-sdk]:https://github.com/mozilla/addon-sdk
