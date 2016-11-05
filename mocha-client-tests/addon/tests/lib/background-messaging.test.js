describe('Background', function() {
    describe('ping', function() {
        it('should return pong in response', function(done) {
            chrome.runtime.sendMessage({action: 'ping'},function(response) {
                expect(response).to.equal('pong');
                done();
            });
        });
    });
});