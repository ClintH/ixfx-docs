---
title: Pool
layout: ../../layouts/MainLayout.astro
setup: |
  import { DemoElement } from '../../components/DemoElement.ts';
---

<div class="tip">
<ul>
<li>API Reference <a href="https://clinth.github.io/ixfx/classes/Data.Pool.Pool.html">Data.Pool class</a></li>
<li>Parent <a href="https://clinth.github.io/ixfx/modules/Data.html">Data module</a></li>
</div>

The [Pool](https://clinth.github.io/ixfx/classes/Data.Pool.Pool.html) class does the housekeeping of managing a limited set of resources which are shared by 'users'. All resources in the Pool are meant to be the same.

An example is an audio sketch driven by TensorFlow. We might want to allocate a sound oscillator per detected human body. A naive implementation would be to make an oscillator for each detected body. However, because poses tend to appear/disappear somewhat unpredictably it's a lot of extra work to maintain the binding between pose and oscillator.

Instead, we might use the [Pool](https://clinth.github.io/ixfx/classes/Data.Pool.Pool.html) to allocate oscillators to poses. This will allow us to limit resources and clean up automatically if they haven't been used for a while.

Resources can be added manually with `addResource()`, or automatically by providing a `generate()` function in the Pool options. They can then be accessed via a _user key_. This is meant to associated with a single 'user' of a resource. For example, if we are associating oscillators with TensorFlow poses, the user key might be the id of the pose.

## In action: manual resources

The Pool is created, and resources added:

```js
import { Pool } from 'https://unpkg.com/ixfx/dist/data.js';
const pool = Pool.create({
  capacity: oscillators.length,
  // Remove 'users' if they haven't been seen after one second
  userExpireAfterMs: 1000,
  // If the capacity is reached, re-use the oscillator from the
  // last-seen pose
  fullPolicy: `evictOldestUser`
});

// Add a bunch of pre-made oscillators as resources
for (const osc of oscillators) {
  pool.addResource(osc);
}
```

To access a resource value, call `useValue()` with a _userKey_.

```js
const onData = (poses) => {
  for (const pose of poses) {
    const osc = pool.useValue(pose.id);

    // Do something with the resource...
    osc.filterCutoff = ...
  }
}
```

The Pool will automatically select an unused oscillator instance for each pose, keyed from the pose id. If a given pose id hasn't been sighted for one second, the oscillator it was assigned to is freed. If there are more poses than there are oscillators, it will re-assign the oscillator from the pose that hasn't been updated for the longest period.

## In action: automatically generating resources

In this example, we will generate Pool resources on-demand. The Pool will create them (with the `generate()` function we provide) and automatically free them when they are unused.

First we create the Pool, providing _generate_ and _free_ functions which are responsible for creating and destroying resources. Here HTML elements are the resources pooled.

```js
import { Pool } from 'https://unpkg.com/ixfx/dist/data.js';

const pool = Pool.create({
  capacity: 10,
  userExpireAfterMs: 1000,
  resourcesWithoutUserExpireAfterMs: 10000,
  fullPolicy: `evictOldestUser`,
  // Generate a new resource (in this example, a HTML element)
  generate: () => {
    const el = document.createElement(`DIV`);
    el.classList.add(`pool-item`);
    document.getElementById(`items`)?.append(el);
    return el;
  }, 
  /**
   * Delete the HTML element when resource is freed
   * @param {HTMLElement} el 
   */
  free:(el) => {
    el.remove();
  }
});
```

Now we can use resources from the pool, for example assigning a HTML element per key down.

```js
const useState = () => {
  const { keysDown } = state;

  for (const key of keysDown) {
    // Allocate a HTML element for each key held down
    const el = pool.useValue(key);

    // Set the text of the element to be the key
    el.innerText = key;
  }
};
```

This is implemented in the [pool-key](https://github.com/ClintH/ixfx-demos/tree/main/data/pool-key) demo, below.

<demo-element title="Pool key" src="/data/pool-key/" />

## Creating

Create a Pool and provide some [options](https://clinth.github.io/ixfx/types/Data.Pool.Opts.html)

```js
const pool = Pool.create({
  capacity: 3
})
```

Overview of options, all of which are optional.

| option     | info |
| ------     | ---- |
| capacity | Maximum number of resources. Defaults to 0, no limit
| capacityPerResource | Maximum number of users per resource. Defaults to 0, no limit |
| debug | If true, additional logging will be printed |
| free | A function that takes a single value. Call when a resource is removed from pool. Meant for cleaning up a value, where necessary. |
| fullPolicy | 'error' (throws an error when pool is full) or 'evictOldestUser', removing oldest user of a resource. Defaults to 'error' |
| generate | A function that returns a value. Used for generating resources on demand |
| resourcesWithout UsersExpireAfterMs | If provided, an unused resource will be removed after this period |
| userExpireAfterMs | If provided, a user will be marked as expired if it hasn't been updated |

## Accessing resources

A resource can be accessed by a _user key_, returning a [PoolUser](https://clinth.github.io/ixfx/classes/Data.Pool.PoolUser.html) instance.

```js
const u = pool.use(key); 
```

As described earlier, the user key is some unique reference for 'owner' of that pool resource. The idea is that if the same logical owner accesses the resource again, it always is using the same key. As far as the Pool is concerned, a different key means a different user, thus allocating a different resource.

`useValue(key)` returns the resource value rather than the `PoolUser` instance, if that's all you care about.

When using resources managed by the Pool, it is important that all access to them happens via the Pool. Don't cache references to resources, always access them via `use()` or `useValue()`.

The [PoolUser](https://clinth.github.io/ixfx/classes/Data.Pool.PoolUser.html) instance returned by `use()` has a _disposed_ event handler. This allows you to be notified if you have lost ownership of a resource. It is also called if the resource itself has been cleaned up.

```js
const u = pool.use(key);
u.addEventListener(`disposed`, evt => {
  const { data, reason } = evt;
  // 'reason' is a string describing why it was disposed
  // 'data' is the data of the resource
  // You might do some clean up
})
```

Resources can be manually released:

```js
pool.release(userKey);
```

When releasing, the resource is freed for user under a different key. If there are no more users of a resource and the Pool option `resourcesWithoutUsersExpireAfterMs` is set, the resource will be freed.

## Misc.

```js
// Returns true if this resouce is in the pool
pool.hasResource(res); 
// Returns true if `userKey` is a user of some resource
pool.hasUser(userKey);
// Iterate over all Resource instances in the pool
pool.resources();
// Iterate over all values (ie something originally added to the pool)
pool.values();
```