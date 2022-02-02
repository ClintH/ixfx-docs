/* eslint-disable */
import {mutableStringSet} from 'ixfx/lib/collections';
import {Grids} from 'ixfx/lib/geometry';
import {Forms, resolveEl} from 'ixfx/lib/dom';
import {randomElement} from 'ixfx/lib/collections';
import {Palette, DictionaryOfColourCombinations} from 'ixfx/lib/visual';

import {GridEditor} from '../../components/GridEditor';

// -----------------------------
// Square perimeter & Neighbours
let selectedRingCell = undefined;
let perimGrid = {rows: 11, cols: 11, size: 15};
let perimDistance = 3;
// document.getElementById('ringTestCanvas').addEventListener('pointermove', (evt) => {
//   selectedRingCell = Grids.getCell({x: evt.offsetX, y: evt.offsetY}, perimGrid);
//   testPerimeter();
// });
// const testPerimeter = function () {
//   let c = (document.getElementById('ringTestCanvas') as HTMLCanvasElement).getContext('2d');
//   let walker = Grids.walkByRow(perimGrid);

//   const start = selectedRingCell === undefined ? {x: 5, y: 5} : selectedRingCell;
//   const perim = Grids.getSquarePerimeter(perimGrid, perimDistance, start, `stop`);

//   let neighbours = Grids.neighbours(perimGrid, start, `wrap`);

//   for (const cell of walker) {
//     let r = Grids.rectangleForCell(cell, perimGrid);
//     c.moveTo(cell.x, cell.y);
//     const onPerim = perim.find(c => cellEquals(c, cell))
//     c.fillStyle = onPerim ? 'black' : 'silver';
//     if (cellEquals(cell, start)) c.fillStyle = 'red';
//     c.fillRect(r.x, r.y, r.width, r.height);

//     // Show neighours with yellow outline
//     if (neighbours.find(c => cellEquals(c, cell))) {
//       c.strokeStyle = 'yellow';
//       c.strokeRect(r.x, r.y, r.width, r.height);
//     }
//   }
// }
//testPerimeter();

// ------------------------------
// Point-to-point
let lineGrid = {rows: 40, cols: 40, size: 4};
let lineEndCell = undefined;
// document.getElementById('lineTestCanvas').addEventListener('pointermove', (evt) => {
//   lineEndCell = Grids.getCell({x: evt.offsetX, y: evt.offsetY}, lineGrid);
//   testLine();
// });
// const testLine = function () {
//   let c = (document.getElementById('lineTestCanvas') as HTMLCanvasElement).getContext('2d');
//   let walker = Grids.walkByRow(lineGrid);
//   let start = {x: 10, y: 10}
//   let end = lineEndCell === undefined ? {x: 0, y: 0} : lineEndCell;

//   const line = Grids.getLine(start, end);
//   for (const cell of walker) {
//     let r = Grids.rectangleForCell(cell, lineGrid);
//     c.moveTo(cell.x, cell.y);
//     const onLine = line.find(c => cellEquals(c, cell))
//     c.fillStyle = onLine ? 'black' : 'silver';
//     if (cellEquals(cell, start)) c.fillStyle = 'red';
//     if (cellEquals(cell, end)) c.fillStyle = 'blue';

//     c.fillRect(r.x, r.y, r.width, r.height);
//   }
// }
//testLine();

// -------------------
// Offsets
const offsetsGrid = resolveEl(`#offsetsGrid`) as GridEditor;
offsetsGrid.selectedCell = {x: 0, y: 0};

const offsets = () => {
  const grid = offsetsGrid.getGrid();
  const distance = offsetsDistance.value;
  const selected = offsetsGrid.selectedCell;

  const offsets = Grids.offsetCardinals(grid, selected, distance, offsetsWrapSel.value as Grids.BoundsLogic);
  offsetsGrid.cellRenderer = (cell, rect, ctx) => {
    const kv = Object.entries(offsets).find(t => Grids.cellEquals(t[1], cell));
    if (kv === undefined) return false;

    if (kv[0] === `s`) console.log(kv[0] + ' ' + JSON.stringify(kv[1]));
    ctx.fillStyle = Palette.getCssVariable(`theme-bg-hover`, `yellow`);
    //ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
    ctx.fillStyle = `white`;
    ctx.textBaseline = `top`;

    const yOffset = kv[0].startsWith(`n`) ? 20 : 5;
    ctx.fillText(kv[0], rect.x + 5, rect.y + yOffset);

    return true;
  }
}
offsetsGrid.addEventListener(`cellPointerMove`, (ev: CustomEvent) => {
  const cell = ev.detail as Grids.Cell;
  if (cell === undefined) return;
  offsetsGrid.selectedCell = cell;
  offsets();
});
const offsetsDistance = Forms.numeric(`#rangeOffsetsDistance`, offsets);
const offsetsWrapSel = Forms.select(`#selOffsetsWrap`, offsets);

offsets();

// ------------------
// Data mapping
const dataGrid = resolveEl(`#dataGrid`) as GridEditor;
const dataGridRead = resolveEl(`#dataGridRead`);
const dataGridStore = new Map();
const palette = DictionaryOfColourCombinations.randomPalette();

Forms.button(`#btnDataRandom`, () => randomGrid());
dataGrid.cellRenderer = (cell, rect, ctx) => {
  const d = dataGridStore.get(Grids.cellKeyString(cell));
  if (d === undefined) return;
  const [r, g, b] = d.colour;
  ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${d.funk})`;
  ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
  return true;
};
dataGrid.addEventListener(`cellPointerMove`, (ev: CustomEvent) => {
  const cell = ev.detail as Grids.Cell;
  if (cell === undefined) return;
  const d = dataGridStore.get(Grids.cellKeyString(cell));

  dataGridRead.innerText = `Cell ${cell.x}, ${cell.y} has data ${JSON.stringify(d)}`;
});

const randomGrid = () => {
  const shape = dataGrid.getGrid();

  const randomColour = () => randomElement(palette).rgb;
  for (let cell of Grids.cells(shape)) {
    dataGridStore.set(Grids.cellKeyString(cell), {colour: randomColour(), funk: Math.random()});
  }
  dataGrid.draw();
}
randomGrid();

// ------------------
// Visitor
const visGrid = resolveEl(`#visGrid`) as GridEditor;
let visLastClicked = {x: 0, y: 0};
visGrid.addEventListener(`change`, (ev: CustomEvent) => {
});
visGrid.addEventListener(`cellPointerUp`, (ev: CustomEvent) => {
  visLastClicked = ev.detail as Grids.Cell;
  visStop();
  setTimeout(() => visStart(), 100);
});
let visStopping = false;
const visStart = () => {
  const delayMs = 100;
  const sel = Forms.select(`#selVisTechnique`);
  const grid = visGrid.getGrid();
  const visited = mutableStringSet<Grids.Cell>(c => Grids.cellKeyString(c));
  const visitOpts = {visited};
  let visitor;
  switch (sel.value) {
    case `Depth`:
      visitor = Grids.visitorDepth(grid, visLastClicked, visitOpts);
      break;
    case `Breadth`:
      visitor = Grids.visitorBreadth(grid, visLastClicked, visitOpts);
      break;
    case `Row`:
      visitor = Grids.visitorRow(grid, visLastClicked, visitOpts);
      break;
    case `Column`:
      visitor = Grids.visitorColumn(grid, visLastClicked, visitOpts);
      break;
    case `Random Contiguous`:
      visitor = Grids.visitorRandomContiguous(grid, visLastClicked, visitOpts);
      break;
    default:
      visitor = Grids.visitorRandom(grid, visLastClicked, visitOpts);
  }
  //const visitor = Grids.visitor(visitorFn, grid, visLastClicked, Grids.neighbours, visited);

  btnVisStart.disabled = true;
  btnVisStop.disabled = false;
  visStopping = false;
  visGrid.cellRenderer = (cell, r, ctx) => {
    if (visited.has(cell)) {
      ctx.fillStyle = `pink`;
      ctx.fillRect(r.x, r.y, r.width, r.height);
      return true;
    }
    return false;
  };

  const run = () => {
    if (visStopping) return;
    const v = visitor.next();
    const cell = v.value;
    const done = v.done;
    if (done) {
      console.log(`Visitor done`);
      visGrid.selectedCell = visLastClicked;
      btnVisStart.disabled = false;
      btnVisStop.disabled = true;
      return;
    }
    // @ts-ignore
    visGrid.selectedCell = cell;
    setTimeout(run, delayMs);
  }
  setTimeout(run, delayMs);
}

const visStop = () => {
  visStopping = true;
  visGrid.selectedCell = visLastClicked;
  btnVisStart.disabled = false;
  btnVisStop.disabled = true;
}

const btnVisStart = Forms.button(`#btnVisStart`, visStart);
const btnVisStop = Forms.button(`#btnVisStop`, visStop);