import { c as createComponent, r as renderTemplate, a as renderComponent, u as unescapeHTML } from './astro/server__cawITtY.mjs';
import 'kleur/colors';
import { $ as $$MainLayout } from './MainLayout_BFrOPY-O.mjs';

const html = "<script type=\"module\" hoist=\"\">\nimport '/src/components/types/geometry/arc';\nimport '/src/components/ReplPad';\n</script>\n<div class=\"tip\">\n<ul>\n<li>API Reference <a href=\"https://clinth.github.io/ixfx/modules/Visual.Colour.html\">Visual.Colour module</a></li>\n</ul></div>\n<script type=\"module\" hoist=\"\">\nimport '/src/loader';\nimport '/src/components/types/colour/ColourScaleElement';\n</script>\n<h2 id=\"interpolation\">Interpolation</h2>\n<p>Colours can be <em>interpolated</em>, eg. getting the colour that is 50% between red and blue.</p>\n<pre class=\"astro-code github-dark\" style=\"background-color:#24292e;color:#e1e4e8; overflow-x: auto;\" tabindex=\"0\" data-language=\"js\"><code><span class=\"line\"><span style=\"color:#6A737D\">// repl-pad#1</span></span>\n<span class=\"line\"><span style=\"color:#F97583\">import</span><span style=\"color:#E1E4E8\"> { Colour } </span><span style=\"color:#F97583\">from</span><span style=\"color:#9ECBFF\"> \"https://unpkg.com/ixfx/dist/visual.js\"</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color:#6A737D\">// Returns  `rgb(128, 0, 128)`</span></span>\n<span class=\"line\"><span style=\"color:#E1E4E8\">Colour.</span><span style=\"color:#B392F0\">interpolate</span><span style=\"color:#E1E4E8\">(</span><span style=\"color:#79B8FF\">0.5</span><span style=\"color:#E1E4E8\">, </span><span style=\"color:#9ECBFF\">`red`</span><span style=\"color:#E1E4E8\">, </span><span style=\"color:#9ECBFF\">`blue`</span><span style=\"color:#E1E4E8\">);</span></span>\n<span class=\"line\"></span></code></pre>\n<p>Regular CSS colour definitions can also be used:</p>\n<pre class=\"astro-code github-dark\" style=\"background-color:#24292e;color:#e1e4e8; overflow-x: auto;\" tabindex=\"0\" data-language=\"js\"><code><span class=\"line\"><span style=\"color:#6A737D\">// repl-pad#1</span></span>\n<span class=\"line\"><span style=\"color:#6A737D\">// Returns `rgb(0, 85, 128))`</span></span>\n<span class=\"line\"><span style=\"color:#E1E4E8\">Colour.</span><span style=\"color:#B392F0\">interpolate</span><span style=\"color:#E1E4E8\">(</span><span style=\"color:#79B8FF\">0.5</span><span style=\"color:#E1E4E8\">, </span><span style=\"color:#9ECBFF\">`hsl(200, 100%, 50%)`</span><span style=\"color:#E1E4E8\">, </span><span style=\"color:#9ECBFF\">`hsl(90, 100%, 50%`</span><span style=\"color:#E1E4E8\">);</span></span>\n<span class=\"line\"></span></code></pre>\n<p>By default colours are mixed in the RGB colour space. Options include: rgb, hsb, hcl, lch and lab.</p>\n<pre class=\"astro-code github-dark\" style=\"background-color:#24292e;color:#e1e4e8; overflow-x: auto;\" tabindex=\"0\" data-language=\"js\"><code><span class=\"line\"><span style=\"color:#6A737D\">// repl-pad#1</span></span>\n<span class=\"line\"><span style=\"color:#6A737D\">// Mix in HCL colour space. Returns `rgb(0, 170, 255))`</span></span>\n<span class=\"line\"><span style=\"color:#E1E4E8\">Colour.</span><span style=\"color:#B392F0\">interpolate</span><span style=\"color:#E1E4E8\">(</span><span style=\"color:#79B8FF\">0.5</span><span style=\"color:#E1E4E8\">, </span><span style=\"color:#9ECBFF\">`hsl(200, 100%, 50%)`</span><span style=\"color:#E1E4E8\">, </span><span style=\"color:#9ECBFF\">`hsl(90, 100%, 50%`</span><span style=\"color:#E1E4E8\">, </span><span style=\"color:#9ECBFF\">`hcl`</span><span style=\"color:#E1E4E8\">);</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color:#6A737D\">// ..or object options can be used. Here we also add the `long` parameter</span></span>\n<span class=\"line\"><span style=\"color:#6A737D\">// to make interpolation go the long way around the circle</span></span>\n<span class=\"line\"><span style=\"color:#E1E4E8\">Colour.</span><span style=\"color:#B392F0\">interpolate</span><span style=\"color:#E1E4E8\">(</span><span style=\"color:#79B8FF\">0.5</span><span style=\"color:#E1E4E8\">, </span><span style=\"color:#9ECBFF\">`hsl(200, 100%, 50%)`</span><span style=\"color:#E1E4E8\">, </span><span style=\"color:#9ECBFF\">`hsl(90, 100%, 50%`</span><span style=\"color:#E1E4E8\">, {space: </span><span style=\"color:#9ECBFF\">`hcl`</span><span style=\"color:#E1E4E8\">, long: </span><span style=\"color:#79B8FF\">true</span><span style=\"color:#E1E4E8\">} );</span></span>\n<span class=\"line\"></span></code></pre>\n<p>The colour space you choose can have a large impact on what colour is generated. Colour spaces are different with regard to perceptual brightness, uniformity and saturation. See example below for <code>scale</code>.</p>\n<h2 id=\"scale\">Scale</h2>\n<p>You can generate a series of colours with a specified number of steps with <code>scale</code>. The start and end colours are included appear as first and last step respectively.</p>\n<pre class=\"astro-code github-dark\" style=\"background-color:#24292e;color:#e1e4e8; overflow-x: auto;\" tabindex=\"0\" data-language=\"js\"><code><span class=\"line\"><span style=\"color:#6A737D\">// repl-pad</span></span>\n<span class=\"line\"><span style=\"color:#F97583\">import</span><span style=\"color:#E1E4E8\"> { Colour } </span><span style=\"color:#F97583\">from</span><span style=\"color:#9ECBFF\"> \"https://unpkg.com/ixfx/dist/visual.js\"</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color:#6A737D\">// Mixes in HCL space, returns an array of 10 string rgb() values, spaced between red and blue.</span></span>\n<span class=\"line\"><span style=\"color:#E1E4E8\">Colour.</span><span style=\"color:#B392F0\">scale</span><span style=\"color:#E1E4E8\">(</span><span style=\"color:#79B8FF\">10</span><span style=\"color:#E1E4E8\">, </span><span style=\"color:#9ECBFF\">`hcl`</span><span style=\"color:#E1E4E8\">, </span><span style=\"color:#9ECBFF\">`red`</span><span style=\"color:#E1E4E8\">, </span><span style=\"color:#9ECBFF\">`blue`</span><span style=\"color:#E1E4E8\">);</span></span>\n<span class=\"line\"></span></code></pre>\n<p>The demo below shows <code>scale</code> in action, as well how different interpolations can be between colour spaces.</p>\n<div id=\"colourScale\"></div>\n<script type=\"module\">\nimportEl(\n  `colourScale`, \n  `colourscale-element`, {});\n</script>\n<p>By default, a scale will be made in the shortest distance between the colours. If you purposefully want to include more colour variations, use the <code>long</code> option. This only applies to hsl, hcl and cubehelix colour spaces.</p>\n<pre class=\"astro-code github-dark\" style=\"background-color:#24292e;color:#e1e4e8; overflow-x: auto;\" tabindex=\"0\" data-language=\"js\"><code><span class=\"line\"><span style=\"color:#E1E4E8\">Colour.</span><span style=\"color:#B392F0\">scale</span><span style=\"color:#E1E4E8\">(</span><span style=\"color:#79B8FF\">10</span><span style=\"color:#E1E4E8\">, {space: </span><span style=\"color:#9ECBFF\">`hcl`</span><span style=\"color:#E1E4E8\">, long: </span><span style=\"color:#79B8FF\">true</span><span style=\"color:#E1E4E8\">}, </span><span style=\"color:#9ECBFF\">`red`</span><span style=\"color:#E1E4E8\">, </span><span style=\"color:#9ECBFF\">`blue`</span><span style=\"color:#E1E4E8\">);</span></span>\n<span class=\"line\"></span></code></pre>\n<h2 id=\"parsing\">Parsing</h2>\n<p>If you need to parse a colour string into its components:</p>\n<pre class=\"astro-code github-dark\" style=\"background-color:#24292e;color:#e1e4e8; overflow-x: auto;\" tabindex=\"0\" data-language=\"js\"><code><span class=\"line\"><span style=\"color:#6A737D\">// repl-pad</span></span>\n<span class=\"line\"><span style=\"color:#F97583\">import</span><span style=\"color:#E1E4E8\"> { Colour } </span><span style=\"color:#F97583\">from</span><span style=\"color:#9ECBFF\"> \"https://unpkg.com/ixfx/dist/visual.js\"</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color:#6A737D\">// Returns { h: 10.47, s: 1, l: 0.875 }</span></span>\n<span class=\"line\"><span style=\"color:#E1E4E8\">Colour.</span><span style=\"color:#B392F0\">toHsl</span><span style=\"color:#E1E4E8\">(</span><span style=\"color:#9ECBFF\">`pink`</span><span style=\"color:#E1E4E8\">);</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color:#6A737D\">// Returns { r: 255, g: 192, b: 203 }</span></span>\n<span class=\"line\"><span style=\"color:#E1E4E8\">Colour.</span><span style=\"color:#B392F0\">toRgb</span><span style=\"color:#E1E4E8\">(</span><span style=\"color:#9ECBFF\">`pink`</span><span style=\"color:#E1E4E8\">);</span></span>\n<span class=\"line\"></span></code></pre>\n<h2 id=\"variations\">Variations</h2>\n<pre class=\"astro-code github-dark\" style=\"background-color:#24292e;color:#e1e4e8; overflow-x: auto;\" tabindex=\"0\" data-language=\"js\"><code><span class=\"line\"><span style=\"color:#6A737D\">// repl-pad</span></span>\n<span class=\"line\"><span style=\"color:#F97583\">import</span><span style=\"color:#E1E4E8\"> { Colour } </span><span style=\"color:#F97583\">from</span><span style=\"color:#9ECBFF\"> \"https://unpkg.com/ixfx/dist/visual.js\"</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color:#6A737D\">// Returns a colour string for blue at 50% opacity</span></span>\n<span class=\"line\"><span style=\"color:#6A737D\">// `rgba(0, 0, 255, 0.5)`</span></span>\n<span class=\"line\"><span style=\"color:#F97583\">const</span><span style=\"color:#79B8FF\"> halfBlue</span><span style=\"color:#F97583\"> =</span><span style=\"color:#E1E4E8\"> Colour.</span><span style=\"color:#B392F0\">opacity</span><span style=\"color:#E1E4E8\">(</span><span style=\"color:#9ECBFF\">`blue`</span><span style=\"color:#E1E4E8\">, </span><span style=\"color:#79B8FF\">0.5</span><span style=\"color:#E1E4E8\">);</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color:#6A737D\">// If a colour already has opacity, it is multiplied</span></span>\n<span class=\"line\"><span style=\"color:#6A737D\">// `rgba(0, 0, 255, 0.25)`</span></span>\n<span class=\"line\"><span style=\"color:#F97583\">const</span><span style=\"color:#79B8FF\"> quarterBlue</span><span style=\"color:#F97583\"> =</span><span style=\"color:#E1E4E8\"> Colour.</span><span style=\"color:#B392F0\">opacity</span><span style=\"color:#E1E4E8\">(halfBlue, </span><span style=\"color:#79B8FF\">0.5</span><span style=\"color:#E1E4E8\">);</span></span>\n<span class=\"line\"></span></code></pre>\n<h2 id=\"credits\">Credits</h2>\n<p>Most of the functionality of the colour module is via Mike Bostock’s <a href=\"https://github.com/d3/d3-color\">d3-color</a> and <a href=\"https://github.com/d3/d3-interpolate\">d3-interpolate</a>.</p>";

				const frontmatter = {"title":"Colour","layout":"../../../layouts/MainLayout.astro"};
				const file = "/Users/af4766/repos/ixfx-docs/src/pages/types/colour/index.md";
				const url = "/types/colour";
				function rawContent() {
					return "\n<script type=\"module\" hoist>\nimport '/src/components/types/geometry/arc';\nimport '/src/components/ReplPad';\n</script>\n\n<div class=\"tip\">\n<ul>\n<li>API Reference <a href=\"https://clinth.github.io/ixfx/modules/Visual.Colour.html\">Visual.Colour module</a></li>\n</div>\n\n<script type=\"module\" hoist>\nimport '/src/loader';\nimport '/src/components/types/colour/ColourScaleElement';\n</script>\n\n\n## Interpolation\n\nColours can be _interpolated_, eg. getting the colour that is 50% between red and blue.\n\n```js\n// repl-pad#1\nimport { Colour } from \"https://unpkg.com/ixfx/dist/visual.js\"\n\n// Returns  `rgb(128, 0, 128)`\nColour.interpolate(0.5, `red`, `blue`);\n```\n\nRegular CSS colour definitions can also be used:\n\n```js\n// repl-pad#1\n// Returns `rgb(0, 85, 128))`\nColour.interpolate(0.5, `hsl(200, 100%, 50%)`, `hsl(90, 100%, 50%`);\n```\n\nBy default colours are mixed in the RGB colour space. Options include: rgb, hsb, hcl, lch and lab.\n\n```js\n// repl-pad#1\n// Mix in HCL colour space. Returns `rgb(0, 170, 255))`\nColour.interpolate(0.5, `hsl(200, 100%, 50%)`, `hsl(90, 100%, 50%`, `hcl`);\n\n// ..or object options can be used. Here we also add the `long` parameter\n// to make interpolation go the long way around the circle\nColour.interpolate(0.5, `hsl(200, 100%, 50%)`, `hsl(90, 100%, 50%`, {space: `hcl`, long: true} );\n```\n\nThe colour space you choose can have a large impact on what colour is generated. Colour spaces are different with regard to perceptual brightness, uniformity and saturation. See example below for `scale`.\n\n## Scale\n\nYou can generate a series of colours with a specified number of steps with `scale`. The start and end colours are included appear as first and last step respectively.\n\n```js\n// repl-pad\nimport { Colour } from \"https://unpkg.com/ixfx/dist/visual.js\"\n\n// Mixes in HCL space, returns an array of 10 string rgb() values, spaced between red and blue.\nColour.scale(10, `hcl`, `red`, `blue`);\n```\n\nThe demo below shows `scale` in action, as well how different interpolations can be between colour spaces.\n\n<div id=\"colourScale\"></div>\n<script type=\"module\">\nimportEl(\n  `colourScale`, \n  `colourscale-element`, {});\n</script>\n\nBy default, a scale will be made in the shortest distance between the colours. If you purposefully want to include more colour variations, use the `long` option. This only applies to hsl, hcl and cubehelix colour spaces.\n\n```js\nColour.scale(10, {space: `hcl`, long: true}, `red`, `blue`);\n```\n\n## Parsing\n\nIf you need to parse a colour string into its components:\n\n```js\n// repl-pad\nimport { Colour } from \"https://unpkg.com/ixfx/dist/visual.js\"\n\n// Returns { h: 10.47, s: 1, l: 0.875 }\nColour.toHsl(`pink`);\n\n// Returns { r: 255, g: 192, b: 203 }\nColour.toRgb(`pink`);\n```\n\n## Variations\n\n```js\n// repl-pad\nimport { Colour } from \"https://unpkg.com/ixfx/dist/visual.js\"\n\n// Returns a colour string for blue at 50% opacity\n// `rgba(0, 0, 255, 0.5)`\nconst halfBlue = Colour.opacity(`blue`, 0.5);\n\n// If a colour already has opacity, it is multiplied\n// `rgba(0, 0, 255, 0.25)`\nconst quarterBlue = Colour.opacity(halfBlue, 0.5);\n```\n\n## Credits\n\nMost of the functionality of the colour module is via Mike Bostock's [d3-color](https://github.com/d3/d3-color) and [d3-interpolate](https://github.com/d3/d3-interpolate). ";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [{"depth":2,"slug":"interpolation","text":"Interpolation"},{"depth":2,"slug":"scale","text":"Scale"},{"depth":2,"slug":"parsing","text":"Parsing"},{"depth":2,"slug":"variations","text":"Variations"},{"depth":2,"slug":"credits","text":"Credits"}];
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