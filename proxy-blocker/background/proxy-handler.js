// Initialize the list of blocked hosts
let blockedHosts = [];
const defaultBlockedHosts = ["example.com", "example.org"];

// set the defaults on install
browser.runtime.onInstalled.addListener(details => {
  browser.storage.local.set({
    blockedHosts: defaultBlockedHosts
  });
});

// Get the stored list, if there is one, or use defaults
browser.storage.local.get(data => {
  if (data.blockedHosts) {
    blockedHosts = data.blockedHosts;
  } else {
    blockedHosts = defaultBlockedHosts;
  }
});

// listen for changes in the blocked list
browser.storage.onChanged.addListener(changeData => {
  blockedHosts = changeData.blockedHosts.newValue;
});


// Managed the proxy

// Listen for a request to open a webpage
browser.proxy.onRequest.addListener(handleProxyRequest, {urls: ["<all_urls>"]});

// On the request to open a webpage
function handleProxyRequest(requestInfo) {
// Read the web address of the page to be visited 
  const url = new URL(requestInfo.url);
// Determine whether the domain in the web address is on the blocked hosts list
  if (blockedHosts.indexOf(url.hostname) != -1) {
// Write details of the proxied host to the console and return the proxy address
    console.log(`Proxying: ${url.hostname}`);
    return {type: "http", host: "127.0.0.1", port: 65535};
  }
// Return instructions to open the requested webpage
  return {type: "direct"};
}

// Log any errors from the proxy script
browser.proxy.onError.addListener(error => {
  console.error(`Proxy error: ${error.message}`);
});



