"use strict";

function preventDefault(ev) {
  ev.preventDefault();
  return true;
}

export default function preventWindowDragAndDrop() {
  window.ondragover = preventDefault;
  window.ondragend = preventDefault;
  window.ondrop = preventDefault;
}
