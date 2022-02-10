import{t as s,u as l,v as c,w as m,x as p,z as f}from"./vendor.d9edd6b2.js";var e=Object.freeze,G=Object.defineProperty,u=(t,r)=>e(G(t,"raw",{value:e(r||t.slice())})),n;s("/src/pages/geometry/GridDataPlay.astro",{modules:[],hydratedComponents:[],hydrationDirectives:new Set([]),hoisted:[]});const b=l("/src/pages/geometry/GridDataPlay.astro","https://clinth.github.io/ixfx-docs/","file:///C:/Users/ch/Documents/Repos/ixfx-docs/");c(async(t,r,o)=>{const a=t.createAstro(b,r,o),d=[{props:{"data-astro-id":"KVE46UPP"},children:"#dataGrid.astro-KVE46UPP{--grid-color:var(--divider);--hover-color: var(--bg-contrast);}#dataGridSection.astro-KVE46UPP{display:flex;background-color:aliceblue;border:2px solid black;flex-direction:column;color:black;padding:1em;max-width:350px;margin:0 auto;align-items:center;}"}];for(const i of d)t.styles.add(i);return m(n||(n=u(['<html class="astro-KVE46UPP"><head><script type="module"',`><\/script>
<!-- <script type="module" src={Astro.resolve('./grid.ts')}><\/script> -->


<script type="module">
import {resolveEl,Forms} from 'ixfx/lib/dom';
import {Arrays} from 'ixfx/lib/collections';
import {Grids} from 'ixfx/lib/geometry';
import {DictionaryOfColourCombinations} from 'ixfx/lib/visual';
const dataGrid = resolveEl(\`#dataGrid\`);
const dataGridRead = resolveEl(\`#dataGridRead\`);
const dataGridStore = new Map();
const palette = DictionaryOfColourCombinations.randomPalette();

Forms.button(\`#btnDataRandom\`, () => randomGrid());
dataGrid.cellRenderer = (cell, rect, ctx) => {
  const d = dataGridStore.get(Grids.cellKeyString(cell));
  if (d === undefined) return;
  const [r, g, b] = d.colour;
  ctx.fillStyle = \`rgba(\${r}, \${g}, \${b}, \${d.funk})\`;
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

  const randomColour = () => Arrays.randomElement(palette).rgb;
  for (let cell of Grids.cells(shape)) {
    dataGridStore.set(Grids.cellKeyString(cell), {colour: randomColour(), funk: Math.random()});
  }
  dataGrid.draw();
}
randomGrid();
<\/script>
</head><body><section id="dataGridSection" class="astro-KVE46UPP">
  `,`
  <button id="btnDataRandom" class="astro-KVE46UPP">Randomise</button>
  <div id="dataGridRead" class="astro-KVE46UPP">&nbsp;</div>
</section>
</body></html>`],['<html class="astro-KVE46UPP"><head><script type="module"',`><\/script>
<!-- <script type="module" src={Astro.resolve('./grid.ts')}><\/script> -->


<script type="module">
import {resolveEl,Forms} from 'ixfx/lib/dom';
import {Arrays} from 'ixfx/lib/collections';
import {Grids} from 'ixfx/lib/geometry';
import {DictionaryOfColourCombinations} from 'ixfx/lib/visual';
const dataGrid = resolveEl(\\\`#dataGrid\\\`);
const dataGridRead = resolveEl(\\\`#dataGridRead\\\`);
const dataGridStore = new Map();
const palette = DictionaryOfColourCombinations.randomPalette();

Forms.button(\\\`#btnDataRandom\\\`, () => randomGrid());
dataGrid.cellRenderer = (cell, rect, ctx) => {
  const d = dataGridStore.get(Grids.cellKeyString(cell));
  if (d === undefined) return;
  const [r, g, b] = d.colour;
  ctx.fillStyle = \\\`rgba(\\\${r}, \\\${g}, \\\${b}, \\\${d.funk})\\\`;
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

  const randomColour = () => Arrays.randomElement(palette).rgb;
  for (let cell of Grids.cells(shape)) {
    dataGridStore.set(Grids.cellKeyString(cell), {colour: randomColour(), funk: Math.random()});
  }
  dataGrid.draw();
}
randomGrid();
<\/script>
</head><body><section id="dataGridSection" class="astro-KVE46UPP">
  `,`
  <button id="btnDataRandom" class="astro-KVE46UPP">Randomise</button>
  <div id="dataGridRead" class="astro-KVE46UPP">&nbsp;</div>
</section>
</body></html>`])),f(a.resolve("../../components/GridEditor.ts"),"src"),p(t,"grid-editor","grid-editor",{rows:"15",cols:"15",pixelSize:"20",id:"dataGrid",class:"astro-KVE46UPP"}))});
