var Background = {
    receiveMessage: function(msg, sender, sendResponse) {
        if (msg && msg.action && Background.hasOwnProperty(msg.action)) {
            return Background[msg.action](msg, sender, sendResponse);
        } else {
            console.warn('No handler for message: ' + JSON.stringify(msg));
        }
    },
    ping: function(msg, sender, sendResponse) {
        sendResponse('pong');
        return true;
    }
};

browser.runtime.onMessage.addListener(Background.receiveMessage);
