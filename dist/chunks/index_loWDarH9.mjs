import { c as createComponent, r as renderTemplate, a as renderComponent, u as unescapeHTML } from './astro/server__cawITtY.mjs';
import 'kleur/colors';
import { $ as $$MainLayout } from './MainLayout_BFrOPY-O.mjs';

const html = "<div class=\"tip\">\n<ul>\n<li>API Reference <a href=\"https://clinth.github.io/ixfx/modules/Collections.html\">Collections module</a></li>\n</ul></div>\n<ul>\n<li><a href=\"../arrays/\">Array</a> - Arrays are the basic way for keeping a list of data</li>\n<li><a href=\"./stack/\">Stack</a> - Keep track of items like a stack of plates. Most recent gets added to the top, and you can only take the most recent from the top.</li>\n<li><a href=\"./queue/\">Queue</a> - Keep track of items like a bakery queue. Most recent is added to the back of the queue, and you can only take from the front of the queue (ie the oldest)</li>\n<li><a href=\"./set/\">Set</a> - Sets keep track of unique items.</li>\n<li><a href=\"./map/\">Map</a> - Keeps track of key-value pairs.</li>\n<li><a href=\"./expiringMap/\">Expiring Map</a> - A forgetful map.</li>\n</ul>\n<p>Patterns</p>\n<ul>\n<li><a href=\"../process-set/\">Process a queue or stack of items</a></li>\n</ul>";

				const frontmatter = {"title":"Collections","layout":"../../../layouts/MainLayout.astro"};
				const file = "/Users/af4766/repos/ixfx-docs/src/pages/data/collections/index.md";
				const url = "/data/collections";
				function rawContent() {
					return "\n<div class=\"tip\">\n<ul>\n<li>API Reference <a href=\"https://clinth.github.io/ixfx/modules/Collections.html\">Collections module</a></li>\n</div>\n\n\n* [Array](../arrays/) - Arrays are the basic way for keeping a list of data\n* [Stack](./stack/) - Keep track of items like a stack of plates. Most recent gets added to the top, and you can only take the most recent from the top.\n* [Queue](./queue/) - Keep track of items like a bakery queue. Most recent is added to the back of the queue, and you can only take from the front of the queue (ie the oldest)\n* [Set](./set/) - Sets keep track of unique items.\n* [Map](./map/) - Keeps track of key-value pairs.\n* [Expiring Map](./expiringMap/) - A forgetful map.\n\nPatterns\n* [Process a queue or stack of items](../process-set/)\n\n";
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
