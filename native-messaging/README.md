This is a very simple example of how to use [native messaging](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Native_messaging) to exchange messages between a WebExtension and a native application.

The WebExtension, which can be found under "add-on", connects to the native application and listens to messages from it. It then sends a message to the native application when the user clicks on the WebExtension's browser action. The message payload is just "ping".

The native application, which can be found under "app", listens for messages from the WebExtension. When it receives a message, the native application sends a response message whose payload is just "pong". The native application is written in Python.

## Setup

To get this working, there's a little setup to do.

### Linux/macOS setup

1. Make sure that you have Python 3 installed, and that your system's PATH environment variable includes the path to Python by executing the following command:

    ```bash
    > which python3
    /usr/local/bin/python3
    ```

    If you don't see the path of the application as above, you most likely need to install Python 3 on your computer. See [Using Python on Unix platforms](https://docs.python.org/3/using/unix.html) or [Using Python on a Mac](https://docs.python.org/3/using/windows.html). Restart the web browser after making this change in order for Firefox to pick up the new PATH environment variable.

2. Make sure that the [file permissions](https://en.wikipedia.org/wiki/File_system_permissions) for `app/ping_pong.py` include the `execute` permission. See [this article by RedHat](https://www.redhat.com/sysadmin/linux-file-permissions-explained) for more information.

3. Update the `"path"` field in `app/ping_pong.json` to be the full path to your `app/ping_pong.py` file.

    For example, if you cloned this repository into `/Users/MDN/webextensions-examples/`, you would update the file like this:

    ```json
    "path": "/Users/MDN/webextensions-examples/native-messaging/app/ping_pong.py"
    ```

4. Copy `app/ping_pong.json` to the correct location on your computer. There are too many options to list here; see the [Linux](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Native_manifests#linux) and [macOS](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Native_manifests#macos) secitons of [App manifest location ](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Native_manifests#Manifest_location) to find the correct location for your OS and personal preference.

### Windows setup

1. Make sure that you have Python 3 installed and that your system's PATH environment variable includes the path to Python.  See [Using Python on Windows](https://docs.python.org/3/using/windows.html). You'll need to restart the web browser after making this change, or the browser won't pick up the new environment variable.

2. Update the `"path"` field in `app\ping_pong.json` to use the full path of `app\ping_pong_win.bat` on your computer. Be aware that you'll need to escape the Windows directory separator (`\`).

    For example, if you cloned this repository into `C:\Users\MDN\webextensions-examples\`, you would update the JSON file like this:

    ```json
    "path": "C:\\Users\\MDN\\webextensions-examples\\native-messaging\\app\\ping_pong_win.bat"
    ```

3. Update `app\ping_pong_win.bat` to use the full path of `app\ping_pong.py` on your computer.

4. Add a registry key containing the full path of `app\ping_pong.json` on your computer. See [App manifest location](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Native_manifests#Manifest_location) to find details of the registry key to add.

To assist in troubleshooting on Windows, there is a script next to this README file named `check_config_win.py`. Running this in a command shell should help you discover of any problems.

## Testing the example

First, install the add-on. Visit `about:debugging#/runtime/this-firefox` or, from `about:debugging` click "This Firefox" (or "This Nightly" in the Nightly version of Firefox), click "Load Temporary Add-on", and open the add-on's `manifest.json`.

Now, open the extension's console using the "Inspect" button - this is where you'll see communication between the browser and native app.

You should see a new browser action icon in the toolbar. Click it. You should see output like this in the console:

    Sending: ping
    Received: pong3

If you don't see this output, see the [Troubleshooting guide](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Native_messaging#Troubleshooting) for ideas.
