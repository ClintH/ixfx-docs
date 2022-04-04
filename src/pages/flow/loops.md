---
title: Loops and Intervals
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
import { continuously } from "https://unpkg.com/ixfx/dist/flow.js"

const draw = () => {
  // ... do some drawing
}
continuously(draw).start(); // run at animation speed
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
continuously(fetchData, 60*1000).start();
```

[See an example of polling API data](https://github.com/ClintH/ixfx-demos/tree/main/flow/fetch-poll)

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

A callback can also be provided if the loop resets. Resets when  `start()` is called and but it's already running (ie. `isDone` returns _false_).

```js
const job = () => { ... }
const onJobReset = (ticks, elapsedMs) => {
  // If we've been running for a minute, don't allow restart
  return (elapsedMs < 60*1000); 
}
const jobLoop = continuously(job, 1000, onJobReset).start();
```

## Repeat

[repeat](https://clinth.github.io/ixfx/modules/Flow.html#repeat) runs a function a certain number of times, accumulating the results into an array.

```js
// repl-pad
import { repeat } from "https://unpkg.com/ixfx/dist/flow.js"

// Five random numbers in an array
const results = repeat(5, () => Math.random());
```

If you don't care about the return value of the function, consider using [count](../data/generator#count).

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

[interval](https://clinth.github.io/ixfx/modules/Flow.html#interval) calls and yields the result of an _asynchronous_ function every `intervalMs`. It is an asynchronous generator, note the `for await` rather than `for`.

```js
import { interval } from "https://unpkg.com/ixfx/dist/flow.js"

// interval(callback, intervalMs)
const randomGenerator = interval(() => Math.random, 1000);
for await (const r of randomGenerator) {
  // Prints a new random number every second
  console.log(r);
}
// This will not run unless there is a `break` in the for await loop
console.log(`Done.`); 
```

You can also step through a generator's return values using `interval`:

```js
// Make a generator that counts to 5
const counter = count(5);
// Use iterval to loop over counter with 1000ms delay
for await (const v of interval(counter, 1000)) {
  // Counts from 0...4, with a delay of 1s between each
  console.log(v);
}
```

## With generators

[Generators](../data/generator) can looped over with `forEach`

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

Which to use? the ixfx `forEach` is concise and readable. It has the advantage of not needing to declare a parameter, unlike `for ... of`. Converting to an array avoids having to declare a variable too, but it's not possible to use infinite generators (such as [pingPong](../../data/generator#ping-pong)).
