This is a very simple example of how to use native messaging to exchange messages between a WebExtension and a native application.

The WebExtension, which can be found under "add-on", connects to the native application and listens to messages from it. It then sends a message to the native application when the user clicks on the WebExtension's browser action. The message payload is just "ping".

The native application, which can be found under "app", listens for messages from the WebExtension. When it receives a message, the native application sends a response message whose payload is just "pong". The native application is written in Python.

To get this working, there's a little setup to do:

* edit the "path" property of "app/ping_pong.json" to point to the location of "app/ping_pong.py" on your computer
* copy "app/ping_pong.json" to the correct location on your computer. See [host manifest locations]() to find the correct location for your OS.

Then just install the add-on as usual, by visiting about:debugging, clicking "Load Temporary Add-on", and selecting the add-on's "manifest.json".
