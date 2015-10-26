"use strict";

chrome.tabs.query({ active: true }, tabs => {
    for (var tab of tabs) {
        chrome.pageAction.show(tab.id);
    }
});

chrome.tabs.onActivated.addListener(info => {
    chrome.pageAction.show(info.tabId);
});
