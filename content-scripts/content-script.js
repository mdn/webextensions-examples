chrome.runtime.onMessage.addListener(handleMessage);
  
function handleMessage(request, sender, sendResponse) {
  switch(request.name) {
    case "highlight-para":
      highlightPara();
      break;
    case "show-foo":
      showFoo();
      break;
    case "call-confirm":
      callConfirm();
    }
  }

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
