"use strict";

// Note: declared with "var" because popup.js references this global variable.
// If this were to be declared with "const" or "let", then the variable would
// still be available to this file, but not to popup.js.
let rootCertStats = {};

/*
On an onHeadersReceived event, if there was a successful TLS connection
established, fetch the root cert and look at its subject.

If we haven't seen this subject before, add it. If we have, increment its stats.
*/
async function logRootCert(details) {
  try {
    let securityInfo = await browser.webRequest.getSecurityInfo(
      details.requestId,
      {"certificateChain": true}
    );
    if ((securityInfo.state == "secure" || securityInfo.state == "weak") &&
        !securityInfo.isUntrusted) {
      let rootName = securityInfo.certificates[securityInfo.certificates.length - 1].subject;
      if (rootCertStats[rootName] === undefined) {
        rootCertStats[rootName] = 1;
      } else {
        rootCertStats[rootName] = rootCertStats[rootName] + 1;
      }
    }
  }
  catch(error) {
    console.error(error);
  }
}

/*
Listen for all onHeadersReceived events.
*/
browser.webRequest.onHeadersReceived.addListener(logRootCert,
  {urls: ["<all_urls>"]},
  ["blocking"]
);

/*
Send the rootCertStats object to popup.js when requested.
*/
browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "getRootCertStats") {
    sendResponse({ rootCertStats: rootCertStats });
  }
});
