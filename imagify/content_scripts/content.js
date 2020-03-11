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
  Add the image to the web page by:
  * Removing every node in the document.body
  * Inserting the selected image
  */
  function injectImage(request, sender, sendResponse) {
    removeEverything();
    insertImage(request.imageURL);
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
  Given a URL to an image, create and style an iframe containing an 
  IMG node pointing to that image, then insert the node into the document.
  */
  function insertImage(imageURL) {
    const insertImage = document.createElement("iframe");
    insertImage.setAttribute("src", browser.runtime.getURL(`/viewer.html?blobURL=${imageURL}`));
    insertImage.setAttribute("style", "width: 100vw; height: 100vh;");
    document.body.appendChild(insertImage);
  }  

  /*
  Assign injectImage() as a listener for messages from the extension.
  */
  browser.runtime.onMessage.addListener(injectImage);

})();