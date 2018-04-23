let backgroundPage = browser.extension.getBackgroundPage();

document.getElementById("find-form").addEventListener("submit", function(e) {
  // Send the query from the form to the background page.
  backgroundPage.find(document.getElementById("find-input").value);
  e.preventDefault();
});

let results = document.getElementById("result-list");

function handleMessage(request, sender, response) {
  // Handle responses coming back from the background page.
  if (request.msg === "clear-results") {
    results.innerHTML = "";
  }
  if (request.msg === "found-result") {
    // List out responses from the background page as they come in.
    let li = document.createElement("li");
    li.innerText = `Tab id: ${request.id} at url: ${request.url} had ${request.count} hits.`;
    results.appendChild(li);
  }
}

browser.runtime.onMessage.addListener(handleMessage);
