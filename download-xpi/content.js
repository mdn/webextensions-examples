chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    sendResponse(document.getElementsByClassName('install-button')[0].getElementsByClassName('installer')[0].href);
});
