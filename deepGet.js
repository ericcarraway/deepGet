module.exports = deepGet;

function deepGet(obj, path, defaultValue) {
    var pathArr = path.split('.');

    // prepare our found property and path array for recursion
    var nextObj = obj[pathArr.shift()];
    if (nextObj) {
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
