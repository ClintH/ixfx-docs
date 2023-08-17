---
title: Monitoring
layout: ../../layouts/MainLayout.astro
setup: |
  import { DemoElement } from '../../components/DemoElement.ts';
---

<script type="module" hoist>
import '/src/components/ReplPad';
</script>
<div class="tip"><ul>
<li>API Reference <a href="https://clinth.github.io/ixfx/modules/Flow.html">Flow</a>.<a href="https://clinth.github.io/ixfx/modules/Flow.Elapsed.html">Elapsed</a> module</li>
<li><a href="https://clinth.github.io/ixfx-demos/flow/">Online demos</a></li>
</ul></div>

The [`Elapsed`](https://clinth.github.io/ixfx/modules/Flow.Elapsed.html) module has a few functions for tracking passage of time.

## Elapsed

`since` yields how much time (in milliseconds) has passed since first invoked.

```js
// repl-pad
import { Elapsed } from "https://unpkg.com/ixfx/dist/flow.js"

// Start monitoring elapsed time
const elapsed = Elapsed.since();

// ...some time later ...

elapsed(); // Get current elapsed time
// ...some time later ...
elapsed(); // New elapsed time
```

Each call to `elapsed()` reports the current time, it will continually change. An alternative is to use `Elapsed.once()`. This fixes the time when the callback function is first run.

```js
// repl-pad
import { Elapsed } from "https://unpkg.com/ixfx/dist/flow.js"

const elapsed = Elapsed.once();
// ...some time later...
elapsed(); // Current time. Timer is fixed at this point
// ...some time later...
elapsed(); // Will be same value as before
```

## Human-friendly elapsed time

[`toString`](https://clinth.github.io/ixfx/functions/Flow.Elapsed.toString.html) prints elapsed time in a human-friendly way:

```js
// repl-pad
import { Elapsed } from "https://unpkg.com/ixfx/dist/flow.js"

// With .since()
const elapsed = Elapsed.since();
Elapsed.toString(elapsed); // if it gets a function, it calls it

// With regular millis
const startTime = Date.now();
Elapsed.toString(Date.now() - startTime);
```

## Completion

If you have a known time period and you want to track reaching that elapsed time, use
[`Elapsed.progress`](https://clinth.github.io/ixfx/functions/Flow.Elapsed.progress.html). It gives a clamped percentage (0..1) for completion.

```js
// repl-pad
import { Elapsed } from "https://unpkg.com/ixfx/dist/flow.js"

// Start tracking 1 second time duration
const timer = Elapsed.progress(1000);

// ...later, call timer() to get a 0..1 value for completion:
timer(); // Yields 0..1
```

Intervals can be used:
```js
// Track progress towards 4 minutes
const timer = Elapsed.progress({ mins: 4 });
```
