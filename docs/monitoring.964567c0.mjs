import { c as createMetadata, a as createAstro, b as createComponent, r as render, d as renderComponent } from './chunks/index.7bfc2e7e.mjs';
import { $ as $$module1, a as $$MainLayout } from './chunks/MainLayout.fae6d6b7.mjs';
import { $ as $$module2 } from './chunks/DemoElement.a29296a2.mjs';
import 'shorthash';
import 'serialize-javascript';
import 'preact/hooks';
import 'preact/jsx-runtime';
import 'lit';
import 'lit/decorators.js';
import './chunks/styles.9b8f8965.mjs';

const metadata = { "headers": [{ "depth": 2, "slug": "elapsed", "text": "Elapsed" }, { "depth": 3, "slug": "since", "text": "Since" }, { "depth": 3, "slug": "interval", "text": "Interval" }, { "depth": 3, "slug": "once", "text": "Once" }, { "depth": 2, "slug": "human-friendly-elapsed-time", "text": "Human-friendly elapsed time" }, { "depth": 2, "slug": "completion", "text": "Completion" }], "source": '\n<script type="module" hoist>\nimport \'/src/components/ReplPad\';\n<\/script>\n<div class="tip"><ul>\n<li>API Reference <a href="https://clinth.github.io/ixfx/modules/Flow.html">Flow</a>.<a href="https://clinth.github.io/ixfx/modules/Flow.Elapsed.html">Elapsed</a> module</li>\n<li><a href="https://clinth.github.io/ixfx-demos/flow/">Online demos</a></li>\n</ul></div>\n\nThe [`Elapsed`](https://clinth.github.io/ixfx/modules/Flow.Elapsed.html) module has a few functions for tracking passage of time.\n\nAn overview:\n* `Elapsed.since()`: time from a start point\n* `Elapsed.interval()`: time from start point, and between each subsequent call\n* `Elapsed.once()`: one-time measurement from a start point\n  \n## Elapsed\n\n### Since\n\n[`Elapsed.since`](https://clinth.github.io/ixfx/functions/Flow.Elapsed.since-1.html) yields how much time (in milliseconds) has passed since first invoked. This is the fixed reference point all later invocations are compared to.\n\n```js\n// repl-pad\nimport { Elapsed } from "https://unpkg.com/ixfx/dist/flow.js"\n\n// A. Start monitoring elapsed time\nconst s = Elapsed.since();\n\n// ...some time later ...\n\ns(); // B. Elapsed time since (A)\n// ...some time later ...\ns(); // C. Elapsed time since (A)\n```\n\n### Interval\n\n[`Elapsed.interval`](https://clinth.github.io/ixfx/functions/Flow.Elapsed.interval.html) reports the time from the first initialisation and each subsequent call. Unlike `since`, there is a not a fixed reference point. It is always comparing to either the initial time or when the callback was last run.\n\n```js\n// repl-pad\nimport { Elapsed } from "https://unpkg.com/ixfx/dist/flow.js"\n\n// A. Start monitoring elapsed time\nconst i = Elapsed.interval();\n\n// ...some time later ...\n\ni(); // B. Elapsed time since (A)\n// ...some time later ...\ni(); // C. Elapsed time since (B)\n```\n\n### Once\n\n[`Elapsed.once`](https://clinth.github.io/ixfx/functions/Flow.Elapsed.once.html) fixes both the start point and a second reference time. After initialisation, it records the time at which the first call happens. This is then given as the value for all future calls.\n\n```js\n// repl-pad\nimport { Elapsed } from "https://unpkg.com/ixfx/dist/flow.js"\n\n// A. Start monitoring elapsed time\nconst o = Elapsed.once();\n// ...some time later...\no(); // B. Time since (A). Since it is the first call, we now fix the second reference.\n// ...some time later...\no(); // C. Will be same value as earlier (B-A)\no(); // D. As above, forever\n ```\n\n## Human-friendly elapsed time\n\n[`toString`](https://clinth.github.io/ixfx/functions/Flow.Elapsed.toString.html) prints elapsed time in a human-friendly way:\n\n```js\n// repl-pad\nimport { Elapsed } from "https://unpkg.com/ixfx/dist/flow.js"\n\n// With .since()\nconst elapsed = Elapsed.since();\nElapsed.toString(elapsed); // if it gets a function, it calls it\n\n// With regular millis\nconst startTime = Date.now();\nElapsed.toString(Date.now() - startTime);\n```\n\n## Completion\n\nIf you have a known time period and you want to track reaching that elapsed time, use\n[`Elapsed.progress`](https://clinth.github.io/ixfx/functions/Flow.Elapsed.progress.html). It yields a percentage of completion.\n\n```js\n// repl-pad\nimport { Elapsed } from "https://unpkg.com/ixfx/dist/flow.js"\n\n// Start tracking 1 second time duration\nconst timer = Elapsed.progress(1000);\n\n// ...later, call timer() to calculate how much of the time has elapsed\n// eg 0.5 will mean that 500ms has elapsed, 2 will mean 2000ms has elapsed etc.\ntimer(); // Yields percentage\n```\n\nYou can clamp the result it is always between 0..1.\n\n```js\nconst timer = Elapsed.progress(1000, { clampValue: true });\ntimer(); // Yields 0..1\n```\n\nValues can also be wrapped, for example if the duration is 1000ms and 1500ms elapses, the return value will be 0.5.\n\n```js\nconst timer = Elapsed.progress(1000, { wrapValue: true });\ntimer(); // After 500ms: 0.5\ntimer(); // After 1500ms: 0.5 \n```\n\nIntervals can be used instead of milliseconds for more readable code:\n```js\n// Track progress towards 4 minutes\nconst timer = Elapsed.progress({ mins: 4 });\n```\n', "html": `<script type="module" hoist>
import '/src/components/ReplPad';
<\/script>
<div class="tip"><ul>
<li>API Reference <a href="https://clinth.github.io/ixfx/modules/Flow.html">Flow</a>.<a href="https://clinth.github.io/ixfx/modules/Flow.Elapsed.html">Elapsed</a> module</li>
<li><a href="https://clinth.github.io/ixfx-demos/flow/">Online demos</a></li>
</ul></div>
<p>The <a href="https://clinth.github.io/ixfx/modules/Flow.Elapsed.html"><code is:raw>Elapsed</code></a> module has a few functions for tracking passage of time.</p>
<p>An overview:</p>
<ul>
<li><code is:raw>Elapsed.since()</code>: time from a start point</li>
<li><code is:raw>Elapsed.interval()</code>: time from start point, and between each subsequent call</li>
<li><code is:raw>Elapsed.once()</code>: one-time measurement from a start point</li>
</ul>
<h2 id="elapsed">Elapsed</h2>
<h3 id="since">Since</h3>
<p><a href="https://clinth.github.io/ixfx/functions/Flow.Elapsed.since-1.html"><code is:raw>Elapsed.since</code></a> yields how much time (in milliseconds) has passed since first invoked. This is the fixed reference point all later invocations are compared to.</p>
<pre class="language-js"><code is:raw class="language-js"><span class="token comment">// repl-pad</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Elapsed <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"https://unpkg.com/ixfx/dist/flow.js"</span>

<span class="token comment">// A. Start monitoring elapsed time</span>
<span class="token keyword">const</span> s <span class="token operator">=</span> Elapsed<span class="token punctuation">.</span><span class="token function">since</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// ...some time later ...</span>

<span class="token function">s</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// B. Elapsed time since (A)</span>
<span class="token comment">// ...some time later ...</span>
<span class="token function">s</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// C. Elapsed time since (A)</span></code></pre>
<h3 id="interval">Interval</h3>
<p><a href="https://clinth.github.io/ixfx/functions/Flow.Elapsed.interval.html"><code is:raw>Elapsed.interval</code></a> reports the time from the first initialisation and each subsequent call. Unlike <code is:raw>since</code>, there is a not a fixed reference point. It is always comparing to either the initial time or when the callback was last run.</p>
<pre class="language-js"><code is:raw class="language-js"><span class="token comment">// repl-pad</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Elapsed <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"https://unpkg.com/ixfx/dist/flow.js"</span>

<span class="token comment">// A. Start monitoring elapsed time</span>
<span class="token keyword">const</span> i <span class="token operator">=</span> Elapsed<span class="token punctuation">.</span><span class="token function">interval</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// ...some time later ...</span>

<span class="token function">i</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// B. Elapsed time since (A)</span>
<span class="token comment">// ...some time later ...</span>
<span class="token function">i</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// C. Elapsed time since (B)</span></code></pre>
<h3 id="once">Once</h3>
<p><a href="https://clinth.github.io/ixfx/functions/Flow.Elapsed.once.html"><code is:raw>Elapsed.once</code></a> fixes both the start point and a second reference time. After initialisation, it records the time at which the first call happens. This is then given as the value for all future calls.</p>
<pre class="language-js"><code is:raw class="language-js"><span class="token comment">// repl-pad</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Elapsed <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"https://unpkg.com/ixfx/dist/flow.js"</span>

<span class="token comment">// A. Start monitoring elapsed time</span>
<span class="token keyword">const</span> o <span class="token operator">=</span> Elapsed<span class="token punctuation">.</span><span class="token function">once</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// ...some time later...</span>
<span class="token function">o</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// B. Time since (A). Since it is the first call, we now fix the second reference.</span>
<span class="token comment">// ...some time later...</span>
<span class="token function">o</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// C. Will be same value as earlier (B-A)</span>
<span class="token function">o</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// D. As above, forever</span></code></pre>
<h2 id="human-friendly-elapsed-time">Human-friendly elapsed time</h2>
<p><a href="https://clinth.github.io/ixfx/functions/Flow.Elapsed.toString.html"><code is:raw>toString</code></a> prints elapsed time in a human-friendly way:</p>
<pre class="language-js"><code is:raw class="language-js"><span class="token comment">// repl-pad</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Elapsed <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"https://unpkg.com/ixfx/dist/flow.js"</span>

<span class="token comment">// With .since()</span>
<span class="token keyword">const</span> elapsed <span class="token operator">=</span> Elapsed<span class="token punctuation">.</span><span class="token function">since</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
Elapsed<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span>elapsed<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// if it gets a function, it calls it</span>

<span class="token comment">// With regular millis</span>
<span class="token keyword">const</span> startTime <span class="token operator">=</span> Date<span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
Elapsed<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span>Date<span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> startTime<span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>
<h2 id="completion">Completion</h2>
<p>If you have a known time period and you want to track reaching that elapsed time, use
<a href="https://clinth.github.io/ixfx/functions/Flow.Elapsed.progress.html"><code is:raw>Elapsed.progress</code></a>. It yields a percentage of completion.</p>
<pre class="language-js"><code is:raw class="language-js"><span class="token comment">// repl-pad</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Elapsed <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"https://unpkg.com/ixfx/dist/flow.js"</span>

<span class="token comment">// Start tracking 1 second time duration</span>
<span class="token keyword">const</span> timer <span class="token operator">=</span> Elapsed<span class="token punctuation">.</span><span class="token function">progress</span><span class="token punctuation">(</span><span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// ...later, call timer() to calculate how much of the time has elapsed</span>
<span class="token comment">// eg 0.5 will mean that 500ms has elapsed, 2 will mean 2000ms has elapsed etc.</span>
<span class="token function">timer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Yields percentage</span></code></pre>
<p>You can clamp the result it is always between 0..1.</p>
<pre class="language-js"><code is:raw class="language-js"><span class="token keyword">const</span> timer <span class="token operator">=</span> Elapsed<span class="token punctuation">.</span><span class="token function">progress</span><span class="token punctuation">(</span><span class="token number">1000</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">clampValue</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">timer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Yields 0..1</span></code></pre>
<p>Values can also be wrapped, for example if the duration is 1000ms and 1500ms elapses, the return value will be 0.5.</p>
<pre class="language-js"><code is:raw class="language-js"><span class="token keyword">const</span> timer <span class="token operator">=</span> Elapsed<span class="token punctuation">.</span><span class="token function">progress</span><span class="token punctuation">(</span><span class="token number">1000</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">wrapValue</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">timer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// After 500ms: 0.5</span>
<span class="token function">timer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// After 1500ms: 0.5 </span></code></pre>
<p>Intervals can be used instead of milliseconds for more readable code:</p>
<pre class="language-js"><code is:raw class="language-js"><span class="token comment">// Track progress towards 4 minutes</span>
<span class="token keyword">const</span> timer <span class="token operator">=</span> Elapsed<span class="token punctuation">.</span><span class="token function">progress</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">mins</span><span class="token operator">:</span> <span class="token number">4</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>` };
const frontmatter = { "title": "Monitoring", "astro": { "headers": [{ "depth": 2, "slug": "elapsed", "text": "Elapsed" }, { "depth": 3, "slug": "since", "text": "Since" }, { "depth": 3, "slug": "interval", "text": "Interval" }, { "depth": 3, "slug": "once", "text": "Once" }, { "depth": 2, "slug": "human-friendly-elapsed-time", "text": "Human-friendly elapsed time" }, { "depth": 2, "slug": "completion", "text": "Completion" }], "source": '\n<script type="module" hoist>\nimport \'/src/components/ReplPad\';\n<\/script>\n<div class="tip"><ul>\n<li>API Reference <a href="https://clinth.github.io/ixfx/modules/Flow.html">Flow</a>.<a href="https://clinth.github.io/ixfx/modules/Flow.Elapsed.html">Elapsed</a> module</li>\n<li><a href="https://clinth.github.io/ixfx-demos/flow/">Online demos</a></li>\n</ul></div>\n\nThe [`Elapsed`](https://clinth.github.io/ixfx/modules/Flow.Elapsed.html) module has a few functions for tracking passage of time.\n\nAn overview:\n* `Elapsed.since()`: time from a start point\n* `Elapsed.interval()`: time from start point, and between each subsequent call\n* `Elapsed.once()`: one-time measurement from a start point\n  \n## Elapsed\n\n### Since\n\n[`Elapsed.since`](https://clinth.github.io/ixfx/functions/Flow.Elapsed.since-1.html) yields how much time (in milliseconds) has passed since first invoked. This is the fixed reference point all later invocations are compared to.\n\n```js\n// repl-pad\nimport { Elapsed } from "https://unpkg.com/ixfx/dist/flow.js"\n\n// A. Start monitoring elapsed time\nconst s = Elapsed.since();\n\n// ...some time later ...\n\ns(); // B. Elapsed time since (A)\n// ...some time later ...\ns(); // C. Elapsed time since (A)\n```\n\n### Interval\n\n[`Elapsed.interval`](https://clinth.github.io/ixfx/functions/Flow.Elapsed.interval.html) reports the time from the first initialisation and each subsequent call. Unlike `since`, there is a not a fixed reference point. It is always comparing to either the initial time or when the callback was last run.\n\n```js\n// repl-pad\nimport { Elapsed } from "https://unpkg.com/ixfx/dist/flow.js"\n\n// A. Start monitoring elapsed time\nconst i = Elapsed.interval();\n\n// ...some time later ...\n\ni(); // B. Elapsed time since (A)\n// ...some time later ...\ni(); // C. Elapsed time since (B)\n```\n\n### Once\n\n[`Elapsed.once`](https://clinth.github.io/ixfx/functions/Flow.Elapsed.once.html) fixes both the start point and a second reference time. After initialisation, it records the time at which the first call happens. This is then given as the value for all future calls.\n\n```js\n// repl-pad\nimport { Elapsed } from "https://unpkg.com/ixfx/dist/flow.js"\n\n// A. Start monitoring elapsed time\nconst o = Elapsed.once();\n// ...some time later...\no(); // B. Time since (A). Since it is the first call, we now fix the second reference.\n// ...some time later...\no(); // C. Will be same value as earlier (B-A)\no(); // D. As above, forever\n ```\n\n## Human-friendly elapsed time\n\n[`toString`](https://clinth.github.io/ixfx/functions/Flow.Elapsed.toString.html) prints elapsed time in a human-friendly way:\n\n```js\n// repl-pad\nimport { Elapsed } from "https://unpkg.com/ixfx/dist/flow.js"\n\n// With .since()\nconst elapsed = Elapsed.since();\nElapsed.toString(elapsed); // if it gets a function, it calls it\n\n// With regular millis\nconst startTime = Date.now();\nElapsed.toString(Date.now() - startTime);\n```\n\n## Completion\n\nIf you have a known time period and you want to track reaching that elapsed time, use\n[`Elapsed.progress`](https://clinth.github.io/ixfx/functions/Flow.Elapsed.progress.html). It yields a percentage of completion.\n\n```js\n// repl-pad\nimport { Elapsed } from "https://unpkg.com/ixfx/dist/flow.js"\n\n// Start tracking 1 second time duration\nconst timer = Elapsed.progress(1000);\n\n// ...later, call timer() to calculate how much of the time has elapsed\n// eg 0.5 will mean that 500ms has elapsed, 2 will mean 2000ms has elapsed etc.\ntimer(); // Yields percentage\n```\n\nYou can clamp the result it is always between 0..1.\n\n```js\nconst timer = Elapsed.progress(1000, { clampValue: true });\ntimer(); // Yields 0..1\n```\n\nValues can also be wrapped, for example if the duration is 1000ms and 1500ms elapses, the return value will be 0.5.\n\n```js\nconst timer = Elapsed.progress(1000, { wrapValue: true });\ntimer(); // After 500ms: 0.5\ntimer(); // After 1500ms: 0.5 \n```\n\nIntervals can be used instead of milliseconds for more readable code:\n```js\n// Track progress towards 4 minutes\nconst timer = Elapsed.progress({ mins: 4 });\n```\n', "html": `<script type="module" hoist>
import '/src/components/ReplPad';
<\/script>
<div class="tip"><ul>
<li>API Reference <a href="https://clinth.github.io/ixfx/modules/Flow.html">Flow</a>.<a href="https://clinth.github.io/ixfx/modules/Flow.Elapsed.html">Elapsed</a> module</li>
<li><a href="https://clinth.github.io/ixfx-demos/flow/">Online demos</a></li>
</ul></div>
<p>The <a href="https://clinth.github.io/ixfx/modules/Flow.Elapsed.html"><code is:raw>Elapsed</code></a> module has a few functions for tracking passage of time.</p>
<p>An overview:</p>
<ul>
<li><code is:raw>Elapsed.since()</code>: time from a start point</li>
<li><code is:raw>Elapsed.interval()</code>: time from start point, and between each subsequent call</li>
<li><code is:raw>Elapsed.once()</code>: one-time measurement from a start point</li>
</ul>
<h2 id="elapsed">Elapsed</h2>
<h3 id="since">Since</h3>
<p><a href="https://clinth.github.io/ixfx/functions/Flow.Elapsed.since-1.html"><code is:raw>Elapsed.since</code></a> yields how much time (in milliseconds) has passed since first invoked. This is the fixed reference point all later invocations are compared to.</p>
<pre class="language-js"><code is:raw class="language-js"><span class="token comment">// repl-pad</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Elapsed <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"https://unpkg.com/ixfx/dist/flow.js"</span>

<span class="token comment">// A. Start monitoring elapsed time</span>
<span class="token keyword">const</span> s <span class="token operator">=</span> Elapsed<span class="token punctuation">.</span><span class="token function">since</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// ...some time later ...</span>

<span class="token function">s</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// B. Elapsed time since (A)</span>
<span class="token comment">// ...some time later ...</span>
<span class="token function">s</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// C. Elapsed time since (A)</span></code></pre>
<h3 id="interval">Interval</h3>
<p><a href="https://clinth.github.io/ixfx/functions/Flow.Elapsed.interval.html"><code is:raw>Elapsed.interval</code></a> reports the time from the first initialisation and each subsequent call. Unlike <code is:raw>since</code>, there is a not a fixed reference point. It is always comparing to either the initial time or when the callback was last run.</p>
<pre class="language-js"><code is:raw class="language-js"><span class="token comment">// repl-pad</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Elapsed <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"https://unpkg.com/ixfx/dist/flow.js"</span>

<span class="token comment">// A. Start monitoring elapsed time</span>
<span class="token keyword">const</span> i <span class="token operator">=</span> Elapsed<span class="token punctuation">.</span><span class="token function">interval</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// ...some time later ...</span>

<span class="token function">i</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// B. Elapsed time since (A)</span>
<span class="token comment">// ...some time later ...</span>
<span class="token function">i</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// C. Elapsed time since (B)</span></code></pre>
<h3 id="once">Once</h3>
<p><a href="https://clinth.github.io/ixfx/functions/Flow.Elapsed.once.html"><code is:raw>Elapsed.once</code></a> fixes both the start point and a second reference time. After initialisation, it records the time at which the first call happens. This is then given as the value for all future calls.</p>
<pre class="language-js"><code is:raw class="language-js"><span class="token comment">// repl-pad</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Elapsed <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"https://unpkg.com/ixfx/dist/flow.js"</span>

<span class="token comment">// A. Start monitoring elapsed time</span>
<span class="token keyword">const</span> o <span class="token operator">=</span> Elapsed<span class="token punctuation">.</span><span class="token function">once</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// ...some time later...</span>
<span class="token function">o</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// B. Time since (A). Since it is the first call, we now fix the second reference.</span>
<span class="token comment">// ...some time later...</span>
<span class="token function">o</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// C. Will be same value as earlier (B-A)</span>
<span class="token function">o</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// D. As above, forever</span></code></pre>
<h2 id="human-friendly-elapsed-time">Human-friendly elapsed time</h2>
<p><a href="https://clinth.github.io/ixfx/functions/Flow.Elapsed.toString.html"><code is:raw>toString</code></a> prints elapsed time in a human-friendly way:</p>
<pre class="language-js"><code is:raw class="language-js"><span class="token comment">// repl-pad</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Elapsed <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"https://unpkg.com/ixfx/dist/flow.js"</span>

<span class="token comment">// With .since()</span>
<span class="token keyword">const</span> elapsed <span class="token operator">=</span> Elapsed<span class="token punctuation">.</span><span class="token function">since</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
Elapsed<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span>elapsed<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// if it gets a function, it calls it</span>

<span class="token comment">// With regular millis</span>
<span class="token keyword">const</span> startTime <span class="token operator">=</span> Date<span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
Elapsed<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span>Date<span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> startTime<span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>
<h2 id="completion">Completion</h2>
<p>If you have a known time period and you want to track reaching that elapsed time, use
<a href="https://clinth.github.io/ixfx/functions/Flow.Elapsed.progress.html"><code is:raw>Elapsed.progress</code></a>. It yields a percentage of completion.</p>
<pre class="language-js"><code is:raw class="language-js"><span class="token comment">// repl-pad</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Elapsed <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"https://unpkg.com/ixfx/dist/flow.js"</span>

<span class="token comment">// Start tracking 1 second time duration</span>
<span class="token keyword">const</span> timer <span class="token operator">=</span> Elapsed<span class="token punctuation">.</span><span class="token function">progress</span><span class="token punctuation">(</span><span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// ...later, call timer() to calculate how much of the time has elapsed</span>
<span class="token comment">// eg 0.5 will mean that 500ms has elapsed, 2 will mean 2000ms has elapsed etc.</span>
<span class="token function">timer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Yields percentage</span></code></pre>
<p>You can clamp the result it is always between 0..1.</p>
<pre class="language-js"><code is:raw class="language-js"><span class="token keyword">const</span> timer <span class="token operator">=</span> Elapsed<span class="token punctuation">.</span><span class="token function">progress</span><span class="token punctuation">(</span><span class="token number">1000</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">clampValue</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">timer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Yields 0..1</span></code></pre>
<p>Values can also be wrapped, for example if the duration is 1000ms and 1500ms elapses, the return value will be 0.5.</p>
<pre class="language-js"><code is:raw class="language-js"><span class="token keyword">const</span> timer <span class="token operator">=</span> Elapsed<span class="token punctuation">.</span><span class="token function">progress</span><span class="token punctuation">(</span><span class="token number">1000</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">wrapValue</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">timer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// After 500ms: 0.5</span>
<span class="token function">timer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// After 1500ms: 0.5 </span></code></pre>
<p>Intervals can be used instead of milliseconds for more readable code:</p>
<pre class="language-js"><code is:raw class="language-js"><span class="token comment">// Track progress towards 4 minutes</span>
<span class="token keyword">const</span> timer <span class="token operator">=</span> Elapsed<span class="token punctuation">.</span><span class="token function">progress</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">mins</span><span class="token operator">:</span> <span class="token number">4</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>` } };
const $$metadata = createMetadata("/src/pages/flow/monitoring.md", { modules: [{ module: $$module1, specifier: "../../layouts/MainLayout.astro", assert: {} }, { module: $$module2, specifier: "../../components/DemoElement.ts", assert: {} }], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [{ type: "inline", value: `
import '/src/components/ReplPad';
` }] });
const $$Astro = createAstro("/src/pages/flow/monitoring.md", "https://clinth.github.io/ixfx-docs/", "file:///Users/af4766/repos/ixfx-docs/");
const $$Monitoring = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Monitoring;
  const $$content = { "title": "Monitoring", "astro": { "headers": [{ "depth": 2, "slug": "elapsed", "text": "Elapsed" }, { "depth": 3, "slug": "since", "text": "Since" }, { "depth": 3, "slug": "interval", "text": "Interval" }, { "depth": 3, "slug": "once", "text": "Once" }, { "depth": 2, "slug": "human-friendly-elapsed-time", "text": "Human-friendly elapsed time" }, { "depth": 2, "slug": "completion", "text": "Completion" }], "source": '\n<script type="module" hoist>\nimport \'/src/components/ReplPad\';\n<\/script>\n<div class="tip"><ul>\n<li>API Reference <a href="https://clinth.github.io/ixfx/modules/Flow.html">Flow</a>.<a href="https://clinth.github.io/ixfx/modules/Flow.Elapsed.html">Elapsed</a> module</li>\n<li><a href="https://clinth.github.io/ixfx-demos/flow/">Online demos</a></li>\n</ul></div>\n\nThe [`Elapsed`](https://clinth.github.io/ixfx/modules/Flow.Elapsed.html) module has a few functions for tracking passage of time.\n\nAn overview:\n* `Elapsed.since()`: time from a start point\n* `Elapsed.interval()`: time from start point, and between each subsequent call\n* `Elapsed.once()`: one-time measurement from a start point\n  \n## Elapsed\n\n### Since\n\n[`Elapsed.since`](https://clinth.github.io/ixfx/functions/Flow.Elapsed.since-1.html) yields how much time (in milliseconds) has passed since first invoked. This is the fixed reference point all later invocations are compared to.\n\n```js\n// repl-pad\nimport { Elapsed } from "https://unpkg.com/ixfx/dist/flow.js"\n\n// A. Start monitoring elapsed time\nconst s = Elapsed.since();\n\n// ...some time later ...\n\ns(); // B. Elapsed time since (A)\n// ...some time later ...\ns(); // C. Elapsed time since (A)\n```\n\n### Interval\n\n[`Elapsed.interval`](https://clinth.github.io/ixfx/functions/Flow.Elapsed.interval.html) reports the time from the first initialisation and each subsequent call. Unlike `since`, there is a not a fixed reference point. It is always comparing to either the initial time or when the callback was last run.\n\n```js\n// repl-pad\nimport { Elapsed } from "https://unpkg.com/ixfx/dist/flow.js"\n\n// A. Start monitoring elapsed time\nconst i = Elapsed.interval();\n\n// ...some time later ...\n\ni(); // B. Elapsed time since (A)\n// ...some time later ...\ni(); // C. Elapsed time since (B)\n```\n\n### Once\n\n[`Elapsed.once`](https://clinth.github.io/ixfx/functions/Flow.Elapsed.once.html) fixes both the start point and a second reference time. After initialisation, it records the time at which the first call happens. This is then given as the value for all future calls.\n\n```js\n// repl-pad\nimport { Elapsed } from "https://unpkg.com/ixfx/dist/flow.js"\n\n// A. Start monitoring elapsed time\nconst o = Elapsed.once();\n// ...some time later...\no(); // B. Time since (A). Since it is the first call, we now fix the second reference.\n// ...some time later...\no(); // C. Will be same value as earlier (B-A)\no(); // D. As above, forever\n ```\n\n## Human-friendly elapsed time\n\n[`toString`](https://clinth.github.io/ixfx/functions/Flow.Elapsed.toString.html) prints elapsed time in a human-friendly way:\n\n```js\n// repl-pad\nimport { Elapsed } from "https://unpkg.com/ixfx/dist/flow.js"\n\n// With .since()\nconst elapsed = Elapsed.since();\nElapsed.toString(elapsed); // if it gets a function, it calls it\n\n// With regular millis\nconst startTime = Date.now();\nElapsed.toString(Date.now() - startTime);\n```\n\n## Completion\n\nIf you have a known time period and you want to track reaching that elapsed time, use\n[`Elapsed.progress`](https://clinth.github.io/ixfx/functions/Flow.Elapsed.progress.html). It yields a percentage of completion.\n\n```js\n// repl-pad\nimport { Elapsed } from "https://unpkg.com/ixfx/dist/flow.js"\n\n// Start tracking 1 second time duration\nconst timer = Elapsed.progress(1000);\n\n// ...later, call timer() to calculate how much of the time has elapsed\n// eg 0.5 will mean that 500ms has elapsed, 2 will mean 2000ms has elapsed etc.\ntimer(); // Yields percentage\n```\n\nYou can clamp the result it is always between 0..1.\n\n```js\nconst timer = Elapsed.progress(1000, { clampValue: true });\ntimer(); // Yields 0..1\n```\n\nValues can also be wrapped, for example if the duration is 1000ms and 1500ms elapses, the return value will be 0.5.\n\n```js\nconst timer = Elapsed.progress(1000, { wrapValue: true });\ntimer(); // After 500ms: 0.5\ntimer(); // After 1500ms: 0.5 \n```\n\nIntervals can be used instead of milliseconds for more readable code:\n```js\n// Track progress towards 4 minutes\nconst timer = Elapsed.progress({ mins: 4 });\n```\n', "html": `<script type="module" hoist>
import '/src/components/ReplPad';
<\/script>
<div class="tip"><ul>
<li>API Reference <a href="https://clinth.github.io/ixfx/modules/Flow.html">Flow</a>.<a href="https://clinth.github.io/ixfx/modules/Flow.Elapsed.html">Elapsed</a> module</li>
<li><a href="https://clinth.github.io/ixfx-demos/flow/">Online demos</a></li>
</ul></div>
<p>The <a href="https://clinth.github.io/ixfx/modules/Flow.Elapsed.html"><code is:raw>Elapsed</code></a> module has a few functions for tracking passage of time.</p>
<p>An overview:</p>
<ul>
<li><code is:raw>Elapsed.since()</code>: time from a start point</li>
<li><code is:raw>Elapsed.interval()</code>: time from start point, and between each subsequent call</li>
<li><code is:raw>Elapsed.once()</code>: one-time measurement from a start point</li>
</ul>
<h2 id="elapsed">Elapsed</h2>
<h3 id="since">Since</h3>
<p><a href="https://clinth.github.io/ixfx/functions/Flow.Elapsed.since-1.html"><code is:raw>Elapsed.since</code></a> yields how much time (in milliseconds) has passed since first invoked. This is the fixed reference point all later invocations are compared to.</p>
<pre class="language-js"><code is:raw class="language-js"><span class="token comment">// repl-pad</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Elapsed <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"https://unpkg.com/ixfx/dist/flow.js"</span>

<span class="token comment">// A. Start monitoring elapsed time</span>
<span class="token keyword">const</span> s <span class="token operator">=</span> Elapsed<span class="token punctuation">.</span><span class="token function">since</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// ...some time later ...</span>

<span class="token function">s</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// B. Elapsed time since (A)</span>
<span class="token comment">// ...some time later ...</span>
<span class="token function">s</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// C. Elapsed time since (A)</span></code></pre>
<h3 id="interval">Interval</h3>
<p><a href="https://clinth.github.io/ixfx/functions/Flow.Elapsed.interval.html"><code is:raw>Elapsed.interval</code></a> reports the time from the first initialisation and each subsequent call. Unlike <code is:raw>since</code>, there is a not a fixed reference point. It is always comparing to either the initial time or when the callback was last run.</p>
<pre class="language-js"><code is:raw class="language-js"><span class="token comment">// repl-pad</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Elapsed <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"https://unpkg.com/ixfx/dist/flow.js"</span>

<span class="token comment">// A. Start monitoring elapsed time</span>
<span class="token keyword">const</span> i <span class="token operator">=</span> Elapsed<span class="token punctuation">.</span><span class="token function">interval</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// ...some time later ...</span>

<span class="token function">i</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// B. Elapsed time since (A)</span>
<span class="token comment">// ...some time later ...</span>
<span class="token function">i</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// C. Elapsed time since (B)</span></code></pre>
<h3 id="once">Once</h3>
<p><a href="https://clinth.github.io/ixfx/functions/Flow.Elapsed.once.html"><code is:raw>Elapsed.once</code></a> fixes both the start point and a second reference time. After initialisation, it records the time at which the first call happens. This is then given as the value for all future calls.</p>
<pre class="language-js"><code is:raw class="language-js"><span class="token comment">// repl-pad</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Elapsed <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"https://unpkg.com/ixfx/dist/flow.js"</span>

<span class="token comment">// A. Start monitoring elapsed time</span>
<span class="token keyword">const</span> o <span class="token operator">=</span> Elapsed<span class="token punctuation">.</span><span class="token function">once</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// ...some time later...</span>
<span class="token function">o</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// B. Time since (A). Since it is the first call, we now fix the second reference.</span>
<span class="token comment">// ...some time later...</span>
<span class="token function">o</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// C. Will be same value as earlier (B-A)</span>
<span class="token function">o</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// D. As above, forever</span></code></pre>
<h2 id="human-friendly-elapsed-time">Human-friendly elapsed time</h2>
<p><a href="https://clinth.github.io/ixfx/functions/Flow.Elapsed.toString.html"><code is:raw>toString</code></a> prints elapsed time in a human-friendly way:</p>
<pre class="language-js"><code is:raw class="language-js"><span class="token comment">// repl-pad</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Elapsed <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"https://unpkg.com/ixfx/dist/flow.js"</span>

<span class="token comment">// With .since()</span>
<span class="token keyword">const</span> elapsed <span class="token operator">=</span> Elapsed<span class="token punctuation">.</span><span class="token function">since</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
Elapsed<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span>elapsed<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// if it gets a function, it calls it</span>

<span class="token comment">// With regular millis</span>
<span class="token keyword">const</span> startTime <span class="token operator">=</span> Date<span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
Elapsed<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span>Date<span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> startTime<span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>
<h2 id="completion">Completion</h2>
<p>If you have a known time period and you want to track reaching that elapsed time, use
<a href="https://clinth.github.io/ixfx/functions/Flow.Elapsed.progress.html"><code is:raw>Elapsed.progress</code></a>. It yields a percentage of completion.</p>
<pre class="language-js"><code is:raw class="language-js"><span class="token comment">// repl-pad</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Elapsed <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"https://unpkg.com/ixfx/dist/flow.js"</span>

<span class="token comment">// Start tracking 1 second time duration</span>
<span class="token keyword">const</span> timer <span class="token operator">=</span> Elapsed<span class="token punctuation">.</span><span class="token function">progress</span><span class="token punctuation">(</span><span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// ...later, call timer() to calculate how much of the time has elapsed</span>
<span class="token comment">// eg 0.5 will mean that 500ms has elapsed, 2 will mean 2000ms has elapsed etc.</span>
<span class="token function">timer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Yields percentage</span></code></pre>
<p>You can clamp the result it is always between 0..1.</p>
<pre class="language-js"><code is:raw class="language-js"><span class="token keyword">const</span> timer <span class="token operator">=</span> Elapsed<span class="token punctuation">.</span><span class="token function">progress</span><span class="token punctuation">(</span><span class="token number">1000</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">clampValue</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">timer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Yields 0..1</span></code></pre>
<p>Values can also be wrapped, for example if the duration is 1000ms and 1500ms elapses, the return value will be 0.5.</p>
<pre class="language-js"><code is:raw class="language-js"><span class="token keyword">const</span> timer <span class="token operator">=</span> Elapsed<span class="token punctuation">.</span><span class="token function">progress</span><span class="token punctuation">(</span><span class="token number">1000</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">wrapValue</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">timer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// After 500ms: 0.5</span>
<span class="token function">timer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// After 1500ms: 0.5 </span></code></pre>
<p>Intervals can be used instead of milliseconds for more readable code:</p>
<pre class="language-js"><code is:raw class="language-js"><span class="token comment">// Track progress towards 4 minutes</span>
<span class="token keyword">const</span> timer <span class="token operator">=</span> Elapsed<span class="token punctuation">.</span><span class="token function">progress</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">mins</span><span class="token operator">:</span> <span class="token number">4</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>` } };
  const SCRIPTS = [
    { props: { "type": "module", "hoist": true }, children: `import '/src/components/ReplPad';` }
  ];
  for (const SCRIPT of SCRIPTS)
    $$result.scripts.add(SCRIPT);
  return render`${renderComponent($$result, "Layout", $$MainLayout, { "content": $$content }, { "default": () => render`<div class="tip"><ul>
<li>API Reference <a href="https://clinth.github.io/ixfx/modules/Flow.html">Flow</a>.<a href="https://clinth.github.io/ixfx/modules/Flow.Elapsed.html">Elapsed</a> module</li>
<li><a href="https://clinth.github.io/ixfx-demos/flow/">Online demos</a></li>
</ul></div><p>The <a href="https://clinth.github.io/ixfx/modules/Flow.Elapsed.html"><code>Elapsed</code></a> module has a few functions for tracking passage of time.</p><p>An overview:</p><ul>
<li><code>Elapsed.since()</code>: time from a start point</li>
<li><code>Elapsed.interval()</code>: time from start point, and between each subsequent call</li>
<li><code>Elapsed.once()</code>: one-time measurement from a start point</li>
</ul><h2 id="elapsed">Elapsed</h2><h3 id="since">Since</h3><p><a href="https://clinth.github.io/ixfx/functions/Flow.Elapsed.since-1.html"><code>Elapsed.since</code></a> yields how much time (in milliseconds) has passed since first invoked. This is the fixed reference point all later invocations are compared to.</p><pre class="language-js"><code class="language-js"><span class="token comment">// repl-pad</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Elapsed <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"https://unpkg.com/ixfx/dist/flow.js"</span>

<span class="token comment">// A. Start monitoring elapsed time</span>
<span class="token keyword">const</span> s <span class="token operator">=</span> Elapsed<span class="token punctuation">.</span><span class="token function">since</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// ...some time later ...</span>

<span class="token function">s</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// B. Elapsed time since (A)</span>
<span class="token comment">// ...some time later ...</span>
<span class="token function">s</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// C. Elapsed time since (A)</span></code></pre><h3 id="interval">Interval</h3><p><a href="https://clinth.github.io/ixfx/functions/Flow.Elapsed.interval.html"><code>Elapsed.interval</code></a> reports the time from the first initialisation and each subsequent call. Unlike <code>since</code>, there is a not a fixed reference point. It is always comparing to either the initial time or when the callback was last run.</p><pre class="language-js"><code class="language-js"><span class="token comment">// repl-pad</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Elapsed <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"https://unpkg.com/ixfx/dist/flow.js"</span>

<span class="token comment">// A. Start monitoring elapsed time</span>
<span class="token keyword">const</span> i <span class="token operator">=</span> Elapsed<span class="token punctuation">.</span><span class="token function">interval</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// ...some time later ...</span>

<span class="token function">i</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// B. Elapsed time since (A)</span>
<span class="token comment">// ...some time later ...</span>
<span class="token function">i</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// C. Elapsed time since (B)</span></code></pre><h3 id="once">Once</h3><p><a href="https://clinth.github.io/ixfx/functions/Flow.Elapsed.once.html"><code>Elapsed.once</code></a> fixes both the start point and a second reference time. After initialisation, it records the time at which the first call happens. This is then given as the value for all future calls.</p><pre class="language-js"><code class="language-js"><span class="token comment">// repl-pad</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Elapsed <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"https://unpkg.com/ixfx/dist/flow.js"</span>

<span class="token comment">// A. Start monitoring elapsed time</span>
<span class="token keyword">const</span> o <span class="token operator">=</span> Elapsed<span class="token punctuation">.</span><span class="token function">once</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// ...some time later...</span>
<span class="token function">o</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// B. Time since (A). Since it is the first call, we now fix the second reference.</span>
<span class="token comment">// ...some time later...</span>
<span class="token function">o</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// C. Will be same value as earlier (B-A)</span>
<span class="token function">o</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// D. As above, forever</span></code></pre><h2 id="human-friendly-elapsed-time">Human-friendly elapsed time</h2><p><a href="https://clinth.github.io/ixfx/functions/Flow.Elapsed.toString.html"><code>toString</code></a> prints elapsed time in a human-friendly way:</p><pre class="language-js"><code class="language-js"><span class="token comment">// repl-pad</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Elapsed <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"https://unpkg.com/ixfx/dist/flow.js"</span>

<span class="token comment">// With .since()</span>
<span class="token keyword">const</span> elapsed <span class="token operator">=</span> Elapsed<span class="token punctuation">.</span><span class="token function">since</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
Elapsed<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span>elapsed<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// if it gets a function, it calls it</span>

<span class="token comment">// With regular millis</span>
<span class="token keyword">const</span> startTime <span class="token operator">=</span> Date<span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
Elapsed<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span>Date<span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> startTime<span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre><h2 id="completion">Completion</h2><p>If you have a known time period and you want to track reaching that elapsed time, use
<a href="https://clinth.github.io/ixfx/functions/Flow.Elapsed.progress.html"><code>Elapsed.progress</code></a>. It yields a percentage of completion.</p><pre class="language-js"><code class="language-js"><span class="token comment">// repl-pad</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Elapsed <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"https://unpkg.com/ixfx/dist/flow.js"</span>

<span class="token comment">// Start tracking 1 second time duration</span>
<span class="token keyword">const</span> timer <span class="token operator">=</span> Elapsed<span class="token punctuation">.</span><span class="token function">progress</span><span class="token punctuation">(</span><span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// ...later, call timer() to calculate how much of the time has elapsed</span>
<span class="token comment">// eg 0.5 will mean that 500ms has elapsed, 2 will mean 2000ms has elapsed etc.</span>
<span class="token function">timer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Yields percentage</span></code></pre><p>You can clamp the result it is always between 0..1.</p><pre class="language-js"><code class="language-js"><span class="token keyword">const</span> timer <span class="token operator">=</span> Elapsed<span class="token punctuation">.</span><span class="token function">progress</span><span class="token punctuation">(</span><span class="token number">1000</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">clampValue</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">timer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Yields 0..1</span></code></pre><p>Values can also be wrapped, for example if the duration is 1000ms and 1500ms elapses, the return value will be 0.5.</p><pre class="language-js"><code class="language-js"><span class="token keyword">const</span> timer <span class="token operator">=</span> Elapsed<span class="token punctuation">.</span><span class="token function">progress</span><span class="token punctuation">(</span><span class="token number">1000</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">wrapValue</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">timer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// After 500ms: 0.5</span>
<span class="token function">timer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// After 1500ms: 0.5 </span></code></pre><p>Intervals can be used instead of milliseconds for more readable code:</p><pre class="language-js"><code class="language-js"><span class="token comment">// Track progress towards 4 minutes</span>
<span class="token keyword">const</span> timer <span class="token operator">=</span> Elapsed<span class="token punctuation">.</span><span class="token function">progress</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">mins</span><span class="token operator">:</span> <span class="token number">4</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>` })}`;
});

export { $$metadata, $$Monitoring as default, frontmatter, metadata };
