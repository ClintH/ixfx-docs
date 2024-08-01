import { c as createMetadata, a as createAstro, b as createComponent, r as render, d as renderComponent } from './chunks/index.7bfc2e7e.mjs';
import 'shorthash';
import 'serialize-javascript';

var EnvelopePlay_astro_astro_type_style_index_0_lang = '';

const $$metadata = createMetadata("/src/pages/modulation/EnvelopePlay.astro", { modules: [], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [{ type: "inline", value: `
  import '/src/components/modulation/EnvelopeEditor';
  import '/src/components/LogElement';
  import '/src/components/modulation/EnvelopePlayground';
` }] });
const $$Astro = createAstro("/src/pages/modulation/EnvelopePlay.astro", "https://clinth.github.io/ixfx-docs/", "file:///Users/af4766/repos/ixfx-docs/");
const $$EnvelopePlay = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$EnvelopePlay;
  const STYLES = [];
  for (const STYLE of STYLES)
    $$result.styles.add(STYLE);
  return render`

<div class="toolbar astro-X7KWQSXB">
  <section class="astro-X7KWQSXB">
    <button id="btnTrigger" class="astro-X7KWQSXB">Trigger</button>
  </section>
  <section class="astro-X7KWQSXB">
    <button id="btnTriggerHold" class="astro-X7KWQSXB">Trigger & Hold</button>
    <button id="btnRelease" class="astro-X7KWQSXB">Release</button>
  </section>
  <section class="astro-X7KWQSXB">
    <label for="chkLooping" class="astro-X7KWQSXB">
      Looping
    </label>
    <input type="checkbox" id="chkLooping" class="astro-X7KWQSXB">
  </section>
  <section class="astro-X7KWQSXB">
    <label for="selectShow" class="astro-X7KWQSXB">
      Show
    </label>
    <select id="selectShow" class="astro-X7KWQSXB">
      <option value="scaled" class="astro-X7KWQSXB">Scaled</option>
      <option value="raw" class="astro-X7KWQSXB">Raw</option>
    </select>
  </section>
</div>
<div class="stackVertical astro-X7KWQSXB">
  <div id="envData" class="astro-X7KWQSXB"></div>
  <div style="display: flex" class="astro-X7KWQSXB">
    ${renderComponent($$result, "log-element", "log-element", { "id": "envDataLog", "class": "astro-X7KWQSXB" })}
  </div>
</div>`;
});

var $$module2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  $$metadata: $$metadata,
  'default': $$EnvelopePlay
}, Symbol.toStringTag, { value: 'Module' }));

export { $$module2 as $, $$metadata, $$EnvelopePlay as default };
