import { c as createMetadata, a as createAstro, b as createComponent, r as render, d as renderComponent } from './chunks/index.7bfc2e7e.mjs';
import { $ as $$module1, a as $$MainLayout } from './chunks/MainLayout.fae6d6b7.mjs';
import { LitElement, css, html } from 'lit';
import { property } from 'lit/decorators.js';
import { j as Svg_exports, i as arc_exports } from './chunks/chunk-IYXXLC7L.d562e3d6.mjs';
import { $ as $$module3 } from './chunks/AnglesElement.cd6ac833.mjs';
import 'shorthash';
import 'serialize-javascript';
import 'preact/hooks';
import 'preact/jsx-runtime';
import './chunks/styles.9b8f8965.mjs';

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
const tagName = `arc-editor`;
class ArcEditor extends LitElement {
  static styles = css`
  #container {
    display: flex;
    align-items: center;
    flex-direction: column
  }
  #toolbar {
    display: flex;
    padding: 1em;
    display: none;
  }
  #toolbar input {
    width: 3em;
    margin-right: 1em;
    margin-left: 0.3em;
  }
  `;
  constructor() {
    super();
    this.radius = 20;
    this.startRadian = 0;
    this.endRadian = Math.PI;
    this.strokeStyle = `var(--accent-bold, "yellow")`;
  }
  getArc() {
    return {
      startRadian: this.startRadian,
      endRadian: this.endRadian,
      radius: this.radius,
      counterClockwise: this.counterClockwise
    };
  }
  setArc(arc) {
    this.radius = arc.radius;
    this.startRadian = arc.startRadian;
    this.endRadian = arc.endRadian;
    this.counterClockwise = arc.counterClockwise;
  }
  getBounds() {
    const svg = Svg_exports.makeHelper(this.shadowRoot.querySelector(`svg`));
    return { width: svg.width, height: svg.height };
  }
  renderSvg() {
    const svg = Svg_exports.makeHelper(this.shadowRoot.querySelector(`svg`), { fillStyle: `transparent`, strokeStyle: this.strokeStyle, strokeWidth: 3 });
    svg.clear();
    const w = svg.width;
    const h = svg.height;
    const a = this.getArc();
    const origin = { x: w / 2, y: h / 2 };
    svg.path(arc_exports.toSvg(a, origin));
  }
  async updated() {
    this.renderSvg();
  }
  render() {
    return html`
			<div id="container">
        <div id="toolbar">
          <div class="opt">
            <label>Radius:</label>
            <input type="number" id="radius" value=${this.radius}>
          </div>
          <div class="opt">
            <label>Start radian:</label>
            <input type="number" id="startRadian" value=${this.startRadian}>
          </div>
          <div class="opt">
            <label>End radian:</label>
            <input type="number" id="endRadian" value=${this.endRadian}>
          </div>
        </div>
        <svg width=200 height=200></svg>
			</div>
		`;
  }
}
__decorateClass([
  property()
], ArcEditor.prototype, "startRadian", 2);
__decorateClass([
  property()
], ArcEditor.prototype, "strokeStyle", 2);
__decorateClass([
  property()
], ArcEditor.prototype, "endRadian", 2);
__decorateClass([
  property()
], ArcEditor.prototype, "counterClockwise", 2);
__decorateClass([
  property({ type: Number })
], ArcEditor.prototype, "radius", 2);
try {
  customElements.define(tagName, ArcEditor);
} catch (ex) {
  console.log(ex);
}

var $$module2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  tagName: tagName,
  ArcEditor: ArcEditor
}, Symbol.toStringTag, { value: 'Module' }));

const metadata = { "headers": [{ "depth": 2, "slug": "type", "text": "Type" }, { "depth": 2, "slug": "conversions", "text": "Conversions" }, { "depth": 2, "slug": "interpolate--point-by-angle", "text": "Interpolate & point by angle" }, { "depth": 2, "slug": "length--distance", "text": "Length & distance" }, { "depth": 2, "slug": "area", "text": "Area" }, { "depth": 2, "slug": "comparison", "text": "Comparison" }], "source": '\n<script type="module" hoist>\nimport \'/src/components/types/geometry/arc\';\nimport \'/src/components/ReplPad\';\n<\/script>\n<style>\ninput.code {\n  font-family: var(--font-mono);\n  font-size: 0.85em;\n}\n\nradians-editor {\n  --label-color: var(--theme-text-light);\n  --axis-color: var(--theme-bg-hover);\n  --ray-color: var(--theme-hit-color);\n}\n\n</style>\n\n<div class="tip">\n<ul>\n<li>Demos <a href="https://clinth.github.io/ixfx-demos/geometry/">Geometry</a> (<a href="https://github.com/ClintH/ixfx-demos/tree/main/geometry">source</a>)</li>\n<li>API Reference <a href="https://clinth.github.io/ixfx/modules/Geometry.Arcs.html">Geometry.Arcs module</a></li>\n</div>\n\nAn arc describes a segment of a [circle](../circle/). It is defined by its radius as well as the start and end radian.\n\n\n## Type\n\nThe expected type of arcs in ixfx is:\n\n```typescript\ntype Arc = {\n  radius:number\n  startRadian:number\n  endRadian:number\n  counterClockwise?:boolean\n}>\n\n// eg:\nconst arc = {\n  radius: 5,\n  startRadian: 0,\n  endRadian: Math.PI\n}\n```\n\n`ArcPositioned` also includes `x` and `y` fields.\n\nTry editing this example:\n\n<input style="width: 40em" class="code arc" type="text" id="arc1Txt" value="{ radius: 20, startRadian: 0, endRadian: Math.PI }">\n<arc-editor id="arc1" client:visible  />\n\nAngles are set with _radians_, not the more familiar _degrees_. See [Units](../units/) for more info.\n\n<angles-element width="500" height="300" client:visible />\n\n## Conversions\n\nCreate an arc from degrees:\n\n```js\n// repl-pad#1\nimport { Arcs } from "https://unpkg.com/ixfx/dist/geometry.js"\n\n// fromDegrees(radius:number, startDegrees:number, endDegrees:number, origin?:Point)\n// returns Arc {radius, startRadian, endRadian}\nconst arc = Arcs.fromDegrees(10, 0, 90);\nconst arc2 = Arcs.fromDegrees(10, 0, 90, {x: 100, y: 100});\n```\n\nGet a [Line](../line/) connecting the start and end point of the arc:\n\n```js\n// repl-pad#1\n// Returns {a: {x,y}, b:{x,y} }\nconst line = Arcs.toLine(arc);\n```\n\n## Interpolate & point by angle\n\n[`interpolate`](https://clinth.github.io/ixfx/functions/Geometry.Arcs.interpolate.html) returns a point at a relative position along an arc.\n\n```js\n// repl-pad#2\nimport { Arcs, degreeToRadian } from "https://unpkg.com/ixfx/dist/geometry.js";\nconst arc = Arcs.fromDegrees(10, 0, 90, {x: 100, y: 100});\n\nconst p = Arcs.interpolate(0.5, arc);\n```\n\n`point` returns a coordinate on an arc, based on angle.\n\n```js\n// repl-pad#2\nconst pt = Arcs.point(arc, degreeToRadian(90));\n```\n\n## Length & distance\n\nGet the length of arc as a number\n\n```js\n// repl-pad#2\nArcs.length(arc); \n```\n\nDistance between the centers of two arcs, as a number \n\n```js\n// repl-pad#2\nArcs.distanceCenter(\n  Arcs.fromDegrees(20, 0, 40, {x: 20, y: 20}),\n  Arcs.fromDegrees(10, 0, 90, {x: 50, y: 50})\n); \n```\n\n## Area\n\n[`bbox`](https://clinth.github.io/ixfx/functions/Geometry.Arcs.bbox.html) calculates a rectangle that encloses an arc\n\n```js\n// repl-pad#3\nimport { Arcs } from "https://unpkg.com/ixfx/dist/geometry.js";\nconst arc = Arcs.fromDegrees(10, 0, 90, {x: 100, y: 100});\n\nconst p = Arcs.bbox(arc);\n``` \n\n## Comparison\n\n[`isEqual`](https://clinth.github.io/ixfx/functions/Geometry.Arcs.isEquals.html) returns _true_ if two arcs are identical by value.\n\n```js\nconst arcA = { radius: 5, endRadian: 0, startRadian: 1 };\nconst arcA = { radius: 5, endRadian: 0, startRadian: 1 };\narcA === arcB; // false, because object identities are different\nArcs.isEqual(arcA, arcB); // true, because values are identical\n```', "html": `<script type="module" hoist>
import '/src/components/types/geometry/arc';
import '/src/components/ReplPad';
<\/script>
<style>
input.code {
  font-family: var(--font-mono);
  font-size: 0.85em;
}

radians-editor {
  --label-color: var(--theme-text-light);
  --axis-color: var(--theme-bg-hover);
  --ray-color: var(--theme-hit-color);
}

</style>
<div class="tip">
<ul>
<li>Demos <a href="https://clinth.github.io/ixfx-demos/geometry/">Geometry</a> (<a href="https://github.com/ClintH/ixfx-demos/tree/main/geometry">source</a>)</li>
<li>API Reference <a href="https://clinth.github.io/ixfx/modules/Geometry.Arcs.html">Geometry.Arcs module</a></li>
</div>
<p>An arc describes a segment of a <a href="../circle/">circle</a>. It is defined by its radius as well as the start and end radian.</p>
<h2 id="type">Type</h2>
<p>The expected type of arcs in ixfx is:</p>
<pre class="language-typescript"><code is:raw class="language-typescript"><span class="token keyword">type</span> <span class="token class-name">Arc</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
  radius<span class="token operator">:</span><span class="token builtin">number</span>
  startRadian<span class="token operator">:</span><span class="token builtin">number</span>
  endRadian<span class="token operator">:</span><span class="token builtin">number</span>
  counterClockwise<span class="token operator">?</span><span class="token operator">:</span><span class="token builtin">boolean</span>
<span class="token punctuation">}</span><span class="token operator">></span>

<span class="token comment">// eg:</span>
<span class="token keyword">const</span> arc <span class="token operator">=</span> <span class="token punctuation">{</span>
  radius<span class="token operator">:</span> <span class="token number">5</span><span class="token punctuation">,</span>
  startRadian<span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  endRadian<span class="token operator">:</span> Math<span class="token punctuation">.</span><span class="token constant">PI</span>
<span class="token punctuation">}</span></code></pre>
<p><code is:raw>ArcPositioned</code> also includes <code is:raw>x</code> and <code is:raw>y</code> fields.</p>
<p>Try editing this example:</p>
<input style="width: 40em" class="code arc" type="text" id="arc1Txt" value="{ radius: 20, startRadian: 0, endRadian: Math.PI }">
<arc-editor id="arc1" client:visible  />
<p>Angles are set with <em>radians</em>, not the more familiar <em>degrees</em>. See <a href="../units/">Units</a> for more info.</p>
<angles-element width="500" height="300" client:visible />
<h2 id="conversions">Conversions</h2>
<p>Create an arc from degrees:</p>
<pre class="language-js"><code is:raw class="language-js"><span class="token comment">// repl-pad#1</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Arcs <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"https://unpkg.com/ixfx/dist/geometry.js"</span>

<span class="token comment">// fromDegrees(radius:number, startDegrees:number, endDegrees:number, origin?:Point)</span>
<span class="token comment">// returns Arc {radius, startRadian, endRadian}</span>
<span class="token keyword">const</span> arc <span class="token operator">=</span> Arcs<span class="token punctuation">.</span><span class="token function">fromDegrees</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">90</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> arc2 <span class="token operator">=</span> Arcs<span class="token punctuation">.</span><span class="token function">fromDegrees</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">90</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token literal-property property">x</span><span class="token operator">:</span> <span class="token number">100</span><span class="token punctuation">,</span> <span class="token literal-property property">y</span><span class="token operator">:</span> <span class="token number">100</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>
<p>Get a <a href="../line/">Line</a> connecting the start and end point of the arc:</p>
<pre class="language-js"><code is:raw class="language-js"><span class="token comment">// repl-pad#1</span>
<span class="token comment">// Returns {a: {x,y}, b:{x,y} }</span>
<span class="token keyword">const</span> line <span class="token operator">=</span> Arcs<span class="token punctuation">.</span><span class="token function">toLine</span><span class="token punctuation">(</span>arc<span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>
<h2 id="interpolate--point-by-angle">Interpolate &#x26; point by angle</h2>
<p><a href="https://clinth.github.io/ixfx/functions/Geometry.Arcs.interpolate.html"><code is:raw>interpolate</code></a> returns a point at a relative position along an arc.</p>
<pre class="language-js"><code is:raw class="language-js"><span class="token comment">// repl-pad#2</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Arcs<span class="token punctuation">,</span> degreeToRadian <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"https://unpkg.com/ixfx/dist/geometry.js"</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> arc <span class="token operator">=</span> Arcs<span class="token punctuation">.</span><span class="token function">fromDegrees</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">90</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token literal-property property">x</span><span class="token operator">:</span> <span class="token number">100</span><span class="token punctuation">,</span> <span class="token literal-property property">y</span><span class="token operator">:</span> <span class="token number">100</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> p <span class="token operator">=</span> Arcs<span class="token punctuation">.</span><span class="token function">interpolate</span><span class="token punctuation">(</span><span class="token number">0.5</span><span class="token punctuation">,</span> arc<span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>
<p><code is:raw>point</code> returns a coordinate on an arc, based on angle.</p>
<pre class="language-js"><code is:raw class="language-js"><span class="token comment">// repl-pad#2</span>
<span class="token keyword">const</span> pt <span class="token operator">=</span> Arcs<span class="token punctuation">.</span><span class="token function">point</span><span class="token punctuation">(</span>arc<span class="token punctuation">,</span> <span class="token function">degreeToRadian</span><span class="token punctuation">(</span><span class="token number">90</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>
<h2 id="length--distance">Length &#x26; distance</h2>
<p>Get the length of arc as a number</p>
<pre class="language-js"><code is:raw class="language-js"><span class="token comment">// repl-pad#2</span>
Arcs<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span>arc<span class="token punctuation">)</span><span class="token punctuation">;</span> </code></pre>
<p>Distance between the centers of two arcs, as a number</p>
<pre class="language-js"><code is:raw class="language-js"><span class="token comment">// repl-pad#2</span>
Arcs<span class="token punctuation">.</span><span class="token function">distanceCenter</span><span class="token punctuation">(</span>
  Arcs<span class="token punctuation">.</span><span class="token function">fromDegrees</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">40</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token literal-property property">x</span><span class="token operator">:</span> <span class="token number">20</span><span class="token punctuation">,</span> <span class="token literal-property property">y</span><span class="token operator">:</span> <span class="token number">20</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  Arcs<span class="token punctuation">.</span><span class="token function">fromDegrees</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">90</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token literal-property property">x</span><span class="token operator">:</span> <span class="token number">50</span><span class="token punctuation">,</span> <span class="token literal-property property">y</span><span class="token operator">:</span> <span class="token number">50</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span> </code></pre>
<h2 id="area">Area</h2>
<p><a href="https://clinth.github.io/ixfx/functions/Geometry.Arcs.bbox.html"><code is:raw>bbox</code></a> calculates a rectangle that encloses an arc</p>
<pre class="language-js"><code is:raw class="language-js"><span class="token comment">// repl-pad#3</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Arcs <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"https://unpkg.com/ixfx/dist/geometry.js"</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> arc <span class="token operator">=</span> Arcs<span class="token punctuation">.</span><span class="token function">fromDegrees</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">90</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token literal-property property">x</span><span class="token operator">:</span> <span class="token number">100</span><span class="token punctuation">,</span> <span class="token literal-property property">y</span><span class="token operator">:</span> <span class="token number">100</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> p <span class="token operator">=</span> Arcs<span class="token punctuation">.</span><span class="token function">bbox</span><span class="token punctuation">(</span>arc<span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>
<h2 id="comparison">Comparison</h2>
<p><a href="https://clinth.github.io/ixfx/functions/Geometry.Arcs.isEquals.html"><code is:raw>isEqual</code></a> returns <em>true</em> if two arcs are identical by value.</p>
<pre class="language-js"><code is:raw class="language-js"><span class="token keyword">const</span> arcA <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">radius</span><span class="token operator">:</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token literal-property property">endRadian</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token literal-property property">startRadian</span><span class="token operator">:</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> arcA <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">radius</span><span class="token operator">:</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token literal-property property">endRadian</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token literal-property property">startRadian</span><span class="token operator">:</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
arcA <span class="token operator">===</span> arcB<span class="token punctuation">;</span> <span class="token comment">// false, because object identities are different</span>
Arcs<span class="token punctuation">.</span><span class="token function">isEqual</span><span class="token punctuation">(</span>arcA<span class="token punctuation">,</span> arcB<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true, because values are identical</span></code></pre>` };
const frontmatter = { "title": "Arc", "astro": { "headers": [{ "depth": 2, "slug": "type", "text": "Type" }, { "depth": 2, "slug": "conversions", "text": "Conversions" }, { "depth": 2, "slug": "interpolate--point-by-angle", "text": "Interpolate & point by angle" }, { "depth": 2, "slug": "length--distance", "text": "Length & distance" }, { "depth": 2, "slug": "area", "text": "Area" }, { "depth": 2, "slug": "comparison", "text": "Comparison" }], "source": '\n<script type="module" hoist>\nimport \'/src/components/types/geometry/arc\';\nimport \'/src/components/ReplPad\';\n<\/script>\n<style>\ninput.code {\n  font-family: var(--font-mono);\n  font-size: 0.85em;\n}\n\nradians-editor {\n  --label-color: var(--theme-text-light);\n  --axis-color: var(--theme-bg-hover);\n  --ray-color: var(--theme-hit-color);\n}\n\n</style>\n\n<div class="tip">\n<ul>\n<li>Demos <a href="https://clinth.github.io/ixfx-demos/geometry/">Geometry</a> (<a href="https://github.com/ClintH/ixfx-demos/tree/main/geometry">source</a>)</li>\n<li>API Reference <a href="https://clinth.github.io/ixfx/modules/Geometry.Arcs.html">Geometry.Arcs module</a></li>\n</div>\n\nAn arc describes a segment of a [circle](../circle/). It is defined by its radius as well as the start and end radian.\n\n\n## Type\n\nThe expected type of arcs in ixfx is:\n\n```typescript\ntype Arc = {\n  radius:number\n  startRadian:number\n  endRadian:number\n  counterClockwise?:boolean\n}>\n\n// eg:\nconst arc = {\n  radius: 5,\n  startRadian: 0,\n  endRadian: Math.PI\n}\n```\n\n`ArcPositioned` also includes `x` and `y` fields.\n\nTry editing this example:\n\n<input style="width: 40em" class="code arc" type="text" id="arc1Txt" value="{ radius: 20, startRadian: 0, endRadian: Math.PI }">\n<arc-editor id="arc1" client:visible  />\n\nAngles are set with _radians_, not the more familiar _degrees_. See [Units](../units/) for more info.\n\n<angles-element width="500" height="300" client:visible />\n\n## Conversions\n\nCreate an arc from degrees:\n\n```js\n// repl-pad#1\nimport { Arcs } from "https://unpkg.com/ixfx/dist/geometry.js"\n\n// fromDegrees(radius:number, startDegrees:number, endDegrees:number, origin?:Point)\n// returns Arc {radius, startRadian, endRadian}\nconst arc = Arcs.fromDegrees(10, 0, 90);\nconst arc2 = Arcs.fromDegrees(10, 0, 90, {x: 100, y: 100});\n```\n\nGet a [Line](../line/) connecting the start and end point of the arc:\n\n```js\n// repl-pad#1\n// Returns {a: {x,y}, b:{x,y} }\nconst line = Arcs.toLine(arc);\n```\n\n## Interpolate & point by angle\n\n[`interpolate`](https://clinth.github.io/ixfx/functions/Geometry.Arcs.interpolate.html) returns a point at a relative position along an arc.\n\n```js\n// repl-pad#2\nimport { Arcs, degreeToRadian } from "https://unpkg.com/ixfx/dist/geometry.js";\nconst arc = Arcs.fromDegrees(10, 0, 90, {x: 100, y: 100});\n\nconst p = Arcs.interpolate(0.5, arc);\n```\n\n`point` returns a coordinate on an arc, based on angle.\n\n```js\n// repl-pad#2\nconst pt = Arcs.point(arc, degreeToRadian(90));\n```\n\n## Length & distance\n\nGet the length of arc as a number\n\n```js\n// repl-pad#2\nArcs.length(arc); \n```\n\nDistance between the centers of two arcs, as a number \n\n```js\n// repl-pad#2\nArcs.distanceCenter(\n  Arcs.fromDegrees(20, 0, 40, {x: 20, y: 20}),\n  Arcs.fromDegrees(10, 0, 90, {x: 50, y: 50})\n); \n```\n\n## Area\n\n[`bbox`](https://clinth.github.io/ixfx/functions/Geometry.Arcs.bbox.html) calculates a rectangle that encloses an arc\n\n```js\n// repl-pad#3\nimport { Arcs } from "https://unpkg.com/ixfx/dist/geometry.js";\nconst arc = Arcs.fromDegrees(10, 0, 90, {x: 100, y: 100});\n\nconst p = Arcs.bbox(arc);\n``` \n\n## Comparison\n\n[`isEqual`](https://clinth.github.io/ixfx/functions/Geometry.Arcs.isEquals.html) returns _true_ if two arcs are identical by value.\n\n```js\nconst arcA = { radius: 5, endRadian: 0, startRadian: 1 };\nconst arcA = { radius: 5, endRadian: 0, startRadian: 1 };\narcA === arcB; // false, because object identities are different\nArcs.isEqual(arcA, arcB); // true, because values are identical\n```', "html": `<script type="module" hoist>
import '/src/components/types/geometry/arc';
import '/src/components/ReplPad';
<\/script>
<style>
input.code {
  font-family: var(--font-mono);
  font-size: 0.85em;
}

radians-editor {
  --label-color: var(--theme-text-light);
  --axis-color: var(--theme-bg-hover);
  --ray-color: var(--theme-hit-color);
}

</style>
<div class="tip">
<ul>
<li>Demos <a href="https://clinth.github.io/ixfx-demos/geometry/">Geometry</a> (<a href="https://github.com/ClintH/ixfx-demos/tree/main/geometry">source</a>)</li>
<li>API Reference <a href="https://clinth.github.io/ixfx/modules/Geometry.Arcs.html">Geometry.Arcs module</a></li>
</div>
<p>An arc describes a segment of a <a href="../circle/">circle</a>. It is defined by its radius as well as the start and end radian.</p>
<h2 id="type">Type</h2>
<p>The expected type of arcs in ixfx is:</p>
<pre class="language-typescript"><code is:raw class="language-typescript"><span class="token keyword">type</span> <span class="token class-name">Arc</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
  radius<span class="token operator">:</span><span class="token builtin">number</span>
  startRadian<span class="token operator">:</span><span class="token builtin">number</span>
  endRadian<span class="token operator">:</span><span class="token builtin">number</span>
  counterClockwise<span class="token operator">?</span><span class="token operator">:</span><span class="token builtin">boolean</span>
<span class="token punctuation">}</span><span class="token operator">></span>

<span class="token comment">// eg:</span>
<span class="token keyword">const</span> arc <span class="token operator">=</span> <span class="token punctuation">{</span>
  radius<span class="token operator">:</span> <span class="token number">5</span><span class="token punctuation">,</span>
  startRadian<span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  endRadian<span class="token operator">:</span> Math<span class="token punctuation">.</span><span class="token constant">PI</span>
<span class="token punctuation">}</span></code></pre>
<p><code is:raw>ArcPositioned</code> also includes <code is:raw>x</code> and <code is:raw>y</code> fields.</p>
<p>Try editing this example:</p>
<input style="width: 40em" class="code arc" type="text" id="arc1Txt" value="{ radius: 20, startRadian: 0, endRadian: Math.PI }">
<arc-editor id="arc1" client:visible  />
<p>Angles are set with <em>radians</em>, not the more familiar <em>degrees</em>. See <a href="../units/">Units</a> for more info.</p>
<angles-element width="500" height="300" client:visible />
<h2 id="conversions">Conversions</h2>
<p>Create an arc from degrees:</p>
<pre class="language-js"><code is:raw class="language-js"><span class="token comment">// repl-pad#1</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Arcs <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"https://unpkg.com/ixfx/dist/geometry.js"</span>

<span class="token comment">// fromDegrees(radius:number, startDegrees:number, endDegrees:number, origin?:Point)</span>
<span class="token comment">// returns Arc {radius, startRadian, endRadian}</span>
<span class="token keyword">const</span> arc <span class="token operator">=</span> Arcs<span class="token punctuation">.</span><span class="token function">fromDegrees</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">90</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> arc2 <span class="token operator">=</span> Arcs<span class="token punctuation">.</span><span class="token function">fromDegrees</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">90</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token literal-property property">x</span><span class="token operator">:</span> <span class="token number">100</span><span class="token punctuation">,</span> <span class="token literal-property property">y</span><span class="token operator">:</span> <span class="token number">100</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>
<p>Get a <a href="../line/">Line</a> connecting the start and end point of the arc:</p>
<pre class="language-js"><code is:raw class="language-js"><span class="token comment">// repl-pad#1</span>
<span class="token comment">// Returns {a: {x,y}, b:{x,y} }</span>
<span class="token keyword">const</span> line <span class="token operator">=</span> Arcs<span class="token punctuation">.</span><span class="token function">toLine</span><span class="token punctuation">(</span>arc<span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>
<h2 id="interpolate--point-by-angle">Interpolate &#x26; point by angle</h2>
<p><a href="https://clinth.github.io/ixfx/functions/Geometry.Arcs.interpolate.html"><code is:raw>interpolate</code></a> returns a point at a relative position along an arc.</p>
<pre class="language-js"><code is:raw class="language-js"><span class="token comment">// repl-pad#2</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Arcs<span class="token punctuation">,</span> degreeToRadian <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"https://unpkg.com/ixfx/dist/geometry.js"</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> arc <span class="token operator">=</span> Arcs<span class="token punctuation">.</span><span class="token function">fromDegrees</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">90</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token literal-property property">x</span><span class="token operator">:</span> <span class="token number">100</span><span class="token punctuation">,</span> <span class="token literal-property property">y</span><span class="token operator">:</span> <span class="token number">100</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> p <span class="token operator">=</span> Arcs<span class="token punctuation">.</span><span class="token function">interpolate</span><span class="token punctuation">(</span><span class="token number">0.5</span><span class="token punctuation">,</span> arc<span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>
<p><code is:raw>point</code> returns a coordinate on an arc, based on angle.</p>
<pre class="language-js"><code is:raw class="language-js"><span class="token comment">// repl-pad#2</span>
<span class="token keyword">const</span> pt <span class="token operator">=</span> Arcs<span class="token punctuation">.</span><span class="token function">point</span><span class="token punctuation">(</span>arc<span class="token punctuation">,</span> <span class="token function">degreeToRadian</span><span class="token punctuation">(</span><span class="token number">90</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>
<h2 id="length--distance">Length &#x26; distance</h2>
<p>Get the length of arc as a number</p>
<pre class="language-js"><code is:raw class="language-js"><span class="token comment">// repl-pad#2</span>
Arcs<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span>arc<span class="token punctuation">)</span><span class="token punctuation">;</span> </code></pre>
<p>Distance between the centers of two arcs, as a number</p>
<pre class="language-js"><code is:raw class="language-js"><span class="token comment">// repl-pad#2</span>
Arcs<span class="token punctuation">.</span><span class="token function">distanceCenter</span><span class="token punctuation">(</span>
  Arcs<span class="token punctuation">.</span><span class="token function">fromDegrees</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">40</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token literal-property property">x</span><span class="token operator">:</span> <span class="token number">20</span><span class="token punctuation">,</span> <span class="token literal-property property">y</span><span class="token operator">:</span> <span class="token number">20</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  Arcs<span class="token punctuation">.</span><span class="token function">fromDegrees</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">90</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token literal-property property">x</span><span class="token operator">:</span> <span class="token number">50</span><span class="token punctuation">,</span> <span class="token literal-property property">y</span><span class="token operator">:</span> <span class="token number">50</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span> </code></pre>
<h2 id="area">Area</h2>
<p><a href="https://clinth.github.io/ixfx/functions/Geometry.Arcs.bbox.html"><code is:raw>bbox</code></a> calculates a rectangle that encloses an arc</p>
<pre class="language-js"><code is:raw class="language-js"><span class="token comment">// repl-pad#3</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Arcs <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"https://unpkg.com/ixfx/dist/geometry.js"</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> arc <span class="token operator">=</span> Arcs<span class="token punctuation">.</span><span class="token function">fromDegrees</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">90</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token literal-property property">x</span><span class="token operator">:</span> <span class="token number">100</span><span class="token punctuation">,</span> <span class="token literal-property property">y</span><span class="token operator">:</span> <span class="token number">100</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> p <span class="token operator">=</span> Arcs<span class="token punctuation">.</span><span class="token function">bbox</span><span class="token punctuation">(</span>arc<span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>
<h2 id="comparison">Comparison</h2>
<p><a href="https://clinth.github.io/ixfx/functions/Geometry.Arcs.isEquals.html"><code is:raw>isEqual</code></a> returns <em>true</em> if two arcs are identical by value.</p>
<pre class="language-js"><code is:raw class="language-js"><span class="token keyword">const</span> arcA <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">radius</span><span class="token operator">:</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token literal-property property">endRadian</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token literal-property property">startRadian</span><span class="token operator">:</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> arcA <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">radius</span><span class="token operator">:</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token literal-property property">endRadian</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token literal-property property">startRadian</span><span class="token operator">:</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
arcA <span class="token operator">===</span> arcB<span class="token punctuation">;</span> <span class="token comment">// false, because object identities are different</span>
Arcs<span class="token punctuation">.</span><span class="token function">isEqual</span><span class="token punctuation">(</span>arcA<span class="token punctuation">,</span> arcB<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true, because values are identical</span></code></pre>` } };
const $$metadata = createMetadata("/src/pages/types/geometry/arc.md", { modules: [{ module: $$module1, specifier: "../../../layouts/MainLayout.astro", assert: {} }, { module: $$module2, specifier: "/src/components/geometry/ArcEditor", assert: {} }, { module: $$module3, specifier: "/src/components/geometry/AnglesElement", assert: {} }], hydratedComponents: ["angles-element", "arc-editor"], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set(["visible"]), hoisted: [{ type: "inline", value: `
import '/src/components/types/geometry/arc';
import '/src/components/ReplPad';
` }] });
const $$Astro = createAstro("/src/pages/types/geometry/arc.md", "https://clinth.github.io/ixfx-docs/", "file:///Users/af4766/repos/ixfx-docs/");
const $$Arc = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Arc;
  const $$content = { "title": "Arc", "astro": { "headers": [{ "depth": 2, "slug": "type", "text": "Type" }, { "depth": 2, "slug": "conversions", "text": "Conversions" }, { "depth": 2, "slug": "interpolate--point-by-angle", "text": "Interpolate & point by angle" }, { "depth": 2, "slug": "length--distance", "text": "Length & distance" }, { "depth": 2, "slug": "area", "text": "Area" }, { "depth": 2, "slug": "comparison", "text": "Comparison" }], "source": '\n<script type="module" hoist>\nimport \'/src/components/types/geometry/arc\';\nimport \'/src/components/ReplPad\';\n<\/script>\n<style>\ninput.code {\n  font-family: var(--font-mono);\n  font-size: 0.85em;\n}\n\nradians-editor {\n  --label-color: var(--theme-text-light);\n  --axis-color: var(--theme-bg-hover);\n  --ray-color: var(--theme-hit-color);\n}\n\n</style>\n\n<div class="tip">\n<ul>\n<li>Demos <a href="https://clinth.github.io/ixfx-demos/geometry/">Geometry</a> (<a href="https://github.com/ClintH/ixfx-demos/tree/main/geometry">source</a>)</li>\n<li>API Reference <a href="https://clinth.github.io/ixfx/modules/Geometry.Arcs.html">Geometry.Arcs module</a></li>\n</div>\n\nAn arc describes a segment of a [circle](../circle/). It is defined by its radius as well as the start and end radian.\n\n\n## Type\n\nThe expected type of arcs in ixfx is:\n\n```typescript\ntype Arc = {\n  radius:number\n  startRadian:number\n  endRadian:number\n  counterClockwise?:boolean\n}>\n\n// eg:\nconst arc = {\n  radius: 5,\n  startRadian: 0,\n  endRadian: Math.PI\n}\n```\n\n`ArcPositioned` also includes `x` and `y` fields.\n\nTry editing this example:\n\n<input style="width: 40em" class="code arc" type="text" id="arc1Txt" value="{ radius: 20, startRadian: 0, endRadian: Math.PI }">\n<arc-editor id="arc1" client:visible  />\n\nAngles are set with _radians_, not the more familiar _degrees_. See [Units](../units/) for more info.\n\n<angles-element width="500" height="300" client:visible />\n\n## Conversions\n\nCreate an arc from degrees:\n\n```js\n// repl-pad#1\nimport { Arcs } from "https://unpkg.com/ixfx/dist/geometry.js"\n\n// fromDegrees(radius:number, startDegrees:number, endDegrees:number, origin?:Point)\n// returns Arc {radius, startRadian, endRadian}\nconst arc = Arcs.fromDegrees(10, 0, 90);\nconst arc2 = Arcs.fromDegrees(10, 0, 90, {x: 100, y: 100});\n```\n\nGet a [Line](../line/) connecting the start and end point of the arc:\n\n```js\n// repl-pad#1\n// Returns {a: {x,y}, b:{x,y} }\nconst line = Arcs.toLine(arc);\n```\n\n## Interpolate & point by angle\n\n[`interpolate`](https://clinth.github.io/ixfx/functions/Geometry.Arcs.interpolate.html) returns a point at a relative position along an arc.\n\n```js\n// repl-pad#2\nimport { Arcs, degreeToRadian } from "https://unpkg.com/ixfx/dist/geometry.js";\nconst arc = Arcs.fromDegrees(10, 0, 90, {x: 100, y: 100});\n\nconst p = Arcs.interpolate(0.5, arc);\n```\n\n`point` returns a coordinate on an arc, based on angle.\n\n```js\n// repl-pad#2\nconst pt = Arcs.point(arc, degreeToRadian(90));\n```\n\n## Length & distance\n\nGet the length of arc as a number\n\n```js\n// repl-pad#2\nArcs.length(arc); \n```\n\nDistance between the centers of two arcs, as a number \n\n```js\n// repl-pad#2\nArcs.distanceCenter(\n  Arcs.fromDegrees(20, 0, 40, {x: 20, y: 20}),\n  Arcs.fromDegrees(10, 0, 90, {x: 50, y: 50})\n); \n```\n\n## Area\n\n[`bbox`](https://clinth.github.io/ixfx/functions/Geometry.Arcs.bbox.html) calculates a rectangle that encloses an arc\n\n```js\n// repl-pad#3\nimport { Arcs } from "https://unpkg.com/ixfx/dist/geometry.js";\nconst arc = Arcs.fromDegrees(10, 0, 90, {x: 100, y: 100});\n\nconst p = Arcs.bbox(arc);\n``` \n\n## Comparison\n\n[`isEqual`](https://clinth.github.io/ixfx/functions/Geometry.Arcs.isEquals.html) returns _true_ if two arcs are identical by value.\n\n```js\nconst arcA = { radius: 5, endRadian: 0, startRadian: 1 };\nconst arcA = { radius: 5, endRadian: 0, startRadian: 1 };\narcA === arcB; // false, because object identities are different\nArcs.isEqual(arcA, arcB); // true, because values are identical\n```', "html": `<script type="module" hoist>
import '/src/components/types/geometry/arc';
import '/src/components/ReplPad';
<\/script>
<style>
input.code {
  font-family: var(--font-mono);
  font-size: 0.85em;
}

radians-editor {
  --label-color: var(--theme-text-light);
  --axis-color: var(--theme-bg-hover);
  --ray-color: var(--theme-hit-color);
}

</style>
<div class="tip">
<ul>
<li>Demos <a href="https://clinth.github.io/ixfx-demos/geometry/">Geometry</a> (<a href="https://github.com/ClintH/ixfx-demos/tree/main/geometry">source</a>)</li>
<li>API Reference <a href="https://clinth.github.io/ixfx/modules/Geometry.Arcs.html">Geometry.Arcs module</a></li>
</div>
<p>An arc describes a segment of a <a href="../circle/">circle</a>. It is defined by its radius as well as the start and end radian.</p>
<h2 id="type">Type</h2>
<p>The expected type of arcs in ixfx is:</p>
<pre class="language-typescript"><code is:raw class="language-typescript"><span class="token keyword">type</span> <span class="token class-name">Arc</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
  radius<span class="token operator">:</span><span class="token builtin">number</span>
  startRadian<span class="token operator">:</span><span class="token builtin">number</span>
  endRadian<span class="token operator">:</span><span class="token builtin">number</span>
  counterClockwise<span class="token operator">?</span><span class="token operator">:</span><span class="token builtin">boolean</span>
<span class="token punctuation">}</span><span class="token operator">></span>

<span class="token comment">// eg:</span>
<span class="token keyword">const</span> arc <span class="token operator">=</span> <span class="token punctuation">{</span>
  radius<span class="token operator">:</span> <span class="token number">5</span><span class="token punctuation">,</span>
  startRadian<span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  endRadian<span class="token operator">:</span> Math<span class="token punctuation">.</span><span class="token constant">PI</span>
<span class="token punctuation">}</span></code></pre>
<p><code is:raw>ArcPositioned</code> also includes <code is:raw>x</code> and <code is:raw>y</code> fields.</p>
<p>Try editing this example:</p>
<input style="width: 40em" class="code arc" type="text" id="arc1Txt" value="{ radius: 20, startRadian: 0, endRadian: Math.PI }">
<arc-editor id="arc1" client:visible  />
<p>Angles are set with <em>radians</em>, not the more familiar <em>degrees</em>. See <a href="../units/">Units</a> for more info.</p>
<angles-element width="500" height="300" client:visible />
<h2 id="conversions">Conversions</h2>
<p>Create an arc from degrees:</p>
<pre class="language-js"><code is:raw class="language-js"><span class="token comment">// repl-pad#1</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Arcs <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"https://unpkg.com/ixfx/dist/geometry.js"</span>

<span class="token comment">// fromDegrees(radius:number, startDegrees:number, endDegrees:number, origin?:Point)</span>
<span class="token comment">// returns Arc {radius, startRadian, endRadian}</span>
<span class="token keyword">const</span> arc <span class="token operator">=</span> Arcs<span class="token punctuation">.</span><span class="token function">fromDegrees</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">90</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> arc2 <span class="token operator">=</span> Arcs<span class="token punctuation">.</span><span class="token function">fromDegrees</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">90</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token literal-property property">x</span><span class="token operator">:</span> <span class="token number">100</span><span class="token punctuation">,</span> <span class="token literal-property property">y</span><span class="token operator">:</span> <span class="token number">100</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>
<p>Get a <a href="../line/">Line</a> connecting the start and end point of the arc:</p>
<pre class="language-js"><code is:raw class="language-js"><span class="token comment">// repl-pad#1</span>
<span class="token comment">// Returns {a: {x,y}, b:{x,y} }</span>
<span class="token keyword">const</span> line <span class="token operator">=</span> Arcs<span class="token punctuation">.</span><span class="token function">toLine</span><span class="token punctuation">(</span>arc<span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>
<h2 id="interpolate--point-by-angle">Interpolate &#x26; point by angle</h2>
<p><a href="https://clinth.github.io/ixfx/functions/Geometry.Arcs.interpolate.html"><code is:raw>interpolate</code></a> returns a point at a relative position along an arc.</p>
<pre class="language-js"><code is:raw class="language-js"><span class="token comment">// repl-pad#2</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Arcs<span class="token punctuation">,</span> degreeToRadian <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"https://unpkg.com/ixfx/dist/geometry.js"</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> arc <span class="token operator">=</span> Arcs<span class="token punctuation">.</span><span class="token function">fromDegrees</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">90</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token literal-property property">x</span><span class="token operator">:</span> <span class="token number">100</span><span class="token punctuation">,</span> <span class="token literal-property property">y</span><span class="token operator">:</span> <span class="token number">100</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> p <span class="token operator">=</span> Arcs<span class="token punctuation">.</span><span class="token function">interpolate</span><span class="token punctuation">(</span><span class="token number">0.5</span><span class="token punctuation">,</span> arc<span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>
<p><code is:raw>point</code> returns a coordinate on an arc, based on angle.</p>
<pre class="language-js"><code is:raw class="language-js"><span class="token comment">// repl-pad#2</span>
<span class="token keyword">const</span> pt <span class="token operator">=</span> Arcs<span class="token punctuation">.</span><span class="token function">point</span><span class="token punctuation">(</span>arc<span class="token punctuation">,</span> <span class="token function">degreeToRadian</span><span class="token punctuation">(</span><span class="token number">90</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>
<h2 id="length--distance">Length &#x26; distance</h2>
<p>Get the length of arc as a number</p>
<pre class="language-js"><code is:raw class="language-js"><span class="token comment">// repl-pad#2</span>
Arcs<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span>arc<span class="token punctuation">)</span><span class="token punctuation">;</span> </code></pre>
<p>Distance between the centers of two arcs, as a number</p>
<pre class="language-js"><code is:raw class="language-js"><span class="token comment">// repl-pad#2</span>
Arcs<span class="token punctuation">.</span><span class="token function">distanceCenter</span><span class="token punctuation">(</span>
  Arcs<span class="token punctuation">.</span><span class="token function">fromDegrees</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">40</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token literal-property property">x</span><span class="token operator">:</span> <span class="token number">20</span><span class="token punctuation">,</span> <span class="token literal-property property">y</span><span class="token operator">:</span> <span class="token number">20</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  Arcs<span class="token punctuation">.</span><span class="token function">fromDegrees</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">90</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token literal-property property">x</span><span class="token operator">:</span> <span class="token number">50</span><span class="token punctuation">,</span> <span class="token literal-property property">y</span><span class="token operator">:</span> <span class="token number">50</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span> </code></pre>
<h2 id="area">Area</h2>
<p><a href="https://clinth.github.io/ixfx/functions/Geometry.Arcs.bbox.html"><code is:raw>bbox</code></a> calculates a rectangle that encloses an arc</p>
<pre class="language-js"><code is:raw class="language-js"><span class="token comment">// repl-pad#3</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Arcs <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"https://unpkg.com/ixfx/dist/geometry.js"</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> arc <span class="token operator">=</span> Arcs<span class="token punctuation">.</span><span class="token function">fromDegrees</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">90</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token literal-property property">x</span><span class="token operator">:</span> <span class="token number">100</span><span class="token punctuation">,</span> <span class="token literal-property property">y</span><span class="token operator">:</span> <span class="token number">100</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> p <span class="token operator">=</span> Arcs<span class="token punctuation">.</span><span class="token function">bbox</span><span class="token punctuation">(</span>arc<span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>
<h2 id="comparison">Comparison</h2>
<p><a href="https://clinth.github.io/ixfx/functions/Geometry.Arcs.isEquals.html"><code is:raw>isEqual</code></a> returns <em>true</em> if two arcs are identical by value.</p>
<pre class="language-js"><code is:raw class="language-js"><span class="token keyword">const</span> arcA <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">radius</span><span class="token operator">:</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token literal-property property">endRadian</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token literal-property property">startRadian</span><span class="token operator">:</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> arcA <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">radius</span><span class="token operator">:</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token literal-property property">endRadian</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token literal-property property">startRadian</span><span class="token operator">:</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
arcA <span class="token operator">===</span> arcB<span class="token punctuation">;</span> <span class="token comment">// false, because object identities are different</span>
Arcs<span class="token punctuation">.</span><span class="token function">isEqual</span><span class="token punctuation">(</span>arcA<span class="token punctuation">,</span> arcB<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true, because values are identical</span></code></pre>` } };
  const STYLES = [
    { props: { "data-astro-id": "F7XUHQCU" }, children: `input.astro-F7XUHQCU.code.astro-F7XUHQCU{font-family:var(--font-mono);font-size:0.85em;}radians-editor.astro-F7XUHQCU{--label-color: var(--theme-text-light);--axis-color: var(--theme-bg-hover);--ray-color: var(--theme-hit-color);}` }
  ];
  for (const STYLE of STYLES)
    $$result.styles.add(STYLE);
  const SCRIPTS = [
    { props: { "type": "module", "hoist": true }, children: `import '/src/components/types/geometry/arc';
import '/src/components/ReplPad';` }
  ];
  for (const SCRIPT of SCRIPTS)
    $$result.scripts.add(SCRIPT);
  return render`${renderComponent($$result, "Layout", $$MainLayout, { "content": $$content, "class": "astro-F7XUHQCU" }, { "default": () => render`<div class="tip astro-F7XUHQCU">
<ul class="astro-F7XUHQCU">
<li class="astro-F7XUHQCU">Demos <a href="https://clinth.github.io/ixfx-demos/geometry/" class="astro-F7XUHQCU">Geometry</a> (<a href="https://github.com/ClintH/ixfx-demos/tree/main/geometry" class="astro-F7XUHQCU">source</a>)</li>
<li class="astro-F7XUHQCU">API Reference <a href="https://clinth.github.io/ixfx/modules/Geometry.Arcs.html" class="astro-F7XUHQCU">Geometry.Arcs module</a></li>
</ul></div><p class="astro-F7XUHQCU">An arc describes a segment of a <a href="../circle/" class="astro-F7XUHQCU">circle</a>. It is defined by its radius as well as the start and end radian.</p><h2 id="type" class="astro-F7XUHQCU">Type</h2><p class="astro-F7XUHQCU">The expected type of arcs in ixfx is:</p><pre class="language-typescript astro-F7XUHQCU"><code class="language-typescript astro-F7XUHQCU"><span class="token keyword">type</span> <span class="token class-name">Arc</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
  radius<span class="token operator">:</span><span class="token builtin">number</span>
  startRadian<span class="token operator">:</span><span class="token builtin">number</span>
  endRadian<span class="token operator">:</span><span class="token builtin">number</span>
  counterClockwise<span class="token operator">?</span><span class="token operator">:</span><span class="token builtin">boolean</span>
<span class="token punctuation">}</span><span class="token operator">></span>

<span class="token comment">// eg:</span>
<span class="token keyword">const</span> arc <span class="token operator">=</span> <span class="token punctuation">{</span>
  radius<span class="token operator">:</span> <span class="token number">5</span><span class="token punctuation">,</span>
  startRadian<span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  endRadian<span class="token operator">:</span> Math<span class="token punctuation">.</span><span class="token constant">PI</span>
<span class="token punctuation">}</span></code></pre><p class="astro-F7XUHQCU"><code class="astro-F7XUHQCU">ArcPositioned</code> also includes <code class="astro-F7XUHQCU">x</code> and <code class="astro-F7XUHQCU">y</code> fields.</p><p class="astro-F7XUHQCU">Try editing this example:</p><input style="width: 40em" class="code arc astro-F7XUHQCU" type="text" id="arc1Txt" value="{ radius: 20, startRadian: 0, endRadian: Math.PI }">${renderComponent($$result, "arc-editor", "arc-editor", { "id": "arc1", "client:visible": true, "client:component-hydration": "visible", "client:component-path": $$metadata.getPath("arc-editor"), "client:component-export": $$metadata.getExport("arc-editor"), "class": "astro-F7XUHQCU" })}<p class="astro-F7XUHQCU">Angles are set with <em class="astro-F7XUHQCU">radians</em>, not the more familiar <em class="astro-F7XUHQCU">degrees</em>. See <a href="../units/" class="astro-F7XUHQCU">Units</a> for more info.</p>${renderComponent($$result, "angles-element", "angles-element", { "width": "500", "height": "300", "client:visible": true, "client:component-hydration": "visible", "client:component-path": $$metadata.getPath("angles-element"), "client:component-export": $$metadata.getExport("angles-element"), "class": "astro-F7XUHQCU" })}<h2 id="conversions" class="astro-F7XUHQCU">Conversions</h2><p class="astro-F7XUHQCU">Create an arc from degrees:</p><pre class="language-js astro-F7XUHQCU"><code class="language-js astro-F7XUHQCU"><span class="token comment">// repl-pad#1</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Arcs <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"https://unpkg.com/ixfx/dist/geometry.js"</span>

<span class="token comment">// fromDegrees(radius:number, startDegrees:number, endDegrees:number, origin?:Point)</span>
<span class="token comment">// returns Arc {radius, startRadian, endRadian}</span>
<span class="token keyword">const</span> arc <span class="token operator">=</span> Arcs<span class="token punctuation">.</span><span class="token function">fromDegrees</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">90</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> arc2 <span class="token operator">=</span> Arcs<span class="token punctuation">.</span><span class="token function">fromDegrees</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">90</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token literal-property property">x</span><span class="token operator">:</span> <span class="token number">100</span><span class="token punctuation">,</span> <span class="token literal-property property">y</span><span class="token operator">:</span> <span class="token number">100</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre><p class="astro-F7XUHQCU">Get a <a href="../line/" class="astro-F7XUHQCU">Line</a> connecting the start and end point of the arc:</p><pre class="language-js astro-F7XUHQCU"><code class="language-js astro-F7XUHQCU"><span class="token comment">// repl-pad#1</span>
<span class="token comment">// Returns {a: {x,y}, b:{x,y} }</span>
<span class="token keyword">const</span> line <span class="token operator">=</span> Arcs<span class="token punctuation">.</span><span class="token function">toLine</span><span class="token punctuation">(</span>arc<span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre><h2 id="interpolate--point-by-angle" class="astro-F7XUHQCU">Interpolate &#x26; point by angle</h2><p class="astro-F7XUHQCU"><a href="https://clinth.github.io/ixfx/functions/Geometry.Arcs.interpolate.html" class="astro-F7XUHQCU"><code class="astro-F7XUHQCU">interpolate</code></a> returns a point at a relative position along an arc.</p><pre class="language-js astro-F7XUHQCU"><code class="language-js astro-F7XUHQCU"><span class="token comment">// repl-pad#2</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Arcs<span class="token punctuation">,</span> degreeToRadian <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"https://unpkg.com/ixfx/dist/geometry.js"</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> arc <span class="token operator">=</span> Arcs<span class="token punctuation">.</span><span class="token function">fromDegrees</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">90</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token literal-property property">x</span><span class="token operator">:</span> <span class="token number">100</span><span class="token punctuation">,</span> <span class="token literal-property property">y</span><span class="token operator">:</span> <span class="token number">100</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> p <span class="token operator">=</span> Arcs<span class="token punctuation">.</span><span class="token function">interpolate</span><span class="token punctuation">(</span><span class="token number">0.5</span><span class="token punctuation">,</span> arc<span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre><p class="astro-F7XUHQCU"><code class="astro-F7XUHQCU">point</code> returns a coordinate on an arc, based on angle.</p><pre class="language-js astro-F7XUHQCU"><code class="language-js astro-F7XUHQCU"><span class="token comment">// repl-pad#2</span>
<span class="token keyword">const</span> pt <span class="token operator">=</span> Arcs<span class="token punctuation">.</span><span class="token function">point</span><span class="token punctuation">(</span>arc<span class="token punctuation">,</span> <span class="token function">degreeToRadian</span><span class="token punctuation">(</span><span class="token number">90</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre><h2 id="length--distance" class="astro-F7XUHQCU">Length &#x26; distance</h2><p class="astro-F7XUHQCU">Get the length of arc as a number</p><pre class="language-js astro-F7XUHQCU"><code class="language-js astro-F7XUHQCU"><span class="token comment">// repl-pad#2</span>
Arcs<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span>arc<span class="token punctuation">)</span><span class="token punctuation">;</span> </code></pre><p class="astro-F7XUHQCU">Distance between the centers of two arcs, as a number</p><pre class="language-js astro-F7XUHQCU"><code class="language-js astro-F7XUHQCU"><span class="token comment">// repl-pad#2</span>
Arcs<span class="token punctuation">.</span><span class="token function">distanceCenter</span><span class="token punctuation">(</span>
  Arcs<span class="token punctuation">.</span><span class="token function">fromDegrees</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">40</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token literal-property property">x</span><span class="token operator">:</span> <span class="token number">20</span><span class="token punctuation">,</span> <span class="token literal-property property">y</span><span class="token operator">:</span> <span class="token number">20</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  Arcs<span class="token punctuation">.</span><span class="token function">fromDegrees</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">90</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token literal-property property">x</span><span class="token operator">:</span> <span class="token number">50</span><span class="token punctuation">,</span> <span class="token literal-property property">y</span><span class="token operator">:</span> <span class="token number">50</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span> </code></pre><h2 id="area" class="astro-F7XUHQCU">Area</h2><p class="astro-F7XUHQCU"><a href="https://clinth.github.io/ixfx/functions/Geometry.Arcs.bbox.html" class="astro-F7XUHQCU"><code class="astro-F7XUHQCU">bbox</code></a> calculates a rectangle that encloses an arc</p><pre class="language-js astro-F7XUHQCU"><code class="language-js astro-F7XUHQCU"><span class="token comment">// repl-pad#3</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Arcs <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"https://unpkg.com/ixfx/dist/geometry.js"</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> arc <span class="token operator">=</span> Arcs<span class="token punctuation">.</span><span class="token function">fromDegrees</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">90</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token literal-property property">x</span><span class="token operator">:</span> <span class="token number">100</span><span class="token punctuation">,</span> <span class="token literal-property property">y</span><span class="token operator">:</span> <span class="token number">100</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> p <span class="token operator">=</span> Arcs<span class="token punctuation">.</span><span class="token function">bbox</span><span class="token punctuation">(</span>arc<span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre><h2 id="comparison" class="astro-F7XUHQCU">Comparison</h2><p class="astro-F7XUHQCU"><a href="https://clinth.github.io/ixfx/functions/Geometry.Arcs.isEquals.html" class="astro-F7XUHQCU"><code class="astro-F7XUHQCU">isEqual</code></a> returns <em class="astro-F7XUHQCU">true</em> if two arcs are identical by value.</p><pre class="language-js astro-F7XUHQCU"><code class="language-js astro-F7XUHQCU"><span class="token keyword">const</span> arcA <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">radius</span><span class="token operator">:</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token literal-property property">endRadian</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token literal-property property">startRadian</span><span class="token operator">:</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> arcA <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">radius</span><span class="token operator">:</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token literal-property property">endRadian</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token literal-property property">startRadian</span><span class="token operator">:</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
arcA <span class="token operator">===</span> arcB<span class="token punctuation">;</span> <span class="token comment">// false, because object identities are different</span>
Arcs<span class="token punctuation">.</span><span class="token function">isEqual</span><span class="token punctuation">(</span>arcA<span class="token punctuation">,</span> arcB<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true, because values are identical</span></code></pre>` })}`;
});

export { $$metadata, $$Arc as default, frontmatter, metadata };
