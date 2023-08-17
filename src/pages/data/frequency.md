---
title: Frequency
layout: ../../layouts/MainLayout.astro
setup: |
  import { DemoElement } from '../../components/DemoElement.ts';
---

<script type="module" hoist>
  import '/src/components/ReplPad';
</script>

<div class="tip">
<ul>
<li>API Reference <a href="https://clinth.github.io/ixfx/classes/Data.FrequencyMutable.html">Data.FrequencyMutable class</a></li>
<li><a href="../trackers/">Trackers</a> track data ranges</li>
</div>

The `FrequencyMutable` class keeps track of the number of times a certain value is 'seen'.

In some scenarios it can be useful to aggregate data over time, rather than looking at a single event or snapshot-in-time. It allows you to do some fuzzy logic, for example using the value that _mostly_ occurs.

In the demo below, a [weighted distribution](../../gen/random/#weighted-distribution) of random numbers is produced, with lower numbers occuring more often than higher numbers. A `FrequencyMutable` instance is used to count how many times each number appears, and for visualisation purposes shown as a histogram.

<script type="module" hoist>
import '/src/components/data/freqWeighted';
</script>
<style>
  #dataStream {
    width: 5em;
  }
  #dataStream {
    flex-grow: unset;
    max-height: 5em;
    scoll-o
  }
</style>
<div class="toolbar centered">
  <button id="btnStart">Start</button>
  <button id="btnStop">Stop</button>
  <button id="btnClear">Clear</button>
</div>
<div class="sxs">
  <div class="dataLog" id="dataStream" style="max-height: 5em"></div>
  <div>
    <histogram-vis id="dataPlot"></histogram-vis>
  </div>
</div>


## Usage

[`frequencyMutable`](https://clinth.github.io/ixfx/functions/Data.frequencyMutable-1.html) creates a new instance. The provided frequency histogram is _mutable_, meaning that the object reference stays the same while the data inside is permitted to change.


### Adding and clearing

```js
// repl-pad#1
import { frequencyMutable } from "https://unpkg.com/ixfx/dist/data.js"

// Create an instance
const freq = frequencyMutable();

// Add data, here several at once
freq.add(`apples`, `oranges`, `apples`, `pears`, `pears`);

// Get an array version
// [ ["apples", 2], ["oranges",1],["pears",2] ]
const t = freq.toArray();
```

Clear all data
```js
freq.clear();
```

### Working with frequency

Get the count of a specific group. Returns `undefined` if group is not found.

```js
// repl-pad#1
const f = freq.frequencyOf(`apples`); // 2
```

It can be useful to work with the relative frequency rather than the absolute amount. For example, `apples` appears 40% of the time:

```js
// repl-pad#1
const rel = freq.relativeFrequencyOf(`apples`); // 0.4
```

To find the smallest, largest, average frequencies as well as the total frequency (ie. how many things have been added):

```js
// repl-pad#1
// Returns {min, max, avg, total}
const mma = freq.minMaxAvg(); 
console.log(`Average frequency is ${mma.avg}`);
```

### Iterating

You can get the data as an array and iterate:

```js
// repl-pad#1
const data = freq.entries(); // freq.toArray() gives same result
for (const [group, count] of data) {
  console.log(`${group} has a count of ${count}`); // apples has a count of 2...
}
```

To get the entries sorted:

```js
// repl-pad#1
// Sorting options are: value, valueReverse, key or keyReverse
const sorted = freq.entriesSorted(`key`); // Sort alphabetically by key
```

### Custom objects

To keep track of objects, provide a function that creates a string for the items you're adding. This allows you to group by different fields, or some combination of fields.

In the below example, cars are grouped by their make:

```js
// repl-pad
import { frequencyMutable } from "https://unpkg.com/ixfx/dist/data.js"

// Two cars
const cars = [
  {
    make: `Toyota`,
    model: `Corolla`,
    year: 1980
  },
  {
    make: `Honda`,
    model: `Civic`,
    year: 1985
  }
]

// Count cars by make
const freq = frequencyMutable(car => car.make);

// Add array of cars
freq.add(...cars);

// Count a group
freq.frequencyOf(`Toyota`); // 1

// Or by object, which uses the same stringify function
freq.frequencyOf(cars[1]); // 1
```

## Examples

### Letter frequency

The below example calculates frequency distribution of letters in a string. It demonstrates how to add items to the `Frequency`, sort by frequency and calculate a proportional amount.

```js
// repl-pad
import { frequencyMutable } from "https://unpkg.com/ixfx/dist/data.js"

const freq = frequencyMutable();
const text = 'This is a test';

// Loop through all characters
for (let i = 0; i < text.length; i++) {
  const letter = text.toLocaleUpperCase().charAt(i);
  if (letter === ` `) continue; // Skip spaces;
  freq.add(letter); // Add letter
}

// Sort with most frequent at position 0 of the array
const sorted = freq.entriesSorted(`valueReverse`);
// Grab just the top three
const topThree = sorted.slice(0, Math.min(sorted.length, 3));

// Calculate the min, max and avg over all frequencies
const mma = freq.minMaxAvg();

// Calculate percentage for a given letter
const percent = (kv) => Math.round(kv[1] / mma.total * 100);

const top = topThree[0];
console.log(`Letter ${top[0]} appears ${percent(top)}% of the time.`);
```

<demo-element title="Frequency tracking" src="/data/frequency/" />
