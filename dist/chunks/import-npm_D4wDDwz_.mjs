import { c as createComponent, r as renderTemplate, a as renderComponent, u as unescapeHTML } from './astro/server__cawITtY.mjs';
import 'kleur/colors';
import { $ as $$MainLayout } from './MainLayout_BFrOPY-O.mjs';

const html = "<p>Assuming you have Node.js and NPM installed on your machine, you can install ixfx with:</p>\n<pre class=\"astro-code github-dark\" style=\"background-color:#24292e;color:#e1e4e8; overflow-x: auto;\" tabindex=\"0\" data-language=\"plaintext\"><code><span class=\"line\"><span>npm install ixfx</span></span>\n<span class=\"line\"><span></span></span></code></pre>\n<p>You’ll then need to you use your bundler of choice to include ixfx.</p>\n<p>Example module import:</p>\n<pre class=\"astro-code github-dark\" style=\"background-color:#24292e;color:#e1e4e8; overflow-x: auto;\" tabindex=\"0\" data-language=\"js\"><code><span class=\"line\"><span style=\"color:#F97583\">import</span><span style=\"color:#E1E4E8\"> { Flow } </span><span style=\"color:#F97583\">from</span><span style=\"color:#9ECBFF\"> \"ixfx\"</span></span>\n<span class=\"line\"><span style=\"color:#E1E4E8\">Flow.</span><span style=\"color:#B392F0\">continuously</span><span style=\"color:#E1E4E8\">(</span><span style=\"color:#F97583\">...</span><span style=\"color:#E1E4E8\">);</span></span>\n<span class=\"line\"></span></code></pre>\n<p>Example function import:</p>\n<pre class=\"astro-code github-dark\" style=\"background-color:#24292e;color:#e1e4e8; overflow-x: auto;\" tabindex=\"0\" data-language=\"js\"><code><span class=\"line\"><span style=\"color:#F97583\">import</span><span style=\"color:#E1E4E8\"> { continuously } </span><span style=\"color:#F97583\">from</span><span style=\"color:#9ECBFF\"> \"ixfx/lib/flow.js\"</span></span>\n<span class=\"line\"><span style=\"color:#B392F0\">continuously</span><span style=\"color:#E1E4E8\">(</span><span style=\"color:#F97583\">...</span><span style=\"color:#E1E4E8\">);</span></span>\n<span class=\"line\"></span></code></pre>\n<p>Note the path for modules contains <code>lib/</code> before the module file. This is different than using a URL import.</p>";

				const frontmatter = {"title":"Importing via NPM","description":"Importing the library","layout":"../layouts/MainLayout.astro","setup":"import ModuleList from './ModuleList.astro';\n"};
				const file = "/Users/af4766/repos/ixfx-docs/src/pages/import-npm.md";
				const url = "/import-npm";
				function rawContent() {
					return "\nAssuming you have Node.js and NPM installed on your machine, you can install ixfx with:\n\n```\nnpm install ixfx\n```\n\nYou'll then need to you use your bundler of choice to include ixfx.\n\n\nExample module import:\n\n```js\nimport { Flow } from \"ixfx\"\nFlow.continuously(...);\n```\n\nExample function import:\n\n```js\nimport { continuously } from \"ixfx/lib/flow.js\"\ncontinuously(...);\n```\n\nNote the path for modules contains `lib/` before the module file. This is different than using a URL import.";
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
