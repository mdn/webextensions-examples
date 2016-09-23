This is a very simple example of how to use a [WebExtension embedded in a Legacy Add-on](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Embedded_WebExtensions) to be able to gradually port a legacy addon written as a [Bootstrapped extension](https://developer.mozilla.org/en-US/Add-ons/Bootstrapped_extensions) into a pure [WebExtension](https://developer.mozilla.org/en-US/Add-ons/WebExtensions) and migrate the legacy addon data into the [WebExtensions `storage.local`](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/storage).

The simple example legacy addon provides:

- a button in the toolbar
- some user data stored in the Firefox preferences
- when the button is pressed, it shows a panel which renders the above data from the Firefox preferences

The transition example is composed of 3 steps:

- Step 0: original legacy addon, everything is written using the legacy Addon implementation strategies
- Step 1: hybrid addon (a Boostrapped legacy container addon with a simple webextension embedded into it), the legacy code provides access to the preferences and handle (with the background page) the transition of this data into the WebExtensions `storage.local` StorageArea, the webextension provides the UI and the new data storage.
- Step 2: a pure WebExtensions addon is extracted from the Step 1 (once the old users have been already able to transition their data using the step 1 version)
