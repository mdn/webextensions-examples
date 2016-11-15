'use strict';

/*
Feature detection
 */
if (!window.indexedDB) {
  window.alert("Your browser doesn't support a stable version of IndexedDB.");
}

/**
 * showErrorMessage from event if availble
 * @param  {Object} event
 */
function showErrorMessage(event) {
  if (event.target.errorCode) {
    alert('Database error: ' + event.target.errorCode);
    return;
  }

  alert('IndexedDB request denied');
}

/*
addItem to db
 */
/**
 * addItem to db
 * @param {Object} db      IDBDatabase instance
 * @param {Object} data    title and description
 * @param {function} success callback
 */
function addItem(db, data, success) {
  let store = db.transaction(['notes'], 'readwrite').objectStore('notes');
  let request = store.add(data);

  request.onerror = showErrorMessage;
  request.onsuccess = success;
}

function createIndex(event) {
  let db = event.target.result;
  let store = db.createObjectStore('notes', {
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

/**
 * populateDb with data
 * @param  {Object} db   IDBDatabase instance
 * @param  {Object[]} data with title and description
 */
function populateDb(db, data) {
  data.forEach(function(row) {
    addItem(db, row);
  });
}

/**
 * removeItem from db
 * @param  {Object} db  IDBDatabase instance
 * @param  {number} key in db
 */
function removeItem(db, key) {
  let request = db.transaction(['notes'], 'readwrite')
    .objectStore('notes')
    .delete(key);

  request.onsuccess = function(event) {
    showNotes(db);
  };
}

/**
 * showNotes in HTML
 * @param  {Object} db IDBDatabase instance
 */
function showNotes(db) {
  let list = document.createDocumentFragment();
  let notes = document.getElementById('notes');

  /*
  listNotes with cursor
   */
  function listNotes(event) {
    let cursor = event.target.result;

    if (cursor) {
      let title = document.createElement('h3');
      let description = document.createElement('p');
      let item = document.createElement('div');
      let button = document.createElement('button');

      title.innerHTML = cursor.value.title;
      description.innerHTML = cursor.value.description;

      // delete action
      button.setAttribute('id', cursor.primaryKey);
      button.onclick = function(event) {
        let key = +event.target.getAttribute('id');
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

  let store = db.transaction('notes').objectStore('notes');

  store.openCursor().onsuccess = listNotes;
}

/**
 * notesApp creates and removes notes in IndexedDB
 * @param  {Object} event from opening IndexedDB successfully
 */
function notesApp(event) {
  const seedData = [{
    title: 'To-do',
    description: 'Buy cheese'
  }, {
    title: 'Books I like',
    description: 'Peak: the science of expertise'
  }];

  let db = event.target.result;
  db.onerror = showErrorMessage;

  populateDb(db, seedData);
  showNotes(db);

  // add new item
  let form = document.getElementById('add-new-item');
  form.addEventListener('submit', function(event) {
    let title = document.getElementById('new-title'),
      description = document.getElementById('new-description');

    addItem(db, {
      title: title.value,
      description: description.value
    }, function() {
      showNotes(db);
      form.reset();
    });

    event.preventDefault();
  });
}

/**
 * start app by opening IndexedDB
 */
function start() {
  let request = window.indexedDB.open('MyNotes', 1);

  request.onerror = showErrorMessage;
  request.onupgradeneeded = createIndex;
  request.onsuccess = notesApp;
}

document.addEventListener('DOMContentLoaded', start);