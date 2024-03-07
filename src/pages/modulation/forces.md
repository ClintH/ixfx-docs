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

First, a thing that can be affected by a force has the type [`ForceAffected`](https://clinth.github.io/ixfx/types/Modulation.Forces.ForceAffected.html). That means it has some of these properties:

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

A basic thing, able to be force-affected can be as simple as:

```js
const thing = {
  position: { x: 0.5, y: 0.5 },
  mass: 1
}
```

Velocity and acceleration are _vectors_, capturing movement in both _x_ & _y_ directions. They are also signed. A negative _x_ value will mean that the thing is moving left, while a positive _x_ value will mean it is moving to the right.

Now, rather than changing the position or velocity yourself, update it with the supplied 'force functions'. These return a function which in turn apply the force to a thing.

We first create the forces we want to use.

For example, to give our thing some acceleration we might create an [acceleration force](https://clinth.github.io/ixfx/functions/Modulation.Forces.accelerationForce.html), and to slow it down, some friction based on [velocity](https://clinth.github.io/ixfx/functions/Modulation.Forces.velocityForce.html).

```js
import { Forces } from "https://unpkg.com/ixfx/dist/modulation.js"

// Accelerate to right with a force of { x:0.1, y:0 }
const accelForce = Forces.accelerationForce({
  x: 0.1,
  y: 0
})

// Reduce velocity due to friction
const frictionForce = Forces.velocityForce(0.00001);
```

Now that the forces have been created, they can be used. Typically, you do this in an animation loop, so the thing gets updated over time. 

[`Forces.apply`](https://clinth.github.io/ixfx/functions/Modulation.Forces.apply.html) takes an input 'thing' (ie. a [`ForceAffected`](https://clinth.github.io/ixfx/types/Modulation.Forces.ForceAffected.html) object) and applies a list of forces in order, returning a copy of the input after all the changes have been made.

```js
// Initialise thing
let thing = { position: { x: 0.5, y: 0.5 }, mass: 1 };

const loop = () => {
  // Apply accelForce and frictionForce on to thing,
  // setting it back again to the same variable
  thing = Forces.apply(thing,
    accelForce, 
    frictionForce);
  
  // eg. use newly calculated position
  moveElement(el, thing.position);

  // Keep loop running
  window.requestAnimationFrame(loop);
}
loop();
```

After applying a force, properties will be updated - typically its `position` and `velocity`. It's up to you to use these values somehow, for example moving a HTML element or rendering on the canvas.

Once initialised, you probably don't want to modify the thing directly, but rather do so through the application of forces.

The object you pass in to `Forces.apply` could have additional properties, these are preserved.

## Force settings

When working with forces, keep in mind that the scaling of the numbers is interdependent. Values are very much 'set to taste', and while experimenting, try orders of magnitude up and down in order to figure out its effect.

For coordinates, it's best to keep them relative (ie. _x_ and _y_ on a 0..1 scale), and map them to screen coordinates at only when necessary.


## Force functions


### Velocity & acceleration

Before getting too fancy, a good place to start is moving something around. Rather than set the velocity directly, it's better to affect the acceleration via [`accelerationForce`](https://clinth.github.io/ixfx/functions/Modulation.Forces.accelerationForce.html) and let `Forces.apply` integrate that into an updated velocity and position.

<demo-element style="height:40vh" title="Acceleration" src="/modulation/forces-accel/" />


This demo computes an acceleration based on the movement of the pointer (via [point tracker](../../data/trackers/#point)). Since we want to apply a dynamic acceleration force depending on the pointer movement, it's not possible to initialise the force function and re-use it. Rather, we call `Forces.accelerationForce` each time we apply.

```js
thing = Forces.apply(thing, 
        Forces.accelerationForce(avg, `dampen`));
```

(don't forget you can click the 'Source' button in the demo titlebar to see the full code)

Note how the acceleration force has the 'dampen' parameter. A few different forces use the thing's 'mass' field. With this parameter, we can choose for the mass to 'dampen' (ie reduce), 'multiply' (ie. increase) or be 'ignored'.

Along with the basic demo of acceleration above, there's a more complicated example that applies the force to an arbitary number of things

<demo-element style="height:40vh" title="Acceleration of particles" src="/modulation/forces-accel-particles/" />


### Wind and gravity

Wind and gravity can be modelled as affecting the acceleration of a thing with [`accelerationForce`](https://clinth.github.io/ixfx/functions/Modulation.Forces.accelerationForce.html)

For wind, we might make it push something to the right, with its power being dampened (ie. reduced) with greater mass of a thing:

```js
const windForce = Forces.accelerationForce({
   x: 0.00001, 
   y: 0 
   }, `dampen`
);
```

Gravity won't affect the _x_ value, but rather _y_, and in this case the force is multiplied with the mass (heavier will fall faster):

```js
const gravityForce = Forces.accelerationForce({ 
  x: 0, 
  y: 0.0001 
  }, `multiply`
);
```

### Friction & drag

Friction reduces speed with the [`velocityForce`](https://clinth.github.io/ixfx/functions/Modulation.Forces.velocityForce.html). This force essentially scales the current speed by the force value. By passing `multiply` as the second parameter, we can enhance the force with mass - heavier object, more friction.

```js
const friction = Forces.velocityForce(0.00001, `multiply`);
```

Drag also reduces speed, and is based on the the _square_ of the current velocity. We can use [`magnitudeForce`](https://clinth.github.io/ixfx/functions/Modulation.Forces.magnitudeForce.html). This produces a non-linear relation, compared with `velocityForce`. By passing `dampen` as the second parameter, we could reduce the force according the greater the mass - heavier object, less drag. Whether that makes any sense depends ont the dynamics you are creating.

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
// Target the relative position of x:0.2, y:0.4
const targetForce = Forces.targetForce({x: 0.2, y: 0.4 });
```

It has some options. `diminishBy` scales the acceleration speed (default 0.0001). `range` allows you to skip moving if the thing is within this x/y to the target. Without range, it can easily 'overshoot' and end up bouncing back and forth around the target but never stopping.

```js
const targetForce = Forces.targetForce(targetPos, {
  diminishBy: 0.1,
  range: { x: 0.01, y: 0.01} // If we're within 1% of target, that's good enough
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

The sun should be the thing that attracts the earth, so it is setup in the force, along with a gravity value of 0.1:

```js
// Init the sun's attractive force
const sunAttractionForce = Forces.attractionForce(sun, 0.1);

// Apply the force to earth
earth = Forces.apply(earth, sunAttractionForce);
```

The force can take a third parameter for the range at which the force is applied:

```js
// Only apply force when distance between sun and thing is between 1-10%
const sunAttractionForce = Forces.attractionForce(sun, 0.1, { max: 0.1, min: 0.01});
```

### Orientation

To make objects orient in the direction of travel, use [`orientationForce`](https://clinth.github.io/ixfx/functions/Modulation.Forces.orientationForce.html). This is also demonstrated in the attraction force demo above.

The parameter given to the force is the 'interpolation amount', which determines how quickly rotation happens.

```js
const orientationForce = Forces.orientationForce(1);
```

The orientation force is a handy composite which applies the following forces in order:
* [`angularForce`](https://clinth.github.io/ixfx/functions/Modulation.Forces.angularForce.html): updates angle and velocity based on angular acceleration & velocity
* [`angleFromAccelerationForce`](https://clinth.github.io/ixfx/functions/Modulation.Forces.angleFromAccelerationForce.html): update angularAcceleration based on acceleration's vector,  and
*  [`angleFromVelocityForce`](https://clinth.github.io/ixfx/functions/Modulation.Forces.angleFromVelocityForce.html): update angle based on velocity, to point in direction of travel

## Applying forces to many things

Use the regular Javascript constructs to apply forces to many objects.

```js
// Initial things
let things = [ /* lots of things */ ]
// Things now contains a set of things after force has been applied
things = things.map(t => Forces.apply(t, gravityForce));
```

## Dynamic forces

At times the pattern of initialising a force once and then reusing it repeatedly isn't appropriate. For example, if you want friction to be affected by a 'smoothness' property you have defined, this won't work:

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
