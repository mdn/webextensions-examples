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
  (1) inject the beastify.js content script.

  (2) send a message to "beastify.js" that contains the URL to
  the chosen beast's image.

If it's on a button which contains class "clear":
  Reload the page.
  Close the popup. This is needed, as the content script malfunctions after page reloads.
*/
document.addEventListener("click", (e) => {

  function reportError(error) {
    console.error(`Could not beastify: ${error}`);
  }

  function beastify(tabs) {
    browser.tabs.executeScript(tabs[0].id, {
      file: "/content_scripts/beastify.js"
    }).then(() => {
      var chosenBeast = e.target.textContent;
      var url = beastNameToURL(chosenBeast);
      browser.tabs.sendMessage(tabs[0].id, {beastURL: url});
    });
  }

  if (e.target.classList.contains("beast")) {
    browser.tabs.query({active: true, currentWindow: true})
      .then(beastify)
      .catch(reportError);
  }
  else if (e.target.classList.contains("clear")) {
    browser.tabs.reload();
    window.close();
    return;
  }
});
