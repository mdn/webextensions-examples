# userScripts-mv3

A user script manager, demonstrating the userScripts API, the permissions API,
`optional_permissions`, and Manifest Version 3 (MV3).
The extension is an example of a
[user script manager](https://en.wikipedia.org/wiki/Userscript_manager).

This covers the following aspects to extension development:

- Showing onboarding UI after installation.

- Designing background scripts that can restart repeatedly with minimal
  overhead. This is especially relevant to Manifest Version 3.

- Minimizing the overhead of background script startup, which is especially
  relevant because event pages .

- Monitoring an optional (userScripts) permission, and dynamically registering
  events and scripts based on its availability.

- Using the `userScripts` API to register, update and unregister code.

- Isolating user scripts in their own execution context (`USER_SCRIPT` world),
  and conditionally exposing custom functions to user scripts.


## What it does

This extension is an example of a [user script manager](https://en.wikipedia.org/wiki/Userscript_manager)

After loading the extension, the extension detects the new installation and
opens the options page embedded in `about:addons`. On the options page:

1. You can click on the "Grant access to userScripts API" button to trigger a
   permission prompt for the "userScripts" permission.
2. Click on the "Add new user script" button to open a form where a new script
   can be registered.
3. Input a user script. E.g. by clicking one of the two "Example" buttons to
   input examples from the [userscript_examples](userscript_examples) directory.
4. Click on the "Save" button to trigger validation and save the script.

If the "userScripts" permission was granted, this will schedule the execution
of the registered user scripts for the websites as specified by the user script.

See [userscript_examples](userscript_examples) for examples of user scripts and
what they do.

If you repeat steps 2-4 for both examples, then a visit to https://example.com/
should show the following behavior:

- Show a dialog containing "This is a demo of a user script".
- Insert a button with the label "Show user script info", which opens a new tab
  displaying the extension information.

# What it shows

Showing onboarding UI after installation:

- `background.js` registers the `runtime.onInstalled` listener that calls
  `runtime.openOptionsPage` after installation.

Designing background scripts that can restart repeatedly with minimal overhead:

- This is especially relevant to Manifest Version 3, because background scripts
  are always non-persistent event pages, which can suspend on inactivity.
- Using `storage.session` to store initialization status, to run expensive
  initialization only once per browser session.
- Registering events at the top level to handle events that were triggered
  while the background script was asleep.
- Using [dynamic import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import)
  to initialize optional JavaScript modules on demand.

Monitoring an optional (userScripts) permission, and dynamically registering
events and scripts based on its availability:

- The `userScripts` permission is optional and can be granted by the user via
  the options page (`options.html` + `options.mjs`). The permission can also
  be granted/revoked via browser UI, by the user, as documented at
  https://support.mozilla.org/en-US/kb/manage-optional-permissions-extensions

- The `permissions.onAdded` and `permissions.onRemoved` events are used to
  monitor permission changes and the (un)availability of the `userScripts` API.

- When the `userScripts` API is available at the startup of `background.js`,
  and when the permission detected via `permissions.onAdded`, the initialization
  starts (via the `ensureUserScriptsRegistered` function in `background.js`).

- When the `userScripts` API is unavailable at the startup of `background.js`,
  the extension cannot use the `userScripts` API until `permissions.onAdded` is
  triggered. The options page stores user scripts in `storage.local` to enable
  the user to edit scripts even without the `userScripts` permission.

Using the `userScripts` API to register, update and unregister code:

- The `applyUserScripts()` function in `background.js` demonstrates how one use
  the various `userScripts` APIs to register, update and unregister scripts.
- `userscript_manager_logic.mjs` contains logic specific to user script
  managers. See [userscript_manager_logic.js](userscript_manager_logic.js) for
  comments and the conversion logic from a user script string to the format as
  expected by the userScripts API (RegisteredUserScript).

Isolating user scripts in their own execution context (`USER_SCRIPT` world),
and conditionally exposing custom functions to user scripts:

- Shows the use of multiple `USER_SCRIPT` worlds (with distinct `worldId`) to
  define separate sandboxes for scripts to run in (see `registeredUserScript`
  in `userscript_manager_logic.mjs`).

- Shows the use of `userScripts.configureWorld()` with the `messaging` flag to
  enable the `runtime.sendMessage()` method in `USER_SCRIPT` worlds.

- Shows the use of `runtime.onUserScriptMessage` and `sender.userScriptWorldId`
  to detect messages and the script that sent messages.

- Shows how an initial script can use `runtime.sendMessage` to expose custom
  APIs to user scripts (see `userscript_api.js`).
