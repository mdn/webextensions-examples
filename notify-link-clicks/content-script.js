window.addEventListener("click", notifyExtension);

function notifyExtension(e) {
  if (e.target.tagName != "A") {
    return;
  }
  chrome.runtime.sendMessage({"url": e.target.href});
}
