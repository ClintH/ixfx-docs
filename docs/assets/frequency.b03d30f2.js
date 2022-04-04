import{g as $,f as P}from"./chunk-PUGMC3D4.b587e8b3.js";import"./chunk-LZ7XWTRR.a62618b8.js";import"./chunk-AW5RWBWK.f5ac0da0.js";import{a0 as D}from"./chunk-ODBLOXCD.602f7099.js";import"./chunk-7TKMEWX5.f8def376.js";import"./chunk-3CYWIYMP.09a63feb.js";import{l as O}from"./chunk-VFK4G76S.4e6d0279.js";import"./chunk-4DU25RMK.d28002ea.js";import"./chunk-XYAFQIIV.7cd12906.js";import"./chunk-I3R3AECV.3528ce89.js";import"./chunk-AWXCQ245.1dcbd11a.js";import{a as w,h as d,b as S,d as C,c as x}from"./chunk-FQLUQVDZ.7e80d7b0.js";import{p as q,q as u,t as R,u as n,v as k,w as V,x as j,o as H,c as b,f as B}from"./vendor.d6870787.js";import"./ReplPad.72cc829a.js";import{_ as o}from"./preload-helper.8b4a5925.js";var M=t=>{if(!(t==null||t==="undefined"))try{if(typeof t=="string"){if(t.length===0)return;const e=JSON.parse(t);if(!Array.isArray(e)){console.error("Histogram innerText should be JSON array");return}for(let r=0;r<e.length;r++){if(!Array.isArray(e[r])){console.error("Histogram array should consist of inner arrays");return}if(e[r].length!==2){console.error("Histogram inner arrays should consist of two elements");return}if(typeof e[r][0]!="string"){console.error(`First element of inner array should be a string (index ${r})`);return}if(typeof e[r][1]!="number"){console.error(`Second element of inner array should be a number (index ${r})`);return}}return e}}catch(e){console.log(t),console.error(e)}},i=class extends R{constructor(){super();this.data=[],this.showDataLabels=!0,this.height="100%",this.showXAxis=!0,this.json=void 0}connectedCallback(){this.hasAttribute("json")||this.setAttribute("json",this.innerText),super.connectedCallback()}barTemplate(t,e,r){const{percentage:a}=t,[g,p]=t.data,v=1,s=2,c=e+1,y=c+1,I=n`<div class="data">${p}</div>`,T=n`${g}`;return n`
    <div class="bar" style="grid-area: ${v} / ${c} / ${s} / ${y}">
      <div class="barTrack" style="height: ${(a??0)*100}%"></div>
      ${this.showDataLabels?I:""}
    </div>
    <div class="xAxisLabels" style="grid-area: ${v+2} / ${c} / ${s+2} / ${y}">
      ${this.showXAxis?T:""}
    </div>`}render(){if((this.data===void 0||this.data.length===0)&&this.json===void 0)return n``;const t=this.data??this.json,e=t.length,r=Math.max(...t.map(s=>s[1])),a=t.map(s=>({data:s,percentage:s[1]/r})),g=n`<div class="xAxis" style="grid-area: 2 / 1 / 3 / ${t.length+1}"></div>`,p=this.height?`height: ${this.height};`:"";return n`
    <style>
    div.chart {
      grid-template-columns: repeat(${t.length}, minmax(2px, 1fr));
    }
    </style>
    <div class="container" style="${p}">
      <div class="chart">
      ${k(a,s=>s.data[0],(s,c)=>this.barTemplate(s,c,e))}
        ${this.showXAxis?g:""}
      </div>
    </div>`}};w(i,"styles",q`
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
  `);d([u()],i.prototype,"data",2);d([u()],i.prototype,"showDataLabels",2);d([u()],i.prototype,"height",2);d([u()],i.prototype,"showXAxis",2);d([u({converter:M,type:Object})],i.prototype,"json",2);i=d([V("histogram-vis")],i);var h,F=class{constructor(t){w(this,"el"),S(this,h,void 0),this.el=t}setAutoSort(t){C(this,h,$(t))}clear(){this.el!==void 0&&(this.el.data=[])}dispose(){const t=this.el;t!==void 0&&t.remove()}update(t){if(this.el===void 0){console.warn("FrequencyHistogramPlot this.el undefined");return}x(this,h)!==void 0?this.el.data=x(this,h).call(this,t):this.el.data=[...t]}};h=new WeakMap;const l=O("#dataStream",{capacity:8,timestamp:!1}),m=P(),E=new F(document.getElementById("dataPlot"));E.setAutoSort("valueReverse");let f=200,_=0;m.addEventListener("change",()=>{E.update(m.toArray())});const A=()=>{l.log("Start"),l.log(),_=window.setInterval(()=>{f--;const t=D.weightedInteger(10).toString();m.add(t),l.log(t.toString()),f<=0&&L()},300)},L=()=>{_!==0&&(l.log("Stop"),l.log(),f=200,window.clearInterval(_))},G=()=>{m.clear(),l.log()};document.getElementById("btnStart").addEventListener("click",A);document.getElementById("btnStop").addEventListener("click",L);document.getElementById("btnClear").addEventListener("click",G);A();j("ZaJEN4",{name:"freq-letters",value:!0},async()=>(await Promise.all([o(()=>import("./hydration-support.051a0d6f.js"),["assets/hydration-support.051a0d6f.js","assets/vendor.d6870787.js"])]),await o(()=>import("./FreqLettersElement.b7cfde89.js"),["assets/FreqLettersElement.b7cfde89.js","assets/vendor.d6870787.js","assets/chunk-PUGMC3D4.b587e8b3.js","assets/chunk-ODBLOXCD.602f7099.js","assets/chunk-FQLUQVDZ.7e80d7b0.js","assets/chunk-AWXCQ245.1dcbd11a.js","assets/chunk-3CYWIYMP.09a63feb.js","assets/chunk-7TKMEWX5.f8def376.js","assets/chunk-I3R3AECV.3528ce89.js","assets/chunk-LZ7XWTRR.a62618b8.js","assets/chunk-4DU25RMK.d28002ea.js","assets/chunk-AW5RWBWK.f5ac0da0.js","assets/chunk-VFK4G76S.4e6d0279.js","assets/chunk-XYAFQIIV.7cd12906.js","assets/styles.8e3dc5e5.js"]),()=>{}));H("Z12Vj7s",{name:"SidebarToggle",value:!0},async()=>{const[{default:t},{default:e}]=await Promise.all([o(()=>import("./SidebarToggle.3829f389.js"),["assets/SidebarToggle.3829f389.js","assets/vendor.d6870787.js"]),o(()=>import("./client.81b7a97f.js"),["assets/client.81b7a97f.js","assets/vendor.d6870787.js"])]);return(r,a)=>e(r)(t,{class:"astro-LPHCP5C4"},a)});b("ZDGmOb",{name:"TableOfContents",value:"(min-width: 50em)"},async()=>{const[{default:t},{default:e}]=await Promise.all([o(()=>import("./TableOfContents.a11bce0e.js"),["assets/TableOfContents.a11bce0e.js","assets/vendor.d6870787.js"]),o(()=>import("./client.81b7a97f.js"),["assets/client.81b7a97f.js","assets/vendor.d6870787.js"])]);return(r,a)=>e(r)(t,{headers:[{depth:2,slug:"usage",text:"Usage"},{depth:3,slug:"adding-and-clearing",text:"Adding and clearing"},{depth:3,slug:"working-with-frequency",text:"Working with frequency"},{depth:3,slug:"iterating",text:"Iterating"},{depth:3,slug:"custom-objects",text:"Custom objects"},{depth:2,slug:"examples",text:"Examples"},{depth:3,slug:"letter-frequency",text:"Letter frequency"}],class:"astro-LR56V2JR"},a)});B("1Gmxo9",{name:"ThemeToggleButton",value:!0},async()=>{const[{default:t},{default:e}]=await Promise.all([o(()=>import("./ThemeToggleButton.2eaeae2d.js"),["assets/ThemeToggleButton.2eaeae2d.js","assets/vendor.d6870787.js"]),o(()=>import("./client.81b7a97f.js"),["assets/client.81b7a97f.js","assets/vendor.d6870787.js"])]);return(r,a)=>e(r)(t,{class:"astro-64IQMT5R"},a)});b("ZDGmOb",{name:"TableOfContents",value:"(max-width: 50em)"},async()=>{const[{default:t},{default:e}]=await Promise.all([o(()=>import("./TableOfContents.a11bce0e.js"),["assets/TableOfContents.a11bce0e.js","assets/vendor.d6870787.js"]),o(()=>import("./client.81b7a97f.js"),["assets/client.81b7a97f.js","assets/vendor.d6870787.js"])]);return(r,a)=>e(r)(t,{headers:[{depth:2,slug:"usage",text:"Usage"},{depth:3,slug:"adding-and-clearing",text:"Adding and clearing"},{depth:3,slug:"working-with-frequency",text:"Working with frequency"},{depth:3,slug:"iterating",text:"Iterating"},{depth:3,slug:"custom-objects",text:"Custom objects"},{depth:2,slug:"examples",text:"Examples"},{depth:3,slug:"letter-frequency",text:"Letter frequency"}],class:"astro-EDKM2WF4"},a)});
