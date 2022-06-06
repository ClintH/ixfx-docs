---
title: Delay
layout: ../../layouts/MainLayout.astro
setup: |
  import { DemoElement } from '../../components/DemoElement.ts';
---

* [API Docs: Flow module](https://clinth.github.io/ixfx/modules/Flow.html)
* [Online demos](https://clinth.github.io/ixfx-demos/flow/)

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

## Patterns

### Process a set of items

Let us say you have an array of items you want to process with some interval:

```js
import { continuously } from "https://unpkg.com/ixfx/dist/flow.js"
const items = [/* some array of things */]

continuously(() => {
  if (items.length == 0) return false; // all done
  const item = items.pop();

  // Do something with item
  return true; // Keep loop running
}, 1000).start();
```

Example: [a stack of tasks](../data/collections/#jobQueue)

### Update when required

Let's say you want to fetch live JSON data. It would be rude to the site operator to fetch the data continually, so we want to reduce how often the data is fetched. Polling is one option, but it might that we can't really know what the optimum polling rate should be.  

[`updateOutdated`](https://clinth.github.io/ixfx/modules/Flow.html#updateOutdated) addresses this dilemma. It only calls a function if it hasn't been called for a while, or never called. If, however, it has recently been called, the last result is returned. It is a similar outcome as [throttle](#throttle) - lots of calls get reduced to an occasional call.

Initialisation takes an async function to run, and a interval.

```js
// Set up one time.
// Here we're invoking `fetch`, and have a min interval of 5 minutes 
const fetcher = updateOutdated(async () => {
    const r = await fetch(`https://jsonplaceholder.typicode.com/todos/1`);
    return await r.json();
  }, 5 * 60 * 1000);
```

Somewhere else in your code, when you need the data, _await_ the fetcher. If it hasn't run yet, the callback will run (in this case, fetching JSON data). But if it has run within the last 5 minutes, the cached result will be returned rather than a network request being made again.

```js
// Returns the JSON data from the fetch request (or a cached copy)
const json = await fetcher();
```

[Online demo](https://clinth.github.io/ixfx-demos/flow/fetch-outdated/) ([source](https://github.com/ClintH/ixfx-demos/tree/main/flow/fetch-outdated))

What is useful about this pattern is that when you need the data (ie. `await fetcher()`) you can be ignorant to when or how the data is fetched. 

Note that execution blocks until data is fetched, so there may be cases where polling might be more appropriate.