var contentScriptControls = document.getElementById("right-column")

var title = document.createElement("strong");
title.textContent = "Content script controls";

var highlightParaButton = makeButton(
  "highlight-para",
  "Highlight the paragraph",
  highlightPara);
  
var showFooButton = makeButton(
  "show-foo",
  "Get the value of window.foo",
  showFoo);
    
var callConfirmButton = makeButton(
  "call-window.confirm",
  "Call window.confirm()",
  callConfirm);
  
contentScriptControls.appendChild(title);
contentScriptControls.appendChild(document.createElement("br"));
contentScriptControls.appendChild(highlightParaButton);
contentScriptControls.appendChild(document.createElement("br"));
contentScriptControls.appendChild(showFooButton);
contentScriptControls.appendChild(document.createElement("br"));
contentScriptControls.appendChild(callConfirmButton);
contentScriptControls.appendChild(document.createElement("br"));

function makeButton(buttonId, buttonValue, buttonCommand) {
  var button = document.createElement("input");
  button.setAttribute("type", "button");
  button.setAttribute("id", buttonId);
  button.setAttribute("value", buttonValue);
  button.addEventListener("click", buttonCommand)
  return button;
}

// the actual actions

function highlightPara() {
  var pageScriptPara = document.getElementById("page-script-para");
  pageScriptPara.style.backgroundColor = "blue";
}

function showFoo() {
  var output = document.getElementById("output");
  output.textContent = "window.foo=" + window.foo;
}

function callConfirm() {
  window.confirm("Are you sure?");
}
