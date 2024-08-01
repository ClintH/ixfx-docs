import { c as createMetadata, a as createAstro, b as createComponent, r as render, d as renderComponent } from './chunks/index.7bfc2e7e.mjs';
import 'shorthash';
import 'serialize-javascript';

var GridDataPlay_astro_astro_type_style_index_0_lang = '';

const $$metadata = createMetadata("/src/pages/types/geometry/GridDataPlay.astro", { modules: [], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [{ type: "inline", value: `
import '/src/components/geometry/GridEditor';

import {resolveEl,Forms} from 'ixfx/lib/dom';
import {Arrays} from 'ixfx/lib/collections';
import {Grids} from 'ixfx/lib/geometry';
const dataGrid = resolveEl(\`#dataGrid\`);
const dataGridRead = resolveEl(\`#dataGridRead\`);
const dataGridStore = new Map();

Forms.button(\`#btnDataRandom\`, () => randomGrid());
dataGrid.cellRenderer = (cell, rect, ctx) => {
  const d = dataGridStore.get(Grids.cellKeyString(cell));
  if (d === undefined) return;
  ctx.fillStyle = d.colour;
  ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
  return true;
};
dataGrid.addEventListener(\`cellPointerMove\`, (ev) => {
  const cell = ev.detail;
  if (cell === undefined) return;
  const d = dataGridStore.get(Grids.cellKeyString(cell));

  dataGridRead.innerText = \`Cell \${cell.x}, \${cell.y} has data \${JSON.stringify(d)}\`;
});

const randomGrid = () => {
  const shape = dataGrid.getGrid();
  const colours = [\`bisque\`, \`cadetblue\`,\`cornflowerblue\`, \`coral\`]
  const randomColour = () => Arrays.randomElement(colours);
  for (let cell of Grids.cells(shape)) {
    dataGridStore.set(Grids.cellKeyString(cell), {colour: randomColour(), funk: Math.random()});
  }
  dataGrid.draw();
}
randomGrid();
` }] });
const $$Astro = createAstro("/src/pages/types/geometry/GridDataPlay.astro", "https://clinth.github.io/ixfx-docs/", "file:///Users/af4766/repos/ixfx-docs/");
const $$GridDataPlay = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$GridDataPlay;
  const STYLES = [];
  for (const STYLE of STYLES)
    $$result.styles.add(STYLE);
  return render`

<section id="dataGridSection" class="astro-IIOHXCA6">
  ${renderComponent($$result, "grid-editor", "grid-editor", { "rows": "15", "cols": "15", "pixelSize": "20", "id": "dataGrid", "class": "astro-IIOHXCA6" })}
  <button id="btnDataRandom" class="astro-IIOHXCA6">Randomise</button>
  <div id="dataGridRead" class="astro-IIOHXCA6">&nbsp;</div>
</section>
`;
});

export { $$metadata, $$GridDataPlay as default };
