# commands

This extension shows how to use the `commands` manifest key to register keyboard
shortcuts for your extension.

It registers a shortcut (Ctrl+Shift+U) to send a command to the extension
(Command+Shift+U on a Mac). When the user enters the shortcut, the extension
opens a new browser tab and loads https://developer.mozilla.org into it.

The extension has another command, that opens the https://addons.mozilla.org in
a new tab. This command does not have a predefined shortcut assigned to it. The
user can assign a shortcut of her choosing to this command.

It also adds an [options page][] to the extension, which enables the user to
change the registered shortcuts for the extension. Just open the options page,
then type a new value into the textboxes (for example: "Ctrl+Shift+O") and press
"Update keyboard shortcuts". To reset all the shortcuts to thier original value,
press "Reset keyboard shortcuts".

[options page]: https://developer.mozilla.org/en-US/Add-ons/WebExtensions/user_interface/Options_pages
