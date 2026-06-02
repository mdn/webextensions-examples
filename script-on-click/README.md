# script-on-click

This extension runs a script in the active tab when the toolbar button is clicked, without requiring any install-time host permissions.

## What it does

When the user clicks the extension's toolbar button, a script is executed in the active tab that displays an alert showing the page's URL.

The extension uses a background script compatible with Firefox and Chrome. To achieve this compatibility, `background.scripts` and `background.service_worker` are declared in `manifest.json` so that:

- In Firefox, the scripts in `background.scripts` are executed in the context of a document with access to DOM APIs, a so-called "event page".
- In Chrome, `background.service_worker` is executed as a Service Worker, which does not have access to DOM APIs.

This cross-browser approach requires Chrome 121 and Firefox 121 or later.

## What it shows

From this example, you see how to:

- Use `action.onClicked` to respond to a toolbar button click without a popup.
- Use `scripting.executeScript` to run a function in the active tab on demand.
- Declare a background script compatible with Firefox and Chrome using `background.scripts` and `background.service_worker`.
- Use the `activeTab` and `scripting` permissions to execute scripts without requiring install-time host permissions.
