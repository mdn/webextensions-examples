This is an example of how to use [embedded WebExtensions](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Embedded_WebExtensions) to convert a legacy [SDK add-on](https://developer.mozilla.org/en-US/Add-ons/SDK) to a  [WebExtension](https://developer.mozilla.org/en-US/Add-ons/WebExtensions) in stages, and migrate the legacy add-on's data so it's accessible by the WebExtension.

The legacy add-on contains:

- A content script that is attached to any pages under "mozilla.org" or any of its subdomains. The content script sends a message to the main add-on, which then displays a [notification](https://developer.mozilla.org/en-US/Add-ons/SDK/High-Level_APIs/notifications).
- Some user data stored using the SDK's  [`simple-prefs`](https://developer.mozilla.org/en-US/Add-ons/SDK/High-Level_APIs/simple-prefs) API.
- Some user data stored using the SDK's [`simple-storage`](https://developer.mozilla.org/en-US/Add-ons/SDK/High-Level_APIs/simple-storage) API.
- A button in the toolbar: when the button is pressed, the add-on shows a panel containing the stored data.

This directory contains three versions of the add-on.

- **step0-legacy-addon**: the initial add-on, written entirely using the Add-on SDK.
- **step1-hybrid-addon**: a hybrid consisting of an Add-on SDK add-on containing an embedded WebExtension. The Add-on SDK part sends the stored data to the embedded WebExtension. It also listens for any changes to the [`simple-prefs`](https://developer.mozilla.org/en-US/Add-ons/SDK/High-Level_APIs/simple-prefs) data, and updates the WebExtension whenever that data is changed (for example, if the user changes the data in the add-on's preferences UI under about:addons). The embedded WebExtension stores the data using the [`storage`](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/storage) API and implements everything else, including the button/panel and the content script.
- **step2-pure-webextension**: the final version, written entirely using the WebExtensions method. This version can be deployed after the hybrid version has migrated the stored data to the `storage` API. In this version the add-on uses an [options page](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Anatomy_of_a_WebExtension#Options_pages) to provide a UI for the preferences data.
