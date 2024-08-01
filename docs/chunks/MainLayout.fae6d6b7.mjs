import { c as createMetadata, a as createAstro, b as createComponent, r as render, e as addAttribute, d as renderComponent, f as renderSlot } from './index.7bfc2e7e.mjs';
import { useState, useEffect, useRef } from 'preact/hooks';
import { jsxs, jsx, Fragment } from 'preact/jsx-runtime';
import { LitElement, html } from 'lit';

var MainLayout_astro_astro_type_style_index_0_lang = '';

var theme$1 = '';

var code$1 = '';

var index$1 = '';

var theme = ":root {\n\t--font-fallback: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji;\n\t--font-body: system-ui, var(--font-fallback);\n\t--font-mono: 'IBM Plex Mono', Consolas, 'Andale Mono WT', 'Andale Mono', 'Lucida Console', 'Lucida Sans Typewriter', 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono',\n\t\t'Liberation Mono', 'Nimbus Mono L', Monaco, 'Courier New', Courier, monospace;\n\n\t--black: hsl(206, 11%, 12%);\n\t--white: hsl(206, 11%, 82%);\n\n\t--radius: 1em;\n\t--padding: 0.3em;\n\t--padding-text: 0.8em;\n\n\t--theme-hit-color-light: hsl(350, 70%, 83%);\n\t--theme-hit-color: hsl(350, 100%, 83%);\n\n\t--color-base-white: 0, 0%;\n\t--color-base-black: 240, 100%;\n\t--color-base-gray: 215, 14%;\n\t--color-base-blue: 212, 100%;\n\t--color-base-blue-dark: 212, 72%;\n\t--color-base-green: 158, 79%;\n\t--color-base-orange: 22, 100%;\n\t--color-base-purple: 269, 79%;\n\t--color-base-red: 351, 100%;\n\t--color-base-yellow: 41, 100%;\n\n\t--color-gray-5: var(--color-base-gray), 5%;\n\t--color-gray-10: var(--color-base-gray), 10%;\n\t--color-gray-20: var(--color-base-gray), 20%;\n\t--color-gray-30: var(--color-base-gray), 30%;\n\t--color-gray-40: var(--color-base-gray), 40%;\n\t--color-gray-50: var(--color-base-gray), 50%;\n\t--color-gray-60: var(--color-base-gray), 60%;\n\t--color-gray-70: var(--color-base-gray), 70%;\n\t--color-gray-80: var(--color-base-gray), 80%;\n\t--color-gray-90: var(--color-base-gray), 90%;\n\t--color-gray-95: var(--color-base-gray), 95%;\n\n\t--color-blue: var(--color-base-blue), 61%;\n\t--color-blue-dark: var(--color-base-blue-dark), 39%;\n\t--color-green: var(--color-base-green), 42%;\n\t--color-orange: var(--color-base-orange), 50%;\n\t--color-purple: var(--color-base-purple), 54%;\n\t--color-red: var(--color-base-red), 54%;\n\t--color-yellow: var(--color-base-yellow), 59%;\n}\n\ndiv.tip {\n\tborder: 1px solid var(--accent);\n\tbackground-color: var(--bg-contrast);\n\tcolor: var(--fg-contrast);\n\tpadding: var(--padding-text);\n\tborder-radius: 0.3em;\n\tdisplay: inline-block;\n}\n\n:root {\n\tcolor-scheme: light;\n\t--accent: hsl(217, 48%, 55%);\n\t--accent-text: hsl(217, 38%, 45%);\n\t--accent-bold: hsl(217, 38%, 45%);\n\t--divider: hsl(193, 10%, 84%);\n\t--bg: hsl(229, 40%, 97%);\n\t--bg-dim: hsl(194, 16%, 94%);\n\t--fg-dim-slight: hsl(229, 5%, 65%);\n\t--fg: hsl(200, 16%, 42%);\n\t--fg-for-dim-bg: hsl(194, 16%, 60%);\n\t--fg-dim: hsl(200, 16%, 32%);\n\t--fg-bright: hsl(200, 10%, 72%);\n\n\t--bg-contrast: hsl(200, 16%, 92%);\n\t--fg-contrast: hsl(200, 16%, 22%);\n\t--fg-contrast-dim: hsl(200, 16%, 62%);\n\n\t--yellow: hsl(39, 90%, 49%);\n\t--purple: hsl(256, 90%, 65%);\n\t--blue: hsl(217, 38%, 65%);\n\t--green: hsl(85, 40%, 54%);\n\n\t/* --theme-accent: var(--blue);\n\t--theme-text-accent: red; */\n\t/* --theme-accent: hsla(var(--color-blue), 1); */\n\t/* --theme-text-accent: hsla(var(--color-blue), 1); */\n\t--theme-accent-opacity: 0.15;\n\t--theme-divider: hsla(var(--color-gray-95), 1);\n\t--theme-text: hsla(var(--color-gray-10), 1);\n\t--theme-text-light: hsla(var(--color-gray-40), 1);\n\t/* @@@: not used anywhere */\n\t--theme-text-lighter: hsla(var(--color-gray-80), 1);\n\t--theme-bg: hsla(var(--color-base-white), 100%, 1);\n\t--theme-bg-hover: hsla(var(--color-gray-95), 1);\n\t--theme-bg-offset: hsla(var(--color-gray-90), 1);\n\t--theme-bg-accent: hsla(var(--color-blue), var(--theme-accent-opacity));\n\t--theme-code-inline-bg: hsla(var(--color-gray-95), 1);\n\t--theme-code-inline-text: var(--theme-text);\n\t--theme-code-bg: hsla(217, 19%, 27%, 1);\n\t--theme-code-text: hsla(var(--color-gray-95), 1);\n\t--theme-navbar-bg: hsla(var(--color-base-white), 100%, 1);\n\t--theme-navbar-height: 6rem;\n\t--theme-selection-color: hsla(var(--color-blue), 1);\n\t--theme-selection-bg: hsla(var(--color-blue), var(--theme-accent-opacity));\n}\n\nbody {\n\tbackground: var(--bg);\n\tcolor: var(--fg);\n}\n\n:root.theme-dark {\n\tcolor-scheme: dark;\n\t--accent: hsl(217, 48%, 75%);\n\t--accent-text: hsl(217, 78%, 75%);\n\t--accent-bold: hsl(217, 78%, 75%);\n\n\t--divider: hsl(229, 30%, 30%);\n\n\t--bg: hsl(229, 20%, 20%);\n\t--bg-dim: hsl(231, 21%, 9%);\n\n\t--fg-dim-slight: hsl(229, 20%, 45%);\n\n\t--fg: hsl(231, 28%, 73%);\n\t--fg-bright: hsl(231, 28%, 82%);\n\n\t--bg-contrast: hsl(229, 16%, 32%);\n\t--fg-contrast: hsl(229, 16%, 82%);\n\t--fg-contrast-dim: hsl(229, 16%, 62%);\n\n\t--yellow: hsl(39, 100%, 71%);\n\t--purple: hsl(276, 68%, 75%);\n\t--blue: hsl(197, 100%, 77%);\n\t--green: hsl(68, 55%, 60%);\n\n\t--theme-accent-opacity: 0.15;\n\t--theme-accent: hsla(var(--color-blue), 1);\n\t--theme-text-accent: hsla(var(--color-blue), 1);\n\t--theme-divider: hsla(var(--color-gray-10), 1);\n\t--theme-text: hsla(var(--color-gray-90), 1);\n\t--theme-text-light: hsla(var(--color-gray-80), 1);\n\n\t/* @@@: not used anywhere */\n\t--theme-text-lighter: hsla(var(--color-gray-40), 1);\n\t--theme-bg: hsla(215, 28%, 17%, 1);\n\t--theme-bg-hover: hsla(var(--color-gray-40), 1);\n\t--theme-bg-offset: hsla(var(--color-gray-5), 1);\n\t--theme-code-inline-bg: hsla(var(--color-gray-10), 1);\n\t--theme-code-inline-text: hsla(var(--color-base-white), 100%, 1);\n\t--theme-code-bg: hsla(var(--color-gray-5), 1);\n\t--theme-code-text: hsla(var(--color-base-white), 100%, 1);\n\t--theme-navbar-bg: hsla(215, 28%, 17%, 1);\n\t--theme-selection-color: hsla(var(--color-base-white), 100%, 1);\n\t--theme-selection-bg: hsla(var(--color-purple), var(--theme-accent-opacity));\n\n\t/* DocSearch [Algolia] */\n\t--docsearch-modal-background: var(--theme-bg);\n\t--docsearch-searchbox-focus-background: var(--theme-divider);\n\t--docsearch-footer-background: var(--theme-divider);\n\t--docsearch-text-color: var(--theme-text);\n\t--docsearch-hit-background: var(--theme-divider);\n\t--docsearch-hit-shadow: none;\n\t--docsearch-hit-color: var(--theme-text);\n\t--docsearch-footer-shadow: inset 0 2px 10px #000;\n\t--docsearch-modal-shadow: inset 0 0 8px #000;\n}\n\n::selection {\n\tcolor: var(--theme-selection-color);\n\tbackground-color: var(--theme-selection-bg);\n}";

var $$module1$4 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	'default': theme
}, Symbol.toStringTag, { value: 'Module' }));

var code = ".language-css > code,\n.language-sass > code,\n.language-scss > code {\n\tcolor: #fd9170;\n}\n\n[class*='language-'] .namespace {\n\topacity: 0.7;\n}\n\n.token.plain-text,\n[class*='language-bash'] span.token,\n[class*='language-shell'] span.token {\n\tcolor: hsla(var(--color-gray-90), 1);\n}\n\n[class*='language-bash'] span.token,\n[class*='language-shell'] span.token {\n\tfont-style: bold;\n}\n\n.token.prolog,\n.token.comment,\n[class*='language-bash'] span.token.comment,\n[class*='language-shell'] span.token.comment {\n\tcolor: hsla(var(--color-gray-70), 1);\n}\n\n.token.selector,\n.token.tag,\n.token.unit,\n.token.url,\n.token.variable,\n.token.entity,\n.token.deleted {\n\tcolor: #fa5e5b;\n}\n\n.token.boolean,\n.token.constant,\n.token.doctype,\n.token.number,\n.token.regex,\n.token.builtin,\n.token.class,\n.token.hexcode,\n.token.class-name,\n.token.attr-name {\n\tcolor: hsla(var(--color-yellow), 1);\n}\n\n.token.atrule,\n.token.attribute,\n.token.attr-value .token.punctuation,\n.token.attr-value,\n.token.pseudo-class,\n.token.pseudo-element,\n.token.string {\n\tcolor: hsla(var(--color-green), 1);\n}\n\n.token.symbol,\n.token.function,\n.token.id,\n.token.important {\n\tcolor: hsla(var(--color-blue), 1);\n}\n\n.token.important,\n.token.id {\n\tfont-weight: bold;\n}\n\n.token.cdata,\n.token.char,\n.token.property {\n\tcolor: #23b1af;\n}\n\n.token.inserted {\n\tcolor: hsla(var(--color-green), 1);\n}\n\n.token.keyword {\n\tcolor: #ff657c;\n\tfont-style: italic;\n}\n\n.token.operator {\n\tcolor: hsla(var(--color-gray-70), 1);\n}\n\n.token.attr-value .token.attr-equals,\n.token.punctuation {\n\tcolor: hsla(var(--color-gray-80), 1);\n}\n";

var $$module2$3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	'default': code
}, Symbol.toStringTag, { value: 'Module' }));

var index = "* {\n\tbox-sizing: border-box;\n\tmargin: 0;\n}\n\n/* Global focus outline reset */\n*:focus:not(:focus-visible) {\n\toutline: none;\n}\n\n:root {\n\t--user-font-scale: 1rem - 16px;\n\t--max-width: calc(100% - 1rem);\n}\n\n@media (min-width: 50em) {\n\t:root {\n\t\t--max-width: 66em;\n\t\t/* 46em*/\n\t}\n}\n\nbody {\n\tdisplay: flex;\n\tflex-direction: column;\n\tmin-height: 100vh;\n\tfont-family: var(--font-body);\n\tfont-size: 1rem;\n\tfont-size: clamp(0.9rem, 0.75rem + 0.375vw + var(--user-font-scale), 1rem);\n\tline-height: 1.5;\n\tmax-width: 100vw;\n}\n\nnav ul {\n\tlist-style: none;\n\tpadding: 0;\n}\n\nul.list {\n\tlist-style: none;\n\tpadding: 0;\n\tdisplay: inline;\n}\n\nul.list li {\n\tdisplay: inline;\n}\n\nul.list li::after {\n\tcontent: \", \";\n}\n\nul.list li:last-child::after {\n\tcontent: \"\";\n}\n\n.content>section>*+* {\n\tmargin-top: 1.25rem;\n}\n\n.content>section> :first-child {\n\tmargin-top: 0;\n}\n\n/* Typography */\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n\tmargin-bottom: 1rem;\n\tfont-weight: bold;\n\tline-height: 1;\n\tcolor: var(--yellow);\n}\n\nh1,\nh2 {\n\tmax-width: 40ch;\n}\n\n:is(h2, h3):not(:first-child) {\n\tmargin-top: 3rem;\n}\n\n:is(h4, h5, h6):not(:first-child) {\n\tmargin-top: 2rem;\n}\n\nh1 {\n\tfont-size: 3.25rem;\n\tfont-weight: 800;\n\n}\n\nh2 {\n\tfont-size: 2.5rem;\n}\n\nh3 {\n\tfont-size: 1.75rem;\n}\n\nh4 {\n\tfont-size: 1.3rem;\n}\n\nh5 {\n\tfont-size: 1rem;\n}\n\np {\n\tline-height: 1.65em;\n}\n\n.content ul {\n\tline-height: 1.1em;\n}\n\n\n\n/* \np,\n.content ul {\n\tcolor: var(--theme-text-light);\n} */\n\nsmall,\n.text_small {\n\tfont-size: 0.833rem;\n}\n\na {\n\tcolor: var(--accent-text);\n\tfont-weight: 400;\n\ttext-underline-offset: 0.08em;\n\talign-items: center;\n\tgap: 0.5rem;\n}\n\narticle>section :is(ul, ol)>*+* {\n\tmargin-top: 0.75rem;\n}\n\narticle>section nav :is(ul, ol)>*+* {\n\tmargin-top: inherit;\n}\n\narticle>section li> :is(p, pre, blockquote):not(:first-child) {\n\tmargin-top: 1rem;\n}\n\narticle>section :is(ul, ol) {\n\tpadding-left: 1em;\n}\n\narticle>section nav :is(ul, ol) {\n\tpadding-left: inherit;\n}\n\narticle>section nav {\n\tmargin-top: 1rem;\n\tmargin-bottom: 2rem;\n}\n\narticle>section ::marker {\n\tfont-weight: bold;\n\tcolor: var(--theme-text-light);\n}\n\narticle>section iframe {\n\twidth: 100%;\n\theight: auto;\n\taspect-ratio: 16 / 9;\n}\n\na>code:not([class*='language']) {\n\tposition: relative;\n\tcolor: var(--theme-text-accent);\n\tbackground: transparent;\n\ttext-underline-offset: var(--padding-block);\n}\n\na>code:not([class*='language'])::before {\n\tcontent: '';\n\tposition: absolute;\n\ttop: 0;\n\tright: 0;\n\tbottom: 0;\n\tleft: 0;\n\tdisplay: block;\n\tbackground: var(--theme-accent);\n\topacity: var(--theme-accent-opacity);\n\tborder-radius: var(--border-radius);\n}\n\na:hover,\na:focus {\n\ttext-decoration: underline;\n}\n\na:focus {\n\toutline: 2px solid currentColor;\n\toutline-offset: 0.25em;\n}\n\nstrong {\n\tfont-weight: 600;\n\tcolor: inherit;\n}\n\n/* Supporting Content */\ncode {\n\tfont-family: var(--font-mono);\n\tfont-size: 0.85em;\n}\n\ncode:not([class*='language']) {\n\t--border-radius: 3px;\n\t--padding-block: 0.2rem;\n\t--padding-inline: 0.4rem;\n\tcolor: var(--theme-code-inline-text);\n\tbackground-color: var(--theme-code-inline-bg);\n\tpadding: var(--padding-block) var(--padding-inline);\n\tmargin: calc(var(--padding-block) * -1) -0.125em;\n\tborder-radius: var(--border-radius);\n\tbox-shadow: 0 2px 1px 0 rgba(0, 0, 0, 0.08);\n\tword-break: break-word;\n}\n\npre>code:not([class*='language']) {\n\tbackground-color: transparent;\n\tpadding: 0;\n\tmargin: 0;\n\tborder-radius: 0;\n\tcolor: inherit;\n}\n\npre>code {\n\tfont-size: 1em;\n}\n\ntable,\npre {\n\tposition: relative;\n\t--padding-block: 1rem;\n\t--padding-inline: 2rem;\n\tpadding: var(--padding-block) var(--padding-inline);\n\tpadding-right: calc(var(--padding-inline) * 2);\n\tmargin-left: calc(var(--padding-inline) * -1);\n\tmargin-right: calc(var(--padding-inline) * -1);\n\tfont-family: var(--font-mono);\n\n\tline-height: 1.5;\n\tfont-size: 0.85em;\n\toverflow-y: hidden;\n\toverflow-x: auto;\n}\n\ntable {\n\twidth: 100%;\n\tpadding: var(--padding-block) 0;\n\tmargin: 0;\n\tborder-collapse: collapse;\n}\n\n/* Zebra striping */\ntr:nth-of-type(odd) {\n\tbackground: var(--theme-bg-hover);\n}\n\nth {\n\tbackground: var(--color-black);\n\tcolor: var(--theme-color);\n\tfont-weight: bold;\n}\n\ntd,\nth {\n\tpadding: 6px;\n\ttext-align: left;\n}\n\npre {\n\tbackground-color: var(--theme-code-bg);\n\tcolor: var(--theme-code-text);\n\tborder: 1px pink;\n}\n\n.editable {\n\tborder: 1px solid var(--fg-dim);\n\tbackground-color: var(--bg-dim);\n\tcolor: var(--fg);\n\tpadding: 1em;\n\tmargin: 0;\n}\n\ninput[type=\"text\"] {\n\tborder-radius: 8px;\n\tpadding: 1em;\n\tborder: 1px solid var(--fg-dim);\n}\n\ninput,\nselect {\n\tbackground-color: var(--bg-dim);\n\tpadding: var(--padding);\n}\n\nblockquote code:not([class*='language']) {\n\tbackground-color: var(--theme-bg);\n}\n\n@media (min-width: 37.75em) {\n\tpre {\n\t\t--padding-inline: 1.25rem;\n\t\tborder-radius: 8px;\n\t\tmargin-left: 0;\n\t\tmargin-right: 0;\n\t}\n}\n\nblockquote {\n\tmargin: 2rem 0;\n\tpadding: 1.25em 1.5rem;\n\tborder-left: 3px solid var(--theme-text-light);\n\tbackground-color: var(--theme-bg-offset);\n\tborder-radius: 0 0.25rem 0.25rem 0;\n\tline-height: 1.7;\n}\n\nimg {\n\tmax-width: 100%;\n}\n\n.flex {\n\tdisplay: flex;\n\talign-items: center;\n}\n\n.wrappedBoxContainer {\n\tdisplay: flex;\n\tgap: 1.5em;\n\tflex-wrap: wrap;\n}\n\n.wrappedBoxContainer>div {\n\tmax-width: 20em;\n}\n\n.wrappedBoxContainer.mini h1 {\n\tfont-size: 1.3em;\n\ttext-transform: uppercase;\n\tmargin: 0;\n\tmargin-bottom: -0.4em;\n\tcolor: unset;\n}\n\n.wrappedBoxContainer.mini h2 {\n\tfont-size: 1.7em;\n\tfont-weight: 200;\n\tmargin: 0;\n\tcolor: unset;\n\tmargin-top: 0.5em;\n\tmargin-bottom: 0.2em;\n}\n\n\nxbutton {\n\tdisplay: flex;\n\talign-items: center;\n\tjustify-items: center;\n\tgap: 0.25em;\n\tpadding: 0.5em 1em;\n\tborder: 0;\n\tbackground: var(--theme-bg);\n\tdisplay: flex;\n}\n\nbutton,\n.toolbar .radios label {\n\tborder: 0;\n\tpadding: 0.5em 1em;\n\tfont-size: 1rem;\n\talign-items: center;\n\tgap: 0.25em;\n\tmargin-top: 0.3em;\n\tmargin-bottom: 0.3em;\n\tborder-radius: 99em;\n\tcolor: var(--fg-contrast-dim);\n\tbackground-color: var(--bg-contrast);\n\ttransition: color 0.3s ease-out;\n}\n\nbutton:hover {\n\tcolor: var(--fg-contrast);\n\tcursor: pointer;\n\ttransition: color 0.3s ease-in;\n}\n\nbutton[disabled],\nbutton[disabled]:hover {\n\topacity: 0.6;\n\tbackground-color: var(--theme-code-inline-bg);\n\tcursor: default;\n}\n\nh2.heading {\n\tfont-size: 1rem;\n\tfont-weight: 700;\n\tpadding: 0.1rem 1rem;\n\ttext-transform: uppercase;\n\tmargin-bottom: 0.5rem;\n}\n\n.header-link {\n\tfont-size: 1rem;\n\tpadding: 0.1rem 0 0.1rem 1rem;\n\tborder-left: 4px solid var(--theme-divider);\n}\n\n.header-link:hover,\n.header-link:focus {\n\tborder-left-color: var(--accent);\n\tcolor: var(--accent);\n}\n\n.header-link:focus-within {\n\tcolor: var(--theme-text-light);\n\tborder-left-color: hsla(var(--color-gray-40), 1);\n}\n\n.header-link svg {\n\topacity: 0.6;\n}\n\n.header-link:hover svg {\n\topacity: 0.8;\n}\n\n.header-link a {\n\tdisplay: inline-flex;\n\tgap: 0.5em;\n\twidth: 100%;\n\tpadding: 0.15em 0 0.15em 0;\n}\n\n.header-link.depth-3 {\n\tpadding-left: 2rem;\n}\n\n.header-link.depth-4 {\n\tpadding-left: 3rem;\n}\n\n.header-link a {\n\tfont: inherit;\n\tcolor: inherit;\n\ttext-decoration: none;\n}\n\n/* Screenreader Only Text */\n.sr-only {\n\tposition: absolute;\n\twidth: 1px;\n\theight: 1px;\n\tpadding: 0;\n\tmargin: -1px;\n\toverflow: hidden;\n\tclip: rect(0, 0, 0, 0);\n\twhite-space: nowrap;\n\tborder-width: 0;\n}\n\n.focus\\:not-sr-only:focus,\n.focus\\:not-sr-only:focus-visible {\n\tposition: static;\n\twidth: auto;\n\theight: auto;\n\tpadding: 0;\n\tmargin: 0;\n\toverflow: visible;\n\tclip: auto;\n\twhite-space: normal;\n}\n\n:target {\n\tscroll-margin: calc(var(--theme-sidebar-offset, 5rem) + 2rem) 0 2rem;\n}\n\n\n.sxs {\n\tdisplay: flex;\n}\n\n\n.sxs>div {\n\tmin-height: 300px;\n\tflex-grow: 1;\n}\n\n.sxs>section>section {\n\tpadding: var(--padding-text);\n\tdisplay: flex;\n\tflex-direction: column;\n}\n\n.stackVertical {\n\tdisplay: flex;\n\tflex-direction: column;\n}\n\n.stackVertical>div {\n\tflex-grow: 1\n}\n\n/* .dataLog {\n\toverflow-y: scroll;\n} */\n\n.toolbar {\n\tdisplay: flex;\n\tmargin: 0.5em;\n\tflex-wrap: wrap;\n}\n\n.toolbar.centered {\n\tjustify-content: center;\n}\n\n.toolbar.right {\n\tjustify-content: right;\n}\n\n.toolbar>* {\n\tmargin-left: var(--padding);\n\tmargin-right: var(--padding);\n}\n\nsection.dividerRight {\n\tborder-right: 0.2rem solid var(--bg-dim);\n}\n\nsection.dividerTop {\n\tborder-top: 0.2rem solid var(--bg-dim);\n}\n\nhr {\n\tborder: 0;\n\tborder-top: 0.2rem solid var(--bg-dim);\n}\n\n.radios input[type=\"radio\"] {\n\topacity: 0;\n\tposition: fixed;\n\twidth: 0;\n}\n\n.radios label {\n\tdisplay: inline-block;\n\topacity: 0.5;\n\tfont-size: 80% !important;\n\ttransition: all 0.3s ease-in;\n}\n\n.radios label:hover {\n\topacity: 0.8;\n\ttransition: opacity 0.3s ease-in;\n}\n\n.radios input[type=\"radio\"]:checked+label {\n\tbackground-color: var(--bg-contrast);\n\tfont-size: 100%;\n\topacity: 1;\n\ttransition: all 0.3s ease-in;\n}\n\n.radios input[type=\"radio\"]:focus+label {\n\tborder: 1px solid var(--fg);\n}";

var $$module3$2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	'default': index
}, Symbol.toStringTag, { value: 'Module' }));

var __freeze$1 = Object.freeze;
var __defProp$1 = Object.defineProperty;
var __template$1 = (cooked, raw) => __freeze$1(__defProp$1(cooked, "raw", { value: __freeze$1(raw || cooked.slice()) }));
var _a$1;
const $$metadata$9 = createMetadata("/src/components/HeadCommon.astro", { modules: [{ module: $$module1$4, specifier: "../styles/theme.css", assert: {} }, { module: $$module2$3, specifier: "../styles/code.css", assert: {} }, { module: $$module3$2, specifier: "../styles/index.css", assert: {} }], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
const $$Astro$9 = createAstro("/src/components/HeadCommon.astro", "https://clinth.github.io/ixfx-docs/", "file:///Users/af4766/repos/ixfx-docs/");
const $$HeadCommon = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$9, $$props, $$slots);
  Astro2.self = $$HeadCommon;
  return render(_a$1 || (_a$1 = __template$1([`<!-- Global Metadata --><meta charset="utf-8">
<meta name="viewport" content="width=device-width">

<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="alternate icon" type="image/x-icon" href="/favicon.ico">

<link rel="sitemap" href="/sitemap.xml">

<!-- Preload Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital@0;1&display=swap" rel="stylesheet">

<!-- Scrollable a11y code helper -->
<script type="module" src="/make-scrollable-code-focusable.js"><\/script>

<!-- This is intentionally inlined to avoid FOUC -->
<script>
	const root = document.documentElement;
	const theme = localStorage.getItem('theme');
	if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
		root.classList.add('theme-dark');
	} else {
		root.classList.remove('theme-dark');
	}
<\/script>
`])));
});

var $$module1$3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	$$metadata: $$metadata$9,
	'default': $$HeadCommon
}, Symbol.toStringTag, { value: 'Module' }));

const SITE = {
  title: `ixfx docs`,
  description: `ixfx documentation`,
  defaultLanguage: `en_US`
};
const OPEN_GRAPH = {
  image: {
    src: `https://github.com/clinth/ixfx/blob/main/assets/social/banner.jpg?raw=true`,
    alt: `ixfx`
  }
};
const SIDEBAR = [
  { text: ``, header: true },
  { text: `Getting Started`, header: true },
  { text: `Introduction`, link: `./` },
  { text: `Importing`, link: `./importing/` },
  { text: `Flow and Logic`, header: true },
  { text: `State machine`, link: `flow/stateMachine/` },
  { text: `State machine driver`, link: `flow/stateMachineDriver/` },
  { text: `Loops and intervals`, link: `flow/loops/` },
  { text: `Delay`, link: `flow/delay/` },
  { text: `Retrying`, link: `flow/retrying/` },
  { text: `Flow`, link: `flow/flow/` },
  { text: `Monitoring`, link: `flow/monitoring/` },
  { text: `Tasks`, link: `flow/tasks/` },
  { text: `Modulation`, header: true },
  { text: `Easing`, link: `modulation/easing/` },
  { text: `Envelope`, link: `modulation/envelope/` },
  { text: `Forces`, link: `modulation/forces/` },
  { text: `Jitter`, link: `modulation/jitter/` },
  { text: `Interpolate`, link: `modulation/interpolate/` },
  { text: `Oscillator`, link: `modulation/oscillator/` },
  { text: `Spring`, link: `modulation/spring/` },
  { text: `Generation`, header: true },
  { text: `Random`, link: `gen/random/` },
  { text: `Generators`, link: `gen/generator/` },
  { text: `Data`, header: true },
  { text: `Clean up`, link: `data/cleanup/` },
  { text: `Normalising`, link: `data/normalising/` },
  { text: `Arrays`, link: `data/arrays/` },
  { text: `Collections`, link: `data/collections/` },
  { text: `Averaging`, link: `data/averaging/` },
  { text: `Frequency`, link: `data/frequency/` },
  { text: `Trackers`, link: `data/trackers/` },
  { text: `Pool`, link: `data/pool/` },
  { text: `Types`, header: true },
  { text: `Geometry`, link: `types/geometry/` },
  { text: `Colour`, link: `types/colour/` },
  { text: `IO`, header: true },
  { text: `Espruino`, link: `io/espruino/` }
];

var $$module7 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	SITE: SITE,
	OPEN_GRAPH: OPEN_GRAPH,
	SIDEBAR: SIDEBAR
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$8 = createMetadata("/src/components/HeadSEO.astro", { modules: [{ module: $$module7, specifier: "../config.ts", assert: {} }], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
const $$Astro$8 = createAstro("/src/components/HeadSEO.astro", "https://clinth.github.io/ixfx-docs/", "file:///Users/af4766/repos/ixfx-docs/");
const $$HeadSEO = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$HeadSEO;
  const { content = {}, canonicalURL } = Astro2.props;
  const formattedContentTitle = content.title ? `${content.title} - ${SITE.title}` : SITE.title;
  const imageSrc = content?.image?.src ?? OPEN_GRAPH.image.src;
  const canonicalImageSrc = new URL(imageSrc, Astro2.site);
  const imageAlt = content?.image?.alt ?? OPEN_GRAPH.image.alt;
  return render`<!-- Page Metadata --><link rel="canonical"${addAttribute(canonicalURL, "href")}>

<!-- OpenGraph Tags -->
<meta property="og:title"${addAttribute(formattedContentTitle, "content")}>
<meta property="og:type" content="article">
<meta property="og:url"${addAttribute(canonicalURL, "content")}>
<meta property="og:locale"${addAttribute(content.ogLocale ?? SITE.defaultLanguage, "content")}>
<meta property="og:image"${addAttribute(canonicalImageSrc, "content")}>
<meta property="og:image:alt"${addAttribute(imageAlt, "content")}>
<meta name="description" property="og:description"${addAttribute(content.description ? content.description : SITE.description, "content")}>
<meta property="og:site_name"${addAttribute(SITE.title, "content")}>

<!-- Twitter Tags -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site"${addAttribute(OPEN_GRAPH.twitter, "content")}>
<meta name="twitter:title"${addAttribute(formattedContentTitle, "content")}>
<meta name="twitter:description"${addAttribute(content.description ? content.description : SITE.description, "content")}>
<meta name="twitter:image"${addAttribute(canonicalImageSrc, "content")}>
<meta name="twitter:image:alt"${addAttribute(imageAlt, "content")}>

<!--
  TODO: Add json+ld data, maybe https://schema.org/APIReference makes sense?
  Docs: https://developers.google.com/search/docs/advanced/structured-data/intro-structured-data
  https://www.npmjs.com/package/schema-dts seems like a great resource for implementing this.
  Even better, there's a React component that integrates with \`schema-dts\`: https://github.com/google/react-schemaorg
-->
`;
});

var $$module2$2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	$$metadata: $$metadata$8,
	'default': $$HeadSEO
}, Symbol.toStringTag, { value: 'Module' }));

var Header_astro_astro_type_style_index_0_lang = '';

var SkipToContent_astro_astro_type_style_index_0_lang = '';

const $$metadata$7 = createMetadata("/src/components/Header/SkipToContent.astro", { modules: [], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
const $$Astro$7 = createAstro("/src/components/Header/SkipToContent.astro", "https://clinth.github.io/ixfx-docs/", "file:///Users/af4766/repos/ixfx-docs/");
const $$SkipToContent = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$SkipToContent;
  const STYLES = [];
  for (const STYLE of STYLES)
    $$result.styles.add(STYLE);
  return render`<a href="#article" class="sr-only skiplink astro-RC6GWYXJ"><span class="astro-RC6GWYXJ">Skip to Content</span></a>


`;
});

var $$module3$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	$$metadata: $$metadata$7,
	'default': $$SkipToContent
}, Symbol.toStringTag, { value: 'Module' }));

const MenuToggle = () => {
  const [sidebarShown, setSidebarShown] = useState(false);
  useEffect(() => {
    const body = document.getElementsByTagName(`body`)[0];
    if (sidebarShown) {
      body.classList.add(`mobile-sidebar-toggle`);
    } else {
      body.classList.remove(`mobile-sidebar-toggle`);
    }
  }, [sidebarShown]);
  return jsxs("button", {
    type: "button",
    "aria-pressed": sidebarShown ? `true` : `false`,
    id: "menu-toggle",
    onClick: () => setSidebarShown(!sidebarShown),
    children: [jsx("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      width: "1em",
      height: "1em",
      fill: "none",
      viewBox: "0 0 24 24",
      stroke: "currentColor",
      children: jsx("path", {
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        "stroke-width": "2",
        d: "M4 6h16M4 12h16M4 18h16"
      })
    }), jsx("span", {
      className: "sr-only",
      children: "Toggle sidebar"
    })]
  });
};

var $$module4$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	'default': MenuToggle
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$6 = createMetadata("/src/components/Header/AstroLogo.astro", { modules: [], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
const $$Astro$6 = createAstro("/src/components/Header/AstroLogo.astro", "https://clinth.github.io/ixfx-docs/", "file:///Users/af4766/repos/ixfx-docs/");
const $$AstroLogo = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$AstroLogo;
  const { size } = Astro2.props;
  return render`<svg class="logo"${addAttribute(size, "width")}${addAttribute(size, "height")} viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
	<style>
		#flame {
			fill: var(--theme-text-accent);
		}
		#a {
			fill: var(--theme-text-accent);
		}
	</style>
	<title>Logo</title>
	<path id="a" fill-rule="evenodd" clip-rule="evenodd" d="M163.008 18.929c1.944 2.413 2.935 5.67 4.917 12.181l43.309 142.27a180.277 180.277 0 00-51.778-17.53l-28.198-95.29a3.67 3.67 0 00-7.042.01l-27.857 95.232a180.225 180.225 0 00-52.01 17.557l43.52-142.281c1.99-6.502 2.983-9.752 4.927-12.16a15.999 15.999 0 016.484-4.798c2.872-1.154 6.271-1.154 13.07-1.154h31.085c6.807 0 10.211 0 13.086 1.157a16.004 16.004 0 016.487 4.806z"></path>
	<path id="flame" fill-rule="evenodd" clip-rule="evenodd" d="M168.19 180.151c-7.139 6.105-21.39 10.268-37.804 10.268-20.147 0-37.033-6.272-41.513-14.707-1.602 4.835-1.961 10.367-1.961 13.902 0 0-1.056 17.355 11.015 29.426 0-6.268 5.081-11.349 11.349-11.349 10.743 0 10.731 9.373 10.721 16.977v.679c0 11.542 7.054 21.436 17.086 25.606a23.27 23.27 0 01-2.339-10.2c0-11.008 6.463-15.107 13.974-19.87 5.976-3.79 12.616-8.001 17.192-16.449a31.024 31.024 0 003.743-14.82c0-3.299-.513-6.479-1.463-9.463z"></path>
</svg>
`;
});

var $$module2$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	$$metadata: $$metadata$6,
	'default': $$AstroLogo
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$5 = createMetadata("/src/components/Header/Header.astro", { modules: [{ module: $$module7, specifier: "../../config.ts", assert: {} }, { module: $$module2$1, specifier: "./AstroLogo.astro", assert: {} }, { module: $$module3$1, specifier: "./SkipToContent.astro", assert: {} }, { module: $$module4$1, specifier: "./SidebarToggle.tsx", assert: {} }], hydratedComponents: [MenuToggle], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set(["idle"]), hoisted: [] });
const $$Astro$5 = createAstro("/src/components/Header/Header.astro", "https://clinth.github.io/ixfx-docs/", "file:///Users/af4766/repos/ixfx-docs/");
const $$Header = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$Header;
  Astro2.props;
  const STYLES = [];
  for (const STYLE of STYLES)
    $$result.styles.add(STYLE);
  return render`<header class="astro-MOSAUK67">
	${renderComponent($$result, "SkipToContent", $$SkipToContent, { "class": "astro-MOSAUK67" })}
	<nav class="nav-wrapper astro-MOSAUK67" title="Top Navigation">
		<div class="menu-toggle astro-MOSAUK67">
			${renderComponent($$result, "SidebarToggle", MenuToggle, { "client:idle": true, "client:component-hydration": "idle", "client:component-path": $$metadata$5.getPath(MenuToggle), "client:component-export": $$metadata$5.getExport(MenuToggle), "class": "astro-MOSAUK67" })}
		</div>
		<div class="logo flex astro-MOSAUK67">
			<!-- <AstroLogo size={40} /> -->
			<a href="/ixfx-docs/" class="astro-MOSAUK67">
				<h1 class="astro-MOSAUK67">ixfx docs</h1>
			</a>
		</div>
		<div style="flex-grow: 1;" class="astro-MOSAUK67"></div>
		<!-- {KNOWN_LANGUAGE_CODES.length > 1 && <LanguageSelect lang={lang} client:idle />} -->
		<!-- {CONFIG.ALGOLIA && (
			<div class="search-item">
				<Search client:idle />
			</div>
		)} -->
	</nav>
</header>


`;
});

var $$module3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	$$metadata: $$metadata$5,
	'default': $$Header
}, Symbol.toStringTag, { value: 'Module' }));

var PageContent_astro_astro_type_style_index_0_lang = '';

var MoreMenu_astro_astro_type_style_index_0_lang = '';

class ThemeToggleButton extends LitElement {
  render() {
    return html`<p>Hi</p>`;
  }
}
customElements.define(`theme-toggle-button`, ThemeToggleButton);

var $$module1$2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	ThemeToggleButton: ThemeToggleButton
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$4 = createMetadata("/src/components/RightSidebar/MoreMenu.astro", { modules: [{ module: $$module1$2, specifier: "./ThemeToggleButton.ts", assert: {} }, { module: $$module7, specifier: "../../config", assert: {} }], hydratedComponents: [ThemeToggleButton], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set(["visible"]), hoisted: [] });
const $$Astro$4 = createAstro("/src/components/RightSidebar/MoreMenu.astro", "https://clinth.github.io/ixfx-docs/", "file:///Users/af4766/repos/ixfx-docs/");
const $$MoreMenu = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$MoreMenu;
  Astro2.props;
  const showMoreSection = false;
  const STYLES = [];
  for (const STYLE of STYLES)
    $$result.styles.add(STYLE);
  return render`${showMoreSection }
<ul class="astro-WWU4QDO5">
</ul>
<div style="margin: 2rem 0; text-align: center;" class="astro-WWU4QDO5">
	${renderComponent($$result, "ThemeToggleButton", ThemeToggleButton, { "client:visible": true, "client:component-hydration": "visible", "client:component-path": $$metadata$4.getPath(ThemeToggleButton), "client:component-export": $$metadata$4.getExport(ThemeToggleButton), "class": "astro-WWU4QDO5" })}
</div>


`;
});

var $$module2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	$$metadata: $$metadata$4,
	'default': $$MoreMenu
}, Symbol.toStringTag, { value: 'Module' }));

const TableOfContents = ({
  headers = []
}) => {
  const itemOffsets = useRef([]);
  const [activeId, setActiveId] = useState(void 0);
  useEffect(() => {
    const getItemOffsets = () => {
      const titles = document.querySelectorAll("article :is(h1, h2, h3, h4)");
      itemOffsets.current = Array.from(titles).map((title) => ({
        id: title.id,
        topOffset: title.getBoundingClientRect().top + window.scrollY
      }));
    };
    getItemOffsets();
    window.addEventListener("resize", getItemOffsets);
    return () => {
      window.removeEventListener("resize", getItemOffsets);
    };
  }, []);
  return jsxs(Fragment, {
    children: [jsx("h2", {
      class: "heading",
      children: "On this page"
    }), jsxs("ul", {
      children: [jsx("li", {
        class: `header-link depth-2 ${activeId === "overview" ? "active" : ""}`.trim(),
        children: jsx("a", {
          href: "#overview",
          children: "Overview"
        })
      }), headers.filter(({
        depth
      }) => depth > 1 && depth < 4).map((header) => jsx("li", {
        class: `header-link depth-${header.depth} ${activeId === header.slug ? "active" : ""}`.trim(),
        children: jsx("a", {
          href: `#${header.slug}`,
          children: header.text
        })
      }))]
    })]
  });
};

var $$module1$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	'default': TableOfContents
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$3 = createMetadata("/src/components/PageContent/PageContent.astro", { modules: [{ module: $$module2, specifier: "../RightSidebar/MoreMenu.astro", assert: {} }, { module: $$module1$1, specifier: "../RightSidebar/TableOfContents.tsx", assert: {} }], hydratedComponents: [TableOfContents], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set(["media"]), hoisted: [] });
const $$Astro$3 = createAstro("/src/components/PageContent/PageContent.astro", "https://clinth.github.io/ixfx-docs/", "file:///Users/af4766/repos/ixfx-docs/");
const $$PageContent = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$PageContent;
  const { content, githubEditUrl } = Astro2.props;
  const title = content.title;
  const headers = content?.astro?.headers;
  const STYLES = [];
  for (const STYLE of STYLES)
    $$result.styles.add(STYLE);
  return render`<article id="article" class="content astro-AMOJLK4X">
	<section class="main-section astro-AMOJLK4X">
		<h1 class="content-title astro-AMOJLK4X" id="overview">${title}</h1>
		${headers && render`<nav class="block sm:hidden astro-AMOJLK4X">
				${renderComponent($$result, "TableOfContents", TableOfContents, { "client:media": "(max-width: 50em)", "headers": headers, "client:component-hydration": "media", "client:component-path": $$metadata$3.getPath(TableOfContents), "client:component-export": $$metadata$3.getExport(TableOfContents), "class": "astro-AMOJLK4X" })}
			</nav>`}
		${renderSlot($$result, $$slots["default"])}
	</section>
	<nav class="block sm:hidden astro-AMOJLK4X">
		${renderComponent($$result, "MoreMenu", $$MoreMenu, { "editHref": githubEditUrl, "class": "astro-AMOJLK4X" })}
	</nav>
</article>


`;
});

var $$module4 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	$$metadata: $$metadata$3,
	'default': $$PageContent
}, Symbol.toStringTag, { value: 'Module' }));

var LeftSidebar_astro_astro_type_style_index_0_lang = '';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$metadata$2 = createMetadata("/src/components/LeftSidebar/LeftSidebar.astro", { modules: [{ module: $$module7, specifier: "../../config.ts", assert: {} }], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
const $$Astro$2 = createAstro("/src/components/LeftSidebar/LeftSidebar.astro", "https://clinth.github.io/ixfx-docs/", "file:///Users/af4766/repos/ixfx-docs/");
const $$LeftSidebar = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$LeftSidebar;
  const { currentPage } = Astro2.props;
  const currentPageMatch = currentPage.slice(1);
  const sidebarSections = SIDEBAR.reduce((col, item) => {
    if (item.header) {
      col.push({ ...item, children: [] });
    } else {
      col[col.length - 1].children.push(item);
    }
    return col;
  }, []);
  const STYLES = [];
  for (const STYLE of STYLES)
    $$result.styles.add(STYLE);
  return render(_a || (_a = __template(['<nav aria-labelledby="grid-left" class="astro-TIHETVVV">\n	<ul class="nav-groups astro-TIHETVVV">\n		', `
	</ul>
</nav>

<script>
	window.addEventListener('DOMContentLoaded', (event) => {
		var target = document.querySelector('[aria-current="page"]');
		if (target && target.offsetTop > window.innerHeight - 100) {
			document.querySelector('.nav-groups').scrollTop = target.offsetTop;
		}
	});
<\/script>


`])), sidebarSections.map((section) => render`<li class="astro-TIHETVVV">
				<div class="nav-group astro-TIHETVVV">
					<h2 class="nav-group-title astro-TIHETVVV">${section.text}</h2>
					<ul class="astro-TIHETVVV">
						${section.children.map((child) => render`<li class="nav-link astro-TIHETVVV">
								<a${addAttribute(`${Astro2.site.pathname}${child.link}`, "href")}${addAttribute(`${currentPageMatch === child.link ? "page" : "false"}`, "aria-current")} class="astro-TIHETVVV">
									${child.text}
								</a>
							</li>`)}
					</ul>
				</div>
			</li>`));
});

var $$module5 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	$$metadata: $$metadata$2,
	'default': $$LeftSidebar
}, Symbol.toStringTag, { value: 'Module' }));

var RightSidebar_astro_astro_type_style_index_0_lang = '';

const $$metadata$1 = createMetadata("/src/components/RightSidebar/RightSidebar.astro", { modules: [{ module: $$module1$1, specifier: "./TableOfContents.tsx", assert: {} }, { module: $$module2, specifier: "./MoreMenu.astro", assert: {} }], hydratedComponents: [TableOfContents], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set(["media"]), hoisted: [] });
const $$Astro$1 = createAstro("/src/components/RightSidebar/RightSidebar.astro", "https://clinth.github.io/ixfx-docs/", "file:///Users/af4766/repos/ixfx-docs/");
const $$RightSidebar = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$RightSidebar;
  const { content, githubEditUrl } = Astro2.props;
  const headers = content.astro.headers;
  const STYLES = [];
  for (const STYLE of STYLES)
    $$result.styles.add(STYLE);
  return render`<nav class="sidebar-nav astro-XPZS3NBI" aria-labelledby="grid-right">
	<div class="sidebar-nav-inner astro-XPZS3NBI">
		${renderComponent($$result, "TableOfContents", TableOfContents, { "client:media": "(min-width: 50em)", "headers": headers, "client:component-hydration": "media", "client:component-path": $$metadata$1.getPath(TableOfContents), "client:component-export": $$metadata$1.getExport(TableOfContents), "class": "astro-XPZS3NBI" })}
		${renderComponent($$result, "MoreMenu", $$MoreMenu, { "editHref": githubEditUrl, "class": "astro-XPZS3NBI" })}
	</div>
</nav>


`;
});

var $$module6 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	$$metadata: $$metadata$1,
	'default': $$RightSidebar
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata = createMetadata("/src/layouts/MainLayout.astro", { modules: [{ module: $$module1$3, specifier: "../components/HeadCommon.astro", assert: {} }, { module: $$module2$2, specifier: "../components/HeadSEO.astro", assert: {} }, { module: $$module3, specifier: "../components/Header/Header.astro", assert: {} }, { module: $$module4, specifier: "../components/PageContent/PageContent.astro", assert: {} }, { module: $$module5, specifier: "../components/LeftSidebar/LeftSidebar.astro", assert: {} }, { module: $$module6, specifier: "../components/RightSidebar/RightSidebar.astro", assert: {} }, { module: $$module7, specifier: "../config", assert: {} }], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
const $$Astro = createAstro("/src/layouts/MainLayout.astro", "https://clinth.github.io/ixfx-docs/", "file:///Users/af4766/repos/ixfx-docs/");
const $$MainLayout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$MainLayout;
  const { content = {} } = Astro2.props;
  const currentPage = Astro2.request.url.pathname;
  `src/pages${currentPage.replace(/\/$/, "")}.md`;
  const STYLES = [];
  for (const STYLE of STYLES)
    $$result.styles.add(STYLE);
  return render`<html${addAttribute(content.dir ?? "ltr", "dir")}${addAttribute(content.lang ?? "en-us", "lang")} class="initial astro-VOYEGVQR">
	<head>
		${renderComponent($$result, "HeadCommon", $$HeadCommon, { "class": "astro-VOYEGVQR" })}
		${renderComponent($$result, "HeadSEO", $$HeadSEO, { "content": content, "canonicalURL": Astro2.request.canonicalURL, "class": "astro-VOYEGVQR" })}
		<title>${content.title ? `${content.title} - ${SITE.title}` : SITE.title}</title>
		
	<!--astro:head--></head>

	<body>
		${renderComponent($$result, "Header", $$Header, { "currentPage": currentPage, "class": "astro-VOYEGVQR" })}
		<main class="layout astro-VOYEGVQR">
			<aside id="grid-left" class="grid-sidebar astro-VOYEGVQR" title="Site Navigation">
				${renderComponent($$result, "LeftSidebar", $$LeftSidebar, { "currentPage": currentPage, "class": "astro-VOYEGVQR" })}
			</aside>
			<div id="grid-main" class="astro-VOYEGVQR">
				${renderComponent($$result, "PageContent", $$PageContent, { "content": content, "class": "astro-VOYEGVQR" }, { "default": () => render`${renderSlot($$result, $$slots["default"])}` })}
			</div>
			${content.astro && render`<aside id="grid-right" class="grid-sidebar astro-VOYEGVQR" title="Table of Contents">
				${renderComponent($$result, "RightSidebar", $$RightSidebar, { "content": content, "class": "astro-VOYEGVQR" })}
			</aside>`}
		</main>
	</body>
</html>
`;
});

var $$module1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	$$metadata: $$metadata,
	'default': $$MainLayout
}, Symbol.toStringTag, { value: 'Module' }));

export { $$module1 as $, $$MainLayout as a };
