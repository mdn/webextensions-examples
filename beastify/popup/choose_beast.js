/*
Listen for clicks in the popup.

If the click is not on one of the beasts, return early.

Otherwise, the text content of the node is the name of the beast we want.

Run the "beastify.js" content script in the active tab, calling setBeast()
once the content script has executed.

Inside setBeast(), get the active tab, then send it a message containing
the chosen beast's name. This message will be received by the content script
we just executed.
*/
document.addEventListener("click", function(e) {
  if (!e.target.classList.contains("beast")) {
    return;
  }

  var chosenBeast = e.target.textContent;

  chrome.tabs.executeScript(null, {
    file: "/content_scripts/beastify.js"
  });

  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {beast: chosenBeast});
  });

});
