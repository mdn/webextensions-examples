"use strict";

/*
This is the page for which we want to rewrite the User-Agent header.
*/
var targetPage = "https://httpbin.org/*";

/*
Map browser names to UA strings.
*/
var uaStrings = {
  "Firefox 41": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.10; rv:41.0) Gecko/20100101 Firefox/41.0",
  "Chrome 41": "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36",
  "IE 11": "Mozilla/5.0 (compatible, MSIE 11, Windows NT 6.3; Trident/7.0;  rv:11.0) like Gecko"
}

/*
Initialize the UA to Firefox 41.
*/
var ua = uaStrings["Firefox 41"];

/*
Rewrite the User-Agent header to "ua".
*/
function rewriteUserAgentHeader(e) {
  for (var header of e.requestHeaders) {
    if (header.name.toLowerCase() === "user-agent") {
      header.value = ua;
    }
  }
  return {requestHeaders: e.requestHeaders};
}

/*
Add rewriteUserAgentHeader as a listener to onBeforeSendHeaders,
only for the target page.

Make it "blocking" so we can modify the headers.
*/
browser.webRequest.onBeforeSendHeaders.addListener(rewriteUserAgentHeader,
                                          {urls: [targetPage]},
                                          ["blocking", "requestHeaders"]);

/*
Update ua to a new value, mapped from the uaString parameter.
*/
function setUaString(uaString) {
  ua = uaStrings[uaString];
}
