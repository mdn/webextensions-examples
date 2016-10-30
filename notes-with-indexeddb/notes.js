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
requestError
 */
function requestError() {
    alert('IndexedDB request denied');
}

/*
dbError message from event
 */
function dbError(event) {
    alert('Database error: ' + event.target.errorCode);
}

/*
notesApp
 */
function notesApp(event) {
    this.db = event.target.result;
    this.db.onerror = dbError;
}

var request = window.indexedDB.open("MyNotes", 1);
request.onerror = requestError;
request.onsuccess = notesApp;