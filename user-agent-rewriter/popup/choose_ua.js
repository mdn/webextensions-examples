document.addEventListener("click", function(e) {
  if (!e.target.classList.contains("ua-choice")) {
    return;
  }

  var chosenUa = e.target.textContent;
  var backgroundPage = chrome.extension.getBackgroundPage();
  backgroundPage.setUaString(chosenUa);
});
