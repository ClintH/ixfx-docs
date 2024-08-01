import { c as createMetadata, a as createAstro, b as createComponent, r as render, d as renderComponent } from './chunks/index.7bfc2e7e.mjs';
import { $ as $$module1, a as $$MainLayout } from './chunks/MainLayout.fae6d6b7.mjs';
import { $ as $$module2 } from './chunks/DensityPlotElement.82d8cd8e.mjs';
import 'shorthash';
import 'serialize-javascript';
import 'preact/hooks';
import 'preact/jsx-runtime';
import 'lit';
import 'lit/decorators.js';
import 'lit/directives/class-map.js';
import './chunks/chunk-IYXXLC7L.d562e3d6.mjs';
import './chunks/styles.9b8f8965.mjs';

const metadata = { "headers": [{ "depth": 2, "slug": "weighted-distributions", "text": "Weighted distributions" }, { "depth": 3, "slug": "gaussian", "text": "Gaussian" }, { "depth": 3, "slug": "more-random", "text": "More random" }], "source": '\n<script type="module" hoist>\n  import \'/src/components/ReplPad\';\n  import \'/src/loader\';\n  import \'/src/components/DensityPlotElement\';\n  import {weightedInteger, weighted, gaussian} from \'/node_modules/ixfx/dist/random.js\';\n  import {Easings} from \'/node_modules/ixfx/dist/modulation.js\';\n  window.weightedInteger = weightedInteger;\n  window.weighted = weighted;\n  window.Easings = Easings;\n  window.gaussian = gaussian;\n  importEl(\n    `plot1`, \n    `density-plot-element`, {\n      fn: "Math.random()"\n  });\n  importEl(\n    `plot2`, \n    `density-plot-element`, {\n      fn: "weighted(\'quadIn\')",\n      editable: true\n  });\n  importEl(\n    `plot-gaussian`, \n    `density-plot-element`, {\n      fn: "gaussian()",\n      editable: true\n  });\n<\/script>\n\n<div class="tip">\n<ul>\n<li>API Reference <a href="https://clinth.github.io/ixfx/modules/Random.html">Random module</a></li>\n<li><a href="https://fn-vis.pages.dev/1/#H4sIAARX3mQAAzWMQQ6CMBAAv7LhQpsYileN3jn4AjGhsaVU7bZ2FyUh/F1NZE5zmTkXPqSYGWZ4W+8GtgYW6HMMUA7MiXZKjZjurrrGoPzUT8p4YpU1mhiqG5X7Fslyg2zzSz+EkIcjzC0CpEh8skTaWbG+RfcctWmwk/LbLZttXf8E/hSXD2v+IIiQAAAA">fn-vis</a>: useful for seeing output values</li>\n</ul>\n</div>\n\nJavascript\'s go-to source of randomness is [`Math.random()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random) which returns a random number equal or above 0 and less than 1. This is perfect for uniform distribution on a percentage scale.\n\nWe sometimes want the values on a different scale. Ixfx has a few helper functions for this common need:\n```js\n// repl-pad\nimport { integer, float } from \'https://unpkg.com/ixfx/dist/random.js\';\ninteger(10); // Random integer value 0..<10\nfloat(100); // Random floating point number 0..<100 \n```\n\n## Weighted distributions\n\nAnother issue with `Math.random` is it\'s roughly even distribution. You can see this below, the horizontal axis shows values from 0 on the left to 1 on the right. Note how the plot mostly fills out evenly along the horizontal axis.\n\n<!-- \n<density-plot-element id="plot1" view="linear" client:visible fn="weightedInteger(10);" /> -->\n\n<div id="plot1"></div>\n\n<div class="tip">\n<a href="https://fn-vis.pages.dev/1/#H4sIAARX3mQAAzWMQQ6CMBAAv7LhQpsYileN3jn4AjGhsaVU7bZ2FyUh/F1NZE5zmTkXPqSYGWZ4W+8GtgYW6HMMUA7MiXZKjZjurrrGoPzUT8p4YpU1mhiqG5X7Fslyg2zzSz+EkIcjzC0CpEh8skTaWbG+RfcctWmwk/LbLZttXf8E/hSXD2v+IIiQAAAA">Try out some of these examples in the plotter</a>\n</div><p></p>\n\nTo make some numbers more likely than others, you may want some form of _weighted distribution_. \n\nixfx\'s [`Random.weighted`](https://clinth.github.io/ixfx/modules/Random.html#weighted) uses an [easing function](../../modulation/easing/) to shape random numbers.\n\nWhen using the _quadIn_ easing (the default), note how the density of random values skews toward 0, visually shown as the left-most part of the bar.\n\n<div id="plot2"></div>\n\n```js\n// repl-pad\nimport { weighted } from \'https://unpkg.com/ixfx/dist/random.js\';\n// Yields 0-1 (inclusive) random number\nweighted(`quadIn`);\nweighted(`quadOut`);\n```\n\nRandom integers (ie. whole numbers) can be produced with [`Random.weightedInteger`](https://clinth.github.io/ixfx/modules/Random.html#weightedInteger). This is useful for producing random array indexes.\n\nA range is provided to the function, with the return value always below the maximum (ie, it is _exclusive_). The minimum, 0 by default, might be returned (ie, it is _inclusive_).\n\n```js\n// repl-pad\nimport { weightedInteger } from \'https://unpkg.com/ixfx/dist/random.js\';\nweightedInteger(10);      // 0-9\nweightedInteger(10, 20);  // 10-19\nweightedInteger(100, `quadIn`);       // 0-99, specifying the easing function\nweightedInteger(100, 200, `quadOut`); // 100-199, specifying the easing function\n```\n\nTo use for accessing an array randomly:\n```js\nconst list = [`mango`, `kiwi`, `grape`];\n// Yields random item from list\nlist[weightedInteger(list.length)];\n```\n\n### Gaussian\n\n<div class="tip">\n<a href="https://fn-vis.pages.dev/1/#H4sIAPRW3mQAA1WPzQrCMBCEX2XZiy1Eo9eK3j34BLaHYNMabX7obqUQ8u6mooJ72hm+GZhLROtbjRWGwTMmEdEp+9MCjTNs1IBVTGJBCaucaTVxZtaYGvEWi91kwtjgR4YIvZqIjHKQoBu9hdWNOVAl5eTCo99cvZVm7mbZGmI5Ktd6u7nTal870nxyrMenGoqiPBwh1g4geOKzJlK9Lr7dRVlmPonddrs88DnMI/5GNS8ZCjbg5gAAAA==">Try out some of these examples in the plotter</a>\n</div><p></p>\n\nGaussian distribution has a \'bell curve\' shape, centred around the middle. In other words, you\'d expect to get more random values around 0.5 than 0 or 1. ixfx\'s [`Random.gaussian`](https://clinth.github.io/ixfx/modules/Random.html#gaussian) provides this.\n\n<div id="plot-gaussian"></div>\n\n```js\n// repl-pad#2\nimport { gaussian } from \'https://unpkg.com/ixfx/dist/random.js\';\n\n// Yields a random number between 0..1\ngaussian();\n```\n\nThe function takes a _skew_ parameter which shifts the centre of the curve.\n\n```js\n// repl-pad#2\n// Shifts distribution to right, closer to 1\ngaussian(0.1);\n// Shifts distribution to the left, closer to 0\ngaussian(6);\n```\n\n### More random\n\n```js\n// repl-pad\nimport { minutesMs, secondsMs } from \'https://unpkg.com/ixfx/dist/random.js\';\n// minutesMs and secondsMs compute random millisecond values\nminutesMs(5); // Random timeout of up to 5 minutes\nsecondsMs(5); // Random timeout of up to 5 seconds\n```\n\nWith arrays\n\n```js\n// repl-pad\nimport { arrayElement, arrayIndex, integerUniqueGen } from \'https://unpkg.com/ixfx/dist/random.js\';\n\nconst v = [`blue`, `red`, `orange`];\n\narrayElement(v); // Returns a random value\narrayIndex(v); // Random array index\n\n// Produce unique set of random integers 0..<10\nconst values = [...integerUniqueGen(10)];\n```\n\nOther values:\n```js\n// repl-pad\nimport { hue, string } from \'https://unpkg.com/ixfx/dist/random.js\';\n\nhue(); // Compute random hue value 0...359\nstring(10); // Random string 10 letters long\n```', "html": `<script type="module" hoist>
  import '/src/components/ReplPad';
  import '/src/loader';
  import '/src/components/DensityPlotElement';
  import {weightedInteger, weighted, gaussian} from '/node_modules/ixfx/dist/random.js';
  import {Easings} from '/node_modules/ixfx/dist/modulation.js';
  window.weightedInteger = weightedInteger;
  window.weighted = weighted;
  window.Easings = Easings;
  window.gaussian = gaussian;
  importEl(
    \`plot1\`, 
    \`density-plot-element\`, {
      fn: "Math.random()"
  });
  importEl(
    \`plot2\`, 
    \`density-plot-element\`, {
      fn: "weighted('quadIn')",
      editable: true
  });
  importEl(
    \`plot-gaussian\`, 
    \`density-plot-element\`, {
      fn: "gaussian()",
      editable: true
  });
<\/script>
<div class="tip">
<ul>
<li>API Reference <a href="https://clinth.github.io/ixfx/modules/Random.html">Random module</a></li>
<li><a href="https://fn-vis.pages.dev/1/#H4sIAARX3mQAAzWMQQ6CMBAAv7LhQpsYileN3jn4AjGhsaVU7bZ2FyUh/F1NZE5zmTkXPqSYGWZ4W+8GtgYW6HMMUA7MiXZKjZjurrrGoPzUT8p4YpU1mhiqG5X7Fslyg2zzSz+EkIcjzC0CpEh8skTaWbG+RfcctWmwk/LbLZttXf8E/hSXD2v+IIiQAAAA">fn-vis</a>: useful for seeing output values</li>
</ul>
</div>
<p>Javascript's go-to source of randomness is <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random"><code is:raw>Math.random()</code></a> which returns a random number equal or above 0 and less than 1. This is perfect for uniform distribution on a percentage scale.</p>
<p>We sometimes want the values on a different scale. Ixfx has a few helper functions for this common need:</p>
<pre class="language-js"><code is:raw class="language-js"><span class="token comment">// repl-pad</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> integer<span class="token punctuation">,</span> float <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'https://unpkg.com/ixfx/dist/random.js'</span><span class="token punctuation">;</span>
<span class="token function">integer</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Random integer value 0..&lt;10</span>
<span class="token function">float</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Random floating point number 0..&lt;100 </span></code></pre>
<h2 id="weighted-distributions">Weighted distributions</h2>
<p>Another issue with <code is:raw>Math.random</code> is it's roughly even distribution. You can see this below, the horizontal axis shows values from 0 on the left to 1 on the right. Note how the plot mostly fills out evenly along the horizontal axis.</p>
<!-- 
<density-plot-element id="plot1" view="linear" client:visible fn="weightedInteger(10);" /> -->
<div id="plot1"></div>
<div class="tip">
<a href="https://fn-vis.pages.dev/1/#H4sIAARX3mQAAzWMQQ6CMBAAv7LhQpsYileN3jn4AjGhsaVU7bZ2FyUh/F1NZE5zmTkXPqSYGWZ4W+8GtgYW6HMMUA7MiXZKjZjurrrGoPzUT8p4YpU1mhiqG5X7Fslyg2zzSz+EkIcjzC0CpEh8skTaWbG+RfcctWmwk/LbLZttXf8E/hSXD2v+IIiQAAAA">Try out some of these examples in the plotter</a>
</div><p></p>
<p>To make some numbers more likely than others, you may want some form of <em>weighted distribution</em>.</p>
<p>ixfx's <a href="https://clinth.github.io/ixfx/modules/Random.html#weighted"><code is:raw>Random.weighted</code></a> uses an <a href="../../modulation/easing/">easing function</a> to shape random numbers.</p>
<p>When using the <em>quadIn</em> easing (the default), note how the density of random values skews toward 0, visually shown as the left-most part of the bar.</p>
<div id="plot2"></div>
<pre class="language-js"><code is:raw class="language-js"><span class="token comment">// repl-pad</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> weighted <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'https://unpkg.com/ixfx/dist/random.js'</span><span class="token punctuation">;</span>
<span class="token comment">// Yields 0-1 (inclusive) random number</span>
<span class="token function">weighted</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">quadIn</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">weighted</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">quadOut</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>
<p>Random integers (ie. whole numbers) can be produced with <a href="https://clinth.github.io/ixfx/modules/Random.html#weightedInteger"><code is:raw>Random.weightedInteger</code></a>. This is useful for producing random array indexes.</p>
<p>A range is provided to the function, with the return value always below the maximum (ie, it is <em>exclusive</em>). The minimum, 0 by default, might be returned (ie, it is <em>inclusive</em>).</p>
<pre class="language-js"><code is:raw class="language-js"><span class="token comment">// repl-pad</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> weightedInteger <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'https://unpkg.com/ixfx/dist/random.js'</span><span class="token punctuation">;</span>
<span class="token function">weightedInteger</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>      <span class="token comment">// 0-9</span>
<span class="token function">weightedInteger</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// 10-19</span>
<span class="token function">weightedInteger</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">,</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">quadIn</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>       <span class="token comment">// 0-99, specifying the easing function</span>
<span class="token function">weightedInteger</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">,</span> <span class="token number">200</span><span class="token punctuation">,</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">quadOut</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 100-199, specifying the easing function</span></code></pre>
<p>To use for accessing an array randomly:</p>
<pre class="language-js"><code is:raw class="language-js"><span class="token keyword">const</span> list <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">mango</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">kiwi</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">grape</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token comment">// Yields random item from list</span>
list<span class="token punctuation">[</span><span class="token function">weightedInteger</span><span class="token punctuation">(</span>list<span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">;</span></code></pre>
<h3 id="gaussian">Gaussian</h3>
<div class="tip">
<a href="https://fn-vis.pages.dev/1/#H4sIAPRW3mQAA1WPzQrCMBCEX2XZiy1Eo9eK3j34BLaHYNMabX7obqUQ8u6mooJ72hm+GZhLROtbjRWGwTMmEdEp+9MCjTNs1IBVTGJBCaucaTVxZtaYGvEWi91kwtjgR4YIvZqIjHKQoBu9hdWNOVAl5eTCo99cvZVm7mbZGmI5Ktd6u7nTal870nxyrMenGoqiPBwh1g4geOKzJlK9Lr7dRVlmPonddrs88DnMI/5GNS8ZCjbg5gAAAA==">Try out some of these examples in the plotter</a>
</div><p></p>
<p>Gaussian distribution has a 'bell curve' shape, centred around the middle. In other words, you'd expect to get more random values around 0.5 than 0 or 1. ixfx's <a href="https://clinth.github.io/ixfx/modules/Random.html#gaussian"><code is:raw>Random.gaussian</code></a> provides this.</p>
<div id="plot-gaussian"></div>
<pre class="language-js"><code is:raw class="language-js"><span class="token comment">// repl-pad#2</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> gaussian <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'https://unpkg.com/ixfx/dist/random.js'</span><span class="token punctuation">;</span>

<span class="token comment">// Yields a random number between 0..1</span>
<span class="token function">gaussian</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>
<p>The function takes a <em>skew</em> parameter which shifts the centre of the curve.</p>
<pre class="language-js"><code is:raw class="language-js"><span class="token comment">// repl-pad#2</span>
<span class="token comment">// Shifts distribution to right, closer to 1</span>
<span class="token function">gaussian</span><span class="token punctuation">(</span><span class="token number">0.1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// Shifts distribution to the left, closer to 0</span>
<span class="token function">gaussian</span><span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>
<h3 id="more-random">More random</h3>
<pre class="language-js"><code is:raw class="language-js"><span class="token comment">// repl-pad</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> minutesMs<span class="token punctuation">,</span> secondsMs <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'https://unpkg.com/ixfx/dist/random.js'</span><span class="token punctuation">;</span>
<span class="token comment">// minutesMs and secondsMs compute random millisecond values</span>
<span class="token function">minutesMs</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Random timeout of up to 5 minutes</span>
<span class="token function">secondsMs</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Random timeout of up to 5 seconds</span></code></pre>
<p>With arrays</p>
<pre class="language-js"><code is:raw class="language-js"><span class="token comment">// repl-pad</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> arrayElement<span class="token punctuation">,</span> arrayIndex<span class="token punctuation">,</span> integerUniqueGen <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'https://unpkg.com/ixfx/dist/random.js'</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> v <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">blue</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">red</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">orange</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token function">arrayElement</span><span class="token punctuation">(</span>v<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Returns a random value</span>
<span class="token function">arrayIndex</span><span class="token punctuation">(</span>v<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Random array index</span>

<span class="token comment">// Produce unique set of random integers 0..&lt;10</span>
<span class="token keyword">const</span> values <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token operator">...</span><span class="token function">integerUniqueGen</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">;</span></code></pre>
<p>Other values:</p>
<pre class="language-js"><code is:raw class="language-js"><span class="token comment">// repl-pad</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> hue<span class="token punctuation">,</span> string <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'https://unpkg.com/ixfx/dist/random.js'</span><span class="token punctuation">;</span>

<span class="token function">hue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Compute random hue value 0...359</span>
<span class="token function">string</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Random string 10 letters long</span></code></pre>` };
const frontmatter = { "title": "Random", "astro": { "headers": [{ "depth": 2, "slug": "weighted-distributions", "text": "Weighted distributions" }, { "depth": 3, "slug": "gaussian", "text": "Gaussian" }, { "depth": 3, "slug": "more-random", "text": "More random" }], "source": '\n<script type="module" hoist>\n  import \'/src/components/ReplPad\';\n  import \'/src/loader\';\n  import \'/src/components/DensityPlotElement\';\n  import {weightedInteger, weighted, gaussian} from \'/node_modules/ixfx/dist/random.js\';\n  import {Easings} from \'/node_modules/ixfx/dist/modulation.js\';\n  window.weightedInteger = weightedInteger;\n  window.weighted = weighted;\n  window.Easings = Easings;\n  window.gaussian = gaussian;\n  importEl(\n    `plot1`, \n    `density-plot-element`, {\n      fn: "Math.random()"\n  });\n  importEl(\n    `plot2`, \n    `density-plot-element`, {\n      fn: "weighted(\'quadIn\')",\n      editable: true\n  });\n  importEl(\n    `plot-gaussian`, \n    `density-plot-element`, {\n      fn: "gaussian()",\n      editable: true\n  });\n<\/script>\n\n<div class="tip">\n<ul>\n<li>API Reference <a href="https://clinth.github.io/ixfx/modules/Random.html">Random module</a></li>\n<li><a href="https://fn-vis.pages.dev/1/#H4sIAARX3mQAAzWMQQ6CMBAAv7LhQpsYileN3jn4AjGhsaVU7bZ2FyUh/F1NZE5zmTkXPqSYGWZ4W+8GtgYW6HMMUA7MiXZKjZjurrrGoPzUT8p4YpU1mhiqG5X7Fslyg2zzSz+EkIcjzC0CpEh8skTaWbG+RfcctWmwk/LbLZttXf8E/hSXD2v+IIiQAAAA">fn-vis</a>: useful for seeing output values</li>\n</ul>\n</div>\n\nJavascript\'s go-to source of randomness is [`Math.random()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random) which returns a random number equal or above 0 and less than 1. This is perfect for uniform distribution on a percentage scale.\n\nWe sometimes want the values on a different scale. Ixfx has a few helper functions for this common need:\n```js\n// repl-pad\nimport { integer, float } from \'https://unpkg.com/ixfx/dist/random.js\';\ninteger(10); // Random integer value 0..<10\nfloat(100); // Random floating point number 0..<100 \n```\n\n## Weighted distributions\n\nAnother issue with `Math.random` is it\'s roughly even distribution. You can see this below, the horizontal axis shows values from 0 on the left to 1 on the right. Note how the plot mostly fills out evenly along the horizontal axis.\n\n<!-- \n<density-plot-element id="plot1" view="linear" client:visible fn="weightedInteger(10);" /> -->\n\n<div id="plot1"></div>\n\n<div class="tip">\n<a href="https://fn-vis.pages.dev/1/#H4sIAARX3mQAAzWMQQ6CMBAAv7LhQpsYileN3jn4AjGhsaVU7bZ2FyUh/F1NZE5zmTkXPqSYGWZ4W+8GtgYW6HMMUA7MiXZKjZjurrrGoPzUT8p4YpU1mhiqG5X7Fslyg2zzSz+EkIcjzC0CpEh8skTaWbG+RfcctWmwk/LbLZttXf8E/hSXD2v+IIiQAAAA">Try out some of these examples in the plotter</a>\n</div><p></p>\n\nTo make some numbers more likely than others, you may want some form of _weighted distribution_. \n\nixfx\'s [`Random.weighted`](https://clinth.github.io/ixfx/modules/Random.html#weighted) uses an [easing function](../../modulation/easing/) to shape random numbers.\n\nWhen using the _quadIn_ easing (the default), note how the density of random values skews toward 0, visually shown as the left-most part of the bar.\n\n<div id="plot2"></div>\n\n```js\n// repl-pad\nimport { weighted } from \'https://unpkg.com/ixfx/dist/random.js\';\n// Yields 0-1 (inclusive) random number\nweighted(`quadIn`);\nweighted(`quadOut`);\n```\n\nRandom integers (ie. whole numbers) can be produced with [`Random.weightedInteger`](https://clinth.github.io/ixfx/modules/Random.html#weightedInteger). This is useful for producing random array indexes.\n\nA range is provided to the function, with the return value always below the maximum (ie, it is _exclusive_). The minimum, 0 by default, might be returned (ie, it is _inclusive_).\n\n```js\n// repl-pad\nimport { weightedInteger } from \'https://unpkg.com/ixfx/dist/random.js\';\nweightedInteger(10);      // 0-9\nweightedInteger(10, 20);  // 10-19\nweightedInteger(100, `quadIn`);       // 0-99, specifying the easing function\nweightedInteger(100, 200, `quadOut`); // 100-199, specifying the easing function\n```\n\nTo use for accessing an array randomly:\n```js\nconst list = [`mango`, `kiwi`, `grape`];\n// Yields random item from list\nlist[weightedInteger(list.length)];\n```\n\n### Gaussian\n\n<div class="tip">\n<a href="https://fn-vis.pages.dev/1/#H4sIAPRW3mQAA1WPzQrCMBCEX2XZiy1Eo9eK3j34BLaHYNMabX7obqUQ8u6mooJ72hm+GZhLROtbjRWGwTMmEdEp+9MCjTNs1IBVTGJBCaucaTVxZtaYGvEWi91kwtjgR4YIvZqIjHKQoBu9hdWNOVAl5eTCo99cvZVm7mbZGmI5Ktd6u7nTal870nxyrMenGoqiPBwh1g4geOKzJlK9Lr7dRVlmPonddrs88DnMI/5GNS8ZCjbg5gAAAA==">Try out some of these examples in the plotter</a>\n</div><p></p>\n\nGaussian distribution has a \'bell curve\' shape, centred around the middle. In other words, you\'d expect to get more random values around 0.5 than 0 or 1. ixfx\'s [`Random.gaussian`](https://clinth.github.io/ixfx/modules/Random.html#gaussian) provides this.\n\n<div id="plot-gaussian"></div>\n\n```js\n// repl-pad#2\nimport { gaussian } from \'https://unpkg.com/ixfx/dist/random.js\';\n\n// Yields a random number between 0..1\ngaussian();\n```\n\nThe function takes a _skew_ parameter which shifts the centre of the curve.\n\n```js\n// repl-pad#2\n// Shifts distribution to right, closer to 1\ngaussian(0.1);\n// Shifts distribution to the left, closer to 0\ngaussian(6);\n```\n\n### More random\n\n```js\n// repl-pad\nimport { minutesMs, secondsMs } from \'https://unpkg.com/ixfx/dist/random.js\';\n// minutesMs and secondsMs compute random millisecond values\nminutesMs(5); // Random timeout of up to 5 minutes\nsecondsMs(5); // Random timeout of up to 5 seconds\n```\n\nWith arrays\n\n```js\n// repl-pad\nimport { arrayElement, arrayIndex, integerUniqueGen } from \'https://unpkg.com/ixfx/dist/random.js\';\n\nconst v = [`blue`, `red`, `orange`];\n\narrayElement(v); // Returns a random value\narrayIndex(v); // Random array index\n\n// Produce unique set of random integers 0..<10\nconst values = [...integerUniqueGen(10)];\n```\n\nOther values:\n```js\n// repl-pad\nimport { hue, string } from \'https://unpkg.com/ixfx/dist/random.js\';\n\nhue(); // Compute random hue value 0...359\nstring(10); // Random string 10 letters long\n```', "html": `<script type="module" hoist>
  import '/src/components/ReplPad';
  import '/src/loader';
  import '/src/components/DensityPlotElement';
  import {weightedInteger, weighted, gaussian} from '/node_modules/ixfx/dist/random.js';
  import {Easings} from '/node_modules/ixfx/dist/modulation.js';
  window.weightedInteger = weightedInteger;
  window.weighted = weighted;
  window.Easings = Easings;
  window.gaussian = gaussian;
  importEl(
    \`plot1\`, 
    \`density-plot-element\`, {
      fn: "Math.random()"
  });
  importEl(
    \`plot2\`, 
    \`density-plot-element\`, {
      fn: "weighted('quadIn')",
      editable: true
  });
  importEl(
    \`plot-gaussian\`, 
    \`density-plot-element\`, {
      fn: "gaussian()",
      editable: true
  });
<\/script>
<div class="tip">
<ul>
<li>API Reference <a href="https://clinth.github.io/ixfx/modules/Random.html">Random module</a></li>
<li><a href="https://fn-vis.pages.dev/1/#H4sIAARX3mQAAzWMQQ6CMBAAv7LhQpsYileN3jn4AjGhsaVU7bZ2FyUh/F1NZE5zmTkXPqSYGWZ4W+8GtgYW6HMMUA7MiXZKjZjurrrGoPzUT8p4YpU1mhiqG5X7Fslyg2zzSz+EkIcjzC0CpEh8skTaWbG+RfcctWmwk/LbLZttXf8E/hSXD2v+IIiQAAAA">fn-vis</a>: useful for seeing output values</li>
</ul>
</div>
<p>Javascript's go-to source of randomness is <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random"><code is:raw>Math.random()</code></a> which returns a random number equal or above 0 and less than 1. This is perfect for uniform distribution on a percentage scale.</p>
<p>We sometimes want the values on a different scale. Ixfx has a few helper functions for this common need:</p>
<pre class="language-js"><code is:raw class="language-js"><span class="token comment">// repl-pad</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> integer<span class="token punctuation">,</span> float <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'https://unpkg.com/ixfx/dist/random.js'</span><span class="token punctuation">;</span>
<span class="token function">integer</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Random integer value 0..&lt;10</span>
<span class="token function">float</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Random floating point number 0..&lt;100 </span></code></pre>
<h2 id="weighted-distributions">Weighted distributions</h2>
<p>Another issue with <code is:raw>Math.random</code> is it's roughly even distribution. You can see this below, the horizontal axis shows values from 0 on the left to 1 on the right. Note how the plot mostly fills out evenly along the horizontal axis.</p>
<!-- 
<density-plot-element id="plot1" view="linear" client:visible fn="weightedInteger(10);" /> -->
<div id="plot1"></div>
<div class="tip">
<a href="https://fn-vis.pages.dev/1/#H4sIAARX3mQAAzWMQQ6CMBAAv7LhQpsYileN3jn4AjGhsaVU7bZ2FyUh/F1NZE5zmTkXPqSYGWZ4W+8GtgYW6HMMUA7MiXZKjZjurrrGoPzUT8p4YpU1mhiqG5X7Fslyg2zzSz+EkIcjzC0CpEh8skTaWbG+RfcctWmwk/LbLZttXf8E/hSXD2v+IIiQAAAA">Try out some of these examples in the plotter</a>
</div><p></p>
<p>To make some numbers more likely than others, you may want some form of <em>weighted distribution</em>.</p>
<p>ixfx's <a href="https://clinth.github.io/ixfx/modules/Random.html#weighted"><code is:raw>Random.weighted</code></a> uses an <a href="../../modulation/easing/">easing function</a> to shape random numbers.</p>
<p>When using the <em>quadIn</em> easing (the default), note how the density of random values skews toward 0, visually shown as the left-most part of the bar.</p>
<div id="plot2"></div>
<pre class="language-js"><code is:raw class="language-js"><span class="token comment">// repl-pad</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> weighted <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'https://unpkg.com/ixfx/dist/random.js'</span><span class="token punctuation">;</span>
<span class="token comment">// Yields 0-1 (inclusive) random number</span>
<span class="token function">weighted</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">quadIn</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">weighted</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">quadOut</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>
<p>Random integers (ie. whole numbers) can be produced with <a href="https://clinth.github.io/ixfx/modules/Random.html#weightedInteger"><code is:raw>Random.weightedInteger</code></a>. This is useful for producing random array indexes.</p>
<p>A range is provided to the function, with the return value always below the maximum (ie, it is <em>exclusive</em>). The minimum, 0 by default, might be returned (ie, it is <em>inclusive</em>).</p>
<pre class="language-js"><code is:raw class="language-js"><span class="token comment">// repl-pad</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> weightedInteger <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'https://unpkg.com/ixfx/dist/random.js'</span><span class="token punctuation">;</span>
<span class="token function">weightedInteger</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>      <span class="token comment">// 0-9</span>
<span class="token function">weightedInteger</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// 10-19</span>
<span class="token function">weightedInteger</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">,</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">quadIn</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>       <span class="token comment">// 0-99, specifying the easing function</span>
<span class="token function">weightedInteger</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">,</span> <span class="token number">200</span><span class="token punctuation">,</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">quadOut</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 100-199, specifying the easing function</span></code></pre>
<p>To use for accessing an array randomly:</p>
<pre class="language-js"><code is:raw class="language-js"><span class="token keyword">const</span> list <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">mango</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">kiwi</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">grape</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token comment">// Yields random item from list</span>
list<span class="token punctuation">[</span><span class="token function">weightedInteger</span><span class="token punctuation">(</span>list<span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">;</span></code></pre>
<h3 id="gaussian">Gaussian</h3>
<div class="tip">
<a href="https://fn-vis.pages.dev/1/#H4sIAPRW3mQAA1WPzQrCMBCEX2XZiy1Eo9eK3j34BLaHYNMabX7obqUQ8u6mooJ72hm+GZhLROtbjRWGwTMmEdEp+9MCjTNs1IBVTGJBCaucaTVxZtaYGvEWi91kwtjgR4YIvZqIjHKQoBu9hdWNOVAl5eTCo99cvZVm7mbZGmI5Ktd6u7nTal870nxyrMenGoqiPBwh1g4geOKzJlK9Lr7dRVlmPonddrs88DnMI/5GNS8ZCjbg5gAAAA==">Try out some of these examples in the plotter</a>
</div><p></p>
<p>Gaussian distribution has a 'bell curve' shape, centred around the middle. In other words, you'd expect to get more random values around 0.5 than 0 or 1. ixfx's <a href="https://clinth.github.io/ixfx/modules/Random.html#gaussian"><code is:raw>Random.gaussian</code></a> provides this.</p>
<div id="plot-gaussian"></div>
<pre class="language-js"><code is:raw class="language-js"><span class="token comment">// repl-pad#2</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> gaussian <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'https://unpkg.com/ixfx/dist/random.js'</span><span class="token punctuation">;</span>

<span class="token comment">// Yields a random number between 0..1</span>
<span class="token function">gaussian</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>
<p>The function takes a <em>skew</em> parameter which shifts the centre of the curve.</p>
<pre class="language-js"><code is:raw class="language-js"><span class="token comment">// repl-pad#2</span>
<span class="token comment">// Shifts distribution to right, closer to 1</span>
<span class="token function">gaussian</span><span class="token punctuation">(</span><span class="token number">0.1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// Shifts distribution to the left, closer to 0</span>
<span class="token function">gaussian</span><span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>
<h3 id="more-random">More random</h3>
<pre class="language-js"><code is:raw class="language-js"><span class="token comment">// repl-pad</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> minutesMs<span class="token punctuation">,</span> secondsMs <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'https://unpkg.com/ixfx/dist/random.js'</span><span class="token punctuation">;</span>
<span class="token comment">// minutesMs and secondsMs compute random millisecond values</span>
<span class="token function">minutesMs</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Random timeout of up to 5 minutes</span>
<span class="token function">secondsMs</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Random timeout of up to 5 seconds</span></code></pre>
<p>With arrays</p>
<pre class="language-js"><code is:raw class="language-js"><span class="token comment">// repl-pad</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> arrayElement<span class="token punctuation">,</span> arrayIndex<span class="token punctuation">,</span> integerUniqueGen <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'https://unpkg.com/ixfx/dist/random.js'</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> v <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">blue</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">red</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">orange</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token function">arrayElement</span><span class="token punctuation">(</span>v<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Returns a random value</span>
<span class="token function">arrayIndex</span><span class="token punctuation">(</span>v<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Random array index</span>

<span class="token comment">// Produce unique set of random integers 0..&lt;10</span>
<span class="token keyword">const</span> values <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token operator">...</span><span class="token function">integerUniqueGen</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">;</span></code></pre>
<p>Other values:</p>
<pre class="language-js"><code is:raw class="language-js"><span class="token comment">// repl-pad</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> hue<span class="token punctuation">,</span> string <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'https://unpkg.com/ixfx/dist/random.js'</span><span class="token punctuation">;</span>

<span class="token function">hue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Compute random hue value 0...359</span>
<span class="token function">string</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Random string 10 letters long</span></code></pre>` } };
const $$metadata = createMetadata("/src/pages/gen/random.md", { modules: [{ module: $$module1, specifier: "../../layouts/MainLayout.astro", assert: {} }, { module: $$module2, specifier: "../../components/DensityPlotElement", assert: {} }], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [{ type: "inline", value: `
  import '/src/components/ReplPad';
  import '/src/loader';
  import '/src/components/DensityPlotElement';
  import {weightedInteger, weighted, gaussian} from '/node_modules/ixfx/dist/random.js';
  import {Easings} from '/node_modules/ixfx/dist/modulation.js';
  window.weightedInteger = weightedInteger;
  window.weighted = weighted;
  window.Easings = Easings;
  window.gaussian = gaussian;
  importEl(
    \`plot1\`, 
    \`density-plot-element\`, {
      fn: "Math.random()"
  });
  importEl(
    \`plot2\`, 
    \`density-plot-element\`, {
      fn: "weighted('quadIn')",
      editable: true
  });
  importEl(
    \`plot-gaussian\`, 
    \`density-plot-element\`, {
      fn: "gaussian()",
      editable: true
  });
` }] });
const $$Astro = createAstro("/src/pages/gen/random.md", "https://clinth.github.io/ixfx-docs/", "file:///Users/af4766/repos/ixfx-docs/");
const $$Random = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Random;
  const $$content = { "title": "Random", "astro": { "headers": [{ "depth": 2, "slug": "weighted-distributions", "text": "Weighted distributions" }, { "depth": 3, "slug": "gaussian", "text": "Gaussian" }, { "depth": 3, "slug": "more-random", "text": "More random" }], "source": '\n<script type="module" hoist>\n  import \'/src/components/ReplPad\';\n  import \'/src/loader\';\n  import \'/src/components/DensityPlotElement\';\n  import {weightedInteger, weighted, gaussian} from \'/node_modules/ixfx/dist/random.js\';\n  import {Easings} from \'/node_modules/ixfx/dist/modulation.js\';\n  window.weightedInteger = weightedInteger;\n  window.weighted = weighted;\n  window.Easings = Easings;\n  window.gaussian = gaussian;\n  importEl(\n    `plot1`, \n    `density-plot-element`, {\n      fn: "Math.random()"\n  });\n  importEl(\n    `plot2`, \n    `density-plot-element`, {\n      fn: "weighted(\'quadIn\')",\n      editable: true\n  });\n  importEl(\n    `plot-gaussian`, \n    `density-plot-element`, {\n      fn: "gaussian()",\n      editable: true\n  });\n<\/script>\n\n<div class="tip">\n<ul>\n<li>API Reference <a href="https://clinth.github.io/ixfx/modules/Random.html">Random module</a></li>\n<li><a href="https://fn-vis.pages.dev/1/#H4sIAARX3mQAAzWMQQ6CMBAAv7LhQpsYileN3jn4AjGhsaVU7bZ2FyUh/F1NZE5zmTkXPqSYGWZ4W+8GtgYW6HMMUA7MiXZKjZjurrrGoPzUT8p4YpU1mhiqG5X7Fslyg2zzSz+EkIcjzC0CpEh8skTaWbG+RfcctWmwk/LbLZttXf8E/hSXD2v+IIiQAAAA">fn-vis</a>: useful for seeing output values</li>\n</ul>\n</div>\n\nJavascript\'s go-to source of randomness is [`Math.random()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random) which returns a random number equal or above 0 and less than 1. This is perfect for uniform distribution on a percentage scale.\n\nWe sometimes want the values on a different scale. Ixfx has a few helper functions for this common need:\n```js\n// repl-pad\nimport { integer, float } from \'https://unpkg.com/ixfx/dist/random.js\';\ninteger(10); // Random integer value 0..<10\nfloat(100); // Random floating point number 0..<100 \n```\n\n## Weighted distributions\n\nAnother issue with `Math.random` is it\'s roughly even distribution. You can see this below, the horizontal axis shows values from 0 on the left to 1 on the right. Note how the plot mostly fills out evenly along the horizontal axis.\n\n<!-- \n<density-plot-element id="plot1" view="linear" client:visible fn="weightedInteger(10);" /> -->\n\n<div id="plot1"></div>\n\n<div class="tip">\n<a href="https://fn-vis.pages.dev/1/#H4sIAARX3mQAAzWMQQ6CMBAAv7LhQpsYileN3jn4AjGhsaVU7bZ2FyUh/F1NZE5zmTkXPqSYGWZ4W+8GtgYW6HMMUA7MiXZKjZjurrrGoPzUT8p4YpU1mhiqG5X7Fslyg2zzSz+EkIcjzC0CpEh8skTaWbG+RfcctWmwk/LbLZttXf8E/hSXD2v+IIiQAAAA">Try out some of these examples in the plotter</a>\n</div><p></p>\n\nTo make some numbers more likely than others, you may want some form of _weighted distribution_. \n\nixfx\'s [`Random.weighted`](https://clinth.github.io/ixfx/modules/Random.html#weighted) uses an [easing function](../../modulation/easing/) to shape random numbers.\n\nWhen using the _quadIn_ easing (the default), note how the density of random values skews toward 0, visually shown as the left-most part of the bar.\n\n<div id="plot2"></div>\n\n```js\n// repl-pad\nimport { weighted } from \'https://unpkg.com/ixfx/dist/random.js\';\n// Yields 0-1 (inclusive) random number\nweighted(`quadIn`);\nweighted(`quadOut`);\n```\n\nRandom integers (ie. whole numbers) can be produced with [`Random.weightedInteger`](https://clinth.github.io/ixfx/modules/Random.html#weightedInteger). This is useful for producing random array indexes.\n\nA range is provided to the function, with the return value always below the maximum (ie, it is _exclusive_). The minimum, 0 by default, might be returned (ie, it is _inclusive_).\n\n```js\n// repl-pad\nimport { weightedInteger } from \'https://unpkg.com/ixfx/dist/random.js\';\nweightedInteger(10);      // 0-9\nweightedInteger(10, 20);  // 10-19\nweightedInteger(100, `quadIn`);       // 0-99, specifying the easing function\nweightedInteger(100, 200, `quadOut`); // 100-199, specifying the easing function\n```\n\nTo use for accessing an array randomly:\n```js\nconst list = [`mango`, `kiwi`, `grape`];\n// Yields random item from list\nlist[weightedInteger(list.length)];\n```\n\n### Gaussian\n\n<div class="tip">\n<a href="https://fn-vis.pages.dev/1/#H4sIAPRW3mQAA1WPzQrCMBCEX2XZiy1Eo9eK3j34BLaHYNMabX7obqUQ8u6mooJ72hm+GZhLROtbjRWGwTMmEdEp+9MCjTNs1IBVTGJBCaucaTVxZtaYGvEWi91kwtjgR4YIvZqIjHKQoBu9hdWNOVAl5eTCo99cvZVm7mbZGmI5Ktd6u7nTal870nxyrMenGoqiPBwh1g4geOKzJlK9Lr7dRVlmPonddrs88DnMI/5GNS8ZCjbg5gAAAA==">Try out some of these examples in the plotter</a>\n</div><p></p>\n\nGaussian distribution has a \'bell curve\' shape, centred around the middle. In other words, you\'d expect to get more random values around 0.5 than 0 or 1. ixfx\'s [`Random.gaussian`](https://clinth.github.io/ixfx/modules/Random.html#gaussian) provides this.\n\n<div id="plot-gaussian"></div>\n\n```js\n// repl-pad#2\nimport { gaussian } from \'https://unpkg.com/ixfx/dist/random.js\';\n\n// Yields a random number between 0..1\ngaussian();\n```\n\nThe function takes a _skew_ parameter which shifts the centre of the curve.\n\n```js\n// repl-pad#2\n// Shifts distribution to right, closer to 1\ngaussian(0.1);\n// Shifts distribution to the left, closer to 0\ngaussian(6);\n```\n\n### More random\n\n```js\n// repl-pad\nimport { minutesMs, secondsMs } from \'https://unpkg.com/ixfx/dist/random.js\';\n// minutesMs and secondsMs compute random millisecond values\nminutesMs(5); // Random timeout of up to 5 minutes\nsecondsMs(5); // Random timeout of up to 5 seconds\n```\n\nWith arrays\n\n```js\n// repl-pad\nimport { arrayElement, arrayIndex, integerUniqueGen } from \'https://unpkg.com/ixfx/dist/random.js\';\n\nconst v = [`blue`, `red`, `orange`];\n\narrayElement(v); // Returns a random value\narrayIndex(v); // Random array index\n\n// Produce unique set of random integers 0..<10\nconst values = [...integerUniqueGen(10)];\n```\n\nOther values:\n```js\n// repl-pad\nimport { hue, string } from \'https://unpkg.com/ixfx/dist/random.js\';\n\nhue(); // Compute random hue value 0...359\nstring(10); // Random string 10 letters long\n```', "html": `<script type="module" hoist>
  import '/src/components/ReplPad';
  import '/src/loader';
  import '/src/components/DensityPlotElement';
  import {weightedInteger, weighted, gaussian} from '/node_modules/ixfx/dist/random.js';
  import {Easings} from '/node_modules/ixfx/dist/modulation.js';
  window.weightedInteger = weightedInteger;
  window.weighted = weighted;
  window.Easings = Easings;
  window.gaussian = gaussian;
  importEl(
    \`plot1\`, 
    \`density-plot-element\`, {
      fn: "Math.random()"
  });
  importEl(
    \`plot2\`, 
    \`density-plot-element\`, {
      fn: "weighted('quadIn')",
      editable: true
  });
  importEl(
    \`plot-gaussian\`, 
    \`density-plot-element\`, {
      fn: "gaussian()",
      editable: true
  });
<\/script>
<div class="tip">
<ul>
<li>API Reference <a href="https://clinth.github.io/ixfx/modules/Random.html">Random module</a></li>
<li><a href="https://fn-vis.pages.dev/1/#H4sIAARX3mQAAzWMQQ6CMBAAv7LhQpsYileN3jn4AjGhsaVU7bZ2FyUh/F1NZE5zmTkXPqSYGWZ4W+8GtgYW6HMMUA7MiXZKjZjurrrGoPzUT8p4YpU1mhiqG5X7Fslyg2zzSz+EkIcjzC0CpEh8skTaWbG+RfcctWmwk/LbLZttXf8E/hSXD2v+IIiQAAAA">fn-vis</a>: useful for seeing output values</li>
</ul>
</div>
<p>Javascript's go-to source of randomness is <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random"><code is:raw>Math.random()</code></a> which returns a random number equal or above 0 and less than 1. This is perfect for uniform distribution on a percentage scale.</p>
<p>We sometimes want the values on a different scale. Ixfx has a few helper functions for this common need:</p>
<pre class="language-js"><code is:raw class="language-js"><span class="token comment">// repl-pad</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> integer<span class="token punctuation">,</span> float <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'https://unpkg.com/ixfx/dist/random.js'</span><span class="token punctuation">;</span>
<span class="token function">integer</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Random integer value 0..&lt;10</span>
<span class="token function">float</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Random floating point number 0..&lt;100 </span></code></pre>
<h2 id="weighted-distributions">Weighted distributions</h2>
<p>Another issue with <code is:raw>Math.random</code> is it's roughly even distribution. You can see this below, the horizontal axis shows values from 0 on the left to 1 on the right. Note how the plot mostly fills out evenly along the horizontal axis.</p>
<!-- 
<density-plot-element id="plot1" view="linear" client:visible fn="weightedInteger(10);" /> -->
<div id="plot1"></div>
<div class="tip">
<a href="https://fn-vis.pages.dev/1/#H4sIAARX3mQAAzWMQQ6CMBAAv7LhQpsYileN3jn4AjGhsaVU7bZ2FyUh/F1NZE5zmTkXPqSYGWZ4W+8GtgYW6HMMUA7MiXZKjZjurrrGoPzUT8p4YpU1mhiqG5X7Fslyg2zzSz+EkIcjzC0CpEh8skTaWbG+RfcctWmwk/LbLZttXf8E/hSXD2v+IIiQAAAA">Try out some of these examples in the plotter</a>
</div><p></p>
<p>To make some numbers more likely than others, you may want some form of <em>weighted distribution</em>.</p>
<p>ixfx's <a href="https://clinth.github.io/ixfx/modules/Random.html#weighted"><code is:raw>Random.weighted</code></a> uses an <a href="../../modulation/easing/">easing function</a> to shape random numbers.</p>
<p>When using the <em>quadIn</em> easing (the default), note how the density of random values skews toward 0, visually shown as the left-most part of the bar.</p>
<div id="plot2"></div>
<pre class="language-js"><code is:raw class="language-js"><span class="token comment">// repl-pad</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> weighted <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'https://unpkg.com/ixfx/dist/random.js'</span><span class="token punctuation">;</span>
<span class="token comment">// Yields 0-1 (inclusive) random number</span>
<span class="token function">weighted</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">quadIn</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">weighted</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">quadOut</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>
<p>Random integers (ie. whole numbers) can be produced with <a href="https://clinth.github.io/ixfx/modules/Random.html#weightedInteger"><code is:raw>Random.weightedInteger</code></a>. This is useful for producing random array indexes.</p>
<p>A range is provided to the function, with the return value always below the maximum (ie, it is <em>exclusive</em>). The minimum, 0 by default, might be returned (ie, it is <em>inclusive</em>).</p>
<pre class="language-js"><code is:raw class="language-js"><span class="token comment">// repl-pad</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> weightedInteger <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'https://unpkg.com/ixfx/dist/random.js'</span><span class="token punctuation">;</span>
<span class="token function">weightedInteger</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>      <span class="token comment">// 0-9</span>
<span class="token function">weightedInteger</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// 10-19</span>
<span class="token function">weightedInteger</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">,</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">quadIn</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>       <span class="token comment">// 0-99, specifying the easing function</span>
<span class="token function">weightedInteger</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">,</span> <span class="token number">200</span><span class="token punctuation">,</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">quadOut</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 100-199, specifying the easing function</span></code></pre>
<p>To use for accessing an array randomly:</p>
<pre class="language-js"><code is:raw class="language-js"><span class="token keyword">const</span> list <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">mango</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">kiwi</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">grape</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token comment">// Yields random item from list</span>
list<span class="token punctuation">[</span><span class="token function">weightedInteger</span><span class="token punctuation">(</span>list<span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">;</span></code></pre>
<h3 id="gaussian">Gaussian</h3>
<div class="tip">
<a href="https://fn-vis.pages.dev/1/#H4sIAPRW3mQAA1WPzQrCMBCEX2XZiy1Eo9eK3j34BLaHYNMabX7obqUQ8u6mooJ72hm+GZhLROtbjRWGwTMmEdEp+9MCjTNs1IBVTGJBCaucaTVxZtaYGvEWi91kwtjgR4YIvZqIjHKQoBu9hdWNOVAl5eTCo99cvZVm7mbZGmI5Ktd6u7nTal870nxyrMenGoqiPBwh1g4geOKzJlK9Lr7dRVlmPonddrs88DnMI/5GNS8ZCjbg5gAAAA==">Try out some of these examples in the plotter</a>
</div><p></p>
<p>Gaussian distribution has a 'bell curve' shape, centred around the middle. In other words, you'd expect to get more random values around 0.5 than 0 or 1. ixfx's <a href="https://clinth.github.io/ixfx/modules/Random.html#gaussian"><code is:raw>Random.gaussian</code></a> provides this.</p>
<div id="plot-gaussian"></div>
<pre class="language-js"><code is:raw class="language-js"><span class="token comment">// repl-pad#2</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> gaussian <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'https://unpkg.com/ixfx/dist/random.js'</span><span class="token punctuation">;</span>

<span class="token comment">// Yields a random number between 0..1</span>
<span class="token function">gaussian</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>
<p>The function takes a <em>skew</em> parameter which shifts the centre of the curve.</p>
<pre class="language-js"><code is:raw class="language-js"><span class="token comment">// repl-pad#2</span>
<span class="token comment">// Shifts distribution to right, closer to 1</span>
<span class="token function">gaussian</span><span class="token punctuation">(</span><span class="token number">0.1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// Shifts distribution to the left, closer to 0</span>
<span class="token function">gaussian</span><span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>
<h3 id="more-random">More random</h3>
<pre class="language-js"><code is:raw class="language-js"><span class="token comment">// repl-pad</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> minutesMs<span class="token punctuation">,</span> secondsMs <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'https://unpkg.com/ixfx/dist/random.js'</span><span class="token punctuation">;</span>
<span class="token comment">// minutesMs and secondsMs compute random millisecond values</span>
<span class="token function">minutesMs</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Random timeout of up to 5 minutes</span>
<span class="token function">secondsMs</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Random timeout of up to 5 seconds</span></code></pre>
<p>With arrays</p>
<pre class="language-js"><code is:raw class="language-js"><span class="token comment">// repl-pad</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> arrayElement<span class="token punctuation">,</span> arrayIndex<span class="token punctuation">,</span> integerUniqueGen <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'https://unpkg.com/ixfx/dist/random.js'</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> v <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">blue</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">red</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">orange</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token function">arrayElement</span><span class="token punctuation">(</span>v<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Returns a random value</span>
<span class="token function">arrayIndex</span><span class="token punctuation">(</span>v<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Random array index</span>

<span class="token comment">// Produce unique set of random integers 0..&lt;10</span>
<span class="token keyword">const</span> values <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token operator">...</span><span class="token function">integerUniqueGen</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">;</span></code></pre>
<p>Other values:</p>
<pre class="language-js"><code is:raw class="language-js"><span class="token comment">// repl-pad</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> hue<span class="token punctuation">,</span> string <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'https://unpkg.com/ixfx/dist/random.js'</span><span class="token punctuation">;</span>

<span class="token function">hue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Compute random hue value 0...359</span>
<span class="token function">string</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Random string 10 letters long</span></code></pre>` } };
  const SCRIPTS = [
    { props: { "type": "module", "hoist": true }, children: `import '/src/components/ReplPad';
  import '/src/loader';
  import '/src/components/DensityPlotElement';
  import {weightedInteger, weighted, gaussian} from '/node_modules/ixfx/dist/random.js';
  import {Easings} from '/node_modules/ixfx/dist/modulation.js';
  window.weightedInteger = weightedInteger;
  window.weighted = weighted;
  window.Easings = Easings;
  window.gaussian = gaussian;
  importEl(
    \`plot1\`, 
    \`density-plot-element\`, {
      fn: "Math.random()"
  });
  importEl(
    \`plot2\`, 
    \`density-plot-element\`, {
      fn: "weighted('quadIn')",
      editable: true
  });
  importEl(
    \`plot-gaussian\`, 
    \`density-plot-element\`, {
      fn: "gaussian()",
      editable: true
  });` }
  ];
  for (const SCRIPT of SCRIPTS)
    $$result.scripts.add(SCRIPT);
  return render`${renderComponent($$result, "Layout", $$MainLayout, { "content": $$content }, { "default": () => render`<div class="tip">
<ul>
<li>API Reference <a href="https://clinth.github.io/ixfx/modules/Random.html">Random module</a></li>
<li><a href="https://fn-vis.pages.dev/1/#H4sIAARX3mQAAzWMQQ6CMBAAv7LhQpsYileN3jn4AjGhsaVU7bZ2FyUh/F1NZE5zmTkXPqSYGWZ4W+8GtgYW6HMMUA7MiXZKjZjurrrGoPzUT8p4YpU1mhiqG5X7Fslyg2zzSz+EkIcjzC0CpEh8skTaWbG+RfcctWmwk/LbLZttXf8E/hSXD2v+IIiQAAAA">fn-vis</a>: useful for seeing output values</li>
</ul>
</div><p>Javascript's go-to source of randomness is <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random"><code>Math.random()</code></a> which returns a random number equal or above 0 and less than 1. This is perfect for uniform distribution on a percentage scale.</p><p>We sometimes want the values on a different scale. Ixfx has a few helper functions for this common need:</p><pre class="language-js"><code class="language-js"><span class="token comment">// repl-pad</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> integer<span class="token punctuation">,</span> float <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'https://unpkg.com/ixfx/dist/random.js'</span><span class="token punctuation">;</span>
<span class="token function">integer</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Random integer value 0..&lt;10</span>
<span class="token function">float</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Random floating point number 0..&lt;100 </span></code></pre><h2 id="weighted-distributions">Weighted distributions</h2><p>Another issue with <code>Math.random</code> is it's roughly even distribution. You can see this below, the horizontal axis shows values from 0 on the left to 1 on the right. Note how the plot mostly fills out evenly along the horizontal axis.</p><div id="plot1"></div><div class="tip">
<a href="https://fn-vis.pages.dev/1/#H4sIAARX3mQAAzWMQQ6CMBAAv7LhQpsYileN3jn4AjGhsaVU7bZ2FyUh/F1NZE5zmTkXPqSYGWZ4W+8GtgYW6HMMUA7MiXZKjZjurrrGoPzUT8p4YpU1mhiqG5X7Fslyg2zzSz+EkIcjzC0CpEh8skTaWbG+RfcctWmwk/LbLZttXf8E/hSXD2v+IIiQAAAA">Try out some of these examples in the plotter</a>
</div><p></p><p>To make some numbers more likely than others, you may want some form of <em>weighted distribution</em>.</p><p>ixfx's <a href="https://clinth.github.io/ixfx/modules/Random.html#weighted"><code>Random.weighted</code></a> uses an <a href="../../modulation/easing/">easing function</a> to shape random numbers.</p><p>When using the <em>quadIn</em> easing (the default), note how the density of random values skews toward 0, visually shown as the left-most part of the bar.</p><div id="plot2"></div><pre class="language-js"><code class="language-js"><span class="token comment">// repl-pad</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> weighted <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'https://unpkg.com/ixfx/dist/random.js'</span><span class="token punctuation">;</span>
<span class="token comment">// Yields 0-1 (inclusive) random number</span>
<span class="token function">weighted</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">quadIn</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">weighted</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">quadOut</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre><p>Random integers (ie. whole numbers) can be produced with <a href="https://clinth.github.io/ixfx/modules/Random.html#weightedInteger"><code>Random.weightedInteger</code></a>. This is useful for producing random array indexes.</p><p>A range is provided to the function, with the return value always below the maximum (ie, it is <em>exclusive</em>). The minimum, 0 by default, might be returned (ie, it is <em>inclusive</em>).</p><pre class="language-js"><code class="language-js"><span class="token comment">// repl-pad</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> weightedInteger <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'https://unpkg.com/ixfx/dist/random.js'</span><span class="token punctuation">;</span>
<span class="token function">weightedInteger</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>      <span class="token comment">// 0-9</span>
<span class="token function">weightedInteger</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// 10-19</span>
<span class="token function">weightedInteger</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">,</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">quadIn</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>       <span class="token comment">// 0-99, specifying the easing function</span>
<span class="token function">weightedInteger</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">,</span> <span class="token number">200</span><span class="token punctuation">,</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">quadOut</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 100-199, specifying the easing function</span></code></pre><p>To use for accessing an array randomly:</p><pre class="language-js"><code class="language-js"><span class="token keyword">const</span> list <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">mango</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">kiwi</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">grape</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token comment">// Yields random item from list</span>
list<span class="token punctuation">[</span><span class="token function">weightedInteger</span><span class="token punctuation">(</span>list<span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">;</span></code></pre><h3 id="gaussian">Gaussian</h3><div class="tip">
<a href="https://fn-vis.pages.dev/1/#H4sIAPRW3mQAA1WPzQrCMBCEX2XZiy1Eo9eK3j34BLaHYNMabX7obqUQ8u6mooJ72hm+GZhLROtbjRWGwTMmEdEp+9MCjTNs1IBVTGJBCaucaTVxZtaYGvEWi91kwtjgR4YIvZqIjHKQoBu9hdWNOVAl5eTCo99cvZVm7mbZGmI5Ktd6u7nTal870nxyrMenGoqiPBwh1g4geOKzJlK9Lr7dRVlmPonddrs88DnMI/5GNS8ZCjbg5gAAAA==">Try out some of these examples in the plotter</a>
</div><p></p><p>Gaussian distribution has a 'bell curve' shape, centred around the middle. In other words, you'd expect to get more random values around 0.5 than 0 or 1. ixfx's <a href="https://clinth.github.io/ixfx/modules/Random.html#gaussian"><code>Random.gaussian</code></a> provides this.</p><div id="plot-gaussian"></div><pre class="language-js"><code class="language-js"><span class="token comment">// repl-pad#2</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> gaussian <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'https://unpkg.com/ixfx/dist/random.js'</span><span class="token punctuation">;</span>

<span class="token comment">// Yields a random number between 0..1</span>
<span class="token function">gaussian</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre><p>The function takes a <em>skew</em> parameter which shifts the centre of the curve.</p><pre class="language-js"><code class="language-js"><span class="token comment">// repl-pad#2</span>
<span class="token comment">// Shifts distribution to right, closer to 1</span>
<span class="token function">gaussian</span><span class="token punctuation">(</span><span class="token number">0.1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// Shifts distribution to the left, closer to 0</span>
<span class="token function">gaussian</span><span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre><h3 id="more-random">More random</h3><pre class="language-js"><code class="language-js"><span class="token comment">// repl-pad</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> minutesMs<span class="token punctuation">,</span> secondsMs <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'https://unpkg.com/ixfx/dist/random.js'</span><span class="token punctuation">;</span>
<span class="token comment">// minutesMs and secondsMs compute random millisecond values</span>
<span class="token function">minutesMs</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Random timeout of up to 5 minutes</span>
<span class="token function">secondsMs</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Random timeout of up to 5 seconds</span></code></pre><p>With arrays</p><pre class="language-js"><code class="language-js"><span class="token comment">// repl-pad</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> arrayElement<span class="token punctuation">,</span> arrayIndex<span class="token punctuation">,</span> integerUniqueGen <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'https://unpkg.com/ixfx/dist/random.js'</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> v <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">blue</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">red</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">orange</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token function">arrayElement</span><span class="token punctuation">(</span>v<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Returns a random value</span>
<span class="token function">arrayIndex</span><span class="token punctuation">(</span>v<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Random array index</span>

<span class="token comment">// Produce unique set of random integers 0..&lt;10</span>
<span class="token keyword">const</span> values <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token operator">...</span><span class="token function">integerUniqueGen</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">;</span></code></pre><p>Other values:</p><pre class="language-js"><code class="language-js"><span class="token comment">// repl-pad</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> hue<span class="token punctuation">,</span> string <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'https://unpkg.com/ixfx/dist/random.js'</span><span class="token punctuation">;</span>

<span class="token function">hue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Compute random hue value 0...359</span>
<span class="token function">string</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Random string 10 letters long</span></code></pre>` })}`;
});

export { $$metadata, $$Random as default, frontmatter, metadata };
