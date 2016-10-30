describe('Background', function() {
    describe('ping', function() {
        it('should return pong in response', function() {
            Background.ping(false, false, function(response) {
                response.should.equal('pong');
            });
        });
    });
});