// Keep track of any local settings for the addon.
let settings = {
  enabled: false,
};

// Required PAC function that will be called to determine
// if a proxy should be used.
function FindProxyForURL(url, host) {
  if (settings.enabled) {
    return "DIRECT 1.2.3.4:8080"; // Update to return proxy server rules (e.g. "PROXY 1.2.3.4:8080")
  }
  return "DIRECT 1.2.3.4:8080";
}

// Listen for messages from the background script.
browser.runtime.onMessage.addListener(msg => {
  settings.enabled = msg.enabled;
});