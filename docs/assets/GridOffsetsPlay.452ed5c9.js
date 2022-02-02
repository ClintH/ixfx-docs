import{c as d,a as l,b as p,r as f,d as m,e as o}from"./index.b3ac69b0.js";var r=Object.freeze,h=Object.defineProperty,v=(s,e)=>r(h(s,"raw",{value:r(e||s.slice())})),a;const D=d("/src/pages/geometry/GridOffsetsPlay.astro",{modules:[],hydratedComponents:[],hydrationDirectives:new Set([]),hoisted:[]}),G=l("/src/pages/geometry/GridOffsetsPlay.astro","https://clinth.github.io/ixfx-docs/","file:///C:/Users/ch/Documents/Repos/ixfx-docs/"),T=p(async(s,e,n)=>{const t=s.createAstro(G,e,n),i=[{props:{"data-astro-id":"DG263STB"},children:"#offsetsGrid.astro-DG263STB{--grid-color:var(--theme-divider);--hover-color: var(--theme-bg-hover);}"}];for(const c of i)s.styles.add(c);return f(a||(a=v(['<html class="astro-DG263STB"><head><link rel="stylesheet"',`>
<script type="module"`,`><\/script>
<script type="module"`,`><\/script>

</head><body><div class="toolbar astro-DG263STB">
  <section class="astro-DG263STB">
    <label class="astro-DG263STB">Bounds:</label>
    <select id="selOffsetsWrap" title="How should coordinate wrapping behave?" class="astro-DG263STB">
      <option class="astro-DG263STB">stop</option>
      <option class="astro-DG263STB">wrap</option>
      <option class="astro-DG263STB">undefined</option>
    </select>
  </section>
  <section class="astro-DG263STB">
    <label class="astro-DG263STB">Distance:</label>
    <input title="Coordinate distance" type="range" id="rangeOffsetsDistance" value="2" min="1" max="5" class="astro-DG263STB">
  </section>
</div>
<div class="astro-DG263STB">
  `,`
</div></body></html>`])),o(t.resolve("../../styles/demos.css"),"href"),o(t.resolve("../../components/GridEditor.ts"),"src"),o(t.resolve("./grid.ts"),"src"),m(s,"grid-editor","grid-editor",{rows:"10",cols:"10",pixelSize:"30",id:"offsetsGrid",class:"astro-DG263STB"}))});export{D as $$metadata,T as default};
