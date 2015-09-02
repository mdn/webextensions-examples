// Assign beastify() as a listener for messages from the extension.
chrome.runtime.onMessage.addListener(beastify);
  
function beastify(request, sender, sendResponse) {
  var beastURL = beastNameToURL(request.beast);
  var images = document.querySelectorAll("img");
  for (var i = 0; i < images.length; ++i) {
    images[i].setAttribute("src", beastURL);
  }
  
  chrome.runtime.onMessage.removeListener(beastify);
}

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
