# deepGet

## Purpose
Avoid the dreaded `TypeError: Cannot read property 'someprop' of undefined`

## Usage
```javascript
deepGet(obj, path, defaultValue)
```

## Testing

##### Prerequisites

```
$ npm install -g mocha

$ npm install -g chai
```

##### Running Tests
```
$ mocha deepGet.spec.js
```

## Acknowledgements

* John Lozano [@SyntaxStacks](https://github.com/SyntaxStacks)

## Resources

* [lodash `get`](https://lodash.com/docs/4.17.4#get)
* [The lodash method `_.get` exported as a module](https://www.npmjs.com/package/lodash.get)
* [_"Making Deep Property Access Safe in JavaScript_](http://adripofjavascript.com/blog/drips/making-deep-property-access-safe-in-javascript.html)
