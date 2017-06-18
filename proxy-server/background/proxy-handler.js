// Log any errors from the proxy script
browser.proxy.onProxyError.addListener(error => {
  console.error(`Proxy error: ${error.message}`);
});

// Initialize the proxy
function handleInit(message) {
  // update the proxy whenever stored settings change
  browser.storage.onChanged.addListener((newSettings) => {
    if (newSettings.proxyServerInfo) {
      console.log("Sending updated proxyServerInfo to proxy script");
      browser.runtime.sendMessage(newSettings.proxyServerInfo.newValue, {toProxyScript: true});
    }
  });

  // get the current settings, then...
  browser.storage.local.get()
    .then((storedSettings) => {
      // if there are stored settings, update the proxy with them...
      if (storedSettings.proxyServerInfo) {
        logSettings(storedSettings);
        console.log("Sending updated proxyServerInfo to proxy script");
        browser.runtime.sendMessage(storedSettings.proxyServerInfo, {toProxyScript: true});
      }
    })
    .catch(()=> {
      console.log("Error retrieving stored settings");
    });
}

function logSettings(settings) {
  console.log("Got settings:");
  console.log(`${settings.proxyServerInfo.proxyServerAddress}`);
  console.log(`${settings.proxyServerInfo.proxyServerPort}`);
  console.log(`${settings.proxyServerInfo.proxyServerType}`);
  console.log(`${settings.authCredentials.username}`);
  console.log(`${settings.authCredentials.paΩssword}`);
}

function handleMessage(message, sender) {
  // only handle messages from the proxy script
  if (sender.url !=  browser.extension.getURL(proxyScriptURL)) {
    return;
  }

  if (message === "init") {
    handleInit(message);
  } else {
    // after the init message the only other messages are status messages
    console.log(message);
  }
}

function provideCredentialsASync(details) {
  return browser.storage.local.get('authCredentials');
}

browser.runtime.onMessage.addListener(handleMessage);

// After https://bugzilla.mozilla.org/show_bug.cgi?id=1359693 is fixed, onAuthRequired() not needed
// You can specify username/password in FindProxyForURL() 
browser.webRequest.onAuthRequired.addListener(provideCredentialsASync,
                                          {urls: ["<all_urls>"]},
                                          ["blocking"]);

let proxyScriptURL = "proxy/proxy-script.js";

// Register the proxy script. Path is relative to manifest.json
browser.proxy.registerProxyScript(proxyScriptURL);
