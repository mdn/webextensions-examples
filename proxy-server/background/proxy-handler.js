// Log any errors from the proxy script
browser.proxy.onProxyError.addListener(error => {
  console.error(`Proxy error: ${error.message}`);
});

function logSettings(storedSettings) {
  console.log("Got proxy server info and auth info:");
  console.log(`proxy server address: ${storedSettings.proxyServerInfo.proxyServerAddress}`);
  console.log(`proxy server port: ${storedSettings.proxyServerInfo.proxyServerPort}`);
  console.log(`proxy server type: ${storedSettings.proxyServerInfo.proxyServerType}`);
  console.log(`proxy server username: ${storedSettings.authCredentials.username}`);
  console.log(`proxy server password: ${storedSettings.authCredentials.password}`);
}

let proxyScriptLoaded = false;
let proxyScriptURL = "proxy/proxy-script.js";

function handleMessage(message, sender) {
  // only handle messages from the proxy script
  if (sender.url !=  browser.extension.getURL(proxyScriptURL)) {
    return;
  }
  console.log(message);
}

function provideCredentialsAsync(details) {
  return browser.storage.local.get('authCredentials');
}

// storedSettings includes both proxyServerInfo and authCredentials
function registerProxyScript(proxyServerInfoAndAuth) {
  logSettings(proxyServerInfoAndAuth);
  if (!proxyScriptLoaded) {
    if (validateProxyServerInfo(proxyServerInfoAndAuth.proxyServerInfo)) {
      console.log("Registering proxy script");

      // Register the proxy script. Path is relative to manifest.json
      browser.proxy.register(proxyScriptURL);
      proxyScriptLoaded = true;
      sendSettingsToProxyScript(proxyServerInfoAndAuth.proxyServerInfo);
    }
  }
}

function unregisterProxyScript() {
  if (proxyScriptLoaded) {
    console.log("Unegistering proxy script");
    browser.proxy.unregister();
    proxyScriptLoaded = false;
  }
}

function validateProxyServerInfo(proxyServerInfo) {
  if (proxyServerInfo && proxyServerInfo.proxyServerAddress &&
        proxyServerInfo.proxyServerPort && proxyServerInfo.proxyServerType) {
    console.log("Validated proxy server, proxy server port, and proxy type");
    return true;
  }
  else {
    console.log("Visit the options page to define a proxy server, proxy server port, and proxy type");
    return false;
  }
}

function sendSettingsToProxyScript(proxyServerInfo) {
  console.log("Sending updated proxyServerInfo to proxy script");
  browser.runtime.sendMessage(proxyServerInfo, {toProxyScript: true});
}

browser.runtime.onMessage.addListener(handleMessage);

/**
 * After https://bugzilla.mozilla.org/show_bug.cgi?id=1359693 is fixed, onAuthRequired() not needed.
 * You can then specify username/password in FindProxyForURL().
 * If incorrect username/password is specified, then Firefox displays either
 * "Proxy server is refusing connections" (HTTP and HTTPS proxy servers) or
 * "Unable to connect" (SOCKS proxy servers)
 */
browser.webRequest.onAuthRequired.addListener(provideCredentialsAsync,
                                          {urls: ["<all_urls>"]},
                                          ["blocking"]);


// update the proxy whenever stored settings change
browser.storage.onChanged.addListener((newProxyServerInfoAndAuth) => {
  /** newProxyServerInfoAndAuth has this format (data is fake):
   *
   * proxyServerInfo: {newValue: {proxyServerAddress: "foo.bar", proxyServerPort: "3128", proxyServerType: "HTTP"},
   *                  oldValue: {proxyServerAddress: "baz.bar", proxyServerPort: "1235", proxyServerType: "SOCKS"}},
   * authCrendentials: {newValue: {username: "mungsantamaria", password: "mypass"}, oldValue: {username: "", password: ""}}
   */
  if (newProxyServerInfoAndAuth && validateProxyServerInfo(newProxyServerInfoAndAuth.proxyServerInfo.newValue)) {
    if (proxyScriptLoaded) {
      sendSettingsToProxyScript(newProxyServerInfoAndAuth.proxyServerInfo.newValue);
    }
    else {
      registerProxyScript({proxyServerInfo: newProxyServerInfoAndAuth.proxyServerInfo.newValue,
        authCredentials: newProxyServerInfoAndAuth.authCredentials.newValue});
    }
  }
  else {
    unregisterProxyScript();
  }
});

// get the current settings, then...
browser.storage.local.get()
  .then((proxyServerInfoAndAuth) => {
    // attempt to register the proxy script
    registerProxyScript(proxyServerInfoAndAuth);
  })
  .catch(()=> {
    console.error("Error retrieving stored settings");
  });
