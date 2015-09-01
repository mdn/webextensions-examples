
document.addEventListener("click", function(e) {
  if (! e.target.classList.contains("beast")) {
    return;
  }

  var chosenBeast = e.target.textContent;
  console.log(chosenBeast);

  chrome.tabs.executeScript({
    file: "content_scripts/beastify.js" 
  }, setBeast);

  function setBeast() {  
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {beast: chosenBeast});
      });
    }

});
