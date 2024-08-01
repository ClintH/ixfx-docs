import { c as createComponent, r as renderTemplate, m as maybeRenderHead, a as renderComponent } from './astro/server__cawITtY.mjs';
import 'kleur/colors';
/* empty css                                */

const $$GridDataPlay = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section id="dataGridSection" data-astro-cid-pectooga> ${renderComponent($$result, "grid-editor", "grid-editor", { "rows": "15", "cols": "15", "pixelSize": "20", "id": "dataGrid", "data-astro-cid-pectooga": true })} <button id="btnDataRandom" data-astro-cid-pectooga>Randomise</button> <div id="dataGridRead" data-astro-cid-pectooga>&nbsp;</div> </section>`;
}, "/Users/af4766/repos/ixfx-docs/src/pages/types/geometry/GridDataPlay.astro", void 0);

const $$file = "/Users/af4766/repos/ixfx-docs/src/pages/types/geometry/GridDataPlay.astro";
const $$url = "/types/geometry/GridDataPlay";

export { $$GridDataPlay as default, $$file as file, $$url as url };
