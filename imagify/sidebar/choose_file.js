/*
Listens for a file being selected, creates a ObjectURL for the chosen file, injects a
content script into the active tab then passes the image URL through a message to the
active tab ID.
*/

// Listen for a file being selected through the file picker
const inputElement = document.getElementById("input");
inputElement.addEventListener("change", handlePicked, false);

// Listen for a file being dropped into the drop zone
const dropbox = document.getElementById("drop_zone");
dropbox.addEventListener("dragenter", dragenter, false);
dropbox.addEventListener("dragover", dragover, false);
dropbox.addEventListener("drop", drop, false);

// Get the image file if it was chosen from the pick list
function handlePicked() {
  displayFile(this.files);
}

// Get the image file if it was dragged into the sidebar drop zone
function drop(e) {
  e.stopPropagation();
  e.preventDefault();
  displayFile(e.dataTransfer.files);
}

/* 
Insert the content script and send the image file ObjectURL to the content script using a 
message.
*/ 
function displayFile(fileList) {
  const imageURL = window.URL.createObjectURL(fileList[0]);

  browser.tabs.executeScript({
    file: "/content_scripts/content.js"
    }).then(messageContent)
      .catch(reportError);

  function messageContent() {
    const gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
    gettingActiveTab.then((tabs) => {
      browser.tabs.sendMessage(tabs[0].id, {imageURL});
    });
  }

  function reportError(error) {
    console.error(`Could not inject content script: ${error}`);
  }
}

// Ignore the drag enter event - not used in this extension
function dragenter(e) {
  e.stopPropagation();
  e.preventDefault();
}

// Ignore the drag over event - not used in this extension
function dragover(e) {
  e.stopPropagation();
  e.preventDefault();
}