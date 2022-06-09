---
title: Random
layout: ../../layouts/MainLayout.astro
setup: |
  import DensityPlotElement from '../../components/DensityPlotElement';
---

<script type="module" hoist>
  import '/src/components/ReplPad';
  import '/src/loader';
  import '/src/components/DensityPlotElement';
  import {weightedInteger, weighted, gaussian} from '/node_modules/ixfx/dist/random.js';
  import {Easings} from '/node_modules/ixfx/dist/modulation.js';
  window.weightedInteger = weightedInteger;
  window.weighted = weighted;
  window.Easings = Easings;
  window.gaussian = gaussian;
  importEl(
    `plot1`, 
    `density-plot-element`, {
      fn: "Math.random()"
  });
  importEl(
    `plot2`, 
    `density-plot-element`, {
      fn: "weighted('quadIn')",
      editable: true
  });
  importEl(
    `plot-gaussian`, 
    `density-plot-element`, {
      fn: "gaussian()",
      editable: true
  });
</script>

* API Docs: [Easings.time](https://clinth.github.io/ixfx/modules/Modulation.Easings.html#time)
* [Online modulation demos](https://clinth.github.io/ixfx-demos/modulation/)

## Random number generation

JavaScript's go-to way of generating a random number is `Math.random`. It returns a number between 0-1 with a roughly even distribution.

The plot below shows `Math.random`, with the horizontal axis shows values from 0 on the left to 1 on the right. Note how the plot mostly fills out evenly along the horizontal axis.

<!-- 
<density-plot-element id="plot1" view="linear" client:visible fn="weightedInteger(10);" /> -->

<div id="plot1"></div>

### Weighted distribution

To make some numbers more likely than others, you may want some form of _weighted distribution_. 

ixfx's [`Random.weighted`](https://clinth.github.io/ixfx/modules/Random.html#weighted) uses an [easing function](../../modulation/easing/) to shape random numbers.

When using the _quadIn_ easing (the default), note how the density of random values skews toward 0, visually shown as the left-most part of the bar.

<div id="plot2"></div>

```js
// repl-pad
import {weighted} from 'https://unpkg.com/ixfx/dist/random.js';
// Yields 0-1 (inclusive) random number
weighted(`quadIn`);
weighted(`quadOut`);
```

Random integers (ie. whole numbers) can be produced with [`Random.weightedInteger`](https://clinth.github.io/ixfx/modules/Random.html#weightedInteger). This is useful for producing random array indexes.

A range is provided to the function, with the return value always below the maximum (ie, it is _exclusive_). The minimum, 0 by default, might be returned (ie, it is _inclusive_).

```js
// repl-pad
import {weightedInteger} from 'https://unpkg.com/ixfx/dist/random.js';
weightedInteger(10);      // 0-9
weightedInteger(10, 20);  // 10-19
weightedInteger(100, `quadIn`);       // 0-99, specifying the easing function
weightedInteger(100, 200, `quadOut`); // 100-199, specifying the easing function
```

To use for accessing an array randomly:
```js
const list = [`mango`, `kiwi`, `grape`];
// Yields random item from list
list[weightedInteger(list.length)];
```

### Gaussian distribution

Gaussian distribution has a 'bell curve' shape, centred around the middle. In other words, you'd expect to get more random values around 0.5 than 0 or 1. ixfx's [`Random.gaussian`](https://clinth.github.io/ixfx/modules/Random.html#gaussian) provides this.

<div id="plot-gaussian"></div>

```js
// repl-pad#2
import {gaussian} from 'https://unpkg.com/ixfx/dist/random.js';

// Yields a random number between 0..1
gaussian();
```

The function takes a _skew_ parameter which shifts the centre of the curve.

```js
// repl-pad#2
// Shifts distribution to right, closer to 1
gaussian(0.1);
// Shifts distribution to the left, closer to 0
gaussian(6);
```

