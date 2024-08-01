import { c as createComponent, r as renderTemplate, a as renderComponent, u as unescapeHTML } from './astro/server__cawITtY.mjs';
import 'kleur/colors';
import { $ as $$MainLayout } from './MainLayout_BFrOPY-O.mjs';

const html = "<div class=\"tip\">\n<ul>\n<li>API Reference <a href=\"https://clinth.github.io/ixfx/modules/Io.Espruino.html\">Io.Espruino module</a></li>\n<li>Parent <a href=\"https://clinth.github.io/ixfx/modules/Io.html\">Io module</a></li>\n</ul></div>\n<p><a href=\"http://www.espruino.com/\">Espruino</a> is an open-source platform by Gordon\nWilliams. Ixfx has a few functions to help communicating with Espruino boards,\nbut for the most part you write Javascript that runs on the board itself.</p>\n<ul>\n<li><a href=\"http://www.espruino.com/Tutorials\">Espruino tutorials</a> - tutorials for\nvarious kinds of projects using Espruino devices</li>\n<li><a href=\"http://www.espruino.com/Reference#software\">Espruino API reference</a> - lists\nin-built functions and modules</li>\n</ul>\n<p>Some resources are collected for:</p>\n<ul>\n<li><a href=\"../espruino-puck/\">Puck.js</a></li>\n<li><a href=\"../espruino-pico/\">Pico</a></li>\n</ul>";

				const frontmatter = {"title":"Espruino","layout":"../../layouts/MainLayout.astro"};
				const file = "/Users/af4766/repos/ixfx-docs/src/pages/io/espruino.md";
				const url = "/io/espruino";
				function rawContent() {
					return "\n<div class=\"tip\">\n<ul>\n<li>API Reference <a href=\"https://clinth.github.io/ixfx/modules/Io.Espruino.html\">Io.Espruino module</a></li>\n<li>Parent <a href=\"https://clinth.github.io/ixfx/modules/Io.html\">Io module</a></li>\n</div>\n\n[Espruino](http://www.espruino.com/) is an open-source platform by Gordon\nWilliams. Ixfx has a few functions to help communicating with Espruino boards,\nbut for the most part you write Javascript that runs on the board itself.\n\n- [Espruino tutorials](http://www.espruino.com/Tutorials) - tutorials for\n  various kinds of projects using Espruino devices\n- [Espruino API reference](http://www.espruino.com/Reference#software) - lists\n  in-built functions and modules\n\nSome resources are collected for:\n\n- [Puck.js](../espruino-puck/)\n- [Pico](../espruino-pico/)\n";
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
