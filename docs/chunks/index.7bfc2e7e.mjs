import shorthash from 'shorthash';
import serializeJavaScript from 'serialize-javascript';

function serializeListValue(value) {
  const hash = {};
  push(value);
  return Object.keys(hash).join(" ");
  function push(item) {
    if (item && typeof item.forEach === "function")
      item.forEach(push);
    else if (item === Object(item))
      Object.keys(item).forEach((name) => {
        if (item[name])
          push(name);
      });
    else {
      item = item == null ? "" : String(item).trim();
      if (item) {
        item.split(/\s+/).forEach((name) => {
          hash[name] = true;
        });
      }
    }
  }
}
function hydrationSpecifier(hydrate) {
  return `astro/client/${hydrate}.js`;
}

function serializeProps(value) {
  return serializeJavaScript(value);
}
const HydrationDirectives = ["load", "idle", "media", "visible", "only"];
function extractDirectives(inputProps) {
  let extracted = {
    hydration: null,
    props: {}
  };
  for (const [key, value] of Object.entries(inputProps)) {
    if (key.startsWith("client:")) {
      if (!extracted.hydration) {
        extracted.hydration = {
          directive: "",
          value: "",
          componentUrl: "",
          componentExport: { value: "" }
        };
      }
      switch (key) {
        case "client:component-path": {
          extracted.hydration.componentUrl = value;
          break;
        }
        case "client:component-export": {
          extracted.hydration.componentExport.value = value;
          break;
        }
        case "client:component-hydration": {
          break;
        }
        default: {
          extracted.hydration.directive = key.split(":")[1];
          extracted.hydration.value = value;
          if (HydrationDirectives.indexOf(extracted.hydration.directive) < 0) {
            throw new Error(`Error: invalid hydration directive "${key}". Supported hydration methods: ${HydrationDirectives.map((d) => `"client:${d}"`).join(", ")}`);
          }
          if (extracted.hydration.directive === "media" && typeof extracted.hydration.value !== "string") {
            throw new Error('Error: Media query must be provided for "client:media", similar to client:media="(max-width: 600px)"');
          }
          break;
        }
      }
    } else if (key === "class:list") {
      extracted.props[key.slice(0, -5)] = serializeListValue(value);
    } else {
      extracted.props[key] = value;
    }
  }
  return extracted;
}
async function generateHydrateScript(scriptOptions, metadata) {
  const { renderer, result, astroId, props } = scriptOptions;
  const { hydrate, componentUrl, componentExport } = metadata;
  if (!componentExport) {
    throw new Error(`Unable to resolve a componentExport for "${metadata.displayName}"! Please open an issue.`);
  }
  let hydrationSource = "";
  if (renderer.hydrationPolyfills) {
    hydrationSource += `await Promise.all([${(await Promise.all(renderer.hydrationPolyfills.map(async (src) => `
  import("${await result.resolve(src)}")`))).join(", ")}]);
`;
  }
  hydrationSource += renderer.source ? `const [{ ${componentExport.value}: Component }, { default: hydrate }] = await Promise.all([import("${await result.resolve(componentUrl)}"), import("${await result.resolve(renderer.source)}")]);
  return (el, children) => hydrate(el)(Component, ${serializeProps(props)}, children);
` : `await import("${await result.resolve(componentUrl)}");
  return () => {};
`;
  const hydrationScript = {
    props: { type: "module", "data-astro-component-hydration": true },
    children: `import setup from '${await result.resolve(hydrationSpecifier(hydrate))}';
setup("${astroId}", {name:"${metadata.displayName}",${metadata.hydrateArgs ? `value: ${JSON.stringify(metadata.hydrateArgs)}` : ""}}, async () => {
  ${hydrationSource}
});
`
  };
  return hydrationScript;
}

/**
 * Copyright (C) 2017-present by Andrea Giammarchi - @WebReflection
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

const {replace} = '';
const ca = /[&<>'"]/g;

const esca = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  "'": '&#39;',
  '"': '&quot;'
};
const pe = m => esca[m];

/**
 * Safely escape HTML entities such as `&`, `<`, `>`, `"`, and `'`.
 * @param {string} es the input to safely escape
 * @returns {string} the escaped input, and it **throws** an error if
 *  the input type is unexpected, except for boolean and numbers,
 *  converted as string.
 */
const escape = es => replace.call(es, ca, pe);

const escapeHTML = escape;
class HTMLString extends String {
}
const markHTMLString = (value) => {
  if (value instanceof HTMLString) {
    return value;
  }
  if (typeof value === "string") {
    return new HTMLString(value);
  }
  return value;
};

class Metadata {
  constructor(filePathname, opts) {
    this.modules = opts.modules;
    this.hoisted = opts.hoisted;
    this.hydratedComponents = opts.hydratedComponents;
    this.clientOnlyComponents = opts.clientOnlyComponents;
    this.hydrationDirectives = opts.hydrationDirectives;
    this.mockURL = new URL(filePathname, "http://example.com");
    this.metadataCache = /* @__PURE__ */ new Map();
  }
  resolvePath(specifier) {
    return specifier.startsWith(".") ? new URL(specifier, this.mockURL).pathname : specifier;
  }
  getPath(Component) {
    const metadata = this.getComponentMetadata(Component);
    return (metadata == null ? void 0 : metadata.componentUrl) || null;
  }
  getExport(Component) {
    const metadata = this.getComponentMetadata(Component);
    return (metadata == null ? void 0 : metadata.componentExport) || null;
  }
  *hydratedComponentPaths() {
    const found = /* @__PURE__ */ new Set();
    for (const metadata of this.deepMetadata()) {
      for (const component of metadata.hydratedComponents) {
        const path = metadata.getPath(component);
        if (path && !found.has(path)) {
          found.add(path);
          yield path;
        }
      }
    }
  }
  *clientOnlyComponentPaths() {
    const found = /* @__PURE__ */ new Set();
    for (const metadata of this.deepMetadata()) {
      for (const component of metadata.clientOnlyComponents) {
        const path = metadata.resolvePath(component);
        if (path && !found.has(path)) {
          found.add(path);
          yield path;
        }
      }
    }
  }
  *hydrationDirectiveSpecifiers() {
    const found = /* @__PURE__ */ new Set();
    for (const metadata of this.deepMetadata()) {
      for (const directive of metadata.hydrationDirectives) {
        if (!found.has(directive)) {
          found.add(directive);
          yield hydrationSpecifier(directive);
        }
      }
    }
  }
  *hoistedScriptPaths() {
    for (const metadata of this.deepMetadata()) {
      let i = 0, pathname = metadata.mockURL.pathname;
      while (i < metadata.hoisted.length) {
        yield `${pathname}?astro&type=script&index=${i}`;
        i++;
      }
    }
  }
  *deepMetadata() {
    yield this;
    const seen = /* @__PURE__ */ new Set();
    for (const { module: mod } of this.modules) {
      if (typeof mod.$$metadata !== "undefined") {
        const md = mod.$$metadata;
        for (const childMetdata of md.deepMetadata()) {
          if (!seen.has(childMetdata)) {
            seen.add(childMetdata);
            yield childMetdata;
          }
        }
      }
    }
  }
  getComponentMetadata(Component) {
    if (this.metadataCache.has(Component)) {
      return this.metadataCache.get(Component);
    }
    const metadata = this.findComponentMetadata(Component);
    this.metadataCache.set(Component, metadata);
    return metadata;
  }
  findComponentMetadata(Component) {
    const isCustomElement = typeof Component === "string";
    for (const { module, specifier } of this.modules) {
      const id = this.resolvePath(specifier);
      for (const [key, value] of Object.entries(module)) {
        if (isCustomElement) {
          if (key === "tagName" && Component === value) {
            return {
              componentExport: key,
              componentUrl: id
            };
          }
        } else if (Component === value) {
          return {
            componentExport: key,
            componentUrl: id
          };
        }
      }
    }
    return null;
  }
}
function createMetadata(filePathname, options) {
  return new Metadata(filePathname, options);
}

var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
const voidElementNames = /^(area|base|br|col|command|embed|hr|img|input|keygen|link|meta|param|source|track|wbr)$/i;
const htmlBooleanAttributes = /^(allowfullscreen|async|autofocus|autoplay|controls|default|defer|disabled|disablepictureinpicture|disableremoteplayback|formnovalidate|hidden|loop|nomodule|novalidate|open|playsinline|readonly|required|reversed|scoped|seamless|itemscope)$/i;
const htmlEnumAttributes = /^(contenteditable|draggable|spellcheck|value)$/i;
const svgEnumAttributes = /^(autoReverse|externalResourcesRequired|focusable|preserveAlpha)$/i;
async function _render(child) {
  child = await child;
  if (child instanceof HTMLString) {
    return child;
  } else if (Array.isArray(child)) {
    return markHTMLString((await Promise.all(child.map((value) => _render(value)))).join(""));
  } else if (typeof child === "function") {
    return _render(child());
  } else if (typeof child === "string") {
    return markHTMLString(escapeHTML(child));
  } else if (!child && child !== 0) ; else if (child instanceof AstroComponent || Object.prototype.toString.call(child) === "[object AstroComponent]") {
    return markHTMLString(await renderAstroComponent(child));
  } else {
    return child;
  }
}
class AstroComponent {
  constructor(htmlParts, expressions) {
    this.htmlParts = htmlParts;
    this.expressions = expressions;
  }
  get [Symbol.toStringTag]() {
    return "AstroComponent";
  }
  *[Symbol.iterator]() {
    const { htmlParts, expressions } = this;
    for (let i = 0; i < htmlParts.length; i++) {
      const html = htmlParts[i];
      const expression = expressions[i];
      yield markHTMLString(html);
      yield _render(expression);
    }
  }
}
async function render(htmlParts, ...expressions) {
  return new AstroComponent(htmlParts, expressions);
}
function createComponent(cb) {
  cb.isAstroComponentFactory = true;
  return cb;
}
async function renderSlot(_result, slotted, fallback) {
  if (slotted) {
    return await _render(slotted);
  }
  return fallback;
}
const Fragment = Symbol("Astro.Fragment");
function guessRenderers(componentUrl) {
  const extname = componentUrl == null ? void 0 : componentUrl.split(".").pop();
  switch (extname) {
    case "svelte":
      return ["@astrojs/renderer-svelte"];
    case "vue":
      return ["@astrojs/renderer-vue"];
    case "jsx":
    case "tsx":
      return ["@astrojs/renderer-react", "@astrojs/renderer-preact"];
    default:
      return ["@astrojs/renderer-react", "@astrojs/renderer-preact", "@astrojs/renderer-vue", "@astrojs/renderer-svelte"];
  }
}
function formatList(values) {
  if (values.length === 1) {
    return values[0];
  }
  return `${values.slice(0, -1).join(", ")} or ${values[values.length - 1]}`;
}
async function renderComponent(result, displayName, Component, _props, slots = {}) {
  var _a, _b;
  Component = await Component;
  const children = await renderSlot(result, slots == null ? void 0 : slots.default);
  if (Component === Fragment) {
    if (children == null) {
      return children;
    }
    return markHTMLString(children);
  }
  if (Component && Component.isAstroComponentFactory) {
    const output = await renderToString(result, Component, _props, slots);
    return markHTMLString(output);
  }
  if (Component === null && !_props["client:only"]) {
    throw new Error(`Unable to render ${displayName} because it is ${Component}!
Did you forget to import the component or is it possible there is a typo?`);
  }
  const { renderers } = result._metadata;
  const metadata = { displayName };
  const { hydration, props } = extractDirectives(_props);
  let html = "";
  if (hydration) {
    metadata.hydrate = hydration.directive;
    metadata.hydrateArgs = hydration.value;
    metadata.componentExport = hydration.componentExport;
    metadata.componentUrl = hydration.componentUrl;
  }
  const probableRendererNames = guessRenderers(metadata.componentUrl);
  if (Array.isArray(renderers) && renderers.length === 0 && typeof Component !== "string" && !componentIsHTMLElement(Component)) {
    const message = `Unable to render ${metadata.displayName}!

There are no \`renderers\` set in your \`astro.config.mjs\` file.
Did you mean to enable ${formatList(probableRendererNames.map((r) => "`" + r + "`"))}?`;
    throw new Error(message);
  }
  let renderer;
  if (metadata.hydrate !== "only") {
    for (const r of renderers) {
      if (await r.ssr.check(Component, props, children)) {
        renderer = r;
        break;
      }
    }
    if (!renderer && typeof HTMLElement === "function" && componentIsHTMLElement(Component)) {
      const output = renderHTMLElement(result, Component, _props, slots);
      return output;
    }
  } else {
    if (metadata.hydrateArgs) {
      const rendererName = metadata.hydrateArgs;
      renderer = renderers.filter(({ name }) => name === `@astrojs/renderer-${rendererName}` || name === rendererName)[0];
    }
    if (!renderer && renderers.length === 1) {
      renderer = renderers[0];
    }
    if (!renderer) {
      const extname = (_a = metadata.componentUrl) == null ? void 0 : _a.split(".").pop();
      renderer = renderers.filter(({ name }) => name === `@astrojs/renderer-${extname}` || name === extname)[0];
    }
  }
  if (!renderer) {
    if (metadata.hydrate === "only") {
      throw new Error(`Unable to render ${metadata.displayName}!

Using the \`client:only\` hydration strategy, Astro needs a hint to use the correct renderer.
Did you mean to pass <${metadata.displayName} client:only="${probableRendererNames.map((r) => r.replace("@astrojs/renderer-", "")).join("|")}" />
`);
    } else if (typeof Component !== "string") {
      const matchingRenderers = renderers.filter((r) => probableRendererNames.includes(r.name));
      const plural = renderers.length > 1;
      if (matchingRenderers.length === 0) {
        throw new Error(`Unable to render ${metadata.displayName}!

There ${plural ? "are" : "is"} ${renderers.length} renderer${plural ? "s" : ""} configured in your \`astro.config.mjs\` file,
but ${plural ? "none were" : "it was not"} able to server-side render ${metadata.displayName}.

Did you mean to enable ${formatList(probableRendererNames.map((r) => "`" + r + "`"))}?`);
      } else if (matchingRenderers.length === 1) {
        renderer = matchingRenderers[0];
        ({ html } = await renderer.ssr.renderToStaticMarkup(Component, props, children));
      } else {
        throw new Error(`Unable to render ${metadata.displayName}!

This component likely uses ${formatList(probableRendererNames)},
but Astro encountered an error during server-side rendering.

Please ensure that ${metadata.displayName}:
1. Does not unconditionally access browser-specific globals like \`window\` or \`document\`.
   If this is unavoidable, use the \`client:only\` hydration directive.
2. Does not conditionally return \`null\` or \`undefined\` when rendered on the server.

If you're still stuck, please open an issue on GitHub or join us at https://astro.build/chat.`);
      }
    }
  } else {
    if (metadata.hydrate === "only") {
      html = await renderSlot(result, slots == null ? void 0 : slots.fallback);
    } else {
      ({ html } = await renderer.ssr.renderToStaticMarkup(Component, props, children));
    }
  }
  if (!html && typeof Component === "string") {
    html = await renderAstroComponent(await render`<${Component}${spreadAttributes(props)}${markHTMLString((children == null || children == "") && voidElementNames.test(Component) ? `/>` : `>${children}</${Component}>`)}`);
  }
  if ((_b = renderer == null ? void 0 : renderer.polyfills) == null ? void 0 : _b.length) {
    for (const src of renderer.polyfills) {
      result.scripts.add({
        props: { type: "module" },
        children: `import "${await result.resolve(src)}";`
      });
    }
  }
  if (!hydration) {
    return markHTMLString(html.replace(/\<\/?astro-fragment\>/g, ""));
  }
  const astroId = shorthash.unique(`<!--${metadata.componentExport.value}:${metadata.componentUrl}-->
${html}`);
  result.scripts.add(await generateHydrateScript({ renderer, result, astroId, props }, metadata));
  const needsAstroTemplate = children && !/<\/?astro-fragment\>/.test(html);
  const template = needsAstroTemplate ? `<template data-astro-template>${children}</template>` : "";
  return markHTMLString(`<astro-root uid="${astroId}"${needsAstroTemplate ? " tmpl" : ""}>${html ?? ""}${template}</astro-root>`);
}
function createFetchContentFn(url, site) {
  let sitePathname = site.pathname;
  const fetchContent = (importMetaGlobResult) => {
    let allEntries = [...Object.entries(importMetaGlobResult)];
    if (allEntries.length === 0) {
      throw new Error(`[${url.pathname}] Astro.fetchContent() no matches found.`);
    }
    return allEntries.map(([spec, mod]) => {
      if (!mod.frontmatter) {
        return;
      }
      const urlSpec = new URL(spec, url).pathname;
      return __spreadProps(__spreadValues({}, mod.frontmatter), {
        Content: mod.default,
        content: mod.metadata,
        file: new URL(spec, url),
        url: urlSpec.includes("/pages/") ? urlSpec.replace(/^.*\/pages\//, sitePathname).replace(/(\/index)?\.md$/, "") : void 0
      });
    }).filter(Boolean);
  };
  return fetchContent;
}
function createAstro(filePathname, _site, projectRootStr) {
  const site = new URL(_site);
  const url = new URL(filePathname, site);
  const projectRoot = new URL(projectRootStr);
  const fetchContent = createFetchContentFn(url, site);
  return {
    site,
    fetchContent,
    resolve(...segments) {
      let resolved = segments.reduce((u, segment) => new URL(segment, u), url).pathname;
      if (resolved.startsWith(projectRoot.pathname)) {
        resolved = "/" + resolved.substr(projectRoot.pathname.length);
      }
      return resolved;
    }
  };
}
const toAttributeString = (value, shouldEscape = true) => shouldEscape ? String(value).replace(/&/g, "&#38;").replace(/"/g, "&#34;") : value;
const STATIC_DIRECTIVES = /* @__PURE__ */ new Set(["set:html", "set:text"]);
function addAttribute(value, key, shouldEscape = true) {
  if (value == null) {
    return "";
  }
  if (value === false) {
    if (htmlEnumAttributes.test(key) || svgEnumAttributes.test(key)) {
      return markHTMLString(` ${key}="false"`);
    }
    return "";
  }
  if (STATIC_DIRECTIVES.has(key)) {
    console.warn(`[astro] The "${key}" directive cannot be applied dynamically at runtime. It will not be rendered as an attribute.

Make sure to use the static attribute syntax (\`${key}={value}\`) instead of the dynamic spread syntax (\`{...{ "${key}": value }}\`).`);
    return "";
  }
  if (key === "class:list") {
    return markHTMLString(` ${key.slice(0, -5)}="${toAttributeString(serializeListValue(value))}"`);
  }
  if (value === true && (key.startsWith("data-") || htmlBooleanAttributes.test(key))) {
    return markHTMLString(` ${key}`);
  } else {
    return markHTMLString(` ${key}="${toAttributeString(value, shouldEscape)}"`);
  }
}
function spreadAttributes(values, shouldEscape = true) {
  let output = "";
  for (const [key, value] of Object.entries(values)) {
    output += addAttribute(value, key, shouldEscape);
  }
  return markHTMLString(output);
}
function defineStyleVars(selector, vars) {
  let output = "\n";
  for (const [key, value] of Object.entries(vars)) {
    output += `  --${key}: ${value};
`;
  }
  return markHTMLString(`${selector} {${output}}`);
}
function defineScriptVars(vars) {
  let output = "";
  for (const [key, value] of Object.entries(vars)) {
    output += `let ${key} = ${JSON.stringify(value)};
`;
  }
  return markHTMLString(output);
}
async function renderToString(result, componentFactory, props, children) {
  const Component = await componentFactory(result, props, children);
  let template = await renderAstroComponent(Component);
  if (template.indexOf("<!--astro:head-->") > -1) {
    template = template.replace("<!--astro:head-->", await renderHead(result));
  }
  return template;
}
const uniqueElements = (item, index, all) => {
  const props = JSON.stringify(item.props);
  const children = item.children;
  return index === all.findIndex((i) => JSON.stringify(i.props) === props && i.children == children);
};
async function renderHead(result) {
  const styles = Array.from(result.styles).filter(uniqueElements).map((style) => {
    const styleChildren = !result._metadata.legacyBuild ? "" : style.children;
    return renderElement("style", {
      children: styleChildren,
      props: __spreadProps(__spreadValues({}, style.props), { "astro-style": true })
    });
  });
  let needsHydrationStyles = false;
  const scripts = Array.from(result.scripts).filter(uniqueElements).map((script, i) => {
    if ("data-astro-component-hydration" in script.props) {
      needsHydrationStyles = true;
    }
    return renderElement("script", __spreadProps(__spreadValues({}, script), {
      props: __spreadProps(__spreadValues({}, script.props), { "astro-script": result._metadata.pathname + "/script-" + i })
    }));
  });
  if (needsHydrationStyles) {
    styles.push(renderElement("style", { props: { "astro-style": true }, children: "astro-root, astro-fragment { display: contents; }" }));
  }
  const links = Array.from(result.links).filter(uniqueElements).map((link) => renderElement("link", link, false));
  return markHTMLString(links.join("\n") + styles.join("\n") + scripts.join("\n") + "\n<!--astro:head:injected-->");
}
async function renderAstroComponent(component) {
  let template = [];
  for await (const value of component) {
    if (value || value === 0) {
      template.push(value);
    }
  }
  return markHTMLString(await _render(template));
}
function componentIsHTMLElement(Component) {
  return typeof HTMLElement !== "undefined" && HTMLElement.isPrototypeOf(Component);
}
async function renderHTMLElement(result, constructor, props, slots) {
  const name = getHTMLElementName(constructor);
  let attrHTML = "";
  for (const attr in props) {
    attrHTML += ` ${attr}="${toAttributeString(await props[attr])}"`;
  }
  return markHTMLString(`<${name}${attrHTML}>${await renderSlot(result, slots == null ? void 0 : slots.default)}</${name}>`);
}
function getHTMLElementName(constructor) {
  const definedName = customElements.getName(constructor);
  if (definedName)
    return definedName;
  const assignedName = constructor.name.replace(/^HTML|Element$/g, "").replace(/[A-Z]/g, "-$&").toLowerCase().replace(/^-/, "html-");
  return assignedName;
}
function renderElement(name, { props: _props, children = "" }, shouldEscape = true) {
  const _a = _props, { lang: _, "data-astro-id": astroId, "define:vars": defineVars } = _a, props = __objRest(_a, ["lang", "data-astro-id", "define:vars"]);
  if (defineVars) {
    if (name === "style") {
      if (props.global) {
        children = defineStyleVars(`:root`, defineVars) + "\n" + children;
      } else {
        children = defineStyleVars(`.astro-${astroId}`, defineVars) + "\n" + children;
      }
      delete props.global;
    }
    if (name === "script") {
      delete props.hoist;
      children = defineScriptVars(defineVars) + "\n" + children;
    }
  }
  return `<${name}${spreadAttributes(props, shouldEscape)}>${children}</${name}>`;
}

export { Fragment as F, createAstro as a, createComponent as b, createMetadata as c, renderComponent as d, addAttribute as e, renderSlot as f, markHTMLString as m, render as r };
