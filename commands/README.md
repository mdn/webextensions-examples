# commands

This extension shows how to use the `commands` manifest key to register keyboard shortcuts for your extension.

It registers a shortcut (Ctrl+Shift+U) to send a command to the extension (Command+Shift+U on a Mac).
When the user enters the shortcut, the extension opens a new browser tab and loads https://developer.mozilla.org into it.

It also adds an [options page](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/user_interface/Options_pages) to the extension, which enables the user to change the registered shortcut for the extension. Just open the options page, then type a new value into the textbox (for example: "Ctrl+Shift+O") and press "Update keyboard shortcut". To reset the shortcut to its original value, press "Reset keyboard shortcut".
