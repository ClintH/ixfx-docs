import{g as P,f as T,R as D}from"./chunk-2OQPH7JM.baa0bd0a.js";import"./chunk-6IKSZCHO.71757621.js";import"./chunk-A3OQLAFF.9e3d5139.js";import"./chunk-EHKPP5SR.5374a9f6.js";import"./chunk-B7RHPX6D.163a8542.js";import{l as O}from"./chunk-TDKAXZAS.1af599a9.js";import"./chunk-QVRQKKRB.4ee1b7cb.js";import"./chunk-NP7XBFS5.4dc9bdd2.js";import"./chunk-FYQLQT42.b3fcc6fb.js";import"./chunk-LHJ7JM7H.7de6f0d4.js";import"./chunk-JBDRQ5KW.018a4769.js";import{d as w,h as d,a as S,b as C,c as x}from"./chunk-FQLUQVDZ.8e87cdc9.js";import{p as q,q as u,t as R,u as n,v as k,w as V,x as j,o as H,c as b,f as B}from"./vendor.92dd9f01.js";import"./ReplPad.7c4e6ae5.js";import{_ as i}from"./preload-helper.8b4a5925.js";var F=t=>{if(!(t==null||t==="undefined"))try{if(typeof t=="string"){if(t.length===0)return;const e=JSON.parse(t);if(!Array.isArray(e)){console.error("Histogram innerText should be JSON array");return}for(let r=0;r<e.length;r++){if(!Array.isArray(e[r])){console.error("Histogram array should consist of inner arrays");return}if(e[r].length!==2){console.error("Histogram inner arrays should consist of two elements");return}if(typeof e[r][0]!="string"){console.error(`First element of inner array should be a string (index ${r})`);return}if(typeof e[r][1]!="number"){console.error(`Second element of inner array should be a number (index ${r})`);return}}return e}}catch(e){console.log(t),console.error(e)}},o=class extends R{constructor(){super();this.data=[],this.showDataLabels=!0,this.height="100%",this.showXAxis=!0,this.json=void 0}connectedCallback(){this.hasAttribute("json")||this.setAttribute("json",this.innerText),super.connectedCallback()}barTemplate(t,e,r){const{percentage:a}=t,[m,p]=t.data,v=1,s=2,c=e+1,y=c+1,$=n`<div class="data">${p}</div>`,I=n`${m}`;return n`
    <div class="bar" style="grid-area: ${v} / ${c} / ${s} / ${y}">
      <div class="barTrack" style="height: ${(a??0)*100}%"></div>
      ${this.showDataLabels?$:""}
    </div>
    <div class="xAxisLabels" style="grid-area: ${v+2} / ${c} / ${s+2} / ${y}">
      ${this.showXAxis?I:""}
    </div>`}render(){if((this.data===void 0||this.data.length===0)&&this.json===void 0)return n``;const t=this.data??this.json,e=t.length,r=Math.max(...t.map(s=>s[1])),a=t.map(s=>({data:s,percentage:s[1]/r})),m=n`<div class="xAxis" style="grid-area: 2 / 1 / 3 / ${t.length+1}"></div>`,p=this.height?`height: ${this.height};`:"";return n`
    <style>
    div.chart {
      grid-template-columns: repeat(${t.length}, minmax(2px, 1fr));
    }
    </style>
    <div class="container" style="${p}">
      <div class="chart">
      ${k(a,s=>s.data[0],(s,c)=>this.barTemplate(s,c,e))}
        ${this.showXAxis?m:""}
      </div>
    </div>`}};w(o,"styles",q`
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
  `);d([u()],o.prototype,"data",2);d([u()],o.prototype,"showDataLabels",2);d([u()],o.prototype,"height",2);d([u()],o.prototype,"showXAxis",2);d([u({converter:F,type:Object})],o.prototype,"json",2);o=d([V("histogram-vis")],o);var h,M=class{constructor(t){w(this,"el"),S(this,h,void 0),this.el=t}setAutoSort(t){C(this,h,P(t))}clear(){this.el!==void 0&&(this.el.data=[])}dispose(){const t=this.el;t!==void 0&&t.remove()}update(t){if(this.el===void 0){console.warn("FrequencyHistogramPlot this.el undefined");return}x(this,h)!==void 0?this.el.data=x(this,h).call(this,t):this.el.data=[...t]}};h=new WeakMap;const l=O("#dataStream",{capacity:8,timestamp:!1}),g=T(),E=new M(document.getElementById("dataPlot"));E.setAutoSort("valueReverse");let f=200,_=0;g.addEventListener("change",()=>{E.update(g.toArray())});const A=()=>{l.log("Start"),l.log(),_=window.setInterval(()=>{f--;const t=D.weightedInteger(10).toString();g.add(t),l.log(t.toString()),f<=0&&L()},300)},L=()=>{_!==0&&(l.log("Stop"),l.log(),f=200,window.clearInterval(_))},X=()=>{g.clear(),l.log()};document.getElementById("btnStart").addEventListener("click",A);document.getElementById("btnStop").addEventListener("click",L);document.getElementById("btnClear").addEventListener("click",X);A();j("ZXNh1i",{name:"freq-letters",value:!0},async()=>(await Promise.all([i(()=>import("./hydration-support.9fbfdc3b.js"),["assets/hydration-support.9fbfdc3b.js","assets/vendor.92dd9f01.js"])]),await i(()=>import("./FreqLettersElement.d8b0db61.js"),["assets/FreqLettersElement.d8b0db61.js","assets/vendor.92dd9f01.js","assets/chunk-2OQPH7JM.baa0bd0a.js","assets/chunk-LHJ7JM7H.7de6f0d4.js","assets/chunk-FQLUQVDZ.8e87cdc9.js","assets/chunk-JBDRQ5KW.018a4769.js","assets/chunk-EHKPP5SR.5374a9f6.js","assets/chunk-FYQLQT42.b3fcc6fb.js","assets/chunk-6IKSZCHO.71757621.js","assets/chunk-A3OQLAFF.9e3d5139.js","assets/chunk-B7RHPX6D.163a8542.js","assets/chunk-QVRQKKRB.4ee1b7cb.js","assets/chunk-TDKAXZAS.1af599a9.js","assets/chunk-NP7XBFS5.4dc9bdd2.js","assets/styles.9b5dda15.js"]),()=>{}));H("Z12Vj7s",{name:"SidebarToggle",value:!0},async()=>{const[{default:t},{default:e}]=await Promise.all([i(()=>import("./SidebarToggle.ee22eb03.js"),["assets/SidebarToggle.ee22eb03.js","assets/vendor.92dd9f01.js"]),i(()=>import("./client.0befb80f.js"),["assets/client.0befb80f.js","assets/vendor.92dd9f01.js"])]);return(r,a)=>e(r)(t,{class:"astro-LPHCP5C4"},a)});b("ZDGmOb",{name:"TableOfContents",value:"(min-width: 50em)"},async()=>{const[{default:t},{default:e}]=await Promise.all([i(()=>import("./TableOfContents.bf0d35f0.js"),["assets/TableOfContents.bf0d35f0.js","assets/vendor.92dd9f01.js"]),i(()=>import("./client.0befb80f.js"),["assets/client.0befb80f.js","assets/vendor.92dd9f01.js"])]);return(r,a)=>e(r)(t,{headers:[{depth:2,slug:"usage",text:"Usage"},{depth:3,slug:"adding-and-clearing",text:"Adding and clearing"},{depth:3,slug:"working-with-frequency",text:"Working with frequency"},{depth:3,slug:"iterating",text:"Iterating"},{depth:3,slug:"custom-objects",text:"Custom objects"},{depth:2,slug:"examples",text:"Examples"},{depth:3,slug:"letter-frequency",text:"Letter frequency"}],class:"astro-LR56V2JR"},a)});B("1Gmxo9",{name:"ThemeToggleButton",value:!0},async()=>{const[{default:t},{default:e}]=await Promise.all([i(()=>import("./ThemeToggleButton.b2be24ee.js"),["assets/ThemeToggleButton.b2be24ee.js","assets/vendor.92dd9f01.js"]),i(()=>import("./client.0befb80f.js"),["assets/client.0befb80f.js","assets/vendor.92dd9f01.js"])]);return(r,a)=>e(r)(t,{class:"astro-KYEUEDYA"},a)});b("ZDGmOb",{name:"TableOfContents",value:"(max-width: 50em)"},async()=>{const[{default:t},{default:e}]=await Promise.all([i(()=>import("./TableOfContents.bf0d35f0.js"),["assets/TableOfContents.bf0d35f0.js","assets/vendor.92dd9f01.js"]),i(()=>import("./client.0befb80f.js"),["assets/client.0befb80f.js","assets/vendor.92dd9f01.js"])]);return(r,a)=>e(r)(t,{headers:[{depth:2,slug:"usage",text:"Usage"},{depth:3,slug:"adding-and-clearing",text:"Adding and clearing"},{depth:3,slug:"working-with-frequency",text:"Working with frequency"},{depth:3,slug:"iterating",text:"Iterating"},{depth:3,slug:"custom-objects",text:"Custom objects"},{depth:2,slug:"examples",text:"Examples"},{depth:3,slug:"letter-frequency",text:"Letter frequency"}],class:"astro-EDKM2WF4"},a)});
