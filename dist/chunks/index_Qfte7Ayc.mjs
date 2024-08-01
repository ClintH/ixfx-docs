import { c as createComponent, r as renderTemplate, a as renderComponent, u as unescapeHTML } from './astro/server__cawITtY.mjs';
import 'kleur/colors';
import { $ as $$MainLayout } from './MainLayout_BFrOPY-O.mjs';

const html = "<p>The <a href=\"https://clinth.github.io/ixfx/modules/Geometry.html\">Geometry module</a> contains functions for working with basic shapes.</p>\n<ul>\n<li><a href=\"https://clinth.github.io/ixfx-demos/geometry/\">Online geometry demos</a> (<a href=\"https://github.com/ClintH/ixfx-demos/tree/main/geometry\">source</a>)</li>\n</ul>\n<p>Geometry primitives</p>\n<ul>\n<li><a href=\"./point/\">Point</a>: A <em>x,y</em> coordinate</li>\n<li><a href=\"./vector/\">Vector</a>: A vector of magnitude and direction</li>\n<li><a href=\"./line/\">Line</a>: Consisting of two points</li>\n<li><a href=\"./arc/\">Arc</a>: A segment of circle perimeter</li>\n<li><a href=\"./circle/\">Circle</a>: A circle</li>\n<li><a href=\"./rect/\">Rect</a>: A rectangle</li>\n</ul>\n<p>Explainer</p>\n<ul>\n<li><a href=\"./units/\">Units</a>: An overview of angles and coordinate spaces</li>\n</ul>\n<p>Layout</p>\n<ul>\n<li><a href=\"./grid/\">Grid layout</a>: Spatial logic of a grid</li>\n</ul>";

				const frontmatter = {"title":"Geometry","layout":"../../../layouts/MainLayout.astro"};
				const file = "/Users/af4766/repos/ixfx-docs/src/pages/types/geometry/index.md";
				const url = "/types/geometry";
				function rawContent() {
					return "\nThe [Geometry module](https://clinth.github.io/ixfx/modules/Geometry.html) contains functions for working with basic shapes.\n\n* [Online geometry demos](https://clinth.github.io/ixfx-demos/geometry/) ([source](https://github.com/ClintH/ixfx-demos/tree/main/geometry))\n\nGeometry primitives\n* [Point](./point/): A _x,y_ coordinate\n* [Vector](./vector/): A vector of magnitude and direction\n* [Line](./line/): Consisting of two points\n* [Arc](./arc/): A segment of circle perimeter\n* [Circle](./circle/): A circle\n* [Rect](./rect/): A rectangle\n\nExplainer\n* [Units](./units/): An overview of angles and coordinate spaces\n\nLayout\n* [Grid layout](./grid/): Spatial logic of a grid\n";
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
