---
title: Normalising
layout: ../../layouts/MainLayout.astro
---

<script type="module" hoist>
  import '/src/components/ReplPad';
</script>

Data coming in from events, sensors etc can have radically different scales or even units. Rather than having to juggle these differences throughout your code, a strategy is to try to _normalise_ it as soon as you can.

Normalisation allows values to be compared more readily: 0.5 can mean half a volume level, but it can also mean half of the screen width. That's easier to manage than having to work with the equivalent absolute values of -12dB and 800.

In ixfx, we consider normalisation as converting numbers to be on the percentage scale of 0..1. Ie, 0.5 = 50%. Once you have this, it's easy to apply modulation factors and eventually, map the value to some absolute value in the output domain.

For our simple normalisation, we need some sense of the range of values - a minimum and maximum. For example, although an analog input value might theoretically be in the range of 0..1023, perhaps we've empirically discovered that the usable range is actually 0..400. This would constitute the range of the value.

## Arrays

An array of numbers can be normalised:

```js
// repl-pad
import {Normalise} from 'https://unpkg.com/ixfx/dist/temporal.js';

// Normalise with the largest value being 100%, the smallest 0%
// Yields: [1, 0.2, 0, 0.5]
Normalise.array([100,20,0,50]);

// Normalise with a forced min/max range
// Values outside of range will be clipped
// Yields: [1, 0.4, 0, 1]
Normalise.array([100,20,0,50], 0, 50); // Range 0-50
```

[minMaxAvg](https://clinth.github.io/ixfx/modules/Collections.Arrays.html#minMaxAvg) might also be a useful when working with arrays. It returns the minimum, maximum, average and total.

```js
// repl-pad
import {Arrays} from 'https://unpkg.com/ixfx/dist/collections.js';

// Yields: {total:170, max:100, min:0, avg:42.5}
const mma = Arrays.minMaxAvg([100,20,0,50]);
```

## Individual values

It's not always feasible to neatly normalise an array where you know exactly what the minimum and maximum is. Rather, you'll be getting a stream of data from events or sensors that needs to be normalised.

### Stream

`Normalise.stream` creates a normalise function based on 'seen' values. It allows simple normalisation of independent input streams. 

```js
// repl-pad
import {Normalise} from 'https://unpkg.com/ixfx/dist/temporal.js';

// Initialise a streaming normaliser
const n = Normalise.stream();

// Yields 1, because 5 is the highest seen
n(5);

// Yields 1, because now 10 is the highest seen
n(10);

// Yields 0, because it's so far the lowest seen
n(5);

// Yields 0.5, becaause it's in the middle of the range seen thus far
n(7.5);

// Yields 1, because now it's the largest seen
n(11);
```

It should be clear from the examples that the input that produces a certain output will vary based on what has been seen before. ie, 5 yields 1 as an input when it's the highest value, but 5 yields 0.05 if 100 is the highest value. It's good to remember then that normalised values aren't necessarily comparable to each other.

It's possible to 'prime' the normalisation if you know in advance what range of values to expect. If a value exceeds the range, the range is updated to encompass the new min or max.

```js
// repl-pad
import {Normalise} from 'https://unpkg.com/ixfx/dist/temporal.js';

// Initialise normaliser, assuming range of 0-10 
const n = Normalise.stream(0, 10);

// Yields 0.5, because it's in the middle of the primed range
n(5);

// Yields 1, with 11 now treated as the max
n(11);
```

### Scale

In contrast to `stream`, [`scale`](https://clinth.github.io/ixfx/modules.html#scale) keeps no record of the current min or max, but yields a normalised value based on the provided range. This is a fine alternative if you know what the range should be.

```js
// repl-pad#1
import {scale} from 'https://unpkg.com/ixfx/dist/bundle.js'

// Scale(v:number, inMin:number, inMax:number, outMin?:number, outMax?:number):number

// Scales 10 on the range of 0-100, with an output range of 0-1
// Yields 0.10
scale(10, 0, 100);


// Scales 20 on a range of 20-40
// Yields 0
scale(20, 20, 40);
```

`scale` can also be used to map from one input range to another input range. To do this, provide the output range as parameter as well:

```js
// repl-pad#1
// Maps the value 30 from an input range of 20-40 (thus 30 = 0.5 or 50%)
// to an output range of 100-200, yielding 100 (50% of the range 100-200)
scale(30, 20, 40, 100, 200);
```