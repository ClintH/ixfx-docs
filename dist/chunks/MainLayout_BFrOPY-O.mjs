import { c as createComponent, r as renderTemplate, b as addAttribute, d as createAstro, m as maybeRenderHead, a as renderComponent, e as renderSlot, f as renderHead } from './astro/server__cawITtY.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                          */
import { useState, useEffect, useRef } from 'preact/hooks';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$HeadCommon = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate(_a || (_a = __template(['<!-- Global Metadata --><meta charset="utf-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="alternate icon" type="image/x-icon" href="/favicon.ico"><link rel="sitemap" href="/sitemap.xml"><!-- Preload Fonts --><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital@0;1&display=swap" rel="stylesheet"><!-- Scrollable a11y code helper --><script type="module" src="/make-scrollable-code-focusable.js"><\/script><!-- This is intentionally inlined to avoid FOUC -->'])));
}, "/Users/af4766/repos/ixfx-docs/src/components/HeadCommon.astro", void 0);

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
  { text: `State Machine`, link: `flow/stateMachine/` },
  { text: `Loops and Intervals`, link: `flow/loops/` },
  { text: `Delay`, link: `flow/delay/` },
  { text: `Retrying`, link: `flow/retrying/` },
  { text: `Flow`, link: `flow/flow/` },
  { text: `Monitoring`, link: `flow/monitoring/` },
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

const $$Astro$6 = createAstro();
const $$HeadSEO = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$HeadSEO;
  const { content = {}, canonicalURL } = Astro2.props;
  const formattedContentTitle = content.title ? `${content.title} - ${SITE.title}` : SITE.title;
  const imageSrc = content?.image?.src ?? OPEN_GRAPH.image.src;
  const canonicalImageSrc = new URL(imageSrc, Astro2.site);
  const imageAlt = content?.image?.alt ?? OPEN_GRAPH.image.alt;
  return renderTemplate`<!-- Page Metadata --><link rel="canonical"${addAttribute(canonicalURL, "href")}><!-- OpenGraph Tags --><meta property="og:title"${addAttribute(formattedContentTitle, "content")}><meta property="og:type" content="article"><meta property="og:url"${addAttribute(canonicalURL, "content")}><meta property="og:locale"${addAttribute(content.ogLocale ?? SITE.defaultLanguage, "content")}><meta property="og:image"${addAttribute(canonicalImageSrc, "content")}><meta property="og:image:alt"${addAttribute(imageAlt, "content")}><meta name="description" property="og:description"${addAttribute(content.description ? content.description : SITE.description, "content")}><meta property="og:site_name"${addAttribute(SITE.title, "content")}><!-- Twitter Tags --><meta name="twitter:card" content="summary_large_image"><meta name="twitter:site"${addAttribute(OPEN_GRAPH.twitter, "content")}><meta name="twitter:title"${addAttribute(formattedContentTitle, "content")}><meta name="twitter:description"${addAttribute(content.description ? content.description : SITE.description, "content")}><meta name="twitter:image"${addAttribute(canonicalImageSrc, "content")}><meta name="twitter:image:alt"${addAttribute(imageAlt, "content")}><!--
  TODO: Add json+ld data, maybe https://schema.org/APIReference makes sense?
  Docs: https://developers.google.com/search/docs/advanced/structured-data/intro-structured-data
  https://www.npmjs.com/package/schema-dts seems like a great resource for implementing this.
  Even better, there's a React component that integrates with \`schema-dts\`: https://github.com/google/react-schemaorg
-->`;
}, "/Users/af4766/repos/ixfx-docs/src/components/HeadSEO.astro", void 0);

const $$SkipToContent = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<a href="#article" class="sr-only skiplink" data-astro-cid-dmgooz7y><span data-astro-cid-dmgooz7y>Skip to Content</span></a> `;
}, "/Users/af4766/repos/ixfx-docs/src/components/Header/SkipToContent.astro", void 0);

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
  return /* @__PURE__ */ React.createElement("button", { type: "button", "aria-pressed": sidebarShown ? `true` : `false`, id: "menu-toggle", onClick: () => setSidebarShown(!sidebarShown) }, /* @__PURE__ */ React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "1em", height: "1em", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, /* @__PURE__ */ React.createElement("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "M4 6h16M4 12h16M4 18h16" })), /* @__PURE__ */ React.createElement("span", { className: "sr-only" }, "Toggle sidebar"));
};

const $$Astro$5 = createAstro();
const $$Header = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$Header;
  Astro2.props;
  return renderTemplate`${maybeRenderHead()}<header data-astro-cid-2w66rqv5> ${renderComponent($$result, "SkipToContent", $$SkipToContent, { "data-astro-cid-2w66rqv5": true })} <nav class="nav-wrapper" title="Top Navigation" data-astro-cid-2w66rqv5> <div class="menu-toggle" data-astro-cid-2w66rqv5> ${renderComponent($$result, "SidebarToggle", MenuToggle, { "client:idle": true, "client:component-hydration": "idle", "client:component-path": "/Users/af4766/repos/ixfx-docs/src/components/Header/SidebarToggle.tsx", "client:component-export": "default", "data-astro-cid-2w66rqv5": true })} </div> <div class="logo flex" data-astro-cid-2w66rqv5> <!-- <AstroLogo size={40} /> --> <a href="/ixfx-docs/" data-astro-cid-2w66rqv5> <h1 data-astro-cid-2w66rqv5>ixfx docs</h1> </a> </div> <div style="flex-grow: 1;" data-astro-cid-2w66rqv5></div> <!-- {KNOWN_LANGUAGE_CODES.length > 1 && <LanguageSelect lang={lang} client:idle />} --> <!-- {CONFIG.ALGOLIA && (
			<div class="search-item">
				<Search client:idle />
			</div>
		)} --> </nav> </header> `;
}, "/Users/af4766/repos/ixfx-docs/src/components/Header/Header.astro", void 0);

const themes = ["light", "dark"];
const icons = [
  /* @__PURE__ */ React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", viewBox: "0 0 20 20", fill: "currentColor" }, /* @__PURE__ */ React.createElement(
    "path",
    {
      fillRule: "evenodd",
      d: "M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z",
      clipRule: "evenodd"
    }
  )),
  /* @__PURE__ */ React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", viewBox: "0 0 20 20", fill: "currentColor" }, /* @__PURE__ */ React.createElement("path", { d: "M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" }))
];
const ThemeToggle = () => {
  const [theme, setTheme] = useState(() => {
    {
      return void 0;
    }
  });
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "light") {
      root.classList.remove("theme-dark");
    } else {
      root.classList.add("theme-dark");
    }
  }, [theme]);
  return /* @__PURE__ */ React.createElement("div", { class: "theme-toggle" }, themes.map((t, i) => {
    const icon = icons[i];
    const checked = t === theme;
    return /* @__PURE__ */ React.createElement("label", { className: checked ? " checked" : "" }, icon, /* @__PURE__ */ React.createElement(
      "input",
      {
        type: "radio",
        name: "theme-toggle",
        checked,
        value: t,
        title: `Use ${t} theme`,
        "aria-label": `Use ${t} theme`,
        onChange: () => {
          localStorage.setItem("theme", t);
          setTheme(t);
        }
      }
    ));
  }));
};

const $$Astro$4 = createAstro();
const $$MoreMenu = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$MoreMenu;
  Astro2.props;
  const showMoreSection = false;
  return renderTemplate`${showMoreSection }<ul data-astro-cid-byikqf6w></ul><div style="margin: 2rem 0; text-align: center;" data-astro-cid-byikqf6w>${renderComponent($$result, "ThemeToggleButton", ThemeToggle, { "client:visible": true, "client:component-hydration": "visible", "client:component-path": "/Users/af4766/repos/ixfx-docs/src/components/RightSidebar/ThemeToggleButton.tsx", "client:component-export": "default", "data-astro-cid-byikqf6w": true })}</div>`;
}, "/Users/af4766/repos/ixfx-docs/src/components/RightSidebar/MoreMenu.astro", void 0);

const TableOfContents = ({ headers = [] }) => {
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
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("h2", { class: "heading" }, "On this page"), /* @__PURE__ */ React.createElement("ul", null, /* @__PURE__ */ React.createElement("li", { class: `header-link depth-2 ${activeId === "overview" ? "active" : ""}`.trim() }, /* @__PURE__ */ React.createElement("a", { href: "#overview" }, "Overview")), headers.filter(({ depth }) => depth > 1 && depth < 4).map((header) => /* @__PURE__ */ React.createElement("li", { class: `header-link depth-${header.depth} ${activeId === header.slug ? "active" : ""}`.trim() }, /* @__PURE__ */ React.createElement("a", { href: `#${header.slug}` }, header.text)))));
};

const $$Astro$3 = createAstro();
const $$PageContent = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$PageContent;
  const { content, githubEditUrl } = Astro2.props;
  const title = content.title;
  const headers = content?.astro?.headers;
  return renderTemplate`${maybeRenderHead()}<article id="article" class="content" data-astro-cid-j75b3yus> <section class="main-section" data-astro-cid-j75b3yus> <h1 class="content-title" id="overview" data-astro-cid-j75b3yus>${title}</h1> ${headers && renderTemplate`<nav class="block sm:hidden" data-astro-cid-j75b3yus> ${renderComponent($$result, "TableOfContents", TableOfContents, { "client:media": "(max-width: 50em)", "headers": headers, "client:component-hydration": "media", "client:component-path": "/Users/af4766/repos/ixfx-docs/src/components/RightSidebar/TableOfContents.tsx", "client:component-export": "default", "data-astro-cid-j75b3yus": true })} </nav>`} ${renderSlot($$result, $$slots["default"])} </section> <nav class="block sm:hidden" data-astro-cid-j75b3yus> ${renderComponent($$result, "MoreMenu", $$MoreMenu, { "editHref": githubEditUrl, "data-astro-cid-j75b3yus": true })} </nav> </article> `;
}, "/Users/af4766/repos/ixfx-docs/src/components/PageContent/PageContent.astro", void 0);

const $$Astro$2 = createAstro();
const $$LeftSidebar = createComponent(($$result, $$props, $$slots) => {
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
  return renderTemplate`${maybeRenderHead()}<nav aria-labelledby="grid-left" data-astro-cid-kqne5hrn> <ul class="nav-groups" data-astro-cid-kqne5hrn> ${sidebarSections.map((section) => renderTemplate`<li data-astro-cid-kqne5hrn> <div class="nav-group" data-astro-cid-kqne5hrn> <h2 class="nav-group-title" data-astro-cid-kqne5hrn>${section.text}</h2> <ul data-astro-cid-kqne5hrn> ${section.children.map((child) => renderTemplate`<li class="nav-link" data-astro-cid-kqne5hrn> <a${addAttribute(`${Astro2.site.pathname}${child.link}`, "href")}${addAttribute(`${currentPageMatch === child.link ? "page" : "false"}`, "aria-current")} data-astro-cid-kqne5hrn> ${child.text} </a> </li>`)} </ul> </div> </li>`)} </ul> </nav>  `;
}, "/Users/af4766/repos/ixfx-docs/src/components/LeftSidebar/LeftSidebar.astro", void 0);

const $$Astro$1 = createAstro();
const $$RightSidebar = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$RightSidebar;
  const { content, githubEditUrl } = Astro2.props;
  const headers = content.astro.headers;
  return renderTemplate`${maybeRenderHead()}<nav class="sidebar-nav" aria-labelledby="grid-right" data-astro-cid-roivmluz> <div class="sidebar-nav-inner" data-astro-cid-roivmluz> ${renderComponent($$result, "TableOfContents", TableOfContents, { "client:media": "(min-width: 50em)", "headers": headers, "client:component-hydration": "media", "client:component-path": "/Users/af4766/repos/ixfx-docs/src/components/RightSidebar/TableOfContents.tsx", "client:component-export": "default", "data-astro-cid-roivmluz": true })} ${renderComponent($$result, "MoreMenu", $$MoreMenu, { "editHref": githubEditUrl, "data-astro-cid-roivmluz": true })} </div> </nav> `;
}, "/Users/af4766/repos/ixfx-docs/src/components/RightSidebar/RightSidebar.astro", void 0);

const $$Astro = createAstro();
const $$MainLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$MainLayout;
  const { content = {} } = Astro2.props;
  const currentPage = Astro2.request.url.pathname;
  `src/pages${currentPage.replace(/\/$/, "")}.md`;
  return renderTemplate`<html${addAttribute(content.dir ?? "ltr", "dir")}${addAttribute(content.lang ?? "en-us", "lang")} class="initial" data-astro-cid-ouamjn2i> <head>${renderComponent($$result, "HeadCommon", $$HeadCommon, { "data-astro-cid-ouamjn2i": true })}${renderComponent($$result, "HeadSEO", $$HeadSEO, { "content": content, "canonicalURL": Astro2.request.canonicalURL, "data-astro-cid-ouamjn2i": true })}<title>${content.title ? `${content.title} - ${SITE.title}` : SITE.title}</title>${renderHead()}</head> <body data-astro-cid-ouamjn2i> ${renderComponent($$result, "Header", $$Header, { "currentPage": currentPage, "data-astro-cid-ouamjn2i": true })} <main class="layout" data-astro-cid-ouamjn2i> <aside id="grid-left" class="grid-sidebar" title="Site Navigation" data-astro-cid-ouamjn2i> ${renderComponent($$result, "LeftSidebar", $$LeftSidebar, { "currentPage": currentPage, "data-astro-cid-ouamjn2i": true })} </aside> <div id="grid-main" data-astro-cid-ouamjn2i> ${renderComponent($$result, "PageContent", $$PageContent, { "content": content, "data-astro-cid-ouamjn2i": true }, { "default": ($$result2) => renderTemplate` ${renderSlot($$result2, $$slots["default"])} ` })} </div> ${content.astro && renderTemplate`<aside id="grid-right" class="grid-sidebar" title="Table of Contents" data-astro-cid-ouamjn2i> ${renderComponent($$result, "RightSidebar", $$RightSidebar, { "content": content, "data-astro-cid-ouamjn2i": true })} </aside>`} </main> </body></html>`;
}, "/Users/af4766/repos/ixfx-docs/src/layouts/MainLayout.astro", void 0);

export { $$MainLayout as $ };
