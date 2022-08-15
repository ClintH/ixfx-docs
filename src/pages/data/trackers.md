---
title: Trackers
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
<li>Related: <a href="../frequency/">FrequencyMutable</a>: tracks 'seen' values</li>
</div>

The ixfx suite of trackers are meant for streams of data. In their simplest usage, they can keep track of the range of data. In more advanced usage, they are helpful in comparing some start value to a current value.

## Numbers

[`numberTracker`](https://clinth.github.io/ixfx/functions/Data.numberTracker.html) keeps track of the minimum, maximum and average of a stream of numbers, without storing them.

```js
// repl-pad
import { numberTracker } from 'https://unpkg.com/ixfx/dist/data.js';

// Initialise
const t = numberTracker();

// Add some random values
for (let i=0;i<10;i++) t.seen(Math.floor(Math.random()*100)));

// Get computed values
t.avg
t.min
t.total
```

An example usage might be to track the range of a sensor over time.

See also:
* [`numberTracker` API docs](https://clinth.github.io/ixfx/functions/Data.numberTracker.html) for more
* The [pointer scale demo](https://clinth.github.io/ixfx-demos/io/pointer/scale/) ([source](https://github.com/ClintH/ixfx-demos/tree/main/io/pointer/scale)) uses `numberTracker` and `pointsTracker`.

## Intervals

[`intervalTracker`](https://clinth.github.io/ixfx/functions/Data.intervalTracker.html) tracks time intervals.

This is useful when you're interested in the period or frequency of events rather than event data itself.

Once initialised, call `mark` on the returned object to capture the elapsed time.

```js
import { intervalTracker } from 'https://unpkg.com/ixfx/dist/data.js';

// Initialise
const t = intervalTracker();

// Call `mark` to record the interval since last `mark` (or init)
t.mark();
...
t.mark();

// Get average time (in millis) between calls
t.avg;
```

For example, to figure how quickly the pointer is being clicked:

```js
// repl-pad
import { intervalTracker } from 'https://unpkg.com/ixfx/dist/data.js';
const clickInterval = intervalTracker();

document.addEventListener(`click`, evt => {
  clickInterval.mark();
  console.log(`Average interval: ${clickInterval.avg}`);
});
```

See also:
* [`intervalTracker` API docs](https://clinth.github.io/ixfx/functions/Data.intervalTracker.html)
* [typer demo](https://clinth.github.io/ixfx-demos/io/keyboard/typer/) ([source](https://github.com/ClintH/ixfx-demos/tree/main/io/keyboard/typer)) uses `intervalTracker` to work with typing speed

## Point

Tracking a _x, y_ [Point](../../types/geometry/point/) over time is common for working with gestures - be it touch gestures on a screen, or movements of limbs in space.

<demo-element title="Point tracking playground" src="/playgrounds/data/point-tracker/" />

[`pointTracker`](https://clinth.github.io/ixfx/functions/Data.pointTracker.html) keeps track of a single point.

```js
import { pointTracker } from 'https://unpkg.com/ixfx/dist/data.js';

const t = pointTracker();

const info = t.seen({ x: 10, y: 20 });
```

After adding a point via `seen`, you get back a collection of useful data.

```js
{ fromInitial, fromLast, values }
```

`values` is a set of all the recorded points.

`fromInitial` and `fromLast` yield the relation between the very first seen point and the last point. For both of these, you get:

```typescript
{
  speed: number     // units/ms
  angle: number     // in radians
  distance: number
  average: Point    // average of all points
  centroid: Point
  distance: number
}
```

In the example below, we start tracking when the pointer is down and add points when there is a pointer move event.

```js
import { pointTracker } from 'https://unpkg.com/ixfx/dist/data.js';

let tracker = null;

document.addEventListener(`pointerdown`, evt => {
  // Init new tracker
  tracker = pointTracker();
  tracker.seen({ x: evt.x, y: evt.y });
});

document.addEventListener(`pointermove`, evt => {
  if (!tracker) return;
  const info = tracker.seen({x: evt.x, y: evt.y });
  
  console.log(`Angle from start: ${info.fromInitial.angle}`);
});
```

To get the last result without adding anything:

```js
const nfo = tracker.lastResult;
```

There are a few helper functions on the tracker:

```js
// Distance & angle from initial point
tracker.distanceFromStart();  // number
tracker.angleFromStart();     // number (radians)

// Latest point subtracted from initial point
tracker.difference(); // { x, y }
```

## Points

[`pointsTracker`](https://clinth.github.io/ixfx/functions/Data.pointsTracker.html) is uber-version of `pointTracker`, helping with all plumbing for keeping track of several named points. This works well for multi-touch gestures, or tracking several body parts via Tensorflow.

Once initialised, call `seen` with the id of the point, and the point:

```js
import { pointsTracker } from 'https://unpkg.com/ixfx/dist/data.js';

const t = pointsTracker();
t.seen(`nose`, pose[`nose`]);
```

Eg: 

```js
import { pointsTracker } from 'https://unpkg.com/ixfx/dist/data.js';

const t = pointsTracker();

// Track a point by its id
document.addEventListener(`pointermove`, e => {
 const info = await pt.seen(e.pointerId, { x: e.x, y: e.y });
})
```

Note that `seen` is an async function, so `await` needs to be used if you want the result.

To get data:

```js
t.last();      // Iterate last seen {x,y} for each named point
t.ids();       // Iterate over point names
t.has(`nose`); // true if point has been seen
```

Under-the-hood, it automatically creates a `pointTracker` for each named point. This can be retrieved using `t.get(id)`:

```js
// Get the point tracker for this named point
const noseValue = t.get(`nose`);
noseValue.last;     // Last seen { x, y }
noseValue.initial;  // Initial { x, y }
noseValue.elapsed;  // milliseconds since first seen
noseValue.reset();  // reset this named point    
```

See also:
* [`pointsTracker` API docs](https://clinth.github.io/ixfx/functions/Data.pointsTracker.html) for more on the tracker, including sorting points by when they were recently updated.
* The [pointer scale demo](https://clinth.github.io/ixfx-demos/io/pointer/scale/) ([source](https://github.com/ClintH/ixfx-demos/tree/main/io/pointer/scale)) uses `numberTracker` and `pointsTracker`.


## Trackers in general

All the trackers can take some options. Eg, creating a `numberTracker` with a string id of `someTracker`, have it automatically reset every 10 samples, and to store these values:

```js
import { numberTracker } from 'https://unpkg.com/ixfx/dist/data.js';

const t = numberTracker(`someTracker`, {
  resetAfterSamples: 10,
  storeIntermediate: true
});
```