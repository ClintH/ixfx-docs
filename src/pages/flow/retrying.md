---
title: Retrying
layout: ../../layouts/MainLayout.astro
setup: |
  import { DemoElement } from '../../components/DemoElement.ts';
---

<div class="tip"><ul>
<li>API Reference <a href="https://clinth.github.io/ixfx/modules/Flow.html">Flow module</a></li>
<li><a href="https://clinth.github.io/ixfx-demos/flow/">Online demos</a></li>
</ul></div>

When a function may succeed after some attempts, you might need a _retry_ logic - keep trying the function until it succeeds, or after a certain number of attempts. You want some kind of waiting period between each attempt, eg to wait for a network connection.

This can be achieved using [`retry`](https://clinth.github.io/ixfx/functions/Flow.retryWithBackOff.html).

In the example, we will try up to five times to run the async function `doSomething`, starting with 1 second delay if it fails. This time gets longer and longer with each attempt.

```js
import { retry } from "https://unpkg.com/ixfx/dist/flow.js"

const doSomething = () => {
  // A function that sometimes throws an error or returns false.
  // When it works, it needs to return _true_
}

const result = await retry(doSomething, { count: 5, startMs: 1000 });
if (result.success) {
  // Yay
} else {
  // result.message tells why
}
```
