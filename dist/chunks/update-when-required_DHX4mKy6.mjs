import { c as createComponent, r as renderTemplate, a as renderComponent, u as unescapeHTML } from './astro/server__cawITtY.mjs';
import 'kleur/colors';
import { $ as $$MainLayout } from './MainLayout_BFrOPY-O.mjs';

const html = "<p>Let’s say you want to fetch live JSON data. It would be rude to the site operator to fetch the data continually, so we want to reduce how often the data is fetched. Polling is one option, but it might that we can’t really know what the optimum polling rate should be.</p>\n<p><a href=\"https://clinth.github.io/ixfx/modules/Flow.html#updateOutdated\"><code>updateOutdated</code></a> addresses this dilemma. It only calls a function if it hasn’t been called for a while, or never called. If, however, it has recently been called, the last result is returned. It is a similar outcome as <a href=\"#throttle\">throttle</a> - lots of calls get reduced to an occasional call.</p>\n<p>Initialisation takes an async function to run, and a interval.</p>\n<pre class=\"astro-code github-dark\" style=\"background-color:#24292e;color:#e1e4e8; overflow-x: auto;\" tabindex=\"0\" data-language=\"js\"><code><span class=\"line\"><span style=\"color:#6A737D\">// Set up one time.</span></span>\n<span class=\"line\"><span style=\"color:#6A737D\">// Here we're invoking `fetch`, and have a min interval of 5 minutes </span></span>\n<span class=\"line\"><span style=\"color:#F97583\">const</span><span style=\"color:#79B8FF\"> fetcher</span><span style=\"color:#F97583\"> =</span><span style=\"color:#B392F0\"> updateOutdated</span><span style=\"color:#E1E4E8\">(</span><span style=\"color:#F97583\">async</span><span style=\"color:#E1E4E8\"> () </span><span style=\"color:#F97583\">=></span><span style=\"color:#E1E4E8\"> {</span></span>\n<span class=\"line\"><span style=\"color:#F97583\">    const</span><span style=\"color:#79B8FF\"> r</span><span style=\"color:#F97583\"> =</span><span style=\"color:#F97583\"> await</span><span style=\"color:#B392F0\"> fetch</span><span style=\"color:#E1E4E8\">(</span><span style=\"color:#9ECBFF\">`https://jsonplaceholder.typicode.com/todos/1`</span><span style=\"color:#E1E4E8\">);</span></span>\n<span class=\"line\"><span style=\"color:#F97583\">    return</span><span style=\"color:#F97583\"> await</span><span style=\"color:#E1E4E8\"> r.</span><span style=\"color:#B392F0\">json</span><span style=\"color:#E1E4E8\">();</span></span>\n<span class=\"line\"><span style=\"color:#E1E4E8\">  }, </span><span style=\"color:#79B8FF\">5</span><span style=\"color:#F97583\"> *</span><span style=\"color:#79B8FF\"> 60</span><span style=\"color:#F97583\"> *</span><span style=\"color:#79B8FF\"> 1000</span><span style=\"color:#E1E4E8\">);</span></span>\n<span class=\"line\"></span></code></pre>\n<p>Somewhere else in your code, when you need the data, <em>await</em> the fetcher. If it hasn’t run yet, the callback will run (in this case, fetching JSON data). But if it has run within the last 5 minutes, the cached result will be returned rather than a network request being made again.</p>\n<pre class=\"astro-code github-dark\" style=\"background-color:#24292e;color:#e1e4e8; overflow-x: auto;\" tabindex=\"0\" data-language=\"js\"><code><span class=\"line\"><span style=\"color:#6A737D\">// Returns the JSON data from the fetch request (or a cached copy)</span></span>\n<span class=\"line\"><span style=\"color:#F97583\">const</span><span style=\"color:#79B8FF\"> json</span><span style=\"color:#F97583\"> =</span><span style=\"color:#F97583\"> await</span><span style=\"color:#B392F0\"> fetcher</span><span style=\"color:#E1E4E8\">();</span></span>\n<span class=\"line\"></span></code></pre>\n<p><a href=\"https://clinth.github.io/ixfx-demos/flow/fetch-outdated/\">Online demo</a> (<a href=\"https://github.com/ClintH/ixfx-demos/tree/main/flow/fetch-outdated\">source</a>)</p>\n<p>What is useful about this pattern is that when you need the data (ie. <code>await fetcher()</code>) you can be ignorant to when or how the data is fetched.</p>\n<p>Note that execution blocks until data is fetched, so there may be cases where polling might be more appropriate.</p>";

				const frontmatter = {"title":"Update when required","layout":"../../layouts/MainLayout.astro","setup":"import { DemoElement } from '../../components/DemoElement.ts';\n"};
				const file = "/Users/af4766/repos/ixfx-docs/src/pages/flow/update-when-required.md";
				const url = "/flow/update-when-required";
				function rawContent() {
					return "\nLet's say you want to fetch live JSON data. It would be rude to the site operator to fetch the data continually, so we want to reduce how often the data is fetched. Polling is one option, but it might that we can't really know what the optimum polling rate should be.  \n\n[`updateOutdated`](https://clinth.github.io/ixfx/modules/Flow.html#updateOutdated) addresses this dilemma. It only calls a function if it hasn't been called for a while, or never called. If, however, it has recently been called, the last result is returned. It is a similar outcome as [throttle](#throttle) - lots of calls get reduced to an occasional call.\n\nInitialisation takes an async function to run, and a interval.\n\n```js\n// Set up one time.\n// Here we're invoking `fetch`, and have a min interval of 5 minutes \nconst fetcher = updateOutdated(async () => {\n    const r = await fetch(`https://jsonplaceholder.typicode.com/todos/1`);\n    return await r.json();\n  }, 5 * 60 * 1000);\n```\n\nSomewhere else in your code, when you need the data, _await_ the fetcher. If it hasn't run yet, the callback will run (in this case, fetching JSON data). But if it has run within the last 5 minutes, the cached result will be returned rather than a network request being made again.\n\n```js\n// Returns the JSON data from the fetch request (or a cached copy)\nconst json = await fetcher();\n```\n\n[Online demo](https://clinth.github.io/ixfx-demos/flow/fetch-outdated/) ([source](https://github.com/ClintH/ixfx-demos/tree/main/flow/fetch-outdated))\n\nWhat is useful about this pattern is that when you need the data (ie. `await fetcher()`) you can be ignorant to when or how the data is fetched. \n\nNote that execution blocks until data is fetched, so there may be cases where polling might be more appropriate.";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [];
				}

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${renderComponent(result, 'Layout', $$MainLayout, {
								file,
								url,
								content,
								frontmatter: content,
								headings: getHeadings(),
								rawContent,
								compiledContent,
								'server:root': true,
							}, {
								'default': () => renderTemplate`${unescapeHTML(html)}`
							})}`;
				});

export { Content, compiledContent, Content as default, file, frontmatter, getHeadings, rawContent, url };
