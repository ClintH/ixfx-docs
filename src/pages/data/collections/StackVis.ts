import {Stacks} from 'ixfx/lib/collections';
import {importEl} from '../../../loader.js';
import {fruit} from '../../../exampleData.js';
import {ArrayVisElement} from '../../../components/ArrayVisElement.js';

let stack = Stacks.stack();
const peekEl = document.getElementById(`peek`);

const vis = importEl(
  `vis`,
  `arrayvis-element`) as ArrayVisElement;
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
