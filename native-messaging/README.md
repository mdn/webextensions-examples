This is a very simple example of how to use native messaging to exchange messages between a WebExtension and a native application.

The WebExtension, which can be found under "add-on", connects to the native application and listens to messages from it. It then sends a message to the native application when the user clicks on the WebExtension's browser action. The message payload is just "ping".

The native application, which can be found under "app", listens for messages from the WebExtension. When it receives a message, the native application sends a response message whose payload is just "pong". The native application is written in Python.

## Setup ##

To get this working, there's a little setup to do.

### Mac OS/Linux setup ###

* Check that the [file permissions](https://en.wikipedia.org/wiki/File_system_permissions) for "ping_pong.py" include the `execute` permission.
* Edit the "path" property of "ping_pong.json" to point to the location of "ping_pong.py" on your computer.
* copy "ping_pong.json" to the correct location on your computer. See [Host Manifests ](https://wiki.mozilla.org/WebExtensions/Native_Messaging#Host_Manifests) to find the correct location for your OS.

### Windows setup ###

* Check you have Python installed.
* Edit "ping_pong_win.bat" so it contains the path to "ping_pong.py" on your computer.
* Edit the "path" property of "ping_pong_win.json" to point to the location of "ping_pong_win.bat" on your computer.
* Add a registry key containing the path to "ping_pong_win.json" on your computer. See [Host Manifests ](https://wiki.mozilla.org/WebExtensions/Native_Messaging#Host_Manifests) to find details of the registry key to add.

## Testing the example ##

Then just install the add-on as usual, by visiting about:debugging, clicking "Load Temporary Add-on", and selecting the add-on's "manifest.json".

You should see a new browser action icon in the toolbar. Open the console ("Tools/Web Developer/Browser Console" in Firefox), and click the browser action icon. You should see output like this in the console:

    Sending: ping
    Received: pong
