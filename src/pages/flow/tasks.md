---
title: Tasks
layout: ../../layouts/MainLayout.astro
setup: |
  import { DemoElement } from '../../components/DemoElement.ts';
---

<div class="tip">
<ul>
<li>API Reference <a href="https://clinth.github.io/ixfx/modules/Flow.html">Flow module</a></li>
</ul></div>

## Queuing

The [TaskQueue](https://clinth.github.io/ixfx/classes/Flow.TaskQueue.html) is a utility class to run a series of functions one-by-one.

```js
import { TaskQueue, sleep } from "https://unpkg.com/ixfx/dist/flow.js"

// Initialise queue
const q = new TaskQueue();

// After that, add a task whenever you like
q.enqueue(async () => {
  // Do something...

  // Wait one second before allowing the next task to run
  await sleep(1000);
});
```

'Tasks' are just async functions. The queue waits for the function to return a result, after which it takes the next item in the queue to process.

## Calling with a timeout

There are times you might want to call a function, but handle cases where it fails or we don't get a result after some period. [`waitFor`](https://clinth.github.io/ixfx/functions/Flow.waitFor.html) helps with this.

The signature is:
```ts
function waitFor(
  timeoutMs: number,
  onAborted: (reason: string) => void,
  onComplete?: (success: boolean) => void
):(error:message) => void
```

`waitFor` returns a function for signalling the result. If this function is _not_ called within the timeout, or is passed an error message, the abort callback will run.

```js
// Set up waitFor, with a timeout of 1 second
// If an error occurs, we just print it out
const done = waitFor(1000, (error) => { 
  console.error(error);
});

// Mark as done when user clicks
document.addEventListener(`click`, () => {
  done();
});

// Mark as failed if person presses a key
document.addEventListner(`keypress`, () => {
  done(`Ooops, key was pressed`);
});
```

In the above example, we only listen for the error case - if the timeout happens or the user presses a key. We can also get notified when the operation completes, successfully or not.

```js
const done = waitFor(1000, 
  (error) => { 
    console.error(error);
  },
  (success) => {
    if (!success) return; // Failed
    console.log(`yay`);
  }
);
```
