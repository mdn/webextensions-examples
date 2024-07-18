// Polyfill the "browser" global in Chrome.
globalThis.browser ??= chrome;

let target = "https://httpbin.org/basic-auth/*";

let pendingRequests = [];

/*
A request has completed. We can stop worrying about it.
*/
function completed(requestDetails) {
  console.log("completed: " + requestDetails.requestId);
  let index = pendingRequests.indexOf(requestDetails.requestId);
  if (index > -1) {
    pendingRequests.splice(index, 1);
  }
}

async function provideCredentialsAsync(requestDetails, asyncCallback) {
  // If we have seen this request before, then assume our credentials were bad,
  // and give up.
  if (pendingRequests.indexOf(requestDetails.requestId) != -1) {
    console.log("bad credentials for: " + requestDetails.requestId);
    return {cancel: true};

  } else {
    pendingRequests.push(requestDetails.requestId);
    console.log("providing credentials for: " + requestDetails.requestId);
    // We can respond asynchronously by calling asyncCallback and providing the
    // authentication credentials.
    const {authCredentials} = await browser.storage.local.get("authCredentials");
    asyncCallback({authCredentials});
  }
}

browser.webRequest.onAuthRequired.addListener(
    provideCredentialsAsync,
    {urls: [target]},
    ["asyncBlocking"]
  );

browser.webRequest.onCompleted.addListener(
  completed,
  {urls: [target]}
);

browser.webRequest.onErrorOccurred.addListener(
  completed,
  {urls: [target]}
);
