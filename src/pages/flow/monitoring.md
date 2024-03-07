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

An overview:
* Elapsed.since(): time from a start point
* Elapsed.interval(): time from start point, and between each subsequent call
* Elapsed.once(): one-time measurement from a start point
  
## Elapsed

### Since
`since` yields how much time (in milliseconds) has passed since first invoked. This is the fixed reference point all later invocations are compared to.

```js
// repl-pad
import { Elapsed } from "https://unpkg.com/ixfx/dist/flow.js"

// A. Start monitoring elapsed time
const elapsed = Elapsed.since();

// ...some time later ...

elapsed(); // B. Elapsed time since (A)
// ...some time later ...
elapsed(); // C. Elapsed time since (A)
```

Each call to `elapsed()` reports the current time, it will continually change. 

### Interval

`Elapsed.interval` reports the time from the first initialisation and each subsequent call. Unlike `since`, there is a not a fixed reference point. It is always comparing to either the initial time or when the callback was last run.

```js
// repl-pad
import { Elapsed } from "https://unpkg.com/ixfx/dist/flow.js"

// A. Start monitoring elapsed time
const elapsed = Elapsed.interval();

// ...some time later ...

elapsed(); // B. Elapsed time since (A)
// ...some time later ...
elapsed(); // C. Elapsed time since (B)
```

### Once

`Elapsed.once` fixes both the start point and a second reference time. After initialisation, it records the time at which the first call happens. This is then given as the value for all future calls.

```js
// repl-pad
import { Elapsed } from "https://unpkg.com/ixfx/dist/flow.js"

// A. Start monitoring elapsed time
const elapsed = Elapsed.once();
// ...some time later...
elapsed(); // B. Time since (A). Since it is the first call, we now fix the second reference.
// ...some time later...
elapsed(); // C. Will be same value as earlier (B-A)
elapsed(); // D. As above, forever
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
