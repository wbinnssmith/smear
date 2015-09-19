# smear

[![Build Status](https://travis-ci.org/wbinnssmith/smear.svg)](https://travis-ci.org/wbinnssmith/smear)
[![js-semistandard-style](https://cdn.rawgit.com/flet/semistandard/master/badge.svg)](https://github.com/Flet/semistandard)

smears (or spreads) a single array parameter across a function's arguments.

__Note:__ if you're using an es6 runtime or compiler (such as babel), check out [destructuring of parameters](http://www.2ality.com/2015/01/es6-destructuring.html). It's a faster and prettier approach to the problem smear solves.

Smear turns a function that would normally take comma-separated parameters and turns it into one that takes a single parameter -- an array. Technically it *unspreads* the function.

This is particularly useful with promises, which must resolve to a single value (much like a synchronous return value). Some Promise implementations will add a `.spread()` function to the Promise prototype, but this is a non-standard interface and is incompatible with native promises.

## Example
Turns this:
```js
Promise.resolve([1, 2, 3]).then(function (args) {
  var one = args[0];
  var two = args[1];
  var three = args[2];
})
```

into this:

```js
Promise.resolve([1, 2, 3]).then(spread(function (one, two, three) {
  console.log('much better!');
}));
```

### API

function smear(fn)

`fn` - a function accepting a comma-separated list of parameters.

Smear returns a new function that accepts a single parameter of an array, and spreads it out to `fn`.
