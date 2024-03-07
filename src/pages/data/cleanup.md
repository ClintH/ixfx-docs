---
title: Clean up
layout: ../../layouts/MainLayout.astro
---

<script type="module" hoist>
  import '/src/components/ReplPad';
</script>

Data often needs to be refined at some point. This can also have the role of 'sanity checking', making sure data is within a range or 'shape' that later processes expect.

This goes hand-in-hand with [normalising](../../data/normalising/), which aims to convert data to a consistent scale.

## Numeric data

Useful in-built JS functions:

```js
// repl-pad
// Math.abs makes numbers positive
Math.abs(-100);   // 100

// Get the sign
Math.sign(-100);  // -1;
Math.sign(100);   // 1

// Round up or down
Math.ceil(2.5);   // 3
Math.floor(2.5);  // 2

// Round to closest integer
Math.round(2.5);  // 3

// Convert a string to an integer
parseInt(`10.2`);   // 10

// Convert a string to a float
parseFloat(`10.2`); // 10.2

// Largest of parameters
Math.max(10, 100); // 100

// Smallest of parameters
Math.min(10, 100); // 10
```

### Clamping

[`clamp`](https://clinth.github.io/ixfx/functions/Data.clamp.html) guarantees the return value is within the provided range.

For example, maybe you're computing a relative value based on some sensor input, assuming that 500 is the maximum. We want a percentage scale from 0..1:

```js
const v = sensorValue / 500;
```

But if `sensorValue` rises above 500 unexpectedly, `v` will be greater than 1 (ie. more than 100%). Other parts of our code might purposefully be able to handle this, but there are times where exceeding 100% cannot be permitted. Likewise, we might not want `v` to be less than 0% because of assumptions made in other parts of our code.

To do this manually, we might write:

```js
let v = sensorValue / 500;
if (v > 1) v = 1;
else if (v < 0) v = 0;
// Now v is guaranteed to be between 0..1, inclusive
```

That is all that `clamp` does. By default it uses a minimum of 0, a maximum of 1:

```js
// repl-pad
import { clamp } from 'https://unpkg.com/ixfx/dist/data.js';
clamp(0.5);   // 0.5
clamp(2);     // 1.0
clamp(-0.2);  // 0.0
```

Revisiting the earlier example, we can scale a sensor value which we expect to be on the range of 0..500 and clamp it to be sure we're always within 0..1:

```js
// repl-pad
import { clamp, scale } from 'https://unpkg.com/ixfx/dist/data.js';
clamp(scale(250, 0, 500)); // 0.5
clamp(scale(500, 0, 500)); // 1.0
clamp(scale(505, 0, 500)); // 1.0 - although out of expected range
clamp(scale(-1, 0, 500));  // 0.0 - although out of expected range
```

A custom output range can be used as well:

```js
// clamp(value:number, min:number, max:number):number
clamp(30, 50, 100); // 50
```

If you are working with bipolar values (-1..1), you can use the [Data.Bipolar](https://clinth.github.io/ixfx/modules/Data.Bipolar.html) module.

```js
// repl-pad
import { Bipolar } from 'https://unpkg.com/ixfx/dist/data.js';
Bipolar.clamp(1.1);  // 1
Bipolar.clamp(0.9);  // 0.9
Bipolar.clamp(-1.1); // -1
```

### Wrap

[`wrapInteger`](https://clinth.github.io/ixfx/functions/Data.wrapInteger.html) wraps an integer (ie. whole) number around a range, by default 0-360 (ie. degrees). These kinds of ranges logically wrap around continuously. Stepping past 359 degrees takes us to back to 0. And stepping -10 from 0 shouldn't yield -10, but 350.

`wrap` does this arithmetic for you.

```js
// repl-pad#1
import { wrapInteger } from 'https://unpkg.com/ixfx/dist/data.js';
wrapInteger(200); // 200 - fine, within range
wrapInteger(400); // 40 - wraps past 360 to 40
```

Numbers below the range are likewise wrapped:

```js
// repl-pad#1
wrapInteger(-90); // 270
```

A custom range can be provided for wrapping: `wrapInteger(value:number, min:number, max:number):number`. The minimum is inclusive, the maximum is exclusive.

```js
// repl-pad#1
wrapInteger(5, 20, 30); // 25

// Max value is exlusive, so it wraps to min:
wrapInteger(30, 20, 30); // 20
```


[`wrap`](https://clinth.github.io/ixfx/functions/Data.wrap.html) is the same, but doesn't enforce any integer limitations.

```js
// repl-pad
import { wrap } from 'https://unpkg.com/ixfx/dist/data.js';
wrap(10.5,0,10); // 0.5;
wrap(-0.5,0,10); // 9.5
```

## Sampling

ixfx's [`Arrays.sample`](https://clinth.github.io/ixfx/functions/Collections.Arrays.sample.html) makes sub-sampling of a data set. This is useful when you have a lot of data and it would be too costly in terms of execution speed to process each item. For example, perhaps a sensor is producing too much data to process in each frame of animation.

Throwing away data can of course impact precision, but depending on the source of data and how you're working with it, this may not be a problem.

It's possible to get a percentage of the input data if a parameter of 0..1 is passed in. In this case, 0.5:

```js
// repl-pad#2
import { sample } from 'https://unpkg.com/ixfx/dist/arrays.js';

const list = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];

// Get 50% of input data
const sub1 = sample(list, 0.5);
// Yields: [2, 4, 6, 8, 10]
```

Or if a whole number is provided, it will return data of every _x_ steps:

```js
// repl-pad#2
// Get every third
const sub2 = sample(list, 3);
// Yields: [3, 6, 9]
```

See also: [Generators.Sync module](https://clinth.github.io/ixfx/modules/Generators.Sync.html) contains various functions for processing a stream of data from a generator.

## Objects

### Does it contain a field?
Check if an object has a field using [`in`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/in). In the example below, we print one message if the object has the field `humidity`, another one if it doesn't.

```js
// repl-pad
const a = { temp: 10, humidity: 0.8 };
const b = { temp: 20 };

const test = (v) => {
  if (`humidity` in v) {
    console.log(`Temp: ${v.temp} humidity: ${v.humidity}`);
  } else {
    console.log(`Temp: ${v.temp}`);
  }
}

test(a);
test(b);
```

## Type checking

Check the type of a variable with [`typeof`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof):

```js
// repl-pad
typeof "hello";   // "string"
typeof 0;         // "number"
typeof {temp:20}; // "object"
```

In action, compare the result of `typeof` with the name of a type:
```js
if (typeof v === `string`) {
  // variable is a string
}
```

## More functions

* [`Numbers.average`](https://clinth.github.io/ixfx/functions/Numbers.average.html) - return the average of a set of numbers
* [`Numbers.filter`](https://clinth.github.io/ixfx/functions/Numbers.filter.html) - for an input set of values, only yields those which are numbers
* [`Numbers.isApproximately`](https://clinth.github.io/ixfx/functions/Numbers.isApproximately.html) - is this number roughly close to this other number?
* [`Numbers.isValid`](https://clinth.github.io/ixfx/functions/Numbers.isValid.html) - is this number a proper number?
* [`Numbers.max`](https://clinth.github.io/ixfx/functions/Numbers.max.html)/[`Numbers.min`](https://clinth.github.io/ixfx/functions/Numbers.min.html) - returns max/min from a set, ignoring things that aren't numbers
* [`Numbers.quantiseEvery`](https://clinth.github.io/ixfx/functions/Numbers.quantiseEvery.html) - rounds a value by step size
* [`Numbers.round`](https://clinth.github.io/ixfx/functions/Numbers.round.html) - round a number to specified decimal places
* [`Numbers.total`](https://clinth.github.io/ixfx/functions/Numbers.total.html) - add up a set of values, ignoring those which aren't numbers

See also:
* Module: [Data.Bipolar](https://clinth.github.io/ixfx/modules/Data.Bipolar.html)