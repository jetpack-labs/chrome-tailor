# Chrome Tailor

Creates Firefox extensions from Google Chrome extensions.

## Usage

`chrome-tailor` has two commands: `run` and `xpi`, with details below. Some options are:

* `-b, --binary <path>` Use the specified Firefox binary to run the add-on. Used in `run` and `test`.
* `-v, --verbose` Prints additional debugging information.

### Commands

* `chrome-tailor run` Runs the current add-on on Firefox.
* `chrome-tailor xpi` Zips up the current add-on into a `.xpi` file.
