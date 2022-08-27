var S=Object.defineProperty;var V=(o,e,t)=>e in o?S(o,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[e]=t;var p=(o,e,t)=>(V(o,typeof e!="symbol"?e+"":e,t),t);import"./loader.039e8a90.js";import{a as _,r as E,$ as g,g as $,b as m,o as D,c as P,f as T}from"./vendor.c33530a8.js";import{e as R}from"./styles.801fcc34.js";import{h as b,e as y,p as v,q as I,D as O,E as x}from"./chunk-GK535KVL.5ac52ed3.js";import"./chunk-OE2F6QKM.bc057148.js";import{_ as u}from"./preload-helper.8b4a5925.js";var F=Object.defineProperty,L=Object.getOwnPropertyDescriptor,f=(o,e,t,i)=>{for(var n=i>1?void 0:i?L(e,t):e,s=o.length-1,a;s>=0;s--)(a=o[s])&&(n=(i?a(e,t,n):a(n))||n);return i&&n&&F(e,t,n),n};const w="func-plot-element";class d extends _{constructor(){super();p(this,"plotter");p(this,"func");p(this,"plotAnimationRunning",!1);this.animatedDraw=!1,this.xResolution=.05,this.collapsed=!1,this.classes={withBottom:!0},this.editable=!1,this.setFunctionByString("(x) => x - 1")}showWarning(e){if(e.length>0&&console.warn(e),this.shadowRoot===void 0||this.shadowRoot===null)return;const t=this.shadowRoot.getElementById("parseMsg");t!==null&&(t.innerText=e,e.length===0?t.style.display="none":t.style.display="block")}setFunctionByString(e){try{const t=new Function("x",`return ${e}`);this.func={text:e,fn:t},this.showWarning("")}catch(t){console.warn(t)}}setFunction(e,t){this.func={text:e,fn:t}}getValue(e){if(e===void 0)return 0;try{const t=this.func.fn(e);return this.showWarning(""),t}catch(t){return this.showWarning(t),0}}async plot(e){if(!this.hasUpdated)return;this.plotAnimationRunning=!0;let t=this.plotter;if(t===void 0){const n=this.shadowRoot.querySelector("#plot");if(n===null)throw new Error("#plot not found");const s={capacity:0,autoSizeCanvas:!1,digitsPrecision:1,defaultSeriesVariable:"accent",y:{...b.defaultAxis("y"),scaleRange:[-.3,1.3],labelRange:[0,1],colour:y.getCssVariable("fg","gray")},x:{...b.defaultAxis("x"),showLine:!0,scaleRange:[0,1/this.xResolution]},plotSize:{width:100,height:100}};this.plotter=t=b.plot(n,s)}else t.clear();const i=v.numericPercent(this.xResolution);if(e)for await(const n of I.interval(i,100))t.add(this.getValue(n));else for(let n of i)t.add(this.getValue(n));this.plotAnimationRunning=!1}updated(e){super.updated(e),this.plot(this.animatedDraw),this.collapsed||this.demoMove()}demoOpacity(){if(this.collapsed)return;const e=v.numericPercent(.01);this.demoInit((t,i)=>{const n=e.next();let s=1;return n.done||(s=this.getValue(n.value)),s=Math.floor(s*100),i.fillStyle=`hsla(200,80%,50%,${s}%)`,i.fillRect(0,0,t.width,t.height),!n.done})}demoHue(){if(this.collapsed)return;const e=100,t=v.numericPercent(1/e);let i=0;this.demoInit((n,s,a)=>{const l=Math.floor(n.width/e),r=t.next();let c=1;return r.done||(c=this.getValue(r.value)),s.fillStyle=y.interpolate(c,"blue","red","hsl"),s.fillRect(i,0,l,n.height),i+=l,!r.done},!1)}demoSize(){if(this.collapsed)return;const e=v.numericPercent(.01),t=y.getCssVariable("yellow","yellow");this.demoInit((i,n)=>{const s=i.height-40,a={x:0,y:0,width:i.width,height:i.height},l=e.next();let r=1;return l.done||(r=this.getValue(l.value)),r=Math.floor(r*s),n.font=`${r}px serif`,n.fillStyle=t,O.textBlockAligned(n,["RELAX"],{bounds:a,horiz:"center",vert:"center"}),!l.done})}demoMove(){if(this.collapsed)return;const e=y.getCssVariable("yellow","yellow"),t=v.numericPercent(.01),i=10;this.demoInit((n,s)=>{s.fillStyle=e,s.beginPath();const a=n.width-4*i,l=t.next(),r=n.height/2-i/2;let c=1;l.done||(c=this.getValue(l.value));const h=i+i+c*a;return s.arc(h,r,i,0,Math.PI*2),s.fill(),!l.done})}demoInit(e,t=!0){if(this.collapsed)return;const i=this.shadowRoot.querySelector("#demoCanvas");if(i===null){console.error("#demoCanvas not found :(");return}const n=i.parentElement,s=n.getBoundingClientRect(),a=0,l={width:s.width-a-a,height:s.height-a-a};i.height=n.clientHeight,i.width=n.clientWidth;let r=0;const c=()=>{const h=i.getContext("2d");h.save(),h.translate(a,a),t&&h.clearRect(0,0,l.width,l.height);const A=e(l,h,r++);h.restore(),A&&window.requestAnimationFrame(c)};window.requestAnimationFrame(c)}connectedCallback(){super.connectedCallback(),document.addEventListener("visibilitychange",e=>{document.visibilityState==="visible"&&this.plot(!1)})}playPlot(){this.plotAnimationRunning||this.plot(!0)}fnEdit(e){const t=e.target;this.setFunctionByString(t.value),this.plot(!1)}renderEditable(){if(!this.editable)return g``;const e=this.func;return g`
    <div class="controls">
      <label for="txtFunc">Function</label>
      <input @input="${this.fnEdit}" id="txtFunc" type="text" value="${e.text}">
    </div>
    <div id="parseMsg" style="display:none">
      Some warning
    </div>
    `}render(){return this.collapsed?g`
      <canvas @click="${this.playPlot}" @pointerenter="${this.playPlot}" id="plot"></canvas>
      `:g`
      <div id="container" class=${$(this.classes)}>
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
      `}}p(d,"styles",[R,E`
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
  `]);f([m()],d.prototype,"classes",2);f([m({type:String})],d.prototype,"fn",2);f([m({type:Boolean})],d.prototype,"animatedDraw",2);f([m({type:Boolean})],d.prototype,"editable",2);f([m({attribute:!0,type:Boolean})],d.prototype,"collapsed",2);f([m({type:Number})],d.prototype,"xResolution",2);customElements.get(w)||customElements.define(w,d);const M="easing-gallery-element";class C extends _{constructor(){super()}updated(e){super.updated(e),this.shadowRoot.querySelectorAll("[data-easing]").forEach(t=>{const i=t.getAttribute("data-easing"),n=new d;n.collapsed=!0,n.setFunction(i,x.get(i)),t.appendChild(n)})}renderEasing(e){return g`
    <div data-easing="${e}" class="easing">
      <h1>${e}</h1>
    </div>
    `}render(){const e=[...x.getEasings()].sort();return g`
    <div id="container">
      ${e.map(t=>this.renderEasing(t))}
    </div>
    `}}p(C,"styles",[R,E`
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
    `]);customElements.define(M,C);importEl("easingGallery","easing-gallery-element",{});const z=()=>{document.querySelectorAll("[data-easing]").forEach(o=>{const e=document.createElement("func-plot-element");o.append(e);const t=o.getAttribute("fn"),i=o.getAttribute("easing"),n=o.getAttribute("editable");if(e.editable=n!=="false"&&n!==null,t!==null&&t.length>0)e.setFunctionByString(t);else if(i!==null&&i.length>0){const s=x.get(i);s===void 0?console.error(`Could not find easing: ${i}`):e.setFunction(i,s)}else console.warn("Neither fn or easing attributes defined for function plot.")})};setTimeout(()=>z(),10);D("Z12Vj7s",{name:"SidebarToggle",value:!0},async()=>{const[{default:o},{default:e}]=await Promise.all([u(()=>import("./SidebarToggle.56e22446.js"),["assets/SidebarToggle.56e22446.js","assets/vendor.c33530a8.js"]),u(()=>import("./client.5775b4b4.js"),["assets/client.5775b4b4.js","assets/vendor.c33530a8.js"])]);return(t,i)=>e(t)(o,{class:"astro-LPHCP5C4"},i)});P("Z19tYHH",{name:"TableOfContents",value:"(min-width: 50em)"},async()=>{const[{default:o},{default:e}]=await Promise.all([u(()=>import("./TableOfContents.cbf2b999.js"),["assets/TableOfContents.cbf2b999.js","assets/vendor.c33530a8.js"]),u(()=>import("./client.5775b4b4.js"),["assets/client.5775b4b4.js","assets/vendor.c33530a8.js"])]);return(t,i)=>e(t)(o,{headers:[{depth:2,slug:"usage",text:"Usage"},{depth:3,slug:"time-based",text:"Time-based"},{depth:3,slug:"tick-based",text:"Tick-based"},{depth:2,slug:"its-a-function",text:"It's a function"},{depth:2,slug:"demos",text:"Demos"},{depth:2,slug:"custom-curves",text:"Custom curves"},{depth:3,slug:"simple-cubic-beziers",text:"Simple cubic beziers"},{depth:2,slug:"defined-easings",text:"Defined easings"},{depth:2,slug:"credits",text:"Credits"}],class:"astro-LR56V2JR"},i)});T("1Gmxo9",{name:"ThemeToggleButton",value:!0},async()=>{const[{default:o},{default:e}]=await Promise.all([u(()=>import("./ThemeToggleButton.e921e3eb.js"),["assets/ThemeToggleButton.e921e3eb.js","assets/vendor.c33530a8.js"]),u(()=>import("./client.5775b4b4.js"),["assets/client.5775b4b4.js","assets/vendor.c33530a8.js"])]);return(t,i)=>e(t)(o,{class:"astro-64IQMT5R"},i)});P("Z19tYHH",{name:"TableOfContents",value:"(max-width: 50em)"},async()=>{const[{default:o},{default:e}]=await Promise.all([u(()=>import("./TableOfContents.cbf2b999.js"),["assets/TableOfContents.cbf2b999.js","assets/vendor.c33530a8.js"]),u(()=>import("./client.5775b4b4.js"),["assets/client.5775b4b4.js","assets/vendor.c33530a8.js"])]);return(t,i)=>e(t)(o,{headers:[{depth:2,slug:"usage",text:"Usage"},{depth:3,slug:"time-based",text:"Time-based"},{depth:3,slug:"tick-based",text:"Tick-based"},{depth:2,slug:"its-a-function",text:"It's a function"},{depth:2,slug:"demos",text:"Demos"},{depth:2,slug:"custom-curves",text:"Custom curves"},{depth:3,slug:"simple-cubic-beziers",text:"Simple cubic beziers"},{depth:2,slug:"defined-easings",text:"Defined easings"},{depth:2,slug:"credits",text:"Credits"}],class:"astro-EDKM2WF4"},i)});
