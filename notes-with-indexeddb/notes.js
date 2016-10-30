/*
Feature detection
 */
// DON'T use "var indexedDB = ..." if you're not in a function.
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

// This line should only be needed if it is needed to support the object's constants for older browsers
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || {
    READ_WRITE: "readwrite"
};

window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

if (!window.indexedDB) {
    window.alert("Your browser doesn't support a stable version of IndexedDB.");
}

/*
showErrorMessage from event if available
 */
function showErrorMessage(event) {
    if (event && event.target && event.target.errorCode) {
        alert('Database error: ' + event.target.errorCode);
        return;
    }

    alert('IndexedDB request denied');
}

/*
notesApp
 */
function notesApp(event) {
    var db = event.target.result;

    db.onerror = showErrorMessage;
}

const seedData = [{
    title: "To-do",
    description: "Buy cheese"
}, {
    title: "Books I like",
    description: "Peak: the science of expertise"
}];

function populateDb(event) {
    var db = event.target.result;

    var store = db.createObjectStore("notes", {
        autoIncrement: true
    });

    // create indices to search db by
    store.createIndex("title", "title", {
        unique: false
    });
    store.createIndex("description", "description", {
        unique: false
    });

    for (var row of seedData) {
        store.add(seedData[row]);
    }
}

var request = window.indexedDB.open("MyNotes", 1);

request.onerror = showErrorMessage;
// if this fails a request error is thrown
request.onupgradeneeded = populateDb;

request.onsuccess = notesApp;