var proxyInfo = {};

// tell the background script that we are ready
browser.runtime.sendMessage("init");

// listen for updates to the proxy info
browser.runtime.onMessage.addListener((message) => {
  proxyInfo = message;
});

// required PAC function that will be called to determine
// if a proxy should be used.
function FindProxyForURL(url, host) {
  browser.runtime.sendMessage("In FindProxyForURL()");
  if (proxyInfo.proxyServerAddress && proxyInfo.proxyServerPort && proxyInfo.proxyServerType) {
    let ret = proxyInfo.proxyServerType + " " + proxyInfo.proxyServerAddress + ":" + proxyInfo.proxyServerPort;
    browser.runtime.sendMessage("Proxying request: " + url + " with " + ret);
    return ret;
  }
  else {
    browser.runtime.sendMessage("Not proxying request: " + url);
    return "DIRECT"; // If you want this code to work with Firefox 55, change this to "DIRECT 123" see bug https://bugzilla.mozilla.org/show_bug.cgi?id=1355198
  }
}
