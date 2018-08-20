"use strict";
(() => {
  if (window.hasRunContentScriptOnce === true) return;
  window.hasRunContentScriptOnce = true;
  
  browser.runtime.onConnect.addListener(port => {
    if (port.name !== "portFromPopup") return;
    let targetElements;
  
    port.onMessage.addListener(msg => {
      if (msg.action === "getElementDescriptions") {
        let elem = browser.menus.getTargetElement(msg.targetElementId);
        setTargetElement(elem);
      } else if (msg.action === "highlightElement") {
        let element = targetElements[msg.elementIndex];
        if (element) highlightElement(element);
        else removeHighlights();
      } else if (msg.action === "removeElement") {
        let element = targetElements[msg.elementIndex];
        if (element) {
          // When an element is removed, all of its descendants are removed too.
          // Update the UI, to show all nodes starting from the parent element.
          let parentElement = element.parentElement;
          element.remove();
          setTargetElement(parentElement);
        }
      }
    });
    port.onDisconnect.addListener(() => {
      // Clean up when the port is disconnected (e.g. popup was closed).
      removeHighlights();
    });
  
    function setTargetElement(elem) {
      targetElements = [];
      while (elem) {
        targetElements.unshift(elem);
        elem = elem.parentElement;
      }
  
      // Reply with some description of the elements, so that the available
      // elements can be shown in the popup's UI.
      let descriptions = targetElements.map(elem => {
        // For example, take the first 100 characters of the HTML element.
        return elem.cloneNode().outerHTML.slice(0, 100);
      });
      port.postMessage({
        action: "elementDescriptions",
        descriptions,
      });
    }
  });
  
  
  var highlightedBox;
  function highlightElement(element) {
    removeHighlights();
    let boundingRect = element.getBoundingClientRect();
    highlightedBox = document.createElement("div");
    highlightedBox.style.outline = "2px dotted red";
    highlightedBox.style.margin = "0";
    highlightedBox.style.border = "0";
    highlightedBox.style.padding = "0";
    highlightedBox.style.backgroundColor = "rgba(100, 0, 0, 0.3)";
    highlightedBox.style.pointerEvents = "none";
    highlightedBox.style.zIndex = "2147483647";
    highlightedBox.style.position = "fixed";
    highlightedBox.style.top = boundingRect.top + "px";
    highlightedBox.style.left = boundingRect.left + "px";
    highlightedBox.style.width = boundingRect.width + "px";
    highlightedBox.style.height = boundingRect.height + "px";
  
    (document.body || document.documentElement).appendChild(highlightedBox);
  }
  
  function removeHighlights() {
    if (highlightedBox) {
      highlightedBox.remove();
      highlightedBox = null;
    }
  }
})();
