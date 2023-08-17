---
title: Map
setup: |
  import {Markdown} from 'astro/components';
  import Layout from '../../../layouts/MainLayout.astro';
---

<div class="tip">
<ul>
<li>API Reference <a href="https://clinth.github.io/ixfx/modules/Collections.Maps.html">Collections.Maps module</a></li>
<li>Parent <a href="https://clinth.github.io/ixfx/modules/Collections.html">Collections module</a></li>
</div>

Javascript has an in-built [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) object which is used for tracking key-value pairs. In other words, it maps a given _key_ to a given _value_. The basic operations of a map are `set()`,`get()`, `delete()` and `has()`.

Maps can be useful when there is a meaningful and unique way of referring to values, where we want the possibilty to get _just that one thing_ efficiently. 

You can think of a map like a dictionary. If you want to look up a definition (a _value_), you need the word (the _key_). We could say that the dictionary is _keyed_ by words. If a new definition is to be added to the dictionary (ie a new value), we have to add it with its word (ie its key), we can't just throw it in without.

[Arrays](../arrays/) can also let you efficiently get an item, but only by its numerical _index_. In some cases, using an index makes perfect sense - getting the _first_ item in a sorted array, for example. But thinking again of the dictionary, it doesn't seem useful to want to get the 300th word. We'd much rather store and get items by some kind of unique identifier.

## Basic operations

When storing objects in a map, keys are often a particular property that we expect to be unique. For example, maybe we have Fruit type, and we expect the _name_ of the fruit to be unique, but not its colour, or flavour values.

```js
const a1 = { name: `granny-smith`, colour: `green`, flavour: 4 }
const a2 = { name: `golden-delicious`, colour: `yellow`, flavour: 2 }
const map = new Map();
map.set(a1.name, a1);
map.set(a2.name, a2);

map.has(`granny-smith`); // True
const apple = map.get(`granny-smith`);
apple.flavour; // 4
```

In the above example, you can see `set()` being used to add an object by its key (in this case its _name_ property), and `get()` being used to retrieve an item by its key. If nothing is stored under a key, _undefined_ is returned. `has()` returns true/false if a key exists too.

Items are deleted by key:

```js
map.delete(`golden-delicious`);
```

The contents of a map can be iterated over. You can iterate over keys and values separately:
```js
// Iterate by key
for (const key of map.keys()) {
  const value = map.get(key); // Get value for key
}

// Iterate over values
for (const value of map.values()) {

}
```

Or you can iterate over _entries_, which is an array of both key and value

```js
for (const [key,value] of map.entries()) {
  // Use key and value as needed...
}
```

## Alternatives and limitations

One side effect of a map is that only unique keys are stored. If you `set()` a second item with an existing key, the earlier value is overriden. If the desired outcome is simply to have unique values, consider using the [Set](./set/).

Maps only store a single item per key. There are occasions where we'd rather group items by a key. For that, see [Map Multiple](./mapMultiple).

## Helper functions

ixfx has a few helper functions for working with maps. To import these functions:

```js
import { Maps } from "https://unpkg.com/ixfx/dist/collections.js"
```

### Has

JS has `Map.has()`, returning a boolean if a key is present. We can't check if a value is present. [`Maps.hasAnyValue()`](https://clinth.github.io/ixfx/functions/Collections.Maps.hasAnyValue.html) takes the map to look over, a value, and a comparison function that returns true or false if two values match.

```js
import { Maps } from "https://unpkg.com/ixfx/dist/collections.js"

// Compare fruits based on their colour property
const colourComparer = (a, b) => a.colour === b.colour;

// Returns true if any fruit has the colour red
Maps.hasAnyValue(map, { colour: `red` }, colourComparer);
```

[`hasKeyValue`](https://clinth.github.io/ixfx/functions/Collections.Maps.hasKeyValue.html) returns true if a given key exists _and_ the value matches as well.

```js
// Returns true if the stored apple is also red
Maps.hasKeyValue(map, `apple`, { colour: `red` }, colourComparer);
```

### Iterating

To get all the values of a map as an array, the syntax for that is:

```js
const values = [...map.values()];
```

Or alternatively using ixfx's `Maps.toArray`:
```js
const values = Maps.toArray(map);
```

`Maps.filter` iterates over all values of a map that match a given predicate:

```js
import { Maps } from "https://unpkg.com/ixfx/dist/collections.js"
const p = value => value.colour === `red`;
for (const value of Maps.filter(map, p)) {
  // Iterates all the values with .colour = `red`
}
```

To iterate over sorted values, use [`Maps.sortByValue`](https://clinth.github.io/ixfx/functions/Collections.Maps.sortByValue.html):

```js
import { Maps } from "https://unpkg.com/ixfx/dist/collections.js"
const m = new Map();
m.set(`1`, `zebra`);
m.set(`2`, `ant`);

const values = Maps.sortByValue(map);
// Yields:
// [`ant`, `zebra`]
```

If the map contains objects, you will want to provide a custom comparer function. An alternative is to use [`Maps.sortByValue`](https://clinth.github.io/ixfx/functions/Collections.Maps.sortByValueProperty.html), which sorts by the property of a value.

```js
cosnt m = new Map();
m.set(`4491`, { name: `Bob` });
m.set(`2319`, { name: `Alice` });
const sorted = Maps.sortByValue(m, `name`);
// Yields:
// [ { name: `Alice` }, { name: `Bob` }]
```

### Deleting

Deleting from a map is usually by key (`map.delete(key)`), but if you want to delete a particular value, regardless of its key, consider ixfx's [`Maps.deleteByValue`](https://clinth.github.io/ixfx/functions/Collections.Maps.deleteByValue.html):

```js
import { Maps } from "https://unpkg.com/ixfx/dist/collections.js"

// Compare fruits based on their colour property
const colourComparer = (a, b) => a.colour === b.colour;

// Deletes all values where .colour = `red`
Maps.deleteByValue(map, { colour: `red` }, colourComparer);
```

## Conversions

If you already have something iterable (eg an array or other collection), you can make a map from it with ixfx's [`Maps.fromIterable`](https://clinth.github.io/ixfx/functions/Collections.Maps.fromIterable.html). It needs a function that generates a key for a given value. An optional third parameter allows keys to be overwritten (false by default)

```js
const data = [ 
  { fruit: `granny-smith`, family: `apple`, colour: `green` }
  { fruit: `mango`, family: `stone-fruit`, colour: `orange` }
];
const map = Maps.fromIterable(data, v => v.fruit);
```

[`Maps.fromObject`] converts a plain object into a map, using its top-level properties as keys.

```js
const data = {
 Sally: { name: `Sally`, colour: `red` },
 Bob:   { name: `Bob`,   colour: `pink` }
};
const map = Maps.fromObject(data);
map.get(`Sally`); // { name: `Sally`, colour: `red` }
```

## Get or generate

A common pattern working with maps to retrieve something by a given key, and if it doesn't exist to create an object for that key.

For example, if we are processing multi-touch input, each pointer event has a `pointerId`, and we may want to track that over time. Since it's a unique identifier, a map makes perfect sense. We either want to get the existing tracker for _that_ pointer, or create a new tracker if it's an id that we haven't encountered yet.

[`Maps.getOrGenerate`](https://clinth.github.io/ixfx/functions/Collections.Maps.getOrGenerate-1.html) can assist.

```js
import { Maps } from "https://unpkg.com/ixfx/dist/collections.js"
// Set up
const trackers = Maps.getOrGenerate(new Map(), key => {
  // This runs whenever there is a new key stored,
  // adding the returned value to the map
  return new MagicalPointerTracker(key);
})

document.addEventListener(`pointermove`, async evt => {
  // Get a MagicalPointerTracker instance for this pointerId,
  // creating it if it doesn't exist
  const tracker = await trackers(evt.pointerId);
})
```

Note the use of `await`. This means that we can use asynchronous functions to generate new values on demand. Alternatively, use [`getOrGenerateSync`](https://clinth.github.io/ixfx/functions/Collections.Maps.getOrGenerateSync.html) which has the same signature, but doesn't need `await` when accessing.

## Adding

By default, adding a key-value pair to a map will overwrite an existing entry with same key. Sometimes this 'last write wins' logic is not wanted, and instead we want to throw away values if they would overwrite something older. [`Maps.addKeepingExisting`](https://clinth.github.io/ixfx/functions/Collections.Maps.addKeepingExisting.html) to the rescue.

```js
import { Maps } from "https://unpkg.com/ixfx/dist/collections.js";
// Function that generates a key for a value
const keyFn = v => v.name;

// Values to add
const values = [
  { name: `Sally`, colour: `red` },
  { name: `Bob`, colour: `pink` },
  { name: `Sally`, colour: `green` } /* this one will get ignored */
]
const map = new Map();

// Add values
Maps.addKeepingExisting(map, keyFn, ...values);
map.get(`Sally`).colour; // `red`
```

In the above example, we can see that the older value for 'Sally' is kept.

## Transformations

[`Maps.mapToArray`](https://clinth.github.io/ixfx/functions/Collections.Maps.mapToArray.html) allows an array of values to be generated from a map. This can be useful if you want to pluck out a particular property from each value, or transform values.

```js
import { Maps } from "https://unpkg.com/ixfx/dist/collections.js";
// Where map contains things like:
//  Sally -> { name: `Sally`, colour: `red` }
//  Bob   -> { name: `Bob`, colour: `pink` }
const altered = Maps.mapToArray(map, (key, person) => {
  ...person,
  name: person.name.toUpperCase();
  rand: Math.random();
});
// Yields an array: [
//  { name: `SALLY`, colour: `red`, rand: 0.351 },
//  { name: `BOB`, colour: `pink`, rand: 0.912 }
// ]
```

[`Maps.toObject`](https://clinth.github.io/ixfx/functions/Collections.Maps.toObject.html) converts a map to a plain object, this is useful for turning into a JSON string representation.

Given the same example map from above:

```js
import { Maps } from "https://unpkg.com/ixfx/dist/collections.js";
const objects = Maps.toObject(map);
// Yields: {
//  Sally: { name: `Sally`, colour: `red` },
//  Bob: { name: `Bob`, colour: `pink` }
// }
```

Use [`Maps.fromObject`](https://clinth.github.io/ixfx/functions/Collections.Maps.fromObject.html) to convert back from a plain object.

_Mapping_ over a collection of values is common when dealing with arrays. It allows you to transform each element of an array, returning a new array with the transformed values. There is no in built `map()` for Maps, but you can use ixfx's [`Maps.transformMap`](https://clinth.github.io/ixfx/functions/Collections.Maps.transformMap.html) for a similar outcome.

Like a regular map, it takes a map function which must return a transformed version of its input value.

```js
import { Maps } from "https://unpkg.com/ixfx/dist/collections.js";
const map = new Map();
map.set(`a`, `Ant`);
map.set(`b`, `Bee`);
map.set(`c`, `Cat`);

const transformer = (value, key) => {
  return { animal: value };
};

const newMap = Maps.transformMap(map, transformer);

map.get(`b`);    // Yields: `Bee`
newMap.get(`b`); // Yields: { animal: `Bee` }
```

The above example could be expressed more succinctly:

```js
const newMap = Maps.transformMap(map, (value, key) => { animal: value });
```

_Zippering_ is combining two aligned arrays together. In the case of a map, we might want to combine an array of keys with an array of values using 
[`Maps.zipKeyValue`](https://clinth.github.io/ixfx/functions/Collections.Maps.zipKeyValue.html). The length of both arrays must be the same.

```js
import { Maps } from "https://unpkg.com/ixfx/dist/collections.js";
const keys = [`a`, `b`, `c`];
const values = [`ant`, `bee`, `cat`];
const map = Maps.zipKeyValue(keys, values);
map.get(`b`); // Yields: `bee`
```

## More functions

* [`find`](https://clinth.github.io/ixfx/functions/Collections.Maps.find.html) - Finds first value that matches value
* [`firstEntryByIterableValue`](https://clinth.github.io/ixfx/functions/Collections.Maps.firstEntryByIterableValue.html) - Finds first entry that matches value
* [`immutable`](https://clinth.github.io/ixfx/functions/Collections.Maps.immutable.html) - immutable map implementation
* [`mergeByKey`](https://clinth.github.io/ixfx/functions/Collections.Maps.mergeByKey.html) - merge two maps, with a reconcile function to merge values that use same key
* [`zipKeyValue`](https://clinth.github.io/ixfx/functions/Collections.Maps.zipKeyValue.html) - combine an array of keys and an array of values into an object