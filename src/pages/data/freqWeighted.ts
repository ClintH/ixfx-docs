/* eslint-disable */
import {frequencyMutable} from 'ixfx';
import {log} from 'ixfx/lib/dom';
import {HistogramVis, FrequencyHistogramPlot} from 'ixfx/lib/components';
import {Random} from 'ixfx';

const logger = log(`#dataStream`, {capacity: 8, timestamp: false});
const freq = frequencyMutable<string>();
const plot = new FrequencyHistogramPlot(document.getElementById('dataPlot') as HistogramVis);
// plot.el.showDataLabels = false;
// plot.el.showXAxis = false;

plot.setAutoSort(`valueReverse`);
let itemsLeft = 200;

let producerId = 0;
freq.addEventListener(`change`, () => {
  plot.update(freq.toArray());
});

const start = () => {
  logger.log(`Start`);
  logger.log();
  producerId = window.setInterval(() => {
    itemsLeft--;
    //const r = `something really long ` +  Math.floor(Math.random()*100);// weightedRandom(1, 100);
    const r = Random.weighted(1, 100).toString();
    freq.add(r);
    logger.log(r.toString());

    if (itemsLeft <= 0) stop();
  }, 1000);
};

const stop = () => {
  if (producerId === 0) return;
  logger.log(`Stop`);
  logger.log();
  itemsLeft = 200;
  window.clearInterval(producerId);
}

const clear = () => {
  freq.clear();
  logger.log();
}

document.getElementById(`btnStart`).addEventListener(`click`, start);
document.getElementById(`btnStop`).addEventListener(`click`, stop);
document.getElementById(`btnClear`).addEventListener(`click`, clear);
start();