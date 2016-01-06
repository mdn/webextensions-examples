window.addEventListener("click", notifyExtension);

function notifyExtension(e) {
  if (e.target.tagName != "A") {
    return;
  }
  console.log("content script sending message");
  chrome.runtime.sendMessage({"url": e.target.href});
}
