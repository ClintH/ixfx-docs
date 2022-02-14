---
title: Loops & Intervals
layout: ../../layouts/MainLayout.astro
setup: |
  import { DemoElement } from '../../components/DemoElement.ts';
---

[API Docs: Flow module](https://clinth.github.io/ixfx/modules/Flow.html)

## Continuously

A common pattern in animation is a 'draw loop':

```js
const draw = () => {
  // ... do some drawing
  window.requestAnimationFrame(draw); // Reschedule
}
window.requestAnimationFrame(draw); // Schedule
```

or using `setInterval`:
```js
// Call `doSomething` every minute
window.setInterval(doSomething, 60*1000);
```

But what if you want to the loop to run for a certain period and then stop? Or need to trigger the loop at different points of your code? It's easy to accidently have multiple loops running.

`continuously` is an ixfx function to simplify this pattern:

```js
import { continuously } from "https://unpkg.com/ixfx/flow.js"

const draw = () => {
  // ... do some drawing
}
continuously(draw).start(); // run at animation speed
```

If you don't want the loop to run as fast as possible, provide the number of milliseconds between loops:

```js
continuously(draw, 60*1000).start(); // Runs every minute
```

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

The function that runs is given the number of loops and elapsed time as parameters. If the callback returns _false_, this will cause the loop to end. If _true_ or _undefined_ is returned, loop will continue to run (unless `cancel()` is called).

```js
const job = (ticks, elapsedMs) => { 
  if (ticks > 100) return false; // End loop after 100 iterations  
}
const jobLoop = continuously(job, 1000).start();
```

A callback can also be provided for when the loop resets, if ever. Resets happen if `start()` is called when the loop is running.

```js
const job = () => { ... }
const onJobReset = (ticks, elapsedMs) => {
  return (elapsedMs < 60*1000); // If we've been running for a minute, don't allow restart
}
const jobLoop = continuously(job, 1000, onJobReset).start();
```

<a name="interval"></a>

## Interval

[interval](https://clinth.github.io/ixfx/modules/Timers.html#interval) calls and yields the result of an _asynchronous_ function every `intervalMs`. It is an asynchronous generator, note the `for await` rather than `for`.

```js
import { interval } from "https://unpkg.com/ixfx/flow.js"

// interval(callback, intervalMs)
const randomGenerator = interval(() => Math.random, 1000);
for await (const r of randomGenerator) {
  console.log(r); // Prints a new random number every second
}
// This won't run until generator finishes or there is a `break` in the for .. of loop.
console.log(`Done.`);
```

## With generators

[Generators](../data/generator) can looped over with `forEach`

```js
import { forEach, count } from "https://unpkg.com/ixfx/generators.js"

forEach(count(5), () => {
  // This code will run five times
})
```

If you know the generator is finite, another option is to convert it to an array:

```js
import { count } from "https://unpkg.com/ixfx/generators.js"
[...count(5)].forEach( () => {
  // This code will run five times
});
```

Or naturally, using a `for ... of`:

```js
import { count } from "https://unpkg.com/ixfx/generators.js"
for (const i of count(5)) {
  // this code will run five times.
}
```

Which to use? the ixfx `forEach` is concise and readable. It also has the advantage of needing to declare a parameter, unlike `for ... of`. Converting to an array avoids having to declare a variable too, but it's not possible to use infinite generators (such as [pingPong](../data/generator#pingPong)).
