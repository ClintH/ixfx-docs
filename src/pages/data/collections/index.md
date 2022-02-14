---
title: Collections
layout: ../../../layouts/MainLayout.astro
---

[API Docs: Collections module](https://clinth.github.io/ixfx/modules/Collections.html)

* [Stack](./stack) - Keep track of items like a stack of plates. Most recent gets added to the top, and you can only take the most recent from the top.
* [Queue](./queue) - Keep track of items like a bakery queue. Most recent is added to the back of the queue, and you can only take from the front of the queue (ie the oldest)

## Patterns

<a name="jobQueue"></a>

### Process a queue or stack of items

Use a [Queue](./queue) or [Stack](./stack) data structure to enforce ordering:

```js
import { continuously } from "https://unpkg.com/ixfx/flow.js"
import { Stacks } from "https://unpkg.com/ixfx/collections.js"

// Eg: limit stack to 10 items
let toProcess = Stacks.stack({capacity: 10});

const processor = continuously(() => {
  if (toProcess.isEmpty) return false; // Stack is empty

  // Get the top-most item (ie most recently added)
  const item = toProcess.peek;

  // Set toProcess to be a new stack without top-most item
  toProcess = toProcess.pop();

  // Do something with item
  // ...
  
  return true; // Keep loop running
}, 1000);


// Add to stack:
const process = (item) => {
  toProcess = toProcess.push(item);
  
  // Start if it's not already running
  processor.start();
}
```

* [Online demo](https://clinth.github.io/ixfx-demos/flow/) ([source](https://github.com/ClintH/ixfx-demos/tree/main/flow/list-async))
