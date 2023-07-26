---
title: Monitoring
layout: ../../layouts/MainLayout.astro
setup: |
  import { DemoElement } from '../../components/DemoElement.ts';
---

<div class="tip"><ul>
<li>API Reference <a href="https://clinth.github.io/ixfx/modules/Flow.html">Flow</a>.<a href="https://clinth.github.io/ixfx/modules/Flow.Elapsed.html">Elapsed</a> module</li>
<li><a href="https://clinth.github.io/ixfx-demos/flow/">Online demos</a></li>
</ul></div>

The [`Elapsed`](https://clinth.github.io/ixfx/modules/Flow.Elapsed.html) module has a few functions for tracking passage of time.

## Elapsed

`since` yields how much time has passed since first invoked.
```js
// Start monitoring elapsed time
const elapsed = Elapsed.since();

// ...some time later ...

elapsed(); // Get current elapsed time
```

[`toString`](https://clinth.github.io/ixfx/functions/Flow.Elapsed.toString.html) prints elapsed time in a human-friendly way:

```js
// With .since()
console.log(`Elapsed time: ${Elapsed.toString(elapsed)}`);

// With regular millis
console.log(`Elapsed time: ${Date.now() - startTime}`);
```

## Completion

If you have a known time period and you want to track reaching that elapsed time, use
[`Elapsed.progress`](https://clinth.github.io/ixfx/functions/Flow.Elapsed.progress.html). It gives a clamped percentage (0..1) for completion.

```js
import { Elapsed } from "https://unpkg.com/ixfx/dist/flow.js"

// Start tracking 1 second time duration
const timer = Elapsed.progress(1000);

// ...later, call timer() to get a 0..1 value for completion:
timer(); // Yields 0..1
```
