
var target = "https://httpbin.org/basic-auth/*";

var pendingRequests = [];

/*
A request has completed. We can stop worrying about it.
*/
function completed(requestDetails) {
  console.log("completed: " + requestDetails.requestId);
  var index = pendingRequests.indexOf(requestDetails.requestId);
  if (index > -1) {
    pendingRequests.splice(index, 1);
  }
}

function provideCredentialsAsync(requestDetails) {
  // If we have seen this request before,
  // then assume our credentials were bad,
  // and give up.
  if (pendingRequests.indexOf(requestDetails.requestId) != -1) {
    console.log("bad credentials for: " + requestDetails.requestId);
    return {cancel: true};
    
  } else {
    pendingRequests.push(requestDetails.requestId);
    console.log("providing credentials for: " + requestDetails.requestId);
    // we can return a promise that will be resolved
    // with the stored credentials
    return browser.storage.local.get(null);
  }
}

browser.webRequest.onAuthRequired.addListener(
    provideCredentialsAsync,
    {urls: [target]},
    ["blocking"]
  );

browser.webRequest.onCompleted.addListener(
  completed,
  {urls: [target]}
);

browser.webRequest.onErrorOccurred.addListener(
  completed,
  {urls: [target]}
);
