const leftPads = require("left-pad");

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    const result = leftPads(message.text, message.amount, message.with);
    sendResponse(result);
});
