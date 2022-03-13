---
title: Rectangle
layout: ../../../layouts/MainLayout.astro
---

<script type="module" hoist>
  import '/src/components/ReplPad';
</script>

Rectangles are defined as having a width and height.

* [Online geometry demos](https://clinth.github.io/ixfx-demos/geometry/)
* API Docs: [Geometry.Rects module](https://clinth.github.io/ixfx/modules/Geometry.Rects.html)

```typescript
type Rect = {
  width: number
  height: number
}
```

Rectangles are _positioned_ if they also have _x_ and _y_ fields:

```typescript
type RectPositioned = {
  width: number
  height: number
  x: number
  y: number
}
```

## Initialising

From a center point with [fromCenter](https://clinth.github.io/ixfx/modules/Geometry.Rects.html#fromCenter)

```js
// repl-pad#1
import { Rects } from "https://unpkg.com/ixfx/dist/geometry.js"

// Rects.fromCenter(origin:Point, width:number, height:number):RectPositioned;

// Create a rect with a center at 10,0
// a width of 100, height 200
const r1 = Rects.fromCenter({x: 10, y: 0}, 100, 200);
```

From the size of an element with [fromElement](https://clinth.github.io/ixfx/modules/Geometry.Rects.html#fromElement):

```js
// Rects.fromElement(el:HTMLElement):Rect
const r2 = Rects.fromElement(document.getElementById(`thing`));
```

From its top-left corner with [fromTopLeft](https://clinth.github.io/ixfx/modules/Geometry.Rects.html#fromTopLeft):

```js
// repl-pad#1
// fromTopLeft(origin: Point, width: number, height: number): RectPositioned

// Create a rect with top-left corner at 10,0
// a width of 100 and height of 200
const r3 = Rects.fromTopLeft({x:10,y:0}, 100, 200);
```

## Spatial

Compute the center [Point](./point) of a rectangle with [getCenter](https://clinth.github.io/ixfx/modules/Geometry.Rects.html#getCenter).

```js
// repl-pad#2
import { Rects } from "https://unpkg.com/ixfx/dist/geometry.js"

const rect = {x:0, y:0, width: 100, height: 100};

// yields {x,y}
const pt = Rects.getCenter(rect);
```

## Conversions

[Get the corners](https://clinth.github.io/ixfx/modules/Geometry.Rects.html#getCorners). Returns an array of [Points](./point)

```js
// repl-pad#3
import { Rects } from "https://unpkg.com/ixfx/dist/geometry.js"

const rect = {x:0, y:0, width: 100, height: 100};

// Get the corners of a positioned rect
const pts = Rects.getCorners(rect);
```

[Get the lines that make up the rect](https://clinth.github.io/ixfx/modules/Geometry.Rects.html#getLines). Returns an array of [Lines](./line)

```js
// repl-pad#3
// getLines(rect: Rect | RectPositioned, origin?: Point):Line[]

// Lines for a positioned rect
Rects.getLines(rect);
```

## Helper functions

Returns _true_ if two rectangles have the same values: [isEqual](https://clinth.github.io/ixfx/modules/Geometry.Rects.html#isEqual)

```js
Rects.isEqual(r1, r2);
```

Initialises a rectangle that can encompass all the provided points:

```js
// repl-pad
import { Points } from "https://unpkg.com/ixfx/dist/geometry.js"
const r = Points.bbox({x:10, y:10}, {x:0,y:0});
```