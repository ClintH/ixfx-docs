import { c as createComponent, r as renderTemplate, a as renderComponent, u as unescapeHTML } from './astro/server__cawITtY.mjs';
import 'kleur/colors';
import { $ as $$MainLayout } from './MainLayout_BFrOPY-O.mjs';

const html = "<div class=\"tip\"><ul>\n<li>API Reference <a href=\"https://clinth.github.io/ixfx/modules/Flow.html\">Flow module</a></li>\n<li><a href=\"https://clinth.github.io/ixfx-demos/flow/\">Online demos</a></li>\n</ul></div>\n<p>When a function may succeed after some attempts, you might need a <em>retry</em> logic - keep trying the function until it succeeds, or after a certain number of attempts. You want some kind of waiting period between each attempt, eg to wait for a network connection.</p>\n<p>This can be achieved using <a href=\"https://clinth.github.io/ixfx/functions/Flow.retryFunction.html\"><code>retryFunction</code></a>.</p>\n<p>In the example, we will try up to five times to run the async function <code>doSomething</code>, starting with 1 second delay if it fails. This time gets longer and longer with each attempt.</p>\n<pre class=\"astro-code github-dark\" style=\"background-color:#24292e;color:#e1e4e8; overflow-x: auto;\" tabindex=\"0\" data-language=\"js\"><code><span class=\"line\"><span style=\"color:#F97583\">import</span><span style=\"color:#E1E4E8\"> { retry } </span><span style=\"color:#F97583\">from</span><span style=\"color:#9ECBFF\"> \"https://unpkg.com/ixfx/dist/flow.js\"</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color:#F97583\">const</span><span style=\"color:#B392F0\"> doSomething</span><span style=\"color:#F97583\"> =</span><span style=\"color:#E1E4E8\"> () </span><span style=\"color:#F97583\">=></span><span style=\"color:#E1E4E8\"> {</span></span>\n<span class=\"line\"><span style=\"color:#6A737D\">  // If this function throws an error or returns undefined,</span></span>\n<span class=\"line\"><span style=\"color:#6A737D\">  // it's assumed to have failed</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color:#6A737D\">  // for it to succeed it has to return a value</span></span>\n<span class=\"line\"><span style=\"color:#E1E4E8\">}</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color:#F97583\">const</span><span style=\"color:#79B8FF\"> result</span><span style=\"color:#F97583\"> =</span><span style=\"color:#F97583\"> await</span><span style=\"color:#B392F0\"> retryFunction</span><span style=\"color:#E1E4E8\">(doSomething, { limitAttempts: </span><span style=\"color:#79B8FF\">5</span><span style=\"color:#E1E4E8\">, startAt: </span><span style=\"color:#79B8FF\">1000</span><span style=\"color:#E1E4E8\"> });</span></span>\n<span class=\"line\"><span style=\"color:#F97583\">if</span><span style=\"color:#E1E4E8\"> (result.success) {</span></span>\n<span class=\"line\"><span style=\"color:#6A737D\">  // Yay result.value will contain the result of `doSomething`</span></span>\n<span class=\"line\"><span style=\"color:#E1E4E8\">} </span><span style=\"color:#F97583\">else</span><span style=\"color:#E1E4E8\"> {</span></span>\n<span class=\"line\"><span style=\"color:#6A737D\">  // result.message tells why it failed</span></span>\n<span class=\"line\"><span style=\"color:#E1E4E8\">}</span></span>\n<span class=\"line\"></span></code></pre>\n<p>See also:</p>\n<ul>\n<li><a href=\"https://clinth.github.io/ixfx/functions/Flow.waitFor.html\"><code>waitFor</code></a>: call a function and be notified if it doesn’t finish within a certain time</li>\n</ul>";

				const frontmatter = {"title":"Retrying","layout":"../../layouts/MainLayout.astro","setup":"import { DemoElement } from '../../components/DemoElement.ts';\n"};
				const file = "/Users/af4766/repos/ixfx-docs/src/pages/flow/retrying.md";
				const url = "/flow/retrying";
				function rawContent() {
					return "\n\n<div class=\"tip\"><ul>\n<li>API Reference <a href=\"https://clinth.github.io/ixfx/modules/Flow.html\">Flow module</a></li>\n<li><a href=\"https://clinth.github.io/ixfx-demos/flow/\">Online demos</a></li>\n</ul></div>\n\nWhen a function may succeed after some attempts, you might need a _retry_ logic - keep trying the function until it succeeds, or after a certain number of attempts. You want some kind of waiting period between each attempt, eg to wait for a network connection.\n\nThis can be achieved using [`retryFunction`](https://clinth.github.io/ixfx/functions/Flow.retryFunction.html).\n\nIn the example, we will try up to five times to run the async function `doSomething`, starting with 1 second delay if it fails. This time gets longer and longer with each attempt.\n\n```js\nimport { retry } from \"https://unpkg.com/ixfx/dist/flow.js\"\n\nconst doSomething = () => {\n  // If this function throws an error or returns undefined,\n  // it's assumed to have failed\n\n  // for it to succeed it has to return a value\n}\n\nconst result = await retryFunction(doSomething, { limitAttempts: 5, startAt: 1000 });\nif (result.success) {\n  // Yay result.value will contain the result of `doSomething`\n} else {\n  // result.message tells why it failed\n}\n```\n\nSee also:\n* [`waitFor`](https://clinth.github.io/ixfx/functions/Flow.waitFor.html): call a function and be notified if it doesn't finish within a certain time";
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
