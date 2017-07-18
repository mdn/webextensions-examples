
/*
Listens for a file being selected, gets the active tab ID, injects the content script
into the active tab and then passes the image URL and file name through a message.
*/

// Listen for a file being selected through the file picker
var inputElement = document.getElementById("input");
inputElement.addEventListener("change", handlePicked, false);

// Listen for a file being dropped into the drop zone
var dropbox = document.getElementById("drop_zone");
dropbox.addEventListener("dragenter", dragenter, false);
dropbox.addEventListener("dragover", dragover, false);
dropbox.addEventListener("drop", drop, false);

// Get the image file if it was chosen from the pick list
function handlePicked() {
  var fileList = this.files;
  displayFile(fileList);
}

// Get the image file if it was dragged into the sidebar drop zone
function drop(e) {
  e.stopPropagation();
  e.preventDefault();

  var dt = e.dataTransfer;
  var files = dt.files;

  displayFile(files);
}

// Send the image file to the content script 
async function displayFile(fileList) {
  var imageURL = window.URL.createObjectURL(fileList[0]);
  var theFileName = fileList[0].name;
  var myWindowId;
  var tabId;

  // Get the Window ID.
  await browser.windows.getCurrent({populate: true}).then((windowInfo) => {
    myWindowId = windowInfo.id;
  });

  // Get the active tab for the sidebar
  await browser.tabs.query({windowId: myWindowId, active: true})
    .then((tabs) => {
      tabId = tabs[0].id;
    });

  // Inject the content script into the active tab
  console.log("TAB ID", tabId);
  await browser.tabs.executeScript(tabId, {
    file: "/content_scripts/selfify.js"
  });

  // Send the content script the image URL and file name
  await browser.tabs.sendMessage(tabId, {
    imageURL: imageURL,
    fileName: theFileName,
  });
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