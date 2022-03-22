---
title: Collections
layout: ../../../layouts/MainLayout.astro
---

[API Docs: Collections module](https://clinth.github.io/ixfx/modules/Collections.html)

* [Stack](./stack) - Keep track of items like a stack of plates. Most recent gets added to the top, and you can only take the most recent from the top.
* [Queue](./queue) - Keep track of items like a bakery queue. Most recent is added to the back of the queue, and you can only take from the front of the queue (ie the oldest)

## Arrays

Javascript has some useful in-built functions for working with arrays:

```js
// Ordering and enumerating:
someArray.sort();     // Simple sort
someArray.reverse();  // Reverse order

someArray.forEach(v => {
  // do something with v...
});

// You can also get the index of an 
// array element you enumerate
someArray.forEach((v,index) => {
  // do something with v/index...
});

// Check if array contains something you
// care about. 
const isFound = someArray.some(v => {
  if (v.colour === `blue`) return true;
  return false;
});

// Returns a value that matches some
// predicate
const blueV = someArray.find( v => {
  if (v.colour === `blue`) return true;
})
```

ixfx has some additional functions for common tasks.

Random access:

```js
// repl-pad

// Return a random string: apples, oranges or pears
randomElement([`apples`, `oranges`, `pears`]);

// Return a random index: 0, 1 or 2
randomIndex([`apples`, `oranges`, `pears`]);

// Remove a random element
const r = randomPluck([`apples`, `oranges`, `pears`]);
r.value; // A random value
r.array; // A copy of the array with the random value removed

// Randomise order
const r2 = shuffle([1,2,3,4,5]);
```

Returns a copy of an array without values equal to `v`.

```js
// repl-pad
import { without } from "https://unpkg.com/ixfx/dist/arrays.js"
const data = [1,2,3,1,2,3];
// Yields: [1,3,1,3]
without(data, 2);
```

`groupBy` allows you to group an array by some generated key.


```js
// repl-pad
import { groupBy } from "https://unpkg.com/ixfx/dist/arrays.js"
const data = [
 { age: 39, city: `London` }
 { age: 14, city: `Copenhagen` }
 { age: 23, city: `Stockholm` }
 { age: 56, city: `London` }
];
const map = groupBy(data, item => data.city); 
```

This will yield:

```js
{
  London: [
    { age: 39, city: `London` }, 
    { age: 56, city: `London` }
  ],
  Stockhom: [
    { age: 23, city: `Stockholm` }
  ],
  Copenhagen: [
    { age: 14, city: `Copenhagen` }
  ]
}
```

## Numeric arrays

If you have an array of numbers, ixfx has some functions for common needs.

### Ranges

```js
// repl-pad
import { max,min,avg } from "https://unpkg.com/ixfx/dist/arrays.js"

const data = [1,2,3];
// Compute max, min, avg:
max(...data); // 3
min(...data); // 1
avg(...data); //

// Or compute them all at once:
minMaxAvg(...data);
// Yields: {min: 1, max: 3, avg:, total: 6}
```

### Averages

```js
import { Easings } from "https://unpkg.com/ixfx/dist/modulation.js"
import { average } from "https://unpkg.com/ixfx/dist/arrays.js"

const data = [1,2,3,4,5];

// Compute a simple average of all values
average(1, 1.4, 0.9, 0.1);
average(...data);

// Computes average of [1,2,3], weighting the array
// elements, such that the first index has its full weighting,
// the second element half, and the last a quarter
averageWeighted([1,2,3], [1,0.5,0.25]);

// An easing function can be used instead:
averageWeighted([1,2,3], Easings.gaussian());
```

### 

`weight` applies a function (probably an [easing function](../../modulation/easing)) to some data.

```js
// repl-pad

import { weight } from "https://unpkg.com/ixfx/dist/arrays.js"
import { Easings } from "https://unpkg.com/ixfx/dist/modulation.js"

// Weighs an input array of 1s
weight([1,1,1,1,1,1], Easings.gaussian());

// Yields:
// [0.02, 0.244, 0.85, 0.85, 0.244, 0.02]
```

## Patterns

<a name="jobQueue"></a>

### Process a queue or stack of items

Use a [Queue](./queue) or [Stack](./stack) data structure to enforce ordering:

```js
import { continuously } from "https://unpkg.com/ixfx/dist/flow.js"
import { Stacks } from "https://unpkg.com/ixfx/dist/collections.js"

// Eg: limit stack to 10 items
let toProcess = Stacks.stack({capacity: 10});

const processor = continuously(() => {
  if (toProcess.isEmpty) return false; // Stack is empty

  // Get the top-most item (ie most recently added)
  const item = toProcess.peek;

  // Set toProcess to be a new stack without top-most item
  toProcess = toProcess.pop();

  // Do something with item
  // ...
  
  return true; // Keep loop running
}, 1000);


// Add to stack:
const process = (item) => {
  toProcess = toProcess.push(item);
  
  // Start if it's not already running
  processor.start();
}
```

* [Online demo](https://clinth.github.io/ixfx-demos/flow/) ([source](https://github.com/ClintH/ixfx-demos/tree/main/flow/list-async))
