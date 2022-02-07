/* eslint-disable */
import * as Envelopes from 'ixfx/lib/modulation';
import {Forms, resolveEl, log} from 'ixfx/lib/dom';
import {Palette, Plot} from 'ixfx/lib/visual';
import {fromEvent, debounceTime} from 'rxjs';
import {map} from 'rxjs/operators';
import {LogElement} from '../../components/LogElement.js';

const envDataLog = document.getElementById(`envDataLog`) as LogElement;

// Setup plot
const palette = Palette.create();
palette.add(`series-`, Palette.getCssVariable(`accent-bold`, `yellow`));

const envData = Plot.plot2(`#envData`, {
  capacity: 300,
  showYAxis: true,
  palette: palette,
  lineWidth: 3
});

// Setup envelope
let shouldLoop = false;
let opts: Envelopes.AdsrOpts & Envelopes.EnvelopeOpts = {
  ...Envelopes.defaultAdsrOpts(),
  attackBend: 1,
  decayBend: -1,
  releaseBend: 1
};
let env = Envelopes.adsr({...opts, shouldLoop});

env.addEventListener(`change`, ev => {
  Forms.button(`#btnRelease`).disabled = ev.newState !== `sustain`;
});

Forms.button(`#btnTriggerHold`, () => {
  envDataLog.clear();
  env.trigger(true);
  startDrawing();
});
Forms.button(`#btnRelease`, () => {
  env.release();
});
Forms.button(`#btnTrigger`, () => {
  envDataLog.clear();
  env.trigger();
  startDrawing();
});

const selectShow = Forms.select(`#selectShow`, (val) => {
  envData.clear();
  envDataLog.log(``);
  startDrawing();
});

// Update playground if envelope is changed
fromEvent(resolveEl(`#envEditor`), `change`)
  .pipe(
    map((v: CustomEvent) => v.detail as Envelopes.AdsrOpts),
    debounceTime(1000))
  .subscribe(v => {
    opts = v;
    updateEnvelope();
  });

const updateEnvelope = () => {
  try {
    env = Envelopes.adsr({...opts, shouldLoop});
    env.trigger();
    envDataLog.clear();
    envData.clear();
    startDrawing();
  } catch (err) {
    envDataLog.error(err);
  }
}

Forms.checkbox(`#chkLooping`, (newVal) => {
  shouldLoop = newVal;
  updateEnvelope();
});

let isDrawing = false;

const startDrawing = () => {
  if (isDrawing) return;
  const draw = function () {
    let [stage, scaled, amt] = env.compute();
    if (amt < 0) debugger;
    if (stage === undefined) {
      isDrawing = false;
      return;
    }

    // Plot & log data
    const what = selectShow.value === `raw` ? amt : scaled;
    envData.add(what);
    envDataLog.log(`${stage} ${what.toFixed(3)}`);

    if (!env.isDone) {
      isDrawing = true;
      window.requestAnimationFrame(draw);
    } else {
      console.log(`Envelope done`);
      isDrawing = false;
    }
  }
  window.requestAnimationFrame(draw);
}

updateEnvelope();