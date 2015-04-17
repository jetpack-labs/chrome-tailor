# Chrome Tailor

Creates Firefox extensions from Google Chrome extensions.

## Usage

`chrome-tailor` has two commands: `run` and `xpi`, with details below. Some options are:

* `-b, --binary <path>` Use the specified Firefox binary to run the add-on. Used in `run` and `test`.
* `-v, --verbose` Prints additional debugging information.

### Commands

* `chrome-tailor run` Runs the current add-on on Firefox.
* `chrome-tailor xpi` Creates a `.xpi` file.

## Currently implemented [Google Chrome APIs][GCAPIs]

* chrome.extension.getURL
* chrome.extension.inIncognitoContext
* chrome.extension.isAllowedIncognitoAccess
* chrome.extension.isAllowedFileSchemeAccess
* chrome.extension.setUpdateUrlData
* chrome.history.addUrl
* chrome.history.deleteAll
* chrome.history.deleteUrl
* chrome.tabs.create
* chrome.tabs.duplicate
* chrome.tabs.getCurrent
* chrome.tabs.query
* chrome.tabs.remove

[GCAPIs]:https://developer.chrome.com/extensions/api_index
