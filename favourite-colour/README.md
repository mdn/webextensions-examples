# Favourite Colour

Shows and stores your favourite colour, in storage.sync in the extension's about:addons page.

Demonstrates:

* storing data with storage.sync
* reading data from storage.managed
* creating an options page and opening it with `runtime.openOptionsPage()`
* best practice for supporting automatic theme switching (dark theme) in the options page

To have Firefox read data from storage.managed, create a file with this content:

    {
      "name":  "favourite-colour-examples@mozilla.org",
      "description": "ignored",
      "type": "storage",
      "data": {
        "colour": "management thinks it should be blue!"
      }
    }

Name the file `"favourite-colour-examples@mozilla.org.json"` and follow the instructions in the [`storage.managed` documentation](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/storage/managed) to make the file discoverable by the extension (on OS X and Linux this means copying it to a specific location, while on Windows it means creating a specific registry key pointing to the file's location).
