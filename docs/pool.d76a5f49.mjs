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

const metadata = { "headers": [{ "depth": 2, "slug": "in-action-manual-resources", "text": "In action: manual resources" }, { "depth": 2, "slug": "in-action-automatically-generating-resources", "text": "In action: automatically generating resources" }, { "depth": 2, "slug": "creating", "text": "Creating" }, { "depth": 2, "slug": "accessing-resources", "text": "Accessing resources" }, { "depth": 2, "slug": "misc", "text": "Misc." }], "source": "\n<div class=\"tip\">\n<ul>\n<li>API Reference <a href=\"https://clinth.github.io/ixfx/classes/Data.Pool.Pool.html\">Data.Pool class</a></li>\n<li>Parent <a href=\"https://clinth.github.io/ixfx/modules/Data.html\">Data module</a></li>\n</div>\n\nThe [Pool](https://clinth.github.io/ixfx/classes/Data.Pool.Pool.html) class does the housekeeping of managing a limited set of resources which are shared by 'users'. All resources in the Pool are meant to be the same kind of object.\n\nAn example is an audio sketch driven by TensorFlow. We might want to allocate a sound oscillator per detected human body. A naive implementation would be to make an oscillator for each detected body. However, because poses appear/disappear unpredictably, it's a lot of extra work to maintain the binding between pose and oscillator.\n\nInstead, we might use the [Pool](https://clinth.github.io/ixfx/classes/Data.Pool.Pool.html) to allocate oscillators to poses. This will allow us to limit resources and clean up automatically if they haven't been used for a while.\n\nResources can be added manually with `addResource()`, or automatically by providing a `generate()` function in the Pool options. They can then be accessed via a _user key_. This is meant to associated with a single 'user' of a resource. For example, if we are associating oscillators with TensorFlow poses, the 'user key' might be the id of the pose.\n\n## In action: manual resources\n\nThe Pool is created, and resources added:\n\n```js\nimport { Pool } from 'https://unpkg.com/ixfx/dist/data.js';\nconst pool = Pool.create({\n  capacity: oscillators.length,\n  // Remove 'users' if they haven't been seen after one second\n  userExpireAfterMs: 1000,\n  // If the capacity is reached, re-use the oscillator from the\n  // last-seen pose\n  fullPolicy: `evictOldestUser`\n});\n\n// Add a bunch of pre-made oscillators as resources\nfor (const osc of oscillators) {\n  pool.addResource(osc);\n}\n```\n\nTo access a resource value, call `useValue()` with a _userKey_. In this case, we have a function `onData` that is called when there is a set of poses to process.\n\nWhat we want to do is find the oscillator previously associated with that particular pose. If there hasn't been an allocation for that pose, we want to pick a free one or reclaim an existing one. It's all that book-keeping that Pool handles for you via `useValue`.\n\n```js\n// New poses come in\nconst onData = (poses) => {\n  // For each pose\n  for (const pose of poses) {\n    // Get an oscillator for it\n    const osc = pool.useValue(pose.id);\n\n    // Do something with the resource...\n    osc.filterCutoff = ...\n  }\n}\n```\n\n## In action: automatically generating resources\n\nIn this example, we will generate Pool resources on-demand. The Pool will create them (with the `generate()` function we provide) and automatically free them when they are unused.\n\nFirst we create the Pool, providing _generate_ and _free_ functions which are responsible for creating and destroying resources. Here HTML elements are the resources being managed.\n\n```js\nimport { Pool } from 'https://unpkg.com/ixfx/dist/data.js';\n\nconst pool = Pool.create({\n  capacity: 10,\n  userExpireAfterMs: 1000,\n  resourcesWithoutUserExpireAfterMs: 10000,\n  fullPolicy: `evictOldestUser`,\n  // Generate a new resource (in this example, a HTML element)\n  generate: () => {\n    const el = document.createElement(`DIV`);\n    el.classList.add(`pool-item`);\n    document.getElementById(`items`)?.append(el);\n    // Whatever is returned is stored and yielded via `useValue` on-demand\n    return el;\n  }, \n  /**\n   * Delete the HTML element when resource is freed\n   * @param {HTMLElement} el \n   */\n  free:(el) => {\n    el.remove();\n  }\n});\n```\n\nNow we can use resources from the pool, for example assigning a HTML element per key down.\n\n```js\nconst useState = () => {\n  const { keysDown } = state;\n\n  for (const key of keysDown) {\n    // Allocate a HTML element for each key held down\n    const el = pool.useValue(key);\n\n    // Set the text of the element to be the key\n    el.innerText = key;\n  }\n};\n```\n\nThis is implemented in the [pool-key](https://github.com/ClintH/ixfx-demos/tree/main/data/pool-key) demo, below.\n\n<demo-element title=\"Pool key\" src=\"/data/pool-key/\" />\n\n## Creating\n\nCreate a Pool and provide some [options](https://clinth.github.io/ixfx/types/Data.Pool.Opts.html)\n\n```js\nconst pool = Pool.create({\n  capacity: 3\n})\n```\n\nOverview of options, all of which are optional.\n\n| option     | info |\n| ------     | ---- |\n| capacity | Maximum number of resources. Defaults to 0, no limit\n| capacityPerResource | Maximum number of users per resource. Defaults to 0, no limit |\n| debug | If true, additional logging will be printed |\n| free | A function that takes a single value. Call when a resource is removed from pool. Meant for cleaning up a value, where necessary. |\n| fullPolicy | 'error' (throws an error when pool is full) or 'evictOldestUser', removing oldest user of a resource. Defaults to 'error' |\n| generate | A function that returns a value. Used for generating resources on demand |\n| resourcesWithout UsersExpireAfterMs | If provided, an unused resource will be removed after this period |\n| userExpireAfterMs | If provided, a user will be marked as expired if it hasn't been updated |\n\n## Accessing resources\n\nA resource can be accessed by a _user key_, returning a [PoolUser](https://clinth.github.io/ixfx/classes/Data.Pool.PoolUser.html) instance.\n\n```js\nconst u = pool.use(key); \n```\n\nAs described earlier, the user key is some unique reference for 'owner' of that pool resource. The idea is that if the same logical owner accesses the resource again, it always is using the same key. As far as the Pool is concerned, a different key means a different user, thus allocating a different resource.\n\n`useValue(key)` returns the resource value rather than the `PoolUser` instance, if that's all you care about.\n\nWhen using resources managed by the Pool, it is important that all access to them happens via the Pool. Don't cache references to resources, always access them via `use()` or `useValue()`.\n\nThe [PoolUser](https://clinth.github.io/ixfx/classes/Data.Pool.PoolUser.html) instance returned by `use()` has a _disposed_ event handler. This allows you to be notified if you have lost ownership of a resource. It is also called if the resource itself has been cleaned up.\n\n```js\nconst u = pool.use(key);\nu.addEventListener(`disposed`, evt => {\n  const { data, reason } = evt;\n  // 'reason' is a string describing why it was disposed\n  // 'data' is the data of the resource\n  // You might do some clean up\n})\n```\n\nResources can be manually released:\n\n```js\npool.release(userKey);\n```\n\nWhen releasing, the resource is freed for user under a different key. If there are no more users of a resource and the Pool option `resourcesWithoutUsersExpireAfterMs` is set, the resource will be freed.\n\n## Misc.\n\n```js\n// Returns true if this resouce is in the pool\npool.hasResource(res); \n// Returns true if `userKey` is a user of some resource\npool.hasUser(userKey);\n// Iterate over all Resource instances in the pool\npool.resources();\n// Iterate over all values (ie something originally added to the pool)\npool.values();\n```", "html": `<div class="tip">
<ul>
<li>API Reference <a href="https://clinth.github.io/ixfx/classes/Data.Pool.Pool.html">Data.Pool class</a></li>
<li>Parent <a href="https://clinth.github.io/ixfx/modules/Data.html">Data module</a></li>
</div>
<p>The <a href="https://clinth.github.io/ixfx/classes/Data.Pool.Pool.html">Pool</a> class does the housekeeping of managing a limited set of resources which are shared by 'users'. All resources in the Pool are meant to be the same kind of object.</p>
<p>An example is an audio sketch driven by TensorFlow. We might want to allocate a sound oscillator per detected human body. A naive implementation would be to make an oscillator for each detected body. However, because poses appear/disappear unpredictably, it's a lot of extra work to maintain the binding between pose and oscillator.</p>
<p>Instead, we might use the <a href="https://clinth.github.io/ixfx/classes/Data.Pool.Pool.html">Pool</a> to allocate oscillators to poses. This will allow us to limit resources and clean up automatically if they haven't been used for a while.</p>
<p>Resources can be added manually with <code is:raw>addResource()</code>, or automatically by providing a <code is:raw>generate()</code> function in the Pool options. They can then be accessed via a <em>user key</em>. This is meant to associated with a single 'user' of a resource. For example, if we are associating oscillators with TensorFlow poses, the 'user key' might be the id of the pose.</p>
<h2 id="in-action-manual-resources">In action: manual resources</h2>
<p>The Pool is created, and resources added:</p>
<pre class="language-js"><code is:raw class="language-js"><span class="token keyword">import</span> <span class="token punctuation">{</span> Pool <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'https://unpkg.com/ixfx/dist/data.js'</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> pool <span class="token operator">=</span> Pool<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">capacity</span><span class="token operator">:</span> oscillators<span class="token punctuation">.</span>length<span class="token punctuation">,</span>
  <span class="token comment">// Remove 'users' if they haven't been seen after one second</span>
  <span class="token literal-property property">userExpireAfterMs</span><span class="token operator">:</span> <span class="token number">1000</span><span class="token punctuation">,</span>
  <span class="token comment">// If the capacity is reached, re-use the oscillator from the</span>
  <span class="token comment">// last-seen pose</span>
  <span class="token literal-property property">fullPolicy</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">evictOldestUser</span><span class="token template-punctuation string">\`</span></span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// Add a bunch of pre-made oscillators as resources</span>
<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> osc <span class="token keyword">of</span> oscillators<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  pool<span class="token punctuation">.</span><span class="token function">addResource</span><span class="token punctuation">(</span>osc<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span></code></pre>
<p>To access a resource value, call <code is:raw>useValue()</code> with a <em>userKey</em>. In this case, we have a function <code is:raw>onData</code> that is called when there is a set of poses to process.</p>
<p>What we want to do is find the oscillator previously associated with that particular pose. If there hasn't been an allocation for that pose, we want to pick a free one or reclaim an existing one. It's all that book-keeping that Pool handles for you via <code is:raw>useValue</code>.</p>
<pre class="language-js"><code is:raw class="language-js"><span class="token comment">// New poses come in</span>
<span class="token keyword">const</span> <span class="token function-variable function">onData</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">poses</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token comment">// For each pose</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> pose <span class="token keyword">of</span> poses<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// Get an oscillator for it</span>
    <span class="token keyword">const</span> osc <span class="token operator">=</span> pool<span class="token punctuation">.</span><span class="token function">useValue</span><span class="token punctuation">(</span>pose<span class="token punctuation">.</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// Do something with the resource...</span>
    osc<span class="token punctuation">.</span>filterCutoff <span class="token operator">=</span> <span class="token operator">...</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span></code></pre>
<h2 id="in-action-automatically-generating-resources">In action: automatically generating resources</h2>
<p>In this example, we will generate Pool resources on-demand. The Pool will create them (with the <code is:raw>generate()</code> function we provide) and automatically free them when they are unused.</p>
<p>First we create the Pool, providing <em>generate</em> and <em>free</em> functions which are responsible for creating and destroying resources. Here HTML elements are the resources being managed.</p>
<pre class="language-js"><code is:raw class="language-js"><span class="token keyword">import</span> <span class="token punctuation">{</span> Pool <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'https://unpkg.com/ixfx/dist/data.js'</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> pool <span class="token operator">=</span> Pool<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">capacity</span><span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">,</span>
  <span class="token literal-property property">userExpireAfterMs</span><span class="token operator">:</span> <span class="token number">1000</span><span class="token punctuation">,</span>
  <span class="token literal-property property">resourcesWithoutUserExpireAfterMs</span><span class="token operator">:</span> <span class="token number">10000</span><span class="token punctuation">,</span>
  <span class="token literal-property property">fullPolicy</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">evictOldestUser</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
  <span class="token comment">// Generate a new resource (in this example, a HTML element)</span>
  <span class="token function-variable function">generate</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> el <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">DIV</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    el<span class="token punctuation">.</span>classList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">pool-item</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">items</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span><span class="token operator">?.</span><span class="token function">append</span><span class="token punctuation">(</span>el<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// Whatever is returned is stored and yielded via \`useValue\` on-demand</span>
    <span class="token keyword">return</span> el<span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span> 
  <span class="token comment">/**
   * Delete the HTML element when resource is freed
   * @param {HTMLElement} el 
   */</span>
  <span class="token function-variable function">free</span><span class="token operator">:</span><span class="token punctuation">(</span><span class="token parameter">el</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    el<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>
<p>Now we can use resources from the pool, for example assigning a HTML element per key down.</p>
<pre class="language-js"><code is:raw class="language-js"><span class="token keyword">const</span> <span class="token function-variable function">useState</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> <span class="token punctuation">{</span> keysDown <span class="token punctuation">}</span> <span class="token operator">=</span> state<span class="token punctuation">;</span>

  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> key <span class="token keyword">of</span> keysDown<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// Allocate a HTML element for each key held down</span>
    <span class="token keyword">const</span> el <span class="token operator">=</span> pool<span class="token punctuation">.</span><span class="token function">useValue</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// Set the text of the element to be the key</span>
    el<span class="token punctuation">.</span>innerText <span class="token operator">=</span> key<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre>
<p>This is implemented in the <a href="https://github.com/ClintH/ixfx-demos/tree/main/data/pool-key">pool-key</a> demo, below.</p>
<demo-element title="Pool key" src="/data/pool-key/" />
<h2 id="creating">Creating</h2>
<p>Create a Pool and provide some <a href="https://clinth.github.io/ixfx/types/Data.Pool.Opts.html">options</a></p>
<pre class="language-js"><code is:raw class="language-js"><span class="token keyword">const</span> pool <span class="token operator">=</span> Pool<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">capacity</span><span class="token operator">:</span> <span class="token number">3</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span></code></pre>
<p>Overview of options, all of which are optional.</p>
<table>
<thead>
<tr>
<th>option</th>
<th>info</th>
</tr>
</thead>
<tbody>
<tr>
<td>capacity</td>
<td>Maximum number of resources. Defaults to 0, no limit</td>
</tr>
<tr>
<td>capacityPerResource</td>
<td>Maximum number of users per resource. Defaults to 0, no limit</td>
</tr>
<tr>
<td>debug</td>
<td>If true, additional logging will be printed</td>
</tr>
<tr>
<td>free</td>
<td>A function that takes a single value. Call when a resource is removed from pool. Meant for cleaning up a value, where necessary.</td>
</tr>
<tr>
<td>fullPolicy</td>
<td>'error' (throws an error when pool is full) or 'evictOldestUser', removing oldest user of a resource. Defaults to 'error'</td>
</tr>
<tr>
<td>generate</td>
<td>A function that returns a value. Used for generating resources on demand</td>
</tr>
<tr>
<td>resourcesWithout UsersExpireAfterMs</td>
<td>If provided, an unused resource will be removed after this period</td>
</tr>
<tr>
<td>userExpireAfterMs</td>
<td>If provided, a user will be marked as expired if it hasn't been updated</td>
</tr>
</tbody>
</table>
<h2 id="accessing-resources">Accessing resources</h2>
<p>A resource can be accessed by a <em>user key</em>, returning a <a href="https://clinth.github.io/ixfx/classes/Data.Pool.PoolUser.html">PoolUser</a> instance.</p>
<pre class="language-js"><code is:raw class="language-js"><span class="token keyword">const</span> u <span class="token operator">=</span> pool<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span> </code></pre>
<p>As described earlier, the user key is some unique reference for 'owner' of that pool resource. The idea is that if the same logical owner accesses the resource again, it always is using the same key. As far as the Pool is concerned, a different key means a different user, thus allocating a different resource.</p>
<p><code is:raw>useValue(key)</code> returns the resource value rather than the <code is:raw>PoolUser</code> instance, if that's all you care about.</p>
<p>When using resources managed by the Pool, it is important that all access to them happens via the Pool. Don't cache references to resources, always access them via <code is:raw>use()</code> or <code is:raw>useValue()</code>.</p>
<p>The <a href="https://clinth.github.io/ixfx/classes/Data.Pool.PoolUser.html">PoolUser</a> instance returned by <code is:raw>use()</code> has a <em>disposed</em> event handler. This allows you to be notified if you have lost ownership of a resource. It is also called if the resource itself has been cleaned up.</p>
<pre class="language-js"><code is:raw class="language-js"><span class="token keyword">const</span> u <span class="token operator">=</span> pool<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
u<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">disposed</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span> <span class="token parameter">evt</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> <span class="token punctuation">{</span> data<span class="token punctuation">,</span> reason <span class="token punctuation">}</span> <span class="token operator">=</span> evt<span class="token punctuation">;</span>
  <span class="token comment">// 'reason' is a string describing why it was disposed</span>
  <span class="token comment">// 'data' is the data of the resource</span>
  <span class="token comment">// You might do some clean up</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span></code></pre>
<p>Resources can be manually released:</p>
<pre class="language-js"><code is:raw class="language-js">pool<span class="token punctuation">.</span><span class="token function">release</span><span class="token punctuation">(</span>userKey<span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>
<p>When releasing, the resource is freed for user under a different key. If there are no more users of a resource and the Pool option <code is:raw>resourcesWithoutUsersExpireAfterMs</code> is set, the resource will be freed.</p>
<h2 id="misc">Misc.</h2>
<pre class="language-js"><code is:raw class="language-js"><span class="token comment">// Returns true if this resouce is in the pool</span>
pool<span class="token punctuation">.</span><span class="token function">hasResource</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span><span class="token punctuation">;</span> 
<span class="token comment">// Returns true if \`userKey\` is a user of some resource</span>
pool<span class="token punctuation">.</span><span class="token function">hasUser</span><span class="token punctuation">(</span>userKey<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// Iterate over all Resource instances in the pool</span>
pool<span class="token punctuation">.</span><span class="token function">resources</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// Iterate over all values (ie something originally added to the pool)</span>
pool<span class="token punctuation">.</span><span class="token function">values</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>` };
const frontmatter = { "title": "Pool", "astro": { "headers": [{ "depth": 2, "slug": "in-action-manual-resources", "text": "In action: manual resources" }, { "depth": 2, "slug": "in-action-automatically-generating-resources", "text": "In action: automatically generating resources" }, { "depth": 2, "slug": "creating", "text": "Creating" }, { "depth": 2, "slug": "accessing-resources", "text": "Accessing resources" }, { "depth": 2, "slug": "misc", "text": "Misc." }], "source": "\n<div class=\"tip\">\n<ul>\n<li>API Reference <a href=\"https://clinth.github.io/ixfx/classes/Data.Pool.Pool.html\">Data.Pool class</a></li>\n<li>Parent <a href=\"https://clinth.github.io/ixfx/modules/Data.html\">Data module</a></li>\n</div>\n\nThe [Pool](https://clinth.github.io/ixfx/classes/Data.Pool.Pool.html) class does the housekeeping of managing a limited set of resources which are shared by 'users'. All resources in the Pool are meant to be the same kind of object.\n\nAn example is an audio sketch driven by TensorFlow. We might want to allocate a sound oscillator per detected human body. A naive implementation would be to make an oscillator for each detected body. However, because poses appear/disappear unpredictably, it's a lot of extra work to maintain the binding between pose and oscillator.\n\nInstead, we might use the [Pool](https://clinth.github.io/ixfx/classes/Data.Pool.Pool.html) to allocate oscillators to poses. This will allow us to limit resources and clean up automatically if they haven't been used for a while.\n\nResources can be added manually with `addResource()`, or automatically by providing a `generate()` function in the Pool options. They can then be accessed via a _user key_. This is meant to associated with a single 'user' of a resource. For example, if we are associating oscillators with TensorFlow poses, the 'user key' might be the id of the pose.\n\n## In action: manual resources\n\nThe Pool is created, and resources added:\n\n```js\nimport { Pool } from 'https://unpkg.com/ixfx/dist/data.js';\nconst pool = Pool.create({\n  capacity: oscillators.length,\n  // Remove 'users' if they haven't been seen after one second\n  userExpireAfterMs: 1000,\n  // If the capacity is reached, re-use the oscillator from the\n  // last-seen pose\n  fullPolicy: `evictOldestUser`\n});\n\n// Add a bunch of pre-made oscillators as resources\nfor (const osc of oscillators) {\n  pool.addResource(osc);\n}\n```\n\nTo access a resource value, call `useValue()` with a _userKey_. In this case, we have a function `onData` that is called when there is a set of poses to process.\n\nWhat we want to do is find the oscillator previously associated with that particular pose. If there hasn't been an allocation for that pose, we want to pick a free one or reclaim an existing one. It's all that book-keeping that Pool handles for you via `useValue`.\n\n```js\n// New poses come in\nconst onData = (poses) => {\n  // For each pose\n  for (const pose of poses) {\n    // Get an oscillator for it\n    const osc = pool.useValue(pose.id);\n\n    // Do something with the resource...\n    osc.filterCutoff = ...\n  }\n}\n```\n\n## In action: automatically generating resources\n\nIn this example, we will generate Pool resources on-demand. The Pool will create them (with the `generate()` function we provide) and automatically free them when they are unused.\n\nFirst we create the Pool, providing _generate_ and _free_ functions which are responsible for creating and destroying resources. Here HTML elements are the resources being managed.\n\n```js\nimport { Pool } from 'https://unpkg.com/ixfx/dist/data.js';\n\nconst pool = Pool.create({\n  capacity: 10,\n  userExpireAfterMs: 1000,\n  resourcesWithoutUserExpireAfterMs: 10000,\n  fullPolicy: `evictOldestUser`,\n  // Generate a new resource (in this example, a HTML element)\n  generate: () => {\n    const el = document.createElement(`DIV`);\n    el.classList.add(`pool-item`);\n    document.getElementById(`items`)?.append(el);\n    // Whatever is returned is stored and yielded via `useValue` on-demand\n    return el;\n  }, \n  /**\n   * Delete the HTML element when resource is freed\n   * @param {HTMLElement} el \n   */\n  free:(el) => {\n    el.remove();\n  }\n});\n```\n\nNow we can use resources from the pool, for example assigning a HTML element per key down.\n\n```js\nconst useState = () => {\n  const { keysDown } = state;\n\n  for (const key of keysDown) {\n    // Allocate a HTML element for each key held down\n    const el = pool.useValue(key);\n\n    // Set the text of the element to be the key\n    el.innerText = key;\n  }\n};\n```\n\nThis is implemented in the [pool-key](https://github.com/ClintH/ixfx-demos/tree/main/data/pool-key) demo, below.\n\n<demo-element title=\"Pool key\" src=\"/data/pool-key/\" />\n\n## Creating\n\nCreate a Pool and provide some [options](https://clinth.github.io/ixfx/types/Data.Pool.Opts.html)\n\n```js\nconst pool = Pool.create({\n  capacity: 3\n})\n```\n\nOverview of options, all of which are optional.\n\n| option     | info |\n| ------     | ---- |\n| capacity | Maximum number of resources. Defaults to 0, no limit\n| capacityPerResource | Maximum number of users per resource. Defaults to 0, no limit |\n| debug | If true, additional logging will be printed |\n| free | A function that takes a single value. Call when a resource is removed from pool. Meant for cleaning up a value, where necessary. |\n| fullPolicy | 'error' (throws an error when pool is full) or 'evictOldestUser', removing oldest user of a resource. Defaults to 'error' |\n| generate | A function that returns a value. Used for generating resources on demand |\n| resourcesWithout UsersExpireAfterMs | If provided, an unused resource will be removed after this period |\n| userExpireAfterMs | If provided, a user will be marked as expired if it hasn't been updated |\n\n## Accessing resources\n\nA resource can be accessed by a _user key_, returning a [PoolUser](https://clinth.github.io/ixfx/classes/Data.Pool.PoolUser.html) instance.\n\n```js\nconst u = pool.use(key); \n```\n\nAs described earlier, the user key is some unique reference for 'owner' of that pool resource. The idea is that if the same logical owner accesses the resource again, it always is using the same key. As far as the Pool is concerned, a different key means a different user, thus allocating a different resource.\n\n`useValue(key)` returns the resource value rather than the `PoolUser` instance, if that's all you care about.\n\nWhen using resources managed by the Pool, it is important that all access to them happens via the Pool. Don't cache references to resources, always access them via `use()` or `useValue()`.\n\nThe [PoolUser](https://clinth.github.io/ixfx/classes/Data.Pool.PoolUser.html) instance returned by `use()` has a _disposed_ event handler. This allows you to be notified if you have lost ownership of a resource. It is also called if the resource itself has been cleaned up.\n\n```js\nconst u = pool.use(key);\nu.addEventListener(`disposed`, evt => {\n  const { data, reason } = evt;\n  // 'reason' is a string describing why it was disposed\n  // 'data' is the data of the resource\n  // You might do some clean up\n})\n```\n\nResources can be manually released:\n\n```js\npool.release(userKey);\n```\n\nWhen releasing, the resource is freed for user under a different key. If there are no more users of a resource and the Pool option `resourcesWithoutUsersExpireAfterMs` is set, the resource will be freed.\n\n## Misc.\n\n```js\n// Returns true if this resouce is in the pool\npool.hasResource(res); \n// Returns true if `userKey` is a user of some resource\npool.hasUser(userKey);\n// Iterate over all Resource instances in the pool\npool.resources();\n// Iterate over all values (ie something originally added to the pool)\npool.values();\n```", "html": `<div class="tip">
<ul>
<li>API Reference <a href="https://clinth.github.io/ixfx/classes/Data.Pool.Pool.html">Data.Pool class</a></li>
<li>Parent <a href="https://clinth.github.io/ixfx/modules/Data.html">Data module</a></li>
</div>
<p>The <a href="https://clinth.github.io/ixfx/classes/Data.Pool.Pool.html">Pool</a> class does the housekeeping of managing a limited set of resources which are shared by 'users'. All resources in the Pool are meant to be the same kind of object.</p>
<p>An example is an audio sketch driven by TensorFlow. We might want to allocate a sound oscillator per detected human body. A naive implementation would be to make an oscillator for each detected body. However, because poses appear/disappear unpredictably, it's a lot of extra work to maintain the binding between pose and oscillator.</p>
<p>Instead, we might use the <a href="https://clinth.github.io/ixfx/classes/Data.Pool.Pool.html">Pool</a> to allocate oscillators to poses. This will allow us to limit resources and clean up automatically if they haven't been used for a while.</p>
<p>Resources can be added manually with <code is:raw>addResource()</code>, or automatically by providing a <code is:raw>generate()</code> function in the Pool options. They can then be accessed via a <em>user key</em>. This is meant to associated with a single 'user' of a resource. For example, if we are associating oscillators with TensorFlow poses, the 'user key' might be the id of the pose.</p>
<h2 id="in-action-manual-resources">In action: manual resources</h2>
<p>The Pool is created, and resources added:</p>
<pre class="language-js"><code is:raw class="language-js"><span class="token keyword">import</span> <span class="token punctuation">{</span> Pool <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'https://unpkg.com/ixfx/dist/data.js'</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> pool <span class="token operator">=</span> Pool<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">capacity</span><span class="token operator">:</span> oscillators<span class="token punctuation">.</span>length<span class="token punctuation">,</span>
  <span class="token comment">// Remove 'users' if they haven't been seen after one second</span>
  <span class="token literal-property property">userExpireAfterMs</span><span class="token operator">:</span> <span class="token number">1000</span><span class="token punctuation">,</span>
  <span class="token comment">// If the capacity is reached, re-use the oscillator from the</span>
  <span class="token comment">// last-seen pose</span>
  <span class="token literal-property property">fullPolicy</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">evictOldestUser</span><span class="token template-punctuation string">\`</span></span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// Add a bunch of pre-made oscillators as resources</span>
<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> osc <span class="token keyword">of</span> oscillators<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  pool<span class="token punctuation">.</span><span class="token function">addResource</span><span class="token punctuation">(</span>osc<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span></code></pre>
<p>To access a resource value, call <code is:raw>useValue()</code> with a <em>userKey</em>. In this case, we have a function <code is:raw>onData</code> that is called when there is a set of poses to process.</p>
<p>What we want to do is find the oscillator previously associated with that particular pose. If there hasn't been an allocation for that pose, we want to pick a free one or reclaim an existing one. It's all that book-keeping that Pool handles for you via <code is:raw>useValue</code>.</p>
<pre class="language-js"><code is:raw class="language-js"><span class="token comment">// New poses come in</span>
<span class="token keyword">const</span> <span class="token function-variable function">onData</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">poses</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token comment">// For each pose</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> pose <span class="token keyword">of</span> poses<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// Get an oscillator for it</span>
    <span class="token keyword">const</span> osc <span class="token operator">=</span> pool<span class="token punctuation">.</span><span class="token function">useValue</span><span class="token punctuation">(</span>pose<span class="token punctuation">.</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// Do something with the resource...</span>
    osc<span class="token punctuation">.</span>filterCutoff <span class="token operator">=</span> <span class="token operator">...</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span></code></pre>
<h2 id="in-action-automatically-generating-resources">In action: automatically generating resources</h2>
<p>In this example, we will generate Pool resources on-demand. The Pool will create them (with the <code is:raw>generate()</code> function we provide) and automatically free them when they are unused.</p>
<p>First we create the Pool, providing <em>generate</em> and <em>free</em> functions which are responsible for creating and destroying resources. Here HTML elements are the resources being managed.</p>
<pre class="language-js"><code is:raw class="language-js"><span class="token keyword">import</span> <span class="token punctuation">{</span> Pool <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'https://unpkg.com/ixfx/dist/data.js'</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> pool <span class="token operator">=</span> Pool<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">capacity</span><span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">,</span>
  <span class="token literal-property property">userExpireAfterMs</span><span class="token operator">:</span> <span class="token number">1000</span><span class="token punctuation">,</span>
  <span class="token literal-property property">resourcesWithoutUserExpireAfterMs</span><span class="token operator">:</span> <span class="token number">10000</span><span class="token punctuation">,</span>
  <span class="token literal-property property">fullPolicy</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">evictOldestUser</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
  <span class="token comment">// Generate a new resource (in this example, a HTML element)</span>
  <span class="token function-variable function">generate</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> el <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">DIV</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    el<span class="token punctuation">.</span>classList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">pool-item</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">items</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span><span class="token operator">?.</span><span class="token function">append</span><span class="token punctuation">(</span>el<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// Whatever is returned is stored and yielded via \`useValue\` on-demand</span>
    <span class="token keyword">return</span> el<span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span> 
  <span class="token comment">/**
   * Delete the HTML element when resource is freed
   * @param {HTMLElement} el 
   */</span>
  <span class="token function-variable function">free</span><span class="token operator">:</span><span class="token punctuation">(</span><span class="token parameter">el</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    el<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>
<p>Now we can use resources from the pool, for example assigning a HTML element per key down.</p>
<pre class="language-js"><code is:raw class="language-js"><span class="token keyword">const</span> <span class="token function-variable function">useState</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> <span class="token punctuation">{</span> keysDown <span class="token punctuation">}</span> <span class="token operator">=</span> state<span class="token punctuation">;</span>

  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> key <span class="token keyword">of</span> keysDown<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// Allocate a HTML element for each key held down</span>
    <span class="token keyword">const</span> el <span class="token operator">=</span> pool<span class="token punctuation">.</span><span class="token function">useValue</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// Set the text of the element to be the key</span>
    el<span class="token punctuation">.</span>innerText <span class="token operator">=</span> key<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre>
<p>This is implemented in the <a href="https://github.com/ClintH/ixfx-demos/tree/main/data/pool-key">pool-key</a> demo, below.</p>
<demo-element title="Pool key" src="/data/pool-key/" />
<h2 id="creating">Creating</h2>
<p>Create a Pool and provide some <a href="https://clinth.github.io/ixfx/types/Data.Pool.Opts.html">options</a></p>
<pre class="language-js"><code is:raw class="language-js"><span class="token keyword">const</span> pool <span class="token operator">=</span> Pool<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">capacity</span><span class="token operator">:</span> <span class="token number">3</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span></code></pre>
<p>Overview of options, all of which are optional.</p>
<table>
<thead>
<tr>
<th>option</th>
<th>info</th>
</tr>
</thead>
<tbody>
<tr>
<td>capacity</td>
<td>Maximum number of resources. Defaults to 0, no limit</td>
</tr>
<tr>
<td>capacityPerResource</td>
<td>Maximum number of users per resource. Defaults to 0, no limit</td>
</tr>
<tr>
<td>debug</td>
<td>If true, additional logging will be printed</td>
</tr>
<tr>
<td>free</td>
<td>A function that takes a single value. Call when a resource is removed from pool. Meant for cleaning up a value, where necessary.</td>
</tr>
<tr>
<td>fullPolicy</td>
<td>'error' (throws an error when pool is full) or 'evictOldestUser', removing oldest user of a resource. Defaults to 'error'</td>
</tr>
<tr>
<td>generate</td>
<td>A function that returns a value. Used for generating resources on demand</td>
</tr>
<tr>
<td>resourcesWithout UsersExpireAfterMs</td>
<td>If provided, an unused resource will be removed after this period</td>
</tr>
<tr>
<td>userExpireAfterMs</td>
<td>If provided, a user will be marked as expired if it hasn't been updated</td>
</tr>
</tbody>
</table>
<h2 id="accessing-resources">Accessing resources</h2>
<p>A resource can be accessed by a <em>user key</em>, returning a <a href="https://clinth.github.io/ixfx/classes/Data.Pool.PoolUser.html">PoolUser</a> instance.</p>
<pre class="language-js"><code is:raw class="language-js"><span class="token keyword">const</span> u <span class="token operator">=</span> pool<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span> </code></pre>
<p>As described earlier, the user key is some unique reference for 'owner' of that pool resource. The idea is that if the same logical owner accesses the resource again, it always is using the same key. As far as the Pool is concerned, a different key means a different user, thus allocating a different resource.</p>
<p><code is:raw>useValue(key)</code> returns the resource value rather than the <code is:raw>PoolUser</code> instance, if that's all you care about.</p>
<p>When using resources managed by the Pool, it is important that all access to them happens via the Pool. Don't cache references to resources, always access them via <code is:raw>use()</code> or <code is:raw>useValue()</code>.</p>
<p>The <a href="https://clinth.github.io/ixfx/classes/Data.Pool.PoolUser.html">PoolUser</a> instance returned by <code is:raw>use()</code> has a <em>disposed</em> event handler. This allows you to be notified if you have lost ownership of a resource. It is also called if the resource itself has been cleaned up.</p>
<pre class="language-js"><code is:raw class="language-js"><span class="token keyword">const</span> u <span class="token operator">=</span> pool<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
u<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">disposed</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span> <span class="token parameter">evt</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> <span class="token punctuation">{</span> data<span class="token punctuation">,</span> reason <span class="token punctuation">}</span> <span class="token operator">=</span> evt<span class="token punctuation">;</span>
  <span class="token comment">// 'reason' is a string describing why it was disposed</span>
  <span class="token comment">// 'data' is the data of the resource</span>
  <span class="token comment">// You might do some clean up</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span></code></pre>
<p>Resources can be manually released:</p>
<pre class="language-js"><code is:raw class="language-js">pool<span class="token punctuation">.</span><span class="token function">release</span><span class="token punctuation">(</span>userKey<span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>
<p>When releasing, the resource is freed for user under a different key. If there are no more users of a resource and the Pool option <code is:raw>resourcesWithoutUsersExpireAfterMs</code> is set, the resource will be freed.</p>
<h2 id="misc">Misc.</h2>
<pre class="language-js"><code is:raw class="language-js"><span class="token comment">// Returns true if this resouce is in the pool</span>
pool<span class="token punctuation">.</span><span class="token function">hasResource</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span><span class="token punctuation">;</span> 
<span class="token comment">// Returns true if \`userKey\` is a user of some resource</span>
pool<span class="token punctuation">.</span><span class="token function">hasUser</span><span class="token punctuation">(</span>userKey<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// Iterate over all Resource instances in the pool</span>
pool<span class="token punctuation">.</span><span class="token function">resources</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// Iterate over all values (ie something originally added to the pool)</span>
pool<span class="token punctuation">.</span><span class="token function">values</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>` } };
const $$metadata = createMetadata("/src/pages/data/pool.md", { modules: [{ module: $$module1, specifier: "../../layouts/MainLayout.astro", assert: {} }, { module: $$module2, specifier: "../../components/DemoElement.ts", assert: {} }], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
const $$Astro = createAstro("/src/pages/data/pool.md", "https://clinth.github.io/ixfx-docs/", "file:///Users/af4766/repos/ixfx-docs/");
const $$Pool = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Pool;
  const $$content = { "title": "Pool", "astro": { "headers": [{ "depth": 2, "slug": "in-action-manual-resources", "text": "In action: manual resources" }, { "depth": 2, "slug": "in-action-automatically-generating-resources", "text": "In action: automatically generating resources" }, { "depth": 2, "slug": "creating", "text": "Creating" }, { "depth": 2, "slug": "accessing-resources", "text": "Accessing resources" }, { "depth": 2, "slug": "misc", "text": "Misc." }], "source": "\n<div class=\"tip\">\n<ul>\n<li>API Reference <a href=\"https://clinth.github.io/ixfx/classes/Data.Pool.Pool.html\">Data.Pool class</a></li>\n<li>Parent <a href=\"https://clinth.github.io/ixfx/modules/Data.html\">Data module</a></li>\n</div>\n\nThe [Pool](https://clinth.github.io/ixfx/classes/Data.Pool.Pool.html) class does the housekeeping of managing a limited set of resources which are shared by 'users'. All resources in the Pool are meant to be the same kind of object.\n\nAn example is an audio sketch driven by TensorFlow. We might want to allocate a sound oscillator per detected human body. A naive implementation would be to make an oscillator for each detected body. However, because poses appear/disappear unpredictably, it's a lot of extra work to maintain the binding between pose and oscillator.\n\nInstead, we might use the [Pool](https://clinth.github.io/ixfx/classes/Data.Pool.Pool.html) to allocate oscillators to poses. This will allow us to limit resources and clean up automatically if they haven't been used for a while.\n\nResources can be added manually with `addResource()`, or automatically by providing a `generate()` function in the Pool options. They can then be accessed via a _user key_. This is meant to associated with a single 'user' of a resource. For example, if we are associating oscillators with TensorFlow poses, the 'user key' might be the id of the pose.\n\n## In action: manual resources\n\nThe Pool is created, and resources added:\n\n```js\nimport { Pool } from 'https://unpkg.com/ixfx/dist/data.js';\nconst pool = Pool.create({\n  capacity: oscillators.length,\n  // Remove 'users' if they haven't been seen after one second\n  userExpireAfterMs: 1000,\n  // If the capacity is reached, re-use the oscillator from the\n  // last-seen pose\n  fullPolicy: `evictOldestUser`\n});\n\n// Add a bunch of pre-made oscillators as resources\nfor (const osc of oscillators) {\n  pool.addResource(osc);\n}\n```\n\nTo access a resource value, call `useValue()` with a _userKey_. In this case, we have a function `onData` that is called when there is a set of poses to process.\n\nWhat we want to do is find the oscillator previously associated with that particular pose. If there hasn't been an allocation for that pose, we want to pick a free one or reclaim an existing one. It's all that book-keeping that Pool handles for you via `useValue`.\n\n```js\n// New poses come in\nconst onData = (poses) => {\n  // For each pose\n  for (const pose of poses) {\n    // Get an oscillator for it\n    const osc = pool.useValue(pose.id);\n\n    // Do something with the resource...\n    osc.filterCutoff = ...\n  }\n}\n```\n\n## In action: automatically generating resources\n\nIn this example, we will generate Pool resources on-demand. The Pool will create them (with the `generate()` function we provide) and automatically free them when they are unused.\n\nFirst we create the Pool, providing _generate_ and _free_ functions which are responsible for creating and destroying resources. Here HTML elements are the resources being managed.\n\n```js\nimport { Pool } from 'https://unpkg.com/ixfx/dist/data.js';\n\nconst pool = Pool.create({\n  capacity: 10,\n  userExpireAfterMs: 1000,\n  resourcesWithoutUserExpireAfterMs: 10000,\n  fullPolicy: `evictOldestUser`,\n  // Generate a new resource (in this example, a HTML element)\n  generate: () => {\n    const el = document.createElement(`DIV`);\n    el.classList.add(`pool-item`);\n    document.getElementById(`items`)?.append(el);\n    // Whatever is returned is stored and yielded via `useValue` on-demand\n    return el;\n  }, \n  /**\n   * Delete the HTML element when resource is freed\n   * @param {HTMLElement} el \n   */\n  free:(el) => {\n    el.remove();\n  }\n});\n```\n\nNow we can use resources from the pool, for example assigning a HTML element per key down.\n\n```js\nconst useState = () => {\n  const { keysDown } = state;\n\n  for (const key of keysDown) {\n    // Allocate a HTML element for each key held down\n    const el = pool.useValue(key);\n\n    // Set the text of the element to be the key\n    el.innerText = key;\n  }\n};\n```\n\nThis is implemented in the [pool-key](https://github.com/ClintH/ixfx-demos/tree/main/data/pool-key) demo, below.\n\n<demo-element title=\"Pool key\" src=\"/data/pool-key/\" />\n\n## Creating\n\nCreate a Pool and provide some [options](https://clinth.github.io/ixfx/types/Data.Pool.Opts.html)\n\n```js\nconst pool = Pool.create({\n  capacity: 3\n})\n```\n\nOverview of options, all of which are optional.\n\n| option     | info |\n| ------     | ---- |\n| capacity | Maximum number of resources. Defaults to 0, no limit\n| capacityPerResource | Maximum number of users per resource. Defaults to 0, no limit |\n| debug | If true, additional logging will be printed |\n| free | A function that takes a single value. Call when a resource is removed from pool. Meant for cleaning up a value, where necessary. |\n| fullPolicy | 'error' (throws an error when pool is full) or 'evictOldestUser', removing oldest user of a resource. Defaults to 'error' |\n| generate | A function that returns a value. Used for generating resources on demand |\n| resourcesWithout UsersExpireAfterMs | If provided, an unused resource will be removed after this period |\n| userExpireAfterMs | If provided, a user will be marked as expired if it hasn't been updated |\n\n## Accessing resources\n\nA resource can be accessed by a _user key_, returning a [PoolUser](https://clinth.github.io/ixfx/classes/Data.Pool.PoolUser.html) instance.\n\n```js\nconst u = pool.use(key); \n```\n\nAs described earlier, the user key is some unique reference for 'owner' of that pool resource. The idea is that if the same logical owner accesses the resource again, it always is using the same key. As far as the Pool is concerned, a different key means a different user, thus allocating a different resource.\n\n`useValue(key)` returns the resource value rather than the `PoolUser` instance, if that's all you care about.\n\nWhen using resources managed by the Pool, it is important that all access to them happens via the Pool. Don't cache references to resources, always access them via `use()` or `useValue()`.\n\nThe [PoolUser](https://clinth.github.io/ixfx/classes/Data.Pool.PoolUser.html) instance returned by `use()` has a _disposed_ event handler. This allows you to be notified if you have lost ownership of a resource. It is also called if the resource itself has been cleaned up.\n\n```js\nconst u = pool.use(key);\nu.addEventListener(`disposed`, evt => {\n  const { data, reason } = evt;\n  // 'reason' is a string describing why it was disposed\n  // 'data' is the data of the resource\n  // You might do some clean up\n})\n```\n\nResources can be manually released:\n\n```js\npool.release(userKey);\n```\n\nWhen releasing, the resource is freed for user under a different key. If there are no more users of a resource and the Pool option `resourcesWithoutUsersExpireAfterMs` is set, the resource will be freed.\n\n## Misc.\n\n```js\n// Returns true if this resouce is in the pool\npool.hasResource(res); \n// Returns true if `userKey` is a user of some resource\npool.hasUser(userKey);\n// Iterate over all Resource instances in the pool\npool.resources();\n// Iterate over all values (ie something originally added to the pool)\npool.values();\n```", "html": `<div class="tip">
<ul>
<li>API Reference <a href="https://clinth.github.io/ixfx/classes/Data.Pool.Pool.html">Data.Pool class</a></li>
<li>Parent <a href="https://clinth.github.io/ixfx/modules/Data.html">Data module</a></li>
</div>
<p>The <a href="https://clinth.github.io/ixfx/classes/Data.Pool.Pool.html">Pool</a> class does the housekeeping of managing a limited set of resources which are shared by 'users'. All resources in the Pool are meant to be the same kind of object.</p>
<p>An example is an audio sketch driven by TensorFlow. We might want to allocate a sound oscillator per detected human body. A naive implementation would be to make an oscillator for each detected body. However, because poses appear/disappear unpredictably, it's a lot of extra work to maintain the binding between pose and oscillator.</p>
<p>Instead, we might use the <a href="https://clinth.github.io/ixfx/classes/Data.Pool.Pool.html">Pool</a> to allocate oscillators to poses. This will allow us to limit resources and clean up automatically if they haven't been used for a while.</p>
<p>Resources can be added manually with <code is:raw>addResource()</code>, or automatically by providing a <code is:raw>generate()</code> function in the Pool options. They can then be accessed via a <em>user key</em>. This is meant to associated with a single 'user' of a resource. For example, if we are associating oscillators with TensorFlow poses, the 'user key' might be the id of the pose.</p>
<h2 id="in-action-manual-resources">In action: manual resources</h2>
<p>The Pool is created, and resources added:</p>
<pre class="language-js"><code is:raw class="language-js"><span class="token keyword">import</span> <span class="token punctuation">{</span> Pool <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'https://unpkg.com/ixfx/dist/data.js'</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> pool <span class="token operator">=</span> Pool<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">capacity</span><span class="token operator">:</span> oscillators<span class="token punctuation">.</span>length<span class="token punctuation">,</span>
  <span class="token comment">// Remove 'users' if they haven't been seen after one second</span>
  <span class="token literal-property property">userExpireAfterMs</span><span class="token operator">:</span> <span class="token number">1000</span><span class="token punctuation">,</span>
  <span class="token comment">// If the capacity is reached, re-use the oscillator from the</span>
  <span class="token comment">// last-seen pose</span>
  <span class="token literal-property property">fullPolicy</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">evictOldestUser</span><span class="token template-punctuation string">\`</span></span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// Add a bunch of pre-made oscillators as resources</span>
<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> osc <span class="token keyword">of</span> oscillators<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  pool<span class="token punctuation">.</span><span class="token function">addResource</span><span class="token punctuation">(</span>osc<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span></code></pre>
<p>To access a resource value, call <code is:raw>useValue()</code> with a <em>userKey</em>. In this case, we have a function <code is:raw>onData</code> that is called when there is a set of poses to process.</p>
<p>What we want to do is find the oscillator previously associated with that particular pose. If there hasn't been an allocation for that pose, we want to pick a free one or reclaim an existing one. It's all that book-keeping that Pool handles for you via <code is:raw>useValue</code>.</p>
<pre class="language-js"><code is:raw class="language-js"><span class="token comment">// New poses come in</span>
<span class="token keyword">const</span> <span class="token function-variable function">onData</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">poses</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token comment">// For each pose</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> pose <span class="token keyword">of</span> poses<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// Get an oscillator for it</span>
    <span class="token keyword">const</span> osc <span class="token operator">=</span> pool<span class="token punctuation">.</span><span class="token function">useValue</span><span class="token punctuation">(</span>pose<span class="token punctuation">.</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// Do something with the resource...</span>
    osc<span class="token punctuation">.</span>filterCutoff <span class="token operator">=</span> <span class="token operator">...</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span></code></pre>
<h2 id="in-action-automatically-generating-resources">In action: automatically generating resources</h2>
<p>In this example, we will generate Pool resources on-demand. The Pool will create them (with the <code is:raw>generate()</code> function we provide) and automatically free them when they are unused.</p>
<p>First we create the Pool, providing <em>generate</em> and <em>free</em> functions which are responsible for creating and destroying resources. Here HTML elements are the resources being managed.</p>
<pre class="language-js"><code is:raw class="language-js"><span class="token keyword">import</span> <span class="token punctuation">{</span> Pool <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'https://unpkg.com/ixfx/dist/data.js'</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> pool <span class="token operator">=</span> Pool<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">capacity</span><span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">,</span>
  <span class="token literal-property property">userExpireAfterMs</span><span class="token operator">:</span> <span class="token number">1000</span><span class="token punctuation">,</span>
  <span class="token literal-property property">resourcesWithoutUserExpireAfterMs</span><span class="token operator">:</span> <span class="token number">10000</span><span class="token punctuation">,</span>
  <span class="token literal-property property">fullPolicy</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">evictOldestUser</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
  <span class="token comment">// Generate a new resource (in this example, a HTML element)</span>
  <span class="token function-variable function">generate</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> el <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">DIV</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    el<span class="token punctuation">.</span>classList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">pool-item</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">items</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span><span class="token operator">?.</span><span class="token function">append</span><span class="token punctuation">(</span>el<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// Whatever is returned is stored and yielded via \`useValue\` on-demand</span>
    <span class="token keyword">return</span> el<span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span> 
  <span class="token comment">/**
   * Delete the HTML element when resource is freed
   * @param {HTMLElement} el 
   */</span>
  <span class="token function-variable function">free</span><span class="token operator">:</span><span class="token punctuation">(</span><span class="token parameter">el</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    el<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>
<p>Now we can use resources from the pool, for example assigning a HTML element per key down.</p>
<pre class="language-js"><code is:raw class="language-js"><span class="token keyword">const</span> <span class="token function-variable function">useState</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> <span class="token punctuation">{</span> keysDown <span class="token punctuation">}</span> <span class="token operator">=</span> state<span class="token punctuation">;</span>

  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> key <span class="token keyword">of</span> keysDown<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// Allocate a HTML element for each key held down</span>
    <span class="token keyword">const</span> el <span class="token operator">=</span> pool<span class="token punctuation">.</span><span class="token function">useValue</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// Set the text of the element to be the key</span>
    el<span class="token punctuation">.</span>innerText <span class="token operator">=</span> key<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre>
<p>This is implemented in the <a href="https://github.com/ClintH/ixfx-demos/tree/main/data/pool-key">pool-key</a> demo, below.</p>
<demo-element title="Pool key" src="/data/pool-key/" />
<h2 id="creating">Creating</h2>
<p>Create a Pool and provide some <a href="https://clinth.github.io/ixfx/types/Data.Pool.Opts.html">options</a></p>
<pre class="language-js"><code is:raw class="language-js"><span class="token keyword">const</span> pool <span class="token operator">=</span> Pool<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">capacity</span><span class="token operator">:</span> <span class="token number">3</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span></code></pre>
<p>Overview of options, all of which are optional.</p>
<table>
<thead>
<tr>
<th>option</th>
<th>info</th>
</tr>
</thead>
<tbody>
<tr>
<td>capacity</td>
<td>Maximum number of resources. Defaults to 0, no limit</td>
</tr>
<tr>
<td>capacityPerResource</td>
<td>Maximum number of users per resource. Defaults to 0, no limit</td>
</tr>
<tr>
<td>debug</td>
<td>If true, additional logging will be printed</td>
</tr>
<tr>
<td>free</td>
<td>A function that takes a single value. Call when a resource is removed from pool. Meant for cleaning up a value, where necessary.</td>
</tr>
<tr>
<td>fullPolicy</td>
<td>'error' (throws an error when pool is full) or 'evictOldestUser', removing oldest user of a resource. Defaults to 'error'</td>
</tr>
<tr>
<td>generate</td>
<td>A function that returns a value. Used for generating resources on demand</td>
</tr>
<tr>
<td>resourcesWithout UsersExpireAfterMs</td>
<td>If provided, an unused resource will be removed after this period</td>
</tr>
<tr>
<td>userExpireAfterMs</td>
<td>If provided, a user will be marked as expired if it hasn't been updated</td>
</tr>
</tbody>
</table>
<h2 id="accessing-resources">Accessing resources</h2>
<p>A resource can be accessed by a <em>user key</em>, returning a <a href="https://clinth.github.io/ixfx/classes/Data.Pool.PoolUser.html">PoolUser</a> instance.</p>
<pre class="language-js"><code is:raw class="language-js"><span class="token keyword">const</span> u <span class="token operator">=</span> pool<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span> </code></pre>
<p>As described earlier, the user key is some unique reference for 'owner' of that pool resource. The idea is that if the same logical owner accesses the resource again, it always is using the same key. As far as the Pool is concerned, a different key means a different user, thus allocating a different resource.</p>
<p><code is:raw>useValue(key)</code> returns the resource value rather than the <code is:raw>PoolUser</code> instance, if that's all you care about.</p>
<p>When using resources managed by the Pool, it is important that all access to them happens via the Pool. Don't cache references to resources, always access them via <code is:raw>use()</code> or <code is:raw>useValue()</code>.</p>
<p>The <a href="https://clinth.github.io/ixfx/classes/Data.Pool.PoolUser.html">PoolUser</a> instance returned by <code is:raw>use()</code> has a <em>disposed</em> event handler. This allows you to be notified if you have lost ownership of a resource. It is also called if the resource itself has been cleaned up.</p>
<pre class="language-js"><code is:raw class="language-js"><span class="token keyword">const</span> u <span class="token operator">=</span> pool<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
u<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">disposed</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span> <span class="token parameter">evt</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> <span class="token punctuation">{</span> data<span class="token punctuation">,</span> reason <span class="token punctuation">}</span> <span class="token operator">=</span> evt<span class="token punctuation">;</span>
  <span class="token comment">// 'reason' is a string describing why it was disposed</span>
  <span class="token comment">// 'data' is the data of the resource</span>
  <span class="token comment">// You might do some clean up</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span></code></pre>
<p>Resources can be manually released:</p>
<pre class="language-js"><code is:raw class="language-js">pool<span class="token punctuation">.</span><span class="token function">release</span><span class="token punctuation">(</span>userKey<span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>
<p>When releasing, the resource is freed for user under a different key. If there are no more users of a resource and the Pool option <code is:raw>resourcesWithoutUsersExpireAfterMs</code> is set, the resource will be freed.</p>
<h2 id="misc">Misc.</h2>
<pre class="language-js"><code is:raw class="language-js"><span class="token comment">// Returns true if this resouce is in the pool</span>
pool<span class="token punctuation">.</span><span class="token function">hasResource</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span><span class="token punctuation">;</span> 
<span class="token comment">// Returns true if \`userKey\` is a user of some resource</span>
pool<span class="token punctuation">.</span><span class="token function">hasUser</span><span class="token punctuation">(</span>userKey<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// Iterate over all Resource instances in the pool</span>
pool<span class="token punctuation">.</span><span class="token function">resources</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// Iterate over all values (ie something originally added to the pool)</span>
pool<span class="token punctuation">.</span><span class="token function">values</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>` } };
  return render`${renderComponent($$result, "Layout", $$MainLayout, { "content": $$content }, { "default": () => render`<div class="tip">
<ul>
<li>API Reference <a href="https://clinth.github.io/ixfx/classes/Data.Pool.Pool.html">Data.Pool class</a></li>
<li>Parent <a href="https://clinth.github.io/ixfx/modules/Data.html">Data module</a></li>
</ul></div><p>The <a href="https://clinth.github.io/ixfx/classes/Data.Pool.Pool.html">Pool</a> class does the housekeeping of managing a limited set of resources which are shared by 'users'. All resources in the Pool are meant to be the same kind of object.</p><p>An example is an audio sketch driven by TensorFlow. We might want to allocate a sound oscillator per detected human body. A naive implementation would be to make an oscillator for each detected body. However, because poses appear/disappear unpredictably, it's a lot of extra work to maintain the binding between pose and oscillator.</p><p>Instead, we might use the <a href="https://clinth.github.io/ixfx/classes/Data.Pool.Pool.html">Pool</a> to allocate oscillators to poses. This will allow us to limit resources and clean up automatically if they haven't been used for a while.</p><p>Resources can be added manually with <code>addResource()</code>, or automatically by providing a <code>generate()</code> function in the Pool options. They can then be accessed via a <em>user key</em>. This is meant to associated with a single 'user' of a resource. For example, if we are associating oscillators with TensorFlow poses, the 'user key' might be the id of the pose.</p><h2 id="in-action-manual-resources">In action: manual resources</h2><p>The Pool is created, and resources added:</p><pre class="language-js"><code class="language-js"><span class="token keyword">import</span> <span class="token punctuation">{</span> Pool <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'https://unpkg.com/ixfx/dist/data.js'</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> pool <span class="token operator">=</span> Pool<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">capacity</span><span class="token operator">:</span> oscillators<span class="token punctuation">.</span>length<span class="token punctuation">,</span>
  <span class="token comment">// Remove 'users' if they haven't been seen after one second</span>
  <span class="token literal-property property">userExpireAfterMs</span><span class="token operator">:</span> <span class="token number">1000</span><span class="token punctuation">,</span>
  <span class="token comment">// If the capacity is reached, re-use the oscillator from the</span>
  <span class="token comment">// last-seen pose</span>
  <span class="token literal-property property">fullPolicy</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">evictOldestUser</span><span class="token template-punctuation string">\`</span></span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// Add a bunch of pre-made oscillators as resources</span>
<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> osc <span class="token keyword">of</span> oscillators<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  pool<span class="token punctuation">.</span><span class="token function">addResource</span><span class="token punctuation">(</span>osc<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span></code></pre><p>To access a resource value, call <code>useValue()</code> with a <em>userKey</em>. In this case, we have a function <code>onData</code> that is called when there is a set of poses to process.</p><p>What we want to do is find the oscillator previously associated with that particular pose. If there hasn't been an allocation for that pose, we want to pick a free one or reclaim an existing one. It's all that book-keeping that Pool handles for you via <code>useValue</code>.</p><pre class="language-js"><code class="language-js"><span class="token comment">// New poses come in</span>
<span class="token keyword">const</span> <span class="token function-variable function">onData</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">poses</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token comment">// For each pose</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> pose <span class="token keyword">of</span> poses<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// Get an oscillator for it</span>
    <span class="token keyword">const</span> osc <span class="token operator">=</span> pool<span class="token punctuation">.</span><span class="token function">useValue</span><span class="token punctuation">(</span>pose<span class="token punctuation">.</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// Do something with the resource...</span>
    osc<span class="token punctuation">.</span>filterCutoff <span class="token operator">=</span> <span class="token operator">...</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span></code></pre><h2 id="in-action-automatically-generating-resources">In action: automatically generating resources</h2><p>In this example, we will generate Pool resources on-demand. The Pool will create them (with the <code>generate()</code> function we provide) and automatically free them when they are unused.</p><p>First we create the Pool, providing <em>generate</em> and <em>free</em> functions which are responsible for creating and destroying resources. Here HTML elements are the resources being managed.</p><pre class="language-js"><code class="language-js"><span class="token keyword">import</span> <span class="token punctuation">{</span> Pool <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'https://unpkg.com/ixfx/dist/data.js'</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> pool <span class="token operator">=</span> Pool<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">capacity</span><span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">,</span>
  <span class="token literal-property property">userExpireAfterMs</span><span class="token operator">:</span> <span class="token number">1000</span><span class="token punctuation">,</span>
  <span class="token literal-property property">resourcesWithoutUserExpireAfterMs</span><span class="token operator">:</span> <span class="token number">10000</span><span class="token punctuation">,</span>
  <span class="token literal-property property">fullPolicy</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">evictOldestUser</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
  <span class="token comment">// Generate a new resource (in this example, a HTML element)</span>
  <span class="token function-variable function">generate</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> el <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">DIV</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    el<span class="token punctuation">.</span>classList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">pool-item</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">items</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span><span class="token operator">?.</span><span class="token function">append</span><span class="token punctuation">(</span>el<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// Whatever is returned is stored and yielded via \`useValue\` on-demand</span>
    <span class="token keyword">return</span> el<span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span> 
  <span class="token comment">/**
   * Delete the HTML element when resource is freed
   * @param {HTMLElement} el 
   */</span>
  <span class="token function-variable function">free</span><span class="token operator">:</span><span class="token punctuation">(</span><span class="token parameter">el</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    el<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre><p>Now we can use resources from the pool, for example assigning a HTML element per key down.</p><pre class="language-js"><code class="language-js"><span class="token keyword">const</span> <span class="token function-variable function">useState</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> <span class="token punctuation">{</span> keysDown <span class="token punctuation">}</span> <span class="token operator">=</span> state<span class="token punctuation">;</span>

  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> key <span class="token keyword">of</span> keysDown<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// Allocate a HTML element for each key held down</span>
    <span class="token keyword">const</span> el <span class="token operator">=</span> pool<span class="token punctuation">.</span><span class="token function">useValue</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// Set the text of the element to be the key</span>
    el<span class="token punctuation">.</span>innerText <span class="token operator">=</span> key<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre><p>This is implemented in the <a href="https://github.com/ClintH/ixfx-demos/tree/main/data/pool-key">pool-key</a> demo, below.</p>${renderComponent($$result, "demo-element", "demo-element", { "title": "Pool key", "src": "/data/pool-key/" })}<h2 id="creating">Creating</h2><p>Create a Pool and provide some <a href="https://clinth.github.io/ixfx/types/Data.Pool.Opts.html">options</a></p><pre class="language-js"><code class="language-js"><span class="token keyword">const</span> pool <span class="token operator">=</span> Pool<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">capacity</span><span class="token operator">:</span> <span class="token number">3</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span></code></pre><p>Overview of options, all of which are optional.</p><table>
<thead>
<tr>
<th>option</th>
<th>info</th>
</tr>
</thead>
<tbody>
<tr>
<td>capacity</td>
<td>Maximum number of resources. Defaults to 0, no limit</td>
</tr>
<tr>
<td>capacityPerResource</td>
<td>Maximum number of users per resource. Defaults to 0, no limit</td>
</tr>
<tr>
<td>debug</td>
<td>If true, additional logging will be printed</td>
</tr>
<tr>
<td>free</td>
<td>A function that takes a single value. Call when a resource is removed from pool. Meant for cleaning up a value, where necessary.</td>
</tr>
<tr>
<td>fullPolicy</td>
<td>'error' (throws an error when pool is full) or 'evictOldestUser', removing oldest user of a resource. Defaults to 'error'</td>
</tr>
<tr>
<td>generate</td>
<td>A function that returns a value. Used for generating resources on demand</td>
</tr>
<tr>
<td>resourcesWithout UsersExpireAfterMs</td>
<td>If provided, an unused resource will be removed after this period</td>
</tr>
<tr>
<td>userExpireAfterMs</td>
<td>If provided, a user will be marked as expired if it hasn't been updated</td>
</tr>
</tbody>
</table><h2 id="accessing-resources">Accessing resources</h2><p>A resource can be accessed by a <em>user key</em>, returning a <a href="https://clinth.github.io/ixfx/classes/Data.Pool.PoolUser.html">PoolUser</a> instance.</p><pre class="language-js"><code class="language-js"><span class="token keyword">const</span> u <span class="token operator">=</span> pool<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span> </code></pre><p>As described earlier, the user key is some unique reference for 'owner' of that pool resource. The idea is that if the same logical owner accesses the resource again, it always is using the same key. As far as the Pool is concerned, a different key means a different user, thus allocating a different resource.</p><p><code>useValue(key)</code> returns the resource value rather than the <code>PoolUser</code> instance, if that's all you care about.</p><p>When using resources managed by the Pool, it is important that all access to them happens via the Pool. Don't cache references to resources, always access them via <code>use()</code> or <code>useValue()</code>.</p><p>The <a href="https://clinth.github.io/ixfx/classes/Data.Pool.PoolUser.html">PoolUser</a> instance returned by <code>use()</code> has a <em>disposed</em> event handler. This allows you to be notified if you have lost ownership of a resource. It is also called if the resource itself has been cleaned up.</p><pre class="language-js"><code class="language-js"><span class="token keyword">const</span> u <span class="token operator">=</span> pool<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
u<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">disposed</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span> <span class="token parameter">evt</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> <span class="token punctuation">{</span> data<span class="token punctuation">,</span> reason <span class="token punctuation">}</span> <span class="token operator">=</span> evt<span class="token punctuation">;</span>
  <span class="token comment">// 'reason' is a string describing why it was disposed</span>
  <span class="token comment">// 'data' is the data of the resource</span>
  <span class="token comment">// You might do some clean up</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span></code></pre><p>Resources can be manually released:</p><pre class="language-js"><code class="language-js">pool<span class="token punctuation">.</span><span class="token function">release</span><span class="token punctuation">(</span>userKey<span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre><p>When releasing, the resource is freed for user under a different key. If there are no more users of a resource and the Pool option <code>resourcesWithoutUsersExpireAfterMs</code> is set, the resource will be freed.</p><h2 id="misc">Misc.</h2><pre class="language-js"><code class="language-js"><span class="token comment">// Returns true if this resouce is in the pool</span>
pool<span class="token punctuation">.</span><span class="token function">hasResource</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span><span class="token punctuation">;</span> 
<span class="token comment">// Returns true if \`userKey\` is a user of some resource</span>
pool<span class="token punctuation">.</span><span class="token function">hasUser</span><span class="token punctuation">(</span>userKey<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// Iterate over all Resource instances in the pool</span>
pool<span class="token punctuation">.</span><span class="token function">resources</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// Iterate over all values (ie something originally added to the pool)</span>
pool<span class="token punctuation">.</span><span class="token function">values</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>` })}`;
});

export { $$metadata, $$Pool as default, frontmatter, metadata };
