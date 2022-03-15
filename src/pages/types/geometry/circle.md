---
title: Circle
setup: |
  import {Markdown} from 'astro/components';
  import Layout from '../../../layouts/MainLayout.astro';
---

<script type="module" hoist>
import '/src/components/ReplPad';
</script>

A circle.

* [Online geometry demos](https://clinth.github.io/ixfx-demos/geometry/), 
* [API Docs: Geometry.Circles](https://clinth.github.io/ixfx/modules/Geometry.Circles.html)

## Type

```typescript
type Circle = {
  radius: number
}

const c = { radius: 100 };
```

`CirclePositioned` also includes `x` and `y` fields.

```js
const c = { radius: 100, x: 50, y: 50 };
```

## Geometry

Get the [points](./point) of intersection between a line and circle. 

```js
// repl-pad
import { Circles } from "https://unpkg.com/ixfx/dist/geometry.js"
const circle = { radius: 10, x: 100, y: 100};
const line = {a: {x: 0, y: 0}, b: { x: 100, y: 100 } };
// returns [ {x,y} ... ]
//  - could be empty for no intersections
//  - or 1 to 2 points
const pts = Circles.intersectionLine(circle, line);
```

Get the points of intersection between two circles.

```js
const pts = Circles.intersections(circleA, circleB);
// pts will be empty if there are no intersections
//  this can also be the case if circles are identical, or one completely encloses the other
```

Check whether `circleB` is completely contained by `circleA`:

```js
Circles.isContainedBy(circleA, circleB); // boolean
```

## Conversions

Return a [Path](path) instance, which wraps up some functions together with the circle:

```js
// repl-pad#1
import { Circles } from "https://unpkg.com/ixfx/dist/geometry.js"
const circle = { radius: 10, x: 100, y: 100};

const p = Circles.toPath(circle);
p.length();           // Perimeter of cicle (number)
p.bbox();             // Bounding box of circle as Rectangle {x,y,width,height}
p.interpolate(0.5);   // Point on circle as {x,y}
p.toString();         // String representation of circle
```

## Helper functions

Get the x,y coordinate of a point at specified angle

```js
// repl-pad#1
// Circles.point(circle, angleRadian, origin?):Point
const ptA = Circles.point(circle, Math.PI); // {x,y}
```

Get the x,y coordinate at a relative distance along circle

```js
// repl-pad#1
// Get x,y at 50% along circle
const ptB = Circles.interpolate(circle, 0.75); // {x,y}
```

Equality

```js
// Returns true if `a` and `b` circles have the same value
Circles.isEqual(a, b);
```

Dimensions/distances

```js
// repl-pad#1
Circles.bbox(circle);   // Get a rectangle that encompasses circle {x,y,width,height}
Circles.length(circle); // Get the perimeter of circle (number)

Circles.distanceCenter(circle, {x: 50, y: 50}); // Distance between the centers of two circle (number) 
```