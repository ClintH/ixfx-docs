---
title: Grid
layout: ../../../layouts/MainLayout.astro
setup: |
  import GridVisitorElement from '/src/components/geometry/GridVisitorElement';
  import GridColourElement from '/src/components/geometry/GridColourElement';
  import GridOffsetElement from '/src/components/geometry/GridOffsetElement';
---

<script type="module" hoist>
import '/src/components/geometry/GridEditor';
</script>

[API Docs: Geometry.Grids module](https://clinth.github.io/ixfx/modules/Geometry.Grids.html)

A _grid_ is a rectangular area divided by rows and columns into cells of equal size. A bit like a table or spreadsheet. Each cell has an _x,y_ location with _0,0_ being the top-left corner.

Example: This grid has four rows and three columns.
<div>
  <table style="width:auto; border: 1px solid whitesmoke">
  <tr><td>0,0</td><td>0,1</td><td>2,0</td></tr>
  <tr><td>0,1</td><td>1,1</td><td>2,1</td></tr>
  <tr><td>0,2</td><td>1,2</td><td>2,2</td></tr>
  <tr><td>0,3</td><td>1,3</td><td>2,3</td></tr>
  </table>
</div>

A grid can be useful if your data has grid-like spatial qualities. It's useful for being able to gather data that is 'nearby' based on cell location, traversing space following different rules and so on.

Although there is a natural affinity between the grid and pixel coordinates, the grid isn't specifically tied to pixels. It could be used, for example, to keep track of a game world, where the map is logically divided into cells.

## Types

There are two main types for working with the grid functions:

```typescript
type Grid {
  rows: number,
  cols: number
}
type Cell {
  x: number,
  y: number
}
```

In action, this looks like:
```js
const shape = {rows: 10, cols: 10};
const cell = {x: 0, y: 0};
```

If a grid is going to be mapped to pixels (more on that below) it also need a _size_ field.


## Visiting

For a given starting cell, it's possible to _visit_ all cells once and only once with movement following a spatial logic.

<grid-visitor-element client:visible />

Provided [visitor](https://clinth.github.io/ixfx/modules/Geometry.Grids.html#visitor) functions are: `visitorDepth, visitorBreadth, visitorRandom, visitorContiguous, visitorRow,` and `visitorColumn`.

The visitor can be used in a `for .. of` loop

```js
import { Grids } from "https://unpkg.com/ixfx/dist/geometry.js"

// Start visitor at 5,5
const visitor = Grids.visitorDepth(shape, {x: 5, y: 5});
for (let cell of visitor) {
  // Visited cell..
}
```

Or for more flexibility, you can manually progress the visitor using `.next. In the below example, each step through the grid takes 500ms.

```js
import { Grids } from "https://unpkg.com/ixfx/dist/geometry.js"

// Set up visitor once
const visitor = Grids.visitorBreadth(shape, {x: 5, y: 5});
const visitorDelayMs = 500;

// Function to call via timeout
const visit = () => {
  const [cell,done] = visitor.next();
  if (done) { 
    return; // All cells visited
  } else {
    // TODO: Do something with `cell`...
  }

  // Run again after the delay
  setTimeout(visit, visitorDelayMs);
}
setTimeout(visit, visitorDelayMs);
```

The visitor can have an instance of [SetMutable](https://clinth.github.io/ixfx/interfaces/Collections.SetMutable.html) passed in to track what cells have been visited. This is useful if you want to check the status of cells during the visitor's journey.

```js
import { Grids } from "https://unpkg.com/ixfx/dist/geometry.js"
import { setMutable } from "https://unpkg.com/ixfx/dist/collections.js"

const visited = setMutable();
const visitor = Grids.visitorRandom(shape, {x: 5, y: 5}, visited);

...
if (visited.has(cell)) {
  // Do something if cell has been visited...
}
```

In the interactive demo above, this technique is used to colour cells differently depending on whether they've been visited.

To get a cell _x_ steps away from a position, use [visitFor](https://clinth.github.io/ixfx/modules/Geometry.Grids.html#visitFor)

## Iterating cells

The `cells` iterator is a simple alternative to the _visitor_ technique if you don't care about how the grid is traversed. It has a lower overhead than the visitor because it does not need to keep track of every cell it has visited.

```js
for (let cell of Grids.cells(shape)) {
  // do something with cell (defined as {x,y})
}
```

## Offsets

<grid-offset-element client:visible />

You can calculate the coordinates of each compass cardinal direction using `offsetCardinals`. It has the following signature:

```js
offsetCardinals(shape:Grid, origin:Cell, distance:number, boundsLogic:`unbounded` | `undefined`| `stop` | `wrap`): Neighbours
```

`distance` is how many cells away from origin you want to calculate.

`boundsLogic` determines how coordinates should wrap in the grid. Allowed values are: 
*  `wrap`: coordinates wrap around the edges of grid to opposite edge
*  `stop`: coordinates clamp to edge
*  `undefined`: out-of-grid coordinates are returned as `undefined`
*  `unbounded`: coordinates are returned without bounds checking

```js
import { Grids } from "https://unpkg.com/ixfx/dist/geometry.js"

const shape = { rows: 10, cols: 10 };
const origin = { x: 4, y: 4 };
const distance = 2;
const offsets = Grids.offsetCardinals(shape, origin, distance, `wrap`);

// Returns: {
//  n: {x,y}, ne: {x, y}, nw: {x,y}
//  s: {x,y}, se: {x,y}, sw: {x,y}
//  e: {x,y}, w: {x,y}
//}

const cellAbove = offsets.n // eg. get cell `distance` to the north of `origin`
```

## Mapping to data

Grid and cells don't store data. You can't stuff things into it as you would a spreadsheet cell. It is a _virtualised_ data structure in that it gives the appearance of traversing a structure, but it is only created on-demand.

To link a cell to your own data, use its coordinates as a key.

Lets say you want to associate colour with each cell:

```js

// 1. We want a function to create a key for a given cell
// Function takes a cell and returns its coordinates as a string
// eg: {x:10, y:5} => "10-5"
const key = (cell) => `${cell.x}-${cell.y}`;

// 2. We can create some data...
const store = new Map();

const someData = { colour: `red` }
const someMoreData = { color: `pink`};

// 3. Data can be associated using the map:
data.set(key({x: 0, y: 0}), someData);

// 4. And then retrieved from the basis of a cell:
const cellData = data.get(key({x:0, y:0}));
// cellData.colour, etc
```

As a complete example, we can associate a random colour and number to every cell.

```js
import { Grids } from "https://unpkg.com/ixfx/dist/geometry.js"
import { Arrays } from "https://unpkg.com/ixfx/dist/collections.js"

const key = (cell) => `${cell.x}-${cell.y}`;
const store = new Map();
const shape = { rows: 10, cols: 10 };
const colours = [`bisque`, `cadetblue`,`cornflowerblue`, `coral`]

for (let cell of Grids.cells(shape)) {
  store.set(key(cell), {colour: Arrays.randomElement(colours), funk: Math.random()});
}

// Fetch data associated with a given cell:
const val = store.get(key({x:5, y:5}));
// {colour: '...', funk: 0.235}
```

<grid-colour-element client:load />

## Mapping to pixels

Although the grid is not meant to be a literal visual grid, it can be used as such.

To map a grid to pixel coordinates, the cell size (assumed pixels) needs to be provided:

```js
const shape = { rows: 100, cols: 100, size: 5 };
```

Draw the grid by iterating over its cells:

```js
const ctx = document.getElementById(`myCanvas`).getContext(`2d`);
const shape = { rows: 100, cols: 100, size: 5 };

for (const cell of Grids.cells(shape)) {
  let rect = Grids.rectangleForCell(cell, shape);
  ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);
}
```

To get the visual bounds for a given:

```js
const shape = { rows: 100, cols: 100, size: 5 };

// rectangleForCell(cell:Cell, grid:Grid): Rect
// Returns { x, y, width, height } for cell at position 5,5
const rect = Grids.rectangleForCell({ x: 5, y: 5 }, shape); 
```

Or to go from coordinate (eg. mouse pointer) to cell:

```js
// Convert pointer position to cell coordinate
// cellAtPoint(point:Point, grid:Grid): Cell
const cell = Grids.cellAtPoint({evt.offsetX, evt.offsetY}, shape); // Returns {x,y}
```

## Demos

* [Grid DOM](https://clinth.github.io/ixfx-demos/geometry/grid-dom/): Generate DIVs based on grid cells ([source](https://github.com/ClintH/ixfx-demos/tree/main/geometry/grid-dom))
* [Grid Canvas](https://clinth.github.io/ixfx-demos/geometry/grid-canvas/): Draw elements based on grid cells ([source](https://github.com/ClintH/ixfx-demos/tree/main/geometry/grid-canvas))


## Functions overview


* [inside](https://clinth.github.io/ixfx/modules/Geometry.Grids.html#inside): Returns _true_ if given cell is within grid dimensions
* [getLine](https://clinth.github.io/ixfx/modules/Geometry.Grids.html#getLine): Returns all cells on a straight line between two cell coordinates

Enumerating cells
* [cells](https://clinth.github.io/ixfx/modules/Geometry.Grids.html#cells): Iterate all cells
* [rows](https://clinth.github.io/ixfx/modules/Geometry.Grids.html#rows): Iterate all rows
* [visitFor](https://clinth.github.io/ixfx/modules/Geometry.Grids.html#visitFor): Return cell _x_ steps away from a position using the provided visitor function
* [visitor](https://clinth.github.io/ixfx/modules/Geometry.Grids.html#visitor): Step through cells in some way
* [offset](https://clinth.github.io/ixfx/modules/Geometry.Grids.html#offset): Returns cell some x,y offset away from start
* [neighbours](https://clinth.github.io/ixfx/modules/Geometry.Grids.html#neighbours): Return neighbours for a cell
  
Visual grids
* [cellMiddle](https://clinth.github.io/ixfx/modules/Geometry.Grids.html#cellMiddle): Return pixel coordinate for the middle of a cell
* [rectangleForCell](https://clinth.github.io/ixfx/modules/Geometry.Grids.html#rectangleForCell): Get visual rectangle for cell