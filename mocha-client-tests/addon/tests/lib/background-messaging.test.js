/**
 * Created by hmelenok on 10/30/16.
 */
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