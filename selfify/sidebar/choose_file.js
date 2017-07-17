
/*
Listen for a file being selected.
*/

var inputElement = document.getElementById("input");
inputElement.addEventListener("change", handlePicked, false);

var dropbox = document.getElementById("drop_zone");
dropbox.addEventListener("dragenter", dragenter, false);
dropbox.addEventListener("dragover", dragover, false);
dropbox.addEventListener("drop", drop, false);

function handlePicked() {
  var fileList = this.files;
  displayFile(fileList);
}

function drop(e) {
  e.stopPropagation();
  e.preventDefault();

  var dt = e.dataTransfer;
  var files = dt.files;

  displayFile(files);
}

async function displayFile(fileList) {
  var imageURL = window.URL.createObjectURL(fileList[0]);
  var theFileName = fileList[0].name;
  var myWindowId;
  var tabId;


  // Get the Window ID.
  await browser.windows.getCurrent({populate: true}).then((windowInfo) => {
    myWindowId = windowInfo.id;
  });

  // Get the active tab for this sidebar
  await browser.tabs.query({windowId: myWindowId, active: true})
    .then((tabs) => {
      tabId = tabs[0].id;
    });

  console.log("TAB ID", tabId);
  await browser.tabs.executeScript(tabId, {
    file: "/content_scripts/selfify.js"
  });

  await browser.tabs.sendMessage(tabId, {
    imageURL: imageURL,
    fileName: theFileName,
  });
}

function dragenter(e) {
  e.stopPropagation();
  e.preventDefault();
}

function dragover(e) {
  e.stopPropagation();
  e.preventDefault();
}