---
title: Queue
layout: ../../../layouts/MainLayout.astro
setup: |
  import QueueVis from './QueueVis.astro';
  import QueueDiscardVis from './QueueDiscardVis.astro';
---

[API Docs: Queues](https://clinth.github.io/ixfx/modules/Collections.Queues.html)

A queue stores items like a queue at a bakery. Items added are put at the _back_ of the queue, and if you want to grab an item, you can only see, and grab from the _front_ of the queue. This is useful if you want to process items in the same order as they are added to the queue

In other words, it is FIFO (first in, first out). If you want last-in first out, see [Stack](./stack).

The default implementation in ixfx is immutable, meaning that every operation that changes the queue returns a _new_ queue. A queue instance itself never changes.

<QueueVis />

## Basics

`enqueue` and `dequeue` are the main means of interacting with a dequeue.

```js
import {Queues} from "https://unpkg.com/ixfx/collections.js"

// Initialise
let q = Queues.queue();

// Items are pushed in order from start, so `c`
// is at the "back", while `a` is at the "front".
q = q.enqueue(`a`, `b`, `c`);

// Yields `a`
q.peek;

// Return a new queue with front-most item removed
q = q.dequeue();
```

## Iterating

For the most part, you're meant to just access the front-most item of a queue. If you find yourself needing to dig through a queue, it may not be the right data structure.

That said, there are ways of iterating:

```js
// Iterate from back-to-front of queue
q.forEach(item => {
  // do something with item
})

// Iterate from front-to-back of queue
q.forEachFromFront(item => {
  // do something with item
});
```

## Additional properties

```js
// True if queue is empty
q.isEmpty;

// How many items in queue
q.length;

// Returns the underlying array
// used by the stack. Be careful not to
// modify or it may break the stack semantics
q.data;
```

## Capacity limiting

When creating the queue, it's possible to set a capacity limit. This can be useful to avoid a _backlog_ of data. For example, if you're processing a queue of pressure-sensor data, if a burst of new data comes in you would rather process the freshest data first, you don't really care about older things any longer.

```js
let q = Queues.queue({capacity: 5, discardPolicy: `newer`});
```

The `capacity` naturally sets the total number of items the queue will store. The `discardPolicy` determines how the size is maintained when the capacity limit is hit. This logic runs whenever something is _enqueued_.

Values for `discardPolicy` are:
* `older`: Removes existing items from the front of the queue to make room for additions. Ie. the oldest items are thrown away
* `newer`: Removes existing items from the back of the queue to make room for additions. Ie. the newest items are thrown away
* `additions`: Does not change the existing items, but rather throws away items that are being _enqueued_. 

<QueueDiscardVis />