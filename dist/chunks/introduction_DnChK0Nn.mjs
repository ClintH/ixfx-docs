import { c as createComponent, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from './astro/server__cawITtY.mjs';
import 'kleur/colors';
import 'clsx';

const html = "<h1 id=\"modulation\">Modulation</h1>";

				const frontmatter = {};
				const file = "/Users/af4766/repos/ixfx-docs/src/pages/modulation/introduction.md";
				const url = "/modulation/introduction";
				function rawContent() {
					return "# Modulation";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [{"depth":1,"slug":"modulation","text":"Modulation"}];
				}

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${maybeRenderHead()}${unescapeHTML(html)}`;
				});

export { Content, compiledContent, Content as default, file, frontmatter, getHeadings, rawContent, url };
