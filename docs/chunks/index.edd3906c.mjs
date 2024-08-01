import { c as createMetadata, a as createAstro, b as createComponent, r as render, d as renderComponent, m as markHTMLString, F as Fragment, f as renderSlot, e as addAttribute } from './index.7bfc2e7e.mjs';
import * as $$module1$2 from 'shiki';
import { getHighlighter } from 'shiki';
import * as Prism from 'prismjs';
import Prism__default from 'prismjs';
import * as $$module3 from 'prismjs/components/index.js';
import $$module3__default from 'prismjs/components/index.js';

const $$metadata = createMetadata("/node_modules/astro/components/Code.astro", { modules: [{ module: $$module1$2, specifier: "shiki", assert: {} }, { module: $$module1$2, specifier: "shiki", assert: {} }], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
const $$Astro$3 = createAstro("/node_modules/astro/components/Code.astro", "https://clinth.github.io/ixfx-docs/", "file:///Users/af4766/repos/ixfx-docs/");
const $$Code = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Code;
  const { code, lang = "plaintext", theme = "github-dark", wrap = false } = Astro2.props;
  function repairShikiTheme(html2) {
    html2 = html2.replace('<pre class="shiki"', '<pre is:raw class="astro-code"');
    html2 = html2.replace(/style="(background-)?color: var\(--shiki-/g, 'style="$1color: var(--astro-code-');
    if (wrap === false) {
      html2 = html2.replace(/style="(.*?)"/, 'style="$1; overflow-x: auto;"');
    } else if (wrap === true) {
      html2 = html2.replace(/style="(.*?)"/, 'style="$1; overflow-x: auto; white-space: pre-wrap; word-wrap: break-word;"');
    }
    return html2;
  }
  const highlighter = await getHighlighter({
    theme,
    langs: typeof lang !== "string" ? [lang] : void 0
  });
  const _html = highlighter.codeToHtml(code, { lang: typeof lang === "string" ? lang : lang.id });
  const html = repairShikiTheme(_html);
  return render`${renderComponent($$result, "Fragment", Fragment, {}, { "default": () => render`${markHTMLString(html)}` })}
`;
});

var $$module1$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  $$metadata: $$metadata,
  'default': $$Code
}, Symbol.toStringTag, { value: 'Module' }));

var Debug_astro_astro_type_style_index_0_lang = '';

createMetadata("/node_modules/astro/components/Debug.astro", { modules: [{ module: $$module1$1, specifier: "./Code.astro", assert: {} }], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
const $$Astro$2 = createAstro("/node_modules/astro/components/Debug.astro", "https://clinth.github.io/ixfx-docs/", "file:///Users/af4766/repos/ixfx-docs/");
const $$Debug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Debug;
  const key = Object.keys(Astro2.props)[0];
  const value = Astro2.props[key];
  const STYLES = [];
  for (const STYLE of STYLES)
    $$result.styles.add(STYLE);
  return render`<div class="debug astro-7HSJXGCA">
	<div class="debug-header astro-7HSJXGCA">
		<h2 class="debug-title astro-7HSJXGCA"><span class="debug-label astro-7HSJXGCA">Debug</span> <span class="debug-name astro-7HSJXGCA">"${key}"</span></h2>
	</div>

	${renderComponent($$result, "Code", $$Code, { "code": JSON.stringify(value, null, 2), "class": "astro-7HSJXGCA" })}
</div>


`;
});

createMetadata("/node_modules/astro/components/Markdown.astro", { modules: [], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
const $$Astro$1 = createAstro("/node_modules/astro/components/Markdown.astro", "https://clinth.github.io/ixfx-docs/", "file:///Users/af4766/repos/ixfx-docs/");
const $$Markdown = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Markdown;
  const dedent = (str) => {
    const _str = str.split("\n").filter((s) => s.trimStart().length > 0);
    if (_str.length === 0) {
      return str.trimStart();
    }
    const trimmedSpace = _str[0].replace(_str[0].trimStart(), "");
    return str.split("\n").map((ln) => ln.startsWith(trimmedSpace) ? ln.replace(trimmedSpace, "") : ln).join("\n");
  };
  let { content, class: className } = Astro2.props;
  let html = null;
  let htmlContent = "";
  const { privateRenderMarkdownDoNotUse: renderMarkdown } = Astro2;
  if (!content) {
    content = await Astro2.slots.render("default");
    if (content !== void 0 && content !== null) {
      content = dedent(content);
    }
  }
  if (content) {
    htmlContent = await renderMarkdown(content, {
      mode: "md",
      $: {
        scopedClassName: className
      }
    });
  }
  html = htmlContent;
  return render`${html ? render`${renderComponent($$result, "Fragment", Fragment, {}, { "default": () => render`${markHTMLString(html)}` })}` : render`${renderSlot($$result, $$slots["default"])}`}
`;
});

function addAstro(Prism) {
	if (Prism.languages.astro) {
		return;
	}

	let scriptLang;
	if (Prism.languages.typescript) {
		scriptLang = 'typescript';
	} else {
		scriptLang = 'javascript';
		console.warn('Prism TypeScript language not loaded, Astro scripts will be treated as JavaScript.');
	}

	let script = Prism.util.clone(Prism.languages[scriptLang]);

	let space = /(?:\s|\/\/.*(?!.)|\/\*(?:[^*]|\*(?!\/))\*\/)/.source;
	let braces = /(?:\{(?:\{(?:\{[^{}]*\}|[^{}])*\}|[^{}])*\})/.source;
	let spread = /(?:\{<S>*\.{3}(?:[^{}]|<BRACES>)*\})/.source;

	/**
	 * @param {string} source
	 * @param {string} [flags]
	 */
	function re(source, flags) {
		source = source
			.replace(/<S>/g, function () {
				return space;
			})
			.replace(/<BRACES>/g, function () {
				return braces;
			})
			.replace(/<SPREAD>/g, function () {
				return spread;
			});
		return RegExp(source, flags);
	}

	spread = re(spread).source;

	Prism.languages.astro = Prism.languages.extend('markup', script);
	Prism.languages.astro.tag.pattern = re(/<\/?(?:[\w.:-]+(?:<S>+(?:[\w.:$-]+(?:=(?:"(?:\\[^]|[^\\"])*"|'(?:\\[^]|[^\\'])*'|[^\s{'"/>=]+|<BRACES>))?|<SPREAD>))*<S>*\/?)?>/.source);

	Prism.languages.astro.tag.inside['tag'].pattern = /^<\/?[^\s>\/]*/i;
	Prism.languages.astro.tag.inside['attr-value'].pattern = /=(?!\{)(?:"(?:\\[^]|[^\\"])*"|'(?:\\[^]|[^\\'])*'|[^\s'">]+)/i;
	Prism.languages.astro.tag.inside['tag'].inside['class-name'] = /^[A-Z]\w*(?:\.[A-Z]\w*)*$/;
	Prism.languages.astro.tag.inside['comment'] = script['comment'];

	Prism.languages.insertBefore(
		'inside',
		'attr-name',
		{
			spread: {
				pattern: re(/<SPREAD>/.source),
				inside: Prism.languages.astro,
			},
		},
		Prism.languages.astro.tag
	);

	Prism.languages.insertBefore(
		'inside',
		'special-attr',
		{
			script: {
				// Allow for two levels of nesting
				pattern: re(/=<BRACES>/.source),
				inside: {
					'script-punctuation': {
						pattern: /^=(?={)/,
						alias: 'punctuation',
					},
					rest: Prism.languages.astro,
				},
				alias: `language-${scriptLang}`,
			},
		},
		Prism.languages.astro.tag
	);

	// The following will handle plain text inside tags
	let stringifyToken = function (token) {
		if (!token) {
			return '';
		}
		if (typeof token === 'string') {
			return token;
		}
		if (typeof token.content === 'string') {
			return token.content;
		}
		return token.content.map(stringifyToken).join('');
	};

	let walkTokens = function (tokens) {
		let openedTags = [];
		for (let i = 0; i < tokens.length; i++) {
			let token = tokens[i];

			// This breaks styles, not sure why
			if (token.type === 'style') {
				return;
			}

			let notTagNorBrace = false;

			if (typeof token !== 'string') {
				if (token.type === 'tag' && token.content[0] && token.content[0].type === 'tag') {
					// We found a tag, now find its kind

					if (token.content[0].content[0].content === '</') {
						// Closing tag
						if (openedTags.length > 0 && openedTags[openedTags.length - 1].tagName === stringifyToken(token.content[0].content[1])) {
							// Pop matching opening tag
							openedTags.pop();
						}
					} else {
						if (token.content[token.content.length - 1].content === '/>') ; else {
							// Opening tag
							openedTags.push({
								tagName: stringifyToken(token.content[0].content[1]),
								openedBraces: 0,
							});
						}
					}
				} else if (openedTags.length > 0 && token.type === 'punctuation' && token.content === '{') {
					// Here we might have entered a Astro context inside a tag
					openedTags[openedTags.length - 1].openedBraces++;
				} else if (openedTags.length > 0 && openedTags[openedTags.length - 1].openedBraces > 0 && token.type === 'punctuation' && token.content === '}') {
					// Here we might have left a Astro context inside a tag
					openedTags[openedTags.length - 1].openedBraces--;
				} else {
					notTagNorBrace = true;
				}
			}
			if (notTagNorBrace || typeof token === 'string') {
				if (openedTags.length > 0 && openedTags[openedTags.length - 1].openedBraces === 0) {
					// Here we are inside a tag, and not inside a Astro context.
					// That's plain text: drop any tokens matched.
					let plainText = stringifyToken(token);

					// And merge text with adjacent text
					if (i < tokens.length - 1 && (typeof tokens[i + 1] === 'string' || tokens[i + 1].type === 'plain-text')) {
						plainText += stringifyToken(tokens[i + 1]);
						tokens.splice(i + 1, 1);
					}
					if (i > 0 && (typeof tokens[i - 1] === 'string' || tokens[i - 1].type === 'plain-text')) {
						plainText = stringifyToken(tokens[i - 1]) + plainText;
						tokens.splice(i - 1, 1);
						i--;
					}

					tokens[i] = new Prism.Token('plain-text', plainText, null, plainText);
				}
			}

			if (token.content && typeof token.content !== 'string') {
				walkTokens(token.content);
			}
		}
	};

	Prism.hooks.add('after-tokenize', function (env) {
		if (env.language !== 'astro') {
			return;
		}
		walkTokens(env.tokens);
	});
}

var $$module2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  addAstro: addAstro
}, Symbol.toStringTag, { value: 'Module' }));

createMetadata("/node_modules/astro/components/Prism.astro", { modules: [{ module: Prism, specifier: "prismjs", assert: {} }, { module: $$module2, specifier: "@astrojs/prism", assert: {} }, { module: $$module3, specifier: "prismjs/components/index.js", assert: {} }], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
const $$Astro = createAstro("/node_modules/astro/components/Prism.astro", "https://clinth.github.io/ixfx-docs/", "file:///Users/af4766/repos/ixfx-docs/");
const $$Prism = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Prism;
  const { class: className, lang, code } = Astro2.props;
  let classLanguage = `language-${lang}`;
  const languageMap = /* @__PURE__ */ new Map([["ts", "typescript"]]);
  if (lang == null) {
    console.warn("Prism.astro: No language provided.");
  }
  const ensureLoaded = (lang2) => {
    if (lang2 && !Prism__default.languages[lang2]) {
      $$module3__default([lang2]);
    }
  };
  if (languageMap.has(lang)) {
    ensureLoaded(languageMap.get(lang));
  } else if (lang === "astro") {
    ensureLoaded("typescript");
    addAstro(Prism__default);
  } else {
    ensureLoaded("markup-templating");
    ensureLoaded(lang);
  }
  if (lang && !Prism__default.languages[lang]) {
    console.warn(`Unable to load the language: ${lang}`);
  }
  const grammar = Prism__default.languages[lang];
  let html = code;
  if (grammar) {
    html = Prism__default.highlight(code, grammar, lang);
  }
  return render`<pre${addAttribute([className, classLanguage].join(" "), "class")}><code${addAttribute(classLanguage, "class")}>${renderComponent($$result, "Fragment", Fragment, {}, { "default": () => render`${markHTMLString(html)}` })}</code></pre>
`;
});

var $$module1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  Code: $$Code,
  Debug: $$Debug,
  Markdown: $$Markdown,
  Prism: $$Prism
}, Symbol.toStringTag, { value: 'Module' }));

export { $$module1 as $ };
