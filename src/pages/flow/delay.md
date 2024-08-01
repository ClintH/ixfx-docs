---
title: Delay
layout: ../../layouts/MainLayout.astro
setup: |
  import { DemoElement } from '../../components/DemoElement.ts';
---

<div class="tip"><ul>
<li>API Reference <a href="https://clinth.github.io/ixfx/modules/Flow.html">Flow module</a></li>
<li><a href="https://clinth.github.io/ixfx-demos/flow/">Online demos</a></li>
</ul></div>

Overview:
* [timeout](#timeout): re-triggerable timeout, able to check up on completion. Not able to get a return result.
* [delay](#delay): call a function with delay and get its result 
* [sleep](#sleep): pause execution for some period


## Timeout

`setTimeout` is the usual way to call a function after some elapsed time:

```js
import { intervalToMs } from "https://unpkg.com/ixfx/dist/flow.js"
// Call `doSomething` once after one minute
const t = window.setTimeout(doSomething, 60*1000);
// or:
const t = window.setTimeout(doSomething, intervalToMs({ mins: 1 }))
```

If you want to trigger the same timeout at different points in your code, it soon gets messy detecting and cancelling the existing timeout and scheduling a new one.

ixfx's [`timeout`](https://clinth.github.io/ixfx/functions/Flow.timeout-1.html) makes this a bit simpler. Once setup, calling `start()` schedules the timer, or resets if already scheduled. To cancel a started timeout, use `cancel()`.

```js
import { timeout } from "https://unpkg.com/ixfx/dist/flow.js"

// Set up once
const fadeOut = timeout(() => {
  // do something after 30secs
}, { secs: 30 });

// Trigger if there's a button press.
// Multiple calls to .start() simply reset timeout 
document.getElementById(`btnStart`).addEventListener(`click`, () => fadeOut.start());
```

The callback can be cancelled and restarted. Restarting cancels the currently scheduled timeout, scheduling it anew.
```js
fadeOut.cancel(); // cancels a timeout

// Starts (or restarts) a timeout
fadeOut.start();
fadeOut.start(1000); // (re)start and change the delay period at the same time
```

Your callback function can use the elapsed time, if needed:

```js
timeout(elapsedMs => console.log(`Timeout after ${elapsedMs}`), { secs: 30 }).start();
```

Data can be passed to the callback function when running `.start()`:

```js
// Setup timeout
const fadeOut = timeout((elapsedTime, data) => {
  // Function gets passed the elapsed time and data
  console.log(data.msg);
});

// Trigger timeout with data. The first parameter is to adjust the timeout.
// in this case we don't want to, so _undefined_ is passed.
fadeOut.start(undefined, { msg: `hello` });
```

## Sleep

Using JS's _await_ feature, you can essentially pause execution of your code using ixfx's [`sleep`](https://clinth.github.io/ixfx/functions/Flow.sleep.html).

```js
import { sleep } from "https://unpkg.com/ixfx/dist/flow.js"
console.log(`Hello`);
await sleep(1000);
console.log(`There`); // Prints one second after
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

Compared to [delay](#delay), `sleep` doesn't run a function and provide a value. It just sleeps.

## Delay

[`delay`](https://clinth.github.io/ixfx/functions/Flow.delay.html) is very similar to [`sleep`](#sleep), but lets you schedule running a function after the sleep.

So instead of writing:
```js
import { sleep } from "https://unpkg.com/ixfx/dist/flow.js"
await sleep(100); // Pause for 100ms
await someFn();   // Call and wait for someFn to run
```

You can write:
```js
import { delay } from "https://unpkg.com/ixfx/dist/flow.js"
await delay(someFn, 100);
```

If the call is not `await`ed, execution continues:
```js
// Schedule 'someFn' after 100ms
delay(someFn, 100);
// ...but execution continues here immediately
```

By default the delay period is before running the supplied function, but it can also be after:
```js
// Runs 'someFn' immediately
await delay(someFn, { delay: "after", secs: 10 });
// ...but execution does not continue here until 10 seconds later
```

Or both:

```js
// Waits 10seconds, and then runs `someFn`
await delay(someFn, { delay: "both", secs: 10 });
// ...and waits a further 10secs before continuing here
```

## Interval type

Most of the ixfx functions that take millisecond arguments also allow you to provided an [`Interval`](https://clinth.github.io/ixfx/types/Flow.Interval.html). This can make for more readable code.

The `Interval` type looks like:
```ts
Interval: number | { 
    hours?: number; 
    millis?: number; 
    mins?: number; 
    secs?: number; 
}
```

Example usage with [`delay`](#delay):

```js
// instead of these options:
delay( () => ..., 300000); // How long is that!?
delay( () => ..., 5*60*1000); // A bit better
// Use:
delay( () => ..., { mins: 5 });
```

If you just want to give a millisecond value, a bare number can be used.
```js
// These two lines are the same
delay( () => ..., 1000);
delay( () => ..., { millis: 1000 });
```

Any of the time units can be combined to define an interval, with a cumulative effect. [`intervalToMs`](https://clinth.github.io/ixfx/functions/Flow.intervalToMs.html) allows you to convert to milliseconds, useful for combining with vanilla JS functions.

```js
import { intervalToMs } from "https://unpkg.com/ixfx/dist/flow.js"
const period = { secs: 2, millis: 1 };

// Yields 2001 (2 seconds + 1 millisecond);
const ms = intervalToMs(period);
setTimeout(someFn, ms);
// Or:
setTimeout(someFn, intervalToMs({ secs: 2, millis: 1 }));
```

## Related patterns

* [Process a set of items with a delay between each](../../data/process-set/)
* [Fetch new data if it becomes outdated](../update-when-required/)

