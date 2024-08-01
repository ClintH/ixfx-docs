import { LitElement, css, html } from 'lit';
import { property } from 'lit/decorators.js';
import { a as Palette_exports, b as DomRx_exports, j as Svg_exports, l as line_exports, k as circle_exports, e as radianToDegree } from './chunk-IYXXLC7L.d562e3d6.mjs';
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
const tagName = `angles-element`;
class AnglesElement extends LitElement {
  static styles = [
    elStyles,
    css`
      :host {
        color: var(--label-color, green);
      }
      #container {
        display: flex;
        align-items: center;
        flex-direction: column;
      }
      #container>svg {
        touch-action: none;
      }
  `
  ];
  palette;
  constructor() {
    super();
    this.palette = Palette_exports.create();
    this.palette.setElementBase(this);
    this.width = 400;
    this.height = 400;
    DomRx_exports.themeChange().on((records) => {
      this.updated();
    });
  }
  setDegrees(degress) {
    this.degree = degress;
    this.radian = void 0;
  }
  setRadians(radians) {
    this.degree = void 0;
    this.radian = radians;
  }
  getBounds() {
    const svg = Svg_exports.makeHelper(this.shadowRoot.querySelector(`svg`));
    return { width: svg.width, height: svg.height };
  }
  lastCircle;
  renderSvg() {
    const svg = Svg_exports.makeHelper(this.shadowRoot.querySelector(`svg`), { fillStyle: `transparent` });
    svg.clear();
    const w = svg.width;
    const h = svg.height;
    let radius = svg.height * 0.3;
    let center = { x: w / 2, y: h / 2 };
    const traceStyle = {
      strokeStyle: this.palette.get(`axis-color`, `orange`),
      strokeWidth: 3
    };
    const labelStyle = {
      strokeStyle: `transparent`,
      fillStyle: this.palette.get(`fgDim`, `orange`),
      anchor: `middle`,
      align: `hanging`
    };
    let c = { radius, ...center };
    this.lastCircle = c;
    svg.circle(c, traceStyle);
    const labelC = { ...c, radius: radius + 20 };
    const addRadian = (rad, label, opts = labelStyle) => {
      if (label === void 0)
        label = rad.toString();
      const pt = circle_exports.point(labelC, rad);
      svg.text(label, { x: pt.x, y: pt.y }, opts);
    };
    addRadian(0, `0`, { ...labelStyle, anchor: `start`, align: `middle` });
    addRadian(Math.PI, `Math.PI`, { ...labelStyle, align: `middle`, anchor: `end` });
    addRadian(Math.PI / 2, `Math.PI/2`, { ...labelStyle, align: `text-bottom` });
    addRadian(3 * Math.PI / 2, `3*Math.PI/2`, { ...labelStyle, align: `hanging` });
  }
  async updated() {
    this.renderSvg();
  }
  _pointerMove(ev) {
    const svg = Svg_exports.makeHelper(this.shadowRoot.querySelector(`svg`));
    const ptr = {
      x: ev.offsetX,
      y: ev.offsetY
    };
    const c = this.lastCircle;
    if (c === void 0)
      return;
    const lineToCursor = line_exports.fromPoints(c, ptr);
    const lineExtended = line_exports.extendFromA(lineToCursor, 200);
    const intersections = circle_exports.intersectionLine(c, lineExtended);
    if (intersections.length !== 1)
      return;
    const inter = intersections[0];
    const ray = line_exports.extendFromA(line_exports.fromPoints(c, inter), 10);
    svg.line(ray, {
      strokeWidth: 3,
      strokeStyle: this.palette.get(`accent-bold`, `yellow`)
    }, `#pointerRay`);
    const lineRad = line_exports.angleRadian(ray) * -1;
    let rad = Math.round(lineRad / Math.PI * 100) / 100;
    if (rad < 0)
      rad = Math.abs(rad + 1) + 1;
    let radStr = ``;
    if (rad == 1)
      radStr = `\u03C0`;
    else if (rad == 0.17)
      radStr = `\u03C0/6`;
    else if (rad == 0.25)
      radStr = `\u03C0/4`;
    else if (rad == 0.33)
      radStr = `\u03C0/3`;
    else if (rad == 0.5)
      radStr = `\u03C0/2`;
    else if (rad == 0.58)
      radStr = `7\u03C0/12`;
    else if (rad == 0.6)
      radStr = `\u03C0/4`;
    else if (rad == 0.75)
      radStr = `3\u03C0/4`;
    else if (rad == 0.92)
      radStr = `11\u03C0/12`;
    else if (rad == 1.17)
      radStr = `7\u03C0/6`;
    else if (rad == 1.25)
      radStr = `5\u03C0/4`;
    else if (rad == 1.33)
      radStr = `4\u03C0/3`;
    else if (rad == 1.5)
      radStr = `3\u03C0/2`;
    else if (rad == 1.58)
      radStr = `19\u03C0/12`;
    else if (rad == 1.75)
      radStr = `7\u03C0/4`;
    else if (rad == 1.92)
      radStr = `23\u03C0/12`;
    else if (rad == 0)
      radStr = `0 or 2\u03C0`;
    else
      radStr = `${rad.toFixed(2)}\u03C0`;
    let deg = radianToDegree(lineRad);
    if (deg < 0)
      deg = Math.abs(deg + 180) + 180;
    const degStr = Math.round(deg);
    const labelStyle = {
      strokeStyle: `transparent`,
      fillStyle: this.palette.get(`fgDim`, `black`),
      anchor: `middle`
    };
    svg.text(`Radians: ${radStr}`, { x: c.x, y: c.y }, labelStyle, `#radiansLabel`);
    svg.text(`Degrees: ${degStr}`, { x: c.x, y: c.y + 20 }, labelStyle, `#degreesLabel`);
  }
  render() {
    return html`
			<div id="container">
        <svg @pointermove="${this._pointerMove}" style="font-size: 1em" viewBox="0 0 ${this.width} ${this.height}" width=${this.width} height=${this.height}></svg>
			</div>
		`;
  }
}
__decorateClass([
  property()
], AnglesElement.prototype, "radian", 2);
__decorateClass([
  property()
], AnglesElement.prototype, "degree", 2);
__decorateClass([
  property()
], AnglesElement.prototype, "width", 2);
__decorateClass([
  property()
], AnglesElement.prototype, "height", 2);
customElements.define(tagName, AnglesElement);

var $$module3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  tagName: tagName,
  AnglesElement: AnglesElement
}, Symbol.toStringTag, { value: 'Module' }));

export { $$module3 as $ };
