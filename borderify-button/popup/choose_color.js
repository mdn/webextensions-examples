
document.addEventListener("click", function(e) {
  if (! e.target.classList.contains("color-choice")) {
    return;
  }

  var chosenColor = e.target.id;
    
  chrome.tabs.executeScript({
    file: "content_scripts/borderify.js" 
  }, setColor);

  function setColor() {  
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {color: chosenColor});
      });
    }

});
