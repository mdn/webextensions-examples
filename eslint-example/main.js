 // not supported in Firefox
 // import { getUsefulContents } from "file";

 function start() {
     getUsefulContents(data => {
         var display = document.getElementById('display');

         display.innerHTML = data;
     });
 }

 document.addEventListener('DOMContentLoaded', start);