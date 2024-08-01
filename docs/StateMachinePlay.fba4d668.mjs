import { c as createMetadata, a as createAstro, b as createComponent, r as render } from './chunks/index.7bfc2e7e.mjs';
import 'shorthash';
import 'serialize-javascript';

var StateMachinePlay_astro_astro_type_style_index_0_lang = '';

const $$metadata = createMetadata("/src/pages/flow/StateMachinePlay.astro", { modules: [], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [{ type: "inline", value: `
  import '/src/components/flow/stateMachine';
` }] });
const $$Astro = createAstro("/src/pages/flow/StateMachinePlay.astro", "https://clinth.github.io/ixfx-docs/", "file:///Users/af4766/repos/ixfx-docs/");
const $$StateMachinePlay = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$StateMachinePlay;
  const STYLES = [];
  for (const STYLE of STYLES)
    $$result.styles.add(STYLE);
  return render`

<div class="sxs astro-WPFLWN2H">
  <section id="dataDescr" class="dividerRight astro-WPFLWN2H">
    <section class="astro-WPFLWN2H">
      <div class="toolbar centered astro-WPFLWN2H">
        <label for="selDemoMachines" class="astro-WPFLWN2H">Load demo:</label>
        <select id="selDemoMachines" class="astro-WPFLWN2H">
          <option class="astro-WPFLWN2H">one</option>
        </select>
      </div>
    </section>
    <section class="astro-WPFLWN2H">
      <h2 class="astro-WPFLWN2H">1. Machine description</h2>
      <pre class="editable astro-WPFLWN2H" contenteditable id="jsonDescr"></pre>
      <div id="descrValidate" class="astro-WPFLWN2H"></div>

      <label class="astro-WPFLWN2H">
        Initial state:
        <select id="selDescrInitial" class="astro-WPFLWN2H">
          <option class="astro-WPFLWN2H"></option>
        </select>
      </label>
      <div class="toolbar centered astro-WPFLWN2H">
        <button id="btnSetDescr" class="astro-WPFLWN2H">2. Use description</button>
      </div>
    </section>
  </section>
  <section class="astro-WPFLWN2H">
    <section class="astro-WPFLWN2H">
      <h2 class="astro-WPFLWN2H">Control</h2>
      <select disabled size="3" id="selPossibleNext" class="astro-WPFLWN2H">
        <option class="astro-WPFLWN2H"></option>
      </select>
      <div class="toolbar astro-WPFLWN2H">
        <button disabled id="btnChangeState" class="astro-WPFLWN2H">3. Change state</button>
      </div>

      <div id="currentState" class="astro-WPFLWN2H"></div>
    </section>
    <section class="dividerTop astro-WPFLWN2H">
      <div id="dataStream" class="astro-WPFLWN2H"></div>
    </section>
  </section>
</div>
`;
});

var $$module3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  $$metadata: $$metadata,
  'default': $$StateMachinePlay
}, Symbol.toStringTag, { value: 'Module' }));

export { $$module3 as $, $$metadata, $$StateMachinePlay as default };
