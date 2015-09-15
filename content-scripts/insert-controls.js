function insertControls(parentElement, titleText) {

  var title = document.createElement("strong");
  title.textContent = titleText;

  var highlightParaButton = makeButton(
    "highlight-para",
    "Highlight the paragraph",
    toggleParaHighlight);
  
  var showFooButton = makeButton(
    "show-foo",
    "Get the value of window.foo",
    showFoo);
    
  var callConfirmButton = makeButton(
    "call-window.confirm",
    "Call window.confirm()",
    callConfirm);
  
  parentElement.appendChild(title);
  parentElement.appendChild(document.createElement("br"));
  parentElement.appendChild(highlightParaButton);
  parentElement.appendChild(document.createElement("br"));
  parentElement.appendChild(showFooButton);
  parentElement.appendChild(document.createElement("br"));
  parentElement.appendChild(callConfirmButton);
  parentElement.appendChild(document.createElement("br"));
}

function makeButton(buttonId, buttonValue, buttonCommand) {
  var button = document.createElement("input");
  button.setAttribute("type", "button");
  button.setAttribute("id", buttonId);
  button.setAttribute("value", buttonValue);
  button.addEventListener("click", buttonCommand)
  return button;
}

// the actual actions

function toggleParaHighlight() {
  var pageScriptPara = document.getElementById("page-script-para");
  var bgColor = pageScriptPara.style.backgroundColor;
  if (bgColor == "blue") {
    pageScriptPara.style.backgroundColor = "white";
  }
  else {
    pageScriptPara.style.backgroundColor = "blue";
  }
}

function showFoo() {
  var output = document.getElementById("output");
  output.textContent = "window.foo=" + window.foo;
}

function callConfirm() {
  window.confirm("Are you sure?");
}
