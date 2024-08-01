import { c as createComponent, r as renderTemplate, a as renderComponent, u as unescapeHTML } from './astro/server__cawITtY.mjs';
import 'kleur/colors';
import { $ as $$MainLayout } from './MainLayout_BFrOPY-O.mjs';

const html = "<h2 id=\"via-url-import\">Via URL import</h2>\n<p>You can import the whole package with a URL to <em>bundle.js</em></p>\n<pre class=\"astro-code github-dark\" style=\"background-color:#24292e;color:#e1e4e8; overflow-x: auto;\" tabindex=\"0\" data-language=\"js\"><code><span class=\"line\"><span style=\"color:#F97583\">import</span><span style=\"color:#E1E4E8\"> {Timers} </span><span style=\"color:#F97583\">from</span><span style=\"color:#9ECBFF\"> \"https://unpkg.com/ixfx/dist/bundle.js\"</span><span style=\"color:#E1E4E8\">;</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color:#6A737D\">// Use something from the module, eg:</span></span>\n<span class=\"line\"><span style=\"color:#E1E4E8\">Timers.</span><span style=\"color:#B392F0\">continuously</span><span style=\"color:#E1E4E8\">( </span><span style=\"color:#F97583\">...</span><span style=\"color:#E1E4E8\"> )</span></span>\n<span class=\"line\"></span></code></pre>\n<p>Or an individual module, note <em>flow.js</em> instead:</p>\n<pre class=\"astro-code github-dark\" style=\"background-color:#24292e;color:#e1e4e8; overflow-x: auto;\" tabindex=\"0\" data-language=\"js\"><code><span class=\"line\"><span style=\"color:#F97583\">import</span><span style=\"color:#E1E4E8\"> {continuously} </span><span style=\"color:#F97583\">from</span><span style=\"color:#9ECBFF\"> \"https://unpkg.com/ixfx/dist/flow.js\"</span><span style=\"color:#E1E4E8\">;</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color:#6A737D\">// Use something from the module, eg:</span></span>\n<span class=\"line\"><span style=\"color:#B392F0\">continuously</span><span style=\"color:#E1E4E8\">( </span><span style=\"color:#F97583\">...</span><span style=\"color:#E1E4E8\"> )</span></span>\n<span class=\"line\"></span></code></pre>\n<p>A starting template is available on <a href=\"https://glitch.com/edit/#!/ixfx-starter-url?path=script.js%3A1%3A0\">Glitch</a></p>";

				const frontmatter = {"title":"Importing via URL","layout":"../layouts/MainLayout.astro","setup":"import ModuleList from './ModuleList.astro';\n"};
				const file = "/Users/af4766/repos/ixfx-docs/src/pages/import-url.md";
				const url = "/import-url";
				function rawContent() {
					return "\n## Via URL import\n\nYou can import the whole package with a URL to _bundle.js_\n```js\nimport {Timers} from \"https://unpkg.com/ixfx/dist/bundle.js\";\n\n// Use something from the module, eg:\nTimers.continuously( ... )\n```\n\nOr an individual module, note _flow.js_ instead:\n\n```js\nimport {continuously} from \"https://unpkg.com/ixfx/dist/flow.js\";\n\n// Use something from the module, eg:\ncontinuously( ... )\n```\n\nA starting template is available on [Glitch](https://glitch.com/edit/#!/ixfx-starter-url?path=script.js%3A1%3A0)";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [{"depth":2,"slug":"via-url-import","text":"Via URL import"}];
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
