/* exported FindProxyForURL */

var blockedHosts = [];
const allow = "DIRECT";
const deny = "PROXY 127.0.0.1:65535";

// tell the background script that we are ready
browser.runtime.sendMessage("init");

// listen for updates to the blocked host list
browser.runtime.onMessage.addListener((message) => {
  blockedHosts = message;
});

// required PAC function that will be called to determine
// if a proxy should be used.
function FindProxyForURL(url, host) {
  if (blockedHosts.indexOf(host) != -1) {
    browser.runtime.sendMessage(`Proxy-blocker: blocked ${url}`);
    return deny;
  }
  return allow;
}
