import {Queues, DiscardPolicy} from 'ixfx/lib/collections';
import {importEl} from '../../../loader.js';
import {fruit} from '../../../exampleData.js';
import {ArrayVisElement} from './ArrayVisElement.js';

let queue = Queues.immutable();
const peekEl = document.getElementById(`peekDiscard`);
const discardEl = document.getElementById(`selDiscard`) as HTMLSelectElement;

const vis = importEl(
  `visDiscard`,
  `array-vis-element`) as ArrayVisElement;
vis.classes.withBottom = false;

const peek = () => {
  peekEl.innerText = (queue.peek === undefined) ? `Empty` : `Peek: ${queue.peek}`;
}

const updateVis = () => {
  // @ts-ignore
  vis.data = queue.data;
  peek();
}

const enqueue = () => {
  const discard = discardEl.value;
  queue = Queues.immutable({capacity: 3, discardPolicy: discard as DiscardPolicy}, ...queue.data);
  queue = queue.enqueue(fruit());
  updateVis();
}

document.getElementById(`btnEnqueueDiscard`).addEventListener(`click`, enqueue);
document.getElementById(`btnDequeueDiscard`).addEventListener(`click`, () => {
  if (queue.isEmpty) return;
  queue = queue.dequeue();
  updateVis();
});

enqueue();
enqueue();
enqueue();
