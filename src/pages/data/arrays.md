---
title: Arrays
layout: ../../layouts/MainLayout.astro
---

<div class="tip">
<ul>
<li>API Reference <a href="https://clinth.github.io/ixfx/modules/Collections.Arrays.html">Collections.Arrays module</a></li>
<li>Parent <a href="https://clinth.github.io/ixfx/modules/Collections.html">Collections module</a></li>
</div>

<script type="module" hoist>
  import '/src/components/ReplPad';
</script>

## Enumerating

JS's `for of` can be used to enumerate over items in an array:

```js
for (const value of someArray) {
  // Do something with value 
}
```

Another classic approach you'll see is a `for` loop. This is only useful if you're concerned with the indexes of the items. Most of the time we aren't, which is why the style above is preferred. 

```js
// Classic 'for' loop
for (let i=0;i<someArray.length;i++) {
  const item = someArray[i]; // access by index
  console.log(`${i}. ${someArray[i]}`);
}
```

Another benefit of the `for of` loop is that it can enumerate over different kinds of objects, not just arrays. Most usefully: [Generators](../../gen/generator/)

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

ixfx has some functions for randomly choosing items or indexes from an array: [`randomElement`](https://clinth.github.io/ixfx/functions/Collections.Arrays.randomElement.html) returns a random element from an array, [`randomIndex`](https://clinth.github.io/ixfx/functions/Collections.Arrays.randomIndex.html) returns a random index.

```js
// repl-pad
import {randomElement, randomIndex} from 'https://unpkg.com/ixfx/dist/arrays.js';

// Return a random string: apples, oranges or pears
randomElement([`apples`, `oranges`, `pears`]);

// Return a random index: 0, 1 or 2
randomIndex([`apples`, `oranges`, `pears`]);
```

[`weightedInteger`](https://clinth.github.io/ixfx/functions/Random.weightedInteger.html) can be used for skewing the distributing of random elements, eg. to favour picking elements at the end of the array over elements at the beginning.

```js
import {weightedInteger} from 'https://unpkg.com/ixfx/dist/random.js';
const a = [`apples`, `oranges`, `melons`, `bananas`];
// Define a function to produce the random numbers we want
const rand = () => weightedInteger({ max: a.length, easing: `quadIn` });
// Use function to access an item in array
a[rand()];
```

### Cycle

[`cycle`](https://clinth.github.io/ixfx/functions/Collections.Arrays.cycle.html) allows traversing an array with function calls. It's useful because the returned function wraps up both the source array and the position. Other parts of your code just need to know to invoke a function and get back a value.

```js
import { cycle } from 'https://unpkg.com/ixfx/dist/arrays.js';
const c = cycle([`apples`,`oranges`,`pears`]);
c.current; // 'apples'
c.next(); // `oranges`
c.next(); // `pears`
c.next(); // `apples'
c.select(1); // 'oranges'
c.select(`pears`); // 'pears'
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

ixfx's [`shuffle`](https://clinth.github.io/ixfx/modules/Collections.Arrays.html#shuffle) randomises the ordering of an array.

```js
// repl-pad#1
import { shuffle } from 'https://unpkg.com/ixfx/dist/arrays.js';
const a = [`apples`, `oranges`, `melons`, `bananas`];

// Yields a randomly ordered version, eg: [`melons`,`apples`,`bananas`,`oranges`];
const b = shuffle(a);
```

Once shuffled, you can then iterate over the array as normal:

```js
// repl-pad#1
const c = [1,2,3,4,5,6,7,8,9,10];

// Prints items from array in random order
for (const value of shuffle(c)) {
  console.log(value);
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

ixfx has [`filterAB`](https://clinth.github.io/ixfx/functions/Collections.Arrays.filterAB.html) which captures items on either side of the filter function.
```js
import { filterAB } from "https://unpkg.com/ixfx/dist/arrays.js";
const data = [1,2,3,1,2,3]
const [matching,nonMatching] = filterAB(data, d => d > 2);
// matching: [ 3, 3]
// nonMatching: [ 1, 2, 1, 2]
```

[`until`](https://clinth.github.io/ixfx/functions/Collections.Arrays.until.html) returns all items in an array until the provided predicate returns false.

```js
// repl-pad
import { until } from "https://unpkg.com/ixfx/dist/arrays.js"

// Callback gets current value, and needs to return:
// [true/false, accumulated value]
// In this case, we return [true,0] if v === 3
const v = Arrays.until([1,2,3,4,5], v => [v === 3, 0]);

```

Remove a random element from an array with [`randomPluck`](https://clinth.github.io/ixfx/functions/Collections.Arrays.randomPluck.html). It doesn't modify the array, but returns the randomly selected item and a new array without it.


```js
// repl-pad
import {randomPluck} from 'https://unpkg.com/ixfx/dist/arrays.js';

// Remove a random element
const r = randomPluck([`apples`, `oranges`, `pears`]);
r.value; // A random value
r.array; // A copy of the array with the random value removed
```

## Grouping

[`groupBy`](https://clinth.github.io/ixfx/functions/Collections.Arrays.groupBy.html) allows you to group an array by some generated key.

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

Overview: 
* average, min, max, total or minMaxAvg to calculate all
* averageWeighted
* dotProduct
* weight
  
### Ranges

```js
// repl-pad
import { max,min,average, minMaxAvg } from "https://unpkg.com/ixfx/dist/arrays.js"

const data = [1,2,3];
// Compute max, min, avg:
max(...data); // 3
min(...data); // 1
average(...data); //

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

## More functions

Comparing arrays
* [`compareValues`](https://clinth.github.io/ixfx/functions/Collections.Arrays.compareValues.html) - for array _x_ and _y_, identify items common in both, or exclusively in _x_ or _y_
* [`compareValuesEqual`](https://clinth.github.io/ixfx/functions/Collections.Arrays.compareValuesEqual.html) - returns _true_ if both arrays contain the same set of items, regardless of position.
* [`additionalValues`](https://clinth.github.io/ixfx/functions/Collections.Arrays.additionalValues.html) - yield all values not contained in a base array
* [`intersection`](https://clinth.github.io/ixfx/functions/Collections.Arrays.intersection.html) - return values contained in both _x_ and _y_ arrays
* [`unique`](https://clinth.github.io/ixfx/functions/Collections.Arrays.unique.html) - combines values of arrays, only keeping unique values
  
Randomisation
* [`randomIndex`](https://clinth.github.io/ixfx/functions/Collections.Arrays.randomIndex.html) - random index
* [`randomElement`](https://clinth.github.io/ixfx/functions/Collections.Arrays.randomElement.html) - random value
* [`randomPluck`](https://clinth.github.io/ixfx/functions/Collections.Arrays.randomPluck.html) - remove random value
* [`shuffle`](https://clinth.github.io/ixfx/functions/Collections.Arrays.shuffle.html) - randomise order

Finding/accessing
* [`contains`](https://clinth.github.io/ixfx/functions/Collections.Arrays.contains.html) - returns _true_ if array contains all provided items
* [`containsDuplicateValues`](https://clinth.github.io/ixfx/functions/Collections.Arrays.containsDuplicateValues.html) - returns _true_ if any duplicate _values_ are found in source array.
* [`containsDuplicateInstances`](https://clinth.github.io/ixfx/functions/Collections.Arrays.containsDuplicateInstances.html) - returns _true_ if any duplicate _instances_ are found in source array.
* [`cycle`](https://clinth.github.io/ixfx/functions/Collections.Arrays.cycle.html) - cycle through contents
* [`filterBetween`](https://clinth.github.io/ixfx/functions/Collections.Arrays.filterBetween.html) - return elements of array that match predicate _and_ are within a given start and end index
* [`sample`](https://clinth.github.io/ixfx/functions/Collections.Arrays.sample.html) - sub-sample an array
* [`valuesEqual`](https://clinth.github.io/ixfx/functions/Collections.Arrays.valuesEqual.html) - returns _true_ if all values in array are identical
* [`filterAB`](https://clinth.github.io/ixfx/functions/Collections.Arrays.filterAB.html) - filters an array with a predicate, returning everything that passes in one array and everything that does not in another.


Changing the shape of an array
* [`ensureLength`](https://clinth.github.io/ixfx/functions/Collections.Arrays.ensureLength.html) - Pad out or truncate an array so it matches a target length
* [`chunks`](https://clinth.github.io/ixfx/functions/Collections.Arrays.chunks.html) - break up an array into chunks of a given size
* [`groupBy`](https://clinth.github.io/ixfx/functions/Collections.Arrays.groupBy.html) - Groups data by a function
* [`interleave`](https://clinth.github.io/ixfx/functions/Collections.Arrays.interleave.html) - combines the values of several arrays by interleaving values
* [`remove`](https://clinth.github.io/ixfx/functions/Collections.Arrays.remove.html) - remove an element by index
* [`without`](https://clinth.github.io/ixfx/functions/Collections.Arrays.without.html) - return an array without a given value
* [`zip`](https://clinth.github.io/ixfx/functions/Collections.Arrays.zip.html) - combine elements of arrays based on their index