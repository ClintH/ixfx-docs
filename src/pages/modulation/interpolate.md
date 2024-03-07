---
title: Interpolation
layout: ../../layouts/MainLayout.astro
setup: |
  import { DemoElement } from '/src/components/DemoElement.ts';
  import FuncPlotElement from '/src/components/FuncPlotElement.ts';
---

<script type="module" hoist>
  import '/src/components/ReplPad';
</script>

<div class="tip">
<ul>
<li>API Reference <a href="https://clinth.github.io/ixfx/functions/Data.interpolate.html">Interpolate function</a></li>
<li>Demo: <a href="https://clinth.github.io/ixfx-demos/geometry/point-interpolate/">Points.interpolate</a>, <a href="https://glitch.com/edit/#!/ixfx-interpolate-basics">Glitch demo</a>
</ul>
</div>

Interpolation (also known as _lerping_) allows the blending between two values. Where it really shines is when it is used over time to progressively reach some target value.

A simple implementation looks like this:

```js
// Interpolate from a->b by amount (0..1)
const interpolate = (amount, a, b) => (1-amount) * a + amount * b;
```

In ixfx it's found in the [Data](https://clinth.github.io/ixfx/modules/Data.html) module as [`interpolate`](https://clinth.github.io/ixfx/functions/Data.interpolate.html).

```js
// repl-pad
import { interpolate } from "https://unpkg.com/ixfx/dist/data.js";
// Returns the value 50% between 200 and 400 (ie. 300)
interpolate(0.5, 200, 400);
```

ixfx has custom interpolation for [Lines](../../types/geometry/line/#interpolation), [Points](../../types/geometry/point/#interpolation) and [Colour](../../types/colour/#interpolation)

## Interpolator

As mentioned in the introduction, interpolation is very often applied in an animation loop, slowly nudging a value to some target value. We adjust the interpolation 'amount' value to set how quickly the target should be reached.

Using the `interpolate` function alone, we'd have to keep track of current value, target value and the amount to interpolate by. 

To simplify, there are two  _interpolators_ - [`interpolatorStepped`](https://clinth.github.io/ixfx/functions/Data.interpolatorStepped.html) and [`interpolatorInterval`](https://clinth.github.io/ixfx/functions/Data.interpolatorInterval.html) - which help by wrapping all this up. They keep track of interpolation progress and return a function which simply yields the current value.

```js
// Step from 0->1 in increments of 0.10
const value = interpolatorStepped(0.1);

value(); // First time will be 0
value(); // Second time will be 0.1
...etc
value(); // Last time ought to be 1
```

Like `interpolate` you can use custom start and points:
```js
// Step from 100->200 in increments of 0.10
const value = interpolateStepped(0.1, 100, 200);
```

When interpolation has completed, the function will just keep returning the final value.

The stepped version increments each time it is called. This means that the rate by which you call it determines how quickly
the range completes. 

Alternatively, use [`interpolatorInterval`](https://clinth.github.io/ixfx/functions/Data.interpolatorInterval.html). Rather than an amount to increment by, the first parameter is the time to progress through the range.

```js
// Step from 0->1 over one minute
const value = interpolatorInterval({ mins: 1});
// Step from 125->678 over 1000 milliseconds.
const value = interpolatorInterval(1000, 125, 678);
```

In practice, this is how an interpolator might be used:

```js
const state = {
  // Start saturation with an interval of 1ms,
  // meaning the value will be 100%
  saturation: interpolatorInterval(1)
}

const useState = () => {
  // Set background based on interpolated saturation value
  document.body.backgroundColor = `hsl(200, ${Math.floor(state.saturation()*100)}, 50%)`
}

const loop = () => {
  useState();
  window.requestAnimationFrame(loop);
}

const setup = () => {
  // When we click, restart interpolation from 0..1
  document.addEventListener(`click`, () => {
    state = {
      ...state,
      saturation: interpolatorInterval({ secs: 20 })
    }
  });
  loop();
}
setup();
```

[See this pattern on Glitch](https://glitch.com/edit/#!/ixfx-interpolate-basics)