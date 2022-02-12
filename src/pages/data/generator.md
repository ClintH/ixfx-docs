---
title: Generators
layout: ../../layouts/MainLayout.astro
---

[API Docs: Generators module](https://clinth.github.io/ixfx/modules/Generators.html)

Generators are a [language feature of Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators) that essentially allows a function to output multiple values, potentially asynchronously.

Included generators:
* [numericRange](#numericRange): yields a series of numbers with a defined interval, start and end. Can reset back to start and loop
* [ping pong](#pingPong): same as numeric range, but it counts back down to start before looping

See also:
* [oscillators](../modulation/oscillator): ixfx's oscillators are implemented as generators
* [interval](../flow/time#interval): calls and yields the result of a function at a specified interval

## Iterators

Generators are a form of _iterator_, is an object that allows you to traverse some other data. _Iterables_ are kinds of objects that provide an iterator on request. This includes the usual [collections](./collections/) - arrays, maps and so on.

For example, iterating over an array (remembering arrays are a kind of _iterable_)

```js
for (const v of someArray) {

}
```

Iterators allow us to traverse over data in different order, or perhaps returning different views over the data. For example, `Object.keys()` and `Object.values()` both return an iterators over whatever object you provide as a parameter. One yields a series of keys, one values.

```js
const something = {
  colour: `red`,
  size: 10
}

// Iterate keys (ie fields) of an object
for (const key of Object.keys(something)) {
  // `colour`, `size` ...  
}

// Different iterator yields a series of values,
// even though input is the same
for (const value of Object.values(something)) {
  // `red`, 10 ...
}
```

Iterators can be used in `for .. of` loops as above, but it's not always the case that you want to access every item at the same time. For example, maybe you want to fetch a new item from an iterable every minute.

In this case, you can work with the iterator manually. Iterators have a `next()` function which both moves the iterator to the next position, and returns `{done, value}`, where `done` is _true/false_ and `value` is the current value of iterator.

Here we move the iterator and use the value:

```js
const {value, done} = iter.next();
if (done)  { /* handle when iterator is complete? */ }
else {
  // Use value...
}
```

That kind of code could be called in a timer, fetching and using the value every _x_ seconds, for example. Below gives an example of setting `state.value` with a new item from the iterator every 60 seconds. When/if the iterator finishes, it stops the interval and sets the value to _undefined_.

```js
const iterInterval = setInterval(() => {
  // This code runs every 60secs...
  const {value, done} = iter.next();
  if (!done) {
    // Update `state.value` to the next thing from the iterator
    state = { ...state, value }
  } else {
    // Set `state.value` to undefined and stop interval
    state = { ...state, value: undefined }
    clearInterval(iterInterval);
  }
}, 60*1000); // 60 seconds 
```

ixfx's [interval](../flow/time#interval) helps with this.

Iterables can be converted into an array:

```js
const asArray = Array.from(iterable);

// Or alternatively:
const asArray =[...iterable];
```

What's interesting about iterables is that they aren't an actual collection or set of things, but rather return values on-demand. This means it's possible to have an iterable that never ends.

## Generators

[API documentation](https://clinth.github.io/ixfx/modules/Generators.html) 

ixfx includes some utility generators.

```js
// Import as a module, meaning you have to prefix functions with Generators.
import { Generators } from 'ixfx/lib/bundle.js';
// Or, import as a module from the web directly
import { Timers } from "https://unpkg.com/ixfx/bundle.js"
// Or, import a single function, eg interval
import { interval } from 'ixfx/lib/generators.js';
```

<a name="interval"></a>

### Interval

[interval](https://clinth.github.io/ixfx/modules/Generators.html#interval) calls and yields the result of an asynchronous callback function every `intervalMs`. It is an asynchronous generator, note the _for await_ rather than _for_.

```js
// interval(callback, intervalMs)
const randomGenerator = Generators.interval(() => Math.random, 1000);
for await (const r of randomGenerator) {
  console.log(r); // Prints a new random number every second
}
console.log(`Done.`); // This will not run unless there is a `return` in the for await loop
```

<a name="numericRange"></a>

### Numeric range
[numericRange](https://clinth.github.io/ixfx/modules/Generators.html#numericRange) yields a series of numbers from `start` to `end`, with a specified `interval`.

```js
// numericRange(interval, start, end, repeating)

// Counts from 0-100
for (const v of Generators.numericRange(1, 0, 100)) { }

// Counts in twos from 0-100, and repeats from 0 again after 100
for (const v of Generators.numericRange(2, 0, 100, true)) { 
  // Caution: this generator never ends by itself, so you need
  // a `return` statement somewhere in the for loop
}

// Don't forget generators can be used manually as well...
const range = Generators.numericRange(1, 0, 100);
range.next().value;
```

If you want a range constrained to a percentage scale (0-1), use `rangePercent`:

```js
// rangePercent(interval, repeating, start, end)

// Counts from 0 to 1 by 10%
for (const v of rangePercent(0.1)) { }

// Counts from 0 to 1 by 10%, looping from 0
//   (use pingPongPercent to loop up and down)
for (const v of rangePercent(0.1, true)) { }
```

<a name="pingPong"></a>

### Up and down with ping pong

[pingPong](https://clinth.github.io/ixfx/modules/Generators.html#pingPong) is like a `numericRange` with repeat turned on, but instead of resetting to `start`, it counts down, and then continues.

```js
// pingPong(interval, start, end, offset)

// Counts up and down to 100 in 10s
for (const v of Generators.pingPong(10, 0, 100)) {
  // 0, 10, 20 ... 100, 90, 80 ...0, 10, 20 ...
}
```

[pingPongPercent](https://clinth.github.io/ixfx/modules/Generators.html#pingPongPercent) is a variation of `pingPong`, but it locks everything to a scale of 0-1. This is useful when you expect the value to be a percentage.

```js
for (const v of pingPongPercent(0.01)) {
  // go up and down from 0->1 by 1%
  // warning: this will run forever, so you need a `return` statement
  // somewhere to stop.
}

// Loops between 20-80% by 10%
const pp = pingPongPercent(0.1, 0.2, 0.8);
const v = pp.next().value;
```