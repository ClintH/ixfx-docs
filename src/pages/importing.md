---
title: Importing
description: Importing the library
layout: ../layouts/MainLayout.astro
setup: |
  import ModuleList from './ModuleList.astro';
---

<!-- <ModuleList /> -->

Read on for how to import ixfx with a URL import. Advanced users might want to install ixfx [via NPM](../import-npm/) or a [downloaded ZIP](../import-zip/).

## Modules

You'll mostly want to import functions as _modules_: 

```js
import { NameOfModule } from "https://unpkg.com/ixfx/dist/bundle.js"
```

The names of predefined modules are given in the list below. All of these can be imported from the main bundle or invididually. The bundle contains _all_ the modules.

For example, to import _Timers_:

```js
import { Flow } from "https://unpkg.com/ixfx/dist/bundle.js"
Flow.continuously(...);
```

Note the module name is capitalised, while the names in the URL are not. Also note that function names are preceded by the module name. One needs to call `Timers.continuously` not `continuously`.

If you don't want to import the whole bundle, but still want to import everything from a module, you can use this syntax:

```js
import * as Flow from "https://unpkg.com/ixfx/dist/flow.js"
Flow.continuously(...);
```

This looks similar to how we started, but the difference is we're only importing the contents of `flow.js` and not all the ixfx code.

## Functions

Most functions are housed within modules.

To import a function: 

```js
import { nameOfFunction } from "https://unpkg.com/ixfx/nameOfModule.js"
```

For example, to import `continuously` from the Flow module:

```js
import { continuously } from "https://unpkg.com/ixfx/dist/flow.js"
continuously(...);
```

Note how we specify which function to import and it doesn't have the 'Flow' prefix when we imported from the bundle.


Browsing the [API documentation](https://clinth.github.io/ixfx/modules.html) is a good way of figuring out where to import from, if you're confused.

## Module overview

This overview of available modules gives some examples of importing from unpkg.com, and each header is a link to the API docs, where there is a full list of available functions, classes, types and sub-modules.

### [Arrays](https://clinth.github.io/ixfx/modules/Collections.Arrays.html)

Eg. function
```js
import { filterAB } from  "https://unpkg.com/ixfx/dist/arrays.js"
```

### [Collections](https://clinth.github.io/ixfx/modules/Collections.html)

Sub-modules: Arrays, Iterables, Maps, Queues, Sets, Stacks, Trees

Eg. sub-module

```js
import { Arrays } from  "https://unpkg.com/ixfx/dist/collections.js"
Arrays.average([ 1, 2, 3 ]);
```

```js
import { Queues } from  "https://unpkg.com/ixfx/dist/collections.js"
let queue = Queues.immutable();
```

### [Data](https://clinth.github.io/ixfx/modules/Data.html)

Sub-modules: Correlate, Normalise, Pool

Eg. function
```js
import { clamp } from  "https://unpkg.com/ixfx/dist/data.js"
```

Eg. sub-module
```js
import { Normalise } from  "https://unpkg.com/ixfx/dist/data.js"
Normalise.array([ 1, 2, 3 ]);
```

Eg. class
```js
import { IntervalTracker } from  "https://unpkg.com/ixfx/dist/data.js"
const t = new IntervalTracker();
```

### [Dom](https://clinth.github.io/ixfx/modules/Dom.html)

Sub-modules: DataTable, DragDrop, Forms, Rx, Variables

Eg. function
```js
import { setText } from  "https://unpkg.com/ixfx/dist/dom.js"
```

Eg. sub-module
```js
import { Forms } from  "https://unpkg.com/ixfx/dist/data.js"
Forms.button(`#myButton`, () => { console.log(`clicked`) });
```

### [Events](https://clinth.github.io/ixfx/modules/Events.html)


Eg. function
```js
import { eventRace } from  "https://unpkg.com/ixfx/dist/events.js"
```

Eg. class
```js
import { SimpleEventEmitter } from  "https://unpkg.com/ixfx/dist/events.js"
class MyClass extends SimpleEventEmitter { ... }
```

### [Flow](https://clinth.github.io/ixfx/modules/Flow.html)

Sub-modules: Elapsed, StateMachine

Eg. function
```js
import { sleep } from  "https://unpkg.com/ixfx/dist/flow.js"
await sleep(1000);
```

Eg. sub-module
```js
import { Elapsed } from  "https://unpkg.com/ixfx/dist/flow.js"
let e = Elapsed.since();
```

Eg. class
```js
import { TaskQueue } from  "https://unpkg.com/ixfx/dist/flow.js"
const t = new TaskQueue();
```

### [Generators](https://clinth.github.io/ixfx/modules/Generators.html)

Sub-modules: Async, Chain, Sync

Eg. function
```js
import { count } from  "https://unpkg.com/ixfx/dist/generators.js"
for (const v of count(5, 5)) {
  ...
}
```

Eg. sub-module
```js
import { Sync } from  "https://unpkg.com/ixfx/dist/generators.js"
for (const v of Sync.chunks(source, 10)) {

}
```

### [Geometry](https://clinth.github.io/ixfx/modules/Geometry.html)

Sub-modules: Arcs, Beziers, Circles, Compound, Convolve2d, CurveSimplification, Ellipses, Grids, Layouts, Lines, Paths, Points, Polar, QuadTree, Rects, Scaler, Shapes, Spheres, SurfacePoints, Triangles, Vectors, Waypoints

Eg. function
```js
import { radianToDegree } from  "https://unpkg.com/ixfx/dist/geometry.js"
radianToDegree(Math.PI);
```

Eg. sub-module
```js
import { Points } from  "https://unpkg.com/ixfx/dist/geometry.js"
Points.multiply({x:1,y:2},{x:0.5,y:0.5});
```

### [Immutable](https://clinth.github.io/ixfx/modules/Immutable.html)

Sub-modules: _none_

Eg. function
```js
import { compareData } from  "https://unpkg.com/ixfx/dist/immutable.js"
compareData(a, b);
```

### [Io](https://clinth.github.io/ixfx/modules/Io.html)

Sub-modules: AudioAnalysers, AudioVisualisers, Bluetooth, Camera, Espruino, Serial, VideoFile

Eg. sub-module
```js
import { VideoFile } from  "https://unpkg.com/ixfx/dist/io.js"
VideoFile.start(file);
```

### [Modulation](https://clinth.github.io/ixfx/modules/Modulation.html)

Sub-modules: Easings, Forces, Oscillators

Eg. function
```js
import { jitter } from  "https://unpkg.com/ixfx/dist/modulation.js"
jitter({relative:0.1})(0.5);
```

Eg. sub-module
```js
import { Oscillators } from  "https://unpkg.com/ixfx/dist/modulation.js"
const osc = Oscillators.saw(0.1);
```

### [Numbers](https://clinth.github.io/ixfx/modules/Numbers.html)

Sub-modules: _none_

Eg. function
```js
import { average } from  "https://unpkg.com/ixfx/dist/numbers.js"
average(4, 2, 5);
```

### [Random](https://clinth.github.io/ixfx/modules/Random.html)

Sub-modules: _none_

Eg. function
```js
import { integer } from  "https://unpkg.com/ixfx/dist/random.js"
integer(10);
```

### [Rx](https://clinth.github.io/ixfx/modules/Rx.html)

Sub-modules: Dom

Eg. function
```js
import { fromArray } from  "https://unpkg.com/ixfx/dist/rx.js"
fromArray([ 1, 2, 3 ]);
```

### [Text](https://clinth.github.io/ixfx/modules/Text.html)

Sub-modules: _none_

Eg. function
```js
import { between } from  "https://unpkg.com/ixfx/dist/text.js"
between(source, start, end);
```

### [Util](https://clinth.github.io/ixfx/modules/Util.html)

Sub-modules: _none_

Eg. function
```js
import { isMap } from  "https://unpkg.com/ixfx/dist/util.js"
isMap(o);
```

### [Visual](https://clinth.github.io/ixfx/modules/Visual.html)

Sub-modules: BipolarView, Colour, Drawing, ImageDataGrid, Palette, Plot2, SceneGraph, Svg, Video

Eg. sub-module
```js
import { Colour } from  "https://unpkg.com/ixfx/dist/visual.js"
Colour.interpolate(amt, from, to);
```

