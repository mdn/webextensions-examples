# native-messaging

This example demonstrates how to use [native messaging](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Native_messaging) to exchange messages between an extension and a native application.

## What it does

The extension, located in the "add-on" folder, provides a popup when the user clicks the extension's action button. When the popup opens, it connects to the native application and listens for messages. When the user clicks the popup's "Send ping" button, the popup sends a message with a payload of "ping" to the native application. The popup displays any messages received from the native application.

The native application, located in the "app" folder, listens for messages from the extension. When it receives a message, the native application sends a response message with a payload of "pong". The native application is written in Python.

Best practice for extensions is to avoid opening a long-lived connection to a native application from an event page or background service worker. Doing so keeps the background context and the native application running indefinitely.

In this example, the popup opens the connection to the native application, so the connection lives only as long as the popup is open. Closing the popup disconnects the port, and the browser shuts down the native application. This ensures that the native application and extension's background context are not kept alive when the extension has nothing to do.

## What it shows

This extension example shows how to:

* Set up an action button with a popup.
* Request permissions to use native messaging.
* Create a manifest file to define the location of a native application.
* Connect to a native application from a popup, so that the connection is scoped to the popup's lifetime.
* Send messages to a native application when the user clicks a button in the popup.
* Receive messages from a native application and display them in the popup.

## Setup

To get this working, you need the correct setup.

### Linux/macOS setup

1. (macOS) Store this extension in a location other than the Desktop, Documents, or Downloads folders in your home directory. macOS has access restrictions on these directories that prevent the Python script from executing as expected.

2. Make sure you have Python 3 installed, and your system's PATH environment variable includes the path to Python. You can check by executing this command:

    ```bash
    > which python3
    /usr/local/bin/python3
    ```

    If you don't see the path for Python, install Python 3. See [Using Python on Unix platforms](https://docs.python.org/3/using/unix.html) (for Linux) or [Using Python on a Mac](https://docs.python.org/3/using/mac.html). After making this change, restart Firefox so it picks up the new PATH environment variable.

3. Make sure that the [file permissions](https://en.wikipedia.org/wiki/File_system_permissions) for `app/ping_pong.py` include the `execute` permission. See [this article by Red Hat](https://www.redhat.com/sysadmin/linux-file-permissions-explained) for more information.

4. Update the `"path"` field in `app/ping_pong.json` to be the full path to your `app/ping_pong.py` file.

    For example, if you cloned this repository into `/Users/MDN/webextensions-examples/`, you would update the file like this:

    ```json
    "path": "/Users/MDN/webextensions-examples/native-messaging/app/ping_pong.py"
    ```

5. Copy `app/ping_pong.json` to the correct location on your computer. There are too many options to list here; see the [Linux](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Native_manifests#linux) and [macOS](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Native_manifests#macos) sections of [App manifest location ](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Native_manifests#Manifest_location) to find the correct location for your OS and personal preference.

### Windows setup

1. Make sure that you have Python 3 installed and that your system's PATH environment variable includes the path to Python. See [Using Python on Windows](https://docs.python.org/3/using/windows.html). After making this change, restart Firefox so it picks up the new PATH environment variable.

2. Update the `"path"` field in `app\ping_pong.json` to use the full path of `app\ping_pong_win.bat` on your computer. Be aware that you must escape the Windows directory separator (`\`).

    For example, if you cloned this repository into `C:\Users\MDN\webextensions-examples\`, you update the JSON file like this:

    ```json
    "path": "C:\\Users\\MDN\\webextensions-examples\\native-messaging\\app\\ping_pong_win.bat"
    ```

3. Update `app\ping_pong_win.bat` to use the full path of `app\ping_pong.py` on your computer.

4. Add a registry key containing the full path of `app\ping_pong.json` on your computer. See [App manifest location](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Native_manifests#Manifest_location) to find details of the registry key to add.

To assist with troubleshooting on Windows, the example includes the `check_config_win.py` script. Running this in a command shell should help you discover any problems.

## Testing the example

Install the add-on. Visit `about:debugging#/runtime/this-firefox` or, from `about:debugging`, click "This Firefox" (or "This Nightly" in the Nightly version of Firefox), click "Load Temporary Add-on", and open the add-on's `manifest.json`.

Open the extension from its action icon in the toolbar or from the Extensions list. With the popup open, click "Send ping". You should see output like this in the popup:

    Sending: ping
    Received: pong

If you don't see this output, see the [Troubleshooting guide](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Native_messaging#Troubleshooting) for ideas.
