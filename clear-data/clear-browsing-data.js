function logSettings() {
  function onGotSettings(s) {
    if (chrome.runtime.lastError) {
      console.log(chrome.runtime.lastError);
    } else {
      console.log(s);
    }
  }

  chrome.browsingData.settings(onGotSettings);
}

chrome.browserAction.onClicked.addListener(logSettings);
