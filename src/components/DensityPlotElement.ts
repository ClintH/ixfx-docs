/* eslint-disable */
import {LitElement, html, css, PropertyValueMap} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';

import {Colour, Drawing} from 'ixfx/lib/visual';
import {Ellipses} from 'ixfx/lib/geometry';

import {Continuously, continuously, debounce, repeat} from 'ixfx/lib/flow';
import {elStyles} from './styles.js';
import {Normalise} from 'ixfx/lib/data';

export const tagName = `density-plot-element`;

export type EditableFunc = {
  text: string,
  fn: any
};

export class DensityPlotElement extends LitElement {
  static readonly styles = [
    elStyles,
    css`
      #container {
        display: flex;
        flex-direction:column;
      }
      .plotContainer {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .controls {
        flex-direction: column;
        margin-bottom: 0.5em;
      }
      .controls input {
        font-family: var(--font-mono);
      }
      #parseMsg {
        position: absolute;
        border-radius: 0.2em;
        margin-top: 3em;
        background: var(--bg-mono);
        padding: 0.3em;  
      }
  `];

  @property()
  declare classes;

  @property({attribute: true, type: String})
  declare view: string;

  @property({type: String})
  declare fn: string;

  @property({attribute: true, type: Boolean})
  declare editable: boolean;

  @property({attribute: true, type: Number})
  declare scaleMin: number;
  @property({attribute: true, type: Number})
  declare scaleMax: number;

  @property({attribute: true, type: Number})
  declare valuesToSample: number;

  func: EditableFunc | undefined;
  looper: Continuously;
  circleFillStyle: string | undefined;
  values: number[];

  paintSpeedMs = 20;

  debounceFn = debounce((elapsedMs, ...data: any[]) => {
    const el = this.shadowRoot.getElementById(`txtFn`) as HTMLInputElement;
    this.setFunctionByString(el.value);
    this.reset();
  }, 1000)


  constructor() {
    super();
    this.editable = false;
    this.valuesToSample = 1000;
    this.classes = {withBottom: true};
    if (this.fn === undefined) this.fn = `Math.random()`;

    this.looper = continuously((ticks: number, elapsedMs: number) => {
      this.draw();
      if (this.values.length === 0) return false;
    }, this.paintSpeedMs, (ticks, elapsed) => {
      //console.log(`reset!`);
      this.values = this.computeValues(this.valuesToSample);
    });
  }

  showWarning(text: string) {
    if (text.length > 0) console.warn(text);
    if (this.shadowRoot === undefined || this.shadowRoot === null) return;
    const el = this.shadowRoot.getElementById(`parseMsg`);
    if (el === null) return;
    el.innerText = text;
    if (text.length === 0) {
      el.style.display = `none`;
    } else {
      el.style.display = `block`;
    }
  }

  setFunctionByString(text: string) {
    //console.log(`setFunctionByString: ${text}`);
    try {
      this.func = {
        text,
        fn: () => eval(text)
      };
      this.showWarning(``);
      this.values = this.computeValues(this.valuesToSample);
      this.fn = text;
    } catch (ex) {
      this.showWarning(ex.message);
      console.warn(ex);
    }
  }

  setFunction(text: string, fn: any) {
    this.func = {
      text,
      fn
    };
  }

  private computeValues(count: number): readonly number[] {
    const r = repeat<number>(count, () => {
      try {
        const v = this.func.fn();
        this.showWarning(``);
        return v;
      } catch (ex) {
        this.showWarning(ex);
        return 0;
      }
    });

    if (this.scaleMax === undefined || this.scaleMin === undefined)
      return Normalise.array(r);
    else
      return r;
  }

  protected updated(_changedProperties: Map<string | number | symbol, unknown>): void {
    super.updated(_changedProperties);
    this.setFunctionByString(this.fn);
    this.looper.start();
  }

  protected firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    super.firstUpdated(_changedProperties);
  }

  draw() {
    if (this.shadowRoot === undefined) return;
    if (this.circleFillStyle === undefined) {
      this.circleFillStyle = Colour.opacity(Colour.getCssVariable(`yellow`, `yellow`), 0.05);
    }
    const el = this.shadowRoot.querySelector(`#plot`) as HTMLCanvasElement;
    if (el === null) {
      console.error(`#plot not found :(`);
      this.looper.cancel();
      return;
    }

    const parent = el.parentElement;
    const parentBounds = parent.getBoundingClientRect();
    const margin = 10;
    const bounds = {
      width: parentBounds.width - margin - margin,
      height: parentBounds.height - margin - margin
    };
    if (el.height !== parent.clientHeight) el.height = parent.clientHeight;
    if (el.width !== parent.clientWidth) el.width = parent.clientWidth;

    const ctx = el.getContext(`2d`);

    const x = (this.values.pop() * bounds.width) + margin;
    const e = {x, y: bounds.height / 2, ...Ellipses.fromDegrees(2, 10, 90)};
    Drawing.ellipse(ctx, e, {fillStyle: this.circleFillStyle});
  }

  connectedCallback(): void {
    super.connectedCallback();
    document.addEventListener(`visibilitychange`, evt => {
      if (document.visibilityState === `visible`) {
        this.reset();
      } else if (document.visibilityState === `hidden`) {
        this.looper.cancel();
      }
    });
  }

  clear() {
    const el = this.shadowRoot.querySelector(`#plot`) as HTMLCanvasElement;
    if (el === null) return;
    const ctx = el.getContext(`2d`);
    const parent = el.parentElement;
    const parentBounds = parent.getBoundingClientRect();
    //console.log(`clear`);
    ctx.clearRect(0, 0, parentBounds.width, parentBounds.height);
  }

  reset() {
    this.clear();
    this.values = this.computeValues(this.valuesToSample);

    this.looper.start();

    //const btn = this.shadowRoot.getElementById(`btnStop`);
    //if (btn !== null) btn.removeAttribute(`disabled`);
  }

  stop() {
    this.looper.cancel();
    // const btn = this.shadowRoot.getElementById(`btnStop`);
    //if (btn !== null) btn.setAttribute(`disabled`, `true`);
  }

  render() {
    return html`
    <div id="container" class=${classMap(this.classes)}>
    ${this.editable ? html`
      <div class="toolbar">
        <input @input=${this.debounceFn} id="txtFn" type="text" value=${this.fn}>
      </div>` : ``}
      <div id="parseMsg"></div>
      <div class="plotContainer">
        <canvas @click="${this.reset}" id="plot"></canvas>
      </div>
     
    </div> 
    `
  }

}

if (!customElements.get(tagName)) customElements.define(tagName, DensityPlotElement);