"use strict";

var rootCertStats = {};

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
