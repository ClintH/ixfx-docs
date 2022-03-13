---
title: Normalising
layout: ../../layouts/MainLayout.astro
---

<script type="module" hoist>
  import '/src/components/ReplPad';
</script>

Data coming in from events, sensors etc. can have radically different scales or units. Rather than having to juggle these differences throughout your code, a strategy is to try to _normalise_ it as soon as you can, getting it on a relative percentage scale of 0..1 (0% .. 100%).

Normalisation allows values to be compared more readily: 0.5 (ie. 50%) can represent half volume level, or half of the screen width. That's easier to manage than having to work with the equivalent absolute values of -12dB and 800, and much less of your code has to change if different scaling is needed later on.

It's easy to apply modulation factors and eventually to map the relative value to some absolute value in the output domain. For example:

```js
// Normalised value
const v = 0.5;

// Get x coordinate at 50%
const x = v * window.innerWidth;

// Get a hue at 50%
const hue = v * 360;
```

The basic steps then are:
1. Receive data from an event, sensor, stream etc
2. Normalise on 0..1 scale, discarding original value
3. Do additional processing on normalised value as needed, applying to state
4. Map relative state values to output domains, eg pixels, sound level, pulse-width modulation... (see also [scalePercent](https://clinth.github.io/ixfx/modules.html#scalePercent))

For simple normalisation, some sense of the _input_ range of values is needed: a minimum and maximum. For example, although an analog input value might theoretically be in the range of 0..1023, perhaps we've empirically discovered that the usable range is actually 0..400. This would constitute the range of the value.

See also
* [Data clean up](../data/cleanup)

## Arrays

An array of numbers can be normalised, using the smallest and largest value as the range.

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

It's not always feasible to normalise knowing in advance all the possible values, or even knowing the range.

### Stream

`stream` creates a normalise function which automatically adapts as values are processed.

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

It should be clear from the examples that different input values may produce the same output value, depending on what has been seen before. For example, an input of 5 yields 1 if 5 is the highest value, but 5 yields 0.05 if 100 is the highest value. It's good to remember then that normalised values aren't necessarily comparable to each other.

It's possible to 'prime' the normalisation if you know in advance what range of values to expect. If a value exceeds the range, the range is updated to encompass the new minimum or maximum.

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

In contrast to `stream`, [`scale`](https://clinth.github.io/ixfx/modules.html#scale) keeps no record of the current minimum or maximum, but normalises based on the provided range. Use this when you know what the range will be.

Signature:

```js
scale(v:number, 
      inMin:number, inMax:number, 
      outMin?:number, outMax?:number):number
```

```js
// repl-pad#1
import {scale} from 'https://unpkg.com/ixfx/dist/bundle.js'

// Scales 10 on the range of 0-100, 
// with an output range of 0-1.
// Yields 0.10
scale(10, 0, 100);

// Scales 20 on a range of 20-40
// Yields 0
scale(20, 20, 40);
```

`scale` can also map to an output range other than the default of 0..1:

```js
// repl-pad#1
// Maps the value 30 from an input range of 20-40 (thus 30 = 0.5 or 50%)
// to an output range of 100-200, yielding 150 (50% of the range 100-200)
scale(30, 20, 40, 100, 200);
```

If the input range is a percentage, [scalePercentages](https://clinth.github.io/ixfx/modules.html#scalePercentages) adapts to a new output percentage range. While `scale` can be used for this, it's useful because it sanity-checks values to make sure everything stays within the percentage range.

```js
// repl-pad
// Scale 0.5 to be on a 0.0-0.10 range
scalePercentages(0.5, 0, 0.10) // 0.05 (5%)
```



