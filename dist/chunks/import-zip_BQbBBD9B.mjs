import { c as createComponent, r as renderTemplate, a as renderComponent, u as unescapeHTML } from './astro/server__cawITtY.mjs';
import 'kleur/colors';
import { $ as $$MainLayout } from './MainLayout_BFrOPY-O.mjs';

const html = "<ol>\n<li>\n<p><a href=\"https://github.com/ClintH/ixfx/archive/refs/heads/main.zip\">Get the latest code</a></p>\n</li>\n<li>\n<p>Download and unzip. Grab the files from the <code>dist</code> folder and put them into a folder called <code>ixfx</code> in a directory containing your sketches.</p>\n</li>\n</ol>\n<p>Thus you should have:</p>\n<pre class=\"astro-code github-dark\" style=\"background-color:#24292e;color:#e1e4e8; overflow-x: auto;\" tabindex=\"0\" data-language=\"plaintext\"><code><span class=\"line\"><span>|- ixfx\\</span></span>\n<span class=\"line\"><span>|-- arrays.d.ts</span></span>\n<span class=\"line\"><span>|-- arrays.js</span></span>\n<span class=\"line\"><span>|-- ...</span></span>\n<span class=\"line\"><span>|- index.html &#x3C;-- your HTML file</span></span>\n<span class=\"line\"><span>|- script.js  &#x3C;-- your JS sketch</span></span>\n<span class=\"line\"><span></span></span></code></pre>\n<p>Assuming then the folder <em>ixfx</em> is in the same parent folder as your sketch, you should then be able to import using a relative path:</p>\n<pre class=\"astro-code github-dark\" style=\"background-color:#24292e;color:#e1e4e8; overflow-x: auto;\" tabindex=\"0\" data-language=\"js\"><code><span class=\"line\"><span style=\"color:#F97583\">import</span><span style=\"color:#E1E4E8\"> { Timers } </span><span style=\"color:#F97583\">from</span><span style=\"color:#9ECBFF\"> \"./ixfx/bundle.js\"</span></span>\n<span class=\"line\"><span style=\"color:#E1E4E8\">Timers.</span><span style=\"color:#B392F0\">continuously</span><span style=\"color:#E1E4E8\">(</span><span style=\"color:#F97583\">...</span><span style=\"color:#E1E4E8\">);</span></span>\n<span class=\"line\"></span></code></pre>\n<p>This is how the ixfx demos are organised, you can see this in action <a href=\"https://github.com/clinth/ixfx-demos/\">in the repository</a>.</p>";

				const frontmatter = {"title":"Importing via a ZIP","description":"Importing the library","layout":"../layouts/MainLayout.astro","setup":"import ModuleList from './ModuleList.astro';\n"};
				const file = "/Users/af4766/repos/ixfx-docs/src/pages/import-zip.md";
				const url = "/import-zip";
				function rawContent() {
					return "\n1. [Get the latest code](https://github.com/ClintH/ixfx/archive/refs/heads/main.zip)\n\n2. Download and unzip. Grab the files from the `dist` folder and put them into a folder called `ixfx` in a directory containing your sketches.\n\nThus you should have:\n```\n|- ixfx\\\n|-- arrays.d.ts\n|-- arrays.js\n|-- ...\n|- index.html <-- your HTML file\n|- script.js  <-- your JS sketch\n```\n\nAssuming then the folder _ixfx_ is in the same parent folder as your sketch, you should then be able to import using a relative path:\n\n```js\nimport { Timers } from \"./ixfx/bundle.js\"\nTimers.continuously(...);\n```\n\nThis is how the ixfx demos are organised, you can see this in action [in the repository](https://github.com/clinth/ixfx-demos/).";
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
