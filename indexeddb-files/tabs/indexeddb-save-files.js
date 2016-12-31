// Log text and images utilities.
const dbLogsEl = document.querySelector("#indexed-logs");
const dbImagesEl = document.querySelector("#indexed-images");

document.querySelector("#clear-logs").onclick = () => {
  dbLogsEl.innerText = "";
  while (dbImagesEl.firstChild) {
    dbImagesEl.removeChild(dbImagesEl.firstChild);
  }
};

const dbLog = (...args) => {
  dbLogsEl.innerText += '\n' + args.join(" ");
};

// IndexedDB initializations.
var db;
const dbReq = indexedDB.open("savedFilesDB", 3);

dbReq.onerror = evt => {
  dbLog(`ERROR: Fail to open indexedDB 'tempFilesDB' db: ${evt.target.error.message}`);
};

dbReq.onupgradeneeded = () => {
  const db = dbReq.result;

  dbLog(`Upgrade savedFilesDB.`);

  if (!db.objectStoreNames.contains("savedFiles")) {
    db.createObjectStore("savedFiles");
  }
};

dbReq.onsuccess = () => {
  db = dbReq.result;
};

// Handle the filepicker and save all the files from the selected dir into
// IndexedDB.
document.getElementById("filepicker").addEventListener("change", (event) => {
  if (!db) {
    dbLog(`Unable to save files: the db has not been opened.`);
    return;
  }

  const transaction = db.transaction(["savedFiles"], "readwrite");
  transaction.oncomplete = () => {
    dbLog(`"Save files" transaction completed successfully.`);
  };

  const objectStore = transaction.objectStore("savedFiles");
  const files = event.target.files;

  for (let i=0; i<files.length; i++) {
    const file = files[i];
    dbLog(`Saving ${file.webkitRelativePath}...`);

    const dbRequest = objectStore.put(file, file.webkitRelativePath);
    dbRequest.onsuccess = (evt) => {
      dbLog(`${file.webkitRelativePath} has been saved`);
    };
    dbRequest.onerror = (evt) => {
      dbLog(`ERROR saving ${file.webkitRelativePath}: ${evt.target.error.message}`);
    };
  };
}, false);

// Handle the button which lists all the saved files.
document.getElementById("list-saved-files").addEventListener("click", () => {
  const transaction = db.transaction(["savedFiles"]);
  const objectStore = transaction.objectStore("savedFiles");

  const dbRequest = objectStore.getAllKeys();
  dbRequest.onsuccess = (evt) => {
    dbLog(`Saved files:\n${evt.target.result.join('\n')}`);
  };
});

// Handle the button which read a saved file.
document.getElementById("read-file").addEventListener("click", () => {
  const filenameEl = document.getElementById("filename-to-read");
  const filename = filenameEl.value;

  if (!filename) {
    dbLog(`Missing filename.`);
    return;
  }

  // Clear the filename input element.
  filenameEl.value = null;

  const transaction = db.transaction(["savedFiles"]);
  const objectStore = transaction.objectStore("savedFiles");

  const dbRequest = objectStore.get(filename);
  dbRequest.onsuccess = (evt) => {
    const file = evt.target.result;
    if (!file) {
      dbLog("File ${filename} not found.");
      return;
    }

    // Read and print the file metadata.
    const {name, size, type, lastModifiedDate} = file;
    dbLog(`Read ${filename}: ${JSON.stringify({name, size, type, lastModifiedDate})}`);

    // If the file is a known mimetype read and print its content,
    // e.g. text, html, json and javascript files and images.
    if (type.startsWith("text/") || type.endsWith("/json") || type.endsWith("/javascript")) {
      let reader = new FileReader();
      reader.addEventListener("loadend", () => {
        dbLog(`File ${filename} content:\n${reader.result}`);
      });
      reader.readAsText(file);
    } else if (type.startsWith("image/")) {
      // Create an ObjectURL from the file blob data.
      const imgURL = URL.createObjectURL(file);

      // Create a new img tag element and set its src attribute to the
      // created ObjectURL.
      const imgEl = document.createElement("img");
      imgEl.src = imgURL;
      imgEl.setAttribute("style", "width: 100px; height: 100px; margin: 2px;");

      // Append the img element to the page to make it visible.
      dbImagesEl.appendChild(imgEl);
    }
  };
  dbRequest.onerror = (evt) => {
    dbLog(`ERROR reading ${filename}: ${evt.target.error.message}`);
  };
});

document.querySelector("#zip-files").addEventListener("click", () => {
  const transaction = db.transaction(["savedFiles"]);
  const objectStore = transaction.objectStore("savedFiles");

  var zip = new JSZip();
  transaction.oncomplete = () => {
    dbLog(`Generating the zip file blob...`);

    zip.generateAsync({type:"blob"}).then(function(zipBlob) {
      dbLog(`Download the zip file...`);
      const zipURL = URL.createObjectURL(zipBlob);
      const zipLinkEl = document.querySelector("#zip-file-link");

      // Create a link that can be used to download the file.
      zipLinkEl.href = zipURL;
      zipLinkEl.textContent = "indexedDBFiles.zip";
      // This will suggest a file name.
      // NOTE: if the
      zipLinkEl.download = "indexedDBFiles.zip";
      // disable the click event (which currently navigate the page and invalidate the url).
      zipLinkEl.onclick = () => {
        alert("Use the right-click menu and select 'Save Link As'");
        return false;
      };

      // Auto-download the zip file by opening the url into a new tab.
      // window.open(zipURL,'_newtab');
    });
  };

  objectStore.openCursor().onsuccess = (evt) => {
    const cursor = evt.target.result;

    if (cursor) {
      dbLog(`Add "${cursor.key}" to the generated zip file...`);
      zip.file(cursor.key, cursor.value);
      cursor.continue();
    }
  };
});
