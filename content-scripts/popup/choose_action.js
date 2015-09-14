
document.addEventListener("click", function(e) {
  if (!e.target.classList.contains("action")) {
    return;
  }

  var chosenAction = e.target.textContent;
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {name: chosenAction});
  });
});
