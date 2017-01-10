const step01El = document.querySelector("#step-01");
const step02El = document.querySelector("#step-02");
const step03El = document.querySelector("#step-03");
const step04El = document.querySelector("#step-03");

// IndexedDB initializations.
var db;
const dbReq = indexedDB.open("tempFilesDB", 3);

dbReq.onerror = evt => {
  dbLog(`ERROR: Fail to open indexedDB 'tempFilesDB' db: ${evt.target.error.message}`);
};

dbReq.onupgradeneeded = () => {
  const db = dbReq.result;

  dbLog(`Upgrade tempFilesDB.`);

  if (!db.objectStoreNames.contains("tempFiles")) {
    db.createObjectStore("tempFiles");
  }
};

dbReq.onsuccess = () => {
  db = dbReq.result;

  step01El.setAttribute("open", "open");
  step02El.removeAttribute("open");
  step03El.removeAttribute("open");
  step04El.removeAttribute("open");

  for (let el of document.querySelectorAll("input")) {
    el.removeAttribute("disabled");
  }

  dbLog(`Opened tempFiles db.`);

  db.onerror = evt => {
    dbLog(`Error during indexedDB operation: ${evt.target.error.message}`);
  };
};


// Keep a reference to the last created temp file,
// the file will be garbage collected once it is not
// referenced anymore.
var tempFile;

// Assert helpers (which log errors and raise an Error if the assertion is not verified).
function assertDefined(val, msg) {
  if (!val) {
    dbLog(msg);
    throw new Error(msg);
  }
}

function assertIndexedDBReady() {
  assertDefined(db, `The expected IndexedDB is not currently opened`);
}

function assertOpenedFileReady() {
  assertDefined(tempFile, `The expected tempFile object is not currently opened`);
}

// Handle the create file button.
document.querySelector("#create-file").addEventListener("click", () => {
  assertIndexedDBReady();

  // Create a new mutable file.
  const tempFileReq = db.createMutableFile("newTempFile", "binary");

  tempFileReq.onsuccess = () => {
    dbLog(`a new File object has been created`);

    // Persist the opened file into a global var, so that the file handle will not
    // be invalidated once this function returns.
    tempFile = tempFileReq.result;

    step02El.setAttribute("open", "open");
    document.querySelector("textarea").removeAttribute("disabled");
  };
});

// Handle the "save-data" button: fetch the contents of the "file-data" textarea
// and append it to the currently open temporary file.
document.querySelector("#save-data").addEventListener("click", () => {
  assertOpenedFileReady();

  // Open the mutable file and write new data in it.
  const lockedFile = tempFile.open("readwrite");
  const saveDataReq = lockedFile.append(document.querySelector('#file-data').value);
  saveDataReq.onsuccess = () => {
    dbLog(`wrote data into the tempFile`);
    step03El.setAttribute("open", "open");
  };
  saveDataReq.onerror = () => {
    dbLog(`ERROR on writing data into the mutable file: ${saveDataReq.error.message}`);
  };
});

// Handle the "get-metadata" button: logs the metadata of the opened MutableFile.
document.querySelector("#get-metadata").addEventListener("click", () => {
  assertOpenedFileReady();

  // Open the mutable file and read its metadata.
  const lockedFile = tempFile.open("readonly");
  const metaDataReq = lockedFile.getMetadata({size: true, lastModified: true});
  metaDataReq.onsuccess = () => {
    console.log(metaDataReq);
    const {size, lastModified} = metaDataReq.result;
    dbLog(`tempFile metadata: ${JSON.stringify({size, lastModified}, null, 2)}`);
  };
});

// Handle the "persist-file" button: save the opened MutableFile into IndexedDB.
document.querySelector("#persist-file").addEventListener("click", () => {
  assertOpenedFileReady();
  assertIndexedDBReady();

  const filenameEl = document.querySelector("#filename-to-save");
  const filename = filenameEl.value;

  if (!filename) {
    dbLog("Unable to save: empty filename");
    return;
  }

  filenameEl.value = null;

  // Persist the MutableFile into indexedDB.
  const transaction = db.transaction(["tempFiles"], "readwrite");
  const objectStore = transaction.objectStore("tempFiles");
  const request = objectStore.put(tempFile, filename);
  request.onsuccess = function(event) {
    dbLog(`tempFile has been stored into IndexedDB as "${filename}"`);

    step03El.setAttribute("open", "open");
  };
});

// Handle the button which lists all the saved files.
document.getElementById("list-saved-files").addEventListener("click", () => {
  assertIndexedDBReady();

  const transaction = db.transaction(["tempFiles"]);
  const objectStore = transaction.objectStore("tempFiles");

  const dbRequest = objectStore.getAllKeys();
  dbRequest.onsuccess = (evt) => {
    dbLog(`Saved files:\n${evt.target.result.join('\n')}`);
  };
});

// Handle the button which reads and logs the metadata and the text content
// of a saved MutableFile.
document.getElementById("read-file").addEventListener("click", () => {
  assertIndexedDBReady();

  const filenameEl = document.getElementById("filename-to-read");
  const filename = filenameEl.value;

  if (!filename) {
    dbLog(`Missing filename.`);
    return;
  }

  // Clear the filename input element.
  filenameEl.value = null;

  const transaction = db.transaction(["tempFiles"]);
  const objectStore = transaction.objectStore("tempFiles");

  const dbRequest = objectStore.get(filename);
  dbRequest.onsuccess = (evt) => {
    const file = evt.target.result;
    if (!file) {
      dbLog(`File ${filename} not found.`);
      return;
    }

    // Read and print the file metadata.
    const {name, size, type, lastModifiedDate} = file;
    dbLog(`Read ${filename}: ${JSON.stringify({name, size, type, lastModifiedDate}, null, 2)}`);

    const reader = new FileReader();
    reader.addEventListener("loadend", () => {
      dbLog(`File ${filename} content:\n${reader.result}`);
    });

    // Retrieve the File instance from the MutableFile persisted into the IndexedDB
    const fileRequest = file.getFile();
    fileRequest.onsuccess = () => {
      // Read the data from the File instance.
      reader.readAsText(fileRequest.result);
    };
    fileRequest.onerror = () => {
      dbLog(`ERROR on reading the persisted mutable file: ${fileRequest.error.message}`);
    };
  };
});
