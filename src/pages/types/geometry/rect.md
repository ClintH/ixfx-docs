---
title: Rectangle
layout: ../../../layouts/MainLayout.astro
---

<script type="module" hoist>
  import '/src/components/ReplPad';
</script>

<div class="tip">
<ul>
<li>Demos <a href="https://clinth.github.io/ixfx-demos/geometry/">Geometry</a> (<a href="https://github.com/ClintH/ixfx-demos/tree/main/geometry">source</a>)</li>
<li>API Reference <a href="https://clinth.github.io/ixfx/modules/Geometry.Rects.html">Geometry.Rects module</a></li>
</div>

Rectangles are defined as having a width and height.

```typescript
type Rect = {
  width: number
  height: number
}
```

Rectangles are _positioned_ if they also have _x_ and _y_ fields. The coordinate designates the top-left corner of the rectangle.

```typescript
type RectPositioned = {
  width: number
  height: number
  x: number
  y: number
}
```

## Initialising

Rectangles can be created simply as a plain object:

```js
// Un-positioned rectangle of width & height
const rectA = { width: 50, height: 10 };

// Positioned rectangle with top-left at 10,10
const rectB = { width: 100, height: 50, x: 10, y: 10 };
```

There are also several helper functions to base the rectangle on some shape you already have.

From a center point with [`fromCenter`](https://clinth.github.io/ixfx/modules/Geometry.Rects.html#fromCenter)

```js
// repl-pad#1
import { Rects } from "https://unpkg.com/ixfx/dist/geometry.js"

// Rects.fromCenter(origin:Point, width:number, height:number):RectPositioned;

// Create a rect with a center at 10,0
// a width of 100, height 200
const r1 = Rects.fromCenter({x: 10, y: 0}, 100, 200);
```

From the size of an element with [`fromElement`](https://clinth.github.io/ixfx/modules/Geometry.Rects.html#fromElement):

```js
// repl-pad#1
// Rects.fromElement(el:HTMLElement):Rect
const r2 = Rects.fromElement(document.querySelector(`body`));
```

From its top-left corner with [`fromTopLeft`](https://clinth.github.io/ixfx/modules/Geometry.Rects.html#fromTopLeft):

```js
// repl-pad#1
// fromTopLeft(origin: Point, width: number, height: number): RectPositioned

// Create a rect with top-left corner at 10,0
// a width of 100 and height of 200
const r3 = Rects.fromTopLeft({x:10,y:0}, 100, 200);
```

Initialises a rectangle that can encompass all the provided points:

```js
// repl-pad
import { Points } from "https://unpkg.com/ixfx/dist/geometry.js"
const r = Points.bbox({x:10, y:10}, {x:0,y:0});
```

[`fromNumbers`](https://clinth.github.io/ixfx/functions/Geometry.Rects.fromNumbers.html) allows you to create a rectangle from a set of number parameters. If two numbers are used, its assumed to be width & height. If four numbers are given, the first two are considered the top-left corner coordinate.

```js
// repl-pad#1
// width: 100, height: 200
Rects.fromNumbers(100, 200);
// top-left: 50,20 width: 100, height: 200
Rects.fromNumbers(50, 20, 100, 200);
```

## Area

[`area`](https://clinth.github.io/ixfx/functions/Geometry.Rects.area.html) computes the area of a rectangle

```js
// repl-pad#2
import { Rects } from "https://unpkg.com/ixfx/dist/geometry.js"
const rect = {x:0, y:0, width: 100, height: 100};

// Yields a number
Rects.area(rect);
```

Compute the center [Point](../point/) of a rectangle with [`center`](https://clinth.github.io/ixfx/functions/Geometry.Rects.center.html).

```js
// repl-pad#2
// yields {x,y}
const pt = Rects.center(rect);
```

## Relations

[`distanceFromCenter`](https://clinth.github.io/ixfx/functions/Geometry.Rects.distanceFromCenter.html) returns the distance of a point (or any positioned thing) to the center of a rectangle. [`distanceFromExterior`](https://clinth.github.io/ixfx/functions/Geometry.Rects.distanceFromExterior.html) is similar, but yields the distance to the perimeter. If the point is within the rectangle, 0 is returned.

```js
// repl-pad
import { Rects } from "https://unpkg.com/ixfx/dist/geometry.js"
const rect = {x:0, y:0, width: 100, height: 100};

Rects.distanceFromCenter(rect, { x: 90, y: 200 });
Rects.distanceFromExterior(rect, {x : 90, y: 200 });
```

[`intersectsPoint`](https://clinth.github.io/ixfx/functions/Geometry.Rects.intersectsPoint.html) returns _true_ if a point is within, or on the boundary of a rectangle.

```js
// repl-pad
import { Rects } from "https://unpkg.com/ixfx/dist/geometry.js"
const rect = {x:0, y:0, width: 100, height: 100};
Rects.intersectsPoint(rect, {x: 0, y: 0 }); // true
Rects.intersectsPoint(rect, {x: 50, y: 50}); // true
```

## Conversions


## Corners and edges

[`corners`](https://clinth.github.io/ixfx/functions/Geometry.Rects.corners.html) returns a set of four [Points](../point/) for each corner: top-left, top-right, bottom-right, bottom-left.

```js
// repl-pad#3
import { Rects } from "https://unpkg.com/ixfx/dist/geometry.js"
const rect = {x:0, y:0, width: 100, height: 100};

const pts = Rects.corners(rect);
```

[`edges`](https://clinth.github.io/ixfx/functions/Geometry.Rects.edges.html) returns four [Lines](../line/) - top, right, bottom, left.

```js
// repl-pad#3
Rects.edges(rect);
```

[`lengths`](https://clinth.github.io/ixfx/functions/Geometry.Rects.lengths.html) returns the lengths of each edge (top, right, bottom, left).

```js
// repl-pad#3
Rects.lengths(rect);
```

[`getEdgeX`](https://clinth.github.io/ixfx/functions/Geometry.Rects.getEdgeX.html) and [`getEdgeY`](https://clinth.github.io/ixfx/functions/Geometry.Rects.getEdgeY.html) return the _x_ or _y_ coordinate of an edge. Signal which edge with a string: right, bottom, left or top.

```js
// repl-pad#3
// x-coordinate of the right edge
Rects.getEdgeX(rect, `right`);

// y-coordinate of the top edge
Rects.getEdgeY(rect, `top`);
```

## Math operations

* [`subtract`](https://clinth.github.io/ixfx/functions/Geometry.Rects.subtract.html): minus rectangle width/height
* [`sum`](https://clinth.github.io/ixfx/functions/Geometry.Rects.sum.html): adds rectangle width/height
* [`multiply`](https://clinth.github.io/ixfx/functions/Geometry.Rects.multiply.html)

Note all the math operations return a new rectangle, the inputs are not modified.

## Comparisons

[`isEqual`](https://clinth.github.io/ixfx/functions/Geometry.Rects.isEqual.html) returns _true_ if the rectangle properties are the same. [`isEqualSize`](https://clinth.github.io/ixfx/functions/Geometry.Rects.isEqualSize.html) ignores the position of the rectangles and compares based on width and height.

```js
// repl-pad
import { Rects } from "https://unpkg.com/ixfx/dist/geometry.js";

const rectA = { width: 10, height: 10, x: 10, y: 10 };
const rectB = { width: 10, height: 10, x: 20, y: 20 };

Rects.isEqualSize(rectA, rectB); // true
Rects.isEqual(rectA, rectB); // false
```