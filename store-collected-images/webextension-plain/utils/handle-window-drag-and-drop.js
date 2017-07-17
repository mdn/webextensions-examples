/* exported preventWindowDragAndDrop */

"use strict";

function preventWindowDragAndDrop() {
  function preventDefault(ev) {
    ev.preventDefault();
    return true;
  }

  window.ondragover = preventDefault;
  window.ondragend = preventDefault;
  window.ondrop = preventDefault;
}
