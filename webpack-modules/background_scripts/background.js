const leftPad = require("left-pad");

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    const result = leftPad(message.text, message.amount, message.with);
    sendResponse(result);
});
