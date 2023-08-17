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
    fn: "jitter({ relative: 0.2})(0.5)",
    scaleMin: 0,
    scaleMax: 1,
    editable: true
  });
  importEl(
    `plot4`, 
    `density-plot-element`, {
      fn: "jitter({ absolute: 0.2, source: gaussian })(0.5)",
      scaleMin: 0,
      scaleMax: 1,
      editable: true
  });
</script>

<div class="tip">
<ul>
<li>API Reference <a href="https://clinth.github.io/ixfx/functions/Modulation.jitter.html">jitter function</a>, <a href="https://clinth.github.io/ixfx/modules/Modulation.html">Modulation module</a></li>
<li><a href="https://fn-vis.pages.dev/1/#H4sIADVU3mQAA42RQW/CMAyF/4qVC2WEBq5F7DhpB6TdVw5RayCQJl1tKqSq/31OGUy77RAp+eL3/Cx/DqqJNapCtT6yGvWggm2eb61ccOysV8Uw6lRKqhBNjcRSs1TjXk+PhPdS4Zo2dgzD2TFjN8Khiw3MTswtFcZcQ3s55lVsjLsdbqZ2xEY8r96yiyE/02xThodF5W3TaqDKevyPUW3Z/liUwSMDu+pCsIWVkCoGYjHBrwTy9RPdg74FwfdrNpQBYGqOdQHcXVEn0mFK2WOR5GUY52JByO9BNL31WTaH7StMYmPgo5OxKiRYrvM81QOkSL202Vk+5eRCNuVbLF5SquQG0/c0b9ZrUWpY//JH0Ky/s3TaSLxDInsURcKjSFar+UbJHv/sdf8NJX3U8OkBAAA=">fn-vis</a>: useful for seeing output values</li>
</ul>
</div>

_Jitter_ is the random modulation of a value. It is usually _bipolar_, meaning that it might shift a value upwards or downwards. 

On a [normalised](../../data/normalising/) scale of 0..1 scale, let's say we want to apply jitter of 10% to a value of 0.5. If the jitter was to be absolute, that yields a potential new value of 0.4 - 0.6. An algorithm for this is:

```js
// repl-pad
import { clamp } from 'https://unpkg.com/ixfx/dist/bundle.js';

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

ixfx provides both of these approaches with [`jitter`](https://clinth.github.io/ixfx/functions/Modulation.jitter.html). It returns a function to jitter values.

```js
// repl-pad
import { jitter } from 'https://unpkg.com/ixfx/dist/modulation.js';

// Absolute jitter 0.5 by 10%
jitter({ absolute: 0.1 })(0.1); // number 0.4-0.6

// Relative jitter 0.5 by 10%
jitter({ relative: 0.1 })(0.5); // number 0.45-0.55
```

Remember that `jitter` returns a function (which is why there's the double parenthesis in the example above). This is so the same jitter options can easily be reapplied to changing values.

```js
// One-time steup
const jitterFn = jitter({ absolute: 0.1 });

// Re-use the function when you like
jitterFn(100); // Jitter 100 by an absolute 10%;
jitterFn(50); // Jitter 50 by an absolute 10%
```

Try adjusting the value-to-jitter and jitter amount:

<div id="plot3"></div>

By default `jitter` uses `Math.random`, but you could just as well plug in a [`weighted`](https://clinth.github.io/ixfx/modules/Random.html#weighted), or [`gaussian`](https://clinth.github.io/ixfx/modules/Random.html#gaussian) random number generator.

```js
import { jitter } from 'https://unpkg.com/ixfx/dist/modulation.js';
import { gaussian } from 'https://unpkg.com/ixfx/dist/random.js';

// Note we pass in as a function, so no () after gaussian
const jitterFn = jitter({ absolute:0.2, source: gaussian });
```

In the plot below, notice how jitter is more likely to be close to the original value, instead of being evenly distributed across the whole specified jitter range. A more organic outcome?

<div id="plot4"></div>
