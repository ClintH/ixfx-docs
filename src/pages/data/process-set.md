---
title: Process a set of items
layout: ../../layouts/MainLayout.astro
---

This pattern shows how to process a list of items with a timed delay.

# Known list

This pattern shows how to process a list of items which are known in advance.

```js
const items = [ 'apple','orange','pear' ];
for await (const item of interval(iterms, { fixedInterval: }))
```

# Ad-hoc list

This pattern shows how to process items that are being added to a queue or stack on an ad-hoc basis. Eg, being added as a result of a user clicking something.

Use a [Queue](../collections/queue/) or [Stack](../collections/stack/) data structure depending on how you want items to be prioritised. The example below uses a stack, meaning that most recent additions get processed first. We use ...


```js
import { continuously } from "https://unpkg.com/ixfx/dist/flow.js"
import { Stacks } from "https://unpkg.com/ixfx/dist/collections.js"

// Eg: limit stack to 10 items
let toProcess = Stacks.stack({ capacity: 10 });

// Set up continuously, and a function to handle items
const processor = continuously(() => {
  // Stack is empty, return false to end the continuously loop
  if (toProcess.isEmpty) return false; 

  // Get the top-most item (ie most recently added)
  const item = toProcess.peek;

  // Remove item, assigning changed stack to the toProcess variable
  toProcess = toProcess.pop();

  // Do something with item
  // ...
  
  // If we return true, the loop will keep running, processing each item in stack
  return true;
}, 1000); // Process an item every second.


// Function to add to stack and start processor if necessary
const process = (item) => {
  toProcess = toProcess.push(item);
  
  // Start if it's not already running
  processor.start();
}

// Somewhere else in our code, we can add and start running
process(`some item`);
```

* [Online demo](https://clinth.github.io/ixfx-demos/flow/) ([source](https://github.com/ClintH/ixfx-demos/tree/main/flow/list-async))

# 