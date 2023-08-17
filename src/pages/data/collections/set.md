---
title: Set
layout: ../../../layouts/MainLayout.astro
---

<div class="tip">
<ul>
<li>API Reference <a href="https://clinth.github.io/ixfx/modules/Collections.Sets.html">Collections.Sets module</a></li>
<li><a href="https://clinth.github.io/ixfx/interfaces/Collections.Sets.ISetImmutable.html">Immutable set</a></li>
<li><a href="https://clinth.github.io/ixfx/interfaces/Collections.Sets.ISetMutable.html">Mutable set</a></li>
<li>Parent <a href="https://clinth.github.io/ixfx/modules/Collections.html">Collections module</a></li>
</div>


A set only keeps unique items, useful when you want to ignore duplicates. Adding _apples, oranges, grapes, pears, oranges_ will result in the set: _apples, oranges, grapes, pears_.

Javascript has a built-in [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) object. 

With primitive data types, it works as expected:
```js
const s = new Set();
s.add(`apples`);
s.add(`oranges`);
s.add(`apples`);
// Set contains: `apples`, `oranges`
s.has(`apples`); // True
```

However a problem with the in-built Set is that it compares objects based on _reference_ rather than value when it comes to objects. This is further a problem when we use immutable objects, because the reference is changing all the time.

```js
const s = new Set();
s.add({ fruit:`apples` });
s.add({ fruit:`oranges` });
s.add({ fruit:`apples` });
// Set contains: { fruit:"apples" }, { fruit:"oranges" }, { fruit :"apples" }
s.has({ fruit:`apples` }); // False
```

In the above example, we get some surprises: the set seems to have duplicates, and `has` returns false for data it contains.

As an alternative, ixfx has an [immutable](https://clinth.github.io/ixfx/interfaces/Collections.Sets.ISetImmutable.html) and mutable set that can compare by value rather than reference.

## Immutable set

The key functions for a set are: `add()`, `has()`, `delete()` and iterating over values with `values()`.

Create an [immutable set](https://clinth.github.io/ixfx/interfaces/Collections.Sets.ISetImmutable.html), and add three items. Any function that changes the set returns the changed copy, so when we call `add()`, we keep track of the returned changed set.

```js
import { Sets } from "https://unpkg.com/ixfx/dist/collections.js"
let s1 = Sets.immutable();
s1 = s1.add(`apples`, `oranges`, `apples`);
```

To compare objects by value, it uses `JSON.stringify` by default to make a representation of the object. This can work fine for simple objects, but in complicated cases, you can provide a function when creating the set:

```js
import { Sets } from "https://unpkg.com/ixfx/dist/collections.js"
let s2 = Sets.immutable(v => v.fruit);
s2 = s2.add({ fruit: `apples` }, { fruit: `oranges`}, { fruit: `apples` });
// Contains: { fruit: `apples` }, { fruit: `oranges` }
s2.has({ fruit:`apples` }); // True
```

To loop over all the values of the set, use the `values` iterator:
```js
for (const v of s2.values() {

})
```

Or make a copy as an array:
```js
s2.toArray();
```

Items can be removed by value as well:
```js
s2 = s2.delete({ fruit: `oranges` })l
```

# Mutable set

The [mutable set](https://clinth.github.io/ixfx/interfaces/Collections.Sets.ISetMutable.html) has the same basic operations as the immutable set: `add()`, `has()`, `delete()` and `values()`. However here the set itself changes (as with the in-built Javascript Set). It also provides events for listening for changes on the set.

```js
const s = Sets.mutable();
s.add(`apples`, `oranges`, `apples`);
// Contains: `apples`, `oranges`
s.has(`apples`); // True
s.remove(`oranges`);
```

To compare objects by value, it uses `JSON.stringify` by default to make a representation of the object. This can work fine for simple objects, but in complicated cases, you can provide a function when creating the set:

```js
import { Sets } from "https://unpkg.com/ixfx/dist/collections.js"
const s = Sets.mutable(v => v.fruit);
s.add({ fruit: `apples` }, { fruit: `oranges`}, { fruit: `apples` });
// Contains: { fruit: `apples` }, { fruit: `oranges` }
s.has({ fruit:`apples` }); // True
```

To listen for events:
```js
s.addEventListener(`add`, evt => {
  const { value, updated } = evt;
  // value refers to the thing added
  // updated: true if item is brand new, false if it's replacing something with same value
});

s.addEventListener(`delete`, evt => {
  // evt refers to the thing being deleted
});

s.addEventListener(`clear`, () => {
  // when set has been cleared
})
```