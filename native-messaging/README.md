# native-messaging

This example demonstrates how to use [native messaging](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Native_messaging) to exchange messages between an extension and a native application.

## What it does

The extension, located in the "add-on" folder, connects to the native application and listens for messages from it. It then sends a message to the native application when the user clicks the extension's browser action. The message payload is just "ping".

The native application, located in the "app" folder, listens for messages from the extension. When it receives a message, the native application sends a response message with a payload of just "pong". The native application is written in Python.

## What it shows

This extension example shows how to:

* Add a background script to an extension.
* Set up an action button.
* Request permissions to use native messaging.
* Create a manifest file to define the location of a native application.
* Connect to a native application.
* Send messages to a native application when the user clicks the extension's action button.
* Receive messages from a native application.

## Setup

To get this working, there's a little setup to do.

### Linux/macOS setup

0. (macOS) Store this extension in a location other than the Desktop, Documents, or Downloads folders in your home directory. macOS has access restrictions on these directories that prevent the Python script from executing as expected.

1. Make sure you have Python 3 installed, and your system's PATH environment variable includes the path to Python. You can check by executing this command:

    ```bash
    > which python3
    /usr/local/bin/python3
    ```

    If you don't see the path for Python, install Python 3. See [Using Python on Unix platforms](https://docs.python.org/3/using/unix.html) (for Linux) or [Using Python on a Mac](https://docs.python.org/3/using/mac.html). After making this change, restart Firefox so it picks up the new PATH environment variable.

2. Make sure that the [file permissions](https://en.wikipedia.org/wiki/File_system_permissions) for `app/ping_pong.py` include the `execute` permission. See [this article by RedHat](https://www.redhat.com/sysadmin/linux-file-permissions-explained) for more information.

3. Update the `"path"` field in `app/ping_pong.json` to be the full path to your `app/ping_pong.py` file.

    For example, if you cloned this repository into `/Users/MDN/webextensions-examples/`, you would update the file like this:

    ```json
    "path": "/Users/MDN/webextensions-examples/native-messaging/app/ping_pong.py"
    ```

4. Copy `app/ping_pong.json` to the correct location on your computer. There are too many options to list here; see the [Linux](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Native_manifests#linux) and [macOS](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Native_manifests#macos) sections of [App manifest location ](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Native_manifests#Manifest_location) to find the correct location for your OS and personal preference.

### Windows setup

1. Make sure that you have Python 3 installed and that your system's PATH environment variable includes the path to Python. See [Using Python on Windows](https://docs.python.org/3/using/windows.html). After making this change, restart Firefox so it picks up the new PATH environment variable.

2. Update the `"path"` field in `app\ping_pong.json` to use the full path of `app\ping_pong_win.bat` on your computer. Be aware that you must escape the Windows directory separator (`\`).

    For example, if you cloned this repository into `C:\Users\MDN\webextensions-examples\`, you updaate the JSON file like this:

    ```json
    "path": "C:\\Users\\MDN\\webextensions-examples\\native-messaging\\app\\ping_pong_win.bat"
    ```

3. Update `app\ping_pong_win.bat` to use the full path of `app\ping_pong.py` on your computer.

4. Add a registry key containing the full path of `app\ping_pong.json` on your computer. See [App manifest location](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Native_manifests#Manifest_location) to find details of the registry key to add.

To assist with troubleshooting on Windows, the example includes the `check_config_win.py` script. Running this in a command shell should help you discover any problems.

## Testing the example

First, install the add-on. Visit `about:debugging#/runtime/this-firefox` or, from `about:debugging` click "This Firefox" (or "This Nightly" in the Nightly version of Firefox), click "Load Temporary Add-on", and open the add-on's `manifest.json`.

Now, open the extension's console using the "Inspect" button. This button opens Developer Tools, where you see communication between the browser and native app.

You should see a new browser action icon in the toolbar. Click it. You should see output like this in the console:

    Sending: ping
    Received: pong

If you don't see this output, see the [Troubleshooting guide](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Native_messaging#Troubleshooting) for ideas.
