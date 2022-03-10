var S=Object.defineProperty;var D=(s,t,e)=>t in s?S(s,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[t]=e;var h=(s,t,e)=>(D(s,typeof t!="symbol"?t+"":t,e),e);import"./loader.039e8a90.js";import{a as _,r as E,$ as g,g as V,b as m,o as $,c as P,f as T}from"./vendor.92dd9f01.js";import{e as R}from"./styles.9b5dda15.js";import{E as w}from"./chunk-EHKPP5SR.5374a9f6.js";import"./chunk-FYQLQT42.b3fcc6fb.js";import"./chunk-LHJ7JM7H.7de6f0d4.js";import"./chunk-JBDRQ5KW.018a4769.js";import{b,C as y,D as I}from"./chunk-A3OQLAFF.9e3d5139.js";import"./chunk-B7RHPX6D.163a8542.js";import"./chunk-QVRQKKRB.4ee1b7cb.js";import{G as v}from"./chunk-2OQPH7JM.baa0bd0a.js";import"./chunk-6IKSZCHO.71757621.js";import"./chunk-TDKAXZAS.1af599a9.js";import{f as B}from"./chunk-NP7XBFS5.4dc9bdd2.js";import{_ as u}from"./preload-helper.8b4a5925.js";import"./chunk-FQLUQVDZ.8e87cdc9.js";var O=Object.defineProperty,F=Object.getOwnPropertyDescriptor,f=(s,t,e,n)=>{for(var i=n>1?void 0:n?F(t,e):t,o=s.length-1,a;o>=0;o--)(a=s[o])&&(i=(n?a(t,e,i):a(i))||i);return n&&i&&O(t,e,i),i};const x="func-plot-element";class d extends _{constructor(){super();h(this,"plotter");h(this,"func");h(this,"plotAnimationRunning",!1);this.animatedDraw=!1,this.xResolution=.05,this.collapsed=!1,this.classes={withBottom:!0},this.editable=!1,this.setFunctionByString("(x) => x - 1")}showWarning(t){if(t.length>0&&console.warn(t),this.shadowRoot===void 0||this.shadowRoot===null)return;const e=this.shadowRoot.getElementById("parseMsg");e!==null&&(e.innerText=t,t.length===0?e.style.display="none":e.style.display="block")}setFunctionByString(t){try{const e=new Function("x",`return ${t}`);this.func={text:t,fn:e},this.showWarning("")}catch(e){console.warn(e)}}setFunction(t,e){this.func={text:t,fn:e}}getValue(t){if(t===void 0)return 0;try{const e=this.func.fn(t);return this.showWarning(""),e}catch(e){return this.showWarning(e),0}}async plot(t){if(!this.hasUpdated)return;this.plotAnimationRunning=!0;let e=this.plotter;if(e===void 0){const i=this.shadowRoot.querySelector("#plot");if(i===null)throw new Error("#plot not found");const o={capacity:0,autoSizeCanvas:!1,digitsPrecision:1,y:{...b.defaultAxis("y"),scaleRange:[-.3,1.3],labelRange:[0,1],colour:y.getCssVariable("fg","gray")},x:{...b.defaultAxis("x"),showLine:!0,scaleRange:[0,1/this.xResolution]},plotSize:{width:100,height:100}};this.plotter=e=b.plot(i,o)}else e.clear();const n=v.rangePercent(this.xResolution);if(t)for await(const i of B.interval(n,100))e.add(this.getValue(i));else for(let i of n)e.add(this.getValue(i));this.plotAnimationRunning=!1}updated(t){super.updated(t),this.plot(this.animatedDraw),this.collapsed||this.demoMove()}demoOpacity(){if(this.collapsed)return;const t=v.rangePercent(.01);this.demoInit((e,n)=>{const i=t.next();let o=1;return i.done||(o=this.getValue(i.value)),o=Math.floor(o*100),n.fillStyle=`hsla(200,80%,50%,${o}%)`,n.fillRect(0,0,e.width,e.height),!i.done})}demoHue(){if(this.collapsed)return;const t=100,e=v.rangePercent(1/t);let n=0;this.demoInit((i,o,a)=>{const l=Math.floor(i.width/t),r=e.next();let c=1;return r.done||(c=this.getValue(r.value)),o.fillStyle=y.interpolate(c,"blue","red","hsl"),o.fillRect(n,0,l,i.height),n+=l,!r.done},!1)}demoSize(){if(this.collapsed)return;const t=v.rangePercent(.01),e=y.getCssVariable("yellow","yellow");this.demoInit((n,i)=>{const o=n.height-40,a={x:0,y:0,width:n.width,height:n.height},l=t.next();let r=1;return l.done||(r=this.getValue(l.value)),r=Math.floor(r*o),i.font=`${r}px serif`,i.fillStyle=e,I.textBlockAligned(i,["RELAX"],{bounds:a,horiz:"center",vert:"center"}),!l.done})}demoMove(){if(this.collapsed)return;const t=y.getCssVariable("yellow","yellow"),e=v.rangePercent(.01),n=10;this.demoInit((i,o)=>{o.fillStyle=t,o.beginPath();const a=i.width-4*n,l=e.next(),r=i.height/2-n/2;let c=1;l.done||(c=this.getValue(l.value));const p=n+n+c*a;return o.arc(p,r,n,0,Math.PI*2),o.fill(),!l.done})}demoInit(t,e=!0){if(this.collapsed)return;const n=this.shadowRoot.querySelector("#demoCanvas");if(n===null){console.error("#demoCanvas not found :(");return}const i=n.parentElement,o=i.getBoundingClientRect(),a=0,l={width:o.width-a-a,height:o.height-a-a};n.height=i.clientHeight,n.width=i.clientWidth;let r=0;const c=()=>{const p=n.getContext("2d");p.save(),p.translate(a,a),e&&p.clearRect(0,0,l.width,l.height);const C=t(l,p,r++);p.restore(),C&&window.requestAnimationFrame(c)};window.requestAnimationFrame(c)}connectedCallback(){super.connectedCallback(),document.addEventListener("visibilitychange",t=>{document.visibilityState==="visible"&&this.plot(!1)})}playPlot(){this.plotAnimationRunning||this.plot(!0)}fnEdit(t){const e=t.target;this.setFunctionByString(e.value),this.plot(!1)}renderEditable(){if(!this.editable)return g``;const t=this.func;return g`
    <div class="controls">
      <label for="txtFunc">Function</label>
      <input @input="${this.fnEdit}" id="txtFunc" type="text" value="${t.text}">
    </div>
    <div id="parseMsg" style="display:none">
      Some warning
    </div>
    `}render(){return this.collapsed?g`
      <canvas @click="${this.playPlot}" @pointerenter="${this.playPlot}" id="plot"></canvas>
      `:g`
      <div id="container" class=${V(this.classes)}>
        <div class="plotContainer">
          ${this.renderEditable()}
          <canvas @click="${this.playPlot}" @pointerenter="${this.playPlot}" id="plot"></canvas>
        </div>
        <div class="vertical mini toolbar">
          <button @click="${this.demoMove}">Move</button>
          <button @click="${this.demoOpacity}">Opacity</button>
          <button @click="${this.demoSize}">Size</button>
          <button @click="${this.demoHue}">Hue</button>
        </div>
        <div id="demo"><canvas id="demoCanvas"></div>
      </div> 
      `}}h(d,"styles",[R,E`
      #container {
        display: flex;
      }
      #plot {
      }
      #demo {
        flex-grow: 1;
      }
      #demoCanvas {
        position: absolute;
      }
      .plotContainer {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .controls {
        flex-direction: column;
        margin-bottom: 0.5em;
      }
      .controls input {
        font-family: var(--font-mono);
      }
      #parseMsg {
        position: absolute;
        border-radius: 0.2em;
        margin-top: 2em;
        background: var(--bg-mono);
        padding: 0.3em;  
      }
  `]);f([m()],d.prototype,"classes",2);f([m({type:String})],d.prototype,"fn",2);f([m({type:Boolean})],d.prototype,"animatedDraw",2);f([m({type:Boolean})],d.prototype,"editable",2);f([m({attribute:!0,type:Boolean})],d.prototype,"collapsed",2);f([m({type:Number})],d.prototype,"xResolution",2);customElements.get(x)||customElements.define(x,d);const L="easing-gallery-element";class A extends _{constructor(){super()}updated(t){super.updated(t),this.shadowRoot.querySelectorAll("[data-easing]").forEach(e=>{const n=e.getAttribute("data-easing"),i=new d;i.collapsed=!0,i.setFunction(n,w.get(n)),e.appendChild(i)})}renderEasing(t){return g`
    <div data-easing="${t}" class="easing">
      <h1>${t}</h1>
    </div>
    `}render(){const t=[...w.getEasings()].sort();return g`
    <div id="container">
      ${t.map(e=>this.renderEasing(e))}
    </div>
    `}}h(A,"styles",[R,E`
    .controls .vertical {
      align-items: left;
    }
    .easing {
      display: flex;
      padding: 0.3em;
      margin: 0.3em;
      min-width: 7em;
      min-height: 7em;
      flex-direction: column;
      overflow: hidden;
    }
    .easing h1 {
      font-size: 1em;
    }
    #container {
      display: flex;
      flex-wrap: wrap;
    }
    func-plot-element {
    }
    `]);customElements.define(L,A);importEl("easingGallery","easing-gallery-element",{});const M=()=>{document.querySelectorAll("[data-easing]").forEach(s=>{const t=document.createElement("func-plot-element");s.append(t);const e=s.getAttribute("fn"),n=s.getAttribute("easing"),i=s.getAttribute("editable");if(t.editable=i!=="false"&&i!==null,e!==null&&e.length>0)t.setFunctionByString(e);else if(n!==null&&n.length>0){const o=w.get(n);o===void 0?console.error(`Could not find easing: ${n}`):t.setFunction(n,o)}else console.warn("Neither fn or easing attributes defined for function plot.")})};setTimeout(()=>M(),10);$("Z12Vj7s",{name:"SidebarToggle",value:!0},async()=>{const[{default:s},{default:t}]=await Promise.all([u(()=>import("./SidebarToggle.ee22eb03.js"),["assets/SidebarToggle.ee22eb03.js","assets/vendor.92dd9f01.js"]),u(()=>import("./client.0befb80f.js"),["assets/client.0befb80f.js","assets/vendor.92dd9f01.js"])]);return(e,n)=>t(e)(s,{class:"astro-LPHCP5C4"},n)});P("2t9B5B",{name:"TableOfContents",value:"(min-width: 50em)"},async()=>{const[{default:s},{default:t}]=await Promise.all([u(()=>import("./TableOfContents.bf0d35f0.js"),["assets/TableOfContents.bf0d35f0.js","assets/vendor.92dd9f01.js"]),u(()=>import("./client.0befb80f.js"),["assets/client.0befb80f.js","assets/vendor.92dd9f01.js"])]);return(e,n)=>t(e)(s,{headers:[{depth:2,slug:"usage",text:"Usage"},{depth:3,slug:"time-based",text:"Time-based"},{depth:3,slug:"tick-based",text:"Tick-based"},{depth:2,slug:"its-a-function",text:"It's a function"},{depth:2,slug:"demos",text:"Demos"},{depth:2,slug:"defined-easings",text:"Defined easings"},{depth:2,slug:"credits",text:"Credits"}],class:"astro-LR56V2JR"},n)});T("1Gmxo9",{name:"ThemeToggleButton",value:!0},async()=>{const[{default:s},{default:t}]=await Promise.all([u(()=>import("./ThemeToggleButton.b2be24ee.js"),["assets/ThemeToggleButton.b2be24ee.js","assets/vendor.92dd9f01.js"]),u(()=>import("./client.0befb80f.js"),["assets/client.0befb80f.js","assets/vendor.92dd9f01.js"])]);return(e,n)=>t(e)(s,{class:"astro-KYEUEDYA"},n)});P("2t9B5B",{name:"TableOfContents",value:"(max-width: 50em)"},async()=>{const[{default:s},{default:t}]=await Promise.all([u(()=>import("./TableOfContents.bf0d35f0.js"),["assets/TableOfContents.bf0d35f0.js","assets/vendor.92dd9f01.js"]),u(()=>import("./client.0befb80f.js"),["assets/client.0befb80f.js","assets/vendor.92dd9f01.js"])]);return(e,n)=>t(e)(s,{headers:[{depth:2,slug:"usage",text:"Usage"},{depth:3,slug:"time-based",text:"Time-based"},{depth:3,slug:"tick-based",text:"Tick-based"},{depth:2,slug:"its-a-function",text:"It's a function"},{depth:2,slug:"demos",text:"Demos"},{depth:2,slug:"defined-easings",text:"Defined easings"},{depth:2,slug:"credits",text:"Credits"}],class:"astro-EDKM2WF4"},n)});
