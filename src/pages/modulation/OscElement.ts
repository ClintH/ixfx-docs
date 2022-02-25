import {LitElement, html, css} from 'lit';
import {property} from 'lit/decorators.js';
import {elStyles} from '../../components/styles.js';
import {Colour, Palette, Plot} from 'ixfx/lib/visual';
import {debounce, ModTimer, continuously, frequencyTimer, Continuously} from 'ixfx/lib/flow';
import {Oscillators} from 'ixfx/lib/modulation';

export const tagName = 'oscillator-element';

export class OscElement extends LitElement {
  static readonly styles = [
    elStyles,
    css`
    .container {
      display: flex;
      align-items: center;
      flex-direction: column;
    }
    #warning {
      margin-top: 0.3em;
      margin-bottom: 0.3em;
      padding: 0.3em;
      background-color: var(--bg-dim);
      color: var(--fg-bright);
      display:none;
    }
    canvas {
      padding: 1em;
    }
    `];

  plotter: Plot.Plotter | undefined;
  palette = Palette.create();

  @property({type: Number})
  declare height: number;

  @property({type: Number})
  declare width: number;

  @property({type: Number})
  declare frequency: number;

  @property({type: Number})
  declare sampleDurationMs: number;

  @property({type: Number})
  declare sampleRateMs: number;

  @property({type: String})
  declare mode: string;

  @property({type: String})
  declare amModFunc: string;

  @property({type: String})
  declare fmModFunc: string;

  debounceFreq = debounce(() => {
    const f = parseFloat((this.shadowRoot.getElementById('freqRange') as HTMLInputElement).value) / 1000;
    this.frequency = f;
  }, 500)

  debounceSampleRate = debounce(() => {
    this.sampleRateMs = parseFloat((this.shadowRoot.getElementById('sampleRateRange') as HTMLInputElement).value);
  }, 500)

  debounceAmMod = debounce(() => {
    this.amModFunc = (this.shadowRoot.getElementById(`amModFunc`) as HTMLInputElement).value;
  }, 1000);

  debounceFmMod = debounce(() => {
    this.fmModFunc = (this.shadowRoot.getElementById(`fmModFunc`) as HTMLInputElement).value;
  }, 1000);

  runningWave: Continuously | undefined;
  timer: ModTimer | undefined;

  constructor() {
    super();
    this.amModFunc = `source * mod`;
    this.fmModFunc = `source * mod`;
    this.frequency = 1;
    this.sampleRateMs = 0;
    this.sampleDurationMs = 1000;
    this.height = 400;
    this.width = 300;
    this.mode = `editor`;
  }

  initPlot(capacity, recycle: boolean = false): Plot.Plotter {
    if (recycle) {
      this.plotter.dispose();
    } else {
      if (this.plotter !== undefined) {
        return this.plotter;
        //this.plotter.dispose();
      }
    }

    const plotEl = this.shadowRoot.getElementById('plot');
    let opts: Plot.PlotOpts = {
      capacity: capacity,
      lineWidth: 1,
      digitsPrecision: 1,
      y: {
        ...Plot.defaultAxis(`y`),
        scaleRange: [0, 1],
        labelRange: [0, 1],
        colour: Colour.getCssVariable(`fg`, `gray`)
      },
      x: {
        ...Plot.defaultAxis(`x`),
        showLine: false
      },
      style: (this.mode == `am` || this.mode === `fm`) ? `connected` : `dots`
    }
    // if (this.mode !== `fm`) {
    //   opts = {...opts, lineWidth: 1}
    // }
    this.plotter = Plot.plot(plotEl, opts);
    return this.plotter
  }

  drawSine() {
    this.timer = frequencyTimer(this.frequency);
    const s = Oscillators.sine(this.timer);
    this.drawWave(s);
  }

  drawSaw() {
    this.timer = frequencyTimer(this.frequency);
    const s = Oscillators.saw(this.timer);
    this.drawWave(s);
  }

  drawSquare() {
    this.timer = frequencyTimer(this.frequency);
    const s = Oscillators.square(this.timer);
    this.drawWave(s);
  }

  drawTriangle() {
    this.timer = frequencyTimer(this.frequency);
    const s = Oscillators.triangle(this.timer);
    this.drawWave(s);
  }

  lastExpressionWarn = ``;
  expressionWarn(msg: string) {
    if (msg === this.lastExpressionWarn) return;
    this.lastExpressionWarn = msg;
    const el = this.shadowRoot.getElementById(`warning`);
    el.style.display = `block`;
    el.innerText = msg;
  }

  expressionOk() {
    if (this.lastExpressionWarn.length === 0) return;
    this.lastExpressionWarn = ``;
    const el = this.shadowRoot.getElementById(`warning`);
    el.style.display = `none`;
  }

  drawWave(osc: IterableIterator<number>) {
    const sampleDurationMs = this.sampleDurationMs;
    const modeAm = this.mode === `am`;
    const modeFm = this.mode === `fm`;
    const p = this.initPlot(modeFm ? 300 : 100);
    p.clear();
    if (this.runningWave) this.runningWave.cancel();

    const modOsc = osc;
    let oscTimer = this.timer;
    if (modeAm || modeFm) {
      oscTimer = frequencyTimer(modeAm ? 1 : 0.25);
      osc = Oscillators.sine(oscTimer);
    }

    this.runningWave = continuously((_ticks, elapsed) => {
      let v = osc.next().value;

      if (modeAm && this.amModFunc !== undefined) {
        try {
          const source = v;
          const mod = modOsc.next().value;
          const result = eval(this.amModFunc);
          if (typeof result === `number`) {
            v = result;
            this.expressionOk();
          } else {
            this.expressionWarn(`Expression does not return a number`);
          }
        } catch (e) {
          this.expressionWarn(e);
        }
      } else if (modeFm && this.fmModFunc !== undefined) {
        const mod = modOsc.next().value;

        oscTimer.mod(mod);
        //oscTimer.reset();
      }
      p.add(v);
      return (elapsed < sampleDurationMs);
    }, this.sampleRateMs)
    this.runningWave.start();
  }

  async updated() {
    this.waveChange();
  }

  waveChange() {
    const val = (this.shadowRoot.querySelector(`input[name="waveType"]:checked`) as HTMLInputElement).value;
    switch (val) {
      case `sine`:
        this.drawSine();
        break;
      case `saw`:
        this.drawSaw();
        break;
      case `tri`:
        this.drawTriangle();
        break;
      case `square`:
        this.drawSquare();
        break;
      default:
        console.error(`Unknown osc type ${val}`);
    }
  }

  renderWaveSelector() {
    return html`
    <div class="toolbar centered">
      <section @change=${this.waveChange} class="radios">
        <input type="radio" name="waveType" id="waveSine" value="sine" checked><label for="waveSine" >Sine</label>
        <input type="radio" name="waveType" id="waveSaw" value="saw"><label for="waveSaw">Sawtooth</label>
        <input type="radio" name="waveType" id="waveSquare" value="square"><label for="waveSquare">Square</label>
        <input type="radio" name="waveType" id="waveTri" value="tri"><label for="waveTri">Triangle</label>
      </section>
    </div>
    `;
  }

  renderTools() {
    if (this.mode === `shape`) {
      return this.renderWaveSelector();
    } else if (this.mode === `fm`) {
      return html`
      ${this.renderWaveSelector()}
      <div class="controls wrappable">
        <div class="vertical">
          <label for="fmModFunc">Expression</label>
          <input type="text" @input=${this.debounceFmMod} value=${this.fmModFunc} id="fmModFunc" />    
        </div>
        <div class="vertical">
          <label for="freqRange">Mod freq (Hz): ${this.frequency}</label>
          <input @input=${this.debounceFreq} type="range" min="1" value=${this.frequency * 1000} max="1000" id="freqRange" />    
        </div>
      </div>`;
    } else if (this.mode === `am`) {
      return html`
      ${this.renderWaveSelector()}
      <div class="controls wrappable">
        <div class="vertical">
          <label for="amModFunc">Expression</label>
          <input type="text" @input=${this.debounceAmMod} value=${this.amModFunc} id="amModFunc" />    
        </div>
        <div class="vertical">
          <label for="freqRange">Mod freq (Hz): ${this.frequency}</label>
          <input @input=${this.debounceFreq} type="range" min="1" value=${this.frequency * 1000} max="5000" id="freqRange" />    
        </div>
      </div>`;
    } else {
      // Editor by default
      return html`
      ${this.renderWaveSelector()}
      <div class="controls wrappable">
        <div class="vertical">
          <label for="sampleRateRange">Sample rate (ms): ${this.sampleRateMs}</label>
          <input @input=${this.debounceSampleRate} type="range" min="0" value=${this.sampleRateMs} max="100" id="sampleRateRange" />    
        </div>
        <div class="vertical">
          <label for="freqRange">Frequency (Hz): ${this.frequency}</label>
          <input @input=${this.debounceFreq} type="range" min="1" value=${this.frequency * 1000} max="50000" id="freqRange" />    
        </div>
      </div>
      `;
    }
  }

  render() {
    return html`
			<div class="container">     
        ${this.renderTools()}
        <div id="warning">Warnings</div>
        <canvas width="${this.width}" height="${this.height}" id="plot" />
			</div>
		`;
  }
}

customElements.define(tagName, OscElement);
