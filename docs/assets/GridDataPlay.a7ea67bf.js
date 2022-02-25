import{t as l,u as s,v as c,w as m,x as u,z as p}from"./vendor.a59a155e.js";var e=Object.freeze,G=Object.defineProperty,f=(r,t)=>e(G(r,"raw",{value:e(t||r.slice())})),n;l("/src/pages/types/geometry/GridDataPlay.astro",{modules:[],hydratedComponents:[],hydrationDirectives:new Set([]),hoisted:[]});const y=s("/src/pages/types/geometry/GridDataPlay.astro","https://clinth.github.io/ixfx-docs/","file:///C:/repos/ixfx-docs/");c(async(r,t,o)=>{const a=r.createAstro(y,t,o),d=[{props:{"data-astro-id":"QQ75N3AD"},children:"#dataGrid.astro-QQ75N3AD{--grid-color:var(--divider);--hover-color: var(--bg-contrast);}#dataGridSection.astro-QQ75N3AD{display:flex;background-color:aliceblue;border:2px solid black;flex-direction:column;color:black;padding:1em;max-width:350px;margin:0 auto;align-items:center;}"}];for(const i of d)r.styles.add(i);return m(n||(n=f(['<html class="astro-QQ75N3AD"><head><script type="module"',`><\/script>
<!-- <script type="module" src={Astro.resolve('./grid.ts')}><\/script> -->


<script type="module">
import {resolveEl,Forms} from 'ixfx/lib/dom';
import {Arrays} from 'ixfx/lib/collections';
import {Grids} from 'ixfx/lib/geometry';
import {DictionaryOfColourCombinations} from 'ixfx/lib/visual';
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
<\/script>
</head><body><section id="dataGridSection" class="astro-QQ75N3AD">
  `,`
  <button id="btnDataRandom" class="astro-QQ75N3AD">Randomise</button>
  <div id="dataGridRead" class="astro-QQ75N3AD">&nbsp;</div>
</section>
</body></html>`],['<html class="astro-QQ75N3AD"><head><script type="module"',`><\/script>
<!-- <script type="module" src={Astro.resolve('./grid.ts')}><\/script> -->


<script type="module">
import {resolveEl,Forms} from 'ixfx/lib/dom';
import {Arrays} from 'ixfx/lib/collections';
import {Grids} from 'ixfx/lib/geometry';
import {DictionaryOfColourCombinations} from 'ixfx/lib/visual';
const dataGrid = resolveEl(\\\`#dataGrid\\\`);
const dataGridRead = resolveEl(\\\`#dataGridRead\\\`);
const dataGridStore = new Map();

Forms.button(\\\`#btnDataRandom\\\`, () => randomGrid());
dataGrid.cellRenderer = (cell, rect, ctx) => {
  const d = dataGridStore.get(Grids.cellKeyString(cell));
  if (d === undefined) return;
  ctx.fillStyle = d.colour;
  ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
  return true;
};
dataGrid.addEventListener(\\\`cellPointerMove\\\`, (ev) => {
  const cell = ev.detail;
  if (cell === undefined) return;
  const d = dataGridStore.get(Grids.cellKeyString(cell));

  dataGridRead.innerText = \\\`Cell \\\${cell.x}, \\\${cell.y} has data \\\${JSON.stringify(d)}\\\`;
});

const randomGrid = () => {
  const shape = dataGrid.getGrid();
  const colours = [\\\`bisque\\\`, \\\`cadetblue\\\`,\\\`cornflowerblue\\\`, \\\`coral\\\`]
  const randomColour = () => Arrays.randomElement(colours);
  for (let cell of Grids.cells(shape)) {
    dataGridStore.set(Grids.cellKeyString(cell), {colour: randomColour(), funk: Math.random()});
  }
  dataGrid.draw();
}
randomGrid();
<\/script>
</head><body><section id="dataGridSection" class="astro-QQ75N3AD">
  `,`
  <button id="btnDataRandom" class="astro-QQ75N3AD">Randomise</button>
  <div id="dataGridRead" class="astro-QQ75N3AD">&nbsp;</div>
</section>
</body></html>`])),p(a.resolve("./GridEditor.ts"),"src"),u(r,"grid-editor","grid-editor",{rows:"15",cols:"15",pixelSize:"20",id:"dataGrid",class:"astro-QQ75N3AD"}))});
