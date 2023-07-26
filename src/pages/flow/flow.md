---
title: Flow control
layout: ../../layouts/MainLayout.astro
setup: |
  import { DemoElement } from '../../components/DemoElement.ts';
---

<div class="tip"><ul>
<li>API Reference <a href="https://clinth.github.io/ixfx/modules/Flow.html">Flow module</a></li>
<li><a href="https://clinth.github.io/ixfx-demos/flow/">Online demos</a></li>
</ul></div>


## Debounce

[`debounce`](https://clinth.github.io/ixfx/functions/Flow.debounce.html) reduces a series of function calls that happen within a duration to a single call. It allows you to ignore all events until there is a break in the flow of the given `timeoutMs`.

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
