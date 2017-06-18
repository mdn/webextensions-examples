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
	if (proxyInfo.proxyServerAddress && proxyInfo.proxyServerPort && proxyInfo.proxyServerType)
  	return proxyInfo.proxyServerType + " " + proxyInfo.proxyServerAddress + ":" + proxyInfo.proxyServerPort;
	else
		return "DIRECT 123"; // After https://bugzilla.mozilla.org/show_bug.cgi?id=1355198 is fixed, change this to "DIRECT"
}
