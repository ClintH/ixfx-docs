/* eslint-disable */
import {LitElement, html, css} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';

import {Colour, Drawing, Palette, Plot} from 'ixfx/lib/visual';
import {Generators} from 'ixfx';
import {Flow} from 'ixfx';
import {elStyles} from './styles.js';

export const tagName = `funcplot-element`;

export type EditableFunc = {
  text: string,
  fn: any
};

export class FuncPlotElement extends LitElement {
  static readonly styles = [
    elStyles,
    css`
      #container {
        display: flex;
      }
      #plot {
      }
      #demo {
        flex-grow: 1;
      }
      #demoCanvas {
        position: absolute;
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
        margin-top: 2em;
        background: var(--bg-mono);
        padding: 0.3em;  
      }
  `];

  @property()
  declare classes;

  @property({type: String})
  declare fn: string;

  @property({type: Boolean})
  declare animatedDraw;

  @property({type: Boolean})
  declare editable;

  @property({attribute: true, type: Boolean})
  declare collapsed;

  @property({type: Number})
  declare xResolution;

  plotter: Plot.Plotter | undefined;
  func: EditableFunc | undefined;

  constructor() {
    super();
    this.animatedDraw = false;
    this.xResolution = 0.05;
    this.collapsed = false;
    this.classes = {withBottom: true};
    this.editable = false;
    this.setFunctionByString(`(x) => x - 1`);
  }

  showWarning(text: string) {
    if (text.length > 0) console.warn(text);
    if (this.shadowRoot === null) return;
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
    try {
      const fn = new Function(`x`, `return ${text}`);
      this.func = {
        text,
        fn
      };
      this.showWarning(``);
    } catch (ex) {
      this.showWarning(ex);
    }
  }

  setFunction(text: string, fn: any) {
    this.func = {
      text,
      fn
    };
  }

  getValue(x?: number | void): number {
    if (x === undefined) return 0;
    try {
      const v = this.func.fn(x);
      this.showWarning(``);
      return v;
    } catch (ex) {
      this.showWarning(ex);
      return 0;
    }
  }

  async plot(animatedDraw: boolean) {
    if (!this.hasUpdated) return;
    this.plotAnimationRunning = true;

    let p = this.plotter;
    if (p === undefined) {
      const plotParentEl = this.shadowRoot.querySelector(`#plot`) as HTMLElement;
      if (plotParentEl === null) throw new Error(`#plot not found`);

      const opts: Plot.PlotOpts = {
        capacity: 0,
        autoSizeCanvas: false,
        y: {
          ...Plot.defaultAxis(`y`),
          scaleRange: [-.3, 1.3],
          labelRange: [0, 1],
          colour: Colour.getCssVariable(`fg`, `gray`)
        },
        x: {
          ...Plot.defaultAxis(`x`),
          showLine: true,
          scaleRange: [0, 1 / this.xResolution]
        },
        plotSize: {width: 100, height: 100}
      };

      this.plotter = p = Plot.plot(plotParentEl, opts);
    } else {
      p.clear();
    }

    const range = Generators.rangePercent(this.xResolution);

    if (animatedDraw) {
      for await (const v of Flow.interval(range, 100)) {
        p.add(this.getValue(v));
      }
    } else {
      for (let v of range) {
        p.add(this.getValue(v));
      }
    }

    this.plotAnimationRunning = false;
  }

  protected updated(_changedProperties: Map<string | number | symbol, unknown>): void {
    super.updated(_changedProperties);
    this.plot(this.animatedDraw);
    if (!this.collapsed) this.demoMove();

  }

  demoOpacity() {
    if (this.collapsed) return;
    const range = Generators.rangePercent(0.01);

    this.demoInit((bounds, ctx): boolean => {

      const rangeNext = range.next();
      let v = 1;
      if (!rangeNext.done) v = this.getValue(rangeNext.value);

      v = Math.floor(v * 100);
      ctx.fillStyle = `hsla(200,80%,50%,${v}%)`;
      ctx.fillRect(0, 0, bounds.width, bounds.height);
      return !rangeNext.done;
    })
  }

  demoHue() {
    if (this.collapsed) return;
    const totalLoops = 100;

    const range = Generators.rangePercent(1 / totalLoops);
    let x = 0;
    this.demoInit((bounds, ctx, loops): boolean => {
      const xPerLoop = Math.floor(bounds.width / totalLoops);

      const rangeNext = range.next();
      let v = 1;
      if (!rangeNext.done) v = this.getValue(rangeNext.value);

      ctx.fillStyle = Colour.interpolate(v, `blue`, `red`, `hsl`);

      ctx.fillRect(x, 0, xPerLoop, bounds.height);
      x += xPerLoop;
      return !rangeNext.done;
    }, false)
  }

  demoSize() {
    if (this.collapsed) return;

    const range = Generators.rangePercent(0.01);
    const fillStyle = Colour.getCssVariable(`yellow`, `yellow`);

    this.demoInit((bounds, ctx): boolean => {
      const maxSize = bounds.height - 40;
      const b = {
        x: 0,
        y: 0,
        width: bounds.width,
        height: bounds.height
      }
      const rangeNext = range.next();
      let v = 1;
      if (!rangeNext.done) {
        v = this.getValue(rangeNext.value);
      }
      v = Math.floor(v * maxSize);

      ctx.font = `${v}px serif`;
      ctx.fillStyle = fillStyle;
      Drawing.textBlockCentered(ctx, [`RELAX`], {bounds: b});
      return !rangeNext.done;
    })
  }

  demoMove() {
    if (this.collapsed) return;

    const fillStyle = Colour.getCssVariable(`yellow`, `yellow`);
    const range = Generators.rangePercent(0.01);
    const size = 10;

    this.demoInit((bounds, ctx): boolean => {
      ctx.fillStyle = fillStyle;
      ctx.beginPath();
      const xMax = bounds.width - (4 * size);
      const rangeNext = range.next();
      const y = bounds.height / 2 - size / 2;
      let v = 1;
      if (!rangeNext.done) {
        v = this.getValue(rangeNext.value);
      }

      const x = size + size + (v * xMax);
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
      return !rangeNext.done;
    })
  }

  private demoInit(cb: (bounds: {width: number, height: number}, ctx: CanvasRenderingContext2D, loops: number) => boolean, clear = true) {
    if (this.collapsed) return;
    const el = this.shadowRoot.querySelector(`#demoCanvas`) as HTMLCanvasElement;

    if (el === null) {
      console.error(`#demoCanvas not found :(`);
      return;
    }
    const parent = el.parentElement;
    const parentBounds = parent.getBoundingClientRect();
    const margin = 0;
    const bounds = {width: parentBounds.width - margin - margin, height: parentBounds.height - margin - margin};
    el.height = parent.clientHeight;
    el.width = parent.clientWidth;
    let loops = 0;
    const draw = () => {
      const ctx = el.getContext(`2d`);
      ctx.save();
      ctx.translate(margin, margin);

      if (clear) ctx.clearRect(0, 0, bounds.width, bounds.height);

      // Run draw function
      const result = cb(bounds, ctx, loops++);

      ctx.restore();

      if (result) window.requestAnimationFrame(draw);
    }
    window.requestAnimationFrame(draw);

  }

  connectedCallback(): void {
    super.connectedCallback();
    // document.addEventListener(`visibilitychange`, evt => {
    //   if (document.visibilityState === `visible`) {
    //     this.plotter.drawValue(0);
    //   }
    // })
  }

  plotAnimationRunning = false;
  playPlot() {
    if (this.plotAnimationRunning) return;
    this.plot(true);
  }

  fnEdit(evt: Event) {
    const el = evt.target as HTMLInputElement;
    this.setFunctionByString(el.value);
    this.plot(false);
  }

  renderEditable() {
    if (!this.editable) return html``;
    const fn = this.func;
    return html`
    <div class="controls">
      <label for="txtFunc">Function</label>
      <input @input="${this.fnEdit}" id="txtFunc" type="text" value="${fn.text}">
    </div>
    <div id="parseMsg" style="display:none">
      Some warning
    </div>
    `;
  }

  render() {
    if (this.collapsed) {
      return html`
      <canvas @click="${this.playPlot}" @pointerenter="${this.playPlot}" id="plot"></canvas>
      `;
    } else {
      return html`
      <div id="container" class=${classMap(this.classes)}>
        <div class="plotContainer">
          ${this.renderEditable()}
          <canvas @click="${this.playPlot}" @pointerenter="${this.playPlot}" id="plot"></canvas>
        </div>
        <div class="vertical mini toolbar">
          <button @click="${this.demoMove}">Move</button>
          <button @click="${this.demoOpacity}">Opacity</button>
          <button @click="${this.demoSize}">Size</button>
          <button @click="${this.demoHue}">Hue</button>
        </div>
        <div id="demo"><canvas id="demoCanvas"></div>
      </div> 
      `
    }
  }
}

if (!customElements.get(tagName)) customElements.define(tagName, FuncPlotElement);