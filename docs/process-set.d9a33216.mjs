import { c as createMetadata, a as createAstro, b as createComponent, r as render, d as renderComponent } from './chunks/index.7bfc2e7e.mjs';
import { $ as $$module1, a as $$MainLayout } from './chunks/MainLayout.fae6d6b7.mjs';
import 'shorthash';
import 'serialize-javascript';
import 'preact/hooks';
import 'preact/jsx-runtime';
import 'lit';

const metadata = { "headers": [{ "depth": 1, "slug": "known-list", "text": "Known list" }, { "depth": 1, "slug": "ad-hoc-list", "text": "Ad-hoc list" }], "source": "\nThis pattern shows how to process a list of items with a timed delay.\n\n# Known list\n\nThis pattern shows how to process a list of items known in advance.\n\n```js\nconst items = [ 'apple', 'orange', 'pear' ];\nfor await (const item of interval(items, { fixed: 1000 })) {\n  // Process an item every one second...\n}\n```\n\n# Ad-hoc list\n\nThis pattern shows how to process items that are being added to a queue or stack on an ad-hoc basis. Eg, being added as a result of a user clicking something.\n\nUse a [Queue](../collections/queue/) or [Stack](../collections/stack/) data structure depending on how you want items to be prioritised. The example below uses a stack, meaning that most recent additions get processed first. We use ...\n\n\n```js\nimport { continuously } from \"https://unpkg.com/ixfx/dist/flow.js\"\nimport { Stacks } from \"https://unpkg.com/ixfx/dist/collections.js\"\n\n// Eg: limit stack to 10 items\nlet toProcess = Stacks.stack({ capacity: 10 });\n\n// Set up continuously, and a function to handle items\nconst processor = continuously(() => {\n  // Stack is empty, return false to end the continuously loop\n  if (toProcess.isEmpty) return false; \n\n  // Get the top-most item (ie most recently added)\n  const item = toProcess.peek;\n\n  // Remove item, assigning changed stack to the toProcess variable\n  toProcess = toProcess.pop();\n\n  // Do something with item\n  // ...\n  \n  // If we return true, the loop will keep running, processing each item in stack\n  return true;\n}, 1000); // Process an item every second.\n\n\n// Function to add to stack and start processor if necessary\nconst process = (item) => {\n  toProcess = toProcess.push(item);\n  \n  // Start if it's not already running\n  processor.start();\n}\n\n// Somewhere else in our code, we can add and start running\nprocess(`some item`);\n```\n\n* [Online demo](https://clinth.github.io/ixfx-demos/flow/) ([source](https://github.com/ClintH/ixfx-demos/tree/main/flow/list-async))\n", "html": `<p>This pattern shows how to process a list of items with a timed delay.</p>
<h1 id="known-list">Known list</h1>
<p>This pattern shows how to process a list of items known in advance.</p>
<pre class="language-js"><code is:raw class="language-js"><span class="token keyword">const</span> items <span class="token operator">=</span> <span class="token punctuation">[</span> <span class="token string">'apple'</span><span class="token punctuation">,</span> <span class="token string">'orange'</span><span class="token punctuation">,</span> <span class="token string">'pear'</span> <span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">for</span> <span class="token keyword">await</span> <span class="token punctuation">(</span><span class="token keyword">const</span> item <span class="token keyword">of</span> <span class="token function">interval</span><span class="token punctuation">(</span>items<span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">fixed</span><span class="token operator">:</span> <span class="token number">1000</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// Process an item every one second...</span>
<span class="token punctuation">}</span></code></pre>
<h1 id="ad-hoc-list">Ad-hoc list</h1>
<p>This pattern shows how to process items that are being added to a queue or stack on an ad-hoc basis. Eg, being added as a result of a user clicking something.</p>
<p>Use a <a href="../collections/queue/">Queue</a> or <a href="../collections/stack/">Stack</a> data structure depending on how you want items to be prioritised. The example below uses a stack, meaning that most recent additions get processed first. We use ...</p>
<pre class="language-js"><code is:raw class="language-js"><span class="token keyword">import</span> <span class="token punctuation">{</span> continuously <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"https://unpkg.com/ixfx/dist/flow.js"</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Stacks <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"https://unpkg.com/ixfx/dist/collections.js"</span>

<span class="token comment">// Eg: limit stack to 10 items</span>
<span class="token keyword">let</span> toProcess <span class="token operator">=</span> Stacks<span class="token punctuation">.</span><span class="token function">stack</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">capacity</span><span class="token operator">:</span> <span class="token number">10</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// Set up continuously, and a function to handle items</span>
<span class="token keyword">const</span> processor <span class="token operator">=</span> <span class="token function">continuously</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token comment">// Stack is empty, return false to end the continuously loop</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>toProcess<span class="token punctuation">.</span>isEmpty<span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span> 

  <span class="token comment">// Get the top-most item (ie most recently added)</span>
  <span class="token keyword">const</span> item <span class="token operator">=</span> toProcess<span class="token punctuation">.</span>peek<span class="token punctuation">;</span>

  <span class="token comment">// Remove item, assigning changed stack to the toProcess variable</span>
  toProcess <span class="token operator">=</span> toProcess<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// Do something with item</span>
  <span class="token comment">// ...</span>
  
  <span class="token comment">// If we return true, the loop will keep running, processing each item in stack</span>
  <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Process an item every second.</span>


<span class="token comment">// Function to add to stack and start processor if necessary</span>
<span class="token keyword">const</span> <span class="token function-variable function">process</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">item</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  toProcess <span class="token operator">=</span> toProcess<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span><span class="token punctuation">;</span>
  
  <span class="token comment">// Start if it's not already running</span>
  processor<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// Somewhere else in our code, we can add and start running</span>
<span class="token function">process</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">some item</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>
<ul>
<li><a href="https://clinth.github.io/ixfx-demos/flow/">Online demo</a> (<a href="https://github.com/ClintH/ixfx-demos/tree/main/flow/list-async">source</a>)</li>
</ul>` };
const frontmatter = { "title": "Process a set of items", "astro": { "headers": [{ "depth": 1, "slug": "known-list", "text": "Known list" }, { "depth": 1, "slug": "ad-hoc-list", "text": "Ad-hoc list" }], "source": "\nThis pattern shows how to process a list of items with a timed delay.\n\n# Known list\n\nThis pattern shows how to process a list of items known in advance.\n\n```js\nconst items = [ 'apple', 'orange', 'pear' ];\nfor await (const item of interval(items, { fixed: 1000 })) {\n  // Process an item every one second...\n}\n```\n\n# Ad-hoc list\n\nThis pattern shows how to process items that are being added to a queue or stack on an ad-hoc basis. Eg, being added as a result of a user clicking something.\n\nUse a [Queue](../collections/queue/) or [Stack](../collections/stack/) data structure depending on how you want items to be prioritised. The example below uses a stack, meaning that most recent additions get processed first. We use ...\n\n\n```js\nimport { continuously } from \"https://unpkg.com/ixfx/dist/flow.js\"\nimport { Stacks } from \"https://unpkg.com/ixfx/dist/collections.js\"\n\n// Eg: limit stack to 10 items\nlet toProcess = Stacks.stack({ capacity: 10 });\n\n// Set up continuously, and a function to handle items\nconst processor = continuously(() => {\n  // Stack is empty, return false to end the continuously loop\n  if (toProcess.isEmpty) return false; \n\n  // Get the top-most item (ie most recently added)\n  const item = toProcess.peek;\n\n  // Remove item, assigning changed stack to the toProcess variable\n  toProcess = toProcess.pop();\n\n  // Do something with item\n  // ...\n  \n  // If we return true, the loop will keep running, processing each item in stack\n  return true;\n}, 1000); // Process an item every second.\n\n\n// Function to add to stack and start processor if necessary\nconst process = (item) => {\n  toProcess = toProcess.push(item);\n  \n  // Start if it's not already running\n  processor.start();\n}\n\n// Somewhere else in our code, we can add and start running\nprocess(`some item`);\n```\n\n* [Online demo](https://clinth.github.io/ixfx-demos/flow/) ([source](https://github.com/ClintH/ixfx-demos/tree/main/flow/list-async))\n", "html": `<p>This pattern shows how to process a list of items with a timed delay.</p>
<h1 id="known-list">Known list</h1>
<p>This pattern shows how to process a list of items known in advance.</p>
<pre class="language-js"><code is:raw class="language-js"><span class="token keyword">const</span> items <span class="token operator">=</span> <span class="token punctuation">[</span> <span class="token string">'apple'</span><span class="token punctuation">,</span> <span class="token string">'orange'</span><span class="token punctuation">,</span> <span class="token string">'pear'</span> <span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">for</span> <span class="token keyword">await</span> <span class="token punctuation">(</span><span class="token keyword">const</span> item <span class="token keyword">of</span> <span class="token function">interval</span><span class="token punctuation">(</span>items<span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">fixed</span><span class="token operator">:</span> <span class="token number">1000</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// Process an item every one second...</span>
<span class="token punctuation">}</span></code></pre>
<h1 id="ad-hoc-list">Ad-hoc list</h1>
<p>This pattern shows how to process items that are being added to a queue or stack on an ad-hoc basis. Eg, being added as a result of a user clicking something.</p>
<p>Use a <a href="../collections/queue/">Queue</a> or <a href="../collections/stack/">Stack</a> data structure depending on how you want items to be prioritised. The example below uses a stack, meaning that most recent additions get processed first. We use ...</p>
<pre class="language-js"><code is:raw class="language-js"><span class="token keyword">import</span> <span class="token punctuation">{</span> continuously <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"https://unpkg.com/ixfx/dist/flow.js"</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Stacks <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"https://unpkg.com/ixfx/dist/collections.js"</span>

<span class="token comment">// Eg: limit stack to 10 items</span>
<span class="token keyword">let</span> toProcess <span class="token operator">=</span> Stacks<span class="token punctuation">.</span><span class="token function">stack</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">capacity</span><span class="token operator">:</span> <span class="token number">10</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// Set up continuously, and a function to handle items</span>
<span class="token keyword">const</span> processor <span class="token operator">=</span> <span class="token function">continuously</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token comment">// Stack is empty, return false to end the continuously loop</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>toProcess<span class="token punctuation">.</span>isEmpty<span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span> 

  <span class="token comment">// Get the top-most item (ie most recently added)</span>
  <span class="token keyword">const</span> item <span class="token operator">=</span> toProcess<span class="token punctuation">.</span>peek<span class="token punctuation">;</span>

  <span class="token comment">// Remove item, assigning changed stack to the toProcess variable</span>
  toProcess <span class="token operator">=</span> toProcess<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// Do something with item</span>
  <span class="token comment">// ...</span>
  
  <span class="token comment">// If we return true, the loop will keep running, processing each item in stack</span>
  <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Process an item every second.</span>


<span class="token comment">// Function to add to stack and start processor if necessary</span>
<span class="token keyword">const</span> <span class="token function-variable function">process</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">item</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  toProcess <span class="token operator">=</span> toProcess<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span><span class="token punctuation">;</span>
  
  <span class="token comment">// Start if it's not already running</span>
  processor<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// Somewhere else in our code, we can add and start running</span>
<span class="token function">process</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">some item</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>
<ul>
<li><a href="https://clinth.github.io/ixfx-demos/flow/">Online demo</a> (<a href="https://github.com/ClintH/ixfx-demos/tree/main/flow/list-async">source</a>)</li>
</ul>` } };
const $$metadata = createMetadata("/src/pages/data/process-set.md", { modules: [{ module: $$module1, specifier: "../../layouts/MainLayout.astro", assert: {} }], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
const $$Astro = createAstro("/src/pages/data/process-set.md", "https://clinth.github.io/ixfx-docs/", "file:///Users/af4766/repos/ixfx-docs/");
const $$ProcessSet = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ProcessSet;
  const $$content = { "title": "Process a set of items", "astro": { "headers": [{ "depth": 1, "slug": "known-list", "text": "Known list" }, { "depth": 1, "slug": "ad-hoc-list", "text": "Ad-hoc list" }], "source": "\nThis pattern shows how to process a list of items with a timed delay.\n\n# Known list\n\nThis pattern shows how to process a list of items known in advance.\n\n```js\nconst items = [ 'apple', 'orange', 'pear' ];\nfor await (const item of interval(items, { fixed: 1000 })) {\n  // Process an item every one second...\n}\n```\n\n# Ad-hoc list\n\nThis pattern shows how to process items that are being added to a queue or stack on an ad-hoc basis. Eg, being added as a result of a user clicking something.\n\nUse a [Queue](../collections/queue/) or [Stack](../collections/stack/) data structure depending on how you want items to be prioritised. The example below uses a stack, meaning that most recent additions get processed first. We use ...\n\n\n```js\nimport { continuously } from \"https://unpkg.com/ixfx/dist/flow.js\"\nimport { Stacks } from \"https://unpkg.com/ixfx/dist/collections.js\"\n\n// Eg: limit stack to 10 items\nlet toProcess = Stacks.stack({ capacity: 10 });\n\n// Set up continuously, and a function to handle items\nconst processor = continuously(() => {\n  // Stack is empty, return false to end the continuously loop\n  if (toProcess.isEmpty) return false; \n\n  // Get the top-most item (ie most recently added)\n  const item = toProcess.peek;\n\n  // Remove item, assigning changed stack to the toProcess variable\n  toProcess = toProcess.pop();\n\n  // Do something with item\n  // ...\n  \n  // If we return true, the loop will keep running, processing each item in stack\n  return true;\n}, 1000); // Process an item every second.\n\n\n// Function to add to stack and start processor if necessary\nconst process = (item) => {\n  toProcess = toProcess.push(item);\n  \n  // Start if it's not already running\n  processor.start();\n}\n\n// Somewhere else in our code, we can add and start running\nprocess(`some item`);\n```\n\n* [Online demo](https://clinth.github.io/ixfx-demos/flow/) ([source](https://github.com/ClintH/ixfx-demos/tree/main/flow/list-async))\n", "html": `<p>This pattern shows how to process a list of items with a timed delay.</p>
<h1 id="known-list">Known list</h1>
<p>This pattern shows how to process a list of items known in advance.</p>
<pre class="language-js"><code is:raw class="language-js"><span class="token keyword">const</span> items <span class="token operator">=</span> <span class="token punctuation">[</span> <span class="token string">'apple'</span><span class="token punctuation">,</span> <span class="token string">'orange'</span><span class="token punctuation">,</span> <span class="token string">'pear'</span> <span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">for</span> <span class="token keyword">await</span> <span class="token punctuation">(</span><span class="token keyword">const</span> item <span class="token keyword">of</span> <span class="token function">interval</span><span class="token punctuation">(</span>items<span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">fixed</span><span class="token operator">:</span> <span class="token number">1000</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// Process an item every one second...</span>
<span class="token punctuation">}</span></code></pre>
<h1 id="ad-hoc-list">Ad-hoc list</h1>
<p>This pattern shows how to process items that are being added to a queue or stack on an ad-hoc basis. Eg, being added as a result of a user clicking something.</p>
<p>Use a <a href="../collections/queue/">Queue</a> or <a href="../collections/stack/">Stack</a> data structure depending on how you want items to be prioritised. The example below uses a stack, meaning that most recent additions get processed first. We use ...</p>
<pre class="language-js"><code is:raw class="language-js"><span class="token keyword">import</span> <span class="token punctuation">{</span> continuously <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"https://unpkg.com/ixfx/dist/flow.js"</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Stacks <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"https://unpkg.com/ixfx/dist/collections.js"</span>

<span class="token comment">// Eg: limit stack to 10 items</span>
<span class="token keyword">let</span> toProcess <span class="token operator">=</span> Stacks<span class="token punctuation">.</span><span class="token function">stack</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">capacity</span><span class="token operator">:</span> <span class="token number">10</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// Set up continuously, and a function to handle items</span>
<span class="token keyword">const</span> processor <span class="token operator">=</span> <span class="token function">continuously</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token comment">// Stack is empty, return false to end the continuously loop</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>toProcess<span class="token punctuation">.</span>isEmpty<span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span> 

  <span class="token comment">// Get the top-most item (ie most recently added)</span>
  <span class="token keyword">const</span> item <span class="token operator">=</span> toProcess<span class="token punctuation">.</span>peek<span class="token punctuation">;</span>

  <span class="token comment">// Remove item, assigning changed stack to the toProcess variable</span>
  toProcess <span class="token operator">=</span> toProcess<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// Do something with item</span>
  <span class="token comment">// ...</span>
  
  <span class="token comment">// If we return true, the loop will keep running, processing each item in stack</span>
  <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Process an item every second.</span>


<span class="token comment">// Function to add to stack and start processor if necessary</span>
<span class="token keyword">const</span> <span class="token function-variable function">process</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">item</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  toProcess <span class="token operator">=</span> toProcess<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span><span class="token punctuation">;</span>
  
  <span class="token comment">// Start if it's not already running</span>
  processor<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// Somewhere else in our code, we can add and start running</span>
<span class="token function">process</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">some item</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>
<ul>
<li><a href="https://clinth.github.io/ixfx-demos/flow/">Online demo</a> (<a href="https://github.com/ClintH/ixfx-demos/tree/main/flow/list-async">source</a>)</li>
</ul>` } };
  return render`${renderComponent($$result, "Layout", $$MainLayout, { "content": $$content }, { "default": () => render`<p>This pattern shows how to process a list of items with a timed delay.</p><h1 id="known-list">Known list</h1><p>This pattern shows how to process a list of items known in advance.</p><pre class="language-js"><code class="language-js"><span class="token keyword">const</span> items <span class="token operator">=</span> <span class="token punctuation">[</span> <span class="token string">'apple'</span><span class="token punctuation">,</span> <span class="token string">'orange'</span><span class="token punctuation">,</span> <span class="token string">'pear'</span> <span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">for</span> <span class="token keyword">await</span> <span class="token punctuation">(</span><span class="token keyword">const</span> item <span class="token keyword">of</span> <span class="token function">interval</span><span class="token punctuation">(</span>items<span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">fixed</span><span class="token operator">:</span> <span class="token number">1000</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// Process an item every one second...</span>
<span class="token punctuation">}</span></code></pre><h1 id="ad-hoc-list">Ad-hoc list</h1><p>This pattern shows how to process items that are being added to a queue or stack on an ad-hoc basis. Eg, being added as a result of a user clicking something.</p><p>Use a <a href="../collections/queue/">Queue</a> or <a href="../collections/stack/">Stack</a> data structure depending on how you want items to be prioritised. The example below uses a stack, meaning that most recent additions get processed first. We use ...</p><pre class="language-js"><code class="language-js"><span class="token keyword">import</span> <span class="token punctuation">{</span> continuously <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"https://unpkg.com/ixfx/dist/flow.js"</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Stacks <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"https://unpkg.com/ixfx/dist/collections.js"</span>

<span class="token comment">// Eg: limit stack to 10 items</span>
<span class="token keyword">let</span> toProcess <span class="token operator">=</span> Stacks<span class="token punctuation">.</span><span class="token function">stack</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">capacity</span><span class="token operator">:</span> <span class="token number">10</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// Set up continuously, and a function to handle items</span>
<span class="token keyword">const</span> processor <span class="token operator">=</span> <span class="token function">continuously</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token comment">// Stack is empty, return false to end the continuously loop</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>toProcess<span class="token punctuation">.</span>isEmpty<span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span> 

  <span class="token comment">// Get the top-most item (ie most recently added)</span>
  <span class="token keyword">const</span> item <span class="token operator">=</span> toProcess<span class="token punctuation">.</span>peek<span class="token punctuation">;</span>

  <span class="token comment">// Remove item, assigning changed stack to the toProcess variable</span>
  toProcess <span class="token operator">=</span> toProcess<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// Do something with item</span>
  <span class="token comment">// ...</span>
  
  <span class="token comment">// If we return true, the loop will keep running, processing each item in stack</span>
  <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Process an item every second.</span>


<span class="token comment">// Function to add to stack and start processor if necessary</span>
<span class="token keyword">const</span> <span class="token function-variable function">process</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">item</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  toProcess <span class="token operator">=</span> toProcess<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span><span class="token punctuation">;</span>
  
  <span class="token comment">// Start if it's not already running</span>
  processor<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// Somewhere else in our code, we can add and start running</span>
<span class="token function">process</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">some item</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre><ul>
<li><a href="https://clinth.github.io/ixfx-demos/flow/">Online demo</a> (<a href="https://github.com/ClintH/ixfx-demos/tree/main/flow/list-async">source</a>)</li>
</ul>` })}`;
});

export { $$metadata, $$ProcessSet as default, frontmatter, metadata };
