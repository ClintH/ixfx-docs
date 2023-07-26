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

## Timeout

`setTimeout` is the usual way to call a function after some elapsed time:

```js
// Call `doSomething` once after one minute
const t = window.setTimeout(doSomething, 60*1000);
```

If you want to trigger the same timeout at different points in your code, it soon gets messy  detecting and cancelling the existing timeout and scheduling a new one.

ixfx's `timeout` makes this a bit simpler. Once setup, calling `start()` resets the timeout if it's already started. To cancel a started timeout, use `cancel()`.

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
fadeOut.start(20*1000); // Run after 20s this time
```

Your callback function can use the elapsed time, if needed:

```js
timeout(elapsedMs => console.log(`Timeout after ${elapsedMs}`), 30*1000).start();
```

## Sleep

Using JS's _await_ feature, you can essentially pause execution of your code using [`sleep`](https://clinth.github.io/ixfx/modules/Flow.html#sleep):

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

Instead of blocking code execution, if you want to essentially schedule a function to run after a given delay, use [delay](#delay).

## Delay

To run a function after a delay, you can use [timeout](#timeout), or the asynchronous [`delay`](https://clinth.github.io/ixfx/modules/Flow.html#delay):

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

[`delayLoop`](https://clinth.github.io/ixfx/modules/Flow.html#delayLoop) is an async generator which runs indefinitely. 

```js
import { delayLoop } from "https://unpkg.com/ixfx/dist/flow.js"
const loop = delayLoop(1000);
for await (const o of loop) {
  // Do something every second
  // Warning: loops forever
}
```

If you don't have a function you want to call after the delay, consider using [sleep](#sleep) instead.

## Iterating

[`delayIterable`](https://clinth.github.io/ixfx/functions/Flow.delayIterable.html) allows you to iterate over a source iterable with a delay between results.

A basic example:

```js
// options for delay
const opts = { intervalMs: 1000, delay: 'before' };
// thing to iterate over
const iterable = count(10);
// for await ... of loop, since delayIterable is async
for await (const i of delayIterable(iterable, opts)) {
  // Prints 0..9 with one second between
}
``` 

This can be handy for processing a list of things, for example:

```js
const opts = { intervalMs: 1000, delay: 'both' };
const list = [ /* list of things */ ]
for await (const i of delayIterable(list, opts)) {
  // do something with i
}
```
## Related patterns

* [Process a set of items with a delay between each](../../data/process-set/)
* [Fetch new data if it becomes outdated](./update-when-required/)

