---
title: Clean up
layout: ../../layouts/MainLayout.astro
---

<script type="module" hoist>
  import '/src/components/ReplPad';
</script>

Data often needs to be refined at some point. This can also have the role of 'sanity checking', making sure data is within a range or 'shape' that later processes expect.

See also
* [scale](../../temporal/normalising/#scale) - scale numbers from one range to another


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

[`clamp`](https://clinth.github.io/ixfx/modules.html#clamp) guarantees the return value is within the provided range.

For example, maybe you're computing a relative value based on some sensor input, assuming that 500 is the maximum. We want a percentage scale from 0..1:

```js
const v = sensorValue / 500;
```

But if `sensorValue` rises above 500 unexpectedly, `v` will be greater than 1 (ie. more than 100%). Other parts of our code might purposefully be able to handle this, but there are times where exceeding 100% cannot be permitted. Likewise, we might not want `v` to be less than 0% because of assumptions made in other parts of our code.

To do this manually, we might write:

```js
let v = sensorValue / 500;
if (v > 1) v = 1;
if (v < 0) v = 0;
// Now v is guaranteed to be between 0..1, inclusive
```

That is all that `clamp` does. By default it uses a minimum of 0, a maximum of 1:

```js
// repl-pad
import {clamp} from 'https://unpkg.com/ixfx/dist/bundle.js';
clamp(0.5);   // 0.5
clamp(2);     // 1.0
clamp(-0.2);  // 0.0
```

Revisiting the earlier example, we can scale a sensor value which we expect to be on the range of 0..500 and clamp it to be sure we're always within 0..1:

```js
// repl-pad
import {clamp, scale} from 'https://unpkg.com/ixfx/dist/bundle.js';
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

### Wrap

[`wrapInteger`](https://clinth.github.io/ixfx/modules.html#wrapInteger) wraps an integer (ie. whole) number around a range, by default 0-360 (ie. degrees). These kinds of ranges logically wrap around continuously. Stepping past 359 degrees takes us to back to 0. And stepping -10 from 0 shouldn't yield -10, but 350.

`wrap` does this arithmetic for you.

```js
// repl-pad#1
import {wrapInteger} from 'https://unpkg.com/ixfx/dist/bundle.js';
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


[`wrap`](https://clinth.github.io/ixfx/modules.html#wrap) is the same, but doesn't enforce any integer limitations.

```js
// repl-pad
import {wrap} from 'https://unpkg.com/ixfx/dist/bundle.js';
wrap(10.5,0,10); // 0.5;
wrap(-0.5,0,10); // 9.5
```


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