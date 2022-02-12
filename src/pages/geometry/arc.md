---
title: Arc
setup: |
  import {Markdown} from 'astro/components';
  import Layout from '../../layouts/MainLayout.astro';
  import ArcEditor from '../../components/ArcEditor';
  import AnglesElement from '../../components/AnglesElement';

---
<script type="module" src={Astro.resolve('./arc.ts')}></script>
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

An arc describes a segment of a [circle](./circle). It is defined by its radius as well as the start and end radian.

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

Angles are set with _radians_, not the more familiar _degrees_. See [Units](units) for more info.

<angles-element width="500" height="300" client:visible />

## Conversions

Create an arc from degrees:

```js
// fromDegrees(radius:number, startDegrees:number, endDegrees:number, origin?:Point)
const a = Arcs.fromDegrees(10, 0, 90);
const b = Arcs.fromDegrees(10, 0, 90, {x: 100, y: 100});
```

Return a [Path](path) instance, which wraps up some functions together with the arc:

```js
const p = Arcs.toPath(arc);
p.length();             // Length
p.bbox();               // Get bounding 
p.interpolate(amount);  // Get position at relative
p.toString();           // Human-readable string
```

Get a [Line](line) connecting the start and end point of the arc:

```js
const line = Arcs.toLine(arc);
```

## Other functions

Get the `x,y` coordinate of a point at specified angle
```js
// Arcs.point(arc:Arc, angleRadian:number, origin?:Point);
const p = Arcs.point(arc, Math.PI);
```

Equality

```js
// Returns true if `a` and `b` arcs have the same value
Arcs.isEqual(a, b);
```

Dimensions/distances

```js
Arcs.bbox(arc);   // Get a rectangle that encompasses arc
Arcs.length(arc); // Get the length of arc
Arcs.distanceCenter(a, b); // Distance between the centers of two arcs 
```

Compute position on arc
```js
// Returns point at relative place on arc
// ie. 0.5 = halfway along arc
Arcs.interpolate(arc, amount);
```