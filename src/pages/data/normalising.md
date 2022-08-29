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
4. Map relative state values to output domains, eg pixels, sound level, pulse-width modulation... (see also [`scalePercent`](https://clinth.github.io/ixfx/functions/Data.scalePercent.html))

For simple normalisation, some sense of the _input_ range of values is needed: a minimum and maximum. For example, although an analog input value might theoretically be in the range of 0..1023, perhaps we've empirically discovered that the usable range is actually 0..400. This would constitute the range of the value.

See also
* [Data clean up](../../data/cleanup/)

## Arrays

If you have all the data in advance, it's easy enough to 'perfectly' normalise, because the smallest and largest value can be determined. [`Normalise.array(source)`](https://clinth.github.io/ixfx/functions/Data.Normalise.array.html) returns a normalised copy of `source`, such that the smallest value becomes 0 and the largest value 1. A range can be forced by passing in a min and max: `Normalise.array(source, min, max)`.

```js
// repl-pad
import { Normalise } from 'https://unpkg.com/ixfx/dist/data.js';

// Normalise with the largest value being 100%, the smallest 0%
// Yields: [1, 0.2, 0, 0.5]
Normalise.array([100,20,0,50]);

// Normalise with a forced min/max range
// Values outside of range will be clipped
// Yields: [1, 0.4, 0, 1]
Normalise.array([100,20,0,50], 0, 50); // Range 0-50
```

[`minMaxAvg`](https://clinth.github.io/ixfx/functions/Collections.Arrays.minMaxAvg.html) might also be a useful when working with arrays. It returns the minimum, maximum, average and total.

```js
// repl-pad
import {Arrays} from 'https://unpkg.com/ixfx/dist/collections.js';

// Yields: {total:170, max:100, min:0, avg:42.5}
const mma = Arrays.minMaxAvg([100,20,0,50]);
```

## Individual values

It's not always feasible to normalise knowing in advance all the possible values, or even knowing the range. `Normalise.stream` remembers the range of values, producing an adaptive normalisation. `scale` can also be used for normalisation, but you must provide the expected min and max value.

### Stream

[`Normalise.stream`](https://clinth.github.io/ixfx/functions/Data.Normalise.stream.html) creates a normalise function which automatically adapts as values are processed.

```js
// repl-pad
import { Normalise } from 'https://unpkg.com/ixfx/dist/data.js';

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
import {Normalise} from 'https://unpkg.com/ixfx/dist/data.js';

// Initialise normaliser, assuming range of 0-10 
const n = Normalise.stream(0, 10);

// Yields 0.5, because it's in the middle of the primed range
n(5);

// Yields 1, with 11 now treated as the max
n(11);
```

### Scale


In contrast to `stream`, [`scale`](https://clinth.github.io/ixfx/functions/Data.scale.html) keeps no record of the current minimum or maximum, but normalises based on the provided range. Use this when you know what the range will be.

A basic scale function looks like this:

```js
// repl-pad
const scale = (v, inMin, inMax, outMin, outMax) => {
  return (v - inMin) / (inMax - inMin) * (outMax - outMin) + outMin;
};

// Example, scale the value of 50, with an 
// input range of 0..100 and
// output range of 0..1:
scale(50, 0, 100, 0, 1);
// Yields: 0.5
```

The ixfx scale function optionally allows the scaling to be _eased_ (for non-linear scaling), and if `outMin`/`outMax` are not specified, a 0..1 range is presumed.

It's function signature looks like this:

```js
scale(v:number, 
      inMin:number, inMax:number, 
      outMin?:number, outMax?:number, easing?:EasingFn):number
```

In action it looks like this:

```js
// repl-pad#1
import { scale } from 'https://unpkg.com/ixfx/dist/data.js'

// Scales 10 on the range of 0-100, 
// with an output range of 0-1.
// Yields 0.10
scale(10, 0, 100); // 0.1

// Scales 20 on a range of 20-40
// Yields 0
scale(20, 20, 40); // 0
```

`scale` can also map to an output range other than the default of 0..1:

```js
// repl-pad#1
// Maps the value 30 from an input range of 20-40 (thus 30 = 0.5 or 50%)
// to an output range of 100-200, yielding 150 (50% of the range 100-200)
scale(30, 20, 40, 100, 200); // 150
```

If the input value is outside of the specified input range, the output value will likewise be outside of the output range. Use [`clamp`](../data/cleanup/#clamping) to ensure the output range is respected:

```js
// repl-pad
import { scale, clamp } from 'https://unpkg.com/ixfx/dist/data.js'
// 11 is beyond input range of 0-10, so we get
// an output beyond expected range of 0..1:
scale(11, 0, 10); // 1.1

// Clamp solves that:
clamp(scale(11, 0, 10)); // 1
```

If the input range is a percentage, [`scalePercentages`](https://clinth.github.io/ixfx/functions/Data.scalePercentages.html) adapts to a new output percentage range. While `scale` can be used for this, it's useful because it sanity-checks values to make sure everything stays within the percentage range.

```js
// repl-pad
import { scalePercentages } from 'https://unpkg.com/ixfx/dist/data.js'
// Scale 0.5 to be on a 0.0-0.10 range
scalePercentages(0.5, 0, 0.10) // 0.05 (5%)
```

## Geometry

Working with normalised geometric references can be useful for the same reason as normalised plain numbers. For example, perhaps you have a stream of [points](../../types/geometry/point/) from a computer vision library for the location of a detected nose. This position might be in _camera coordinates_, meaning that 0,0 represents the top-left corner of a frame from the camera. The max width and height will be determined by the resolution setting of the camera/library.

You don't want to have to think about the scale of camera coordinates throughout the code, and importantly, it may change if you opt for a different camera resolution. Normalising to 0,0 - 1,1 may be the answer:

```js
const cameraBounds = {width: 1024, height: 768};
const pt = {x:500, 300};

const normalised = {
  x: pt.x / cameraBounds.width,
  y: pt.y / cameraBounds.height
};
```

You might also want to verify the points don't exceed 0..1. 

```js
import { clamp } from 'https://unpkg.com/ixfx/dist/data.js';
const normalisedClamped = {
  x: clamp(pt.x / cameraBounds.width),
  y: clamp(pt.y / cameraBounds.height
};
```

With ixfx, normalising points is possible using [`Points.normaliseByRect`](https://clinth.github.io/ixfx/functions/Geometry.Points.normaliseByRect.html)

```js
import { Points } from 'https://unpkg.com/ixfx/dist/geometry.js';
const cameraBounds = { width: 1024, height: 768 };
const pt = { x:500, 300 };

// Convert point to 0..1 scale, based on camera frame
const normalised = Points.normaliseByRect(pt, cameraBounds);
```

[`Points.clamp`](https://clinth.github.io/ixfx/functions/Geometry.Points.clamp.html) will clamp both _x_ and _y_: 

```js
const normalised = Points.clamp(Points.normaliseByRect(pt, cameraBounds));
```

If you have a normalised point, at some point you may need to map it to some coordinate space. Eg to the viewport. [`Points.multiply`](https://clinth.github.io/ixfx/functions/Geometry.Points.multiply.html) can be used for this:

```js
import { Point } from 'https://unpkg.com/ixfx/dist/geometry.js';
const bounds = { height: window.innerHeight, width: window.innerWidth };

// 1,1 is normalised, meaning {x:100%, y:100%}
const pt = { x:1, y:1 };

// Now it's in absolute screen coordinates
const screenPt = Points.multiply(pt, bounds.width, bounds.height);
```