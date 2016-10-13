/*
Given the name of a beast, get the URL to the corresponding image.
*/

/*
updateButtons():
* looks in the self.beast variable to see if the page is beastified or not,
* updates the buttons with the inactive property if the page is not beastified
* does tho opposite in the case it is beastified
*/
function updateButtons() {
  if (self.beast) {
    var list = document.getElementsByClassName("clear");
    for (var i = 0; i < list.length; i++) {
        list[i].className = "button clear";
    }
  }
  else {
    var list = document.getElementsByClassName("clear");
    for (var i = 0; i < list.length; i++) {
        list[i].className = "button clear inactive";
    }
  }
}

updateButtons();

function beastNameToURL(beastName) {
  switch (beastName) {
    case "Frog":
      return chrome.extension.getURL("beasts/frog.jpg");
    case "Snake":
      return chrome.extension.getURL("beasts/snake.jpg");
    case "Turtle":
      return chrome.extension.getURL("beasts/turtle.jpg");
  }
}

/*
Listen for clicks in the popup.

If the click is on one of the beast buttons:
  The text content of the node is the name of the beast we want.

  Inject the "beastify.js" content script in the active tab.

  Then get the active tab and send "beastify.js" a message
  containing the URL to the chosen beast's image.

Else if the click is on one of the clear buttons:
  The text content of the node is the clear method we want.

  Inject the "clear.js" content script in the active tab.

  Then get the active tab and send "clear.js" a message
  containing the clear method.
*/
document.addEventListener("click", function(e) {
  if (e.target.classList.contains("beast")) {
    var chosenBeast = e.target.textContent;
    var chosenBeastURL = beastNameToURL(chosenBeast);

    chrome.tabs.executeScript(null, {
      file: "/content_scripts/beastify.js"
    });

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {beastURL: chosenBeastURL});
    });

    self.beast = true;

    updateButtons();
  }
  else if (e.target.classList.contains("clear")) {
    var chosenMethod = e.target.textContent;

    chrome.tabs.executeScript(null, {
      file: "/content_scripts/clear.js"
    });

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {type: chosenMethod});
    });

    self.beast = false;

    updateButtons();
  }

  return;
});
