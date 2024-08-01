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

const metadata = { "headers": [], "source": "\n<script type=\"module\" hoist>\n  import '/src/components/ReplPad';\n  import '/src/loader';\n  import '/src/components/DensityPlotElement';\n  import {weightedInteger, weighted, gaussian} from '/node_modules/ixfx/dist/random.js';\n  import {jitter, Easings} from '/node_modules/ixfx/dist/modulation.js';\n  window.weightedInteger = weightedInteger;\n  window.weighted = weighted;\n  window.jitter = jitter;\n  window.Easings = Easings;\n  window.gaussian = gaussian;\n  importEl(\n  `plot3`, \n  `density-plot-element`, {\n    fn: \"jitter({ relative: 0.2})(0.5)\",\n    scaleMin: 0,\n    scaleMax: 1,\n    editable: true\n  });\n  importEl(\n    `plot4`, \n    `density-plot-element`, {\n      fn: \"jitter({ absolute: 0.2, source: gaussian })(0.5)\",\n      scaleMin: 0,\n      scaleMax: 1,\n      editable: true\n  });\n<\/script>\n\n<div class=\"tip\">\n<ul>\n<li>API Reference <a href=\"https://clinth.github.io/ixfx/functions/Modulation.jitter.html\">jitter function</a>, <a href=\"https://clinth.github.io/ixfx/modules/Modulation.html\">Modulation module</a></li>\n<li><a href=\"https://fn-vis.pages.dev/1/#H4sIADVU3mQAA42RQW/CMAyF/4qVC2WEBq5F7DhpB6TdVw5RayCQJl1tKqSq/31OGUy77RAp+eL3/Cx/DqqJNapCtT6yGvWggm2eb61ccOysV8Uw6lRKqhBNjcRSs1TjXk+PhPdS4Zo2dgzD2TFjN8Khiw3MTswtFcZcQ3s55lVsjLsdbqZ2xEY8r96yiyE/02xThodF5W3TaqDKevyPUW3Z/liUwSMDu+pCsIWVkCoGYjHBrwTy9RPdg74FwfdrNpQBYGqOdQHcXVEn0mFK2WOR5GUY52JByO9BNL31WTaH7StMYmPgo5OxKiRYrvM81QOkSL202Vk+5eRCNuVbLF5SquQG0/c0b9ZrUWpY//JH0Ky/s3TaSLxDInsURcKjSFar+UbJHv/sdf8NJX3U8OkBAAA=\">fn-vis</a>: useful for seeing output values</li>\n</ul>\n</div>\n\n_Jitter_ is the random modulation of a value. It is usually _bipolar_, meaning that it might shift a value upwards or downwards. \n\nOn a [normalised](../../data/normalising/) scale of 0..1 scale, let's say we want to apply jitter of 10% to a value of 0.5. If the jitter was to be absolute, that yields a potential new value of 0.4 - 0.6. An algorithm for this is:\n\n```js\n// repl-pad\nimport { clamp } from 'https://unpkg.com/ixfx/dist/bundle.js';\n\nconst jitter = (value, jitter) => {\n  // Double jitter in order to +- and apply random\n  const j = jitter * 2 * Math.random();\n  // Offset value, add j and clamp to 0-1\n  return clamp(value - jitter + j);\n}\n// Jitter a value of 50% by 10%\n// Yields a range of 0.4-0.6\njitter(0.5, 0.1);\n``` \n\nAnother option is to jitter by a relative amount, with respect to the input value. In that case, jittering 0.5 by 10% yields a range of 0.45 - 0.55, because 10% of 0.5 is 0.05. Thus for a given jitter amount, a larger input value will jitter more wildly than a smaller value, creating a sense of instability.\n\nixfx provides both of these approaches with [`jitter`](https://clinth.github.io/ixfx/functions/Modulation.jitter.html). \n\n```js\n// repl-pad\nimport { jitter } from 'https://unpkg.com/ixfx/dist/modulation.js';\n\n// Absolute jitter 0.5 by 10%\njitter({ absolute: 0.1 })(0.1); // number 0.4-0.6\n\n// Relative jitter 0.5 by 10%\njitter({ relative: 0.1 })(0.5); // number 0.45-0.55\n```\n\nRemember that `jitter` returns a function (which is why there's the double parenthesis in the example above). This is so the same jitter options can be reused without scattering them all over the place.\n\n```js\n// One-time setup\nconst jitterFn = jitter({ absolute: 0.1 });\n\n// Re-use the function when you like\njitterFn(100); // Jitter 100 by an absolute 10%;\njitterFn(50);  // Jitter 50 by an absolute 10%\n```\n\nTry adjusting the value-to-jitter and jitter amount:\n\n<div id=\"plot3\"></div>\n\nBy default `jitter` uses `Math.random`, but you could just as well plug in a [`weighted`](https://clinth.github.io/ixfx/functions/Random.weighted.html), or [`gaussian`](https://clinth.github.io/ixfx/functions/Random.gaussian.html) random number generator.\n\n```js\nimport { jitter } from 'https://unpkg.com/ixfx/dist/modulation.js';\nimport { gaussian } from 'https://unpkg.com/ixfx/dist/random.js';\n\n// Note we pass in as a function, so no () after gaussian\nconst jitterFn = jitter({ absolute:0.2, source: gaussian });\n```\n\nIn the plot below, notice how jitter is more likely to be close to the original value, instead of being evenly distributed across the whole specified jitter range. A more organic outcome?\n\n<div id=\"plot4\"></div>\n", "html": `<script type="module" hoist>
  import '/src/components/ReplPad';
  import '/src/loader';
  import '/src/components/DensityPlotElement';
  import {weightedInteger, weighted, gaussian} from '/node_modules/ixfx/dist/random.js';
  import {jitter, Easings} from '/node_modules/ixfx/dist/modulation.js';
  window.weightedInteger = weightedInteger;
  window.weighted = weighted;
  window.jitter = jitter;
  window.Easings = Easings;
  window.gaussian = gaussian;
  importEl(
  \`plot3\`, 
  \`density-plot-element\`, {
    fn: "jitter({ relative: 0.2})(0.5)",
    scaleMin: 0,
    scaleMax: 1,
    editable: true
  });
  importEl(
    \`plot4\`, 
    \`density-plot-element\`, {
      fn: "jitter({ absolute: 0.2, source: gaussian })(0.5)",
      scaleMin: 0,
      scaleMax: 1,
      editable: true
  });
<\/script>
<div class="tip">
<ul>
<li>API Reference <a href="https://clinth.github.io/ixfx/functions/Modulation.jitter.html">jitter function</a>, <a href="https://clinth.github.io/ixfx/modules/Modulation.html">Modulation module</a></li>
<li><a href="https://fn-vis.pages.dev/1/#H4sIADVU3mQAA42RQW/CMAyF/4qVC2WEBq5F7DhpB6TdVw5RayCQJl1tKqSq/31OGUy77RAp+eL3/Cx/DqqJNapCtT6yGvWggm2eb61ccOysV8Uw6lRKqhBNjcRSs1TjXk+PhPdS4Zo2dgzD2TFjN8Khiw3MTswtFcZcQ3s55lVsjLsdbqZ2xEY8r96yiyE/02xThodF5W3TaqDKevyPUW3Z/liUwSMDu+pCsIWVkCoGYjHBrwTy9RPdg74FwfdrNpQBYGqOdQHcXVEn0mFK2WOR5GUY52JByO9BNL31WTaH7StMYmPgo5OxKiRYrvM81QOkSL202Vk+5eRCNuVbLF5SquQG0/c0b9ZrUWpY//JH0Ky/s3TaSLxDInsURcKjSFar+UbJHv/sdf8NJX3U8OkBAAA=">fn-vis</a>: useful for seeing output values</li>
</ul>
</div>
<p><em>Jitter</em> is the random modulation of a value. It is usually <em>bipolar</em>, meaning that it might shift a value upwards or downwards.</p>
<p>On a <a href="../../data/normalising/">normalised</a> scale of 0..1 scale, let's say we want to apply jitter of 10% to a value of 0.5. If the jitter was to be absolute, that yields a potential new value of 0.4 - 0.6. An algorithm for this is:</p>
<pre class="language-js"><code is:raw class="language-js"><span class="token comment">// repl-pad</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> clamp <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'https://unpkg.com/ixfx/dist/bundle.js'</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> <span class="token function-variable function">jitter</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">value<span class="token punctuation">,</span> jitter</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token comment">// Double jitter in order to +- and apply random</span>
  <span class="token keyword">const</span> j <span class="token operator">=</span> jitter <span class="token operator">*</span> <span class="token number">2</span> <span class="token operator">*</span> Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// Offset value, add j and clamp to 0-1</span>
  <span class="token keyword">return</span> <span class="token function">clamp</span><span class="token punctuation">(</span>value <span class="token operator">-</span> jitter <span class="token operator">+</span> j<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// Jitter a value of 50% by 10%</span>
<span class="token comment">// Yields a range of 0.4-0.6</span>
<span class="token function">jitter</span><span class="token punctuation">(</span><span class="token number">0.5</span><span class="token punctuation">,</span> <span class="token number">0.1</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>
<p>Another option is to jitter by a relative amount, with respect to the input value. In that case, jittering 0.5 by 10% yields a range of 0.45 - 0.55, because 10% of 0.5 is 0.05. Thus for a given jitter amount, a larger input value will jitter more wildly than a smaller value, creating a sense of instability.</p>
<p>ixfx provides both of these approaches with <a href="https://clinth.github.io/ixfx/functions/Modulation.jitter.html"><code is:raw>jitter</code></a>.</p>
<pre class="language-js"><code is:raw class="language-js"><span class="token comment">// repl-pad</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> jitter <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'https://unpkg.com/ixfx/dist/modulation.js'</span><span class="token punctuation">;</span>

<span class="token comment">// Absolute jitter 0.5 by 10%</span>
<span class="token function">jitter</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">absolute</span><span class="token operator">:</span> <span class="token number">0.1</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token number">0.1</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// number 0.4-0.6</span>

<span class="token comment">// Relative jitter 0.5 by 10%</span>
<span class="token function">jitter</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">relative</span><span class="token operator">:</span> <span class="token number">0.1</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token number">0.5</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// number 0.45-0.55</span></code></pre>
<p>Remember that <code is:raw>jitter</code> returns a function (which is why there's the double parenthesis in the example above). This is so the same jitter options can be reused without scattering them all over the place.</p>
<pre class="language-js"><code is:raw class="language-js"><span class="token comment">// One-time setup</span>
<span class="token keyword">const</span> jitterFn <span class="token operator">=</span> <span class="token function">jitter</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">absolute</span><span class="token operator">:</span> <span class="token number">0.1</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// Re-use the function when you like</span>
<span class="token function">jitterFn</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Jitter 100 by an absolute 10%;</span>
<span class="token function">jitterFn</span><span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// Jitter 50 by an absolute 10%</span></code></pre>
<p>Try adjusting the value-to-jitter and jitter amount:</p>
<div id="plot3"></div>
<p>By default <code is:raw>jitter</code> uses <code is:raw>Math.random</code>, but you could just as well plug in a <a href="https://clinth.github.io/ixfx/functions/Random.weighted.html"><code is:raw>weighted</code></a>, or <a href="https://clinth.github.io/ixfx/functions/Random.gaussian.html"><code is:raw>gaussian</code></a> random number generator.</p>
<pre class="language-js"><code is:raw class="language-js"><span class="token keyword">import</span> <span class="token punctuation">{</span> jitter <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'https://unpkg.com/ixfx/dist/modulation.js'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> gaussian <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'https://unpkg.com/ixfx/dist/random.js'</span><span class="token punctuation">;</span>

<span class="token comment">// Note we pass in as a function, so no () after gaussian</span>
<span class="token keyword">const</span> jitterFn <span class="token operator">=</span> <span class="token function">jitter</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">absolute</span><span class="token operator">:</span><span class="token number">0.2</span><span class="token punctuation">,</span> <span class="token literal-property property">source</span><span class="token operator">:</span> gaussian <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>
<p>In the plot below, notice how jitter is more likely to be close to the original value, instead of being evenly distributed across the whole specified jitter range. A more organic outcome?</p>
<div id="plot4"></div>` };
const frontmatter = { "title": "Jitter", "astro": { "headers": [], "source": "\n<script type=\"module\" hoist>\n  import '/src/components/ReplPad';\n  import '/src/loader';\n  import '/src/components/DensityPlotElement';\n  import {weightedInteger, weighted, gaussian} from '/node_modules/ixfx/dist/random.js';\n  import {jitter, Easings} from '/node_modules/ixfx/dist/modulation.js';\n  window.weightedInteger = weightedInteger;\n  window.weighted = weighted;\n  window.jitter = jitter;\n  window.Easings = Easings;\n  window.gaussian = gaussian;\n  importEl(\n  `plot3`, \n  `density-plot-element`, {\n    fn: \"jitter({ relative: 0.2})(0.5)\",\n    scaleMin: 0,\n    scaleMax: 1,\n    editable: true\n  });\n  importEl(\n    `plot4`, \n    `density-plot-element`, {\n      fn: \"jitter({ absolute: 0.2, source: gaussian })(0.5)\",\n      scaleMin: 0,\n      scaleMax: 1,\n      editable: true\n  });\n<\/script>\n\n<div class=\"tip\">\n<ul>\n<li>API Reference <a href=\"https://clinth.github.io/ixfx/functions/Modulation.jitter.html\">jitter function</a>, <a href=\"https://clinth.github.io/ixfx/modules/Modulation.html\">Modulation module</a></li>\n<li><a href=\"https://fn-vis.pages.dev/1/#H4sIADVU3mQAA42RQW/CMAyF/4qVC2WEBq5F7DhpB6TdVw5RayCQJl1tKqSq/31OGUy77RAp+eL3/Cx/DqqJNapCtT6yGvWggm2eb61ccOysV8Uw6lRKqhBNjcRSs1TjXk+PhPdS4Zo2dgzD2TFjN8Khiw3MTswtFcZcQ3s55lVsjLsdbqZ2xEY8r96yiyE/02xThodF5W3TaqDKevyPUW3Z/liUwSMDu+pCsIWVkCoGYjHBrwTy9RPdg74FwfdrNpQBYGqOdQHcXVEn0mFK2WOR5GUY52JByO9BNL31WTaH7StMYmPgo5OxKiRYrvM81QOkSL202Vk+5eRCNuVbLF5SquQG0/c0b9ZrUWpY//JH0Ky/s3TaSLxDInsURcKjSFar+UbJHv/sdf8NJX3U8OkBAAA=\">fn-vis</a>: useful for seeing output values</li>\n</ul>\n</div>\n\n_Jitter_ is the random modulation of a value. It is usually _bipolar_, meaning that it might shift a value upwards or downwards. \n\nOn a [normalised](../../data/normalising/) scale of 0..1 scale, let's say we want to apply jitter of 10% to a value of 0.5. If the jitter was to be absolute, that yields a potential new value of 0.4 - 0.6. An algorithm for this is:\n\n```js\n// repl-pad\nimport { clamp } from 'https://unpkg.com/ixfx/dist/bundle.js';\n\nconst jitter = (value, jitter) => {\n  // Double jitter in order to +- and apply random\n  const j = jitter * 2 * Math.random();\n  // Offset value, add j and clamp to 0-1\n  return clamp(value - jitter + j);\n}\n// Jitter a value of 50% by 10%\n// Yields a range of 0.4-0.6\njitter(0.5, 0.1);\n``` \n\nAnother option is to jitter by a relative amount, with respect to the input value. In that case, jittering 0.5 by 10% yields a range of 0.45 - 0.55, because 10% of 0.5 is 0.05. Thus for a given jitter amount, a larger input value will jitter more wildly than a smaller value, creating a sense of instability.\n\nixfx provides both of these approaches with [`jitter`](https://clinth.github.io/ixfx/functions/Modulation.jitter.html). \n\n```js\n// repl-pad\nimport { jitter } from 'https://unpkg.com/ixfx/dist/modulation.js';\n\n// Absolute jitter 0.5 by 10%\njitter({ absolute: 0.1 })(0.1); // number 0.4-0.6\n\n// Relative jitter 0.5 by 10%\njitter({ relative: 0.1 })(0.5); // number 0.45-0.55\n```\n\nRemember that `jitter` returns a function (which is why there's the double parenthesis in the example above). This is so the same jitter options can be reused without scattering them all over the place.\n\n```js\n// One-time setup\nconst jitterFn = jitter({ absolute: 0.1 });\n\n// Re-use the function when you like\njitterFn(100); // Jitter 100 by an absolute 10%;\njitterFn(50);  // Jitter 50 by an absolute 10%\n```\n\nTry adjusting the value-to-jitter and jitter amount:\n\n<div id=\"plot3\"></div>\n\nBy default `jitter` uses `Math.random`, but you could just as well plug in a [`weighted`](https://clinth.github.io/ixfx/functions/Random.weighted.html), or [`gaussian`](https://clinth.github.io/ixfx/functions/Random.gaussian.html) random number generator.\n\n```js\nimport { jitter } from 'https://unpkg.com/ixfx/dist/modulation.js';\nimport { gaussian } from 'https://unpkg.com/ixfx/dist/random.js';\n\n// Note we pass in as a function, so no () after gaussian\nconst jitterFn = jitter({ absolute:0.2, source: gaussian });\n```\n\nIn the plot below, notice how jitter is more likely to be close to the original value, instead of being evenly distributed across the whole specified jitter range. A more organic outcome?\n\n<div id=\"plot4\"></div>\n", "html": `<script type="module" hoist>
  import '/src/components/ReplPad';
  import '/src/loader';
  import '/src/components/DensityPlotElement';
  import {weightedInteger, weighted, gaussian} from '/node_modules/ixfx/dist/random.js';
  import {jitter, Easings} from '/node_modules/ixfx/dist/modulation.js';
  window.weightedInteger = weightedInteger;
  window.weighted = weighted;
  window.jitter = jitter;
  window.Easings = Easings;
  window.gaussian = gaussian;
  importEl(
  \`plot3\`, 
  \`density-plot-element\`, {
    fn: "jitter({ relative: 0.2})(0.5)",
    scaleMin: 0,
    scaleMax: 1,
    editable: true
  });
  importEl(
    \`plot4\`, 
    \`density-plot-element\`, {
      fn: "jitter({ absolute: 0.2, source: gaussian })(0.5)",
      scaleMin: 0,
      scaleMax: 1,
      editable: true
  });
<\/script>
<div class="tip">
<ul>
<li>API Reference <a href="https://clinth.github.io/ixfx/functions/Modulation.jitter.html">jitter function</a>, <a href="https://clinth.github.io/ixfx/modules/Modulation.html">Modulation module</a></li>
<li><a href="https://fn-vis.pages.dev/1/#H4sIADVU3mQAA42RQW/CMAyF/4qVC2WEBq5F7DhpB6TdVw5RayCQJl1tKqSq/31OGUy77RAp+eL3/Cx/DqqJNapCtT6yGvWggm2eb61ccOysV8Uw6lRKqhBNjcRSs1TjXk+PhPdS4Zo2dgzD2TFjN8Khiw3MTswtFcZcQ3s55lVsjLsdbqZ2xEY8r96yiyE/02xThodF5W3TaqDKevyPUW3Z/liUwSMDu+pCsIWVkCoGYjHBrwTy9RPdg74FwfdrNpQBYGqOdQHcXVEn0mFK2WOR5GUY52JByO9BNL31WTaH7StMYmPgo5OxKiRYrvM81QOkSL202Vk+5eRCNuVbLF5SquQG0/c0b9ZrUWpY//JH0Ky/s3TaSLxDInsURcKjSFar+UbJHv/sdf8NJX3U8OkBAAA=">fn-vis</a>: useful for seeing output values</li>
</ul>
</div>
<p><em>Jitter</em> is the random modulation of a value. It is usually <em>bipolar</em>, meaning that it might shift a value upwards or downwards.</p>
<p>On a <a href="../../data/normalising/">normalised</a> scale of 0..1 scale, let's say we want to apply jitter of 10% to a value of 0.5. If the jitter was to be absolute, that yields a potential new value of 0.4 - 0.6. An algorithm for this is:</p>
<pre class="language-js"><code is:raw class="language-js"><span class="token comment">// repl-pad</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> clamp <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'https://unpkg.com/ixfx/dist/bundle.js'</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> <span class="token function-variable function">jitter</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">value<span class="token punctuation">,</span> jitter</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token comment">// Double jitter in order to +- and apply random</span>
  <span class="token keyword">const</span> j <span class="token operator">=</span> jitter <span class="token operator">*</span> <span class="token number">2</span> <span class="token operator">*</span> Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// Offset value, add j and clamp to 0-1</span>
  <span class="token keyword">return</span> <span class="token function">clamp</span><span class="token punctuation">(</span>value <span class="token operator">-</span> jitter <span class="token operator">+</span> j<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// Jitter a value of 50% by 10%</span>
<span class="token comment">// Yields a range of 0.4-0.6</span>
<span class="token function">jitter</span><span class="token punctuation">(</span><span class="token number">0.5</span><span class="token punctuation">,</span> <span class="token number">0.1</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>
<p>Another option is to jitter by a relative amount, with respect to the input value. In that case, jittering 0.5 by 10% yields a range of 0.45 - 0.55, because 10% of 0.5 is 0.05. Thus for a given jitter amount, a larger input value will jitter more wildly than a smaller value, creating a sense of instability.</p>
<p>ixfx provides both of these approaches with <a href="https://clinth.github.io/ixfx/functions/Modulation.jitter.html"><code is:raw>jitter</code></a>.</p>
<pre class="language-js"><code is:raw class="language-js"><span class="token comment">// repl-pad</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> jitter <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'https://unpkg.com/ixfx/dist/modulation.js'</span><span class="token punctuation">;</span>

<span class="token comment">// Absolute jitter 0.5 by 10%</span>
<span class="token function">jitter</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">absolute</span><span class="token operator">:</span> <span class="token number">0.1</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token number">0.1</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// number 0.4-0.6</span>

<span class="token comment">// Relative jitter 0.5 by 10%</span>
<span class="token function">jitter</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">relative</span><span class="token operator">:</span> <span class="token number">0.1</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token number">0.5</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// number 0.45-0.55</span></code></pre>
<p>Remember that <code is:raw>jitter</code> returns a function (which is why there's the double parenthesis in the example above). This is so the same jitter options can be reused without scattering them all over the place.</p>
<pre class="language-js"><code is:raw class="language-js"><span class="token comment">// One-time setup</span>
<span class="token keyword">const</span> jitterFn <span class="token operator">=</span> <span class="token function">jitter</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">absolute</span><span class="token operator">:</span> <span class="token number">0.1</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// Re-use the function when you like</span>
<span class="token function">jitterFn</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Jitter 100 by an absolute 10%;</span>
<span class="token function">jitterFn</span><span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// Jitter 50 by an absolute 10%</span></code></pre>
<p>Try adjusting the value-to-jitter and jitter amount:</p>
<div id="plot3"></div>
<p>By default <code is:raw>jitter</code> uses <code is:raw>Math.random</code>, but you could just as well plug in a <a href="https://clinth.github.io/ixfx/functions/Random.weighted.html"><code is:raw>weighted</code></a>, or <a href="https://clinth.github.io/ixfx/functions/Random.gaussian.html"><code is:raw>gaussian</code></a> random number generator.</p>
<pre class="language-js"><code is:raw class="language-js"><span class="token keyword">import</span> <span class="token punctuation">{</span> jitter <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'https://unpkg.com/ixfx/dist/modulation.js'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> gaussian <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'https://unpkg.com/ixfx/dist/random.js'</span><span class="token punctuation">;</span>

<span class="token comment">// Note we pass in as a function, so no () after gaussian</span>
<span class="token keyword">const</span> jitterFn <span class="token operator">=</span> <span class="token function">jitter</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">absolute</span><span class="token operator">:</span><span class="token number">0.2</span><span class="token punctuation">,</span> <span class="token literal-property property">source</span><span class="token operator">:</span> gaussian <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>
<p>In the plot below, notice how jitter is more likely to be close to the original value, instead of being evenly distributed across the whole specified jitter range. A more organic outcome?</p>
<div id="plot4"></div>` } };
const $$metadata = createMetadata("/src/pages/modulation/jitter.md", { modules: [{ module: $$module1, specifier: "../../layouts/MainLayout.astro", assert: {} }, { module: $$module2, specifier: "../../components/DensityPlotElement", assert: {} }], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [{ type: "inline", value: `
  import '/src/components/ReplPad';
  import '/src/loader';
  import '/src/components/DensityPlotElement';
  import {weightedInteger, weighted, gaussian} from '/node_modules/ixfx/dist/random.js';
  import {jitter, Easings} from '/node_modules/ixfx/dist/modulation.js';
  window.weightedInteger = weightedInteger;
  window.weighted = weighted;
  window.jitter = jitter;
  window.Easings = Easings;
  window.gaussian = gaussian;
  importEl(
  \`plot3\`, 
  \`density-plot-element\`, {
    fn: "jitter({ relative: 0.2})(0.5)",
    scaleMin: 0,
    scaleMax: 1,
    editable: true
  });
  importEl(
    \`plot4\`, 
    \`density-plot-element\`, {
      fn: "jitter({ absolute: 0.2, source: gaussian })(0.5)",
      scaleMin: 0,
      scaleMax: 1,
      editable: true
  });
` }] });
const $$Astro = createAstro("/src/pages/modulation/jitter.md", "https://clinth.github.io/ixfx-docs/", "file:///Users/af4766/repos/ixfx-docs/");
const $$Jitter = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Jitter;
  const $$content = { "title": "Jitter", "astro": { "headers": [], "source": "\n<script type=\"module\" hoist>\n  import '/src/components/ReplPad';\n  import '/src/loader';\n  import '/src/components/DensityPlotElement';\n  import {weightedInteger, weighted, gaussian} from '/node_modules/ixfx/dist/random.js';\n  import {jitter, Easings} from '/node_modules/ixfx/dist/modulation.js';\n  window.weightedInteger = weightedInteger;\n  window.weighted = weighted;\n  window.jitter = jitter;\n  window.Easings = Easings;\n  window.gaussian = gaussian;\n  importEl(\n  `plot3`, \n  `density-plot-element`, {\n    fn: \"jitter({ relative: 0.2})(0.5)\",\n    scaleMin: 0,\n    scaleMax: 1,\n    editable: true\n  });\n  importEl(\n    `plot4`, \n    `density-plot-element`, {\n      fn: \"jitter({ absolute: 0.2, source: gaussian })(0.5)\",\n      scaleMin: 0,\n      scaleMax: 1,\n      editable: true\n  });\n<\/script>\n\n<div class=\"tip\">\n<ul>\n<li>API Reference <a href=\"https://clinth.github.io/ixfx/functions/Modulation.jitter.html\">jitter function</a>, <a href=\"https://clinth.github.io/ixfx/modules/Modulation.html\">Modulation module</a></li>\n<li><a href=\"https://fn-vis.pages.dev/1/#H4sIADVU3mQAA42RQW/CMAyF/4qVC2WEBq5F7DhpB6TdVw5RayCQJl1tKqSq/31OGUy77RAp+eL3/Cx/DqqJNapCtT6yGvWggm2eb61ccOysV8Uw6lRKqhBNjcRSs1TjXk+PhPdS4Zo2dgzD2TFjN8Khiw3MTswtFcZcQ3s55lVsjLsdbqZ2xEY8r96yiyE/02xThodF5W3TaqDKevyPUW3Z/liUwSMDu+pCsIWVkCoGYjHBrwTy9RPdg74FwfdrNpQBYGqOdQHcXVEn0mFK2WOR5GUY52JByO9BNL31WTaH7StMYmPgo5OxKiRYrvM81QOkSL202Vk+5eRCNuVbLF5SquQG0/c0b9ZrUWpY//JH0Ky/s3TaSLxDInsURcKjSFar+UbJHv/sdf8NJX3U8OkBAAA=\">fn-vis</a>: useful for seeing output values</li>\n</ul>\n</div>\n\n_Jitter_ is the random modulation of a value. It is usually _bipolar_, meaning that it might shift a value upwards or downwards. \n\nOn a [normalised](../../data/normalising/) scale of 0..1 scale, let's say we want to apply jitter of 10% to a value of 0.5. If the jitter was to be absolute, that yields a potential new value of 0.4 - 0.6. An algorithm for this is:\n\n```js\n// repl-pad\nimport { clamp } from 'https://unpkg.com/ixfx/dist/bundle.js';\n\nconst jitter = (value, jitter) => {\n  // Double jitter in order to +- and apply random\n  const j = jitter * 2 * Math.random();\n  // Offset value, add j and clamp to 0-1\n  return clamp(value - jitter + j);\n}\n// Jitter a value of 50% by 10%\n// Yields a range of 0.4-0.6\njitter(0.5, 0.1);\n``` \n\nAnother option is to jitter by a relative amount, with respect to the input value. In that case, jittering 0.5 by 10% yields a range of 0.45 - 0.55, because 10% of 0.5 is 0.05. Thus for a given jitter amount, a larger input value will jitter more wildly than a smaller value, creating a sense of instability.\n\nixfx provides both of these approaches with [`jitter`](https://clinth.github.io/ixfx/functions/Modulation.jitter.html). \n\n```js\n// repl-pad\nimport { jitter } from 'https://unpkg.com/ixfx/dist/modulation.js';\n\n// Absolute jitter 0.5 by 10%\njitter({ absolute: 0.1 })(0.1); // number 0.4-0.6\n\n// Relative jitter 0.5 by 10%\njitter({ relative: 0.1 })(0.5); // number 0.45-0.55\n```\n\nRemember that `jitter` returns a function (which is why there's the double parenthesis in the example above). This is so the same jitter options can be reused without scattering them all over the place.\n\n```js\n// One-time setup\nconst jitterFn = jitter({ absolute: 0.1 });\n\n// Re-use the function when you like\njitterFn(100); // Jitter 100 by an absolute 10%;\njitterFn(50);  // Jitter 50 by an absolute 10%\n```\n\nTry adjusting the value-to-jitter and jitter amount:\n\n<div id=\"plot3\"></div>\n\nBy default `jitter` uses `Math.random`, but you could just as well plug in a [`weighted`](https://clinth.github.io/ixfx/functions/Random.weighted.html), or [`gaussian`](https://clinth.github.io/ixfx/functions/Random.gaussian.html) random number generator.\n\n```js\nimport { jitter } from 'https://unpkg.com/ixfx/dist/modulation.js';\nimport { gaussian } from 'https://unpkg.com/ixfx/dist/random.js';\n\n// Note we pass in as a function, so no () after gaussian\nconst jitterFn = jitter({ absolute:0.2, source: gaussian });\n```\n\nIn the plot below, notice how jitter is more likely to be close to the original value, instead of being evenly distributed across the whole specified jitter range. A more organic outcome?\n\n<div id=\"plot4\"></div>\n", "html": `<script type="module" hoist>
  import '/src/components/ReplPad';
  import '/src/loader';
  import '/src/components/DensityPlotElement';
  import {weightedInteger, weighted, gaussian} from '/node_modules/ixfx/dist/random.js';
  import {jitter, Easings} from '/node_modules/ixfx/dist/modulation.js';
  window.weightedInteger = weightedInteger;
  window.weighted = weighted;
  window.jitter = jitter;
  window.Easings = Easings;
  window.gaussian = gaussian;
  importEl(
  \`plot3\`, 
  \`density-plot-element\`, {
    fn: "jitter({ relative: 0.2})(0.5)",
    scaleMin: 0,
    scaleMax: 1,
    editable: true
  });
  importEl(
    \`plot4\`, 
    \`density-plot-element\`, {
      fn: "jitter({ absolute: 0.2, source: gaussian })(0.5)",
      scaleMin: 0,
      scaleMax: 1,
      editable: true
  });
<\/script>
<div class="tip">
<ul>
<li>API Reference <a href="https://clinth.github.io/ixfx/functions/Modulation.jitter.html">jitter function</a>, <a href="https://clinth.github.io/ixfx/modules/Modulation.html">Modulation module</a></li>
<li><a href="https://fn-vis.pages.dev/1/#H4sIADVU3mQAA42RQW/CMAyF/4qVC2WEBq5F7DhpB6TdVw5RayCQJl1tKqSq/31OGUy77RAp+eL3/Cx/DqqJNapCtT6yGvWggm2eb61ccOysV8Uw6lRKqhBNjcRSs1TjXk+PhPdS4Zo2dgzD2TFjN8Khiw3MTswtFcZcQ3s55lVsjLsdbqZ2xEY8r96yiyE/02xThodF5W3TaqDKevyPUW3Z/liUwSMDu+pCsIWVkCoGYjHBrwTy9RPdg74FwfdrNpQBYGqOdQHcXVEn0mFK2WOR5GUY52JByO9BNL31WTaH7StMYmPgo5OxKiRYrvM81QOkSL202Vk+5eRCNuVbLF5SquQG0/c0b9ZrUWpY//JH0Ky/s3TaSLxDInsURcKjSFar+UbJHv/sdf8NJX3U8OkBAAA=">fn-vis</a>: useful for seeing output values</li>
</ul>
</div>
<p><em>Jitter</em> is the random modulation of a value. It is usually <em>bipolar</em>, meaning that it might shift a value upwards or downwards.</p>
<p>On a <a href="../../data/normalising/">normalised</a> scale of 0..1 scale, let's say we want to apply jitter of 10% to a value of 0.5. If the jitter was to be absolute, that yields a potential new value of 0.4 - 0.6. An algorithm for this is:</p>
<pre class="language-js"><code is:raw class="language-js"><span class="token comment">// repl-pad</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> clamp <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'https://unpkg.com/ixfx/dist/bundle.js'</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> <span class="token function-variable function">jitter</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">value<span class="token punctuation">,</span> jitter</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token comment">// Double jitter in order to +- and apply random</span>
  <span class="token keyword">const</span> j <span class="token operator">=</span> jitter <span class="token operator">*</span> <span class="token number">2</span> <span class="token operator">*</span> Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// Offset value, add j and clamp to 0-1</span>
  <span class="token keyword">return</span> <span class="token function">clamp</span><span class="token punctuation">(</span>value <span class="token operator">-</span> jitter <span class="token operator">+</span> j<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// Jitter a value of 50% by 10%</span>
<span class="token comment">// Yields a range of 0.4-0.6</span>
<span class="token function">jitter</span><span class="token punctuation">(</span><span class="token number">0.5</span><span class="token punctuation">,</span> <span class="token number">0.1</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>
<p>Another option is to jitter by a relative amount, with respect to the input value. In that case, jittering 0.5 by 10% yields a range of 0.45 - 0.55, because 10% of 0.5 is 0.05. Thus for a given jitter amount, a larger input value will jitter more wildly than a smaller value, creating a sense of instability.</p>
<p>ixfx provides both of these approaches with <a href="https://clinth.github.io/ixfx/functions/Modulation.jitter.html"><code is:raw>jitter</code></a>.</p>
<pre class="language-js"><code is:raw class="language-js"><span class="token comment">// repl-pad</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> jitter <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'https://unpkg.com/ixfx/dist/modulation.js'</span><span class="token punctuation">;</span>

<span class="token comment">// Absolute jitter 0.5 by 10%</span>
<span class="token function">jitter</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">absolute</span><span class="token operator">:</span> <span class="token number">0.1</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token number">0.1</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// number 0.4-0.6</span>

<span class="token comment">// Relative jitter 0.5 by 10%</span>
<span class="token function">jitter</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">relative</span><span class="token operator">:</span> <span class="token number">0.1</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token number">0.5</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// number 0.45-0.55</span></code></pre>
<p>Remember that <code is:raw>jitter</code> returns a function (which is why there's the double parenthesis in the example above). This is so the same jitter options can be reused without scattering them all over the place.</p>
<pre class="language-js"><code is:raw class="language-js"><span class="token comment">// One-time setup</span>
<span class="token keyword">const</span> jitterFn <span class="token operator">=</span> <span class="token function">jitter</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">absolute</span><span class="token operator">:</span> <span class="token number">0.1</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// Re-use the function when you like</span>
<span class="token function">jitterFn</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Jitter 100 by an absolute 10%;</span>
<span class="token function">jitterFn</span><span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// Jitter 50 by an absolute 10%</span></code></pre>
<p>Try adjusting the value-to-jitter and jitter amount:</p>
<div id="plot3"></div>
<p>By default <code is:raw>jitter</code> uses <code is:raw>Math.random</code>, but you could just as well plug in a <a href="https://clinth.github.io/ixfx/functions/Random.weighted.html"><code is:raw>weighted</code></a>, or <a href="https://clinth.github.io/ixfx/functions/Random.gaussian.html"><code is:raw>gaussian</code></a> random number generator.</p>
<pre class="language-js"><code is:raw class="language-js"><span class="token keyword">import</span> <span class="token punctuation">{</span> jitter <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'https://unpkg.com/ixfx/dist/modulation.js'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> gaussian <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'https://unpkg.com/ixfx/dist/random.js'</span><span class="token punctuation">;</span>

<span class="token comment">// Note we pass in as a function, so no () after gaussian</span>
<span class="token keyword">const</span> jitterFn <span class="token operator">=</span> <span class="token function">jitter</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">absolute</span><span class="token operator">:</span><span class="token number">0.2</span><span class="token punctuation">,</span> <span class="token literal-property property">source</span><span class="token operator">:</span> gaussian <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>
<p>In the plot below, notice how jitter is more likely to be close to the original value, instead of being evenly distributed across the whole specified jitter range. A more organic outcome?</p>
<div id="plot4"></div>` } };
  const SCRIPTS = [
    { props: { "type": "module", "hoist": true }, children: `import '/src/components/ReplPad';
  import '/src/loader';
  import '/src/components/DensityPlotElement';
  import {weightedInteger, weighted, gaussian} from '/node_modules/ixfx/dist/random.js';
  import {jitter, Easings} from '/node_modules/ixfx/dist/modulation.js';
  window.weightedInteger = weightedInteger;
  window.weighted = weighted;
  window.jitter = jitter;
  window.Easings = Easings;
  window.gaussian = gaussian;
  importEl(
  \`plot3\`, 
  \`density-plot-element\`, {
    fn: "jitter({ relative: 0.2})(0.5)",
    scaleMin: 0,
    scaleMax: 1,
    editable: true
  });
  importEl(
    \`plot4\`, 
    \`density-plot-element\`, {
      fn: "jitter({ absolute: 0.2, source: gaussian })(0.5)",
      scaleMin: 0,
      scaleMax: 1,
      editable: true
  });` }
  ];
  for (const SCRIPT of SCRIPTS)
    $$result.scripts.add(SCRIPT);
  return render`${renderComponent($$result, "Layout", $$MainLayout, { "content": $$content }, { "default": () => render`<div class="tip">
<ul>
<li>API Reference <a href="https://clinth.github.io/ixfx/functions/Modulation.jitter.html">jitter function</a>, <a href="https://clinth.github.io/ixfx/modules/Modulation.html">Modulation module</a></li>
<li><a href="https://fn-vis.pages.dev/1/#H4sIADVU3mQAA42RQW/CMAyF/4qVC2WEBq5F7DhpB6TdVw5RayCQJl1tKqSq/31OGUy77RAp+eL3/Cx/DqqJNapCtT6yGvWggm2eb61ccOysV8Uw6lRKqhBNjcRSs1TjXk+PhPdS4Zo2dgzD2TFjN8Khiw3MTswtFcZcQ3s55lVsjLsdbqZ2xEY8r96yiyE/02xThodF5W3TaqDKevyPUW3Z/liUwSMDu+pCsIWVkCoGYjHBrwTy9RPdg74FwfdrNpQBYGqOdQHcXVEn0mFK2WOR5GUY52JByO9BNL31WTaH7StMYmPgo5OxKiRYrvM81QOkSL202Vk+5eRCNuVbLF5SquQG0/c0b9ZrUWpY//JH0Ky/s3TaSLxDInsURcKjSFar+UbJHv/sdf8NJX3U8OkBAAA=">fn-vis</a>: useful for seeing output values</li>
</ul>
</div><p><em>Jitter</em> is the random modulation of a value. It is usually <em>bipolar</em>, meaning that it might shift a value upwards or downwards.</p><p>On a <a href="../../data/normalising/">normalised</a> scale of 0..1 scale, let's say we want to apply jitter of 10% to a value of 0.5. If the jitter was to be absolute, that yields a potential new value of 0.4 - 0.6. An algorithm for this is:</p><pre class="language-js"><code class="language-js"><span class="token comment">// repl-pad</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> clamp <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'https://unpkg.com/ixfx/dist/bundle.js'</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> <span class="token function-variable function">jitter</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">value<span class="token punctuation">,</span> jitter</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token comment">// Double jitter in order to +- and apply random</span>
  <span class="token keyword">const</span> j <span class="token operator">=</span> jitter <span class="token operator">*</span> <span class="token number">2</span> <span class="token operator">*</span> Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// Offset value, add j and clamp to 0-1</span>
  <span class="token keyword">return</span> <span class="token function">clamp</span><span class="token punctuation">(</span>value <span class="token operator">-</span> jitter <span class="token operator">+</span> j<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// Jitter a value of 50% by 10%</span>
<span class="token comment">// Yields a range of 0.4-0.6</span>
<span class="token function">jitter</span><span class="token punctuation">(</span><span class="token number">0.5</span><span class="token punctuation">,</span> <span class="token number">0.1</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre><p>Another option is to jitter by a relative amount, with respect to the input value. In that case, jittering 0.5 by 10% yields a range of 0.45 - 0.55, because 10% of 0.5 is 0.05. Thus for a given jitter amount, a larger input value will jitter more wildly than a smaller value, creating a sense of instability.</p><p>ixfx provides both of these approaches with <a href="https://clinth.github.io/ixfx/functions/Modulation.jitter.html"><code>jitter</code></a>.</p><pre class="language-js"><code class="language-js"><span class="token comment">// repl-pad</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> jitter <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'https://unpkg.com/ixfx/dist/modulation.js'</span><span class="token punctuation">;</span>

<span class="token comment">// Absolute jitter 0.5 by 10%</span>
<span class="token function">jitter</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">absolute</span><span class="token operator">:</span> <span class="token number">0.1</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token number">0.1</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// number 0.4-0.6</span>

<span class="token comment">// Relative jitter 0.5 by 10%</span>
<span class="token function">jitter</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">relative</span><span class="token operator">:</span> <span class="token number">0.1</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token number">0.5</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// number 0.45-0.55</span></code></pre><p>Remember that <code>jitter</code> returns a function (which is why there's the double parenthesis in the example above). This is so the same jitter options can be reused without scattering them all over the place.</p><pre class="language-js"><code class="language-js"><span class="token comment">// One-time setup</span>
<span class="token keyword">const</span> jitterFn <span class="token operator">=</span> <span class="token function">jitter</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">absolute</span><span class="token operator">:</span> <span class="token number">0.1</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// Re-use the function when you like</span>
<span class="token function">jitterFn</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Jitter 100 by an absolute 10%;</span>
<span class="token function">jitterFn</span><span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// Jitter 50 by an absolute 10%</span></code></pre><p>Try adjusting the value-to-jitter and jitter amount:</p><div id="plot3"></div><p>By default <code>jitter</code> uses <code>Math.random</code>, but you could just as well plug in a <a href="https://clinth.github.io/ixfx/functions/Random.weighted.html"><code>weighted</code></a>, or <a href="https://clinth.github.io/ixfx/functions/Random.gaussian.html"><code>gaussian</code></a> random number generator.</p><pre class="language-js"><code class="language-js"><span class="token keyword">import</span> <span class="token punctuation">{</span> jitter <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'https://unpkg.com/ixfx/dist/modulation.js'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> gaussian <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'https://unpkg.com/ixfx/dist/random.js'</span><span class="token punctuation">;</span>

<span class="token comment">// Note we pass in as a function, so no () after gaussian</span>
<span class="token keyword">const</span> jitterFn <span class="token operator">=</span> <span class="token function">jitter</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">absolute</span><span class="token operator">:</span><span class="token number">0.2</span><span class="token punctuation">,</span> <span class="token literal-property property">source</span><span class="token operator">:</span> gaussian <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre><p>In the plot below, notice how jitter is more likely to be close to the original value, instead of being evenly distributed across the whole specified jitter range. A more organic outcome?</p><div id="plot4"></div>` })}`;
});

export { $$metadata, $$Jitter as default, frontmatter, metadata };
