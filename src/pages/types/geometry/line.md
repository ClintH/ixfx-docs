---
title: Line
layout: ../../../layouts/MainLayout.astro
setup: |
  import { DemoElement } from '../../../components/DemoElement.ts';
---

<script type="module" hoist>
import '/src/components/ReplPad';
</script>

* [Online geometry demos](https://clinth.github.io/ixfx-demos/geometry/)
* [Units](./units): Cartesian space
* [API Docs: Geometry.Lines module](https://clinth.github.io/ixfx/modules/Geometry.Lines.html)

A line is defined by two [Points](./point)

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

// fromArray([x1,y1,x2,y])
const a = Lines.fromArray([0,0,200,200]);

// fromNumbers(x1,y1,x2,y2)
const b = Lines.fromNumbers(0,0,200,200);

// fromPoints(a:Point, a:Point)
const c = Lines.fromPoints({x:0,y:0}, {x:200,y:200});
```

## Length & distances

Length of the line can be calculated with [`length`](https://clinth.github.io/ixfx/modules/Geometry.Lines.html#length).

```js
// repl-pad#1
const line = {
  a: {x: 0,   y:0 },
  b: {x: 200, y:200 }
}
const line = Lines.fromNumbers(0,0,200,200);
const length = Lines.length(line); // Returns number
```

Relation of line to a point: [`distance`](https://clinth.github.io/ixfx/modules/Geometry.Lines.html#distance) and [`nearest`](https://clinth.github.io/ixfx/modules/Geometry.Lines.html#nearest)

```js
// repl-pad#1
// Closest distance of point to anywhere on a line
// returns number
Lines.distance(line, {x:150, y:200});

// Get the closest position on a line to some other point
// returns {x,y}
Lines.nearest(line, {x:150, y:200});
```

<demo-element title="Point math" src="/geometry/line-math/" />


Is a point within range of line?

```js
// repl-pad#1
// True if 150,150 is within 100 distance of line
Lines.withinRange(line, {x:150,y:150}, 100);
```

Calculate an in-between point with [`interpolate`](https://clinth.github.io/ixfx/modules/Geometry.Lines.html#interpolate)

```js
// repl-pad#1
// Calculate a Point between points `a` and `b` using a relative 
// progress amount (0 -> 1). 0 = a, 0.5 = halfway between
// the two, 1 = b, and so on.
// returns Point {x,y}
const p2 = Lines.interpolate(0.5, line); // With a line
const p = Lines.interpolate(0.5, {x:10,y:10}, {x:20,y:0}); // Or with two points
```

Calculates a rectangle that encompasses line

```js
// repl-pad
import { Points } from "https://unpkg.com/ixfx/dist/geometry.js";
import { Lines } from "https://unpkg.com/ixfx/dist/geometry.js";

// Returns Rectangle {x,y,width,height}
const line = {
  a: {x: 0,   y:0 },
  b: {x: 200, y:200 }
}
const rect = Points.bbox(line);
```

Extend the length of the line from its start position:

```js
// Lines.extendFromStart(line:Line, distance:number): Line
// Returns a new Line, ie { a:{x,y}, b:{x,y} }
Lines.extendFromStart(line, 20);
```

## Angles & rotation

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

```js
// repl-pad#3
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
```

Return a [Path](path) instance, which wraps up some functions together with the line:

```js
// repl-pad
import { Lines } from "https://unpkg.com/ixfx/dist/geometry.js";
const line = {
  a: {x: 0,   y:0 },
  b: {x: 200, y:200 }
}
const p = Lines.toPath(line);
p.length();             // Length (numer)
p.bbox();               // Get bounding box as rect {x,y,width,height}
p.interpolate(0.5);     // Get position at relative. Returns point {x,y}
p.toString();           // Human-readable string
p.toFlatArray();        // Returns [x1,y1,x2,y2]
p.toPoints();           // Returns [ptA, ptB]
p.rotate(amountRadians, origin) // Returns a rotated line
```

## Helper functions

Compare lines by value:

```js
// Returns true if lines have same value
Lines.equals(lineA, lineB);
```

Multiple both start and end points by given x & y:

```js
// repl-pad#2
import { Lines } from "https://unpkg.com/ixfx/dist/geometry.js";
// Line 1,1 -> 10,10
const line = Lines.fromNumbers(1,1,10,10);
const ll = Lines.multiply(line, {x:2, y:3});
// Yields: 2,20 -> 3,30
```

Apply a function to start and end points of line:

```js
// repl-pad#2
// A function that applies randomisation to x & y
const r = (p) => ({
  x: p.x * Math.random(),
  y: p.y * Math.random()
});

// Apply function to both start and end, returning result
const l = Lines.apply(line, r);
```

