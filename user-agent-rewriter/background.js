"use strict";

var targetPage = "http://useragentstring.com/*";

var uaStrings = {
  "Firefox 41": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.10; rv:41.0) Gecko/20100101 Firefox/41.0",
  "Chrome 41": "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36",
  "IE 11": "Mozilla/5.0 (compatible, MSIE 11, Windows NT 6.3; Trident/7.0;  rv:11.0) like Gecko"
}

var ua = uaStrings["Firefox 41"];

chrome.webRequest.onBeforeSendHeaders.addListener(rewriteUserAgentHeader,
                                          {urls: [targetPage]},
                                          ["blocking", "requestHeaders"]);

function rewriteUserAgentHeader(e) {
  for (var header of e.requestHeaders) {
    if (header.name == "User-Agent") {
      header.value = ua;
    }
  }
  return {requestHeaders: e.requestHeaders};
}

chrome.runtime.onMessage.addListener(setUaString);

function setUaString(message) {
  ua = uaStrings[message.uaString];
}
