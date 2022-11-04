---
title: Expiring Map
setup: |
  import {Markdown} from 'astro/components';
  import Layout from '../../../layouts/MainLayout.astro';
---

<div class="tip">
<ul>
<li>API Reference <a href="https://clinth.github.io/ixfx/classes/Collections.ExpiringMap.html">ExpiringMap class</a></li>
<li>Parent <a href="https://clinth.github.io/ixfx/modules/Collections.html">Collections module</a></li>
</div>

The ixfx [`ExpiringMap`](https://clinth.github.io/ixfx/classes/Collections.ExpiringMap.html) is a variant of the in-built Map. It can:
* Set a capacity limit of the map, deleting entries when the capacity is reached
* Delete entries that have not been set/get after some interval

When is this kind of 'forgetful' map useful? One case is when we want to associate a key with a value (as we normally do with a map), but there isn't a clear event for when a key should be removed.

For example, perhaps we receive data from network sources, each of which has an id. When we receive data, we know the source is alive, and we can get/set associated data in a map. But if something goes wrong with the source or connection, there might not be an accompanying event to let us know. Rather, we'd want to remove associated data after some timeout.

## Basic Usage

Create with `Maps.expiringMap()`, using `set`, `get` and `delete` as usual with a map.

```js
import { Maps } from "https://unpkg.com/ixfx/dist/collections.js"

const map = Maps.expiringMap();
map.set(`fruit`, `apple`);
map.has(`fruit`); // Yields: true
map.get(`fruit`); // Yields: `apple`
map.delete(`fruit`); // Yields: true (because key existed)
```

To update the get/set time for an entry without actually updating it, use `touch`:

```js
map.touch(`fruit`);
```

The map has _expired_, _removed_ and _newKey_ events which are useful for taking action based on data coming and going. _expired_ fires when an item is automatically removed, _remove_ fires when an item is manually or automatically removed, and _newKey_ fires when something is set with a key that does not currently exist.

```js
map.addEventListener(`expired`, evt => {
  const { key, value } = evt;
  console.log(`Key ${key} removed.`);
})
```

## Automatically removing

When creating the map, use the two `autoDelete...` [options](https://clinth.github.io/ixfx/types/Collections.ExpiringMapOpts.html). `autoDeletePolicy` can be 'get', 'set' or 'either'.

In the below example, items that aren't accessed for over one second are removed:

```js
const map = Maps.expiringMap({
 autoDeleteElapsed: 1000,
 autoDeletePolicy: `get`
});
```

Using a policy of 'set' instead will remove items which are not updated (via `map.set(key, value)`) past the interval. 'either' will remove items if the interval of get or set exceeds the interval.

## Capacity limiting

When creating the map, specify `capacity` and `evictPolicy` [options](https://clinth.github.io/ixfx/types/Collections.ExpiringMapOpts.html). `capacity` is the total number of items the map can store. `evictPolicy` can be 'none', meaning that an error is thrown if the capacity is reached. This is the default. It can also be 'oldestGet', removing the entry that hasn't been accessed the longest, or 'oldestSet', deleting the entry which has't been updated the longest.

```js
const map = new ExpiringMap({
 capacity: 5,
 evictPolicy: `oldestSet`
});
```

These capacity limiting settings can be combined with automatic removing based on time.

## Time-oriented methods

Since the ExpiringMap tracks times for each item, there are a range of time-oriented ways of working with the map:

```js
// Remove all entries that were set more than 100ms ago
map.deleteWithElapsed(100, `set`);
// Remove all entries that were last accessed more than 100ms ago
map.deleteWithElapsed(100, `get`);
// Returns the elapsed time since `fruit` was last accessed
map.elapsedGet(`fruit`); 
// Returns the elapsed time since `fruit` was last set
map.elapsedSet(`fruit`);
```