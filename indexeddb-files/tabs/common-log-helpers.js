// Log text and images utilities.
const dbLogsEl = document.querySelector("#indexed-logs");

document.querySelector("#clear-logs").onclick = () => {
  while (dbLogsEl.firstChild) {
    dbLogsEl.removeChild(dbLogsEl.firstChild);
  }
};

function dbLogHTMLElement(el) {
  dbLogsEl.appendChild(el);

  // Scroll to the bottom automatically.
  dbLogsEl.scrollTop = dbLogsEl.scrollHeight;
}

function dbLog(...args) {
  dbLogHTMLElement(document.createTextNode('\n' + args.join(" ")));
}

function logIDBFileLink({prefixText, fileIDBKey, suffixText, onClickHandler }) {
  if (prefixText) {
    dbLogHTMLElement(document.createTextNode(prefixText));
  }

  const linkEl = document.createElement("a");
  linkEl.setAttribute("href", "#");
  linkEl.textContent = fileIDBKey;
  if (typeof onClickHandler == "function") {
    linkEl.onclick = () => {
      onClickHandler(fileIDBKey);
    };
  }

  dbLogHTMLElement(linkEl);

  if (suffixText) {
    dbLogHTMLElement(document.createTextNode(suffixText));
  }
}

function logImage(imageUrl) {

}
