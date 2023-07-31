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
* [timeout](#timeout): re-triggerable timeout, able to check up on completion. Not able to get a 'result'
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

If you want to trigger the same timeout at different points in your code, it soon gets messy  detecting and cancelling the existing timeout and scheduling a new one.

ixfx's `timeout` makes this a bit simpler. Once setup, calling `start()` resets the timeout if it's already started. To cancel a started timeout, use `cancel()`, or `isDone` to check whether the timeout has been executed.

```js
import { timeout } from "https://unpkg.com/ixfx/dist/flow.js"

// Set up once
const fadeOut = timeout((elapsedMs, args) => {
  // do something
}, 30*1000);

// Trigger if there's a button press.
// Multiple calls to .start() simply reset timeout 
document.getElementById(`btnStart`).addEventListener(`click`, fadeOut.start());
```

When calling `start`, you can override its default delay:

```js
fadeOut.start({ secs: 30 }); // Run after 20s this time
```

Your callback function can use the elapsed time, if needed:

```js
timeout(elapsedMs => console.log(`Timeout after ${elapsedMs}`), { secs: 30 }).start();
```

## Delay

To run a function after a delay, you can use [timeout](#timeout), or the asynchronous [`delay`](https://clinth.github.io/ixfx/functions/Flow.delay.html).

The signature looks like this:
```typescript
DelayOpts: Interval & {
    delay: "before" | "after" | "both";
    signal?: AbortSignal;
}
delay(callback, options?:DelayOpts);
```

Some examples:
```js
const someFn = () => {
  // do something
}

// Run 'someFn' after 100 milliseconds
delay(someFn, 100);

// Run the anonymous function after 1 minute
delay(() => { console.log(`hello`) }, { mins: 1 });

// Run 'someFn' after 10 seconds, pausing afterwards
await delay(someFn, { delay: "after", secs: 10 });
```

If the call to `delay` is not _await_-ed, execution continues immediately, with the provided function running after the specified delay.

```js
import { delay } from "https://unpkg.com/ixfx/dist/flow.js"

console.log(`Hello`);
delay(async () => console.log(`There`), 1000);
console.log(`!`);
// Prints:
// Hello
// !
// There [after one second]
```

Alternatively, you can stop and wait for it to run:

```js
console.log(`Hello`);
await delay(async () => console.log(`There`), 1000 );
console.log(`!`);
// Prints:
// Hello
// There [after one second]
// !
```

The delay can be before the function is run, after or both.
```js
delay( () => /* some code */, { mins: 10, delay: "both" } ); // "before" | "after" | "both"
```

## Sleep

Using JS's _await_ feature, you can essentially pause execution of your code using [`sleep`](https://clinth.github.io/ixfx/functions/Flow.sleep.html).

The function signature is:
```typescript
SleepOpts<V>: Interval & {
    signal?: AbortSignal;
    value?: V;
}
sleep(opts:SleepOpts);
```

```js
import { sleep } from "https://unpkg.com/ixfx/dist/flow.js"
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

Compared to [delay](#delay), `sleep` doesn't run a function and provide a value. It just sleeps.


## Intervals

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

Any of the time units can be combined to define an interval, with a cumulative effect. [`intervalToMs`](https://clinth.github.io/ixfx/Flow.intervalToMs.html) allows you to convert to milliseconds, useful for combining with vanilla JS functions.

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
* [Fetch new data if it becomes outdated](./update-when-required/)

