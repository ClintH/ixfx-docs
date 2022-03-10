import {Queues} from 'ixfx/lib/collections';
import {importEl} from '../../../loader.js';
import {fruit} from '../../../exampleData.js';
import {ArrayVisElement} from './ArrayVisElement.js';

let queue = Queues.queue();
const peekEl = document.getElementById(`peek`);

const vis = importEl(
  `vis`,
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
  queue = queue.enqueue(fruit());
  updateVis();
}

document.getElementById(`btnEnqueue`).addEventListener(`click`, enqueue);
document.getElementById(`btnDequeue`).addEventListener(`click`, () => {
  if (queue.isEmpty) return;
  queue = queue.dequeue();
  updateVis();
});

enqueue();
enqueue();
enqueue();
