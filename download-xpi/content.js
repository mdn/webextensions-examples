chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    sendResponse(
        // The site will replace the install button with a little
        // download anyway link for any non-Firefox browser.
        document.getElementById('downloadAnyway').href ||
        // This is where Firefox will find it, hopefully.
        (document.getElementsByClassName('installer').length ? document.getElementsByClassName('installer')[0].href : null)
    )
});
