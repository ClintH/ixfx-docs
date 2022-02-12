---
title: Collections
layout: ../../../layouts/MainLayout.astro
---

[API Docs: Collections module](https://clinth.github.io/ixfx/modules/Collections.html)

## Patterns

<a name="jobQueue"></a>

### Process a queue or stack of items

Use a [Queue](https://clinth.github.io/ixfx/modules/Collections.Queues.html) or [Stack](https://clinth.github.io/ixfx/modules/Collections.Stacks.html) data for enforcing ordering:

```js
import { continuously } from "https://unpkg.com/ixfx/timers.js"
import { stack } from "https://unpkg.com/ixfx/collections.js"

// Eg: limit stack to 10 items
let toProcess = stack({capacity: 10});

const processor = continuously(() => {
  if (toProcess.isEmpty) return false; // Stack is empty
  const item = toProcess.peek;
  toProcess = stack.pop();

  // Do something with item
  ...
  
  return true; // Keep loop running
}, 1000);


// Add to stack:
const process = (item) => {
  toProcess = toProcess.push(item);
  
  // Start if it's not already running
  processor.start();
}
```
