chrome.runtime.onMessage.addListener(handleMessage);
  
function handleMessage(request, sender, sendResponse) {
  switch(request.name) {
    case "highlight-para":
      highlightPara();
    case "show-foo":
      showFoo();
    case "show-confirm":
      showConfirm();
    }
  }

function highlightPara() {

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
