'use strict';

/**
 * openNotes in new tab
 */
function openNotes() {
	chrome.tabs.create({
		"url": chrome.runtime.getURL("notes.html")
	});
}

/**
* Add openNotes() as a listener to clicks on the browser action.
*/
chrome.browserAction.onClicked.addListener(openNotes);