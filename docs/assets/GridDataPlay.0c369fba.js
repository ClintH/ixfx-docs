import{c,a as l,b as p,r as m,d as b,e as a}from"./index.b3ac69b0.js";var s=Object.freeze,h=Object.defineProperty,v=(e,t)=>s(h(e,"raw",{value:s(t||e.slice())})),o;const f=c("/src/pages/geometry/GridDataPlay.astro",{modules:[],hydratedComponents:[],hydrationDirectives:new Set([]),hoisted:[]}),y=l("/src/pages/geometry/GridDataPlay.astro","https://clinth.github.io/ixfx-docs/","file:///C:/Users/ch/Documents/Repos/ixfx-docs/"),g=p(async(e,t,d)=>{const r=e.createAstro(y,t,d),i=[{props:{"data-astro-id":"HZNHKAMO"},children:"#dataGrid.astro-HZNHKAMO{--grid-color:var(--theme-divider);--hover-color: var(--theme-bg-hover);}#dataGridSection.astro-HZNHKAMO{display:flex;background-color:aliceblue;border:2px solid black;flex-direction:column;color:black;padding:1em;max-width:350px;margin:0 auto;align-items:center;}"}];for(const n of i)e.styles.add(n);return m(o||(o=v(['<html class="astro-HZNHKAMO"><head><link rel="stylesheet"',`>
<script type="module"`,`><\/script>
<script type="module"`,`><\/script>


</head><body><section id="dataGridSection" class="astro-HZNHKAMO">
  `,`
  <button id="btnDataRandom" class="astro-HZNHKAMO">Randomise</button>
  <div id="dataGridRead" class="astro-HZNHKAMO">&nbsp;</div>
</section>
</body></html>`])),a(r.resolve("../../styles/demos.css"),"href"),a(r.resolve("../../components/GridEditor.ts"),"src"),a(r.resolve("./grid.ts"),"src"),b(e,"grid-editor","grid-editor",{rows:"15",cols:"15",pixelSize:"20",id:"dataGrid",class:"astro-HZNHKAMO"}))});export{f as $$metadata,g as default};
