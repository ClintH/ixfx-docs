import { c as createMetadata, a as createAstro, b as createComponent, r as render } from './chunks/index.7bfc2e7e.mjs';
import 'shorthash';
import 'serialize-javascript';

const $$metadata = createMetadata("/src/pages/ModuleList.astro", { modules: [], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
const $$Astro = createAstro("/src/pages/ModuleList.astro", "https://clinth.github.io/ixfx-docs/", "file:///Users/af4766/repos/ixfx-docs/");
const $$ModuleList = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ModuleList;
  return render`<div>
Modules available:<br>

<select size="5">
  <option>arrays</option>
  <option>collections</option>
  <option>components</option>
  <option>dom</option>
  <option>forms</option>
  <option>flow</option>
  <option>generators</option>
  <option>geometry</option>
  <option>keyValues</option>
  <option>maps</option>
  <option>modulation</option>
  <option>polar</option>
  <option>random</option>
  <option>sets</option>
  <option>stateMachine</option>
  <option>timers</option>
  <option>visual</option>
</select>

</div>
`;
});

var $$module2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  $$metadata: $$metadata,
  'default': $$ModuleList
}, Symbol.toStringTag, { value: 'Module' }));

export { $$module2 as $, $$metadata, $$ModuleList as default };
