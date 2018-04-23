This is an example of how to use [embedded WebExtensions](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Embedded_WebExtensions) to convert a legacy [Bootstrapped extension](https://developer.mozilla.org/en-US/Add-ons/Bootstrapped_extensions) to a  [WebExtension](https://developer.mozilla.org/en-US/Add-ons/WebExtensions) in stages, and migrate the legacy add-on's data so it's accessible by the WebExtension.

The legacy add-on contains:

- some user data stored in the Firefox preferences
- a button in the toolbar

When the button is pressed, the add-on displays a panel containing the stored data. 

This directory contains three versions of the add-on.

- **step0-legacy-addon**: the initial add-on, written entirely using the bootstrapped extension method.
- **step1-hybrid-addon**: a hybrid consisting of a bootstrapped extension containing an embedded WebExtension. The bootstrapped extension reads the stored data and sends it to the embedded WebExtension. The embedded WebExtension stores the data using the [`storage`](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/storage) API, and also implements the UI.
- **step2-pure-webextension**: the final version, written entirely using the WebExtensions method. This version can be deployed after the hybrid version has migrated the stored data to the `storage` API. 
