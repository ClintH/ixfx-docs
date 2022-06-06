---
title: Generators
layout: ../../layouts/MainLayout.astro
---

<script type="module" hoist>
  import '/src/components/ReplPad';
</script>

[API Docs: Generators module](https://clinth.github.io/ixfx/modules/Generators.html)

Generators are a [language feature of Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators) that essentially allows a function to output multiple values, potentially asynchronously.

ixfx includes:
* [count](#count): yields a series of integers counting up (or down) from zero
* [numericRange](#numeric-range): yields a series of numbers with a defined interval, start and end. Can reset back to start and loop
* [ping pong](#ping-pong): same as numeric range, but it counts back down to start before looping
* [oscillators](../modulation/oscillator): ixfx's oscillators are implemented as generators

Uses:

* [interval](../../flow/loops/#interval): an _asynchronous_ generator, `interval` calls and returns a result at a specified interval.


Importing tips:

```js
// Import as a module, meaning you have to prefix functions with Generators.
import * as Generators from 'ixfx/lib/generators.js';
// Or, import as a module from the web directly
import * as Generators from "https://unpkg.com/ixfx/dist/generators.js"
// Or, import a single function, eg interval
import { interval } from 'ixfx/lib/generators.js';
```

## Background

Generators are a form of _iterator_, an object that allows you to traverse - that is, to step through - some other data. Objects are _iterable_ if they provide an iterator on request, that is, the give the possibility for stepping through their contents in some manner. The familiar [collections](../../data/collections/) - arrays, maps and so on - are all iterables.

`for .. of` is the usual way of working with an iterator. In this case, we're iterating over an array (which is _iterable_):

```js
for (const v of someArray) {

}
```

Iterators allow us to traverse over data in different order, or perhaps returning different views over the data. For example, `Object.keys()` and `Object.values()` both return an iterators over whatever object you provide as a parameter. One yields a series of _keys_, the other _values_.

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

ixfx's [interval](../../flow/loops/#interval) makes iterating with delay easy.

Iterables can be converted into an array:

```js
const asArray = Array.from(iterable);

// Or alternatively:
const asArray =[...iterable];
```

What's interesting about iterables is that they aren't an actual collection or set of things, but rather return values on-demand. This means it's possible to have an iterable that never ends.

## Count

[`count`](https://clinth.github.io/ixfx/modules/Generators.html#count) yields a series of integers, counting by one: `0 1 2 3 ... `

As the examples show, `count` can be a useful way of running a chunk of code _x_ number of times. It might be more readable and robust than a typical `do`/`while` or `for` loop because there's only one thing you need to express: the amount of times to loop.


```js
// repl-pad
import {count} from "https://unpkg.com/ixfx/dist/generators.js"

// count(amount:number, offset:number = 0);
// Yields the array: [0,1,2,3,4]
const a = [...count(5)];

for (let i of count(5)) {
  // Loop runs five times, with i being 0, 1, 2, 3 and then 4
  console.log(i);
}
```

A negative `amount` counts backwards from zero:

```js
import {count} from "https://unpkg.com/ixfx/dist/generators.js"
import {forEach} from "https://unpkg.com/ixfx/dist/flow.js"

// Prints Hi! 0, Hi! -1 ... Hi! -4
[...count(-5)].forEach(i => {
  console.log(`Hi! ${i}`);
});
```

If an offset is supplied, it is added to the result:

```js
// Yields [1,2,3,4,5]
const a = [...count(5,1)];
```

For more complicated counting, consider [`numericRange`](#numeric-range), which allows you to set the counting interval, and whether counting resets.

<a name="numericRange"></a>

## Numeric range

[numericRange](https://clinth.github.io/ixfx/modules/Generators.html#numericRange) yields a series of numbers from `start` to `end`, with a specified `interval`. Unlike [`count`](#count), it can increment by and return fractional values.

```js
import {numericRange} from "https://unpkg.com/ixfx/dist/generators.js"

// numericRange(interval, start, end, repeating)

// Counts from 0-100, by 0.1
for (const v of numericRange(0.1, 0, 100)) { }

// Counts in twos from 0-100, and repeats from 0 again after 100
for (const v of numericRange(2, 0, 100, true)) { 
  // Caution: this generator never ends by itself, so you need
  // a `break` statement somewhere in the for loop
}

// Generators can be used manually as well...
const range = numericRange(1, 0, 100);
range.next().value;
```

If you just want to simply count from 0 to some number, consider using `count` instead.

To constrain the range to the percentage scale (0-1), use `numericPercent`:

```js
import {numericPercent} from "https://unpkg.com/ixfx/dist/generators.js"

// numericPercent(interval, repeating, start, end)

// Counts from 0 to 1 by 10%
for (const v of numericPercent(0.1)) { 
  // 0, 0.1, 0.2 ...
}

// Counts from 0 to 1 by 10%, looping from 0
for (const v of numericPercent(0.1, true)) { 
  // 0, 0.1, 0.2 ... 1.0, 0.0, 0.1, 0.2 ...  
  // Warning: infinite generator, make sure you `break` at some point
}

// Constant rotation
const r = numericPercent(0.1); // Setup once
// Per animation loop, calculate new rotation
const angle = Math.PI*2*r.next().value; 
```


## Ping pong

[`pingPong`](https://clinth.github.io/ixfx/modules/Generators.html#pingPong) is like a repeating `numericRange` but it counts up and back down again when looping, rather than resetting to the start.

```js
import {pingPong} from "https://unpkg.com/ixfx/dist/generators.js"

// pingPong(interval, start, end, offset)

// Counts up and down to 100 in 10s
for (const v of pingPong(10, 0, 100)) {
  // 0, 10, 20 ... 100, 90, 80 ...0, 10, 20 ...
  // Warning: infinite generator, make sure you `break` at some point
}
```

[`pingPongPercent`](https://clinth.github.io/ixfx/modules/Generators.html#pingPongPercent) is a variation of `pingPong`, but it locks everything to a scale of 0-1.

```js
import {pingPongPercent} from "https://unpkg.com/ixfx/dist/generators.js"

for (const v of pingPongPercent(0.01)) {
  // Up and down from 0->1 by 1%
  // Warning: infinite generator, make sure you `break` at some point
}

// Loops between 20-80% by 10%
const pp = pingPongPercent(0.1, 0.2, 0.8);
const v = pp.next().value;
```