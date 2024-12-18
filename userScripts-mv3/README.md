# userScripts-mv3

The extension is an example of a
[user script manager](https://en.wikipedia.org/wiki/Userscript_manager). It
The extension is an example of a [user script
manager](https://en.wikipedia.org/wiki/Userscript_manager). It demonstrates the
`userScripts` API, the `permissions` API, `optional_permissions`, and Manifest
Version 3 (MV3).
and Manifest Version 3 (MV3).

This example demonstrates these aspects of extension development:

- Showing an onboarding UI after installation.

- Designing background scripts that can restart repeatedly with minimal
  overhead. This is especially relevant to Manifest Version 3.

- Minimizing the overhead of background script startup. This is relevant because
  Manifest Version 3 extensions use an event-based background context. 

- Monitoring grants for an
  [optional-only](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/optional_permissions#optional-only_permissions)
  permission (`"userScripts"`), and dynamically registering events and scripts
  based on its availability.

- Using the `userScripts` API to register, update, and unregister user script
  code.

- Isolating user scripts in individual execution contexts (`USER_SCRIPT`
  world), and conditionally exposing custom functions to user scripts.


## What it does

After loading, the extension detects the new installation and opens the options
page embedded in `about:addons`. On the options page:

1. Click "Grant access to userScripts API" to trigger a permission prompt for
   the "userScripts" permission.
2. Click "Add new user script" to open a form where a new script can be
   registered.
3. Input a user script, by clicking one of the "Example" buttons and input a
   example from the [userscript_examples](userscript_examples) directory.
4. Click "Save" to trigger validation and save the script.

If the "userScripts" permission is granted, this schedules the execution of the
registered user scripts for the websites specified in each user script.

See [userscript_examples](userscript_examples) for examples of user scripts and
what they do.

If you repeat steps 2-4 for both examples and then visit https://example.com/, 
you should see this behavior:

- Show a dialog containing "This is a demo of a user script".
- Insert a button with the label "Show user script info", which opens a new tab
  displaying the extension information.

# What it shows

Showing onboarding UI after installation:

- `background.js` registers the `runtime.onInstalled` listener that calls
  `runtime.openOptionsPage` after installation.

Designing background scripts that can restart repeatedly with minimal overhead:

- This is particularly relevant to Manifest Version 3, because in MV3
  background scripts are always non-persistent and can suspend on inactivity.
- Using `storage.session` to store initialization status, to run expensive
  initialization only once per browser session.
- Registering events at the top level to handle events that are triggered while
  the background script is asleep.
- Using [dynamic import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import)
  to initialize optional JavaScript modules on demand.

Monitoring an optional permission (`userScripts`), and dynamically registering
events and scripts based on its availability:
events and scripts based on its availability:

- The `userScripts` permission is optional and can be granted by the user from:
  - the options page (`options.html` + `options.mjs`). 
  - the browser UI (where the user can also revoke the permission). See the
    Mozilla support article [Manage optional permissions for Firefox extensions](https://support.mozilla.org/en-US/kb/manage-optional-permissions-extensions).

- The `permissions.onAdded` and `permissions.onRemoved` events are used to
  monitor permission changes and, therefore, the availability of the
 `userScripts` API.

- When the `userScripts` API is available when `background.js` starts or
  `permissions.onAdded` detects that permission has been granted,
  initialization starts (using the `ensureUserScriptsRegistered` function in
  `background.js`).

- When the `userScripts` API is unavailable when `background.js` starts,
  the extension cannot use the `userScripts` API until `permissions.onAdded` is
  triggered. The options page stores user scripts in `storage.local` to enable
  the user to edit scripts even without the `userScripts` permission.

Using the `userScripts` API to register, update, and unregister code:

- The `applyUserScripts()` function in `background.js` demonstrates how to use
  the various `userScripts` APIs to register, update, and unregister scripts.
- `userscript_manager_logic.mjs` contains logic specific to user script
  managers. See [`userscript_manager_logic.mjs`](userscript_manager_logic.mjs)
  for comments and the conversion logic from a user script string to the format
  expected by the `userScripts` API
  ([RegisteredUserScript](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/userScripts/RegisteredUserScript)).

Isolating user scripts in individual execution contexts (`USER_SCRIPT` world),
and conditionally exposing custom functions to user scripts:

- Shows the use of `USER_SCRIPT` worlds (with distinct `worldId`) to
  define sandboxes for scripts to run in (see `registeredUserScript`
  in `userscript_manager_logic.mjs`).

- Shows the use of `userScripts.configureWorld()` with the `messaging` flag to
  enable the `runtime.sendMessage()` method in `USER_SCRIPT` worlds.

- Shows the use of `runtime.onUserScriptMessage` and `sender.userScriptWorldId`
  to detect messages and the script that sent messages.

- Shows how an initial script can use `runtime.sendMessage` to expose custom
  APIs to user scripts (see `userscript_api.js`).

# Feature availability

The `userScripts` API is available from Firefox 136. In Firefox 134 and 135, the
functionality is only available if the `extensions.userScripts.mv3.enabled`
preference is set to `true` at `about:config` before installing the extension.
