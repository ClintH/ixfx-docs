---
title: Loops and Intervals
layout: ../../layouts/MainLayout.astro
setup: |
  import { DemoElement } from '../../components/DemoElement.ts';
---

<script type="module" hoist>
import '/src/components/ReplPad';
</script>
<div class="tip"><ul>
<li>API Reference <a href="https://clinth.github.io/ixfx/modules/Flow.html">Flow module</a></li>
<li><a href="https://clinth.github.io/ixfx-demos/flow/">Online demos</a></li>
</ul></div>

Overview:
* [continuously](#continuously): Useful for a 'main loop', can be controlled. Typically for loops that run forever, like an animation loop. It's an object.
* [delayLoop](#delayed-loop): A 'for' loop with some delay between iterations. It's a generator.
* [interval](#interval): Calls an async function or generator with some delay, returning results as they happen. It's a generator.
* [repeat](#repeat): Execute a function a given number of times, collecting results. It's a generator.

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
  // Reschedule itself to run again 
  // in 1 second, creating a loop
  setTimeout(f, 1000);
}
// Initial schedule 'f' in one second
setTimeout(f, 1000);
```

Or perhaps we want to run a loop really fast, `requestAnimationFrame` is meant for animation loops:

```js
const draw = () => {
  // ... do some drawing
  window.requestAnimationFrame(draw); // Reschedule
}
window.requestAnimationFrame(draw); // Schedule
```

This might just be fine, however:
* If you want to start/stop you have to keep track of the id of the timer
* More plumbing required to adjust loop speed as it runs
* Not particularly readable

ixfx has two functions to help with timed loops:
* [continuously](#continuously): Useful for a 'main loop', can be controlled
* [delayLoop](#delayed-loop): A 'for' loop with some delay between iterations

### Continuously

[`continuously`](https://clinth.github.io/ixfx/functions/Flow.continuously-1.html) is a controllable loop. It can be started, stopped and reset, with timing changed dynamically. As it runs, it keeps track of how many times it has looped, which can be useful for example to do something over time. It also allows the callback function to stop the loop.

By default, it runs at animation speed, useful for updating a canvas:

```js
import { continuously } from "https://unpkg.com/ixfx/dist/flow.js"

continuously(() => {
  // Do something at animation loop speed
}).start();
```

If you don't want the loop to run as fast as possible, provide an [`Interval`](https://clinth.github.io/ixfx/types/Flow.Interval.html) or a number denoting milliseconds:

```js
const fetchData = () => { // Do something };

// Runs every minute
continuously(fetchData, { mins: 1 }).start();
```

Examples of `continuously` in action:
* [Poll data from an API](https://github.com/ClintH/ixfx-demos/tree/main/flow/fetch-poll)
* [Animate a gradient](https://github.com/ClintH/ixfx-demos/tree/main/dom/gradient-rotate)
* [Process a list of things](https://github.com/ClintH/ixfx-demos/tree/main/flow/list-async)

#### Control

Note the use of `start` to start the loop. This allows you setup the loop once, and trigger it from different places. If `start` is called while already running, the timer is reset. `cancel` stops a loop that is scheduled to run.

```js
const job = () => { ... }
const jobLoop = continuously(job, 1000);
...
jobLoop.start();  // Starts loop, or resets it if already pending
jobLoop.cancel(); // Cancels a scheduled loop
jobLoop.interval = { secs: 5 }; // Change loop speed
```

It's possible to check the status of a `continuously` instance with its `runState` property. It returns a string, one of:
* "idle": not yet started, or has been stopped.
* "scheduled": started, waiting to run the callback.
* "running": currently executing the callback.


### Delayed loop

If you don't need to adjust the loop or control it from other parts of your code, [`delayLoop`](https://clinth.github.io/ixfx/functions/Flow.delayLoop.html) might be what you need. It is an async generator which runs indefinitely and has a simple syntax:

```js
import { delayLoop } from "https://unpkg.com/ixfx/dist/flow.js"
for await (const o of delayLoop(1000)) {
  // Do something every second
  // Warning: loops forever
}
// Execution won't continue here until the loop is exited
```

Note the use of _for await_ is important here. Use `break` when you want to exit the loop.

Using `for await` means that code won't continue running until the loop finishes. If you want some code running in a delay loop whilst also continuing execution, you can use this (somewhat awkward) technique:

```js
// repl-pad
import { delayLoop } from "https://unpkg.com/ixfx/dist/flow.js"
setTimeout(async () => {
  for await (const o of delayLoop(1000)) {
    console.log(`!`);
  }
});
// Execution continues while looped code runs in parallel
console.log(`Hello`);
```

`delayLoop` does not gather the results of the looped code. If that's what you need, consider [`repeat`](#repeat) or [`interval`](#interval).

## Repeat

[`repeat`](https://clinth.github.io/ixfx/functions/Flow.repeat.html) runs a function a certain number of times, yielding the results one-by-one. 
```js
// repl-pad
import { repeat } from "https://unpkg.com/ixfx/dist/flow.js"

// Five random numbers in an array
const results = [...repeat(5, Math.random)];

// Or in a for-of loop:
for (const result of repeat(5, Math.random)) {
  console.log(result);
}
// Exits after 5 numbers
```

There's also an async version if the function being repeated needs to be _awaited_:
```js
import { repeatAwait, sleep } from "https://unpkg.com/ixfx/dist/flow.js"

// Some function that doesn't return until 1 second 
async function task() {
  await sleep(1000);
  return Math.random();
}

for await (const result of repeat(5, task)) {
  console.log(result);
}
```

If you just want to run a function several times without caring about its return value, consider using [`count`](../../gen/generator/#count) instead.

## Interval

[`interval`](https://clinth.github.io/ixfx/functions/Flow.interval-1.html) calls and yields the result of an synchronous or asynchronous function/generator at a given interval. It is an asynchronous generator, note the `for await` rather than `for`.

This example prints a new random number every second

```js
import { interval } from "https://unpkg.com/ixfx/dist/flow.js"
// Call Math.random at a fixed interval of 1000ms
const randomGenerator = interval(Math.random, { fixed: 1000 } );

for await (const r of randomGenerator) {
  // Prints a new random number every second
  console.log(r);
}
// This will not run unless there is a `break` in the for await loop
console.log(`Done.`); 
```

When calling `interval`, the first parameter is the code to run, or generator to use. In the above example it's a simple function call.

The second parameter are the options:

```typescript
IntervalOpts: {
  delay?: "before" | "after"; // Should delay be before or after inner code is run?
  fixed?: Interval;     // Use a fixed delay between iterations
  minimum?: Interval;   // Enforce a minimum time between iterations
  signal?: AbortSignal; // Signal to stop interval looping
}
```

In the earlier example, we used the `fixed` parameter. This gives a constant delay between each execution of the function. If the function being called can take more or less time, the overall waiting time between executions could thus be quite different. As an alternative, use the `minimum` field. This will subtract the time taken to execute the function, meaning a more regular pacing between executions.

`interval` can also be invoked more simply by just passing a number, which represents the fixed milliseconds.

```js
// These lines are the same
interval(Math.random, 1000 );
interval(Math.random, { fixed: 1000 } );
```

Example: Iterate through items in a list, with a delay of one minute before each item

```js
const opts = { fixed: { mins: 1 }, delay: 'before' };
const list = [ 'thom', 'jonny', 'colin', 'ed', 'phil' ];
for await (const i of interval(list, opts)) {
  // do something with i (code first runs after 1min wait)
}
```

Example: Using a generator
```js
import { count } from "https://unpkg.com/ixfx/dist/generators.js";
import { interval } from "https://unpkg.com/ixfx/dist/flow.js";

// A generator that counts to 5
const counter = count(5);

// Loop over counter with 1000ms delay
for await (const v of interval(counter, 1000)) {
  // Counts from 0...4, with a delay between each
  // (although using ixfx's 'repeat' function would be the better way to do this)
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
