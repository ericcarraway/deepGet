var assert = require('/usr/local/lib/node_modules/chai').assert;
var deepGet = require('./deepGet.js');

describe('deepGet', function () {
    var actual;
    var expected;

    var testObj = {
        some: {
            deeply: {
                nested: {
                    prop: 'found it'
                }
            }
        }
    };

    describe('existent properties', function () {
        it('should return a deeply nested property', function () {
            actual = deepGet(testObj, 'some.deeply.nested.prop');
            expected = 'found it';

            assert.deepEqual(actual, expected);
        });

        it('should return a nested object', function () {
            actual = deepGet(testObj, 'some.deeply');
            expected = {
                nested: {
                    prop: 'found it'
                }
            };

            assert.deepEqual(actual, expected);
        });
    });

    describe('returning undefined', function () {
        it('should work when accessing an undefined property', function () {
            actual = deepGet(testObj, 'some.deeply.nested.undefinedProp');
            expected = undefined;

            assert.deepEqual(actual, expected);
        });

        it('should work when accessing a property of an undefined object', function () {
            actual = deepGet(testObj, 'some.deeply.nested.undefinedObj.prop');
            expected = undefined;

            assert.deepEqual(actual, expected);
        });
    });

    describe('returning a default value', function () {
        it('should work when accessing an undefined property', function () {
            actual = deepGet(testObj, 'some.deeply.nested.undefinedProp', 'fallback value');
            expected = 'fallback value';

            assert.deepEqual(actual, expected);
        });

        it('should work when accessing a property of an undefined object', function () {
            actual = deepGet(testObj, 'some.deeply.nested.undefinedObj.prop', 'fallback value');
            expected = 'fallback value';

            assert.deepEqual(actual, expected);
        });
    });
});
