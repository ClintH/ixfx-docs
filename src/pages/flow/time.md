---
title: Time
layout: ../../layouts/MainLayout.astro
setup: |
  import { DemoElement } from '../../components/DemoElement.ts';
---

[API Docs: Timers module](https://clinth.github.io/ixfx/modules/Timers.html)

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

`continuously` is an ixfx function to simplify this pattern. At it's most simple:

```js
import { continuously } from "https://unpkg.com/ixfx/timers.js"

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

<a name="timeout"></a>

## Timer

`setTimeout` is the usual way to call a function after some elapsed time:

```js
// Call `doSomething` once after one minute
const t = window.setTimeout(doSomething, 60*1000);
```

If you want to trigger the same timeout at different points in your code, it soon gets messy  detecting and cancelling the existing timeout and scheduling a new one.

ixfx's `timeout` makes this a bit simpler. Once setup, calling `start()` resets the timeout if it's already started. To cancel a started timeout, use `cancel()`.

```js
import { timeout } from "https://unpkg.com/ixfx/timers.js"

// Set up once
const fadeOut = timeout(doFadeOut, 30*1000);

document.getElementById(`btnStart`).addEventListener(`click`, () => {
  // Trigger if there's a button press.
  // Multiple calls to .start() simply reset timeout
  fadeOut.start();
});
```

When calling `start`, you can override its default delay:

```js
fadeOut.start(20*1000); // Run after 20s this time
```

Your callback function can use the elapsed time, if you like:

```js
timeout(elapsedMs => console.log(`Timeout after ${elapsedMs}`), 30*1000).start();
```

## Asynchronous execution

### Sleep

Using JS's _await_ feature, you can essentially pause execution of your code using `sleep`:

```js
import { sleep } from "https://unpkg.com/ixfx/timers.js"
console.log(`Hello`);
await sleep(1000);
console.log(`There`); // Print one second after
```

There are a few tricks to using the _await_ keyword. You may need to declare your function as being asynchronous:

```js
const something = async () => {
  console.log(`Hello`);
  await sleep(1000);
  console.log(`There`); // Print one second after
};

// Call the asynchronous function
something();
// Execution will continue immediately, but execution within `something` will pause as expected.
```

### Delay

To run a function after a delay, you can use [timeout](#timeout), or the asynchronous `delay`:

```js
import { delay } from "https://unpkg.com/ixfx/timers.js"

console.log(`Hello`);
delay(async () => console.log(`There`), 1000);
console.log(`!`);
// Prints:
// Hello
// !
// There [after one second]
```

<a name="interval"></a>

### Interval

[interval](https://clinth.github.io/ixfx/modules/Timers.html#interval) calls and yields the result of an asynchronous function every `intervalMs`. It is an asynchronous generator, note the _for await_ rather than _for_.

```js
import { interval } from "https://unpkg.com/ixfx/generators.js"

// interval(callback, intervalMs)
const randomGenerator = interval(() => Math.random, 1000);
for await (const r of randomGenerator) {
  console.log(r); // Prints a new random number every second
}
// This won't run until generator finishes or there is a `break` in the for .. of loop.
console.log(`Done.`);
```

## Debounce

_Debounce_ is a wrapper around `timeout`, allowing a function to run only after a time has elapsed since the last time it was called. In other words, each time there is an attempt to call the function, the timer is reset.

```js
import { debounce } from "https://unpkg.com/ixfx/generators.js"
debounce(callback, timeoutMs);
```

For example, only respond to resize event after there has been 500 since the last resize event.

```js
const resizeDebounced = debounce((elapsedMs, ...evtArgs) => {
   // Handle event
}, 500);

const resize = window.addEventListener(`resize`, resizeDebounced);
```

Demo

<demo-element title="Debounce" src="/flow/debounce/" />

## Throttle

_Throttle_ prevents a function from being called too frequently. It can be useful if you have an event that produces a high frequency of data, but you want to respond less frequently. Unlike debounce, the function will continue to be called while events happen, but now at a capped rate.

```js
import { throttle } from "https://unpkg.com/ixfx/generators.js"
throttle(callback, intervalMs);
```

In this scenario, the event handler will run at maximum rate of 500ms. In comparison, then handler under `debounce` only fires 500ms after the last event has happened. 

```js
const resizeDebounced = debounce((elapsedMs, ...evtArgs) => {
   // Handle event
}, 500);

const resize = window.addEventListener(`resize`, resizeDebounced);
```

Demo

<demo-element title="Throttle" src="/flow/throttle/" />


## Patterns

### Process a set of items

Let us say you have an array of items you want to process with some interval:

```js
import { continuously } from "https://unpkg.com/ixfx/timers.js"
const items = [/* some array of things */]

continuously(() => {
  if (items.length == 0) return false; // all done
  const item = items.pop();

  // Do something with item
  return true; // Keep loop running
}, 1000).start();
```

See [an example pattern using a Stack](../data/collections/#jobQueue)