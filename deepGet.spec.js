const assert = require('chai').assert;
const deepGet = require('./deepGet.js');

describe('deepGet', () => {
    let testObj;
    let actual;
    let expected;

    beforeEach(() => {
        testObj = {
            some: {
                deeply: {
                    nested: {
                        prop: 'found it',
                    },
                },
            },
        };

        actual = null;
        expected = null;
    });

    describe('existent properties', () => {
        it('should return a deeply nested property', () => {
            actual = deepGet(testObj, 'some.deeply.nested.prop');
            expected = 'found it';

            assert.deepEqual(actual, expected);
        });

        it('should return a nested object', () => {
            actual = deepGet(testObj, 'some.deeply');
            expected = {
                nested: {
                    prop: 'found it',
                },
            };

            assert.deepEqual(actual, expected);
        });
    });

    describe('returning undefined', () => {
        it('should work when accessing an undefined property', () => {
            actual = deepGet(testObj, 'some.deeply.nested.undefinedProp');
            expected = undefined;

            assert.deepEqual(actual, expected);
        });

        it('should work when accessing a property of an undefined object', () => {
            actual = deepGet(testObj, 'some.deeply.nested.undefinedObj.prop');
            expected = undefined;

            assert.deepEqual(actual, expected);
        });
    });

    describe('returning a default value', () => {
        it('should work when accessing an undefined property', () => {
            actual = deepGet(testObj, 'some.deeply.nested.undefinedProp', 'fallback value');
            expected = 'fallback value';

            assert.deepEqual(actual, expected);
        });

        it('should work when accessing a property of an undefined object', () => {
            actual = deepGet(testObj, 'some.deeply.nested.undefinedObj.prop', 'fallback value');
            expected = 'fallback value';

            assert.deepEqual(actual, expected);
        });
    });

    describe('edge cases', () => {
        it('should return undefined if obj is undefined', () => {
            actual = deepGet(undefined, 'example.path');
            expected = undefined;

            assert.deepEqual(actual, expected);
        });

        it('should return undefined if obj is null', () => {
            actual = deepGet(null, 'example.path');
            expected = undefined;

            assert.deepEqual(actual, expected);
        });

        it('should return undefined if obj is an empty object', () => {
            actual = deepGet({}, 'example.path');
            expected = undefined;

            assert.deepEqual(actual, expected);
        });

        it('should return undefined if obj is a string', () => {
            actual = deepGet('this is a string', 'example.path');
            expected = undefined;

            assert.deepEqual(actual, expected);
        });

        it('should return undefined if obj is an empty string', () => {
            actual = deepGet('', 'example.path');
            expected = undefined;

            assert.deepEqual(actual, expected);
        });

        it('should return undefined if obj is `true`', () => {
            actual = deepGet(true, 'example.path');
            expected = undefined;

            assert.deepEqual(actual, expected);
        });

        it('should return undefined if obj is `false`', () => {
            actual = deepGet(false, 'example.path');
            expected = undefined;

            assert.deepEqual(actual, expected);
        });
    });

    describe('array handling', () => {
        it('should return an array', () => {
            testObj.some.deeply.nested.prop = ['an', 'array'];

            actual = deepGet(testObj, 'some.deeply.nested.prop');
            expected = ['an', 'array'];

            assert.deepEqual(actual, expected);
        });

        it("should return an array's length property", () => {
            testObj.some.deeply.nested.prop = ['an', 'array'];

            actual = deepGet(testObj, 'some.deeply.nested.prop.length');
            expected = 2;

            assert.deepEqual(actual, expected);
        });
    });

    describe('edge cases', () => {
        it('should return undefined if obj is undefined', () => {
            actual = deepGet(undefined, 'example.path');
            expected = undefined;

            assert.deepEqual(actual, expected);
        });

        it('should return undefined if obj is null', () => {
            actual = deepGet(null, 'example.path');
            expected = undefined;

            assert.deepEqual(actual, expected);
        });

        it('should return undefined if obj is an empty object', () => {
            actual = deepGet({}, 'example.path');
            expected = undefined;

            assert.deepEqual(actual, expected);
        });

        it('should return undefined if obj is a string', () => {
            actual = deepGet('this is a string', 'example.path');
            expected = undefined;

            assert.deepEqual(actual, expected);
        });

        it('should return undefined if obj is an empty string', () => {
            actual = deepGet('', 'example.path');
            expected = undefined;

            assert.deepEqual(actual, expected);
        });

        it('should return undefined if obj is `true`', () => {
            actual = deepGet(true, 'example.path');
            expected = undefined;

            assert.deepEqual(actual, expected);
        });

        it('should return undefined if obj is `false`', () => {
            actual = deepGet(false, 'example.path');
            expected = undefined;

            assert.deepEqual(actual, expected);
        });
    });

    describe('array handling', () => {
        it('should return an array', () => {
            testObj.some.deeply.nested.prop = ['an', 'array'];

            actual = deepGet(testObj, 'some.deeply.nested.prop');
            expected = ['an', 'array'];

            assert.deepEqual(actual, expected);
        });

        it("should return an array's length property", () => {
            testObj.some.deeply.nested.prop = ['an', 'array'];

            actual = deepGet(testObj, 'some.deeply.nested.prop.length');
            expected = 2;

            assert.deepEqual(actual, expected);
        });
    });

    // attempt to match https://lodash.com/docs/4.17.4#get
    // for now, these are quick and redundant
    describe('when the second parameter is not a string', () => {
        describe('and no defaultValue is included', () => {
            it('returns undefined on no argument', () => {
                actual = deepGet(testObj);
                expected = undefined;

                assert.deepEqual(actual, expected);
            });

            it('returns undefined on the explicit undefined', () => {
                actual = deepGet(testObj, undefined);
                expected = undefined;

                assert.deepEqual(actual, expected);
            });

            it('returns undefined on the empty string', () => {
                actual = deepGet(testObj, '');
                expected = undefined;

                assert.deepEqual(actual, expected);
            });

            it('returns undefined on boolean false', () => {
                actual = deepGet(testObj, false);
                expected = undefined;

                assert.deepEqual(actual, expected);
            });

            it('returns undefined on boolean true', () => {
                actual = deepGet(testObj, true);
                expected = undefined;

                assert.deepEqual(actual, expected);
            });

            it('returns undefined on zero', () => {
                actual = deepGet(testObj, 0);
                expected = undefined;

                assert.deepEqual(actual, expected);
            });

            it('returns undefined on a negative number', () => {
                actual = deepGet(testObj, -1);
                expected = undefined;

                assert.deepEqual(actual, expected);
            });

            it('returns undefined on a positive number', () => {
                actual = deepGet(testObj, 23);
                expected = undefined;

                assert.deepEqual(actual, expected);
            });

            it('returns undefined on an array', () => {
                actual = deepGet(testObj, [23, 42]);
                expected = undefined;

                assert.deepEqual(actual, expected);
            });

            it('returns undefined on an empty object', () => {
                actual = deepGet(testObj, {});
                expected = undefined;

                assert.deepEqual(actual, expected);
            });

            it('returns undefined on an empty array', () => {
                actual = deepGet(testObj, []);
                expected = undefined;

                assert.deepEqual(actual, expected);
            });
        });

        describe('and a default value is included', () => {
            it('returns the default value on undefined', () => {
                actual = deepGet(testObj, undefined, 'fallback value');
                expected = 'fallback value';

                assert.deepEqual(actual, expected);
            });

            it('returns the default value on the empty string', () => {
                actual = deepGet(testObj, '', 'fallback value');
                expected = 'fallback value';

                assert.deepEqual(actual, expected);
            });

            it('returns the default value on boolean false', () => {
                actual = deepGet(testObj, false, 'fallback value');
                expected = 'fallback value';

                assert.deepEqual(actual, expected);
            });

            it('returns the default value on boolean true', () => {
                actual = deepGet(testObj, true, 'fallback value');
                expected = 'fallback value';

                assert.deepEqual(actual, expected);
            });

            it('returns the default value on zero', () => {
                actual = deepGet(testObj, 0, 'fallback value');
                expected = 'fallback value';

                assert.deepEqual(actual, expected);
            });

            it('returns the default value on a negative number', () => {
                actual = deepGet(testObj, -1, 'fallback value');
                expected = 'fallback value';

                assert.deepEqual(actual, expected);
            });

            it('returns the default value on a positive number', () => {
                actual = deepGet(testObj, 23, 'fallback value');
                expected = 'fallback value';

                assert.deepEqual(actual, expected);
            });

            it('returns the default value on an array', () => {
                actual = deepGet(testObj, [23, 42], 'fallback value');
                expected = 'fallback value';

                assert.deepEqual(actual, expected);
            });

            it('returns the default value on an empty object', () => {
                actual = deepGet(testObj, {}, 'fallback value');
                expected = 'fallback value';

                assert.deepEqual(actual, expected);
            });

            it('returns the default value on an empty array', () => {
                actual = deepGet(testObj, [], 'fallback value');
                expected = 'fallback value';

                assert.deepEqual(actual, expected);
            });
        });
    });
});
