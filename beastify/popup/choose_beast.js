/*
Given the name of a beast, get the URL to the corresponding image.
*/
function beastNameToURL(beastName) {
  switch (beastName) {
    case "Frog":
      return browser.extension.getURL("beasts/frog.jpg");
    case "Snake":
      return browser.extension.getURL("beasts/snake.jpg");
    case "Turtle":
      return browser.extension.getURL("beasts/turtle.jpg");
  }
}


/*
Listen for clicks in the popup.

If the click is not on one of the beasts, return early.

Otherwise, the text content of the node is the name of the beast we want.

Inject the "beastify.js" content script in the active tab.

Then get the active tab and send "beastify.js" a message
containing the URL to the chosen beast's image.
*/
document.addEventListener("click", function(e) {
  if (!e.target.classList.contains("beast")) {
    return;
  }

  var chosenBeast = e.target.textContent;
  var chosenBeastURL = beastNameToURL(chosenBeast);

  browser.tabs.executeScript(null, {
    file: "/content_scripts/beastify.js"
  });

  browser.tabs.query({active: true, currentWindow: true}, function(tabs) {
    browser.tabs.sendMessage(tabs[0].id, {beastURL: chosenBeastURL});
  });

});
