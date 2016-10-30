/*
Feature detection
 */
// DON'T use 'var indexedDB = ...' if you're not in a function.
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

// This line should only be needed if it is needed to support the object's constants for older browsers
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || {
    READ_WRITE: 'readwrite'
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
addItem to db
 */
function addItem(db, data, success) {
    var store = db.transaction(['notes'], 'readwrite').objectStore('notes'),
        request = store.add(data);

    request.onerror = showErrorMessage;
    request.onsuccess = success;
}

function createIndex(event) {
    var db = event.target.result,
        store = db.createObjectStore('notes', {
            autoIncrement: true
        });

    db.onerror = showErrorMessage;

    // create indices to search db by
    store.createIndex('title', 'title', {
        unique: false
    });
    store.createIndex('description', 'description', {
        unique: false
    });
}

/*
populateDb with data
 */
function populateDb(db, data) {
    data.forEach(function(row) {
        addItem(db, row);
    });
}

/*
removeItem from db
 */
function removeItem(db, key) {
    var request = db.transaction(['notes'], 'readwrite')
        .objectStore('notes')
        .delete(key);

    request.onsuccess = function(event) {
        showNotes(db);
    };
}

function showNotes(db) {
    var list = document.createDocumentFragment(),
        notes = document.getElementById('notes');

    /*
    listNotes with cursor
     */
    function listNotes(event) {
        var cursor = event.target.result;

        if (cursor) {
            var title = document.createElement('h3'),
                description = document.createElement('p'),
                item = document.createElement('div'),
                button = document.createElement('button');

            title.innerHTML = cursor.value.title;
            description.innerHTML = cursor.value.description;

            // delete action
            button.setAttribute('id', cursor.primaryKey);
            button.onclick = function(event) {
                var key = +event.target.getAttribute('id');
                removeItem(db, key);
            };
            button.innerHTML = 'Remove';

            item.appendChild(title);
            item.appendChild(description);
            item.appendChild(button);

            list.appendChild(item);

            cursor.continue();
        } else {
            notes.innerHTML = '';
            notes.appendChild(list);
        }
    }

    var store = db.transaction('notes').objectStore('notes');

    store.openCursor().onsuccess = listNotes;
}

function notesApp(event) {
    const seedData = [{
        title: 'To-do',
        description: 'Buy cheese'
    }, {
        title: 'Books I like',
        description: 'Peak: the science of expertise'
    }];

    var db = event.target.result;

    populateDb(db, seedData);
    showNotes(db);
}

/*
Open and run IndexedDb
 */
function start() {
    var request = window.indexedDB.open('MyNotes', 1);

    request.onerror = showErrorMessage;
    request.onupgradeneeded = createIndex;
    request.onsuccess = notesApp;
}

document.addEventListener('DOMContentLoaded', start);