---
title: Arrays
layout: ../../layouts/MainLayout.astro
---

<script type="module" hoist>
  import '/src/components/ReplPad';
</script>

## Enumerating

JS's `forEach` can be used to enumerate over items in an array:

```js
someArray.forEach(v => {
  // do something with v...
});

// You can also get the index of an 
// array element you enumerate
someArray.forEach((v,index) => {
  // do something with v/index...
});
```

Another 'classic' approach you'll see is a `for` loop:
```js
for (let i=0;i<someArray.length;i++) {
  const item = someArray[i]; // access by index
  console.log(`${i}. ${someArray[i]}`);
}
```

## Accessing items

Array items can be accessed by their index. The first item in an array has an index of 0, and so on. Arrays have a `length` property which returns how many items it contains.

```js
const someArray = [`apples`, `oranges`, `bananas`];

// Get the second item, which has an index of 1
const second = someArray[1]; 

// Get the last item (length is three, but indexes start at zero, so we have to -1)
const last = someArray[someArray.length-1];

const first = someArray[0];

```

It also works to use `at`, which has the benefit of being able to work backwards:

```js
const someArray = [`apples`, `oranges`, `bananas`];
const second = someArray.at(1);

// Get one item back from start, ie the last item:
const last = someArray.at(-1);
const first = someArray.at(0);
```

ixfx has some functions for randomly choosing items or indexes from an array: [`randomElement`](https://clinth.github.io/ixfx/modules/Collections.Arrays.html#randomElement) returns a random element from an array, [`randomIndex`](https://clinth.github.io/ixfx/modules/Collections.Arrays.html#randomIndex) returns a random index.

```js
// repl-pad
import {randomElement, randomIndex} from 'https://unpkg.com/ixfx/dist/arrays.js';

// Return a random string: apples, oranges or pears
randomElement([`apples`, `oranges`, `pears`]);

// Return a random index: 0, 1 or 2
randomIndex([`apples`, `oranges`, `pears`]);
```

[`weightedInteger`](https://clinth.github.io/ixfx/modules/Random.html#weightedInteger) can be used for skewing the distributing of random elements, eg to favour picking elements at the end of the array over elements at the beginning.

```js
import {weightedInteger} from 'https://unpkg.com/ixfx/dist/random.js';
const a = [`apples`, `oranges`, `melons`, `bananas`];
// eg: weightedInteger(maxValue, easingName)
// generate a random index weighted using the quadIn easing.
a[weightedInteger(a.length), `quadIn`];
```


## Finding

JS's [`some`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some) yields _true_ if at least one item in the array matches the provided function.

For example, if you want to check if there is a green fruit in a list of fruits:

```js
const fruits = [
  {colour: `red`, name: `grape`},
  {colour: `green`, name: `granny-smith`}
];

// isFound will be true or false
const isFound = fruits.some(v => {
  return (v.colour === `green`)
});
```

JS's [`includes`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes) returns true if the specified value is found in an array.

```js
const favColours = [ `red`, `green`, `yellow`];
if (favColours.includes(`red`)) {
  // Red is in the favourite colours...
}

// Note that favColours.includes(`RED`) would return false
```

When using `includes` to check for objects, be mindful that it compares them by _reference_ not _value_. 

```js
// Returns false, because although object value exists in array,
// this *particular* object does not:
const isFound = fruits.includes({colour: `red`, name: `grape`});
```

JS's [`find`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find) function is similar, but it returns the first matching item instead of just true/false. 

```js
const firstGreenFruit = fruits.find(v => {
  return (v.colour === `green`);
});

// firstGreenFruit will be: {colour: `green`, name: `granny-smith`}
```

If no matching items were found, `undefined` is returned.

```js
const firstPurpleFruit = fruits.find(v v=> v.colour === `purple`); // note simplified arrow function syntax
if (firstPurpleFruit === undefined) {
  console.log(`Not found`);
} else {
  console.log(`Found: ${firstPurpleFruit.name}`); // Print name of found fruit
}
```

## Ordering

```js
// Ordering and enumerating:
someArray.sort();     // Simple sort
someArray.reverse();  // Reverse order
```

[`shuffle`](https://clinth.github.io/ixfx/modules/Collections.Arrays.html#shuffle) randomises the ordering of an array.

```js
// repl-pad#1
import {shuffle} from 'https://unpkg.com/ixfx/dist/arrays.js';
const a = [`apples`, `oranges`, `melons`, `bananas`];

// Yields a randomly ordered version, eg: [`melons`,`apples`,`bananas`,`oranges`];
const b = shuffle(a);
```

Once shuffled, you can then iterate over the array as normal:

```js
// repl-pad#1
const c = [1,2,3,4,5,6,7,8,9,10];

// Prints items from array in random order
for (const i of shuffle(c)) {
  console.log(i);
}
```

## Filtering

[`without`](https://clinth.github.io/ixfx/modules/Collections.Arrays.html#without) returns a copy of an array without values equal to `v`. In the case of objects, references are compared.

```js
// repl-pad
import { without } from "https://unpkg.com/ixfx/dist/arrays.js"
const data = [1,2,3,1,2,3];
// Yields: [1,3,1,3]
without(data, 2);
```

JS's in built [`filter`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) function all items which pass the provided function:

```js
const data = [1,2,3,1,2,3];
const filtered = data.filter(d => d > 2); // Return true if value is greater than 2
// [3, 3]
```

Remove a random element from an array with [`randomPluck`](https://clinth.github.io/ixfx/modules/Collections.Arrays.html#randomPluck). It doesn't modify the array, but returns the randomly selected item and a new array without it.

```js
// repl-pad
import {randomPluck} from 'https://unpkg.com/ixfx/dist/arrays.js';

// Remove a random element
const r = randomPluck([`apples`, `oranges`, `pears`]);
r.value; // A random value
r.array; // A copy of the array with the random value removed
```

## Grouping

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
// repl-pad
import { average } from "https://unpkg.com/ixfx/dist/arrays.js"


// Compute an average of all provided values
average(1, 1.4, 0.9, 0.1);  // 0.85

// Compute average of an array
const data = [1,2,3,4,5];
average(...data);           // 3
```

[`averageWeighted`](https://clinth.github.io/ixfx/modules/Collections.Arrays.html#averageWeighted) applies a weighting to each element. In the below example, items in the middle of the array are weighted more highly because of the Gaussian easing function (which resembles a bell curve).

```js
// repl-pad
import { Easings } from "https://unpkg.com/ixfx/dist/modulation.js"
import { averageWeighted } from "https://unpkg.com/ixfx/dist/arrays.js"

// Using an ixfx easing function to weight elements.
// Gaussian function weights middle elements highest, skewing the average
const v = averageWeighted([10,2,3,4,10], Easings.gaussian());
// Yields: 3.6, while regular `average` yields 5.8
```

### Weighting

`weight` applies a function (probably an [easing function](../../modulation/easing/)) to some data.

```js
// repl-pad

import { weight } from "https://unpkg.com/ixfx/dist/arrays.js"
import { Easings } from "https://unpkg.com/ixfx/dist/modulation.js"

// Weighs an input array of 1s
weight([1,1,1,1,1,1], Easings.gaussian());

// Yields:
// [0.02, 0.244, 0.85, 0.85, 0.244, 0.02]
```
