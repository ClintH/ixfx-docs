import { c as createMetadata, a as createAstro, b as createComponent, r as render, d as renderComponent } from './chunks/index.7bfc2e7e.mjs';
import { $ as $$module1, a as $$MainLayout } from './chunks/MainLayout.fae6d6b7.mjs';
import { $ as $$module3$1 } from './chunks/AnglesElement.cd6ac833.mjs';
import { LitElement, css, html } from 'lit';
import { property } from 'lit/decorators.js';
import { a as Palette_exports, b as DomRx_exports, m as makeHelper, S as SvgElements_exports, p as point_exports, l as line_exports, h as Polar_exports, e as radianToDegree, i as arc_exports } from './chunks/chunk-IYXXLC7L.d562e3d6.mjs';
import { e as elStyles } from './chunks/styles.9b8f8965.mjs';
import 'shorthash';
import 'serialize-javascript';
import 'preact/hooks';
import 'preact/jsx-runtime';

var __defProp$1 = Object.defineProperty;
var __getOwnPropDesc$1 = Object.getOwnPropertyDescriptor;
var __decorateClass$1 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$1(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$1(target, key, result);
  return result;
};
const tagName$1 = `cartesian-element`;
class CartesianElement extends LitElement {
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
  origin;
  palette;
  constructor() {
    super();
    this.palette = Palette_exports.create();
    this.palette.setElementBase(this);
    this.width = 500;
    this.height = 300;
    this.origin = { x: 10, y: 10 };
    DomRx_exports.themeChange().on((records) => {
      this.updated();
    });
  }
  getBounds() {
    const svg = makeHelper(this.shadowRoot.querySelector(`svg`));
    return { width: svg.width, height: svg.height };
  }
  renderSvg() {
    const origin = this.origin;
    const poleColour = this.palette.get(`fgDim`, `black`);
    const svg = makeHelper(this.shadowRoot.querySelector(`svg`));
    svg.clear();
    const w = svg.width;
    const h = svg.height - 40;
    SvgElements_exports.grid(svg.parent, origin, 25, w, h, { strokeWidth: 2 });
    svg.circle({ radius: 5, ...origin }, { fillStyle: poleColour, strokeStyle: `none` });
    svg.text("Origin", point_exports.sum(origin, 5, 20), { fillStyle: poleColour, strokeStyle: `none` });
    const triangleMarker = {
      id: `triangle`,
      fillStyle: poleColour,
      strokeWidth: 2
    };
    const labelOffset = 20;
    const poleAxisLineX = line_exports.fromNumbers(origin.x, origin.y, origin.x + w - labelOffset, origin.y);
    svg.line(poleAxisLineX, {
      fillStyle: `none`,
      markerEnd: triangleMarker,
      strokeWidth: 3,
      strokeStyle: poleColour
    });
    svg.text(`X`, { x: origin.x + w - 45, y: origin.y + labelOffset }, { strokeStyle: `none`, fillStyle: poleColour });
    const poleAxisLineY = line_exports.fromNumbers(origin.x, origin.y, origin.x, h);
    svg.line(poleAxisLineY, {
      fillStyle: `none`,
      markerEnd: triangleMarker,
      strokeWidth: 3,
      strokeStyle: poleColour
    });
    svg.text(`Y`, { x: origin.x + 10, y: origin.y + h - labelOffset - 10 }, { strokeStyle: `none`, fillStyle: poleColour });
  }
  async updated() {
    this.renderSvg();
  }
  _pointerMove(ev) {
    const targetColour = this.palette.get(`accent-bold`, `yellow`);
    this.palette.get(`fg-dim`, `yellow`);
    const origin = this.origin;
    const svg = makeHelper(this.shadowRoot.querySelector(`svg`));
    svg.width;
    svg.height;
    const ptr = {
      x: ev.offsetX,
      y: ev.offsetY
    };
    if (ptr.x < origin.x)
      ptr.x = origin.x;
    if (ptr.y < origin.y)
      ptr.y = origin.y;
    const lineToCursor = line_exports.fromPoints(origin, ptr);
    svg.line(lineToCursor, {
      strokeDash: `5`,
      strokeStyle: targetColour
    }, `#pointerRay`);
    line_exports.length(lineToCursor);
    svg.circle({ radius: 5, ...ptr }, {
      fillStyle: targetColour,
      strokeStyle: `none`
    }, `#targetCircle`);
    const labelStyle = {
      strokeStyle: `transparent`,
      fillStyle: targetColour,
      anchor: `middle`
    };
    svg.text(`(${Math.round(ptr.x - origin.x)}, ${Math.round(ptr.y - origin.y)})`, { x: ptr.x, y: ptr.y + 40 }, labelStyle, `#coordLabel`);
  }
  render() {
    return html`
      <div id="container">
      <svg @pointermove="${this._pointerMove}" style="font-size: 1em" viewBox="0 0 ${this.width} ${this.height}" width=${this.width} height=${this.height}> </svg>
        </div>
          `;
  }
}
__decorateClass$1([
  property()
], CartesianElement.prototype, "width", 2);
__decorateClass$1([
  property()
], CartesianElement.prototype, "height", 2);
customElements.define(tagName$1, CartesianElement);

var $$module3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  tagName: tagName$1,
  CartesianElement: CartesianElement
}, Symbol.toStringTag, { value: 'Module' }));

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
const tagName = `polar-coords-element`;
class PolarCoordsElement extends LitElement {
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
    this.width = 500;
    this.height = 300;
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
    const svg = makeHelper(this.shadowRoot.querySelector(`svg`));
    return { width: svg.width, height: svg.height };
  }
  renderSvg() {
    const poleColour = this.palette.get(`fgDim`, `black`);
    const svg = makeHelper(this.shadowRoot.querySelector(`svg`), { fillStyle: `transparent` });
    svg.clear();
    const w = svg.width;
    const h = svg.height;
    const minWh = Math.min(w / 2, h / 2);
    const center = { x: w / 2, y: h / 2 };
    SvgElements_exports.grid(svg.parent, center, 25, w, h);
    const axisYOffset = 25;
    svg.circle({ radius: 3, ...center }, { fillStyle: poleColour, strokeStyle: `none` });
    svg.text("Origin", point_exports.sum(center, 2, axisYOffset), { fillStyle: poleColour, strokeStyle: `none` });
    const triangleMarker = {
      id: `triangle`,
      fillStyle: poleColour
    };
    const poleAxisLine = line_exports.fromNumbers(center.x, center.y, center.x + minWh - 10, center.y);
    svg.line(poleAxisLine, { fillStyle: `none`, markerEnd: triangleMarker, strokeWidth: 3, strokeStyle: poleColour });
    svg.text(`A`, { x: center.x + minWh - 35, y: center.y + 20 }, { strokeStyle: `none`, fillStyle: poleColour });
  }
  async updated() {
    this.renderSvg();
  }
  _pointerMove(ev) {
    ev.preventDefault();
    const targetColour = this.palette.get(`accent-bold`, `yellow`);
    const angleColour = this.palette.get(`fg-dim`, `yellow`);
    const svg = makeHelper(this.shadowRoot.querySelector(`svg`));
    const w = svg.width;
    const h = svg.height;
    const center = { x: w / 2, y: h / 2 };
    const ptr = {
      x: ev.offsetX,
      y: ev.offsetY
    };
    const lineToCursor = line_exports.fromPoints(center, ptr);
    svg.line(lineToCursor, {
      strokeDash: `5`,
      strokeStyle: targetColour,
      strokeWidth: 3
    }, `#pointerRay`);
    const lineToCursorDistance = line_exports.length(lineToCursor);
    svg.circle({ radius: 5, ...ptr }, {
      fillStyle: targetColour,
      strokeStyle: `none`
    }, `#targetCircle`);
    const polar = Polar_exports.fromCartesian(ptr, center);
    const polarAngleDeg = radianToDegree(polar.angleRadian);
    const rad = polar.angleRadian;
    let arc = {
      endRadian: rad,
      startRadian: 0,
      radius: Math.min(100, lineToCursorDistance),
      ...center
    };
    let arcSvgOpts = {
      sweep: true,
      largeArc: rad < 0 ? false : true
    };
    if (Math.round(polarAngleDeg) !== 0)
      svg.path(arc_exports.toSvg(arc, arcSvgOpts), {
        strokeWidth: 3,
        strokeStyle: angleColour
      }, `#arc`);
    const labelStyle = {
      strokeStyle: `transparent`,
      fillStyle: targetColour,
      anchor: `middle`
    };
    svg.text(`(${Math.round(lineToCursorDistance)}, ${Math.floor(polarAngleDeg)}\xB0)`, { x: ptr.x, y: ptr.y + 40 }, labelStyle, `#coordLabel`);
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
], PolarCoordsElement.prototype, "radian", 2);
__decorateClass([
  property()
], PolarCoordsElement.prototype, "degree", 2);
__decorateClass([
  property()
], PolarCoordsElement.prototype, "width", 2);
__decorateClass([
  property()
], PolarCoordsElement.prototype, "height", 2);
customElements.define(tagName, PolarCoordsElement);

var $$module4 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  tagName: tagName,
  PolarCoordsElement: PolarCoordsElement
}, Symbol.toStringTag, { value: 'Module' }));

const metadata = { "headers": [{ "depth": 2, "slug": "angles", "text": "Angles" }, { "depth": 3, "slug": "radians--degrees", "text": "Radians & Degrees" }, { "depth": 2, "slug": "coordinates", "text": "Coordinates" }, { "depth": 3, "slug": "cartesian", "text": "Cartesian" }, { "depth": 3, "slug": "polar", "text": "Polar" }], "source": '\n<script type="module" hoist>\nimport \'/src/components/ReplPad\';\n<\/script>\n<style>\nradians-editor {\n  --label-color: var(--theme-text-light);\n  --axis-color: var(--theme-bg-hover);\n}\n</style>\n\n<div class="tip">\n<ul>\n<li>Demos <a href="https://clinth.github.io/ixfx-demos/geometry/">Geometry</a> (<a href="https://github.com/ClintH/ixfx-demos/tree/main/geometry">source</a>)</li>\n<li>API Reference <a href="https://clinth.github.io/ixfx/modules/Geometry.html">Geometry module</a></li>\n</div>\n\n\n## Angles\n\n### Radians & Degrees\n\nIn math and computer science, [radian](https://en.wikipedia.org/wiki/Radian) is the usual unit for angles. \n\nCheatsheet:\n\n| Arc            | %    | Degrees | Radian |\n| -------------- | ---- | ------- | ------ |\n| Quarter        | 25%  | 90      | \u03C0/2    |\n| Half           | 50%  | 180     | \u03C0      |\n| Three quarters | 75%  | 270     | 3\u03C0/2   |\n| One rotation   | 100% | 360     | 2\u03C0     |\n\n<angles-element client:visible width="500" height="300"  />\n\nConversion functions:\n\n```js\nconst degreeToRadian = (angleInDegrees) => (angleInDegrees - 90) * (Math.PI / 180.0);\nconst radianToDegree = (angleInRadians) => angleInRadians * 180 / Math.PI;\n```\n\nBoth of these functions are in the [Geometry](https://clinth.github.io/ixfx/modules/Geometry.html) module.\n\nExample usage:\n```js\n// repl-pad\nimport {degreeToRadian, radianToDegree} from \'https://unpkg.com/ixfx/dist/geometry.js\'\nlet r = degreeToRadian(180);        // Pi\nlet d = radianToDegree(Math.PI*2);  // 360\n```\n\n## Coordinates\n\n<a name="cartesian"></a>\n\n### Cartesian\n\nThe most common coordinate system for screen-based interaction is the _Cartesian_ system. It consists of `x` (horizontal) and `y` (vertical) expressed as a [point `(x, y)`](../point/). Mostly the _origin_ or `(0,0)` is the top-left corner of a rectangle. \n\nThis means that `x` increases from left-to-right, and `y` increases from top-to-bottom. In the grid below, coordinates are shown next to the cursor:\n\n<cartesian-element client:visible width="200" height="200"  />\n\nA useful technique is to _translate_ the coordinate space, shifting the origin. For example, if you translate by `(100,50)`, drawing a point at `(0,0)` actually draws it at `(100,50)`. \n\nUsually one would shift the point of origin to be relative to the object you are drawing/working with. For example, the middle, or the top-left. This can make it easier to define and work with coordinates, because it\'s all relative to the object.\n\nIn canvas:\n\n```js\nctx.save(); // Save existing translation, if any\nctx.translate(100,100);\n// Do drawing, with 100,100 as 0,0\nctx.restore(); // Undo translation\n```\n\nRead more:\n* [Point](../point/)\n* [API Docs: Points module](https://clinth.github.io/ixfx/modules/Geometry.Points.html)\n\n<a name="polar"></a>\n\n### Polar\n\n[Polar coordinates](https://en.wikipedia.org/wiki/Polar_coordinate_system) are particularly suited for positioning on a circle, arc or spiral. Given a point of reference, the _origin_, coordinate are defined by their _distance_ from the origin, as well as _angle_ from the _polar axis_. \n\nIn the example below, the _origin_ is marked with _O_, appearing in the center of the grid. The _polar axis_ is marked _A_.\n\nAs you move your pointer, the polar coordinates are shown. For understandability, angle is shown here in degrees, but radians are the usual unit.\n\n<polar-coords-element client:visible width="400" height="400"  />\n\nIn code, you can convert a polar coordinate (using radian unit) to _x, y_ with:\n\n```js\nconst polarToCartesian = (distance, angleRadians, originX, originY) => ({\n    x: originX + (distance * Math.cos(angleRadians)),\n    y: originY + (distance * Math.sin(angleRadians)),\n  });\n```\n\nIn ixfx, [`toCartesian`](https://clinth.github.io/ixfx/functions/Geometry.Polar.toCartesian.html) function is provided and can be used as:\n\n```js\nimport { Polar } from \'https://unpkg.com/ixfx/dist/geometry.js\';\n\n// Origin (ie. center) of polar coordinates\nconst origin = { x: 100, y: 100 };\n\n// polarToCartesian(distance:number, angleRadians:number, origin:Point): Point;\nconst point = Polar.toCartesian(100, Math.PI, origin);\n\n// Or if you have a Polar.Coord {distance:number, angleRadian:number}\nconst polar = { distance: 100, angleRadian: Math.PI };\nconst point = Polar.toCartesian(polar, origin);\n```\n\nConvert _from_ Cartesian to polar coordinate with [`fromCartesian`](https://clinth.github.io/ixfx/functions/Geometry.Polar.fromCartesian.html)\n\n```js\n// Polar.fromCartesian(point, origin): Coord;\nconst polar = Polar.fromCartesian({x: 50, y: 50}, origin);\n```\n\nRead more:\n* [API Docs: Polar modular](https://clinth.github.io/ixfx/modules/Geometry.Polar.html)\n\nDemos:\n* [Polar spiral](https://clinth.github.io/ixfx-demos/geometry/polar-spiral/): Uses the [spiral function](https://clinth.github.io/ixfx/modules/Geometry.Polar.html) to generate a spiral, modulated by two ping-pongs.\n* [Polar orbit](https://clinth.github.io/ixfx-demos/geometry/polar-orbit/): Moves an element on a circular orbit using polar coordinates.', "html": `<script type="module" hoist>
import '/src/components/ReplPad';
<\/script>
<style>
radians-editor {
  --label-color: var(--theme-text-light);
  --axis-color: var(--theme-bg-hover);
}
</style>
<div class="tip">
<ul>
<li>Demos <a href="https://clinth.github.io/ixfx-demos/geometry/">Geometry</a> (<a href="https://github.com/ClintH/ixfx-demos/tree/main/geometry">source</a>)</li>
<li>API Reference <a href="https://clinth.github.io/ixfx/modules/Geometry.html">Geometry module</a></li>
</div>
<h2 id="angles">Angles</h2>
<h3 id="radians--degrees">Radians &#x26; Degrees</h3>
<p>In math and computer science, <a href="https://en.wikipedia.org/wiki/Radian">radian</a> is the usual unit for angles.</p>
<p>Cheatsheet:</p>
<table>
<thead>
<tr>
<th>Arc</th>
<th>%</th>
<th>Degrees</th>
<th>Radian</th>
</tr>
</thead>
<tbody>
<tr>
<td>Quarter</td>
<td>25%</td>
<td>90</td>
<td>\u03C0/2</td>
</tr>
<tr>
<td>Half</td>
<td>50%</td>
<td>180</td>
<td>\u03C0</td>
</tr>
<tr>
<td>Three quarters</td>
<td>75%</td>
<td>270</td>
<td>3\u03C0/2</td>
</tr>
<tr>
<td>One rotation</td>
<td>100%</td>
<td>360</td>
<td>2\u03C0</td>
</tr>
</tbody>
</table>
<angles-element client:visible width="500" height="300"  />
<p>Conversion functions:</p>
<pre class="language-js"><code is:raw class="language-js"><span class="token keyword">const</span> <span class="token function-variable function">degreeToRadian</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">angleInDegrees</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span>angleInDegrees <span class="token operator">-</span> <span class="token number">90</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token constant">PI</span> <span class="token operator">/</span> <span class="token number">180.0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> <span class="token function-variable function">radianToDegree</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">angleInRadians</span><span class="token punctuation">)</span> <span class="token operator">=></span> angleInRadians <span class="token operator">*</span> <span class="token number">180</span> <span class="token operator">/</span> Math<span class="token punctuation">.</span><span class="token constant">PI</span><span class="token punctuation">;</span></code></pre>
<p>Both of these functions are in the <a href="https://clinth.github.io/ixfx/modules/Geometry.html">Geometry</a> module.</p>
<p>Example usage:</p>
<pre class="language-js"><code is:raw class="language-js"><span class="token comment">// repl-pad</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span>degreeToRadian<span class="token punctuation">,</span> radianToDegree<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'https://unpkg.com/ixfx/dist/geometry.js'</span>
<span class="token keyword">let</span> r <span class="token operator">=</span> <span class="token function">degreeToRadian</span><span class="token punctuation">(</span><span class="token number">180</span><span class="token punctuation">)</span><span class="token punctuation">;</span>        <span class="token comment">// Pi</span>
<span class="token keyword">let</span> d <span class="token operator">=</span> <span class="token function">radianToDegree</span><span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token constant">PI</span><span class="token operator">*</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// 360</span></code></pre>
<h2 id="coordinates">Coordinates</h2>
<a name="cartesian">
</a>
<h3 id="cartesian">Cartesian</h3>
<p>The most common coordinate system for screen-based interaction is the <em>Cartesian</em> system. It consists of <code is:raw>x</code> (horizontal) and <code is:raw>y</code> (vertical) expressed as a <a href="../point/">point <code is:raw>(x, y)</code></a>. Mostly the <em>origin</em> or <code is:raw>(0,0)</code> is the top-left corner of a rectangle.</p>
<p>This means that <code is:raw>x</code> increases from left-to-right, and <code is:raw>y</code> increases from top-to-bottom. In the grid below, coordinates are shown next to the cursor:</p>
<cartesian-element client:visible width="200" height="200"  />
<p>A useful technique is to <em>translate</em> the coordinate space, shifting the origin. For example, if you translate by <code is:raw>(100,50)</code>, drawing a point at <code is:raw>(0,0)</code> actually draws it at <code is:raw>(100,50)</code>.</p>
<p>Usually one would shift the point of origin to be relative to the object you are drawing/working with. For example, the middle, or the top-left. This can make it easier to define and work with coordinates, because it's all relative to the object.</p>
<p>In canvas:</p>
<pre class="language-js"><code is:raw class="language-js">ctx<span class="token punctuation">.</span><span class="token function">save</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Save existing translation, if any</span>
ctx<span class="token punctuation">.</span><span class="token function">translate</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">,</span><span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// Do drawing, with 100,100 as 0,0</span>
ctx<span class="token punctuation">.</span><span class="token function">restore</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Undo translation</span></code></pre>
<p>Read more:</p>
<ul>
<li><a href="../point/">Point</a></li>
<li><a href="https://clinth.github.io/ixfx/modules/Geometry.Points.html">API Docs: Points module</a></li>
</ul>
<a name="polar">
</a>
<h3 id="polar">Polar</h3>
<p><a href="https://en.wikipedia.org/wiki/Polar_coordinate_system">Polar coordinates</a> are particularly suited for positioning on a circle, arc or spiral. Given a point of reference, the <em>origin</em>, coordinate are defined by their <em>distance</em> from the origin, as well as <em>angle</em> from the <em>polar axis</em>.</p>
<p>In the example below, the <em>origin</em> is marked with <em>O</em>, appearing in the center of the grid. The <em>polar axis</em> is marked <em>A</em>.</p>
<p>As you move your pointer, the polar coordinates are shown. For understandability, angle is shown here in degrees, but radians are the usual unit.</p>
<polar-coords-element client:visible width="400" height="400"  />
<p>In code, you can convert a polar coordinate (using radian unit) to <em>x, y</em> with:</p>
<pre class="language-js"><code is:raw class="language-js"><span class="token keyword">const</span> <span class="token function-variable function">polarToCartesian</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">distance<span class="token punctuation">,</span> angleRadians<span class="token punctuation">,</span> originX<span class="token punctuation">,</span> originY</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">x</span><span class="token operator">:</span> originX <span class="token operator">+</span> <span class="token punctuation">(</span>distance <span class="token operator">*</span> Math<span class="token punctuation">.</span><span class="token function">cos</span><span class="token punctuation">(</span>angleRadians<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token literal-property property">y</span><span class="token operator">:</span> originY <span class="token operator">+</span> <span class="token punctuation">(</span>distance <span class="token operator">*</span> Math<span class="token punctuation">.</span><span class="token function">sin</span><span class="token punctuation">(</span>angleRadians<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>
<p>In ixfx, <a href="https://clinth.github.io/ixfx/functions/Geometry.Polar.toCartesian.html"><code is:raw>toCartesian</code></a> function is provided and can be used as:</p>
<pre class="language-js"><code is:raw class="language-js"><span class="token keyword">import</span> <span class="token punctuation">{</span> Polar <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'https://unpkg.com/ixfx/dist/geometry.js'</span><span class="token punctuation">;</span>

<span class="token comment">// Origin (ie. center) of polar coordinates</span>
<span class="token keyword">const</span> origin <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">x</span><span class="token operator">:</span> <span class="token number">100</span><span class="token punctuation">,</span> <span class="token literal-property property">y</span><span class="token operator">:</span> <span class="token number">100</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// polarToCartesian(distance:number, angleRadians:number, origin:Point): Point;</span>
<span class="token keyword">const</span> point <span class="token operator">=</span> Polar<span class="token punctuation">.</span><span class="token function">toCartesian</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">,</span> Math<span class="token punctuation">.</span><span class="token constant">PI</span><span class="token punctuation">,</span> origin<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// Or if you have a Polar.Coord {distance:number, angleRadian:number}</span>
<span class="token keyword">const</span> polar <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">distance</span><span class="token operator">:</span> <span class="token number">100</span><span class="token punctuation">,</span> <span class="token literal-property property">angleRadian</span><span class="token operator">:</span> Math<span class="token punctuation">.</span><span class="token constant">PI</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> point <span class="token operator">=</span> Polar<span class="token punctuation">.</span><span class="token function">toCartesian</span><span class="token punctuation">(</span>polar<span class="token punctuation">,</span> origin<span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>
<p>Convert <em>from</em> Cartesian to polar coordinate with <a href="https://clinth.github.io/ixfx/functions/Geometry.Polar.fromCartesian.html"><code is:raw>fromCartesian</code></a></p>
<pre class="language-js"><code is:raw class="language-js"><span class="token comment">// Polar.fromCartesian(point, origin): Coord;</span>
<span class="token keyword">const</span> polar <span class="token operator">=</span> Polar<span class="token punctuation">.</span><span class="token function">fromCartesian</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">x</span><span class="token operator">:</span> <span class="token number">50</span><span class="token punctuation">,</span> <span class="token literal-property property">y</span><span class="token operator">:</span> <span class="token number">50</span><span class="token punctuation">}</span><span class="token punctuation">,</span> origin<span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>
<p>Read more:</p>
<ul>
<li><a href="https://clinth.github.io/ixfx/modules/Geometry.Polar.html">API Docs: Polar modular</a></li>
</ul>
<p>Demos:</p>
<ul>
<li><a href="https://clinth.github.io/ixfx-demos/geometry/polar-spiral/">Polar spiral</a>: Uses the <a href="https://clinth.github.io/ixfx/modules/Geometry.Polar.html">spiral function</a> to generate a spiral, modulated by two ping-pongs.</li>
<li><a href="https://clinth.github.io/ixfx-demos/geometry/polar-orbit/">Polar orbit</a>: Moves an element on a circular orbit using polar coordinates.</li>
</ul>` };
const frontmatter = { "title": "Units and Coordinates", "astro": { "headers": [{ "depth": 2, "slug": "angles", "text": "Angles" }, { "depth": 3, "slug": "radians--degrees", "text": "Radians & Degrees" }, { "depth": 2, "slug": "coordinates", "text": "Coordinates" }, { "depth": 3, "slug": "cartesian", "text": "Cartesian" }, { "depth": 3, "slug": "polar", "text": "Polar" }], "source": '\n<script type="module" hoist>\nimport \'/src/components/ReplPad\';\n<\/script>\n<style>\nradians-editor {\n  --label-color: var(--theme-text-light);\n  --axis-color: var(--theme-bg-hover);\n}\n</style>\n\n<div class="tip">\n<ul>\n<li>Demos <a href="https://clinth.github.io/ixfx-demos/geometry/">Geometry</a> (<a href="https://github.com/ClintH/ixfx-demos/tree/main/geometry">source</a>)</li>\n<li>API Reference <a href="https://clinth.github.io/ixfx/modules/Geometry.html">Geometry module</a></li>\n</div>\n\n\n## Angles\n\n### Radians & Degrees\n\nIn math and computer science, [radian](https://en.wikipedia.org/wiki/Radian) is the usual unit for angles. \n\nCheatsheet:\n\n| Arc            | %    | Degrees | Radian |\n| -------------- | ---- | ------- | ------ |\n| Quarter        | 25%  | 90      | \u03C0/2    |\n| Half           | 50%  | 180     | \u03C0      |\n| Three quarters | 75%  | 270     | 3\u03C0/2   |\n| One rotation   | 100% | 360     | 2\u03C0     |\n\n<angles-element client:visible width="500" height="300"  />\n\nConversion functions:\n\n```js\nconst degreeToRadian = (angleInDegrees) => (angleInDegrees - 90) * (Math.PI / 180.0);\nconst radianToDegree = (angleInRadians) => angleInRadians * 180 / Math.PI;\n```\n\nBoth of these functions are in the [Geometry](https://clinth.github.io/ixfx/modules/Geometry.html) module.\n\nExample usage:\n```js\n// repl-pad\nimport {degreeToRadian, radianToDegree} from \'https://unpkg.com/ixfx/dist/geometry.js\'\nlet r = degreeToRadian(180);        // Pi\nlet d = radianToDegree(Math.PI*2);  // 360\n```\n\n## Coordinates\n\n<a name="cartesian"></a>\n\n### Cartesian\n\nThe most common coordinate system for screen-based interaction is the _Cartesian_ system. It consists of `x` (horizontal) and `y` (vertical) expressed as a [point `(x, y)`](../point/). Mostly the _origin_ or `(0,0)` is the top-left corner of a rectangle. \n\nThis means that `x` increases from left-to-right, and `y` increases from top-to-bottom. In the grid below, coordinates are shown next to the cursor:\n\n<cartesian-element client:visible width="200" height="200"  />\n\nA useful technique is to _translate_ the coordinate space, shifting the origin. For example, if you translate by `(100,50)`, drawing a point at `(0,0)` actually draws it at `(100,50)`. \n\nUsually one would shift the point of origin to be relative to the object you are drawing/working with. For example, the middle, or the top-left. This can make it easier to define and work with coordinates, because it\'s all relative to the object.\n\nIn canvas:\n\n```js\nctx.save(); // Save existing translation, if any\nctx.translate(100,100);\n// Do drawing, with 100,100 as 0,0\nctx.restore(); // Undo translation\n```\n\nRead more:\n* [Point](../point/)\n* [API Docs: Points module](https://clinth.github.io/ixfx/modules/Geometry.Points.html)\n\n<a name="polar"></a>\n\n### Polar\n\n[Polar coordinates](https://en.wikipedia.org/wiki/Polar_coordinate_system) are particularly suited for positioning on a circle, arc or spiral. Given a point of reference, the _origin_, coordinate are defined by their _distance_ from the origin, as well as _angle_ from the _polar axis_. \n\nIn the example below, the _origin_ is marked with _O_, appearing in the center of the grid. The _polar axis_ is marked _A_.\n\nAs you move your pointer, the polar coordinates are shown. For understandability, angle is shown here in degrees, but radians are the usual unit.\n\n<polar-coords-element client:visible width="400" height="400"  />\n\nIn code, you can convert a polar coordinate (using radian unit) to _x, y_ with:\n\n```js\nconst polarToCartesian = (distance, angleRadians, originX, originY) => ({\n    x: originX + (distance * Math.cos(angleRadians)),\n    y: originY + (distance * Math.sin(angleRadians)),\n  });\n```\n\nIn ixfx, [`toCartesian`](https://clinth.github.io/ixfx/functions/Geometry.Polar.toCartesian.html) function is provided and can be used as:\n\n```js\nimport { Polar } from \'https://unpkg.com/ixfx/dist/geometry.js\';\n\n// Origin (ie. center) of polar coordinates\nconst origin = { x: 100, y: 100 };\n\n// polarToCartesian(distance:number, angleRadians:number, origin:Point): Point;\nconst point = Polar.toCartesian(100, Math.PI, origin);\n\n// Or if you have a Polar.Coord {distance:number, angleRadian:number}\nconst polar = { distance: 100, angleRadian: Math.PI };\nconst point = Polar.toCartesian(polar, origin);\n```\n\nConvert _from_ Cartesian to polar coordinate with [`fromCartesian`](https://clinth.github.io/ixfx/functions/Geometry.Polar.fromCartesian.html)\n\n```js\n// Polar.fromCartesian(point, origin): Coord;\nconst polar = Polar.fromCartesian({x: 50, y: 50}, origin);\n```\n\nRead more:\n* [API Docs: Polar modular](https://clinth.github.io/ixfx/modules/Geometry.Polar.html)\n\nDemos:\n* [Polar spiral](https://clinth.github.io/ixfx-demos/geometry/polar-spiral/): Uses the [spiral function](https://clinth.github.io/ixfx/modules/Geometry.Polar.html) to generate a spiral, modulated by two ping-pongs.\n* [Polar orbit](https://clinth.github.io/ixfx-demos/geometry/polar-orbit/): Moves an element on a circular orbit using polar coordinates.', "html": `<script type="module" hoist>
import '/src/components/ReplPad';
<\/script>
<style>
radians-editor {
  --label-color: var(--theme-text-light);
  --axis-color: var(--theme-bg-hover);
}
</style>
<div class="tip">
<ul>
<li>Demos <a href="https://clinth.github.io/ixfx-demos/geometry/">Geometry</a> (<a href="https://github.com/ClintH/ixfx-demos/tree/main/geometry">source</a>)</li>
<li>API Reference <a href="https://clinth.github.io/ixfx/modules/Geometry.html">Geometry module</a></li>
</div>
<h2 id="angles">Angles</h2>
<h3 id="radians--degrees">Radians &#x26; Degrees</h3>
<p>In math and computer science, <a href="https://en.wikipedia.org/wiki/Radian">radian</a> is the usual unit for angles.</p>
<p>Cheatsheet:</p>
<table>
<thead>
<tr>
<th>Arc</th>
<th>%</th>
<th>Degrees</th>
<th>Radian</th>
</tr>
</thead>
<tbody>
<tr>
<td>Quarter</td>
<td>25%</td>
<td>90</td>
<td>\u03C0/2</td>
</tr>
<tr>
<td>Half</td>
<td>50%</td>
<td>180</td>
<td>\u03C0</td>
</tr>
<tr>
<td>Three quarters</td>
<td>75%</td>
<td>270</td>
<td>3\u03C0/2</td>
</tr>
<tr>
<td>One rotation</td>
<td>100%</td>
<td>360</td>
<td>2\u03C0</td>
</tr>
</tbody>
</table>
<angles-element client:visible width="500" height="300"  />
<p>Conversion functions:</p>
<pre class="language-js"><code is:raw class="language-js"><span class="token keyword">const</span> <span class="token function-variable function">degreeToRadian</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">angleInDegrees</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span>angleInDegrees <span class="token operator">-</span> <span class="token number">90</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token constant">PI</span> <span class="token operator">/</span> <span class="token number">180.0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> <span class="token function-variable function">radianToDegree</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">angleInRadians</span><span class="token punctuation">)</span> <span class="token operator">=></span> angleInRadians <span class="token operator">*</span> <span class="token number">180</span> <span class="token operator">/</span> Math<span class="token punctuation">.</span><span class="token constant">PI</span><span class="token punctuation">;</span></code></pre>
<p>Both of these functions are in the <a href="https://clinth.github.io/ixfx/modules/Geometry.html">Geometry</a> module.</p>
<p>Example usage:</p>
<pre class="language-js"><code is:raw class="language-js"><span class="token comment">// repl-pad</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span>degreeToRadian<span class="token punctuation">,</span> radianToDegree<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'https://unpkg.com/ixfx/dist/geometry.js'</span>
<span class="token keyword">let</span> r <span class="token operator">=</span> <span class="token function">degreeToRadian</span><span class="token punctuation">(</span><span class="token number">180</span><span class="token punctuation">)</span><span class="token punctuation">;</span>        <span class="token comment">// Pi</span>
<span class="token keyword">let</span> d <span class="token operator">=</span> <span class="token function">radianToDegree</span><span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token constant">PI</span><span class="token operator">*</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// 360</span></code></pre>
<h2 id="coordinates">Coordinates</h2>
<a name="cartesian">
</a>
<h3 id="cartesian">Cartesian</h3>
<p>The most common coordinate system for screen-based interaction is the <em>Cartesian</em> system. It consists of <code is:raw>x</code> (horizontal) and <code is:raw>y</code> (vertical) expressed as a <a href="../point/">point <code is:raw>(x, y)</code></a>. Mostly the <em>origin</em> or <code is:raw>(0,0)</code> is the top-left corner of a rectangle.</p>
<p>This means that <code is:raw>x</code> increases from left-to-right, and <code is:raw>y</code> increases from top-to-bottom. In the grid below, coordinates are shown next to the cursor:</p>
<cartesian-element client:visible width="200" height="200"  />
<p>A useful technique is to <em>translate</em> the coordinate space, shifting the origin. For example, if you translate by <code is:raw>(100,50)</code>, drawing a point at <code is:raw>(0,0)</code> actually draws it at <code is:raw>(100,50)</code>.</p>
<p>Usually one would shift the point of origin to be relative to the object you are drawing/working with. For example, the middle, or the top-left. This can make it easier to define and work with coordinates, because it's all relative to the object.</p>
<p>In canvas:</p>
<pre class="language-js"><code is:raw class="language-js">ctx<span class="token punctuation">.</span><span class="token function">save</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Save existing translation, if any</span>
ctx<span class="token punctuation">.</span><span class="token function">translate</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">,</span><span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// Do drawing, with 100,100 as 0,0</span>
ctx<span class="token punctuation">.</span><span class="token function">restore</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Undo translation</span></code></pre>
<p>Read more:</p>
<ul>
<li><a href="../point/">Point</a></li>
<li><a href="https://clinth.github.io/ixfx/modules/Geometry.Points.html">API Docs: Points module</a></li>
</ul>
<a name="polar">
</a>
<h3 id="polar">Polar</h3>
<p><a href="https://en.wikipedia.org/wiki/Polar_coordinate_system">Polar coordinates</a> are particularly suited for positioning on a circle, arc or spiral. Given a point of reference, the <em>origin</em>, coordinate are defined by their <em>distance</em> from the origin, as well as <em>angle</em> from the <em>polar axis</em>.</p>
<p>In the example below, the <em>origin</em> is marked with <em>O</em>, appearing in the center of the grid. The <em>polar axis</em> is marked <em>A</em>.</p>
<p>As you move your pointer, the polar coordinates are shown. For understandability, angle is shown here in degrees, but radians are the usual unit.</p>
<polar-coords-element client:visible width="400" height="400"  />
<p>In code, you can convert a polar coordinate (using radian unit) to <em>x, y</em> with:</p>
<pre class="language-js"><code is:raw class="language-js"><span class="token keyword">const</span> <span class="token function-variable function">polarToCartesian</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">distance<span class="token punctuation">,</span> angleRadians<span class="token punctuation">,</span> originX<span class="token punctuation">,</span> originY</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">x</span><span class="token operator">:</span> originX <span class="token operator">+</span> <span class="token punctuation">(</span>distance <span class="token operator">*</span> Math<span class="token punctuation">.</span><span class="token function">cos</span><span class="token punctuation">(</span>angleRadians<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token literal-property property">y</span><span class="token operator">:</span> originY <span class="token operator">+</span> <span class="token punctuation">(</span>distance <span class="token operator">*</span> Math<span class="token punctuation">.</span><span class="token function">sin</span><span class="token punctuation">(</span>angleRadians<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>
<p>In ixfx, <a href="https://clinth.github.io/ixfx/functions/Geometry.Polar.toCartesian.html"><code is:raw>toCartesian</code></a> function is provided and can be used as:</p>
<pre class="language-js"><code is:raw class="language-js"><span class="token keyword">import</span> <span class="token punctuation">{</span> Polar <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'https://unpkg.com/ixfx/dist/geometry.js'</span><span class="token punctuation">;</span>

<span class="token comment">// Origin (ie. center) of polar coordinates</span>
<span class="token keyword">const</span> origin <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">x</span><span class="token operator">:</span> <span class="token number">100</span><span class="token punctuation">,</span> <span class="token literal-property property">y</span><span class="token operator">:</span> <span class="token number">100</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// polarToCartesian(distance:number, angleRadians:number, origin:Point): Point;</span>
<span class="token keyword">const</span> point <span class="token operator">=</span> Polar<span class="token punctuation">.</span><span class="token function">toCartesian</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">,</span> Math<span class="token punctuation">.</span><span class="token constant">PI</span><span class="token punctuation">,</span> origin<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// Or if you have a Polar.Coord {distance:number, angleRadian:number}</span>
<span class="token keyword">const</span> polar <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">distance</span><span class="token operator">:</span> <span class="token number">100</span><span class="token punctuation">,</span> <span class="token literal-property property">angleRadian</span><span class="token operator">:</span> Math<span class="token punctuation">.</span><span class="token constant">PI</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> point <span class="token operator">=</span> Polar<span class="token punctuation">.</span><span class="token function">toCartesian</span><span class="token punctuation">(</span>polar<span class="token punctuation">,</span> origin<span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>
<p>Convert <em>from</em> Cartesian to polar coordinate with <a href="https://clinth.github.io/ixfx/functions/Geometry.Polar.fromCartesian.html"><code is:raw>fromCartesian</code></a></p>
<pre class="language-js"><code is:raw class="language-js"><span class="token comment">// Polar.fromCartesian(point, origin): Coord;</span>
<span class="token keyword">const</span> polar <span class="token operator">=</span> Polar<span class="token punctuation">.</span><span class="token function">fromCartesian</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">x</span><span class="token operator">:</span> <span class="token number">50</span><span class="token punctuation">,</span> <span class="token literal-property property">y</span><span class="token operator">:</span> <span class="token number">50</span><span class="token punctuation">}</span><span class="token punctuation">,</span> origin<span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>
<p>Read more:</p>
<ul>
<li><a href="https://clinth.github.io/ixfx/modules/Geometry.Polar.html">API Docs: Polar modular</a></li>
</ul>
<p>Demos:</p>
<ul>
<li><a href="https://clinth.github.io/ixfx-demos/geometry/polar-spiral/">Polar spiral</a>: Uses the <a href="https://clinth.github.io/ixfx/modules/Geometry.Polar.html">spiral function</a> to generate a spiral, modulated by two ping-pongs.</li>
<li><a href="https://clinth.github.io/ixfx-demos/geometry/polar-orbit/">Polar orbit</a>: Moves an element on a circular orbit using polar coordinates.</li>
</ul>` } };
const $$metadata = createMetadata("/src/pages/types/geometry/units.md", { modules: [{ module: $$module1, specifier: "../../../layouts/MainLayout.astro", assert: {} }, { module: $$module3$1, specifier: "/src/components/geometry/AnglesElement", assert: {} }, { module: $$module3, specifier: "/src/components/geometry/CartesianElement", assert: {} }, { module: $$module4, specifier: "/src/components/geometry/PolarCoordsElement", assert: {} }], hydratedComponents: ["polar-coords-element", "cartesian-element", "angles-element"], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set(["visible"]), hoisted: [{ type: "inline", value: `
import '/src/components/ReplPad';
` }] });
const $$Astro = createAstro("/src/pages/types/geometry/units.md", "https://clinth.github.io/ixfx-docs/", "file:///Users/af4766/repos/ixfx-docs/");
const $$Units = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Units;
  const $$content = { "title": "Units and Coordinates", "astro": { "headers": [{ "depth": 2, "slug": "angles", "text": "Angles" }, { "depth": 3, "slug": "radians--degrees", "text": "Radians & Degrees" }, { "depth": 2, "slug": "coordinates", "text": "Coordinates" }, { "depth": 3, "slug": "cartesian", "text": "Cartesian" }, { "depth": 3, "slug": "polar", "text": "Polar" }], "source": '\n<script type="module" hoist>\nimport \'/src/components/ReplPad\';\n<\/script>\n<style>\nradians-editor {\n  --label-color: var(--theme-text-light);\n  --axis-color: var(--theme-bg-hover);\n}\n</style>\n\n<div class="tip">\n<ul>\n<li>Demos <a href="https://clinth.github.io/ixfx-demos/geometry/">Geometry</a> (<a href="https://github.com/ClintH/ixfx-demos/tree/main/geometry">source</a>)</li>\n<li>API Reference <a href="https://clinth.github.io/ixfx/modules/Geometry.html">Geometry module</a></li>\n</div>\n\n\n## Angles\n\n### Radians & Degrees\n\nIn math and computer science, [radian](https://en.wikipedia.org/wiki/Radian) is the usual unit for angles. \n\nCheatsheet:\n\n| Arc            | %    | Degrees | Radian |\n| -------------- | ---- | ------- | ------ |\n| Quarter        | 25%  | 90      | \u03C0/2    |\n| Half           | 50%  | 180     | \u03C0      |\n| Three quarters | 75%  | 270     | 3\u03C0/2   |\n| One rotation   | 100% | 360     | 2\u03C0     |\n\n<angles-element client:visible width="500" height="300"  />\n\nConversion functions:\n\n```js\nconst degreeToRadian = (angleInDegrees) => (angleInDegrees - 90) * (Math.PI / 180.0);\nconst radianToDegree = (angleInRadians) => angleInRadians * 180 / Math.PI;\n```\n\nBoth of these functions are in the [Geometry](https://clinth.github.io/ixfx/modules/Geometry.html) module.\n\nExample usage:\n```js\n// repl-pad\nimport {degreeToRadian, radianToDegree} from \'https://unpkg.com/ixfx/dist/geometry.js\'\nlet r = degreeToRadian(180);        // Pi\nlet d = radianToDegree(Math.PI*2);  // 360\n```\n\n## Coordinates\n\n<a name="cartesian"></a>\n\n### Cartesian\n\nThe most common coordinate system for screen-based interaction is the _Cartesian_ system. It consists of `x` (horizontal) and `y` (vertical) expressed as a [point `(x, y)`](../point/). Mostly the _origin_ or `(0,0)` is the top-left corner of a rectangle. \n\nThis means that `x` increases from left-to-right, and `y` increases from top-to-bottom. In the grid below, coordinates are shown next to the cursor:\n\n<cartesian-element client:visible width="200" height="200"  />\n\nA useful technique is to _translate_ the coordinate space, shifting the origin. For example, if you translate by `(100,50)`, drawing a point at `(0,0)` actually draws it at `(100,50)`. \n\nUsually one would shift the point of origin to be relative to the object you are drawing/working with. For example, the middle, or the top-left. This can make it easier to define and work with coordinates, because it\'s all relative to the object.\n\nIn canvas:\n\n```js\nctx.save(); // Save existing translation, if any\nctx.translate(100,100);\n// Do drawing, with 100,100 as 0,0\nctx.restore(); // Undo translation\n```\n\nRead more:\n* [Point](../point/)\n* [API Docs: Points module](https://clinth.github.io/ixfx/modules/Geometry.Points.html)\n\n<a name="polar"></a>\n\n### Polar\n\n[Polar coordinates](https://en.wikipedia.org/wiki/Polar_coordinate_system) are particularly suited for positioning on a circle, arc or spiral. Given a point of reference, the _origin_, coordinate are defined by their _distance_ from the origin, as well as _angle_ from the _polar axis_. \n\nIn the example below, the _origin_ is marked with _O_, appearing in the center of the grid. The _polar axis_ is marked _A_.\n\nAs you move your pointer, the polar coordinates are shown. For understandability, angle is shown here in degrees, but radians are the usual unit.\n\n<polar-coords-element client:visible width="400" height="400"  />\n\nIn code, you can convert a polar coordinate (using radian unit) to _x, y_ with:\n\n```js\nconst polarToCartesian = (distance, angleRadians, originX, originY) => ({\n    x: originX + (distance * Math.cos(angleRadians)),\n    y: originY + (distance * Math.sin(angleRadians)),\n  });\n```\n\nIn ixfx, [`toCartesian`](https://clinth.github.io/ixfx/functions/Geometry.Polar.toCartesian.html) function is provided and can be used as:\n\n```js\nimport { Polar } from \'https://unpkg.com/ixfx/dist/geometry.js\';\n\n// Origin (ie. center) of polar coordinates\nconst origin = { x: 100, y: 100 };\n\n// polarToCartesian(distance:number, angleRadians:number, origin:Point): Point;\nconst point = Polar.toCartesian(100, Math.PI, origin);\n\n// Or if you have a Polar.Coord {distance:number, angleRadian:number}\nconst polar = { distance: 100, angleRadian: Math.PI };\nconst point = Polar.toCartesian(polar, origin);\n```\n\nConvert _from_ Cartesian to polar coordinate with [`fromCartesian`](https://clinth.github.io/ixfx/functions/Geometry.Polar.fromCartesian.html)\n\n```js\n// Polar.fromCartesian(point, origin): Coord;\nconst polar = Polar.fromCartesian({x: 50, y: 50}, origin);\n```\n\nRead more:\n* [API Docs: Polar modular](https://clinth.github.io/ixfx/modules/Geometry.Polar.html)\n\nDemos:\n* [Polar spiral](https://clinth.github.io/ixfx-demos/geometry/polar-spiral/): Uses the [spiral function](https://clinth.github.io/ixfx/modules/Geometry.Polar.html) to generate a spiral, modulated by two ping-pongs.\n* [Polar orbit](https://clinth.github.io/ixfx-demos/geometry/polar-orbit/): Moves an element on a circular orbit using polar coordinates.', "html": `<script type="module" hoist>
import '/src/components/ReplPad';
<\/script>
<style>
radians-editor {
  --label-color: var(--theme-text-light);
  --axis-color: var(--theme-bg-hover);
}
</style>
<div class="tip">
<ul>
<li>Demos <a href="https://clinth.github.io/ixfx-demos/geometry/">Geometry</a> (<a href="https://github.com/ClintH/ixfx-demos/tree/main/geometry">source</a>)</li>
<li>API Reference <a href="https://clinth.github.io/ixfx/modules/Geometry.html">Geometry module</a></li>
</div>
<h2 id="angles">Angles</h2>
<h3 id="radians--degrees">Radians &#x26; Degrees</h3>
<p>In math and computer science, <a href="https://en.wikipedia.org/wiki/Radian">radian</a> is the usual unit for angles.</p>
<p>Cheatsheet:</p>
<table>
<thead>
<tr>
<th>Arc</th>
<th>%</th>
<th>Degrees</th>
<th>Radian</th>
</tr>
</thead>
<tbody>
<tr>
<td>Quarter</td>
<td>25%</td>
<td>90</td>
<td>\u03C0/2</td>
</tr>
<tr>
<td>Half</td>
<td>50%</td>
<td>180</td>
<td>\u03C0</td>
</tr>
<tr>
<td>Three quarters</td>
<td>75%</td>
<td>270</td>
<td>3\u03C0/2</td>
</tr>
<tr>
<td>One rotation</td>
<td>100%</td>
<td>360</td>
<td>2\u03C0</td>
</tr>
</tbody>
</table>
<angles-element client:visible width="500" height="300"  />
<p>Conversion functions:</p>
<pre class="language-js"><code is:raw class="language-js"><span class="token keyword">const</span> <span class="token function-variable function">degreeToRadian</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">angleInDegrees</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span>angleInDegrees <span class="token operator">-</span> <span class="token number">90</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token constant">PI</span> <span class="token operator">/</span> <span class="token number">180.0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> <span class="token function-variable function">radianToDegree</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">angleInRadians</span><span class="token punctuation">)</span> <span class="token operator">=></span> angleInRadians <span class="token operator">*</span> <span class="token number">180</span> <span class="token operator">/</span> Math<span class="token punctuation">.</span><span class="token constant">PI</span><span class="token punctuation">;</span></code></pre>
<p>Both of these functions are in the <a href="https://clinth.github.io/ixfx/modules/Geometry.html">Geometry</a> module.</p>
<p>Example usage:</p>
<pre class="language-js"><code is:raw class="language-js"><span class="token comment">// repl-pad</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span>degreeToRadian<span class="token punctuation">,</span> radianToDegree<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'https://unpkg.com/ixfx/dist/geometry.js'</span>
<span class="token keyword">let</span> r <span class="token operator">=</span> <span class="token function">degreeToRadian</span><span class="token punctuation">(</span><span class="token number">180</span><span class="token punctuation">)</span><span class="token punctuation">;</span>        <span class="token comment">// Pi</span>
<span class="token keyword">let</span> d <span class="token operator">=</span> <span class="token function">radianToDegree</span><span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token constant">PI</span><span class="token operator">*</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// 360</span></code></pre>
<h2 id="coordinates">Coordinates</h2>
<a name="cartesian">
</a>
<h3 id="cartesian">Cartesian</h3>
<p>The most common coordinate system for screen-based interaction is the <em>Cartesian</em> system. It consists of <code is:raw>x</code> (horizontal) and <code is:raw>y</code> (vertical) expressed as a <a href="../point/">point <code is:raw>(x, y)</code></a>. Mostly the <em>origin</em> or <code is:raw>(0,0)</code> is the top-left corner of a rectangle.</p>
<p>This means that <code is:raw>x</code> increases from left-to-right, and <code is:raw>y</code> increases from top-to-bottom. In the grid below, coordinates are shown next to the cursor:</p>
<cartesian-element client:visible width="200" height="200"  />
<p>A useful technique is to <em>translate</em> the coordinate space, shifting the origin. For example, if you translate by <code is:raw>(100,50)</code>, drawing a point at <code is:raw>(0,0)</code> actually draws it at <code is:raw>(100,50)</code>.</p>
<p>Usually one would shift the point of origin to be relative to the object you are drawing/working with. For example, the middle, or the top-left. This can make it easier to define and work with coordinates, because it's all relative to the object.</p>
<p>In canvas:</p>
<pre class="language-js"><code is:raw class="language-js">ctx<span class="token punctuation">.</span><span class="token function">save</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Save existing translation, if any</span>
ctx<span class="token punctuation">.</span><span class="token function">translate</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">,</span><span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// Do drawing, with 100,100 as 0,0</span>
ctx<span class="token punctuation">.</span><span class="token function">restore</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Undo translation</span></code></pre>
<p>Read more:</p>
<ul>
<li><a href="../point/">Point</a></li>
<li><a href="https://clinth.github.io/ixfx/modules/Geometry.Points.html">API Docs: Points module</a></li>
</ul>
<a name="polar">
</a>
<h3 id="polar">Polar</h3>
<p><a href="https://en.wikipedia.org/wiki/Polar_coordinate_system">Polar coordinates</a> are particularly suited for positioning on a circle, arc or spiral. Given a point of reference, the <em>origin</em>, coordinate are defined by their <em>distance</em> from the origin, as well as <em>angle</em> from the <em>polar axis</em>.</p>
<p>In the example below, the <em>origin</em> is marked with <em>O</em>, appearing in the center of the grid. The <em>polar axis</em> is marked <em>A</em>.</p>
<p>As you move your pointer, the polar coordinates are shown. For understandability, angle is shown here in degrees, but radians are the usual unit.</p>
<polar-coords-element client:visible width="400" height="400"  />
<p>In code, you can convert a polar coordinate (using radian unit) to <em>x, y</em> with:</p>
<pre class="language-js"><code is:raw class="language-js"><span class="token keyword">const</span> <span class="token function-variable function">polarToCartesian</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">distance<span class="token punctuation">,</span> angleRadians<span class="token punctuation">,</span> originX<span class="token punctuation">,</span> originY</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">x</span><span class="token operator">:</span> originX <span class="token operator">+</span> <span class="token punctuation">(</span>distance <span class="token operator">*</span> Math<span class="token punctuation">.</span><span class="token function">cos</span><span class="token punctuation">(</span>angleRadians<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token literal-property property">y</span><span class="token operator">:</span> originY <span class="token operator">+</span> <span class="token punctuation">(</span>distance <span class="token operator">*</span> Math<span class="token punctuation">.</span><span class="token function">sin</span><span class="token punctuation">(</span>angleRadians<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>
<p>In ixfx, <a href="https://clinth.github.io/ixfx/functions/Geometry.Polar.toCartesian.html"><code is:raw>toCartesian</code></a> function is provided and can be used as:</p>
<pre class="language-js"><code is:raw class="language-js"><span class="token keyword">import</span> <span class="token punctuation">{</span> Polar <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'https://unpkg.com/ixfx/dist/geometry.js'</span><span class="token punctuation">;</span>

<span class="token comment">// Origin (ie. center) of polar coordinates</span>
<span class="token keyword">const</span> origin <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">x</span><span class="token operator">:</span> <span class="token number">100</span><span class="token punctuation">,</span> <span class="token literal-property property">y</span><span class="token operator">:</span> <span class="token number">100</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// polarToCartesian(distance:number, angleRadians:number, origin:Point): Point;</span>
<span class="token keyword">const</span> point <span class="token operator">=</span> Polar<span class="token punctuation">.</span><span class="token function">toCartesian</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">,</span> Math<span class="token punctuation">.</span><span class="token constant">PI</span><span class="token punctuation">,</span> origin<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// Or if you have a Polar.Coord {distance:number, angleRadian:number}</span>
<span class="token keyword">const</span> polar <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">distance</span><span class="token operator">:</span> <span class="token number">100</span><span class="token punctuation">,</span> <span class="token literal-property property">angleRadian</span><span class="token operator">:</span> Math<span class="token punctuation">.</span><span class="token constant">PI</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> point <span class="token operator">=</span> Polar<span class="token punctuation">.</span><span class="token function">toCartesian</span><span class="token punctuation">(</span>polar<span class="token punctuation">,</span> origin<span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>
<p>Convert <em>from</em> Cartesian to polar coordinate with <a href="https://clinth.github.io/ixfx/functions/Geometry.Polar.fromCartesian.html"><code is:raw>fromCartesian</code></a></p>
<pre class="language-js"><code is:raw class="language-js"><span class="token comment">// Polar.fromCartesian(point, origin): Coord;</span>
<span class="token keyword">const</span> polar <span class="token operator">=</span> Polar<span class="token punctuation">.</span><span class="token function">fromCartesian</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">x</span><span class="token operator">:</span> <span class="token number">50</span><span class="token punctuation">,</span> <span class="token literal-property property">y</span><span class="token operator">:</span> <span class="token number">50</span><span class="token punctuation">}</span><span class="token punctuation">,</span> origin<span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>
<p>Read more:</p>
<ul>
<li><a href="https://clinth.github.io/ixfx/modules/Geometry.Polar.html">API Docs: Polar modular</a></li>
</ul>
<p>Demos:</p>
<ul>
<li><a href="https://clinth.github.io/ixfx-demos/geometry/polar-spiral/">Polar spiral</a>: Uses the <a href="https://clinth.github.io/ixfx/modules/Geometry.Polar.html">spiral function</a> to generate a spiral, modulated by two ping-pongs.</li>
<li><a href="https://clinth.github.io/ixfx-demos/geometry/polar-orbit/">Polar orbit</a>: Moves an element on a circular orbit using polar coordinates.</li>
</ul>` } };
  const STYLES = [
    { props: { "data-astro-id": "YOODPPMV" }, children: `radians-editor.astro-YOODPPMV{--label-color: var(--theme-text-light);--axis-color: var(--theme-bg-hover);}` }
  ];
  for (const STYLE of STYLES)
    $$result.styles.add(STYLE);
  const SCRIPTS = [
    { props: { "type": "module", "hoist": true }, children: `import '/src/components/ReplPad';` }
  ];
  for (const SCRIPT of SCRIPTS)
    $$result.scripts.add(SCRIPT);
  return render`${renderComponent($$result, "Layout", $$MainLayout, { "content": $$content, "class": "astro-YOODPPMV" }, { "default": () => render`<div class="tip astro-YOODPPMV">
<ul class="astro-YOODPPMV">
<li class="astro-YOODPPMV">Demos <a href="https://clinth.github.io/ixfx-demos/geometry/" class="astro-YOODPPMV">Geometry</a> (<a href="https://github.com/ClintH/ixfx-demos/tree/main/geometry" class="astro-YOODPPMV">source</a>)</li>
<li class="astro-YOODPPMV">API Reference <a href="https://clinth.github.io/ixfx/modules/Geometry.html" class="astro-YOODPPMV">Geometry module</a></li>
</ul></div><h2 id="angles" class="astro-YOODPPMV">Angles</h2><h3 id="radians--degrees" class="astro-YOODPPMV">Radians &#x26; Degrees</h3><p class="astro-YOODPPMV">In math and computer science, <a href="https://en.wikipedia.org/wiki/Radian" class="astro-YOODPPMV">radian</a> is the usual unit for angles.</p><p class="astro-YOODPPMV">Cheatsheet:</p><table class="astro-YOODPPMV">
<thead class="astro-YOODPPMV">
<tr class="astro-YOODPPMV">
<th class="astro-YOODPPMV">Arc</th>
<th class="astro-YOODPPMV">%</th>
<th class="astro-YOODPPMV">Degrees</th>
<th class="astro-YOODPPMV">Radian</th>
</tr>
</thead>
<tbody class="astro-YOODPPMV">
<tr class="astro-YOODPPMV">
<td class="astro-YOODPPMV">Quarter</td>
<td class="astro-YOODPPMV">25%</td>
<td class="astro-YOODPPMV">90</td>
<td class="astro-YOODPPMV">π/2</td>
</tr>
<tr class="astro-YOODPPMV">
<td class="astro-YOODPPMV">Half</td>
<td class="astro-YOODPPMV">50%</td>
<td class="astro-YOODPPMV">180</td>
<td class="astro-YOODPPMV">π</td>
</tr>
<tr class="astro-YOODPPMV">
<td class="astro-YOODPPMV">Three quarters</td>
<td class="astro-YOODPPMV">75%</td>
<td class="astro-YOODPPMV">270</td>
<td class="astro-YOODPPMV">3π/2</td>
</tr>
<tr class="astro-YOODPPMV">
<td class="astro-YOODPPMV">One rotation</td>
<td class="astro-YOODPPMV">100%</td>
<td class="astro-YOODPPMV">360</td>
<td class="astro-YOODPPMV">2π</td>
</tr>
</tbody>
</table>${renderComponent($$result, "angles-element", "angles-element", { "client:visible": true, "width": "500", "height": "300", "client:component-hydration": "visible", "client:component-path": $$metadata.getPath("angles-element"), "client:component-export": $$metadata.getExport("angles-element"), "class": "astro-YOODPPMV" })}<p class="astro-YOODPPMV">Conversion functions:</p><pre class="language-js astro-YOODPPMV"><code class="language-js astro-YOODPPMV"><span class="token keyword">const</span> <span class="token function-variable function">degreeToRadian</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">angleInDegrees</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span>angleInDegrees <span class="token operator">-</span> <span class="token number">90</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token constant">PI</span> <span class="token operator">/</span> <span class="token number">180.0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> <span class="token function-variable function">radianToDegree</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">angleInRadians</span><span class="token punctuation">)</span> <span class="token operator">=></span> angleInRadians <span class="token operator">*</span> <span class="token number">180</span> <span class="token operator">/</span> Math<span class="token punctuation">.</span><span class="token constant">PI</span><span class="token punctuation">;</span></code></pre><p class="astro-YOODPPMV">Both of these functions are in the <a href="https://clinth.github.io/ixfx/modules/Geometry.html" class="astro-YOODPPMV">Geometry</a> module.</p><p class="astro-YOODPPMV">Example usage:</p><pre class="language-js astro-YOODPPMV"><code class="language-js astro-YOODPPMV"><span class="token comment">// repl-pad</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span>degreeToRadian<span class="token punctuation">,</span> radianToDegree<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'https://unpkg.com/ixfx/dist/geometry.js'</span>
<span class="token keyword">let</span> r <span class="token operator">=</span> <span class="token function">degreeToRadian</span><span class="token punctuation">(</span><span class="token number">180</span><span class="token punctuation">)</span><span class="token punctuation">;</span>        <span class="token comment">// Pi</span>
<span class="token keyword">let</span> d <span class="token operator">=</span> <span class="token function">radianToDegree</span><span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token constant">PI</span><span class="token operator">*</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// 360</span></code></pre><h2 id="coordinates" class="astro-YOODPPMV">Coordinates</h2><a name="cartesian" class="astro-YOODPPMV">
</a><h3 id="cartesian" class="astro-YOODPPMV">Cartesian</h3><p class="astro-YOODPPMV">The most common coordinate system for screen-based interaction is the <em class="astro-YOODPPMV">Cartesian</em> system. It consists of <code class="astro-YOODPPMV">x</code> (horizontal) and <code class="astro-YOODPPMV">y</code> (vertical) expressed as a <a href="../point/" class="astro-YOODPPMV">point <code class="astro-YOODPPMV">(x, y)</code></a>. Mostly the <em class="astro-YOODPPMV">origin</em> or <code class="astro-YOODPPMV">(0,0)</code> is the top-left corner of a rectangle.</p><p class="astro-YOODPPMV">This means that <code class="astro-YOODPPMV">x</code> increases from left-to-right, and <code class="astro-YOODPPMV">y</code> increases from top-to-bottom. In the grid below, coordinates are shown next to the cursor:</p>${renderComponent($$result, "cartesian-element", "cartesian-element", { "client:visible": true, "width": "200", "height": "200", "client:component-hydration": "visible", "client:component-path": $$metadata.getPath("cartesian-element"), "client:component-export": $$metadata.getExport("cartesian-element"), "class": "astro-YOODPPMV" })}<p class="astro-YOODPPMV">A useful technique is to <em class="astro-YOODPPMV">translate</em> the coordinate space, shifting the origin. For example, if you translate by <code class="astro-YOODPPMV">(100,50)</code>, drawing a point at <code class="astro-YOODPPMV">(0,0)</code> actually draws it at <code class="astro-YOODPPMV">(100,50)</code>.</p><p class="astro-YOODPPMV">Usually one would shift the point of origin to be relative to the object you are drawing/working with. For example, the middle, or the top-left. This can make it easier to define and work with coordinates, because it's all relative to the object.</p><p class="astro-YOODPPMV">In canvas:</p><pre class="language-js astro-YOODPPMV"><code class="language-js astro-YOODPPMV">ctx<span class="token punctuation">.</span><span class="token function">save</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Save existing translation, if any</span>
ctx<span class="token punctuation">.</span><span class="token function">translate</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">,</span><span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// Do drawing, with 100,100 as 0,0</span>
ctx<span class="token punctuation">.</span><span class="token function">restore</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Undo translation</span></code></pre><p class="astro-YOODPPMV">Read more:</p><ul class="astro-YOODPPMV">
<li class="astro-YOODPPMV"><a href="../point/" class="astro-YOODPPMV">Point</a></li>
<li class="astro-YOODPPMV"><a href="https://clinth.github.io/ixfx/modules/Geometry.Points.html" class="astro-YOODPPMV">API Docs: Points module</a></li>
</ul><a name="polar" class="astro-YOODPPMV">
</a><h3 id="polar" class="astro-YOODPPMV">Polar</h3><p class="astro-YOODPPMV"><a href="https://en.wikipedia.org/wiki/Polar_coordinate_system" class="astro-YOODPPMV">Polar coordinates</a> are particularly suited for positioning on a circle, arc or spiral. Given a point of reference, the <em class="astro-YOODPPMV">origin</em>, coordinate are defined by their <em class="astro-YOODPPMV">distance</em> from the origin, as well as <em class="astro-YOODPPMV">angle</em> from the <em class="astro-YOODPPMV">polar axis</em>.</p><p class="astro-YOODPPMV">In the example below, the <em class="astro-YOODPPMV">origin</em> is marked with <em class="astro-YOODPPMV">O</em>, appearing in the center of the grid. The <em class="astro-YOODPPMV">polar axis</em> is marked <em class="astro-YOODPPMV">A</em>.</p><p class="astro-YOODPPMV">As you move your pointer, the polar coordinates are shown. For understandability, angle is shown here in degrees, but radians are the usual unit.</p>${renderComponent($$result, "polar-coords-element", "polar-coords-element", { "client:visible": true, "width": "400", "height": "400", "client:component-hydration": "visible", "client:component-path": $$metadata.getPath("polar-coords-element"), "client:component-export": $$metadata.getExport("polar-coords-element"), "class": "astro-YOODPPMV" })}<p class="astro-YOODPPMV">In code, you can convert a polar coordinate (using radian unit) to <em class="astro-YOODPPMV">x, y</em> with:</p><pre class="language-js astro-YOODPPMV"><code class="language-js astro-YOODPPMV"><span class="token keyword">const</span> <span class="token function-variable function">polarToCartesian</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">distance<span class="token punctuation">,</span> angleRadians<span class="token punctuation">,</span> originX<span class="token punctuation">,</span> originY</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">x</span><span class="token operator">:</span> originX <span class="token operator">+</span> <span class="token punctuation">(</span>distance <span class="token operator">*</span> Math<span class="token punctuation">.</span><span class="token function">cos</span><span class="token punctuation">(</span>angleRadians<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token literal-property property">y</span><span class="token operator">:</span> originY <span class="token operator">+</span> <span class="token punctuation">(</span>distance <span class="token operator">*</span> Math<span class="token punctuation">.</span><span class="token function">sin</span><span class="token punctuation">(</span>angleRadians<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre><p class="astro-YOODPPMV">In ixfx, <a href="https://clinth.github.io/ixfx/functions/Geometry.Polar.toCartesian.html" class="astro-YOODPPMV"><code class="astro-YOODPPMV">toCartesian</code></a> function is provided and can be used as:</p><pre class="language-js astro-YOODPPMV"><code class="language-js astro-YOODPPMV"><span class="token keyword">import</span> <span class="token punctuation">{</span> Polar <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'https://unpkg.com/ixfx/dist/geometry.js'</span><span class="token punctuation">;</span>

<span class="token comment">// Origin (ie. center) of polar coordinates</span>
<span class="token keyword">const</span> origin <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">x</span><span class="token operator">:</span> <span class="token number">100</span><span class="token punctuation">,</span> <span class="token literal-property property">y</span><span class="token operator">:</span> <span class="token number">100</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// polarToCartesian(distance:number, angleRadians:number, origin:Point): Point;</span>
<span class="token keyword">const</span> point <span class="token operator">=</span> Polar<span class="token punctuation">.</span><span class="token function">toCartesian</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">,</span> Math<span class="token punctuation">.</span><span class="token constant">PI</span><span class="token punctuation">,</span> origin<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// Or if you have a Polar.Coord {distance:number, angleRadian:number}</span>
<span class="token keyword">const</span> polar <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">distance</span><span class="token operator">:</span> <span class="token number">100</span><span class="token punctuation">,</span> <span class="token literal-property property">angleRadian</span><span class="token operator">:</span> Math<span class="token punctuation">.</span><span class="token constant">PI</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> point <span class="token operator">=</span> Polar<span class="token punctuation">.</span><span class="token function">toCartesian</span><span class="token punctuation">(</span>polar<span class="token punctuation">,</span> origin<span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre><p class="astro-YOODPPMV">Convert <em class="astro-YOODPPMV">from</em> Cartesian to polar coordinate with <a href="https://clinth.github.io/ixfx/functions/Geometry.Polar.fromCartesian.html" class="astro-YOODPPMV"><code class="astro-YOODPPMV">fromCartesian</code></a></p><pre class="language-js astro-YOODPPMV"><code class="language-js astro-YOODPPMV"><span class="token comment">// Polar.fromCartesian(point, origin): Coord;</span>
<span class="token keyword">const</span> polar <span class="token operator">=</span> Polar<span class="token punctuation">.</span><span class="token function">fromCartesian</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">x</span><span class="token operator">:</span> <span class="token number">50</span><span class="token punctuation">,</span> <span class="token literal-property property">y</span><span class="token operator">:</span> <span class="token number">50</span><span class="token punctuation">}</span><span class="token punctuation">,</span> origin<span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre><p class="astro-YOODPPMV">Read more:</p><ul class="astro-YOODPPMV">
<li class="astro-YOODPPMV"><a href="https://clinth.github.io/ixfx/modules/Geometry.Polar.html" class="astro-YOODPPMV">API Docs: Polar modular</a></li>
</ul><p class="astro-YOODPPMV">Demos:</p><ul class="astro-YOODPPMV">
<li class="astro-YOODPPMV"><a href="https://clinth.github.io/ixfx-demos/geometry/polar-spiral/" class="astro-YOODPPMV">Polar spiral</a>: Uses the <a href="https://clinth.github.io/ixfx/modules/Geometry.Polar.html" class="astro-YOODPPMV">spiral function</a> to generate a spiral, modulated by two ping-pongs.</li>
<li class="astro-YOODPPMV"><a href="https://clinth.github.io/ixfx-demos/geometry/polar-orbit/" class="astro-YOODPPMV">Polar orbit</a>: Moves an element on a circular orbit using polar coordinates.</li>
</ul>` })}`;
});

export { $$metadata, $$Units as default, frontmatter, metadata };
