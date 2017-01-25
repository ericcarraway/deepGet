var assert = require('/usr/local/lib/node_modules/chai').assert;
var deepGet = require('./deepGet.js');

describe('deepGet', function () {
    var testObj;
    var actual;
    var expected;

    beforeEach(function () {
        testObj = {
            some: {
                deeply: {
                    nested: {
                        prop: 'found it'
                    }
                }
            }
        };

        actual = null;
        expected = null;
    });

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

    describe('edge cases', function () {
        it('should return undefined if obj is undefined', function () {
            actual = deepGet(undefined, 'example.path');
            expected = undefined;

            assert.deepEqual(actual, expected);
        });

        it('should return undefined if obj is null', function () {
            actual = deepGet(null, 'example.path');
            expected = undefined;

            assert.deepEqual(actual, expected);
        });

        it('should return undefined if obj is an empty object', function () {
            actual = deepGet({}, 'example.path');
            expected = undefined;

            assert.deepEqual(actual, expected);
        });

        it('should return undefined if obj is a string', function () {
            actual = deepGet('this is a string', 'example.path');
            expected = undefined;

            assert.deepEqual(actual, expected);
        });

        it('should return undefined if obj is an empty string', function () {
            actual = deepGet('', 'example.path');
            expected = undefined;

            assert.deepEqual(actual, expected);
        });

        it('should return undefined if obj is `true`', function () {
            actual = deepGet(true, 'example.path');
            expected = undefined;

            assert.deepEqual(actual, expected);
        });

        it('should return undefined if obj is `false`', function () {
            actual = deepGet(false, 'example.path');
            expected = undefined;

            assert.deepEqual(actual, expected);
        });
    });

    describe('array handling', function () {
        it('should return an array', function () {
            testObj.some.deeply.nested.prop = ['an', 'array'];

            actual = deepGet(testObj, 'some.deeply.nested.prop');
            expected = ['an', 'array'];

            assert.deepEqual(actual, expected);
        });

        it("should return an array's length property", function () {
            testObj.some.deeply.nested.prop = ['an', 'array'];

            actual = deepGet(testObj, 'some.deeply.nested.prop.length');
            expected = 2;

            assert.deepEqual(actual, expected);
        });
    });
});
