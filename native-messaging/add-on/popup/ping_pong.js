const sendPingButton = document.querySelector("#send-ping");
const messagesList = document.querySelector("#messages");

/*
Add a line of text to the popup.
*/
function log(text, isError = false) {
  const item = document.createElement("li");
  item.textContent = text;
  if (isError) {
    item.classList.add("error");
  }
  messagesList.appendChild(item);
}

/*
When the popup opens, connect to the "ping_pong" app. The port, and with it the
native application, lives only for as long as the popup is open: closing the
popup disconnects the port, and the browser shuts the application down.
*/
const port = browser.runtime.connectNative("ping_pong");

/*
Listen for messages from the app and display them in the popup.
*/
port.onMessage.addListener((response) => {
  log(`Received: ${response}`);
});

/*
Listen for the native messaging port closing.
*/
port.onDisconnect.addListener((port) => {
  sendPingButton.disabled = true;
  if (port.error) {
    log(`Disconnected due to an error: ${port.error.message}`, true);
  } else {
    // The port closed for an unspecified reason. If this occurred right after
    // calling `browser.runtime.connectNative()` there may have been a problem
    // starting the native messaging client.
    // See https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Native_messaging#troubleshooting
    log("Disconnected", true);
  }
});

/*
When the button in the popup is clicked, send the app a message.
*/
sendPingButton.addEventListener("click", () => {
  log("Sending: ping");
  port.postMessage("ping");
});
