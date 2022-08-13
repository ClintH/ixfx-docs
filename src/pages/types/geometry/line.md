---
title: Line
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
<li>API Reference <a href="https://clinth.github.io/ixfx/modules/Geometry.Lines.html">Geometry.Lines module</a></li>
</div>

A line is defined by two [Points](../point/)

```typescript
type Line = {
  a: Point,
  b: Point
}
```

For example:
```js
// Line from 0,0 to 200,200
const line = {
  a: {x: 0,   y:0 },
  b: {x: 200, y:200 }
}
```

## Initialising

Lines can be defined with both `a` and `b` fields as shown above. Alternatively, functions can initialise a line for you:

```js
// repl-pad#1
import { Lines } from "https://unpkg.com/ixfx/dist/geometry.js"

// fromFlatArray([x1,y1,x2,y])
const a = Lines.fromFlatArray([0, 0, 200, 200]);

// fromNumbers(x1,y1,x2,y2)
const b = Lines.fromNumbers(0, 0, 200, 200);

// fromPoints(a:Point, a:Point)
const c = Lines.fromPoints({ x:0, y:0 }, { x:200, y:200 });
```

## Interpolation

[`interpolate`](https://clinth.github.io/ixfx/functions/Geometry.Lines.interpolate.html) allows you to calculate a point between the _a_ and _b_ points (start and end) of a line. The interpolation is based on a percentage. 0 being the beginning of the line, 0.5 being halfway between the start and end, and 1 at the end.

```js
// repl-pad
import { Lines } from 'https://unpkg.com/ixfx/dist/geometry.js'

const line = Lines.fromNumbers(0, 0, 200, 200);

// Get { x, y } at 50% along line
Lines.interpolate(0.5, line);

// Get {x,y} at 80% between point A and B
Lines.interpolate(0.8, { x:0, y:0 }, { x:200, y:200 });
```

## Angles

[Slope (gradient)](https://en.wikipedia.org/wiki/Slope) of line with [`slope`](https://clinth.github.io/ixfx/modules/Geometry.Lines.html#slope).

```js
// repl-pad#3
import { Lines, degreeToRadian } from "https://unpkg.com/ixfx/dist/geometry.js";

// Create line 0,0 -> 200,200
const line = Lines.fromNumbers(0,0,200,200);

// Returns number
Lines.slope(line);
Lines.slope({x:10,y:10}, {x:20,y:20}); // Provide two points intead
```

Angle in radians of line to a point

```js
// repl-pad#3
// Returns angle of line, in radians
Lines.angleRadian(line);
```

Return a rotated line with [`rotate`](https://clinth.github.io/ixfx/modules/Geometry.Lines.html#rotate).

<demo-element title="Point math" src="/geometry/line-math/" />

## Length & distances

Length of the line can be calculated with [`length`](https://clinth.github.io/ixfx/modules/Geometry.Lines.html#length).

```js
// repl-pad#2
import { Lines } from "https://unpkg.com/ixfx/dist/geometry.js"
const line = Lines.fromNumbers(0,0,200,200);
const length = Lines.length(line); // Returns number
```

Relation of line to a point: [`distance`](https://clinth.github.io/ixfx/modules/Geometry.Lines.html#distance) and [`nearest`](https://clinth.github.io/ixfx/modules/Geometry.Lines.html#nearest)

```js
// repl-pad#2
// Closest distance of point to anywhere on a line
// returns number
Lines.distance(line, {x:150, y:200});

// Get the closest position on a line to some other point
// returns {x,y}
Lines.nearest(line, {x:150, y:200});
```

Is a point within range of line?

```js
// repl-pad#2
// True if 150,150 is within 100 distance of line
Lines.withinRange(line, {x:150,y:150}, 100);
```

See also:
* [`midpoint`](https://clinth.github.io/ixfx/functions/Geometry.Lines.midpoint.html)

## Areas

Calculates a rectangle that encompasses line.

```js
// repl-pad
import { Lines } from "https://unpkg.com/ixfx/dist/geometry.js";

// Returns Rectangle { x, y, width, height }
const line = {
  a: { x: 0,   y: 0   },
  b: { x: 200, y: 200 }
}
const rect = Lines.bbox(line);
```

## Transforming

[`rotate`](https://clinth.github.io/ixfx/functions/Geometry.Lines.rotate.html) can, well, rotate a line.

```js
// repl-pad
import { Lines } from 'https://unpkg.com/ixfx/dist/geometry.js'

const line = Lines.fromNumbers(0, 0, 100, 100);

// Rotate line by 0.1 radians around point 10,10
Lines.rotate(line, 0.1, {x:10, y:10});

// Rotate line by 5 degrees around its center
Lines.rotate(line, degreeToRadian(5));

// Rotate line by 5 degrees at 80% of the length of the line
Lines.rotate(line, degreeToRadian(5), Lines.interpolate(line, 0.8));

// Rotate line by 5 degrees by its end point
Lines.rotate(line, degreeToRadian(5), line.b);
```

<demo-element title="Point math" src="/geometry/line-rotation/" />

Extend the length of the line from its start position:

```js
// Lines.extendFromA(line:Line, distance:number): Line
// Returns a new Line, ie { a:{x,y}, b:{x,y} }
Lines.extendFromA(line, 20);
```

See also:
* [`extendFromA`](https://clinth.github.io/ixfx/functions/Geometry.Lines.extendFromA.html): Extends a line from its start
* [`parallel`](https://clinth.github.io/ixfx/functions/Geometry.Lines.parallel.html): Returns a line parallel to an input line at some distance
* [`scaleFromMidpoint`](https://clinth.github.io/ixfx/functions/Geometry.Lines.scaleFromMidpoint.html): Scales a line from its midpoint
* [`perpendicularPoint`](https://clinth.github.io/ixfx/functions/Geometry.Lines.perpendicularPoint.html): Returns a point perpendicular to a line at a specified distance


## Conversions

Converting _from_ some other shape. These all return a Line (ie. `{a:{x,y}, b:{x,y}}`)

```js
// repl-pad
import { Lines } from "https://unpkg.com/ixfx/dist/geometry.js";

// Returns Line {a:{x,y}, b:}
Lines.fromPoints({x:0,y:0}, {x:100,y:100});

// Convert from an array
// ie. [x1,y1,x2,y2]
Lines.fromArray([0,0,100,100]);

// Convert from positions
// ie. x1,y1,x2,y2
Lines.fromNumbers(0,0,100,100);
```

Converting _to_ some other data shape

```js
// Yields [a.x,a.y,b.x,b.y]
Lines.toFlatArray(line.a, line.b);

// Human-friendly string representation
Lines.toString(line);
```


## Normalise

Lines can be normalised with [`normaliseByRect`](https://clinth.github.io/ixfx/functions/Geometry.Lines.normaliseByRect.html).

```js
// repl-pad
import { Lines } from 'https://unpkg.com/ixfx/dist/geometry.js'

// Line 1,1 -> 10,10
const l = Lines.fromNumbers(1, 1, 10, 10);
const ll = Lines.normaliseByRect(l, 10, 10);
// Yields: 0.1,0.1 -> 1,1
```

## Random

To create a random line, leverage [`Points.random`](https://clinth.github.io/ixfx/functions/Geometry.Points.random.html)

```js
const line = {
  a: Points.random(),
  b: Points.random()
}
```

## Applying functions

Apply a function to start and end points of line:

```js
// repl-pad
import { Lines } from 'https://unpkg.com/ixfx/dist/geometry.js'

const line = Lines.fromNumbers(0, 0, 100, 100);

// A function that applies randomisation to x & y
const r = (p) => ({
  x: p.x * Math.random(),
  y: p.y * Math.random()
});

// Apply function to both start and end, returning result
const l = Lines.apply(line, r);
```

## Math operations

Lines has a few basic math functions: [`multiply`](https://clinth.github.io/ixfx/functions/Geometry.Lines.multiply.html), [`sum`](https://clinth.github.io/ixfx/functions/Geometry.Lines.sum.html), [`subtract`](https://clinth.github.io/ixfx/functions/Geometry.Lines.subtract.html)

```js
// repl-pad
import { Lines } from "https://unpkg.com/ixfx/dist/geometry.js";

// Line 1,1 -> 10,10
const line = Lines.fromNumbers(1,1,10,10);

// Multiply both start and end points by given _x_ & _y_:
const lA = Lines.multiply(line, { x:2, y:3 });
// Yields: 2,20 -> 3,30

const lB = Lines.sum(line, { x:2, y:3 });
// Yields: 3,4 -> 12,13

const lC = Lines.subtract(line, { x:2, y:3 });
// Yields: -1,-2 -> 8,7
```

## Comparisons

[`isEqual`](https://clinth.github.io/ixfx/functions/Geometry.Lines.isEqual.html) compares the lines by value. If two lines have the same set of start and end points, it returns _true_.

```js
// repl-pad
import { Lines } from 'https://unpkg.com/ixfx/dist/geometry.js'

const a = { a: {x:0,  y: 10 }, b: { x: 20, y: 20 }};
const b = { a: {x:0,  y: 10 }, b: { x: 20, y: 20 }};

a === b; // false, because they are different objects

Lines.isEqual(a, b); // true, because they have the same value
```
