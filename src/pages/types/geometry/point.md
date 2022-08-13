---
  title: Point
  layout: ../../../layouts/MainLayout.astro
  setup: |
    import { DemoElement } from '../../../components/DemoElement.ts';
---

<script type="module" hoist>
import '/src/components/ReplPad';
</script>

<div class="tip">
<ul>
<li>Demos <a href="https://clinth.github.io/ixfx-demos/geometry/">Geometry</a> (<a href="https://github.com/ClintH/ixfx-demos/tree/main/geometry">source</a>)</li>
<li>API Reference <a href="https://clinth.github.io/ixfx/modules/Geometry.Points.html">Geometry.Points module</a></li>
</div>

A point is an `x` and `y` [Cartesian coordinate](../units/#cartesian); the basic building block for [lines](../line/), [arcs](../arc/), [rectangles](../rect/) and paths.

```js
// A point at (100, 200)
const p = {x: 100, y: 200};
```

There's no defined unit for `x` and `y`, but pixel coordinates are typical.

## Distance and angles

Calculate distance between two points with [`distance`](https://clinth.github.io/ixfx/modules/Geometry.Points.html#distance).

```js
// repl-pad
import { Points, radianToDegree} from "https://unpkg.com/ixfx/dist/geometry.js"

const a = {x: 10, y: 10};
const b = {x: 20, y: 20};

// Calculates distance between point a and b
const distance = Points.distance(a, b); // Returns a number

// Calculate angle in radians between points a and b
const angleRad = Points.angle(a, b);
const angleDeg = radianToDegree(angleRad);
```

In the example below, [normalised](#normalised-points) points are used for the distance calculation, so a distance value of 0.5 means 50% of the screen width/height away from the middle.

<demo-element title="Point math" src="/geometry/point-math/" />

### Relation

[`relation`](https://clinth.github.io/ixfx/functions/Geometry.Points.relation.html) helps tracking the relation between two points. This is particularly useful for working with pointer events. For example, in a `pointermove` handler, perhaps we don't care about the absolute pointer coordinate, what we really care about is the distance from where the `pointerdown` event first happened. i.e, the change.

Call `relation` to initialise the tracker, giving the reference point:

```js
import { Points } from "https://unpkg.com/ixfx/dist/geometry.js";
const tracker = Points.relation({ x: 100, y:100 });
```

After that, call the returned function (here assigned to `tracker`) to compute the relation of any other point to the reference point:

```js
// Compare 50,50 to 100,100
const result = tracker({ x: 50, y: 50 });
```

The result contains the properties _angle_ (in radians), _distance_, _centroid_ (a Point), and _average_ (a Point). _centroid_ is the middle point between the reference and current point. _average_ is an average of the _x_ and _y_ values of all points passed to the tracker function.

```js
import { Points } from "https://unpkg.com/ixfx/dist/geometry.js";

let tracker = null;

// Start tracking on pointer down
document.addEventListener(`pointerdown`, evt => {
  tracker = Points.relation(evt);
});

// Use tracker when a move happens
document.addEventListener(`pointermove`, evt => {
  if (!t) return; // Didn't start tracking

  // Compare to the point recorded in `pointerdown`
  const r = tracker(evt);
  console.log(`Distance from start: ${r.distance}`);
});

// Forget about tracker when pointer is up
document.addEventListener(`pointerup`, evt => {
  tracker = null;
});
```

<demo-element title="Point relation" src="/geometry/point-relation/" />

### See also

* [`distanceToExterior`](https://clinth.github.io/ixfx/functions/Geometry.Points.distanceToExterior.html): distance to the exterior of a basic shape
* [`distanceToCenter`](https://clinth.github.io/ixfx/functions/Geometry.Points.distanceToCenter.html): distance to the center of a basic shape

## Interpolation

Calculate an in-between point with [`interpolate`](https://clinth.github.io/ixfx/modules/Geometry.Points.html#interpolate). Interpolate can be useful for smoothly moving to a destination, as seen in the demo below.

<demo-element title="Point interpolation" src="/geometry/point-interpolate/" />

Interpolation is between two points, _a_ and _b_. An interpolation amount of 0 means the value of point _a_ and an amount of 1 means the value of _b_. Anywhere in between is a mix, eg 0.5 is in the middle, 0.8 is mostly close to _b_, 0.2 is mostly close to _a_ and so on.

```js
// repl-pad#1
import { Points, radianToDegree} from "https://unpkg.com/ixfx/dist/geometry.js"
const a = {x: 10, y: 10};
const b = {x: 20, y: 20};

// Calculate a Point between `a` and `b` using a relative 
// progress amount (0 -> 1). 
const p = Points.interpolate(0.5, a, b); // Returns {x,y}
```

By default, an interpolation amount outside of the 0..1 range throws an error. However, if _true_ is passed in as a fourth argument, it will allow overflowing. Eg, a value of -0.5 would start halfway behind the _a->b_ line. Or a value of 2 would be past _b_ at a distance of the line. 

## Areas

Calculates a rectangle which encompasses all the provided points with [`bbox`](https://clinth.github.io/ixfx/modules/Geometry.Points.html#bbox). It returns a [Rectangle](../rect/), with _x, y, width_ and _height_ properties.

```js
// repl-pad#1
const points = [a, b];
const rect = Points.bbox(...points); 
```

The [convex hull] is set of points which can minimally enclose a larger set. In other words, if we have a set of scattered points, the convex hull is the list of points which defines the outer edge of all these points.

ixfx has a simple [`convexHull`](https://clinth.github.io/ixfx/functions/Geometry.Points.convexHull.html) implementation

```js
const pointsToContain = [ /* some array of points */ ];
const pts = Points.convexHull(...pointsToContain);
// pts is the outer set of points
``` 

<demo-element title="Centroid and Convex Hull" src="/geometry/point-centroid-hull/" />

[`centroid`](https://clinth.github.io/ixfx/functions/Geometry.Points.centroid.html) calculates a sort of center of a given set of points.

```js
const pts = [ /* some array of points */ ];
const c = Points.centroid(...pts);
// c is x,y centroid.
```

[`leftmost`](https://clinth.github.io/ixfx/functions/Geometry.Points.leftmost.html)/[`rightmost`](https://clinth.github.io/ixfx/functions/Geometry.Points.rightmost.html) returns the most left/right point of a set of points.

## Rotation & Translation

Rotate a point around a given point with [`rotate`](https://clinth.github.io/ixfx/modules/Geometry.Points.html#rotate)

```js
// repl-pad
import { Points, degreeToRadian } from "https://unpkg.com/ixfx/dist/geometry.js"

// Rotate 10,10 by Math.PI/2 radians around the origin of 0,0
const p = Points.rotate({x:10,y:10}, Math.PI/2, {x:0, y:0});

// Rotate 10,10 by 15 degrees around the origin of 0,0
const pp = Points.rotate({x:10,y:10}, degreeToRadian(15), {x:0, y:0});
```

[`project`](https://clinth.github.io/ixfx/functions/Geometry.Points.project.html) yields a point at a specified distance and angle from an origin point.

```js
// repl-pad
import { Points, degreeToRadian } from "https://unpkg.com/ixfx/dist/geometry.js"
const origin = { x: 100, y: 100 };

// 100 units away @ 10 degrees
Points.project(origin, 100, degreeToRadian(10));
```

## Conversions

Converting a Point _to_ some other shape of data

```js
// repl-pad
import { Points } from "https://unpkg.com/ixfx/dist/geometry.js"
const p = { x: 5, y: 10 };

// To an array [x, y]
Points.toArray(p); // [5, 10]

// Human-readable representation:
Points.toString(p); // "(5, 10)"

// Round x and y
Points.toIntegerValues({ x: 5.5, y: 10.5 }); // {x: 6, y: 11 }
```

Converting _from_ some other shape of data to Point

```js
// repl-pad
import { Points } from "https://unpkg.com/ixfx/dist/geometry.js"
// Convert from two numeric parameters
Points.from(10, 15);    // { x: 10, y: 15}

// Convert from an array
Points.from([10, 15]);  // {x: 10, y: 15}

// Convert an array of arrays
Points.fromNumbers([ [10, 15], [5, 5]]); // [{x:10, y:15}, {x:5, y:5}]
```

## Normalise

It's often useful to work with [normalised](../../data/normalising/) points. Thus a point of `{x:0.5, y:0.5}` would mean 50% x, and 50% y. See the discussion on [normalising points](../../data/normalising/#geometry) for more on this.

In short, you can normalise point using `Points.divide`:

```js
// repl-pad#2
import { Points } from "https://unpkg.com/ixfx/dist/geometry.js"
const pt = { x: 500, y: 500 };

// Normalise `pt` by viewport size,
// yielding a point on 0..1 scale.
Points.divide(pt, window.innerWidth, window.innerHeight);

// In principle it might exceed 0..1 range, so it may need to be clamped, too:
Points.clamp(Points.divide(pt, window.innerWidth, window.innerHeight));
```

To apply a normalised point to some destination range, use `Points.multiply`

```js
// repl-pad#2
// Maps a relative point to viewport size
Points.multiply(pt, window.innerWidth, window.innerHeight);
```

`clamp` locks x,y to a minimum and maximum, by default 0..1:

```js
// repl-pad
import { Points } from "https://unpkg.com/ixfx/dist/geometry.js"
Points.clamp({ x:2,   y:2 });      // { x:1.0, y:1.0 }
Points.clamp({ x:0.5, y:0.5 });    // { x:0.5, y:0.5 }
```

## Random

[`random`](https://clinth.github.io/ixfx/functions/Geometry.Points.random.html) creates a random point, by default on a normalised 0..1 scale:

```js
// repl-pad
import { Points } from "https://unpkg.com/ixfx/dist/geometry.js";
const pt = Points.random();
```

A custom random source can be provided to skew values:

```js
// repl-pad
import { Points } from "https://unpkg.com/ixfx/dist/geometry.js";
import { weightedSkewed } from "https://unpkg.com/ixfx/dist/random.js";
const pt = Points.random(weightedSkewed(`quadIn`));
```

## Applying functions

[`apply`](https://clinth.github.io/ixfx/modules/Geometry.Points.html#apply) returns a point with a given function applied to both `x` and `y` fields:

```js
// repl-pad
import { Points } from "https://unpkg.com/ixfx/dist/geometry.js"
const p = {x:100.1234, y:100.1234};

// Adds 10 to both x and y
Points.apply(p, v => v + 10);

// Rounds the fields
Points.apply(p, Math.round);
```

[`pipeline`](https://clinth.github.io/ixfx/functions/Geometry.Points.pipeline.html) creates a reusable function which applies a series of transformations to a point.

In the below example, a point will be normalised, and then inverted.

```js
// repl-pad#3
import { Points } from "https://unpkg.com/ixfx/dist/geometry.js"

const somePoint = { x: 1.2, y: 3.4 };

// Create pipeline
const p = Points.pipeline(Points.normalise, Points.invert);

// Run pipeline on `somePoint`
const changedPoint = p(somePoint); 
```

If a reusable pipeline is not needed, use [`pipelineApply`](https://clinth.github.io/ixfx/functions/Geometry.Points.pipelineApply.html) instead. This takes a point as a first parameter, and a series of operations as subsequent parameters:

```js
// repl-pad#3
const changedPoint = Points.pipelineApply(somePoint, Points.normalise, Points.invert);
```

[`reduce`](https://clinth.github.io/ixfx/functions/Geometry.Points.reduce.html) works like the usual Javascript `reduce` function:

```js
// Sum x and y values separately
const total = Points.reduce(points, (p, acc) => ({x: p.x + acc.x, y: p.y + acc.y})
);
// total.x / total.y
```

## Math operations

```js
// repl-pad
import { Points } from "https://unpkg.com/ixfx/dist/geometry.js"
const a = {x: 10, y: 10};
const b = {x: 20, y: 20};

// Returns {x,y} of a * b
Points.multiply(a, b);

// Returns {x,y} of a, with a.x * 2 and a.y * 0.5
Points.multiply(a, 2, 0.5);

// Returns {x,y} of a / b
Points.divide(a, b);

// Returns {x,y} of a, with a.x / 2 and a.y / 0.5
Points.divide(a, 2, 0.5);

// Returns {x,y} of a + b
Points.sum(a, b);

// Returns {x,y} of a - b;
Points.subtract(a, b);
```

[`invert`](https://clinth.github.io/ixfx/functions/Geometry.Points.invert.html) flips one or more axis of a point. By default, both.

```js
const a = { x: 20, y: 10 };

// Returns { x: -20, y: -10 } 
Points.invert(a);

// Returns { x: -20, y: 10
Points.invert(a, `x`);
```

## Comparisons

[`compare`](https://clinth.github.io/ixfx/functions/Geometry.Points.compare.html) returns:
* -1 if either _x_ or _y_ of point `a` is _less_ than what `b` has
* 0 if _x_ and _y_ for `a` and `b` are identical
* 1 if either _x_ or _y_ of point `a` is _greater_ than what `b` has

```js
// Returns 0, both points are equal
Points.compare({ x: 10, y: 10 }, { x: 10, y: 10 });

// Returns -1, a.y is less than b.y
Points.compare({ x: 10, y: 10 }, { x: 10, y: 20 });

// Returns 1, a.x is greater than b.x
Points.compare({ x: 10, y: 10 }, { x: 9, y: 10 });
```

[`isEqual`](https://clinth.github.io/ixfx/functions/Geometry.Points.isEqual.html) returns _true_ if points have the same value:

```js
const a = { x: 10, y: 10 };
const b = { x: 10, y: 10 };
a === b; // false, because identity of objects is different
Points.isEqual(a, b); // true, because values are the same
```

Note that additional properties of the the points are not compared, only the _x_, _y_ (and optional _z_).

More checks:
* [`isNull`](https://clinth.github.io/ixfx/functions/Geometry.Points.isNull.html) returns true if _x_ and _y_ are _null_
* [`isEmpty`](https://clinth.github.io/ixfx/functions/Geometry.Points.isEmpty.html) returns true if _x_ and _y_ are 0. Use `Points.Empty` to create an empty point.
* [`isPlaceholder`](https://clinth.github.io/ixfx/functions/Geometry.Points.isPlaceholder.html) returns _true_ if both _x_ and _y_ are _NaN_. Use `Points.Placeholder` to create a placeholder point.
* [`isPoint`](https://clinth.github.io/ixfx/functions/Geometry.Points.isPoint.html) returns _true_ if the passed object has at least _x_ and _y_ properties.

[`findMinimum`](https://clinth.github.io/ixfx/modules/Geometry.Points.html#findMinimum) allows you to compare an array of points, keeping the one which satisfies the provided comparer function over all others.

Example:

```js
import { Points } from "https://unpkg.com/ixfx/dist/geometry.js"

// Find the point closest to the {x:100, y:100}
const points = [/* ... points ... */];
const center = {x: 100, y: 100};

// closestToCenter will be a Point {x,y}
const closestToCenter = Points.findMinimum((a, b) => {
  const aDist = distance(a, center);
  const bDist = distance(b, center);

  // Returns `a` if its distance is less than `b`
  //  or otherwise returns `b`
  return (aDistance < bDistance) ? a : b;
}, points);
```