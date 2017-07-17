/*
selfify():
* removes every node in the document.body,
* then inserts the selected image
* then removes itself as a listener 
*/
function selfify(request, sender, sendResponse) {
  debugger;
  removeEverything();
  insertImage(request.imageURL, request.fileName);
  browser.runtime.onMessage.removeListener(selfify);
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
Given a URL to an image, create and style an IMG node pointing to
that image, then insert the node into the document.
*/
function insertImage(imageURL, fileName) {
  var insertImage = document.createElement("iframe");
  insertImage.setAttribute("src", browser.extension.getURL(`/viewer.html?blobURL=${imageURL}`));
  insertImage.setAttribute("style", "width: 100vw");
  insertImage.setAttribute("style", "height: 100vh");
  document.body.appendChild(insertImage);
  var info = document.createElement("span");
  info.innerHTML = fileName;
  document.body.appendChild(info);
}

/*
Assign selfify() as a listener for messages from the extension.
*/
browser.runtime.onMessage.addListener(selfify);