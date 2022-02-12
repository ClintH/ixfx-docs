---
title: Line
setup: |
  import {Markdown} from 'astro/components';
  import Layout from '../../layouts/MainLayout.astro';
---

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
import { Lines } from "https://unpkg.com/ixfx/geometry.js"

// fromArray([x1,y1,x2,y])
const l = Lines.fromArray([0,0,200,200]);

// fromNumbers(x1,y1,x2,y2)
const l = Lines.fromNumbers(0,0,200,200);

// fromPoints(a:Point, a:Point)
const l = Lines.fromPoints({x:0,y:0}, {x:200,y:200});
```

## Length & distances

Length of line

```js
import { Lines } from "https://unpkg.com/ixfx/geometry.js"
const line = Lines.fromNumbers(0,0,200,200);
const length = Lines.length(line);
```

Relation of line to a point

```js
// Closest distance of point to anywhere on a line
Lines.distance(line, {x:150, y:200});

// Get the closest position on a line to some other point
// returns {x,y}
Lines.nearest(line, {x:150, y:200});
```

Is a point within range of line?

```js
// True if 150,150 is within 100 distance of line
Lines.withinRange(line, {x:150,y:150}, 100);
```

Calculate an in-between point with `interpolate`

```js
// Calculate a Point between `a` and `b` using a relative 
// progress amount (0 -> 1). 0 = a, 0.5 = halfway between
// the two, 1 = b, and so on.
const p = Lines.interpolate(0.5, a, b);
```

Calculates a rectangle that encompasses line

```js
const rect = Points.bbox(line);  // eg {x:0, y:0, width:10, height:10}
```

## Angles

Slope (gradient) of line

```js
Lines.slope(line);
Lines.slope(pointA, pointB); // Provide two points intead
```

Angle in radians of line

```js
Lines.angleRadian(line, referencePoint);
```

## Conversions

Converting _from_ some other shape

```js
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
// yields [a.x,a.y,b.x,b.y]
Lines.toFlatArray(line.a, line.b);
```

Return a [Path](path) instance, which wraps up some functions together with the line:

```js
const p = Lines.toPath(line);
p.length();             // Length
p.bbox();               // Get bounding 
p.interpolate(amount);  // Get position at relative
p.toString();           // Human-readable string
p.toFlatArray();        // Returns [x1,y1,x2,y2]
p.toPoints();           // Returns [ptA, ptB]
```

## Helper functions

Compare lines by value:

```js
Lines.equals(lineA, lineB);
```

Extend the length of the line from its start position

```js
// Lines.extendFromStart(line:Line, distance:number): Line
// Returns a new Line
Lines.extendFromStart(line, 20);
```