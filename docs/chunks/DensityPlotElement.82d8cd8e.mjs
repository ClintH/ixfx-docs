import { LitElement, css, html } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { d as debounce, c as continuously, r as repeat, N as Normalise_exports, C as Colour_exports, E as Ellipse_exports, D as Drawing_exports } from './chunk-IYXXLC7L.d562e3d6.mjs';
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
const tagName = `density-plot-element`;
class DensityPlotElement extends LitElement {
  static styles = [
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
      input {
        font-family: var(--font-mono);
      }
      #parseMsg {
        position: absolute;
        border-radius: 0.2em;
        margin-top: 3em;
        background: var(--bg-mono);
        padding: 0.3em;  
      }
  `
  ];
  func;
  looper;
  circleFillStyle;
  values;
  paintSpeedMs = 20;
  debounceFn = debounce((elapsedMs, ...data) => {
    const el = this.shadowRoot.getElementById(`txtFn`);
    this.setFunctionByString(el.value);
    this.reset();
  }, 1e3);
  constructor() {
    super();
    this.editable = false;
    this.valuesToSample = 1e3;
    this.classes = { withBottom: true };
    if (this.fn === void 0)
      this.fn = `Math.random()`;
    this.looper = continuously((ticks, elapsedMs) => {
      this.draw();
      if (this.values.length === 0)
        return false;
    }, this.paintSpeedMs, (ticks, elapsed) => {
      this.values = this.computeValues(this.valuesToSample);
    });
  }
  showWarning(text2) {
    if (text2.length > 0)
      console.warn(text2);
    if (this.shadowRoot === void 0 || this.shadowRoot === null)
      return;
    const el = this.shadowRoot.getElementById(`parseMsg`);
    if (el === null)
      return;
    el.innerText = text2;
    if (text2.length === 0) {
      el.style.display = `none`;
    } else {
      el.style.display = `block`;
    }
  }
  setFunctionByString(text) {
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
  setFunction(text2, fn) {
    this.func = {
      text: text2,
      fn
    };
  }
  computeValues(count) {
    const r = [...repeat(count, () => {
      try {
        const v = this.func.fn();
        this.showWarning(``);
        return v;
      } catch (ex) {
        this.showWarning(ex);
        return 0;
      }
    })];
    if (this.scaleMax === void 0 || this.scaleMin === void 0)
      return Normalise_exports.array(r);
    else
      return r;
  }
  updated(_changedProperties) {
    super.updated(_changedProperties);
    this.setFunctionByString(this.fn);
    this.looper.start();
  }
  firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);
  }
  draw() {
    if (this.shadowRoot === void 0)
      return;
    if (this.circleFillStyle === void 0) {
      this.circleFillStyle = Colour_exports.opacity(Colour_exports.getCssVariable(`yellow`, `yellow`), 0.05);
    }
    const el = this.shadowRoot.querySelector(`#plot`);
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
    if (el.height !== parent.clientHeight)
      el.height = parent.clientHeight;
    if (el.width !== parent.clientWidth)
      el.width = parent.clientWidth;
    const ctx = el.getContext(`2d`);
    const x = this.values.pop() * bounds.width + margin;
    const e = { x, y: bounds.height / 2, ...Ellipse_exports.fromDegrees(2, 10, 90) };
    Drawing_exports.ellipse(ctx, e, { fillStyle: this.circleFillStyle });
  }
  connectedCallback() {
    super.connectedCallback();
    document.addEventListener(`visibilitychange`, (evt) => {
      if (document.visibilityState === `visible`) {
        this.reset();
      } else if (document.visibilityState === `hidden`) {
        this.looper.cancel();
      }
    });
  }
  clear() {
    const el = this.shadowRoot.querySelector(`#plot`);
    if (el === null)
      return;
    const ctx = el.getContext(`2d`);
    const parent = el.parentElement;
    const parentBounds = parent.getBoundingClientRect();
    ctx.clearRect(0, 0, parentBounds.width, parentBounds.height);
  }
  reset() {
    this.clear();
    this.values = this.computeValues(this.valuesToSample);
    this.looper.start();
  }
  stop() {
    this.looper.cancel();
  }
  render() {
    return html`
    <div id="container" class=${classMap(this.classes)}>
    ${this.editable ? html`
      <div class="toolbar">
        <input @input=${this.debounceFn} id="txtFn" size="50" type="text" value=${this.fn}>
      </div>` : ``}
      <div id="parseMsg"></div>
      <div class="plotContainer">
        <canvas @click="${this.reset}" id="plot"></canvas>
      </div>
     
    </div> 
    `;
  }
}
__decorateClass([
  property()
], DensityPlotElement.prototype, "classes", 2);
__decorateClass([
  property({ attribute: true, type: String })
], DensityPlotElement.prototype, "view", 2);
__decorateClass([
  property({ type: String })
], DensityPlotElement.prototype, "fn", 2);
__decorateClass([
  property({ attribute: true, type: Boolean })
], DensityPlotElement.prototype, "editable", 2);
__decorateClass([
  property({ attribute: true, type: Number })
], DensityPlotElement.prototype, "scaleMin", 2);
__decorateClass([
  property({ attribute: true, type: Number })
], DensityPlotElement.prototype, "scaleMax", 2);
__decorateClass([
  property({ attribute: true, type: Number })
], DensityPlotElement.prototype, "valuesToSample", 2);
if (!customElements.get(tagName))
  customElements.define(tagName, DensityPlotElement);

var $$module2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  tagName: tagName,
  DensityPlotElement: DensityPlotElement
}, Symbol.toStringTag, { value: 'Module' }));

export { $$module2 as $ };
