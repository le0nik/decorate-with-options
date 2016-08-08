# decorate-with-options

[![npm](https://img.shields.io/npm/v/decorate-with-options.svg?style=flat-square)](https://www.npmjs.com/package/eslint-config-sensible)
[![License](https://img.shields.io/npm/l/decorate-with-options.svg?style=flat-square)](https://github.com/le0nik/eslint-config-sensible/blob/master/LICENSE)
[![codecov](https://img.shields.io/codecov/c/github/le0nik/decorate-with-options.svg?style=flat-square)](https://codecov.io/gh/le0nik/decorate-with-options)

## Installation

```sh
npm install decorate-with-options --save
```

## Why?

If your decorator function expects options, you can call it in many different ways(see examples of usage below).

I'm tired of having to remember how exactly I have to call each decorator in my code.

With this module you don't have this problem anymore. Just wrap your decorator once and call it whichever way you want!

Works for decorators and Higher Order Components(HoC).

## Usage

**1. Define your decorator. It should accept class(or function) as it's first argument and other options(non functions, see [here](#note) why) as next arguments.**

```js
function myDecorator(Component, option1, option2) {
  // ...
}
```

**2. Wrap it in `decorate-with-options`.**

```js
import decorateWithOptions from 'decorate-with-options';

export default decorateWithOptions(myDecorator);

function myDecorator(Component, option1, option2) {
  // ...
}
```
**3. Use it in your code in any of the following ways.**

```js
import myDecorator from './myDecorator';

/* As decorator */

// Simply apply it
@myDecorator
class Component {}

// Call it without options
@myDecorator()
class Component {}

// Call it with options
@myDecorator(option1, option2)
class Component {}


/* As HoC. Works with both classes and functions */

// Call it with Component
myDecorator(Component)

// Call it with Component and options
myDecorator(Component, option1, option2)

// Or the other way around
myDecorator(option1, option2, Component)

// Currying is supported
myDecorator(option1, option2)(Component)
```

## Note

**How does this module determine that the class or a function is passed in?**

With a simple `(typeof arg === 'function')` check.

So don't pass functions in place of options. Use an object with properties instead. That's the only constraint.

E.g. don't do this:

```js
// Don't do this
const someFunction = () => {};

@myDecorator(someFunction);
myDecorator(Component, someFunction);
myDecorator(someFunction, Component);
myDecorator(someFunction)(Component);

```

## License

[MIT License](https://github.com/le0nik/eslint-config-sensible/blob/master/LICENSE)

