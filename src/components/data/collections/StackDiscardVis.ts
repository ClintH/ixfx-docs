import {Stacks, DiscardPolicy} from 'ixfx/lib/collections';
import {importEl} from '../../../loader.js';
import {fruit} from '../../../exampleData.js';
import {ArrayVisElement} from './ArrayVisElement.js';

let stack = Stacks.stack();
const peekEl = document.getElementById(`peekDiscard`);
const discardEl = document.getElementById(`selDiscard`) as HTMLSelectElement;

const vis = importEl(
  `visDiscard`,
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
  const discard = discardEl.value;
  stack = Stacks.stack({capacity: 3, discardPolicy: discard as DiscardPolicy}, ...stack.data);
  stack = stack.push(fruit());
  updateVis();
}

document.getElementById(`btnPushDiscard`).addEventListener(`click`, add);
document.getElementById(`btnPopDiscard`).addEventListener(`click`, () => {
  if (stack.isEmpty) return;
  stack = stack.pop();
  updateVis();
});

add();
add();
add();
