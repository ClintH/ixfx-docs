---
  title: Point
  layout: ../../../layouts/MainLayout.astro
  setup: |
    import { DemoElement } from '../../../components/DemoElement.ts';
---

<script type="module" hoist>
import '/src/components/ReplPad';
</script>

A point is an `x` and `y` [Cartesian coordinate](./units#cartesian); the basic building block for lines, [arcs](./arc), rectangles and paths.

* [Online geometry demos](https://clinth.github.io/ixfx-demos/geometry/)
* [Units](./units): Cartesian space
* [API Docs: Geometry.Points module](https://clinth.github.io/ixfx/modules/Geometry.Points.html)

```js
// A point at (100, 200)
const p = {x: 100, y: 200};
```

There's no defined unit for `x` and `y`, but pixel coordinates are typical.

## Distance and geometry

Calculate distance between two points

```js
// repl-pad#1
import { Points, radianToDegree} from "https://unpkg.com/ixfx/dist/geometry.js"

const a = {x: 10, y: 10};
const b = {x: 20, y: 20};

// Calculates distance between point a and b
const distance = Points.distance(a, b); // Returns a number

// Calculate angle between point a and b
const angle = Points.angle(a, b); // Returns angle in radians
const angleDeg = radianToDegree(angle);
```

In the example below, [normalised](#normalised-points) points are used for the distance calculation, so a distance value of 0.5 means 50% of the screen width/height away from the middle.

<demo-element title="Point math" src="/geometry/point-math/" />

Calculate an in-between point with `interpolate`. Interpolate can be useful for smoothly moving to a destination, as seen in the demo below.

<demo-element title="Point interpolation" src="/geometry/point-interpolate/" />

```js
// repl-pad#1
// Calculate a Point between `a` and `b` using a relative 
// progress amount (0 -> 1). 0 = a, 0.5 = halfway between
// the two, 1 = b, and so on.
const p = Points.interpolate(0.5, a, b); // Returns {x,y}
```

Calculates a rectangle which encompasses all the provided points
```js
// repl-pad#1
const points = [a, b];
const rect = Points.bbox(...points);  // returns {x,y,width,height}
```

## Conversions

Converting a Point _to_ some other shape of data

```js
// repl-pad
import { Points } from "https://unpkg.com/ixfx/dist/geometry.js"
const p = {x: 5, y: 10};

// To an array [x, y]
Points.toArray(p); // [5, 10]

// Human-readable representation:
Points.toString(p); // "(5, 10)"
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

## Normalised points

It's often useful to work with [normalised](../../temporal/normalising) points. Thus a point of `{x:0.5, y:0.5}` would mean 50% x, and 50% y. See the discussion on [normalising points](../../temporal/normalising#geometry) for more on this.

In short, you can normalise point using `Points.divide`:

```js
// Normalise `pt` by viewport size,
// yielding a point on 0..1 scale.
Points.divide(pt, window.innerWidth, window.innerHeight);

// In principle it might exceed 0..1 range, so it may need to be clamped, too:
Points.clamp(Points.divide(pt, window.innerWidth, window.innerHeight));
```

To apply a normalised point to some destination range, use `Points.multiply`

```js
// Maps a relative point to viewport size
Points.multiply(pt, window.innerWidth, window.innerHeight);
```

## Helper functions

`findMinimum` allows you to compare an array of points, keeping the one which satisfies the provided comparer function over all others.

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

`clamp` locks x,y to a minimum and maximum, by default 0..1:
```js
Points.clamp({x:2,y:2});      // {x:1.0, y:1.0}
Points.clamp({x:0.5, y:0.5}); // {x:0.5, y:0.5}
```

### Math operations

```js
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