---
title: Easing
layout: ../../layouts/MainLayout.astro
setup: |
  import { DemoElement } from '/src/components/DemoElement.ts';
  import FuncPlotElement from '/src/components/FuncPlotElement.ts';
---

<div class="tip">
<ul>
<li>API Reference <a href="https://clinth.github.io/ixfx/modules/Modulation.Easings.html">Easings module</a></li>
<li><a href="https://fn-vis.pages.dev/1/#H4sIANJT3mQAA1WQsU7EMAyGX+VXphaVpiwMRcfGwMDESCtdufpKIHGixq1OqvruJCeBdJttff5+yx+bcn4k1apgvai92hQP7r+vlGEjZrCq3fYqo1G1aWekKIm5V3tfXZs87hNhXPCzYMPLEA1PETvOs3fo1JdIiK3WC4efqT55p83lfNGjiaKTd7GDGM/1d+zUU8cda50dBMPwK83wTHCGF6GOT56jgHD4i6nFOCqOn2TtscJjc/fQNE159USSVxaa18EWRYnDM7aOAUuCNQkonxKStSgzDaTcd+IRiV9SFBB8lDeKcZioWLNzr5D0uQJUetjNA/tfXucbdFIBAAA=">fn-vis</a>: useful for seeing output values</li>
<li><a href="https://clinth.github.io/ixfx-demos/modulation/">Online modulation demos</a></li>
</ul>
</div>


Easing functions help to give a *dynamic* to transition. In [Cartesian](../../types/geometry/units/#cartesian) terms, they give a _y_ value for _x_ (where x is 0 .. 1). Or in temporal terms, you can think of them as giving a value at time _t_ (where _t_ is 0 .. 1).

Normally, a way of getting from 0 to 1 would be count upwards by some fixed amount. And if that's all you need, ixfx's [count](../../gen/generator/#count) and [numericRange](../../gen/generator/#numeric-range) functions might do the job.

For example, count by 0.1 from 0 to 1:

<div data-easing=true id="demo0" title="Linear function" fn="x"></div>

This is a _linear_ function, with the same 'speed' throughout the progression towards the end point.

In contrast, easing functions give some dynamics to the journey. For example, maybe it starts slowly, but gets faster as it nears the end, as in this `cubicIn` function:

<div data-easing=true id="demo1" title="cubicIn" easing="cubicIn"></div>

Or perhaps gathering speed quickly, but then slowing down toward the end (`cubicOut`):

<div data-easing=true id="demo1" title="cubicOut" easing="cubicOut"></div>

Jump to the [Defined Easings](#defined-easings) to see a list of pre-defined easing functions.

## Usage

Easings can be driven by time or _ticks_, created by [`Easings.time`](https://clinth.github.io/ixfx/functions/Modulation.Easings.time.html) or [`Easings.tick`](https://clinth.github.io/ixfx/functions/Modulation.Easings.tick.html), respectively. 

Each of these returns an [`Easings.Easing`](https://clinth.github.io/ixfx/types/Modulation.Easings.Easing.html), which has this type:

```typescript
type Easing = {
  // Returns value at this point
  // Usually 0-1, but some functions can overshoot
  compute():number
  // Reset easing to beginning
  reset():void
  // Returns true if easing is finished
  get isDone():boolean
}
```

### Time-based

Example: 'sineIn' easing that takes one second to complete:

```js
import { Easings } from "https://unpkg.com/ixfx/dist/modulation.js";

// Initialise
const e = Easings.time(`sineIn`, 1000);

// Returns value at this point in time.
// Usually 0-1, but some functions overshoot bounds
const v = e.compute();
// ..call e.compute() whenever the 'latest' value is needed

// Can check if easing has completed
if (e.isDone) ...
```

Time starts being counted from when the easing is initialised (ie. calling `Easings.time()`). For this reason, you likely want to initialise just before it's needed, or values you will lose part of the range. Calling `reset()` can also be useful for resetting the timer.

You'll probably call `compute()` inside an existing draw/update loop that is running. If you don't have a loop already, here is a snippet that returns an easing over time:

```js
import { Generators, Flow } from "https://unpkg.com/ixfx/dist/bundle.js";
import { Easings } from "https://unpkg.com/ixfx/dist/modulation.js";

// Define an easing that takes 1 second to reach end
const e = Easings.time(`sineIn`, 1000);

// Increment by 10% from 0 to 1
const range = Generators.numericPercent(0.1); 
// Iterate over range at 100ms intervals
for await (const v of Flow.interval(range, 100)) {
  console.log(e.compute());
}
```

* [Try it out with fn-vis](https://fn-vis.pages.dev/1/#H4sIAABU3mQAA1WQsU7EMAyGX8XK1KLSlIWhp2NjYGBiJJUuXH0lkDhR7VYnVX13kpNAYrT1+fut/31TIY6oepV8FLU3myIb/uZGOXLirFf9tjcFZdXnmxFZMnOv9qG5DWU9ZMKFFGeBDZ4tO5oYdrjMMYBRnyKJe60XSt9Te45Bu+vlqkfHorN38VZcpPaLjToYMqR1cSA4grjiDJEQgqNF0NA5EgsgHH9jWnEBq9MHen9q4LG7e+i6rr55GOWFBOfV+qqq4fgEmyEAjwJrFmB5JWVrVRcaIOe+IY2Q+SVHAaTI8orMdsJqLc69gayvDyqX9a+84Qc1a72VTgEAAA==)

### Tick-based
Example: a `sineOut` easing that takes 100 ticks to complete:

```js
import { Easings } from "https://unpkg.com/ixfx/dist/modulation.js";

// Set up
const e = Easings.tick(`sineOut`, 100);

// Get the value of the easing function at this point
const v = e.compute();
// ...each call to compute() will 'advance' the easing
// function by one tick. So after 100 calls to compute()
// the function will be done.

// Can check if easing has completed
if (e.isDone) ...
```

`compute` typically returns value between 0..1, but some functions purposefully overshoot this range (such as the `back` series of easings, shown [below](#defined-easings)).

Once you have this value, it can be applied as necessary. For example, positioning an element:

```js
el.style.transform = `translate(${e.compute() * width}px, 0px)`;
```

See the source of the demos below for more ideas, or [try it out on fn-vis](https://fn-vis.pages.dev/1/#H4sIAB5U3mQAA1WRQU/DMAyF/8pTTq1U1u3aadw47MAJbnTSQuu1YakTNe6YVPW/kwaB4Gj7vc/P8tusBteSqpS3TtRSzIr18FsXyrARo62q5qVYpUFV0dNSkKh5UMupSMXaPkWFGbwbBTOedDDcBSy4jG5ArXoRH6qynNhfu03jhtLcL/eyNUHKyJ2sFuN48xFqta+55rLEq74SdsV2u4WY5hogDp2D9KObuh6UViTlkWPXBDQ6UAHHlAz4NNai197TN5B008fJEMc9wTDTCK9jXndBIDmy0HjTFolkLbU1N46DgHD4uWizkrPzO1l7LrCL4fKU948/y3IcHjHXDFgS3KKb1pP9JJTlqxqIcV6IW0T9RGvDuyDPFILuKLutzCXh872KT/n3pNMX560UxrYBAAA=)

## It's a function

It's good to remember that easing functions are not magic. They just return a number based on an input within the range of 0..1.

An easing-function-from-scratch example is an exponential function:

```js
const fn = (x) => Math.pow(x,2);
fn(0);    // 0
fn(0.5);  // 0.25
fn(0.75); // 0.5625
fn(1);    // 1
```

You can see this in action:

<div editable data-easing=true id="demo2" fn="Math.pow(x,2)"></div>

Try the following functions:
* `x`: Linear, returns the same input value
* `x/2`: Halves input value
* `Math.sqrt(x)`: Square root of value
* `Math.random() * x`: Reduces value by some random amount
* `x + (0.1 - Math.random()* 0.2)`: Jitters value by up to 10%
  
Pre-defined easing functions can be used directly to avoid the time/tick mechanism. In this case, you need to provide an input value on a scale of 0..1.

```js
import { Easings } from "https://unpkg.com/ixfx/dist/modulation.js";

// Get the function
const fn = Easings.functions.cubicIn;

// Use it to transform an input value (0..1)
// and set to variable 'v'
const v = fn(0.5);
```

## Demos

Here, the easing function advances on each call (tapping the circle), rather than by time.

<demo-element title="Discrete easing" src="/modulation/easing-tick/" />

Below is the common usage of time-based easing

<demo-element title="Timer easing" src="/modulation/easing-timer/" />

In this demo, a target value is reached over time by using an easing function.

<demo-element title="Easing set" src="/modulation/easing-set/" />


<script type="module" hoist>
import '/src/components/FuncPlotElement';
import {Easings} from '/node_modules/ixfx/dist/modulation.js';
const run = () => {
  document.querySelectorAll(`[data-easing]`).forEach(el => {
    const plot = document.createElement(`func-plot-element`);// importEl(el, `func-plot-element`);
    el.append(plot);
    const fnAttr = el.getAttribute(`fn`);
    const easingAttr = el.getAttribute(`easing`);
    const editableAttr = el.getAttribute(`editable`);
    plot.editable = editableAttr !== `false` && editableAttr !== null;

    if (fnAttr !== null && fnAttr.length > 0) {
      plot.setFunctionByString(fnAttr);
    } else if (easingAttr !== null && easingAttr.length > 0) {
      const easingFn = Easings.get(easingAttr);
      if (easingFn === undefined) {
        console.error(`Could not find easing: ${easingAttr}`);
      } else {
        plot.setFunction(easingAttr, easingFn);
      }
    } else {
      console.warn(`Neither fn or easing attributes defined for function plot.`);
    }

    // Give component time to render before plotting
    // setTimeout(() => {
    //   plot.plot(false);
    // }, 1000);
  });
}
setTimeout(() => run(), 10);
</script>

## Custom curves

### Simple cubic beziers

You can make your own easing curve using a simplified _cubic bezier_. See [this curve, for example](https://cubic-bezier.com/#0,1.24,1,-1.15). It's defined by points `0, 1.24, 1, -1.15`. The key points we need here are `1.24` (point b), and `-1.15` (point d).

This can be used as follows:

```js
import { Easings } from "https://unpkg.com/ixfx/dist/modulation.js";
const e = Easings.time(Easings.fromCubicBezier(1.24, -1.15), 1000);
e.compute();
```

Use the [cubic bezier editor](https://cubic-bezier.com/#0,1.24,1,-1.15) to shape a curve, but make sure the first point remains 0 and the third point remains 1.


## Defined easings

There are several well known easing functions which are pre-defined in ixfx.

<!-- Astro bug. Either we get two lit elements, or an exception -->
<!-- <easing-gallery-element client:only="lit" /> -->

<div id="easingGallery"></div>
<script type="module" hoist>
import '/src/loader';
import '/src/components/modulation/EasingGalleryElement';
importEl(
  `easingGallery`, 
  `easing-gallery-element`, {});
</script>

## Credits

Most easing functions by [Andrey Sitnik and Ivan Solovev](https://easings.net/) 