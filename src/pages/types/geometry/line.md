---
title: Line
setup: |
  import {Markdown} from 'astro/components';
  import Layout from '../../../layouts/MainLayout.astro';
---

<script type="module" hoist>
import '/src/components/ReplPad';
</script>

A line is defined by two [Points](./point)

* [Online geometry demos](https://clinth.github.io/ixfx-demos/geometry/)
* [Units](./units): Cartesian space
* [API Docs: Geometry.Lines module](https://clinth.github.io/ixfx/modules/Geometry.Lines.html)


```typescript
type Line = {
  a: Point,
  b: Point
}

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

Length of line

```js
// repl-pad#1
const line = {
  a: {x: 0,   y:0 },
  b: {x: 200, y:200 }
}
const line = Lines.fromNumbers(0,0,200,200);
const length = Lines.length(line); // Returns number
```

Relation of line to a point

```js
// repl-pad#1
// Closest distance of point to anywhere on a line
// returns number
Lines.distance(line, {x:150, y:200});

// Get the closest position on a line to some other point
// returns {x,y}
Lines.nearest(line, {x:150, y:200});
```

Is a point within range of line?

```js
// repl-pad#1
// True if 150,150 is within 100 distance of line
Lines.withinRange(line, {x:150,y:150}, 100);
```

Calculate an in-between point with `interpolate`

```js
// repl-pad#1
// Calculate a Point between points `a` and `b` using a relative 
// progress amount (0 -> 1). 0 = a, 0.5 = halfway between
// the two, 1 = b, and so on.
// returns Point {x,y}
const p = Lines.interpolate(0.5, {x:10,y:10}, {x:20,y:0});
```

Calculates a rectangle that encompasses line

```js
// repl-pad#2
import { Points } from "https://unpkg.com/ixfx/dist/geometry.js";
import { Lines } from "https://unpkg.com/ixfx/dist/geometry.js";

// Returns Rectangle {x,y,width,height}
const line = {
  a: {x: 0,   y:0 },
  b: {x: 200, y:200 }
}
const rect = Points.bbox(line);
```

## Angles

Slope (gradient) of line.

```js
// repl-pad#2
// Returns number
Lines.slope(line);
Lines.slope({x:10,y:10}, {x:20,y:20}); // Provide two points intead
```

Angle in radians of line to a point

```js
// repl-pad#2
// Returns number
Lines.angleRadian(line, {x:10,y:20});
```

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

Converting _to_ some other shape

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
```

## Helper functions

Compare lines by value:

```js
// Returns _true_ if lines have same value
Lines.equals(lineA, lineB);
```

Extend the length of the line from its start position

```js
// Lines.extendFromStart(line:Line, distance:number): Line
// Returns a new Line, ie { a:{x,y}, b:{x,y} }
Lines.extendFromStart(line, 20);
```