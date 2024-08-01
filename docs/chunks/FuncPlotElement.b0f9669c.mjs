import { LitElement, css, html } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { P as PlotOld_exports, C as Colour_exports, n as numbers_exports, f as flow_exports, D as Drawing_exports } from './chunk-IYXXLC7L.d562e3d6.mjs';
import { e as elStyles } from './styles.9b8f8965.mjs';

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};
const tagName = `func-plot-element`;
class FuncPlotElement extends LitElement {
  static styles = [
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
  `
  ];
  plotter;
  func;
  constructor() {
    super();
    this.animatedDraw = false;
    this.xResolution = 0.05;
    this.collapsed = false;
    this.classes = { withBottom: true };
    this.editable = false;
    this.setFunctionByString(`(x) => x - 1`);
  }
  showWarning(text) {
    if (text.length > 0)
      console.warn(text);
    if (this.shadowRoot === void 0 || this.shadowRoot === null)
      return;
    const el = this.shadowRoot.getElementById(`parseMsg`);
    if (el === null)
      return;
    el.innerText = text;
    if (text.length === 0) {
      el.style.display = `none`;
    } else {
      el.style.display = `block`;
    }
  }
  setFunctionByString(text) {
    try {
      const fn = new Function(`x`, `return ${text}`);
      this.func = {
        text,
        fn
      };
      this.showWarning(``);
    } catch (ex) {
      console.warn(ex);
    }
  }
  setFunction(text, fn) {
    this.func = {
      text,
      fn
    };
  }
  getValue(x) {
    if (x === void 0)
      return 0;
    try {
      const v = this.func.fn(x);
      this.showWarning(``);
      return v;
    } catch (ex) {
      this.showWarning(ex);
      return 0;
    }
  }
  async plot(animatedDraw) {
    if (!this.hasUpdated)
      return;
    this.plotAnimationRunning = true;
    let p = this.plotter;
    if (p === void 0) {
      const plotParentEl = this.shadowRoot.querySelector(`#plot`);
      if (plotParentEl === null)
        throw new Error(`#plot not found`);
      const opts = {
        capacity: 0,
        autoSizeCanvas: false,
        digitsPrecision: 1,
        defaultSeriesVariable: `accent`,
        y: {
          ...PlotOld_exports.defaultAxis(`y`),
          scaleRange: [-0.3, 1.3],
          labelRange: [0, 1],
          colour: Colour_exports.getCssVariable(`fg`, `gray`)
        },
        x: {
          ...PlotOld_exports.defaultAxis(`x`),
          showLine: true,
          scaleRange: [0, 1 / this.xResolution]
        },
        plotSize: { width: 100, height: 100 }
      };
      this.plotter = p = PlotOld_exports.plot(plotParentEl, opts);
    } else {
      p.clear();
    }
    const range = numbers_exports.numericPercent(this.xResolution);
    if (animatedDraw) {
      for await (const v of flow_exports.interval(range, 100)) {
        p.add(this.getValue(v));
      }
    } else {
      for (let v of range) {
        p.add(this.getValue(v));
      }
    }
    this.plotAnimationRunning = false;
  }
  updated(_changedProperties) {
    super.updated(_changedProperties);
    this.plot(this.animatedDraw);
    if (!this.collapsed)
      this.demoMove();
  }
  demoOpacity() {
    if (this.collapsed)
      return;
    const range = numbers_exports.numericPercent(0.01);
    this.demoInit((bounds, ctx) => {
      const rangeNext = range.next();
      let v = 1;
      if (!rangeNext.done)
        v = this.getValue(rangeNext.value);
      v = Math.floor(v * 100);
      ctx.fillStyle = `hsla(200,80%,50%,${v}%)`;
      ctx.fillRect(0, 0, bounds.width, bounds.height);
      return !rangeNext.done;
    });
  }
  demoHue() {
    if (this.collapsed)
      return;
    const totalLoops = 100;
    const range = numbers_exports.numericPercent(1 / totalLoops);
    let x = 0;
    this.demoInit((bounds, ctx, loops) => {
      const xPerLoop = Math.floor(bounds.width / totalLoops);
      const rangeNext = range.next();
      let v = 1;
      if (!rangeNext.done)
        v = this.getValue(rangeNext.value);
      ctx.fillStyle = Colour_exports.interpolate(v, `blue`, `red`, `hsl`);
      ctx.fillRect(x, 0, xPerLoop, bounds.height);
      x += xPerLoop;
      return !rangeNext.done;
    }, false);
  }
  demoSize() {
    if (this.collapsed)
      return;
    const range = numbers_exports.numericPercent(0.01);
    const fillStyle = Colour_exports.getCssVariable(`yellow`, `yellow`);
    this.demoInit((bounds, ctx) => {
      const maxSize = bounds.height - 40;
      const b = {
        x: 0,
        y: 0,
        width: bounds.width,
        height: bounds.height
      };
      const rangeNext = range.next();
      let v = 1;
      if (!rangeNext.done) {
        v = this.getValue(rangeNext.value);
      }
      v = Math.floor(v * maxSize);
      ctx.font = `${v}px serif`;
      ctx.fillStyle = fillStyle;
      Drawing_exports.textBlockAligned(ctx, [`RELAX`], { bounds: b, horiz: `center`, vert: `center` });
      return !rangeNext.done;
    });
  }
  demoMove() {
    if (this.collapsed)
      return;
    const fillStyle = Colour_exports.getCssVariable(`yellow`, `yellow`);
    const range = numbers_exports.numericPercent(0.01);
    const size = 10;
    this.demoInit((bounds, ctx) => {
      ctx.fillStyle = fillStyle;
      ctx.beginPath();
      const xMax = bounds.width - 4 * size;
      const rangeNext = range.next();
      const y = bounds.height / 2 - size / 2;
      let v = 1;
      if (!rangeNext.done) {
        v = this.getValue(rangeNext.value);
      }
      const x = size + size + v * xMax;
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
      return !rangeNext.done;
    });
  }
  demoInit(cb, clear = true) {
    if (this.collapsed)
      return;
    const el = this.shadowRoot.querySelector(`#demoCanvas`);
    if (el === null) {
      console.error(`#demoCanvas not found :(`);
      return;
    }
    const parent = el.parentElement;
    const parentBounds = parent.getBoundingClientRect();
    const margin = 0;
    const bounds = { width: parentBounds.width - margin - margin, height: parentBounds.height - margin - margin };
    el.height = parent.clientHeight;
    el.width = parent.clientWidth;
    let loops = 0;
    const draw = () => {
      const ctx = el.getContext(`2d`);
      ctx.save();
      ctx.translate(margin, margin);
      if (clear)
        ctx.clearRect(0, 0, bounds.width, bounds.height);
      const result = cb(bounds, ctx, loops++);
      ctx.restore();
      if (result)
        window.requestAnimationFrame(draw);
    };
    window.requestAnimationFrame(draw);
  }
  connectedCallback() {
    super.connectedCallback();
    document.addEventListener(`visibilitychange`, (evt) => {
      if (document.visibilityState === `visible`) {
        this.plot(false);
      }
    });
  }
  plotAnimationRunning = false;
  playPlot() {
    if (this.plotAnimationRunning)
      return;
    this.plot(true);
  }
  fnEdit(evt) {
    const el = evt.target;
    this.setFunctionByString(el.value);
    this.plot(false);
  }
  renderEditable() {
    if (!this.editable)
      return html``;
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
      `;
    }
  }
}
__decorateClass([
  property()
], FuncPlotElement.prototype, "classes", 2);
__decorateClass([
  property({ type: String })
], FuncPlotElement.prototype, "fn", 2);
__decorateClass([
  property({ type: Boolean })
], FuncPlotElement.prototype, "animatedDraw", 2);
__decorateClass([
  property({ type: Boolean })
], FuncPlotElement.prototype, "editable", 2);
__decorateClass([
  property({ attribute: true, type: Boolean })
], FuncPlotElement.prototype, "collapsed", 2);
__decorateClass([
  property({ type: Number })
], FuncPlotElement.prototype, "xResolution", 2);
if (!customElements.get(tagName))
  customElements.define(tagName, FuncPlotElement);

var $$module3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  tagName: tagName,
  FuncPlotElement: FuncPlotElement
}, Symbol.toStringTag, { value: 'Module' }));

export { $$module3 as $ };
