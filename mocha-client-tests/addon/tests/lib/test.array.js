describe('Array', function() {
    describe('#indexOf()', function() {
        it('should return -1 when the value is not present', function() {
            expect([1,2,3]).to.not.contain(5);
            expect([1,2,3]).to.not.contain(0);
        });
    });
});