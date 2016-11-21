/* global getUsefulContents */
function start() {
   getUsefulContents(data => {
       var display = document.getElementById('display');

       display.innerHTML = data;
   });
}

document.addEventListener('DOMContentLoaded', start);
