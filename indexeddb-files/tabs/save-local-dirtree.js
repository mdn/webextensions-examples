const step01El = document.querySelector("#step-01");
const step02El = document.querySelector("#step-02");
const step03El = document.querySelector("#step-03");

// IndexedDB initializations.
var db;
const dbReq = indexedDB.open("savedFilesDB", 3);

// Logs errors on opening the db.
dbReq.onerror = evt => {
  dbLog(`ERROR: Fail to open indexedDB 'tempFilesDB' db: ${evt.target.error.message}`);
};

// Create the needed IndexedDB object store.
dbReq.onupgradeneeded = () => {
  const db = dbReq.result;

  dbLog(`Upgrade savedFilesDB.`);

  if (!db.objectStoreNames.contains("savedFiles")) {
    db.createObjectStore("savedFiles");
  }
};

// When the db is successfully opened, save its reference in a global accessible var,
// and update the UI state.
dbReq.onsuccess = () => {
  db = dbReq.result;

  step01El.setAttribute("open", "open");
  step02El.removeAttribute("open");
  step03El.removeAttribute("open");

  for (let el of document.querySelectorAll("input")) {
    el.removeAttribute("disabled");
  }
};

// Handle the filepicker and save all the files from the selected directory tree
// into the IndexedDB ObjectStore.
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
      logIDBFileLink({
        prefixText: "\n",
        fileIDBKey: file.webkitRelativePath,
        suffixText: " has been saved"
      });
    };
    dbRequest.onerror = (evt) => {
      dbLog(`ERROR saving ${file.webkitRelativePath}: ${evt.target.error.message}`);
    };
  };

  step02El.setAttribute("open", "open");
  step03El.setAttribute("open", "open");
}, false);

// This helpers read a filename from IndexedDB and prints its metadata in the logs
// (and the file content for any recognized text and image file types).
function readIDBFileByKey(filename) {
  if (!filename) {
    dbLog(`Missing filename.`);
    return;
  }

  const transaction = db.transaction(["savedFiles"]);
  const objectStore = transaction.objectStore("savedFiles");

  const dbRequest = objectStore.get(filename);
  dbRequest.onsuccess = (evt) => {
    const file = evt.target.result;
    if (!file) {
      dbLog(`File ${filename} not found.`);
      return;
    }

    // Read and print the file metadata.
    const {name, size, type, lastModifiedDate} = file;
    dbLog(`Read ${filename}:\n${JSON.stringify({name, size, type, lastModifiedDate}, null, 2)}`);

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
      const containerEl = document.createElement("div");
      const imgEl = document.createElement("img");
      imgEl.src = imgURL;
      imgEl.setAttribute("style", "width: 100px; height: 100px; margin: 2px;");
      containerEl.appendChild(imgEl);

      // Append the img element to the page to make it visible.
      dbLogHTMLElement(containerEl);
    }
  };
  dbRequest.onerror = (evt) => {
    dbLog(`ERROR reading ${filename}: ${evt.target.error.message}`);
  };
}

// Handle the button which lists all the saved files, the generated logs contains
// links, when the link is clicked it reads and logs the file metadata (and the file
// content for any recognized text and image file types).
document.getElementById("list-saved-files").addEventListener("click", () => {
  const transaction = db.transaction(["savedFiles"]);
  const objectStore = transaction.objectStore("savedFiles");

  const dbRequest = objectStore.getAllKeys();
  dbRequest.onsuccess = (evt) => {
    dbLog(`Saved files:\n`);

    for (let fileIDBKey of evt.target.result) {
      logIDBFileLink({prefixText: "\n", fileIDBKey, onClickHandler: readIDBFileByKey});
    }
  };
});

// Handle the button which read a saved file.
document.getElementById("read-file").addEventListener("click", () => {
  const filenameEl = document.getElementById("filename-to-read");
  readIDBFileByKey(filenameEl.value);

  // Clear the filename input element.
  filenameEl.value = null;
});

// Handle the button which create a zip file for all the saved files.
document.querySelector("#zip-files").addEventListener("click", () => {
  const transaction = db.transaction(["savedFiles"]);
  const objectStore = transaction.objectStore("savedFiles");

  var zip = new JSZip();
  transaction.oncomplete = () => {
    dbLog(`Generating the zip file blob...`);

    zip.generateAsync({type:"blob"}).then(function(zipBlob) {
      dbLog(`Creating the zip file link...`);
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

      step03El.setAttribute("open", "open");
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
