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
<li>API Reference <a href="https://clinth.github.io/ixfx/modules/Data.html">Data module</a></li>
<li>Demo: <a href="https://clinth.github.io/ixfx-demos/geometry/point-interpolate/">Points.interpolate</a>, <a href="https://glitch.com/edit/#!/ixfx-interpolate-basics">Glitch demo</a>
</ul>
</div>

Interpolation (also known as _lerping_) allows the blending between two values. Where it really shines is when it is used over time to progressively reach some target value.

A simple implementation looks like this:

```js
// Interpolate from a->b by amount (0..1)
const interpolate = (amount, a, b) => (1-amount) * a + amount * b;
```

In ixfx it's found in the Data module as [`interpolate`](https://clinth.github.io/ixfx/functions/Data.interpolate.html).

```js
// repl-pad
import { interpolate } from "https://unpkg.com/ixfx/dist/data.js";
// Returns the value 50% between 200 and 400 (ie. 300)
interpolate(0.5, 200, 400);
```

ixfx has custom interpolation for [Lines](../../types/geometry/line/#interpolation), [Points](../../types/geometry/point/#interpolation) and [Colour](../../types/colour/#interpolation)

## Reaching a target

As mentioned in the introduction, interpolation is very often applied in an animation loop, slowly nudging a value to some target value. We adjust the interpolation 'amount' value to set how quickly the target should be reached.

The basic pattern can look like the following. Here we defined a property _saturation_ that we want to interpolate from 0 to 1 over time, with interpolation amount of 0.01.

```js
const state = {
  saturation: {
    target: 1,
    current: 0,
    amount: 0.01
  }
}
```

We make a helper function that interpolates any value of this shape - `{ target:number, current: number }`, and returns it:

```js
/**
 * Interpolates the given value.
 * @param {{ target:number,current:number,amount:number }} v
 * @param {number} [amount]
 */
const interpolateValue = (v, amount = 0.01) => {
  return {
    target: v.target,
    // If v.amount doesn't exist use the amount given as an
    // argument, or default to 0.01
    current: interpolate(v.amount ?? amount, v.current, v.target)
  }
}
```

Now we are ready to use this function in a loop. At the moment we're only interpolating `saturation`, but we have a reusable function that could interpolate several properties independently.

```js
const loop = () => {
  // Update state with interpolated saturation
  state = {
    ...state,
    saturation: interpolateValue(state.saturation)
  }
  
  // Loop
  window.requestAnimationFrame(loop);
}
loop();
```

[See this pattern on Glitch](https://glitch.com/edit/#!/ixfx-interpolate-basics)