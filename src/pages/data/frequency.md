---
title: Frequency
setup: |
  import { Markdown } from 'astro/components';
  import Layout from '../../layouts/MainLayout.astro';
  import FreqLettersElement from './FreqLettersElement.ts';
  import FreqWeighted from './FreqWeighted.astro';
  import CounterElement from './CounterElement.ts';
---

The `Frequency` class keeps track of the number of times a certain value is 'seen'.

## Why?

In some scenarios it can be useful to aggregate data over time, rather than looking at a single event or snapshot-in-time. It allows you to do some fuzzy logic, for example using the value that _mostly_ occurs.

## Demo

In the demo below, a weighted distribution of random numbers is produced. In this case, lower numbers will occur more often than higher numbers. The `Frequency` is used to count how many times each number appears, and for visualisation purposes shown as a histogram.

<FreqWeighted />

## Usage

The provided frequency histogram is _mutable_, meaning that the object reference stays the same while the data inside is permitted to change.

### Adding and clearing

```js
// Create an instance
const freq = mutableFrequency();

// Add string or numeric data...
freq.add(`apples`);
freq.add(`oranges`);
freq.add(`apples`);
freq.add(`pears`);
freq.add(`pears`);
```

Clear all data
```js
freq.clear();
```

### Working with frequency

Get the count of a specific group. Returns `undefined` if group is not found.

```js
const apples = freq.frequencyOf(`apples`); // 2
```

It can be useful to work with the relative frequency rather than the absolute amount. For example, `apples` appears 40% of the time:

```js
const apples = freq.relativeFrequencyOf(`apples`); // 0.4
```

To find the smallest, largest, average frequencies as well as the total frequency (ie. how many things have been added):

```js
const mma = freq.minMaxAvg(); // Returns {min, max, avg, total}
console.log(`Average frequency is ${mma.avg}`);
```

### Iterating

You can get the data as an array and iterate:

```js
const data = freq.entries(); // freq.toArray() gives same result
for ([group, count] of data) {
  console.log(`${group} has a count of ${count}`); // apples has a count of 2...
}
```

To get the entries sorted:

```js
// Sorting options are: value, valueReverse, key or keyReverse
const sorted = freq.entriesSorted(`key`); // Sort alphabetically by key
```

### Custom objects

To keep track of objects, provide a function that creates a string for the items you're adding. This allows you to group by different fields, or some combination of fields.

In the below example, cars are grouped by their make:

```js
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
const freq = mutableFrequency(car => car.make);

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
const freq = mutableFrequency();

// Loop through all characters
for (let i = 0; i < this.text.length; i++) {
  const letter = this.text.toLocaleUpperCase().charAt(i);
  if (letter === ` `) continue; // Skip spaces;
  freq.add(letter); // Add letter
}

// Sort with most frequent at position 0 of the array
const sorted = freq.entriesSorted(`valueReverse`);
// Grab just the top three
const top = sorted.slice(0, Math.min(sorted.length, 3));

// Calculate the min, max and avg over all frequencies
const mma = freq.minMaxAvg();

// Calculate percentage for a given letter
const percent = (kv) => Math.round(kv[1] / mma.total * 100);

console.log(`Letter ${top[0]} appears ${percent(top[0])}% of the time.`);
```

<freq-letters client:load />
