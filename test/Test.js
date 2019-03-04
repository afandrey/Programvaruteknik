// https://codeburst.io/javascript-unit-testing-using-mocha-and-chai-1d97d9f18e71
let assert = require('assert');

/**
 * describe is a function which holds the collection of tests
 * @param 'first one' - the meaningful name to functionality under test
 * @param 'second one' - the function which contains one or multiple tests
*/
describe('Basic Mocha String Test', function () {
    // it is a function which is actually a test itself and takes two parameters
    // first is name to the test and second is function which holds the body of the test
    it('should return number of characters in a string', function () {
        // assert helps to determine the status of the test, it determines failure of the test.
        assert.equal("Hello".length, 4);
    });

    it('should return first character of the string', function () {
        assert.equal("Hello".charAt(0), 'H');
    });
});