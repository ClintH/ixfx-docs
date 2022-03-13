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
  import {jitter, Easings} from '/node_modules/ixfx/dist/modulation.js';
  window.weightedInteger = weightedInteger;
  window.weighted = weighted;
  window.jitter = jitter;
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
  `plot3`, 
  `density-plot-element`, {
    fn: "jitter(0.5, 0.2)",
    scaleMin: 0,
    scaleMax: 1,
    editable: true
  });
  importEl(
    `plot4`, 
    `density-plot-element`, {
      fn: "jitter(0.5, 0.2, {}, gaussian)",
      scaleMin: 0,
      scaleMax: 1,
      editable: true
  });

    importEl(
    `plot-gaussian`, 
    `density-plot-element`, {
      fn: "gaussian()",
      scaleMin: 0,
      scaleMax: 1,
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

ixfx's [`Random.weighted`](https://clinth.github.io/ixfx/modules/Random.html#weighted) uses an [easing function](../modulation/easing) to shape random numbers.

When using the _quadIn_ easing (the default for `weighted`), note how the density of random values skews toward 0.

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

Gaussian distribution has a 'bell curve' shape, centred around the middle.

<div id="plot-gaussian"></div>

In ixfx, [`Random.gaussian`](https://clinth.github.io/ixfx/modules/Random.html#gaussian) to produce a random number with a gaussian distribution. That means you'd expect to get more random numbers around 0.5 than around 0 or 1.

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

## Jitter

_Jitter_ is the random modulation of a value. It is usually _bi-polar_, meaning that it might shift a value upwards or downwards. 

On a [normalised](../temporal/normalising) scale of 0..1 scale, let's say we want to apply jitter of 10% to a value of 0.5. If the jitter was to be absolute, that yields a potential new value of 0.4 - 0.6. An algorithm for this is:

```js
// repl-pad
import {clamp} from 'https://unpkg.com/ixfx/dist/bundle.js';

const jitter = (value, jitter) => {
  // Double jitter in order to +- and apply random
  const j = jitter * 2 * Math.random();
  // Offset value, add j and clamp to 0-1
  return clamp(value - jitter + j);
}
// Jitter a value of 50% by 10%
// Yields a range of 0.4-0.6
jitter(0.5, 0.1);
``` 

Another option is to jitter by a relative amount, with respect to the input value. In that case, jittering 0.5 by 10% yields a range of 0.45 - 0.55, because 10% of 0.5 is 0.05. Thus for a given jitter amount, a larger input value will jitter more wildly than a smaller value, creating a sense of instability.

ixfx provides both of these approaches with [`jitter`](https://clinth.github.io/ixfx/modules/Modulation.html#jitter).

```js
// repl-pad
import {jitter} from 'https://unpkg.com/ixfx/dist/modulation.js';
// jitter(value:number, jitterAmt:number, opts?:JitterOpts, rand?:()=>number)

// Absolute jitter 0.5 by 10%
jitter(0.5, 0.1); // number 0.4-0.6

// Relative jitter 0.5 by 10%
jitter(0.5, 0.1, {type:`rel`}); // number 0.45-0.55
```

<div id="plot3"></div>

By default `jitter` uses `Math.random`, but you could just as well plug in a [`weighted`](https://clinth.github.io/ixfx/modules/Random.html#weighted), or [gaussian](https://clinth.github.io/ixfx/modules/Random.html#gaussian) random number generator.

```js
import {jitter} from 'https://unpkg.com/ixfx/dist/modulation.js';
import {gaussian} from 'https://unpkg.com/ixfx/dist/random.js';
// Note we pass in as a function, so no () after gaussian
jitter(0.5, 0.2, {}, gaussian);
```

In the below plot, note that jitter is more likely to be closer than further away from the original value of 0.5. It gives a nice 'feathering' at the edges, somewhat more organic.

<div id="plot4"></div>

## With arrays

[`randomElement`](https://clinth.github.io/ixfx/modules/Collections.Arrays.html#randomElement) returns a random element from an array, [`randomIndex`](https://clinth.github.io/ixfx/modules/Collections.Arrays.html#randomIndex) returns a random index.

```js
// repl-pad
import {randomElement, randomIndex} from 'https://unpkg.com/ixfx/dist/arrays.js';
const a = [`apples`, `oranges`, `melons`, `bananas`];
randomElement(a); // eg. `melons`
randomIndex(a);   // eg. 3
```

Tip: `weightedInteger`, described above, can be used for skewing the distributing of random elements:
```js
import {weightedInteger} from 'https://unpkg.com/ixfx/dist/random.js';
const a = [`apples`, `oranges`, `melons`, `bananas`];
a[weightedInteger(a.length)];
```


[`randomPluck`](https://clinth.github.io/ixfx/modules/Collections.Arrays.html#randomPluck) picks a random element from an array and an array of all the other elements.

```js
// repl-pad
import {randomPluck} from 'https://unpkg.com/ixfx/dist/arrays.js';
const a = [`apples`, `oranges`, `melons`, `bananas`];
let {value,array} = randomPluck(a);

value; // a random element
array; // an array of remaining elements
```

[`shuffle`](https://clinth.github.io/ixfx/modules/Collections.Arrays.html#shuffle) randomises the ordering of an array.

```js
// repl-pad#1
import {shuffle} from 'https://unpkg.com/ixfx/dist/arrays.js';
const a = [`apples`, `oranges`, `melons`, `bananas`];
// Yields a randomly ordered version, eg: [`melons`,`apples`,`bananas`,`oranges`];
const b = shuffle(a);
```

Once shuffled, you can then iterate over the array as normal:

```js
// repl-pad#1
const c = [1,2,3,4,5,6,7,8,9,10];
// Prints items from array in random order
for (const i of shuffle(c)) {
  console.log(i);
}
```

Tip: `weighted`, `weightedInteger`, `randomPluck` and `shuffle` can all take a custom random number generator as a parameter. This allows you to skew the results. See the API docs for the respective function.