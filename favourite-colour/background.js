function handleClick() {
  chrome.runtime.openOptionsPage();
}

chrome.browserAction.onClicked.addListener(handleClick);
