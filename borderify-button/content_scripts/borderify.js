chrome.runtime.onMessage.addListener(borderify);
  
function borderify(request, sender, sendResponse) {
  document.body.style.border = "5px solid " + request.color;
}
