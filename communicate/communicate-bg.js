console.log(chrome.runtime.id + " bg");

function handleMessages(message, sender, sendResponse) {
	console.log(chrome.runtime.id + " bg handleMessages");
	console.log("bg handleMessages gets", message, sender, sendResponse);
	switch (message.type) {
		case "tabs":
			chrome.tabs.query({currentWindow: true}, function(tabs) {
				sendResponse({ selection: message.selection, tabs: tabs });
			});
			break;
		case "id":
			sendResponse({ selection: message.selection, id: chrome.runtime.id});
			break;
		case "manifest":
			sendResponse({ selection: message.selection, manifest: chrome.runtime.getManifest()});
			break;
		case "platform":
			chrome.runtime.getPlatformInfo(function (info) {
				sendResponse({ selection: message.selection, platform: info});
			});
			break;
		case "package":
			chrome.runtime.getPackageDirectoryEntry(function (dir) {
				sendResponse({ selection: message.selection, package: dir});
			});
			break;
		case "background":
			var bg = chrome.extension.getBackgroundPage();
			sendResponse({ selection: message.selection, href: bg && bg.location && bg.location.href });
			break;
		case "views":
			sendResponse({ selection: message.selection, viewCount: chrome.extension.getViews().length });
			break;
		default:
			sendResponse({ selection: message.selection, type: "default"});
			break;
	}
	// return true from the event listener to indicate you wish to
	// send a response asynchronously (this will keep the message
	// channel open to the other end until sendResponse is called).
	// See https://developer.chrome.com/extensions/runtime#event-onMessage
	return true;
}

chrome.runtime.onMessage.addListener(handleMessages);

// Only for testing purposes. Disable/Enable Add-ons to initiate this
chrome.tabs.query({currentWindow: true/*, active: true*/}, function(tabs) {
	tabs.forEach(function (tab) {
		console.log("bg sends to tab.id " + tab.id);
		chrome.tabs.sendMessage(tab.id,
														{"type": "ping-from-bg"}, function(response) {
			console.log("response from cs in tab " + tab.id, response);
		});
	});
});
