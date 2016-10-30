/**
 * Created by hmelenok on 10/30/16.
 */
var Background = {
    receiveMessage: function(msg, sender, sendResponse) {
        if (msg && msg.action && Background.hasOwnProperty(msg.action)) {
            return Background[msg.action](msg, sender, sendResponse);
        }
    },
    pong: function() {
        sendResponse('pong');
        return true;
    }
};

chrome.runtime.onMessage.addListener(Background.receiveMessage);