var inputTitle = document.querySelector('.new-note input');
var inputBody = document.querySelector('.new-note textarea');

var noteContainer = document.querySelector('.note-container');


var clearBtn = document.querySelector('.clear');
var addBtn = document.querySelector('.add');

addBtn.addEventListener('click', addNote);
clearBtn.addEventListener('click', clearAll);

initialize();

function initialize() {
  var length = localStorage.length;
  for(i = 0; i < length; i++) {
    var item = localStorage.getItem(localStorage.key(i));
    displayNote(localStorage.key(i),item);
  }
}

function addNote() {
  var noteTitle = inputTitle.value;
  var noteBody = inputBody.value;
  
  if(!localStorage.getItem(noteTitle) && noteTitle !== '' && noteBody !== '') {
    inputTitle.value = '';
    inputBody.value = '';
    displayNote(noteTitle,noteBody);
    storeNote(noteTitle,noteBody);
  }
}

function displayNote(title, body) {
  var note = document.createElement('div');
  var noteH = document.createElement('h2');
  var notePara = document.createElement('p');
  var deleteBtn = document.createElement('button');
  var clearFix = document.createElement('div');

  note.setAttribute('class','note');
  noteH.textContent = title;
  notePara.textContent = body;
  deleteBtn.setAttribute('class','delete');
  deleteBtn.textContent = 'Delete note';
  clearFix.setAttribute('class','clearfix');

  note.appendChild(noteH);
  note.appendChild(notePara);
  note.appendChild(deleteBtn);
  note.appendChild(clearFix);

  noteContainer.appendChild(note);

  deleteBtn.addEventListener('click',function(e){
    evtTgt = e.target;
    evtTgt.parentNode.parentNode.removeChild(evtTgt.parentNode);
    localStorage.removeItem(title);
  })
}

function storeNote(title, body) {
  localStorage.setItem(title, body);
}

function clearAll() {
  while (noteContainer.firstChild) {
      noteContainer.removeChild(noteContainer.firstChild);
  }
  localStorage.clear();
}