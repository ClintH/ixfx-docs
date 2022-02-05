import{q as l,t as c,u as m,v as p,w as f,x as n}from"./vendor.ae2f83e2.js";var o=Object.freeze,G=Object.defineProperty,u=(t,r)=>o(G(t,"raw",{value:o(r||t.slice())})),a;l("/src/pages/geometry/GridDataPlay.astro",{modules:[],hydratedComponents:[],hydrationDirectives:new Set([]),hoisted:[]});const y=c("/src/pages/geometry/GridDataPlay.astro","https://clinth.github.io/ixfx-docs/","file:///C:/Users/ch/Documents/Repos/ixfx-docs/");m(async(t,r,d)=>{const e=t.createAstro(y,r,d),i=[{props:{"data-astro-id":"EACUI2QC"},children:"#dataGrid.astro-EACUI2QC{--grid-color:var(--theme-divider);--hover-color: var(--theme-bg-hover);}#dataGridSection.astro-EACUI2QC{display:flex;background-color:aliceblue;border:2px solid black;flex-direction:column;color:black;padding:1em;max-width:350px;margin:0 auto;align-items:center;}"}];for(const s of i)t.styles.add(s);return p(a||(a=u(['<html class="astro-EACUI2QC"><head><link rel="stylesheet"',`>
<script type="module"`,`><\/script>
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
</head><body><section id="dataGridSection" class="astro-EACUI2QC">
  `,`
  <button id="btnDataRandom" class="astro-EACUI2QC">Randomise</button>
  <div id="dataGridRead" class="astro-EACUI2QC">&nbsp;</div>
</section>
</body></html>`],['<html class="astro-EACUI2QC"><head><link rel="stylesheet"',`>
<script type="module"`,`><\/script>
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
</head><body><section id="dataGridSection" class="astro-EACUI2QC">
  `,`
  <button id="btnDataRandom" class="astro-EACUI2QC">Randomise</button>
  <div id="dataGridRead" class="astro-EACUI2QC">&nbsp;</div>
</section>
</body></html>`])),n(e.resolve("../../styles/demos.css"),"href"),n(e.resolve("../../components/GridEditor.ts"),"src"),f(t,"grid-editor","grid-editor",{rows:"15",cols:"15",pixelSize:"20",id:"dataGrid",class:"astro-EACUI2QC"}))});
