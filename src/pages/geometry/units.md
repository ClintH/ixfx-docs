---
title: Units & Coordinates
setup: |
  import {Markdown} from 'astro/components';
  import Layout from '../../layouts/MainLayout.astro';
  import {AnglesElement} from '../../components/AnglesElement';
  import {PolarCoordsElement} from '../../components/PolarCoordsElement';
---

<style>
radians-editor {
  --label-color: var(--theme-text-light);
  --axis-color: var(--theme-bg-hover);
}
</style>

[API Docs: Geometry module](https://clinth.github.io/ixfx/modules/Geometry.html)

## Angles

### Radians & Degrees

In math and computer science, [radian](https://en.wikipedia.org/wiki/Radian) is the usual unit for angles. 

Cheatsheet:

| Arc            | %    | Degrees | Radian |
| -------------- | ---- | ------- | ------ |
| Quarter        | 25%  | 90      | π/2    |
| Half           | 50%  | 180     | π      |
| Three quarters | 75%  | 270     | 3π/2   |
| One rotation   | 100% | 360     | 2π     |

<angles-element client:visible width="500" height="300"  />

Conversion functions:

```js
const degreeToRadian = (angleInDegrees) => (angleInDegrees - 90) * (Math.PI / 180.0);
const radianToDegree = (angleInRadians) => angleInRadians * 180 / Math.PI;
```

Both of these functions are in the [Geometry](https://clinth.github.io/ixfx/modules/Geometry.html) module and can be imported:

```js
import {degreeToRadian, radianToDegree} from 'https://unpkg.com/ixfx/geometry.js'
```

Example usage:
```js
let r = degreeToRadian(180);        // π
let d = radianToDegree(Math.PI*2);  // 360
```


## Coordinates

### Cartesian

Pixels
Grid

### Polar

[API Docs](https://clinth.github.io/ixfx/modules/Geometry.Polar.html), [Polar spiral demo](https://clinth.github.io/ixfx-demos/geometry/polar-spiral/)

[Polar coordinates](https://en.wikipedia.org/wiki/Polar_coordinate_system) are particularly suited for positioning on a circle, arc or spiral. Given a point of reference, the _origin_, coordinate are defined by their _distance_ from the origin, as well as _angle_ from the _polar axis_. 

In the example below, the _origin_ is marked with _O_, appearing in the center of the grid. The _polar axis_ is marked _A_.

As you move your pointer, the polar coordinates are shown. For understandability, angle is shown here in degrees, but radians are the usual unit.

<polar-coords-element client:visible width="400" height="400"  />

In code, you can convert a polar coordinate (using radian unit) to _x, y_ with:

```js
const polarToCartesian = (distance, angleRadians, originX, originY) => ({
    x: originX + (distance * Math.cos(angleRadians)),
    y: originY + (distance * Math.sin(angleRadians)),
  });
```

In ixfx, [toCartesian](https://clinth.github.io/ixfx/modules/Geometry.Polar.html#toCartesian) function is provided and can be used as:

```js
import { Polar } from 'https://unpkg.com/ixfx/geometry.js';

// Origin (ie. center) of polar coordinates
const origin = { x: 100, y: 100 };

// polarToCartesian(distance:number, angleRadians:number, origin:Point): Point;
const point = Polar.toCartesian(100, Math.PI, origin);

// Or if you have a Polar.Coord {distance:number, angleRadian:number}
const polar = { distance: 100, angleRadian: Math.PI };
const point = Polar.toCartesian(polar, origin);

// Convert from Cartesian to polar coordinate:
// Polar.fromCartesian(point, origin): Coord;
const polar = Polar.fromCartesian({x: 50, y: 50}, origin);
```

Demos:
* [Polar spiral](https://clinth.github.io/ixfx-demos/geometry/polar-spiral/): Uses the [spiral function](https://clinth.github.io/ixfx/modules/Geometry.Polar.html) to generate a spiral, modulated by two ping-pongs.



## Colour

