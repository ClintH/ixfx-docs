import { c as createComponent, r as renderTemplate, a as renderComponent, u as unescapeHTML } from './astro/server__cawITtY.mjs';
import 'kleur/colors';
import { $ as $$MainLayout } from './MainLayout_BFrOPY-O.mjs';

const html = "<p><a href=\"http://www.espruino.com/Pico\">Espruino Pico</a> is an open-source platform by\nGordon Williams. Ixfx has a few functions to help communicating with Espruino\nboards, but for the most part you write Javascript that runs on the board\nitself.</p>\n<p>This board is useful for connecting to inputs and outputs. Unlike\n<a href=\"../espruino-puck/\">Puck.js</a>, it has no wireless connectivity or on-board\nsensors.</p>\n<div class=\"tip\">\n<ul>\n<li>API Reference <a href=\"https://clinth.github.io/ixfx/modules/Io.Espruino.html\">Io.Espruino module</a></li>\n<li>Parent <a href=\"https://clinth.github.io/ixfx/modules/Io.html\">Io module</a></li>\n<li>Official Espruino <a href=\"http://www.espruino.com/Reference#software\">API Reference</a>, <a href=\"http://www.espruino.com/Tutorials\">Tutorials</a>\n</li></ul></div>\n<p>First steps:</p>\n<ul>\n<li><a href=\"http://www.espruino.com/Quick+Start+USB\">Preparing</a> - Connecting the Pico and\ngetting the <a href=\"http://www.espruino.com/Web+IDE\">Espruino IDE</a> working</li>\n<li><a href=\"http://www.espruino.com/Quick+Start+Code\">Quick start - code</a> - First steps\nprogramming the Pico</li>\n</ul>\n<h2 id=\"official\">Official</h2>\n<p>Below are some selected resources from Espruino.com.</p>\n<p>Tutorials</p>\n<ul>\n<li><a href=\"http://www.espruino.com/Pico+Piano\">Piano</a> - Stylophone-esque sound\ngeneration</li>\n<li><a href=\"http://www.espruino.com/Pico+Buttons\">Buttons</a> - Wiring up and using simple\ntact switches with a Pico</li>\n<li><a href=\"http://www.espruino.com/Pico+Light+Sensor\">Light sensor</a> - Analog input, a\ncommon LDR (Light Dependent Resistor)</li>\n<li><a href=\"http://www.espruino.com/Pico+Vibration\">Vibration</a> - Digital input, a\nvibration sensor</li>\n<li><a href=\"http://www.espruino.com/Pico+LCD+Hello+World\">LCD</a> - Using with a LCD display</li>\n<li><a href=\"http://www.espruino.com/Slot+Machine\">LEDs</a> - Controlling Neopixel LEDs</li>\n</ul>";

				const frontmatter = {"title":"Espruino Pico","layout":"../../layouts/MainLayout.astro"};
				const file = "/Users/af4766/repos/ixfx-docs/src/pages/io/espruino-pico.md";
				const url = "/io/espruino-pico";
				function rawContent() {
					return "\n[Espruino Pico](http://www.espruino.com/Pico) is an open-source platform by\nGordon Williams. Ixfx has a few functions to help communicating with Espruino\nboards, but for the most part you write Javascript that runs on the board\nitself.\n\nThis board is useful for connecting to inputs and outputs. Unlike\n[Puck.js](../espruino-puck/), it has no wireless connectivity or on-board\nsensors.\n\n<div class=\"tip\">\n<ul>\n<li>API Reference <a href=\"https://clinth.github.io/ixfx/modules/Io.Espruino.html\">Io.Espruino module</a></li>\n<li>Parent <a href=\"https://clinth.github.io/ixfx/modules/Io.html\">Io module</a></li>\n<li>Official Espruino <a href=\"http://www.espruino.com/Reference#software\">API Reference</a>, <a href=\"http://www.espruino.com/Tutorials\">Tutorials</a></l>\n</div>\n\nFirst steps:\n\n- [Preparing](http://www.espruino.com/Quick+Start+USB) - Connecting the Pico and\n  getting the [Espruino IDE](http://www.espruino.com/Web+IDE) working\n- [Quick start - code](http://www.espruino.com/Quick+Start+Code) - First steps\n  programming the Pico\n\n## Official\n\nBelow are some selected resources from Espruino.com.\n\nTutorials\n\n- [Piano](http://www.espruino.com/Pico+Piano) - Stylophone-esque sound\n  generation\n- [Buttons](http://www.espruino.com/Pico+Buttons) - Wiring up and using simple\n  tact switches with a Pico\n- [Light sensor](http://www.espruino.com/Pico+Light+Sensor) - Analog input, a\n  common LDR (Light Dependent Resistor)\n- [Vibration](http://www.espruino.com/Pico+Vibration) - Digital input, a\n  vibration sensor\n- [LCD](http://www.espruino.com/Pico+LCD+Hello+World) - Using with a LCD display\n- [LEDs](http://www.espruino.com/Slot+Machine) - Controlling Neopixel LEDs\n";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [{"depth":2,"slug":"official","text":"Official"}];
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
