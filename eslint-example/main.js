// This special eslint comment declares that the code below relies on
// a named function in the global scope.

/* global getUsefulContents */
function start() {
   getUsefulContents(data => {
       let display = document.getElementById('display');

       display.innerHTML = data;
   });
}

document.addEventListener('DOMContentLoaded', start);
