---
title: Arc
layout: ../../../layouts/MainLayout.astro
setup: |
  import ArcEditor from '/src/components/geometry/ArcEditor';
  import AnglesElement from '/src/components/geometry/AnglesElement';

---

<script type="module" hoist>
import '/src/components/types/geometry/arc';
import '/src/components/ReplPad';
</script>
<style>
input.code {
  font-family: var(--font-mono);
  font-size: 0.85em;
}

radians-editor {
  --label-color: var(--theme-text-light);
  --axis-color: var(--theme-bg-hover);
  --ray-color: var(--theme-hit-color);
}

</style>

An arc describes a segment of a [circle](../circle/). It is defined by its radius as well as the start and end radian.

* [Online geometry demos](https://clinth.github.io/ixfx-demos/geometry/)
* [API Docs: Geometry.Arcs module](https://clinth.github.io/ixfx/modules/Geometry.Arcs.html)

## Type

The expected type of arcs in ixfx is:

```typescript
type Arc = {
  radius:number
  startRadian:number
  endRadian:number
  counterClockwise?:boolean
}>

// eg:
const arc = {
  radius: 5,
  startRadian: 0,
  endRadian: Math.PI
}
```

`ArcPositioned` also includes `x` and `y` fields.


Try editing this example:

<input style="width: 40em" class="code arc" type="text" id="arc1Txt" value="{ radius: 20, startRadian: 0, endRadian: Math.PI }">
<arc-editor id="arc1" client:visible  />

Angles are set with _radians_, not the more familiar _degrees_. See [Units](../units/) for more info.

<angles-element width="500" height="300" client:visible />

## Conversions

Create an arc from degrees:

```js
// repl-pad
import { Arcs } from "https://unpkg.com/ixfx/dist/geometry.js"

// fromDegrees(radius:number, startDegrees:number, endDegrees:number, origin?:Point)
// returns Arc {radius, startRadian, endRadian}
const a = Arcs.fromDegrees(10, 0, 90);
const b = Arcs.fromDegrees(10, 0, 90, {x: 100, y: 100});
```

Return a [Path](../path/) instance, which wraps up some functions together with the arc:

```js
// repl-pad#1
import { Arcs } from "https://unpkg.com/ixfx/dist/geometry.js";
const arc = Arcs.fromDegrees(10, 0, 90, {x: 100, y: 100});
const p = Arcs.toPath(arc);
p.length();             // Length as a number
p.bbox();               // Get bounding rectangle, ie. {x,y,width,height}
p.interpolate(0.5);  // Get point at relative position, returns {x,y} 
p.toString();           // Human-readable string
```

Get a [Line](../line/) connecting the start and end point of the arc:

```js
// repl-pad#1
// Returns {a: {x,y}, b:{x,y} }
const line = Arcs.toLine(arc);
```

## Helper functions

Get the `x,y` coordinate of a point at specified angle

```js
// repl-pad#1
// Arcs.point(arc:Arc, angleRadian:number, origin?:Point):Point
// returns {x,y}
const pt = Arcs.point(arc, 0);
```

Equality

```js
// Returns true if `a` and `b` arcs have the same value
Arcs.isEqual(a, b);
```

Dimensions/distances

```js
// repl-pad#1
Arcs.bbox(arc);   // Get a rectangle that encompasses arc: {x,y,width,height}
Arcs.length(arc); // Get the length of arc as a number
Arcs.distanceCenter(arc, Arcs.fromDegrees(10, 0, 90, {x: 50, y: 50})); // Distance between the centers of two arcs, as a number 
```

Compute position on arc
```js
// repl-pad#1
// Returns point at relative place on arc
// ie. 0.5 = halfway along arc
// returns {x,y}
Arcs.interpolate(0.5, arc);
```