// Register the proxy script
browser.proxy.registerProxyScript("proxy_script.js");

// Called if there is an error.
browser.proxy.onProxyError.addListener(error => {
  console.log(error.message);
});

browser.runtime.onMessage.addListener(msg => {
  console.log(msg);
});

browser.runtime.sendMessage({enabled: true}, {toProxyScript: true});