window.addEventListener("message", function(event) {
  if (event.source == window &&
      event.data.direction &&
      event.data.direction == "from-page-script") {
    alert("Content script received message: \"" + event.data.message + "\"");
  }
});

var fromContentScript = document.getElementById("from-content-script");

fromContentScript.addEventListener("click", messagePageScript);

function messagePageScript() {
  window.postMessage({
    direction: "from-content-script",
    message: "Message from the content script"
  }, "*");
}
