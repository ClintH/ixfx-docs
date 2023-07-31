---
title: Loops and Intervals
layout: ../../layouts/MainLayout.astro
setup: |
  import { DemoElement } from '../../components/DemoElement.ts';
---
  
<div class="tip"><ul>
<li>API Reference <a href="https://clinth.github.io/ixfx/modules/Flow.html">Flow module</a></li>
<li><a href="https://clinth.github.io/ixfx-demos/flow/">Online demos</a></li>
</ul></div>

Overview:
* [continuously](#continuously): Useful for a 'main loop', can be controlled
* [delayLoop](#delayed-loop): A 'for' loop with some delay between iterations
* [interval](#interval): Calls an async function or generator with some delay, returning results as they happen

Without delays:
* [repeat](#repeat): Execute a function _x_ times, collecting results


## Running code in a timed loop

Some basic loops in Javascript look like:

```js
while (hue < 100) {
  hue++;
}

const list [ 100, 231, 90 ];
for (const i of list) {
  // Do something with each item of the list
}
```

They don't have any in-built options for looping at a certain speed.

Instead, we might use `setTimeout` or `setInterval`:
```js
setInterval(() => {
  // do something
}, 1000); // Code every second

// OR:
const f = () => {
  // Reschedule 'f' in 1 second
  // This means it will loop 
  setTimeout(f, 1000);
}
// Initial schedule 'f' in one second
setTimeout(f, 1000);
```

Or perhaps we want to run a loop really fast but not saturate the CPU:

```js
const draw = () => {
  // ... do some drawing
  window.requestAnimationFrame(draw); // Reschedule
}
window.requestAnimationFrame(draw); // Schedule
```

This might just be fine, however:
* You have to keep track of additional timer ids
* More plumbing required to adjust loop as it runs
* Not particularly readable

ixfx has two functions to help with timed loops:
* [continuously](#continuously): Useful for a 'main loop', can be controlled
* [delayLoop](#delayed-loop): A 'for' loop with some delay between iterations
  
### Continuously

[`continuously`](https://clinth.github.io/ixfx/modules/Flow.continuously.html) is a controllable loop.

```js
import { continuously } from "https://unpkg.com/ixfx/dist/flow.js"

continuously(() => {
  // do something at animation loop speed
}).start();
```

If you don't want the loop to run as fast as possible, provide the number of milliseconds between loops:

```js
const fetchData = async () => {
  try {
    const r = await fetch(`someurl`);
    this.state = {
      ...state,
      response: await r.json()
    }
  } catch (ex) {
    console.error(ex);
  }
};
// Runs every minute
continuously(fetchData, { mins: 1 }).start();
```

In action:
* [Poll data from an API](https://github.com/ClintH/ixfx-demos/tree/main/flow/fetch-poll)
* [Animate a gradient](https://github.com/ClintH/ixfx-demos/tree/main/dom/gradient-rotate)
* [Process a list of things](https://github.com/ClintH/ixfx-demos/tree/main/flow/list-async)

### Control

Note the use of `start` to start the loop. This allows you setup the loop once, and trigger it from different places. If `start` is called while already running, the timer is reset. `cancel` stops a loop that is scheduled to run.

```js
const job = () => { ... }
const jobLoop = continuously(job, 1000);
...
jobLoop.start();  // Starts loop, or resets it if already pending
jobLoop.cancel(); // Cancels a scheduled loop
```

It's possible to check the status of a loop:
```js
jobLoop.isDone;    // True if loop has stopped
jobLoop.elapsedMs; // How long since last start()
jobLoop.ticks;     // How many iterations of loop
```

The function that runs is given the number of loops and elapsed time as parameters. If the callback returns _false_, this will cause the loop to end. If _true_ or _undefined_ is returned, loop will continue to run.

```js
const job = (ticks, elapsedMs) => { 
  // End loop after 100 iterations  
  if (ticks > 100) return false; 
}
const jobLoop = continuously(job, 1000).start();
```

A callback can be provided to handle when `start` is called. This allows you to intercept the call and decide whether the loop should continue, cancel, reset or dispose (meaning it can't be used any longer). 'reset' is the default behaviour, if there's no `onStartCalled` function.

```js
const job = () => { ... }
const onStartCalled = (ticks, elapsedMs) => {
  // If we've been running for a minute, don't allow waiting period to be reset
  if (elapsedMs < 60*1000) return 'continue';
  // Could also return:
  // 'cancel': stop loop, but allow it to potentially start again
  // 'dispose': stop loop and prevent it from starting again
  // 'reset': cancel existing scheduled run and start from full interval
}
const jobLoop = continuously(job, 1000, { onStartCalled }).start();
```

### Delayed loop

If you don't need to adjust the loop or control it from other parts of your code, [`delayLoop`](https://clinth.github.io/ixfx/modules/Flow.delayLoop.html) might be what you need. It is an async generator which runs indefinitely and has a simple syntax:

```js
import { delayLoop } from "https://unpkg.com/ixfx/dist/flow.js"
for await (const o of delayLoop(1000)) {
  // Do something every second
  // Warning: loops forever
}
```

Note the use of _for await_ is important here. Use `break` when you want to exit the loop.

## Repeat

[`repeat`](https://clinth.github.io/ixfx/modules/Flow.html#repeat) runs a function a certain number of times, accumulating the results into an array.

```js
// repl-pad
import { repeat } from "https://unpkg.com/ixfx/dist/flow.js"

// Five random numbers in an array
const results = repeat(5, () => Math.random());
```

If you don't care about the return value of the function, consider using [`count`](../../data/generator/#count).

If a function is provided instead of a number, repeat will continue until the function returns _false_.

```js
// repl-pad
import { repeat } from "https://unpkg.com/ixfx/dist/flow.js"

// Keep repeating until 10 values have been generated
const results = repeat(
  (repeats, valuesProduced) => valuesProduced < 10,
  () => Math.random());
```

## Interval

[`interval`](https://clinth.github.io/ixfx/functions/Flow.interval-1.html) calls and yields the result of an synchronous or asynchronous function/generator at a given interval. It is an asynchronous generator, note the `for await` rather than `for`.

The type signature looks like:

```typescript
AsyncPromiseOrGenerator<V>: (() => V | Promise<V>) | Generator<V> | AsyncGenerator<V>

IntervalOpts: {
    delay?: "before" | "after";
    fixed?: Interval;
    minimum?: Interval;
    signal?: AbortSignal;
}
interval<V>(produce, opts?:IntervalOpts): AsyncGenerator<V>
```

This example prints a new random number every second

```js
import { interval } from "https://unpkg.com/ixfx/dist/flow.js"

const randomGenerator = interval(() => Math.random, 1000);
for await (const r of randomGenerator) {
  // Prints a new random number every second
  console.log(r);
}
// This will not run unless there is a `break` in the for await loop
console.log(`Done.`); 
```

Iterate through items in a list, one item per minute
```js
const opts = { fixed: { mins: 1 }, delay: 'before' };
const list = [ 'thom', 'jonny', 'colin', 'ed', 'phil' ];
for await (const i of interval(list, opts)) {
  // do something with i
}
```

You can step through a generator's return values using `interval`:

```js
import { count } from "https://unpkg.com/ixfx/dist/generators.js";
import { interval } from "https://unpkg.com/ixfx/dist/flow.js";

// A generator that counts to 5
const counter = count(5);
// Use interval to loop over counter with 1000ms delay
for await (const v of interval(counter, 1000)) {
  // Counts from 0...4, with a delay between each
  console.log(v);
}
```

Or alternatively, using the `.next().value` style of accessing a generator:

```js
const counter = count(5);
const counterInterval = interval(counter, 1000);
// Pauses until interval is up
const v = await counterInterval.next().value;
// Execution continues after interval period...
```

<!-- ## With generators

[Generators](../../data/generator/) can looped over with [`forEach`](https://clinth.github.io/ixfx/modules/Flow.html#forEach)

```js
import { count } from "https://unpkg.com/ixfx/dist/generators.js"
import { forEach } from "https://unpkg.com/ixfx/dist/flow.js"

forEach(count(5), () => {
  // This will run five times
})
```

If you know the generator is finite, an alternative is to convert to an array, and utilise JS's inbuilt `forEach`:

```js
import { count } from "https://unpkg.com/ixfx/dist/generators.js"
[...count(5)].forEach( () => {
  // This will run five times
});
```

Or naturally, using a `for ... of`:

```js
import { count } from "https://unpkg.com/ixfx/dist/generators.js"
for (const i of count(5)) {
  // This will run five times.
}
```

Which to use? the ixfx `forEach` is concise and readable. It has the advantage of not needing to declare a parameter, unlike `for ... of`. Converting to an array avoids having to declare a variable too, but it's not possible to use infinite generators (such as [pingPong](../../data/generator/#ping-pong)).

[`forEachAsync`](https://clinth.github.io/ixfx/modules/Flow.html#forEachAsync) can be used if you want to iterate using an asynchronous callback. See the next section for an example. -->

