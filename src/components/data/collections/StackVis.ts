import {Stacks} from 'ixfx/lib/collections';
import {importEl} from '../../../loader.js';
import {fruit} from '../../../exampleData.js';
import {ArrayVisElement} from './ArrayVisElement.js';

let stack = Stacks.immutable();
const peekEl = document.getElementById(`peek`);

const vis = importEl(
  `vis`,
  `array-vis-element`) as ArrayVisElement;
vis.indexes = false;
const peek = () => {
  peekEl.innerText = (stack.peek === undefined) ? `Empty` : `Peek: ${stack.peek}`;
}

const updateVis = () => {
  vis.data = [...stack.data].reverse();
  peek();
}
const add = () => {
  stack = stack.push(fruit());
  updateVis();
}

document.getElementById(`btnPush`).addEventListener(`click`, add);
document.getElementById(`btnPop`).addEventListener(`click`, () => {
  if (stack.isEmpty) return;
  stack = stack.pop();
  updateVis();
});

add();
add();
add();
