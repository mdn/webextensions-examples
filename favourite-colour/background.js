function handleClick() {
  browser.runtime.openOptionsPage();
}

browser.browserAction.onClicked.addListener(handleClick);
