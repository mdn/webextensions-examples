/*
Open a new tab, and load "notes.html" into it.
*/
function openNotes() {
    chrome.tabs.create({
        "url": chrome.extension.getURL("notes.html")
    });
}


/*
Add openNotes() as a listener to clicks on the browser action.
*/
chrome.browserAction.onClicked.addListener(openNotes);