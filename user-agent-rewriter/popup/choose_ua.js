
/*
If the user clicks on an element which has the class "ua-choice":
* fetch the element's textContent: for example, "IE 11"
* pass it into the background page's setUaString() function
*/
document.addEventListener("click", (e) => {
  if (!e.target.classList.contains("ua-choice")) {
    return;
  }

  var chosenUa = e.target.textContent;
  var backgroundPage = browser.extension.getBackgroundPage();
  backgroundPage.setUaString(chosenUa);
});
