---
title: Springs
layout: ../../layouts/MainLayout.astro
---

<div class="tip">
<ul>
<li>API Reference <a href="https://clinth.github.io/ixfx/modules/Modulation.Oscillators.html">Modulation.Oscillators module</a></li>
<li><a href="https://clinth.github.io/ixfx-demos/modulation/">Demos</a></li>
<li><a href="https://fn-vis.pages.dev/1/#H4sIAHBW3mQAA3WSTU/DMAyG/0rkUyeVdkPiUjTuHNAkONIdQpttYc0HsQtFVf/7nHUf3WG5JLb8PrZf5bMH42oFBeBOegVD2oOV5ppITzfHP60MMaGtJi0bKHoIjiRpZ6GYp+C8rDT9Q7FgUSUbFi2GFGqFhFBwp0Z+KZbBuyPGkKZYEqORkYLRI8nI7kjxwXmuuHSJ050hH8cOV8w5vmE8XhjjQFPAylcT+eo0/N0hzttNEQ/T/nvtvarvA2BYc87VoxfRlZvV1myVNt4FEr1YYaWbRpILKAaxCc6IEnZEHos8b63fb7PKmVx3my6vNVLO3JbrmZR9YwmlrZxFEg4rsZzSMpR/yTxbzJ5Li4peLanwK5skmYnli+hLK4R3SG8KUW5VwvrMqo6SWcZVrYqyIRVP8/gQpwPsyO0nWh8A1vCT9lcCAAA=">fn-vis</a>: useful for seeing output values</li>
</ul>
</div>

## Springs

Somewhere between the ixfx [forces](../modulation/forces/) and [oscillators](../oscillator/) are springs.

<demo-element style="height:40vh" title="Spring oscillator" src="/modulation/oscillator-spring/" />

For a typical use of a spring, use [`Oscillators.spring`](https://clinth.github.io/ixfx/functions/Modulation.Oscillators.spring.html).

Like the other oscillators, it returns a [generator](../../gen/generator/). It generally returns values between 0..1, however depending on its settings, it might over-shoot the ends, for example returning 1.1.

```js
import { Oscillators } from "https://unpkg.com/ixfx/dist/modulation.js"

// Init spring
const spring = Oscillators.spring();

// Animation loop
const loop = () => {
  // Yields relative values ~0...~1
  //  or undefined when spring has stopped
  const v = spring.next().value;

  setTimeout(loop, 1);
}
loop();
```

Each time the loop function runs, `v` will have the value of the spring, or return _undefined_ if the spring has finished.

The value of the spring can be applied to anything. In the demo, it is used to calculate a position for the ring.

```js
// Point where spring was sprung
const fromPoint = { x: 0, y: 0 };
// Destination
const toPoint = { x: 1, y: 1 };

// Interpolate to get an in-between point.
// Since spring can overshoot 0..1, we pass in _true_ at
// for interpolate to allow this.
const pos = Points.interpolate(v, fromPoint, toPoint, true);
```

There are some options for `Oscillators.spring` for tweaking its behaviour.

```js
const spring = Oscillators.spring({
 mass: 5,        // Weight of thing at end of spring
 damping: 10,    // Energy loss as we move
 stiffness: 100,
 velocity: 0.1   // Multiplier for velocity
});
```
