# Favourite Colour

Shows and stores your favourite colour, in storage.sync in the about:addons page for the add-on.

Demonstrates: storing data with storage.sync, reading data from storage.managed, runtime.openOptionsPage and creating an options page.

To have Firefox read the settings from storage.managed, you'll need to create a JSON file following the rules from native messaging: https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Native_messaging#Mac_OS_X replacing NativeMessagingHosts with ManagedStorage. (TODO: update this with the documentation when it lands).

{
  "name": "favourite-colour-examples@mozilla.org",
  "description": "ignored",
  "type": "storage",
  "data": {
    "colour": "management thinks it should be blue!"
  }
}
