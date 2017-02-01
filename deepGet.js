module.exports = deepGet;

/**
 * Gets the value at path of obj. If the resolved value is undefined,
 * an optional defaultValue is returned in its place. Useful for avoiding
 * "TypeError: Cannot read property 'someprop' of undefined"
 *
 * @param {Object} obj The object to query
 * @param {String} path The path of the property to get
 * @param {*} [defaultValue] The value returned for undefined resolved values
 *
 * @returns {*} returns the resolved value
 */
function deepGet(obj, path, defaultValue) {
    var pathArr;
    var nextObj;

    if (obj === undefined || obj === null || typeof path !== 'string' || !(pathArr = path.split('.'))) {
        return defaultValue;
    }

    pathArr = path.split('.');

    // prepare our found property and path array for recursion
    nextObj = obj[pathArr.shift()];
    if (nextObj !== undefined) {
        if (pathArr.length > 0) {
            return deepGet(nextObj, pathArr.join('.'), defaultValue);
        }

        // if the path array has no more elements, we've reached
        // the intended property - return its value
        return nextObj;
    }

    // if we've reached an undefined/null property,
    // stop executing and return the default value
    // returns undefined if defaultValue isn't provided
    return defaultValue;
}
