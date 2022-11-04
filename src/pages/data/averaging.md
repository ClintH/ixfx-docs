---
title: Averaging
layout: ../../layouts/MainLayout.astro
setup: |
  import { DemoElement } from '../../components/DemoElement.ts';
---

<script type="module" hoist>
  import '/src/components/ReplPad';
</script>

<div class="tip">
<ul>
<li>API Reference <a href="https://clinth.github.io/ixfx/modules/Data.html">Data module</a></li>
<li>See also: <a href="../trackers/#numbers">Number trackers</a>
</div>

## Noise

Data can be noisy or jittery: instead of a convienent smooth line of a sensor going up and down, there might be all kinds of spikes, or perhaps the value is never static, always wavering up and down.

While we typically want to respond with nuance to input (be it from a human action, sensor, machine learning inference etc), we don't necessarily want to work with single data points in isolation. Because if we express a currently very low reading, it might be an erroneous spike in the data, not reflecting the average of the data, or the qualitative aspect we are working with.

Examples sources with noise and jitter:
* Pointer move events on a touch screen: _x_ and _y_ will move slightly, even though we might feel like we're not moving a finger
* Audio level input: a very jittery input
* Ultrasound sensor: signals might hit different angles of the same object, giving each pulse a different value
* Pose detection via machine learning: a very jittery collection of points which shift around and snap in and out of existence

<demo-element style="height:40vh" title="Moving average" src="/data/moving-average-audio/" />

Even the humble physical button can exhibit jitter, where a single physical press is actually registered as several presses. In code, this is solved through a [`debounce`](https://clinth.github.io/ixfx/functions/Flow.debounce.html) function. Noise from physical sensors - particularly analog sensors - can also sometimes be reduced in the hardware domain.

## Averaging a data set

If you have all the values you want to average in advance, it's straightforward calculate using
* Simple averaging: [`Arrays.average`](https://clinth.github.io/ixfx/functions/Collections.Arrays.average.html), or
* Weighted averaging: [`Arrays.averageWeighted`](https://clinth.github.io/ixfx/functions/Collections.Arrays.averageWeighted.html)


### Simple

The basic way to average is to add up all the values and divide by the number of values.

This is easy to do from 'first principles':

```js
const average = (numbers) => {
  const total = numbers.reduce((acc, v) => acc + v, 0);
  return total / numbers.length;
};
average([10, 20, 30]);
// Yields: 20
```

Or otherwise, using ixfx's [`Arrays.average`](https://clinth.github.io/ixfx/functions/Collections.Arrays.average.html). It silently ignores non-numbers (_undefined_, _null_, _NaN_ etc), which can be useful.

```js
// repl-pad
import { Arrays } from 'https://unpkg.com/ixfx/dist/collections.js';
// Pass in numbers as a set of parameters:
Arrays.average([10, 20, 30]);

// Or use the spread operator for arrays:
const someArray = [10, 20, 30];
Arrays.average(someArray);
```

If you have a set of numbers to average not already in an array, [`Numbers.average`] is effectively the same as `Arrays.average`, but takes in a spread set of parameters:

```js
// repl-pad
import * as Numbers from 'https://unpkg.com/ixfx/dist/numbers.js';

Numbers.average(10, 20, 30);

const a = 10;
const b = 20;
const c = 30;
Numbers.average(a, b, c);
```

### Weighted averaging

Rather than give all recorded values equal prominence in the average calculation, it's possible to weight them. For example, giving higher priority to more recent values.

ixfx's [`Arrays.averageWeighted`](https://clinth.github.io/ixfx/functions/Collections.Arrays.averageWeighted.html) can help with this. 

A simple approach is to use a function which calculates the weighting of a given element. Here we can use one of the [easing functions](../../modulation/easing/).

```js
// repl-pad
import { Arrays } from 'https://unpkg.com/ixfx/dist/collections.js';
import { Easings } from 'https://unpkg.com/ixfx/dist/modulation.js';

const data = [ 1, 10, 100 ];

// Gaussian will weigh middle elements most heavily
// Yields: 25
Arrays.averageWeighted(data, Easings.gaussian());

// quadIn will weigh most recent (end-of-array) elements most heavily
// Yields: 97
Arrays.averageWeighted(data, Easings.get(`quadIn`));
```

## Averaging streams

When averaging a stream, we don't have the 'full picture' of all the data to average perfectly. This is because it's infeasible to keep a store of all data and it's not certain what data will arrive next. It's similiar issue we face when [normalising streams](../normalising/#stream).

### Tracker

Ixfx has several ['trackers'](../trackers/), intended for monitoring the range of data in a stream. By default they don't record each data point, but rather keep a running total and average.

Here's the [`numberTracker`](https://clinth.github.io/ixfx/functions/Data.numberTracker.html) illustrated:

```js
// repl-pad
import { numberTracker } from 'https://unpkg.com/ixfx/dist/data.js';

// Initialise
const t = numberTracker();

// Add some random values
for (let i=0;i<10;i++) t.seen(Math.floor(Math.random()*100)));

// Get average
t.avg
```

These trackers are not great at adapting to temporal changes because by default they track the global average of stream (or at least, the data seen thus far). Typically we'd want to only consider the average of _recent_ data, which is where [moving averages](#moving-average) are better.

It is however possible to set some options on the tracker to automatically reset itself after _n_ samples, or to reset it yourself.

### Moving average

The moving averaging technique (called the _moving_ or _sliding window_) keeps track of the last _n_ values for the purposes of averaging. This way we only record a small chunk of recent data rather than attempt to store everything.

When using moving averaging, a key tuning parameter is the size of the 'window', how many items to keep track of. A larger window size will smooth noise at the expense of being less responsive to change. A smaller window size will more noisy but more accurately track the current data.

This tuning also needs to be done with respect to speed at which data is added. There's a big difference to a window size of 5 items if you're adding 100 items per millisecond versus one item per minute.

[`movingAverage`](https://clinth.github.io/ixfx/functions/Data.movingAverage.html) takes a parameter for how many items to track. `movingAverage` returns an object to add or clear the moving average.

```js
// repl-pad
import {movingAverage} from 'https://unpkg.com/ixfx/dist/data.js';

// Keep track of the last 10 items
const ma = movingAverage(10);

// Each call to `add` returns the current average
ma.add(10); // 10
ma.add(5);  // 7.5
```

Use `clear` to clear data, or `compute` to calculate the average without adding new data

```js
ma.compute(); // Yields current average
ma.clear();
```


### Exponential weighted moving average

An alternative approach is an _exponential weighted moving average_, which can calculate an average without storing data samples. This is a common technique on microcontrollers. 

It's implemented as [`movingAverageLight`](https://clinth.github.io/ixfx/functions/Data.movingAverageLight.html). Instead of passing the number of samples to record, a _scale_ parameter is used. 1 means the latest value is used - that is, no averaging. Higher numbers blend in the latest value with increasingly lower priority. 3 is the default scaling if the parameter is not provided.

```js
// repl-pad
import { movingAverageLight } from 'https://unpkg.com/ixfx/dist/data.js';

// Init with a scaling of 3
const ma = movingAverageLight(3);
ma.add(10); // 10
ma.add(5); // 7.5
```

### Moving average timed

Consider calculating the average speed of the pointer. Pointer events are tracked, with the distance travelled and elapsed time used to calculate the speed at that instant. The speed is then averaged via `movingAverageLight()`. This is fine while the pointer is moving, but if the pointer stops, there won't be any events. Consequentially, the average won't drop down to zero speed over time because the events are no longer flowing.

One solution to this is using [`Data.movingAverageTimed`](https://clinth.github.io/ixfx/functions/Data.movingAverageTimed.html). This takes in an update rate (milliseconds) and a default value that gets added to the averager. It's based on `movingAverageLight`, so the same _scale_ parameter is there too.

If the interval has elapsed since the last value is added to the averager, it will automatically add the default value. In the case of calculating speed, we might want to automatically add `0`, since the speed must be zero if there are no events.

```js
import { movingAverageTimed } from 'https://unpkg.com/ixfx/dist/data.js';
// movingAverageTimed(updateRateMs, value, scaling): MovingAverage

// Init averager
const avgSpeed = movingAverageTimed(500, 0);

// Based on pointermove, calculate a speed and add to averager
document.addEventListener(`pointermove`, evt => {
  const speed = calcSpeed(evt);
  avgSpeed.add(speed);
});
```

## Case: Averaging complex data

Let us say you want to average more complex data over time, say a rectangle from a machine learning library. The rectangle has _x_, _y_, _width_ and _height_ properties, and each of these we want to average seperately.

To do so, we initialise a moving average for each property, and when new data comes in, update the approprate averager. A cumulative average rectangle is kept track of as well, so elsewhere in the code we can always read the current average.

ixfx's `mapObject` is used to map each property of an empty rectangle (x, y, width & height) to a new moving averager. In this way, `movingAverageRect` becomes a set of automatically-generated moving averagers.

```js
// repl-pad
import { movingAverage } from 'https://unpkg.com/ixfx/dist/data.js';
import { Rects } from 'https://unpkg.com/ixfx/dist/geometry.js';
import { mapObject } from 'https://unpkg.com/ixfx/dist/util.js';

// How many samples to average over for each property
const samples = 10;

// Create an average for each of the rect's properties (x, y, width, height)
const movingAverageRect = mapObject(Rects.empty, v => movingAverage(samples));

// Continually-updated average rectangle
let averageRect = { x: 0, y: 0, width: 0, height: 0};

// Add a new rectangle to be averaged
const add = (r) => {
  const { x, y, width, height } = movingAverageRect;

  // Add each of the properties of the input rectangle 'r'
  // to separate averagers. We then collect all the averages
  // in 'averageRect'
  averageRect = { 
    x: x.add(r.x),
    y: y.add(r.y),
    width: width.add(r.width),
    height: height.add(r.height)};
}

// Add 20 random rectangles
for (let i=0;i<20;i++) add(Rects.random());

// This is the average after 20 random rects...
averageRect;
```

<demo-element title="Moving average pointer" src="/data/moving-average-pointer/" />
