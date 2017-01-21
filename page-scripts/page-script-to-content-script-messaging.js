var messenger = document.getElementById("from-page-script");

messenger.addEventListener("click", messageContentScript);

function messageContentScript() {
  window.postMessage({
    direction: "from-page-script",
    message: "Message from the page"
  }, "*");
}

window.addEventListener("message", function(event) {
  if (event.source == window &&
      event.data.direction &&
      event.data.direction == "from-content-script") {
    alert("Page script received message: \"" + event.data.message + "\"");
  }
});
