import{M as I,l as P,R as S,T as C}from"./chunk-GK535KVL.5ac52ed3.js";import{c as w,h as d,a as D,d as O,b as _}from"./chunk-OE2F6QKM.bc057148.js";import{q as k,t as u,u as q,v as n,w as R,x as V,o as j,c as b,f as H}from"./vendor.c33530a8.js";import"./ReplPad.22806fda.js";import{_ as i}from"./preload-helper.8b4a5925.js";var M=t=>{if(!(t==null||t==="undefined"))try{if(typeof t=="string"){if(t.length===0)return;const e=JSON.parse(t);if(!Array.isArray(e)){console.error("Histogram innerText should be JSON array");return}for(let r=0;r<e.length;r++){if(!Array.isArray(e[r])){console.error("Histogram array should consist of inner arrays");return}if(e[r].length!==2){console.error("Histogram inner arrays should consist of two elements");return}if(typeof e[r][0]!="string"){console.error(`First element of inner array should be a string (index ${r})`);return}if(typeof e[r][1]!="number"){console.error(`Second element of inner array should be a number (index ${r})`);return}}return e}}catch(e){console.log(t),console.error(e)}},o=class extends q{constructor(){super();this.data=[],this.showDataLabels=!0,this.height="100%",this.showXAxis=!0,this.json=void 0}connectedCallback(){this.hasAttribute("json")||this.setAttribute("json",this.innerText),super.connectedCallback()}barTemplate(t,e,r){const{percentage:s}=t,[m,p]=t.data,v=1,a=2,c=e+1,x=c+1,$=n`<div class="data">${p}</div>`,T=n`${m}`;return n`
    <div class="bar" style="grid-area: ${v} / ${c} / ${a} / ${x}">
      <div class="barTrack" style="height: ${(s??0)*100}%"></div>
      ${this.showDataLabels?$:""}
    </div>
    <div class="xAxisLabels" style="grid-area: ${v+2} / ${c} / ${a+2} / ${x}">
      ${this.showXAxis?T:""}
    </div>`}render(){if((this.data===void 0||this.data.length===0)&&this.json===void 0)return n``;const t=this.data??this.json,e=t.length,r=Math.max(...t.map(a=>a[1])),s=t.map(a=>({data:a,percentage:a[1]/r})),m=n`<div class="xAxis" style="grid-area: 2 / 1 / 3 / ${t.length+1}"></div>`,p=this.height?`height: ${this.height};`:"";return n`
    <style>
    div.chart {
      grid-template-columns: repeat(${t.length}, minmax(2px, 1fr));
    }
    </style>
    <div class="container" style="${p}">
      <div class="chart">
      ${R(s,a=>a.data[0],(a,c)=>this.barTemplate(a,c,e))}
        ${this.showXAxis?m:""}
      </div>
    </div>`}};w(o,"styles",k`
    :host {
    }
    div.container {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    div.chart {
      display: grid;
      flex: 1;
      grid-template-rows: 1fr 1px min-content;
      justify-items: center;
    }
    div.bar {
      display: flex;
      flex-direction: column-reverse;
      align-items: center;
      justify-self: normal;
      padding-left: 0.3vw;
      padding-right: 0.3vw;
    }
    div.bar>div.barTrack {
      background-color: var(--histogram-bar-color, gray);
      align-self: stretch;
    }
    div.xAxisLabels, div.data {
      font-size: min(1vw, 1em);
      color: var(--histogram-label-color, currentColor);
    }
    div.xAxisLabels {
      width: 100%;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      text-align: center;
    }
    div.xAxis {
      background-color: var(--histogram-axis-color, silver);
      width: 100%;
      height: 100%;
    }
  `);d([u()],o.prototype,"data",2);d([u()],o.prototype,"showDataLabels",2);d([u()],o.prototype,"height",2);d([u()],o.prototype,"showXAxis",2);d([u({converter:M,type:Object})],o.prototype,"json",2);o=d([V("histogram-vis")],o);var h,B=class{constructor(t){w(this,"el"),D(this,h,void 0),this.el=t}setAutoSort(t){O(this,h,I(t))}clear(){this.el!==void 0&&(this.el.data=[])}dispose(){const t=this.el;t!==void 0&&t.remove()}update(t){if(this.el===void 0){console.warn("FrequencyHistogramPlot this.el undefined");return}_(this,h)!==void 0?this.el.data=_(this,h).call(this,t):this.el.data=[...t]}};h=new WeakMap;const l=P("#dataStream",{capacity:8,timestamp:!1}),g=S(),A=new B(document.getElementById("dataPlot"));A.setAutoSort("valueReverse");let f=200,y=0;g.addEventListener("change",()=>{A.update(g.toArray())});const E=()=>{l.log("Start"),l.log(),y=window.setInterval(()=>{f--;const t=C.weightedInteger(10).toString();g.add(t),l.log(t.toString()),f<=0&&L()},300)},L=()=>{y!==0&&(l.log("Stop"),l.log(),f=200,window.clearInterval(y))},F=()=>{g.clear(),l.log()};document.getElementById("btnStart").addEventListener("click",E);document.getElementById("btnStop").addEventListener("click",L);document.getElementById("btnClear").addEventListener("click",F);E();j("Z12Vj7s",{name:"SidebarToggle",value:!0},async()=>{const[{default:t},{default:e}]=await Promise.all([i(()=>import("./SidebarToggle.56e22446.js"),["assets/SidebarToggle.56e22446.js","assets/vendor.c33530a8.js"]),i(()=>import("./client.5775b4b4.js"),["assets/client.5775b4b4.js","assets/vendor.c33530a8.js"])]);return(r,s)=>e(r)(t,{class:"astro-LPHCP5C4"},s)});b("ZDGmOb",{name:"TableOfContents",value:"(min-width: 50em)"},async()=>{const[{default:t},{default:e}]=await Promise.all([i(()=>import("./TableOfContents.cbf2b999.js"),["assets/TableOfContents.cbf2b999.js","assets/vendor.c33530a8.js"]),i(()=>import("./client.5775b4b4.js"),["assets/client.5775b4b4.js","assets/vendor.c33530a8.js"])]);return(r,s)=>e(r)(t,{headers:[{depth:2,slug:"usage",text:"Usage"},{depth:3,slug:"adding-and-clearing",text:"Adding and clearing"},{depth:3,slug:"working-with-frequency",text:"Working with frequency"},{depth:3,slug:"iterating",text:"Iterating"},{depth:3,slug:"custom-objects",text:"Custom objects"},{depth:2,slug:"examples",text:"Examples"},{depth:3,slug:"letter-frequency",text:"Letter frequency"}],class:"astro-LR56V2JR"},s)});H("1Gmxo9",{name:"ThemeToggleButton",value:!0},async()=>{const[{default:t},{default:e}]=await Promise.all([i(()=>import("./ThemeToggleButton.e921e3eb.js"),["assets/ThemeToggleButton.e921e3eb.js","assets/vendor.c33530a8.js"]),i(()=>import("./client.5775b4b4.js"),["assets/client.5775b4b4.js","assets/vendor.c33530a8.js"])]);return(r,s)=>e(r)(t,{class:"astro-64IQMT5R"},s)});b("ZDGmOb",{name:"TableOfContents",value:"(max-width: 50em)"},async()=>{const[{default:t},{default:e}]=await Promise.all([i(()=>import("./TableOfContents.cbf2b999.js"),["assets/TableOfContents.cbf2b999.js","assets/vendor.c33530a8.js"]),i(()=>import("./client.5775b4b4.js"),["assets/client.5775b4b4.js","assets/vendor.c33530a8.js"])]);return(r,s)=>e(r)(t,{headers:[{depth:2,slug:"usage",text:"Usage"},{depth:3,slug:"adding-and-clearing",text:"Adding and clearing"},{depth:3,slug:"working-with-frequency",text:"Working with frequency"},{depth:3,slug:"iterating",text:"Iterating"},{depth:3,slug:"custom-objects",text:"Custom objects"},{depth:2,slug:"examples",text:"Examples"},{depth:3,slug:"letter-frequency",text:"Letter frequency"}],class:"astro-EDKM2WF4"},s)});
