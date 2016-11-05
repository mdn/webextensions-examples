describe('Background', function() {
    describe('ping', function() {
        it('should return pong in response', function(done) {
            chrome.runtime.sendMessage({action: 'ping'},function(response) {
                response.should.equal('pong');
                done();
            });
        });
    });
});