---
title: Jitter
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
      fn: "jitter(0.5, 0.2, {type:`abs`}, gaussian)",
      scaleMin: 0,
      scaleMax: 1,
      editable: true
  });
</script>

<div class="tip">
<ul>
<li>API Reference <a href="https://clinth.github.io/ixfx/functions/Modulation.jitter.html">jitter function</a>, <a href="https://clinth.github.io/ixfx/modules/Modulation.html">Modulation module</a></li>
<li><a href="https://clinth.github.io/ixfx-demos/playgrounds/modulation/plot/index.html#aW1wb3J0IHsgaml0dGVyIH0gZnJvbSAnaHR0cHM6Ly91bnBrZy5jb20vaXhmeC9kaXN0L21vZHVsYXRpb24uanMnOwpjb25zdCB2YWx1ZSA9IDAuNTsKY29uc3Qgaml0dGVyQW10ID0gMC4xOwpzZXRJbnRlcnZhbCgoKT0+IHsKICBwb3N0TWVzc2FnZShqaXR0ZXIodmFsdWUsIGppdHRlckFtdCkpCn0sMTAwKTsKICAgIA==">Value Plotter</a>: useful for seeing output values</li>
</ul>
</div>

_Jitter_ is the random modulation of a value. It is usually _bipolar_, meaning that it might shift a value upwards or downwards. 

On a [normalised](../../data/normalising/) scale of 0..1 scale, let's say we want to apply jitter of 10% to a value of 0.5. If the jitter was to be absolute, that yields a potential new value of 0.4 - 0.6. An algorithm for this is:

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

Try adjusting the value-to-jitter and jitter amount:

<div id="plot3"></div>

By default `jitter` uses `Math.random`, but you could just as well plug in a [`weighted`](https://clinth.github.io/ixfx/modules/Random.html#weighted), or [`gaussian`](https://clinth.github.io/ixfx/modules/Random.html#gaussian) random number generator.

```js
import {jitter} from 'https://unpkg.com/ixfx/dist/modulation.js';
import {gaussian} from 'https://unpkg.com/ixfx/dist/random.js';

// Note we pass in as a function, so no () after gaussian
jitter(0.5, 0.2, {type:`abs`}, gaussian);
```

In the plot below, notice how jitter is more likely to be close to the original value, instead of being evenly distributed across the whole specified jitter range. This is a more organic outcome.

<div id="plot4"></div>
