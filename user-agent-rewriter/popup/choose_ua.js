document.addEventListener("click", function(e) {
  if (!e.target.classList.contains("ua-choice")) {
    return;
  }

  var chosenUa = e.target.textContent;
  
  chrome.runtime.sendMessage({
    "command": "set-user-agent",
    "uaString": chosenUa
  });
});
