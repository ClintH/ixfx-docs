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

## Debounce

[`debounce`](https://clinth.github.io/ixfx/modules/Flow.html#debounce) reduces a series of function calls that happen within a duration to a single call. It allows you to ignore all events until there is a break in the flow of the given `timeoutMs`.

```js
import { debounce } from "https://unpkg.com/ixfx/dist/flow.js"
// Signature:
// debounce(
//  callback:(elapsedMs?:number, ...args:unknown[])=> void, 
//  timeoutMs:number
// );
```

For example, only respond to resize event 500ms after the last resize event. If no event has happened before, it will still wait 500ms.

```js
const resizeDebounced = debounce((elapsedMs, ...evtArgs) => {
   // Handle event

   // Use original event args if we want
   const resizeArgs = evtArgs[0];
}, 500);
window.addEventListener(`resize`, resizeDebounced);
```

<demo-element title="Debounce pointermove event" src="/flow/debounce/" />

Note in the demo that lots of events (ie. movement) produce no debounced result until the events stop. If you want to have a continual stream of events, albeit at a slower rate, consider [throttle](#throttle).

## Throttle

[`throttle`](https://clinth.github.io/ixfx/modules/Flow.html#throttle) reduces a fast interval of function calls to a maximum rate. It allows you to ignore an event if it happened too soon after the previous event.

This is useful when processing event or stream data (eg user input, camera or audio feeds). In some scenarios the events come in to your code faster than you can process them. This results in a choked computer (laggy, unresponsive) and a backlogged response. But with _throttle_ and an appropriate `intervalMs`, you might avoid this.

```js
import { throttle } from "https://unpkg.com/ixfx/dist/flow.js"
// Signature:
// throttle(
//  callback:(elapsedMs?:number, ...args:unknown[])=> void, 
//  timeoutMs:number
// );
```

In this scenario, the event handler will run at maximum rate of 500ms.

```js
const resizeThrottled = throttle((elapsedMs, ...evtArgs) => {
   // Handle event

   // Use original event data if we need to
   const resizeEvent = evtArgs[0];
}, 500);
window.addEventListener(`resize`, resizeThrottled);
```

<demo-element title="Throttle pointer move events" src="/flow/throttle/" />

`throttle` handles an initial event (when nothing has happened before), and _continue_ to handle events, albeit at a reduced rate. `debounce`, in comparison, only handles the first event after `timeoutMs` has elapsed. And if a new event comes in the meantime, the timer is reset again. It's only when there is a break in the events that `debounce` will run.

It's also possible to use `throttle` and `debounce` without events being involved.

```js
// Some function that we want slowed execution
const reset = () => { /* do something */ }

// Set up the throttle one time
const resetThrottled = throttle(reset, 200);

// ...and now call `resetThrottled()` whenever you like, 
// as often as you like. `reset` will only be invoked every 200ms
resetThrottled();
```

## Related patterns

* [Process a set of items with a delay between each](../../data/process-set/)
* [Fetch new data if it becomes outdated](./update-when-required/)

