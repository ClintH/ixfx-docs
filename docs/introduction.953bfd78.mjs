import { c as createMetadata, a as createAstro, b as createComponent, r as render } from './chunks/index.7bfc2e7e.mjs';
import 'shorthash';
import 'serialize-javascript';

const metadata = { "headers": [{ "depth": 1, "slug": "modulation", "text": "Modulation" }], "source": "# Modulation", "html": '<h1 id="modulation">Modulation</h1>' };
const frontmatter = { "astro": { "headers": [{ "depth": 1, "slug": "modulation", "text": "Modulation" }], "source": "# Modulation", "html": '<h1 id="modulation">Modulation</h1>' } };
const $$metadata = createMetadata("/src/pages/modulation/introduction.md", { modules: [], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
const $$Astro = createAstro("/src/pages/modulation/introduction.md", "https://clinth.github.io/ixfx-docs/", "file:///Users/af4766/repos/ixfx-docs/");
const $$Introduction = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Introduction;
  return render`<h1 id="modulation">Modulation</h1>`;
});

export { $$metadata, $$Introduction as default, frontmatter, metadata };
