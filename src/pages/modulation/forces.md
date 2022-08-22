---
title: Forces
layout: ../../layouts/MainLayout.astro
---

<script type="module" hoist>
  import '/src/components/ReplPad';
</script>

<div class="tip">
<ul>
<li>API Reference <a href="https://clinth.github.io/ixfx/modules/Modulation.Forces.html">Modulation.Forces module</a></li>
<li><a href="https://clinth.github.io/ixfx-demos/modulation/">Demos</a></li>
<li>Related: <a href="../oscillator/#springs">Oscillator.spring</a>: spring force</li>
</ul>
</div>

The Forces module is a bit of an adaptation of Daniel Shiffman's [Nature of Code](https://natureofcode.com/book/) examples. If you're interested in learning the math, please see that excellent resource.

This demo below shows basic movement of gravity, drag, wind and friction. [See it online](https://clinth.github.io/ixfx-demos/modulation/forces-basic/) ([source](https://github.com/ClintH/ixfx-demos/tree/main/modulation/forces-basic)). It also demonstrates selectively applying forces, in this case, based on the position of the thing.

<demo-element style="height:40vh" title="Basic forces" src="/modulation/forces-basic/" />

ixfx has a functional approach to forces. There are a range of pre-defined 'force functions' which can be combined together to manipulate data.

First, a thing that can be affected by a force has the type [`ForceAffected`](https://clinth.github.io/ixfx/types/Modulation.Forces.ForceAffected.html). What this means is that it has some of these properties:

```typescript
type ForceAffected = {
  position?:Point
  velocity?:Point
  acceleration?:Point
  mass?:number
  angularAcceleration?:number;
  angularVelocity?:number;
  angle?:number;
};
```

A basic thing that can be affected by a force can be defined as simply as:

```js
const thing = {
  position: { x: 0.5, y: 0.5 },
  mass: 1
}
```

Velocity and acceleration are _vectors_, capturing movement in both _x_ & _y_ directions. They are also signed. A negative _x_ value for example will mean that the thing is moving left, while a positive _x_ value will mean it is moving to the right.

Now, rather than changing the position or velocity yourself, you want to do so via some of the pre-defined 'force functions'. These return a function which in turn apply the force to a thing.

For example, to give our thing some acceleration we might create an [acceleration force](https://clinth.github.io/ixfx/functions/Modulation.Forces.accelerationForce.html), and to slow it down, some friction based on [velocity](https://clinth.github.io/ixfx/functions/Modulation.Forces.velocityForce.html).

```js
import { Forces } from "https://unpkg.com/ixfx/dist/modulation.js"

// Accelerate to right
const accelForce = Forces.accelerationForce({
  x: 0.1,
  y: 0
})

// Reduce velocity due to friction
const frictionForce = Forces.velocityForce(0.00001);
```

Now that the forces have been created, they can be used. Typically, you do this in an animation loop, so the thing gets updated over time. [`Forces.apply`](https://clinth.github.io/ixfx/functions/Modulation.Forces.apply.html) takes in the thing and applies a list of forces in order, returning a changed copy of the input thing.

```js
const loop = () => {
  thing = Forces.apply(thing, 
    accelForce, 
    frictionForce);
  
  window.requestAnimationFrame(loop);
}
loop();
```

After applying a force, properties will be updated - typically its `position` and `velocity`. It's up to you to use these values somehow, for example moving a HTML element or rendering on the canvas.

Once initialised, you probably don't want to modify the thing directly, but rather do so through the application of forces.

The object you pass in to `Forces.apply` could have additional properties, these are preserved.

## Force settings

When working with forces, keep in mind that the scaling of the numbers is inter-dependent. Values are very much 'set to taste', and while experimenting, try orders of magnitude up and down in order to figure out its effect.

We recommend using relative coordinates (ie. _x_ and _y_ on a 0..1 scale).

Many forces can be affected by mass, if it's present on the force-affected thing.

## Force functions


### Velocity & acceleration

Before getting too fancy, a good place to start is moving something around. Rather than set the velocity directly, it's better to affect the acceleration via [`accelerationForce`](https://clinth.github.io/ixfx/functions/Modulation.Forces.accelerationForce.html) and let `Forces.apply` integrate that into an updated velocity and position.

<demo-element style="height:40vh" title="Acceleration" src="/modulation/forces-accel/" />

This demo computes an acceleration based on the movement of the pointer (via [point tracker](../../data/trackers/#point)). Since we want to apply a dynamic acceleration force depending on the pointer movement, it's not possible to initialise the force function and re-use it. Rather, we call `Forces.accelerationForce` each time we apply.

```js
thing = Forces.apply(thing, 
        Forces.accelerationForce(avg, `dampen`));
```

Along with the basic demo of acceleration above, there's a more complicated example that applies the force to an arbitary number of things

<demo-element style="height:40vh" title="Acceleration of particles" src="/modulation/forces-accel-particles/" />


### Wind and gravity

Wind and gravity can be modelled as affecting the acceleration of a thing with [`accelerationForce`](https://clinth.github.io/ixfx/functions/Modulation.Forces.accelerationForce.html)

For wind, we might make it push something to the right, with its power being dampened (ie. reduced) with greater mass of a thing:

```js
const windForce = Forces.accelerationForce({ x: 0.00001, y: 0 }, `dampen`);
```

Gravity won't affect the _x_ value, but rather _y_, and in this case the force is multiplied with the mass (heavier will fall faster):

```js
const gravityForce = Forces.accelerationForce({ x: 0, y: 0.0001 }, `multiply`);
```

### Friction & drag

Friction reduces speed with the [`velocityForce`](https://clinth.github.io/ixfx/functions/Modulation.Forces.velocityForce.html). This force essentially scales the current speed by the force value. By passing `multiply` as the second parameter, we can enhance the force with mass.

```js
const friction = Forces.velocityForce(0.00001, `multiply`);
```

Drag also reduces speed, is based on the the _square_ of the current velocity. We can use [`magnitudeForce`](https://clinth.github.io/ixfx/functions/Modulation.Forces.magnitudeForce.html). This produces a non-linear relation, compared with `velocityForce`. By passing `dampen` as the second parameter, we can reduce the force according the greater the mass.

```js
const drag = Forces.magnitudeForce(0.1, `dampen`)
```

### Pendulum

The [`pendulumForce`](https://clinth.github.io/ixfx/functions/Modulation.Forces.pendulumForce.html) works with angular velocity and angle of a thing.

<demo-element style="height:40vh" title="Pendulm force" src="/modulation/forces-pendulum/" />

To use, we have to define a point by which the thing is pinned, and its distance.

```js
const thing = {
  position: { x: 0.5, y: 1 }
}
const pinnedAt = { x: 0.5, y: 0.5 };
const pendulumForce = Forces.pendulumForce(pinnedAt, { length: 0.4 });
```

The other options for the pendulum force are: _damping_, an amount to reduce velocity by, and _speed_, which is the maximum swing speed.

```js
const pendulumForce = Forces.pendulumForce(pinnedAt, { 
  length: 0.4,
  damping: 0.5, // default 0.995, ie 0.5% loss
  speed: 0.1    // default 0.001
});
```

If _length_ is not defined, the force will use the current distance between the target and thing.

### Targeting

[`targetForce`](https://clinth.github.io/ixfx/functions/Modulation.Forces.targetForce.html) is a composite force which pushes a thing toward a target position.

```js
const targetForce = Forces.targetForce(targetPos);
```

It has some options. `diminishBy` scales the acceleration speed (default 0.0001). `range` allows you to skip moving if the thing is within this x/y to the target.

```js
const targetForce = Forces.targetForce(targetPos, {
  diminishBy: 0.1,
  range: { x: 10, y: 10} // If we're within 10,10 pixels, don't move
});
```

<demo-element style="height:40vh" title="Target force" src="/modulation/forces-target/" />

### Attraction

The [`attractionForce`](https://clinth.github.io/ixfx/functions/Modulation.Forces.attractionForce.html) attracts (or repels) a thing based on a list of attractors.

<demo-element style="height:40vh" title="Attraction force" src="/modulation/forces-attractor/" />

For example, lets say we have earth and sun

```js
const sun = { mass: 1000, position: Math.random() };
const earth = { mass: 0.01, position: Math.random() };
```

We the sun to be the thing that attracts the earth, so it is setup in the force, along with a gravity value:

```js
const gravity = 0.1;
const sunAttractionForce = Forces.attractionForce(sun, gravity);

// Now apply to earth
earth = Forces.apply(earth, sunAttractionForce);
```

The force can also take a third parameter for the range at which the force is applied:

```js
// Only apply force when distance between sun and thing is between 1-100
const sunAttractionForce = Forces.attractionForce(sun, gravity, { max: 100, min: 1});
```

### Orientation

To make objects orient in the direction of travel, use [`orientationForce`](https://clinth.github.io/ixfx/functions/Modulation.Forces.orientationForce.html). This is also demonstrated in the attraction force demo above.

```js
const orientationForce = Forces.orientationForce(1);
```

The parameter given to the force is the 'interpolation amount', which determines how quickly rotation happens.

## Applying forces to many things

Use the regular Javascript constructs to apply forces to many objects.

```js
let things = [ /* lots of things */ ]

things = things.map(t => Forces.apply(t, gravityForce));
```

## Dynamic forces

At times the pattern of initialising a force once and then reusing it repeatedly doesn't work. For example, if you want friction to be affected by a 'smoothness' property you have defined, this won't work:

```js
const thing = { 
  position: Points.random(),
  smoothness: Math.random(),
  mass: 1
};

// Init force
const friction = Forces.velocityForce(0.00001, `multiply`);
const loop() => {
  // When applying force it will use the static values
  thing = Forces.apply(thing, friction);
  ...
}
```

Instead, create the force function when we call `apply`:

```js
const loop() => {
  thing = Forces.apply(thing, 
    Force.velocityForce(0.00001 * thing.smoothness)
  );
  ...
}
```

We can also opt to dynamically apply a force or not, based on some state.

In this example, we assume `gravityApplies` is a property of the thing. If the value is _true_, we apply a gravity force, if not a 'null' force which does nothing:

```js
Forces.apply(thing,
  dragForce,
  thing.gravityApplies ? gravityForce : Forces.nullForce,
  windForce
);
```

This technique is used in the [basic forces demo](https://github.com/ClintH/ixfx-demos/tree/main/modulation/forces-basic) to selectively apply forces depending on whether the thing is in 'air' or 'water'


### Demos

* [Attractor force](https://clinth.github.io/ixfx-demos/modulation/forces-attractor/) ([source](https://github.com/ClintH/ixfx-demos/tree/main/modulation/forces-attractor))
* [Basic forces](https://clinth.github.io/ixfx-demos/modulation/forces-basic/) ([source](https://github.com/ClintH/ixfx-demos/tree/main/modulation/forces-basic)): wind, gravity, drag, friction
* [Pendulum demo](https://clinth.github.io/ixfx-demos/modulation/forces-pendulum/)
([source](https://github.com/ClintH/ixfx-demos/tree/main/modulation/forces-pendulum))
* [Target force](https://clinth.github.io/ixfx-demos/modulation/forces-target/) ([source](https://github.com/ClintH/ixfx-demos/tree/main/modulation/forces-target))
