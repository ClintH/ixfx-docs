---
title: Stack
layout: ../../../layouts/MainLayout.astro
setup: |
  import StackVis from './StackVis.astro';
---

[API Docs: Stacks](https://clinth.github.io/ixfx/modules/Collections.Stacks.html)

A stack stores items like a stack of plates. Items added get put on the top, and if you want to grab an item, you can only see, and grab from the top. This is useful if newer things have priority.

In other words, it is LIFO (last in, first out). If you want first-in first out, see [Queue](./queue).

The default implementation in ixfx is immutable, meaning that every operation that changes the stack returns a _new_ stack. A stack instance itself never changes.

<StackVis />

## Basics

`push` and `pop` are the main means of interacting with a stack.

```js
import {Stacks} from "https://unpkg.com/ixfx/collections.js"

// Initialise
let s = Stacks.stack();

// Items are pushed in order from start, so `c`
// is on the "top" of the stack now.
s = s.push(`a`, `b`, `c`);

// Yields `c`
s.peek;

// Return a new stack with top-most item removed
s = s.pop();
```

## Iterating

For the most part, you're meant to just access the top-most item of a stack. If you find yourself needing to dig through a stack, it may not be the right data structure.

That said, there are ways of iterating:

```js
// Iterate from bottom-to-top of stack
s.forEach(item => {
  // do something with item
})

// Iterate from top-to-bottom of stack
s.forEachFromTop(item => {
  // do something with item
});
```

## Additional properties

```js
// True if stack is empty
s.isEmpty;

// How many items in stack
s.length;

// Returns the underlying array
// used by the stack. Be careful not to
// modify or it may break the stack semantics
s.data;
```

## Capacity limiting

When creating the stack, it's possible to set a capacity limit. This can be useful to avoid a _backlog_ of data. For example, if you're processing a queue of pressure-sensor data, if a burst of new data comes in you would rather process the freshest data first, you don't really care about older things any longer.

```js
let q = Stacks.stack({capacity: 5, discardPolicy: `newer`});
```

The `capacity` naturally sets the total number of items the stack will store. The `discardPolicy` determines how the size is maintained when the capacity limit is hit. This logic runs whenever something is _pushed_.

Values for `discardPolicy` are:
* `older`: Removes existing items from the bottom of the stack to make room for additions. Ie. the oldest items are thrown away
* `newer`: Removes existing items from the top of the stack to make room for additions. Ie. the newest items are thrown away
* `additions`: Does not change the existing items, but rather throws away items that are being _pushed_. 