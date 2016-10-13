/*
clear():
* either reloads or clears the page depending on the request
*/
function clear(request, sender, sendResponse) {
  switch (request.type){
    case "Reload":
      location.reload();
      break;
    case "Blank":
      removeEverything();
      break;
  }

  chrome.runtime.onMessage.removeListener(clear);
}

function removeEverything() {
  while (document.body.firstChild) {
    document.body.firstChild.remove();
  }
}

/*
Assign clear() as a listener for messages from the extension.
*/
chrome.runtime.onMessage.addListener(clear);
