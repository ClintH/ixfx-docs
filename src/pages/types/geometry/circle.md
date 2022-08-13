---
title: Circle
setup: |
  import {Markdown} from 'astro/components';
  import Layout from '../../../layouts/MainLayout.astro';
---

<script type="module" hoist>
import '/src/components/ReplPad';
</script>

<div class="tip">
<ul>
<li>Demos <a href="https://clinth.github.io/ixfx-demos/geometry/">Geometry</a> (<a href="https://github.com/ClintH/ixfx-demos/tree/main/geometry">source</a>)</li>
<li>API Reference <a href="https://clinth.github.io/ixfx/modules/Geometry.Circles.html">Geometry.Circles module</a></li>
</div>

A circle.

The ixfx circle is described at the least by its radius:

```typescript
type Circle = {
  radius: number
}

// eg:
const c = { radius: 100 };
```

A circle is said to be _positioned_ if it also includes `x` and `y` fields.

```typescript
type CirclePositioned = {
  radius: number,
  x: number,
  y: number
}

const c = { radius: 100, x: 50, y: 50 };
```

If a circle is positioned, it can be used with any of the [Point](../point/) functions as well.

## Intersection

Get the [points](../point/) of intersection between a line and circle with [`intersectionLine`](https://clinth.github.io/ixfx/functions/Geometry.Circles.intersectionLine.html). It returns an array of zero to three points, depending on the geometry.

```js
// repl-pad
import { Circles } from "https://unpkg.com/ixfx/dist/geometry.js"

// Circle and line to check
const circle = { radius: 10, x: 100, y: 100};
const line = {a: {x: 0, y: 0}, b: { x: 100, y: 100 } };

const pts = Circles.intersectionLine(circle, line);
```

Get the points of intersection between two circles with [`intersections`](https://clinth.github.io/ixfx/functions/Geometry.Circles.intersections.html)

```js
const pts = Circles.intersections(circleA, circleB);
// pts will be empty if there are no intersections
//  this can also be the case if circles are identical, or one completely encloses the other
```

See also:
* [`isIntersecting`](https://clinth.github.io/ixfx/functions/Geometry.Circles.isIntersecting.html): _true_ if two circles are overlapping or identical

## Area

[`bbox`](https://clinth.github.io/ixfx/functions/Geometry.Circles.bbox.html) yields a rectangle that encompasses the circle.

```js
// repl-pad#1
import { Circles } from "https://unpkg.com/ixfx/dist/geometry.js"
const circle = { radius: 10, x: 100, y: 100};

// Yields: { x, y, width, height }
Circles.bbox(circle);   
``` 

[`area`](https://clinth.github.io/ixfx/functions/Geometry.Circles.area.html) computes the area of a circle.

```js
// repl-pad#1
Circles.area(circle);
```


## Relating circles

Check whether `circleB` is completely contained by `circleA` with [`isContainedBy`](https://clinth.github.io/ixfx/functions/Geometry.Circles.isContainedBy.html). [`isIntersecting`](https://clinth.github.io/ixfx/functions/Geometry.Circles.isIntersecting.html) returns _true_ if two circles are overlapping or identical.

```js
// repl-pad#3
import { Circles } from "https://unpkg.com/ixfx/dist/geometry.js"

const circleA = { radius: 10, x: 100, y: 100};
const circleB = { radius: 10, x: 150, y: 100};

// Yields: true/false
Circles.isContainedBy(circleA, circleB);
Circles.isIntersecting(circleA, circleB);
```

[`distanceCenter`](https://clinth.github.io/ixfx/functions/Geometry.Circles.distanceCenter.html) returns the distance between two circles' centers. This requires that both circles are positioned. [`distanceFromExterior`](https://clinth.github.io/ixfx/functions/Geometry.Circles.distanceFromExterior.html) returns the distance between the perimeter of two circles.

```js
// repl-pad#3
const toCenter = Circles.distanceCenter(circleA, circleB);
const toExterior = Circles.distanceFromExterior(circleA, circleB);
```

## Interpolate & point by angle

Get the _x,y_ coordinate of a point on the perimeter of the circle at specified angle (in radians) with [`point`](https://clinth.github.io/ixfx/functions/Geometry.Circles.point.html).

```js
// repl-pad#2
import { Circles } from "https://unpkg.com/ixfx/dist/geometry.js"
const circle = { radius: 10, x: 100, y: 100};

// Circles.point(circle, angleRadian, origin?):Point
const ptA = Circles.point(circle, Math.PI); // {x,y}
```

Get the x,y coordinate at a relative distance along circle

```js
// repl-pad#2
// Get x,y at 75% along circle
const ptB = Circles.interpolate(circle, 0.75); // {x,y}
```

## Comparison

Equality

```js
// Returns true if `a` and `b` circles have the same value
Circles.isEqual(a, b);
```

