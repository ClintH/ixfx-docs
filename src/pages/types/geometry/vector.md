---
  title: Vector
  layout: ../../../layouts/MainLayout.astro
  setup: |
    import { DemoElement } from '../../../components/DemoElement.ts';
    import {VectorElement} from '/src/components/geometry/VectorElement';
---

<script type="module" hoist>
import '/src/components/ReplPad';
</script>

<div class="tip">
<ul>
<li>Demos <a href="https://clinth.github.io/ixfx-demos/geometry/">Geometry</a> (<a href="https://github.com/ClintH/ixfx-demos/tree/main/geometry">source</a>)</li>
<li>API Reference <a href="https://clinth.github.io/ixfx/modules/Geometry.Points.html">Geometry.Points module</a></li>
</div>

A _vector_ consists of _magnitude_ (which can be thought of as length or distance) and _direction_. In essence, it describes how to go from [Point](./point) A to B.

Read more:
* [Wikipedia](https://en.wikipedia.org/wiki/Euclidean_vector)


## Cartesian and Polar

Vectors can be described with [Cartesian](../units/#cartesian) or [polar](../units/#polar) coordinates. In ixfx, type `Vector = Points.Point | Polar.Coord`.

<p>Cartesian: <span id="vector-cartesian">?</span><br />
Polar: <span id="vector-polar">?</span>
</p>
<p></p>
<vector-element id="vectorIntro" client:visible width="300" height="300"  />
<script type="module" hoist>
  const e = document.getElementById(`vectorIntro`);
  e.addEventListener(`vector-change`, evt => {
    const { cartesian, polar } = evt.detail;
    document.getElementById(`vector-cartesian`).innerHTML = `<code>{ x: ${Math.round(cartesian.x)}, y: ${Math.round(cartesian.y)}}</code>`;
    document.getElementById(`vector-polar`).innerHTML = `<code>{ distance: ${Math.round(polar.distance)}, angleRadian: ${polar.angleRadian.toFixed(2)}</code>`;
  })
</script>

When expressed in Cartesian coordinates, it's not obvious that the vector expresses magnitude and direction. It would seem to be the _x_ and _y_ of a single point in space. Instead, the _x_ value represents the movement along the horizontal axis from the origin, and _y_ represents movement along the vertical axis from the origin.

Click on a point in the diagram above and drag it around. Note how the Cartesian vector coordinates are derived from the spatial relationship of A to B, not an actual point in space. This can easily get confusing when mixing and matching different coordinates - some vectors, some actual points.

Vectors in Polar coordinates are made up angle and magnitude. In ixfx, `angleRadian` and `distance` are used to denote these components. Polar coordinates better express the meaning of a vector, and you're less likely to muddle them up with actual points on a plane.

In ixfx, vectors can be converted back and forth:

```js
import { Vectors } from "https://unpkg.com/ixfx/dist/geometry.js"
const vectorCartesian = Vectors.toCartesian(somePolarCoordinate);
const vectorPolar = Vectors.toPolar(someCartesianCoordinate);
```

## Uses

Vectors are useful in calculating forces such as velocity and acceleration. 

For example, a vector representing velocity might use the magnitude for speed, and the direction to be the angle of movement. If we want to calculate a new position based on velocity (and assuming a Cartesian velocity):

```js
const computePosition = (position, velocity) => {
  return {
    x: position.x + velocity.x,
    y: position.y + velocity.y
  }
}

const thing = { x: 100, y: 100 };
const velocity = { x: 1, y: 2 };
const newPosition = computePosition(thing, velocity);
```

To handle either kind of vector notation, we can instead use `Vectors.sum`:

```js
const thing = { x: 100, y: 100 };

// Eg. with a Cartesian vector
const velocityCartesian = { x: 1, y: 2 };
const newPosition = Vectors.sum(thing, velocityCartesian);

// Eg. with a polar vector
const velocityPolar = { angleRadian: 0.20, distance: 1 };
const newPosition2 = Vectors.sum(thing, velocityPolar);
```


## Computing

Vectors can be computed from a line, where it is assumed that the line's _a_ property is the start, and _b_ is the end. This gives us direction and magnitude.

```js
import { Vectors } from "https://unpkg.com/ixfx/dist/geometry.js"

// repl-pad#1
// A line
const line  { 
  a: { x: 10, y: 10 }, 
  b: { x: 20, y: 20 }
};
```

Vector in Cartesian coordinates

```js
// repl-pad#1
const vectorCartesian = Vectors.fromLineCartesian(line);
// Yields: { x: ..., y: ... }
```

Vector in Polar coordinates

```js
// repl-pad#1
const vectorPolar = Vectors.fromLinePolar(line);
// Yields: { angleRadian: ..., distance: ... }
```

If you don't already have a Line instance, a vector can be created from two given points using `Points.subtract`

```js
const vectorCartestian = Points.subtract(a, b);
```

`vectorCartesian` will thus be the distance and angle between `a` and `b`.
# Unit vectors

A _unit vector_, or _normalised vector_ is a vector that maintains its direction information, but has a magnitude of 1. All it tells then is direction, nothing about how far.

It can be produced using `normalise`

```js
import { Vectors } from "https://unpkg.com/ixfx/dist/geometry.js"
const unitVector = Vectors.normalise({ angleRadian: -0.52, distance: 50 });
```
