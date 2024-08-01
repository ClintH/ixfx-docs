---
title: Chains
layout: ../../layouts/MainLayout.astro
---

'Chains' are an ixfx way of working with iterable data. A chain is made up of _links_, each of which processes data in turn. A link is nothing more than a function which returns a generator. _Sources_ are things that produce data for links to process.

Chains allow data flows to be encapsulated as generators with simple in-built semantics for consuming them. Other parts of your code don't need to know what happens within the chain, or what kind of data source it uses - it just sees it as an iterable object that yields values and potentially finishes.

# Creating chains

## Chains.run

`run()` is used when we have a source at the same time we're setting up the chain of processing.

Lets say we want a stream of x,y values from the 'pointermove' event. In this case, we know the source in advance, and we can specify one or more links to process the data.

```js
// Set up the chain
const xy = Chains.run(
  // Start with a source: in this case, event data
  Chains.From.event(window, `pointermove`),
  // Transform takes data from the previous link/source
  // and returns data for the next link.
  // In this case, we just pluck out the x,y values
  Chains.Links.transform(event => ({x:event.x,y:event.y}))
);
```

The return result of `run()` is a regular Javascript asynchronous generator, see below for how to use the data.

A disadvantage of `run()` is that the source is 'baked-in' to the definition, and you can't reuse the chain with a different source.

## Chains.prepare

If you don't have a source ready, `prepare()` allows you to define the chain and call it with a source later.

```js
// Set up chain
const chain = Chains.prepare(
 Chains.Links.transform( v => Number.parseInt(v) ),
 Chains.Links.filter(v => v % 2 === 0)
);

// Use the chain with an array as a source
const ch = chain(Chains.From.array([1,2,3],100));
for (const value of ch) {
  ...
}
```

Chains made with `prepare()` can be re-used with a different source:
```js
const ch2 = chain(Chains.From.array([4,5,6],100));
```

## Chains.single

Chains are built of the idea of iterable data sources - several bits of data. However, there are cases where you want to use a chain for single input and expect a single output.

```js
// Create a chain that flattens values
const reduce = Chains.reduce(values => Math.max(...values));
// Feed it a single input (an array), get a single output back:
const result = await Chains.single(reduce, [ 1, 2, 3]); // 3
```

# Sources

## Array

Items from an array can be a source, reading them one at a time with a given interval.
```js
const someArray= [1,2,3,4,5];
// Read one item every 100ms
const c = Chains.From.array(someArray, 100);
```

## Events

Event data can be a chain source. Specify the event target (eg a DOM element) and the name of the event.

```js
const c = Chains.From.event(window, `pointermove`);
```

Example: Emits relative x,y coordinates
```js
const xy = Chains.run(
  Chains.From.event(window, `pointermove`),
  Chains.Links.transform(event => ({
    x:event.x/window.innerWidth,
    y:event.y/window.innerHeight
    }))
);
```

## Timestamp

Generates the current time in milliseconds at a given interval.

```js
// Emits the time every second
const c = Chains.From.timestamp({ interval: 1000 });
```

By default it runs forever, but you can use `loops` or `elapsed` options to limit the number of times it runs
```js
// Run 100 times
const c = Chains.From.timestamp({ interval: 1000, loops: 100 });
// Run for one minute
const c = Chains.From.timestamp({ interval: 1000, elapsed: 60*1000 });
```

## Function

Repeatedly calls a function, yielding its values.

```js
// Produces random values
const l = Chains.from.func(Math.random);
```

An example:
```js
const chain = Chains.chain(
 Chains.From.func(Math.random),
 // Take first 5 results
 Chains.cap(5)
);
```


# Consuming data from chains

## Iterating with for .. of

The return result of `run()` is a regular Javascript asynchronous generator. This means you can use a `for .. of` loop or step through it manually.

```js
for await (const coord of xy) {
  // Prints out the {x,y} value when a
  // 'pointermove' happens.
  console.log(coord);
}
// Execution does not continue
```

In the above pattern, execution of code after the `for await` unless the chain ends. In this case, since the source is an event, it will never end.

An alternative means of access is using ixfx's `asCallback`, which, if you don't prefix it with `await`, continues execution.
```js
Chains.asCallback(xy, coord => {
  console.log(coord);
});
// Execution continues, even while
// data gets printed
```

You can also optionally provide a third parameter to be notified asynchronously when the chain is completed:
```js
Chains.asCallback(chain, value => {
  // do something with values
}, () => {
  // do something when 'chain' ends
});
```

## Reading values

The `for..of` pattern is not always appropriate. In some cases you want to essentially read the value from the chain on demand. `asValue` handles this, providing a function to read the latest value from the chain.

```js
// Set it up
const readChain = Chains.asValue(chain);
...
// Some point later, read the value
const currentValue = await readChain();
```

When initialising, you can also provide an initial value. This is useful for chains where the source is based on an event that perhaps has not fired yet, but you still want a usable value when reading.
```js
const readChain = Chains.asValue(chain, {x:0.5,y:0.5});
```

## Accumulating

All data from a chain can be accumulated into an array:
```js
const values = await Chains.asArray(chain);
```

If the chain is infinite (never ends), be sure to provide some limits:
```js
// Stop after we have five items
const values = await asArray(chain, { limit: 5 });
// Stop after 5 seconds has elapsed
const values = await asArray(chain, { elapsed: 5000 });
```

`asArray` returns a new array, and is meant to be used with `await` so execution only continues when the data is fully read.

Alternatively you can add to an existing array over time using `addToArray`.
```js
const data = []; // An array to add items to
Chains.addToArray(data, chain); // Add values from 'chain' into 'data'
// Execution continues, with `data` growing as values are yielded from the chain
```

# Synchronising

Chains are inherently asynchronous. If you're working with several, there might be a need to synchronise them in some manner.

## Chains.combineLatestToArray

Monitors two or more sources, storing values as they happen to an array. Whenever a new value is emitted, the whole array is sent out, containing current values from each source, or _undefined_ if not yet emitted.

```js
// Three sources
const sources = [ ch1, ch2, ch3 ];
// 'combined' will be an async generator
const combined = Chains.combineLatestToArray(sources);
for await (const v of combined) {
  // v will be an array [ value1, value2, value3 ],
  // with indexes corresponding to `sources`
}
// Execution continues when one of the sources finishes.
```

The tempo of this stream will be set by the fastest source stream. `syncToArray` in contrast has a pace determined by slowest source, only sending when each source has produce a new value compared to last time.

There are a few options to determine what happens when a source completes. See the API docs for more information. By default as soon as one source finishes, the combined stream finishes.

## Chains.combineLatestToObject

This function is essentially the same as `combineLatestToArray()` however it returns an object of values rather than array.

```js
const combined = Chains.combineLatestToObject({
  a: ch1,
  b: ch2,
  c: ch3
});
for await (const v of combined) {
  // v will be an object: { a, b, c }
  // where each value will be the value from the 
  // corresponding source
}
```

## Chains.syncToArray

Waits for all sources to produce a value, sending the combined results as an array. 

After sending, it waits again for each source to send at least one value. This means that the pace of the combined result will be determined by the slowest source. In contrast `combineToArray/combineToObject` have their pace set by the fastest source.

```js
// Three sources
const sources = [ ch1, ch2, ch3 ];
// 'synced' will be an async generator
const synced = Chains.syncToArray(sources);
for await (const v of synced) {
  // v will be an array of values, corresponding to
  // the indexes of 'sources'
}
```

As soon as one source finishes, the synchronised generator will finish. You can tweak the behaviour when sources end by providing options, documented here.

# Links

_Links_ are the things you use when calling `Chains.run` or `Chains.prepare`. These are the little functions which work with data flowing through the chain, and pass it on to the next link.

Typically several links are used to make a chain. If you've only got one link, perhaps there is a simpler way to do it.

Here's an overview of the in-built links

Math functions
* min, max, average, sum, tally

Filtering
* filter, drop
* rank, rankArray
  
Changing the shape of values
* chunk
* reduce

Timing of values
* debounce, delay
  
Stopping a chain
* duration
* take

## Math
### Chain.Links.min / max

For every input value, `min` and `max` will always emit the smallest or largest value seen so far.

```js
const ch = Chains.run(
  Chains.From.array([1,2,3,4]),
  Chains.Links.min();
)
// Produces 1, 1, 1, 1
```

Works with chains that output numbers or array of numbers. Non-numbers are skipped.

### Chains.Links.average()

Taking a numeric input (or array of numbers), `average` continuously returns a running average.

```js
Chains.Links.average();
```

Non-numbers in the input stream are skipped.

### Chains.Links.sum()

Taking a numeric input (or array of numbers), `sum` returns the current total.

Non-numbers in the input stream are skipped.

### Chain.Links.tally

`tally` throws away the input value and instead emits the total number of values produced.

Example usage:
```js
const ch = Chains.run(
  Chains.From.timestamp({ interval: 100 }),
  Chains.Links.tally()
);

for await (const v of ch) {
  // Produces: 1, 2, 3 ... every 100ms
}
```

## Filtering
### Chains.Links.filter

`filter` only passes values for which the predicate function returns _true_.

```js
// Only allow even numbers to pass,
// dropping all odd numbers
Chain.Links.filter(v => v % 2 === 0)
```

### Chain.Links.drop

`drop` is the opposite of `filter`. Instead dropping values which the predicate function returns _true_

```js
// Drop all even numbers, 
// only allowing odd numbers to pass
Chain.Links.drop(v => v % 2 === 0)
```

### Chain.Links.rank / rankArray

`rank` allows values to be scored using some function, emitting the 'best' value. `rankArray` is the same, but it works within a set of values.

The ranking function gets two parameters, `a` and `b`, and is expected to return a string value denoting which is the best, or 'eq' if they are equal.

Eg, ranking objects based off a 'size' field:
```js
Chains.Links.rank((a,b) => {
  if (a.size > b.size) return `a`;
  if (a.size < b.size) return `b`;
  return `eq`
})
```

`rank` has some options about when to emit a value downstream. By default, it won't emit a new value if it's equally ranked. And by default it won't emit a value until it 'beats' the last value.

You can change these, for example:
```js
Chains.Links.rank(fn, { 
  emitEqualRanked: true, 
  emitRepeatHighest: true 
});
```

`rankArray` works instead with arrays as input values. By default, it behaves similarly to `rank`, but checks the contents of the array. If the `withinArrays` option is set to _true_, it will instead emit the highest value within each array, and not care about previous values.

## Changing shape
### Chains.Links.transform

Takes an input value and returns an output value.

```js
// Eg. return a doubled version of the input value
Chains.Links.transform( v => v * 2 );
```

Example usage
```js
const ch = Chains.run(Chains.From.array([1,2,3,4]),
  Chains.Links.transform( v => v * 2)
);
for await (const v of ch) {
  // 2, 4, 6, 8
}
```

### Chains.Links.reduce

`reduce` assumes its input is an array, returning a single combined result using a function
```js
// Return the largest of the values
Chains.reduce(values => Math.max(...values));
```

Example usage
```js
// Create a chain that flattens values
const reduce = Chains.reduce(values => Math.max(...values));
// Feed it a single input (an array), get a single output back:
const result = await Chains.single(reduce, [ 1, 2, 3]); // 3
```

### Chains.Links.chunk

Given a stream of values, `chunk` breaks it up into arrays of a given length.

For example, given a chunk size of 3:
```js
Chains.Links.chunk(3);
```

If the stream of input values is: `1, 2, 3, 4, 5, 6` we would get chunks of `[ 1, 2, 3], [ 4, 5, 6 ]`

By default, if the stream ends and a chunk is not complete, it is returned regardless. Set the second parameter to `chunk` to _false_ (ie `Chains.Link.chunk(3, false)`) to instead throw away the under-sized chunk.

## Timing of values
### Chain.Links.delay

`delay` changes the timing of the stream, allowing you to add delay before or after a value is yielded.

```js
Chains.Links.delay({ before:1000 });
Chains.Links.delay({ after:1000 });
```

Example usage
```js
const ch = Chains.run(Chains.From.event(document, `click`),
  Chains.Links.delay({ before: 1000 });
);
for await (const v of ch) {
  // Runs 1s after a click
}
```

### Chain.Links.debounce

Ensures a minimum time between values. Values produced too quickly are dropped.

```js
Chain.Links.debounce(100); // 100ms
```

Example usage:
```js
const chain = Chains.run(
 // Produce values every 10ms for 350ms
 Chains.From.timestamp({ interval: 10, elapsed: 350 }),
 // Only let a value through every 100ms
 Chains.Links.debounce(100)
);
```

## Stopping a chain
### Chains.Links.take

This link will return the input value, but will break the chain after a certain number of values flow through it.

```js
// Stop after 5 results
Chains.Links.take(5);
```

Example usage
```js
// Handle five click events and then finish
const ch = Chains.run(Chains.From.event(document, `click`),
  Chains.Links.take(5)
)
```


### Chain.Links.duration

`duration` will close a chain after a given interval has elapsed.

```js
Chains.Links.duration(100); // 100ms
```







