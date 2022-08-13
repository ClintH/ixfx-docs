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

<div class="tip">
<ul>
<li>Demos <a href="https://clinth.github.io/ixfx-demos/geometry/">Geometry</a> (<a href="https://github.com/ClintH/ixfx-demos/tree/main/geometry">source</a>)</li>
<li>API Reference <a href="https://clinth.github.io/ixfx/modules/Geometry.Arcs.html">Geometry.Arcs module</a></li>
</div>

An arc describes a segment of a [circle](../circle/). It is defined by its radius as well as the start and end radian.


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
// repl-pad#1
import { Arcs } from "https://unpkg.com/ixfx/dist/geometry.js"

// fromDegrees(radius:number, startDegrees:number, endDegrees:number, origin?:Point)
// returns Arc {radius, startRadian, endRadian}
const arc = Arcs.fromDegrees(10, 0, 90);
const arc2 = Arcs.fromDegrees(10, 0, 90, {x: 100, y: 100});
```

Get a [Line](../line/) connecting the start and end point of the arc:

```js
// repl-pad#1
// Returns {a: {x,y}, b:{x,y} }
const line = Arcs.toLine(arc);
```

## Interpolate & point by angle

[`interpolate`](https://clinth.github.io/ixfx/functions/Geometry.Arcs.interpolate.html) returns a point at a relative position along an arc.

```js
// repl-pad#2
import { Arcs, degreeToRadian } from "https://unpkg.com/ixfx/dist/geometry.js";
const arc = Arcs.fromDegrees(10, 0, 90, {x: 100, y: 100});

const p = Arcs.interpolate(0.5, arc);
```

`point` returns a coordinate on an arc, based on angle.

```js
// repl-pad#2
const pt = Arcs.point(arc, degreeToRadian(90));
```

## Length & distance

Get the length of arc as a number

```js
// repl-pad#2
Arcs.length(arc); 
```

Distance between the centers of two arcs, as a number 

```js
// repl-pad#2
Arcs.distanceCenter(
  Arcs.fromDegrees(20, 0, 40, {x: 20, y: 20}),
  Arcs.fromDegrees(10, 0, 90, {x: 50, y: 50})
); 
```

## Area

[`bbox`](https://clinth.github.io/ixfx/functions/Geometry.Arcs.bbox.html) calculates a rectangle that encloses an arc

```js
// repl-pad#3
import { Arcs } from "https://unpkg.com/ixfx/dist/geometry.js";
const arc = Arcs.fromDegrees(10, 0, 90, {x: 100, y: 100});

const p = Arcs.bbox(arc);
``` 

## Comparison

[`isEqual`](https://clinth.github.io/ixfx/functions/Geometry.Arcs.isEquals.html) returns _true_ if two arcs are identical by value.

```js
const arcA = { radius: 5, endRadian: 0, startRadian: 1 };
const arcA = { radius: 5, endRadian: 0, startRadian: 1 };
arcA === arcB; // false, because object identities are different
Arcs.isEqual(arcA, arcB); // true, because values are identical
```