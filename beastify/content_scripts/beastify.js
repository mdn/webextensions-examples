(function() {
  /*
  Check and set a global guard variable.
  If this content script is injected into the same page again,
  it will do nothing next time.
  */
  if (window.hasRun) {
    return;
  }
  window.hasRun = true;

  /*
  beastify():
  * removes every node in the document.body,
  * then inserts the chosen beast
  */
  function beastify(request, sender, sendResponse) {
    removeEverything();
    insertBeast(request.beastURL);
  }

  /*
  Remove every node under document.body
  */
  function removeEverything() {
    while (document.body.firstChild) {
      document.body.firstChild.remove();
    }
  }

  /*
  Given a URL to a beast image, create and style an IMG node pointing to
  that image, then insert the node into the document.
  */
  function insertBeast(beastURL) {
    var beastImage = document.createElement("img");
    beastImage.setAttribute("src", beastURL);
    beastImage.style.height = "100vh";
    document.body.appendChild(beastImage);
  }

  /*
  Assign beastify() as a listener for messages from the extension.
  */
  browser.runtime.onMessage.addListener(beastify);

})();
