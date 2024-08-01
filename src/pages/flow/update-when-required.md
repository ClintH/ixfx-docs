---
title: Update when required
layout: ../../layouts/MainLayout.astro
setup: |
  import { DemoElement } from '../../components/DemoElement.ts';
---

Let's say you want to fetch live JSON data. It would be rude to the site operator to fetch the data continually, so we want to reduce how often the data is fetched. Polling is one option, but it might that we can't really know what the optimum polling rate should be.  

[`updateOutdated`](https://clinth.github.io/ixfx/modules/Flow.html#updateOutdated) addresses this dilemma. It only calls a function if it hasn't been called for a while, or never called. If, however, it has recently been called, the last result is returned. It is a similar outcome as [throttle](#throttle) - lots of calls get reduced to an occasional call.

Initialisation takes an async function to run, and a interval.

```js
// Set up one time.
// Here we're invoking `fetch`, and have a min interval of 5 minutes 
const fetcher = updateOutdated(async () => {
    const r = await fetch(`https://jsonplaceholder.typicode.com/todos/1`);
    return await r.json();
  }, 5 * 60 * 1000);
```

Somewhere else in your code, when you need the data, _await_ the fetcher. If it hasn't run yet, the callback will run (in this case, fetching JSON data). But if it has run within the last 5 minutes, the cached result will be returned rather than a network request being made again.

```js
// Returns the JSON data from the fetch request (or a cached copy)
const json = await fetcher();
```

[Online demo](https://clinth.github.io/ixfx-demos/flow/fetch-outdated/) ([source](https://github.com/ClintH/ixfx-demos/tree/main/flow/fetch-outdated))

What is useful about this pattern is that when you need the data (ie. `await fetcher()`) you can be ignorant to when or how the data is fetched. 

Note that execution blocks until data is fetched, so there may be cases where polling might be more appropriate.

`updateOutdated` has a third parameter determining what happens if the provided function throws an error.
* "fast": Invocation will happen immediately on next attempt, without waiting.
* "slow": Next invocation will wait `interval` before being attempted
* "backoff": Attempts will get slower and slower until next success. Interval is multipled by 1.2 each time.