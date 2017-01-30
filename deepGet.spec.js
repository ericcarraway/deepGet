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

    // attempt to match https://lodash.com/docs/4.17.4#get
    // for now, these are quick and redundant
    describe('when the second parameter is not a string', function () {
        describe('and no defaultValue is included', function () {
            it('returns undefined on no argument', function () {
                actual = deepGet(testObj);
                expected = undefined;

                assert.deepEqual(actual, expected);
            });

            it('returns undefined on the explicit undefined', function () {
                actual = deepGet(testObj, undefined);
                expected = undefined;

                assert.deepEqual(actual, expected);
            });

            it('returns undefined on the empty string', function () {
                actual = deepGet(testObj, '');
                expected = undefined;

                assert.deepEqual(actual, expected);
            });

            it('returns undefined on boolean false', function () {
                actual = deepGet(testObj, false);
                expected = undefined;

                assert.deepEqual(actual, expected);
            });

            it('returns undefined on boolean true', function () {
                actual = deepGet(testObj, true);
                expected = undefined;

                assert.deepEqual(actual, expected);
            });

            it('returns undefined on zero', function () {
                actual = deepGet(testObj, 0);
                expected = undefined;

                assert.deepEqual(actual, expected);
            });

            it('returns undefined on a negative number', function () {
                actual = deepGet(testObj, -1);
                expected = undefined;

                assert.deepEqual(actual, expected);
            });

            it('returns undefined on a positive number', function () {
                actual = deepGet(testObj, 23);
                expected = undefined;

                assert.deepEqual(actual, expected);
            });

            it('returns undefined on an array', function () {
                actual = deepGet(testObj, [23, 42]);
                expected = undefined;

                assert.deepEqual(actual, expected);
            });

            it('returns undefined on an empty object', function () {
                actual = deepGet(testObj, {});
                expected = undefined;

                assert.deepEqual(actual, expected);
            });

            it('returns undefined on an empty array', function () {
                actual = deepGet(testObj, []);
                expected = undefined;

                assert.deepEqual(actual, expected);
            });
        });

        describe('and a default value is included', function () {
            it('returns the default value on undefined', function () {
                actual = deepGet(testObj, undefined, 'fallback value');
                expected = 'fallback value';

                assert.deepEqual(actual, expected);
            });

            it('returns the default value on the empty string', function () {
                actual = deepGet(testObj, '', 'fallback value');
                expected = 'fallback value';

                assert.deepEqual(actual, expected);
            });

            it('returns the default value on boolean false', function () {
                actual = deepGet(testObj, false, 'fallback value');
                expected = 'fallback value';

                assert.deepEqual(actual, expected);
            });

            it('returns the default value on boolean true', function () {
                actual = deepGet(testObj, true, 'fallback value');
                expected = 'fallback value';

                assert.deepEqual(actual, expected);
            });

            it('returns the default value on zero', function () {
                actual = deepGet(testObj, 0, 'fallback value');
                expected = 'fallback value';

                assert.deepEqual(actual, expected);
            });

            it('returns the default value on a negative number', function () {
                actual = deepGet(testObj, -1, 'fallback value');
                expected = 'fallback value';

                assert.deepEqual(actual, expected);
            });

            it('returns the default value on a positive number', function () {
                actual = deepGet(testObj, 23, 'fallback value');
                expected = 'fallback value';

                assert.deepEqual(actual, expected);
            });

            it('returns the default value on an array', function () {
                actual = deepGet(testObj, [23, 42], 'fallback value');
                expected = 'fallback value';

                assert.deepEqual(actual, expected);
            });

            it('returns the default value on an empty object', function () {
                actual = deepGet(testObj, {}, 'fallback value');
                expected = 'fallback value';

                assert.deepEqual(actual, expected);
            });

            it('returns the default value on an empty array', function () {
                actual = deepGet(testObj, [], 'fallback value');
                expected = 'fallback value';

                assert.deepEqual(actual, expected);
            });
        });
    });
});
