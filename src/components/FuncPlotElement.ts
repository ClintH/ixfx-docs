/* eslint-disable */
import {LitElement, html, css} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';

import {Colour, Drawing, Palette, Plot} from 'ixfx/lib/visual';
import {Generators} from 'ixfx';
import {Flow} from 'ixfx';
import {elStyles} from './styles.js';
import {isParenthesizedExpression} from 'typescript';

export const tagName = `funcplot-element`;

export class FuncPlotElement extends LitElement {
  static readonly styles = [
    elStyles,
    css`
      :host {
        --margin: 0.2em;
        --border: 3px solid;
      }
      #container {
        display: flex;
      }
      #plot {
        border: 1px solid red;
      }
      #demo {
        border: 1px solid green;
        flex-grow: 1;
      }
      #demoCanvas {
        border: 1px solid blue;
      }
  `];

  @property()
  declare classes;

  @property()
  declare func;

  @property({type: Boolean})
  declare animatedDraw;

  @property({type: Number})
  declare xResolution;

  plotter: Plot.Plotter | undefined;

  constructor() {
    super();
    this.animatedDraw = false;
    this.xResolution = 0.1;
    this.classes = {withBottom: true};
    this.func = (x) => x - 1;
  }

  async plot() {
    console.log(`plot`);
    let p = this.plotter;
    if (p === undefined) {
      const palette = Palette.create();
      palette.add(`series`, Colour.getCssVariable(`accent-bold`, `yellow`));
      const opts: Plot.PlotOpts = {
        capacity: 0, //Math.floor(1 / this.xResolution) + 1,
        palette: palette,
        autoSizeCanvas: false,
        showYAxis: true,
        showXAxis: true,
        plotSize: {width: 100, height: 100}

      };
      const plotParentEl = this.shadowRoot.querySelector(`#plot`) as HTMLElement;
      if (plotParentEl === null) throw new Error(`#plot not found`);
      this.plotter = p = Plot.plot(plotParentEl, opts);
    } else {
      p.clear();
    }

    const range = Generators.rangePercent(this.xResolution);
    if (this.animatedDraw) {
      for await (const v of Flow.interval(range, 200)) {
        console.log(`animated: ${v}`);
        p.add(this.func(v));
      }
    } else {
      for (let v of range) {
        p.add(this.func(v));

      }
    }

    this.demoSize();
  }

  demoOpacity() {
    const range = Generators.rangePercent(0.01);

    this.demoInit((bounds, ctx): boolean => {
      ctx.beginPath();

      const rangeNext = range.next();
      let v = 1;
      if (!rangeNext.done) {
        v = this.func(rangeNext.value);
      }
      v = Math.floor(v * 100);
      ctx.fillStyle = `hsla(200,80%,50%,${v}%)`;
      ctx.fillRect(0, 0, bounds.width, bounds.height);
      return !rangeNext.done;
    })
  }

  demoSize() {
    const range = Generators.rangePercent(0.01);

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
        v = this.func(rangeNext.value);
      }
      v = Math.floor(v * maxSize);

      ctx.font = `${v}px serif`;
      ctx.fillStyle = `yellow`;
      Drawing.textBlockCentered(ctx, [`RELAX`], {bounds: b});
      return !rangeNext.done;
    })
  }

  demoMove() {
    const range = Generators.rangePercent(0.01);
    const size = 10;
    this.demoInit((bounds, ctx): boolean => {
      ctx.fillStyle = `yellow`;
      ctx.beginPath();

      const rangeNext = range.next();
      const y = bounds.height / 2 - size / 2;
      let x = 0;
      if (rangeNext.done) {
        x = bounds.width - size - size;
      } else {
        const v = this.func(rangeNext.value);
        x = v * (bounds.width - size - size)
      }

      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
      return !rangeNext.done;
    })
  }

  private demoInit(cb: (bounds: {width: number, height: number}, ctx: CanvasRenderingContext2D) => boolean) {
    const el = this.shadowRoot.querySelector(`#demoCanvas`) as HTMLCanvasElement;

    if (el === null) {
      console.error(`#demoCanvas not found :(`);
      return;
    }
    const parent = el.parentElement;
    const parentBounds = parent.getBoundingClientRect();
    const margin = 0;
    const bounds = {width: parentBounds.width - margin - margin, height: parentBounds.height - margin - margin};
    el.height = parentBounds.height;
    el.width = parentBounds.width;

    const draw = () => {
      const ctx = el.getContext(`2d`);
      ctx.save();
      ctx.translate(margin, margin);
      ctx.clearRect(0, 0, bounds.width, bounds.height);

      // Run draw function
      const result = cb(bounds, ctx);

      ctx.restore();

      if (result) window.requestAnimationFrame(draw);
    }
    window.requestAnimationFrame(draw);

  }

  connectedCallback(): void {
    super.connectedCallback();
    document.addEventListener(`visibilitychange`, evt => {
      if (document.visibilityState === `visible`) {
        this.plot();
      }
    })
  }

  render() {
    console.log(`render`);
    return html`
    <div id="container" class=${classMap(this.classes)}>
      <canvas id="plot"></canvas>
      <div class="vertical mini toolbar">
        <button @click="${this.demoMove}">Move</button>
        <button @click="${this.demoOpacity}">Opacity</button>
        <button @click="${this.demoSize}">Size</button>
      </div>
      <div id="demo"><canvas id="demoCanvas"></div>
    </div> 
    `
  }
}

customElements.define(tagName, FuncPlotElement);