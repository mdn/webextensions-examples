window.addEventListener("click", notifyExtension);

function notifyExtension(e) {
  console.log("content script sending message");
  if (e.target.tagName != "A") {
    return;
  }
  chrome.runtime.sendMessage({"url": e.target.href});
}
