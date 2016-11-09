describe('Background', function() {
    describe('ping', function() {
        it('should return pong in response', function() {
            // Return a promise for Mocha using the Firefox browser API instead of chrome.
            return browser.runtime.sendMessage({action: 'ping'})
                .then(function(response) {
                    expect(response).to.equal('pong');
                });
        });
    });
});