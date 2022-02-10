---
title: Time
layout: ../../layouts/MainLayout.astro
---

[API Docs: Timers module](https://clinth.github.io/ixfx/modules/Timers.html)

_TODO_

# Timers and loops

continuously

resettableTimeout


## Asynchronous execution

sleep

delay


<a name="interval"></a>
### Interval

[interval](https://clinth.github.io/ixfx/modules/Timers.html#interval) calls and yields the result of an asynchronous callback function every `intervalMs`. It is an asynchronous generator, note the _for await_ rather than _for_.

```js
// interval(callback, intervalMs)
const randomGenerator = Generators.interval(() => Math.random, 1000);
for await (const r of randomGenerator) {
  console.log(r); // Prints a new random number every second
}
console.log(`Done.`); // This will not run unless there is a `return` in the for await loop
```
