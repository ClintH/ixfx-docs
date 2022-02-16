---
  title: Point
  setup: |
    import {Markdown} from 'astro/components';
    import Layout from '../../layouts/MainLayout.astro';
---

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
import { Points } from "https://unpkg.com/ixfx/geometry.js"

const a = {x: 10, y: 10};
const b = {x: 20, y: 20};

// Calculates distance between point a and b
const distance = Points.distance(a, b); // Returns a number
```

Calculate an in-between point with `interpolate`

```js
// Calculate a Point between `a` and `b` using a relative 
// progress amount (0 -> 1). 0 = a, 0.5 = halfway between
// the two, 1 = b, and so on.
const p = Points.interpolate(0.5, a, b); // Returns {x,y}
```

Calculates a rectangle which encompasses all the provided points
```js
const points = [a, b];
const rect = Points.bbox(...points);  // returns {x,y,width,height}
```

## Conversions

Converting a Point _to_ some other shape of data

```js
import { Points } from "https://unpkg.com/ixfx/geometry.js"
const p = {x: 5, y: 10};

// To an array [x, y]
Points.toArray(p); // [5, 10]

// Human-readable representation:
Points.toString(p); // "(5, 5)"
```

Converting _from_ some other shape of data to Point

```js
// Convert from two numeric parameters
Points.from(10, 15);    // { x: 10, y: 15}

// Convert from an array
Points.from([10, 15]);  // {x: 10, y: 15}

// Convert an array of arrays
Points.fromNumbers([ [10, 15], [5, 5]]); // [{x:10, y:15}, {x:5, y:5}]
```

## Helper functions

`findMinimum` allows you to compare an array of points, keeping the one which satisfies the provided comparer function over all others.

Example:

```js
import { Points } from "https://unpkg.com/ixfx/geometry.js"

// Find the point closest to the {x:100, y:100}
const points = [/* ... points ... */];
const center = {x: 100, y: 100};

// closestToCenter will be a Point {x,y}
const closestToCenter = findMinimum((a, b) => {
  const aDist = distance(a, center);
  const bDist = distance(b, center);

  // Returns `a` if its distance is less than `b`
  //  or otherwise returns `b`
  return (aDistance < bDistance) ? a : b;
}, points);
```

### Math

```js
// Returns {x,y} of a * b
Points.multiply(a, b);

// Returns {x,y} of a, with a.x * 2 and a.y * 0.5
Points.multiply(a, 2, 0.5);

// Returns {x,y} of a + b
Points.sum(a, b);

// Returns {x,y} of a - b;
Points.subtract(a, b);
```