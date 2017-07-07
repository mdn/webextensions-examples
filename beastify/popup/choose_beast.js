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

If the click is on one of the beasts:
  (1) inject the test script into the active tab.
  This checks whether the tab's scope includes a function called "beastify()".

  (2) if the tab doesn't already have a function called "beastify()",
  then inject the beastify.js content script. Otherwise, do nothing.
  This should ensure that beastify.js is only injected once, even if
  the user clicks a beast again.

  (3) send a message to "beastify.js" that contains the URL to
  the chosen beast's image.

If it's on a button wich contains class "clear":
  Reload the page.
  Close the popup. This is needed, as the content script malfunctions after page reloads.
*/
document.addEventListener("click", (e) => {

  function injectTestScript() {
    return browser.tabs.executeScript({
      code: "typeof beastify === 'function';",
    });
  }

  function injectBeastify(testResults) {
    if (!testResults || testResults[0] !== true) {
      return browser.tabs.executeScript({
        file: "/content_scripts/beastify.js"
      });
    } else {
      return Promise.resolve(true);
    }
  }

  function messageBeastify() {
    var chosenBeast = e.target.textContent;
    var chosenBeastURL = beastNameToURL(chosenBeast);
    var gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
    gettingActiveTab.then((tabs) => {
      browser.tabs.sendMessage(tabs[0].id, {beastURL: chosenBeastURL});
    });
  }

  if (e.target.classList.contains("beast")) {
    injectTestScript()
      .then(injectBeastify)
      .then(messageBeastify);
  }
  else if (e.target.classList.contains("clear")) {
    browser.tabs.reload();
    window.close();
    return;
  }
});
