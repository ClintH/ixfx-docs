var S=Object.defineProperty;var V=(s,t,e)=>t in s?S(s,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[t]=e;var h=(s,t,e)=>(V(s,typeof t!="symbol"?t+"":t,e),e);import"./loader.039e8a90.js";import{a as _,r as E,$ as m,g as $,b as g,o as D,c as P,f as T}from"./vendor.d6870787.js";import{e as R}from"./styles.8e3dc5e5.js";import"./chunk-AW5RWBWK.f5ac0da0.js";import{E as x}from"./chunk-ODBLOXCD.602f7099.js";import"./chunk-I3R3AECV.3528ce89.js";import"./chunk-AWXCQ245.1dcbd11a.js";import{b,C as y,D as I}from"./chunk-LZ7XWTRR.a62618b8.js";import"./chunk-3CYWIYMP.09a63feb.js";import"./chunk-4DU25RMK.d28002ea.js";import{G as v}from"./chunk-PUGMC3D4.b587e8b3.js";import"./chunk-7TKMEWX5.f8def376.js";import"./chunk-VFK4G76S.4e6d0279.js";import{f as O}from"./chunk-XYAFQIIV.7cd12906.js";import{_ as u}from"./preload-helper.8b4a5925.js";import"./chunk-FQLUQVDZ.7e80d7b0.js";var F=Object.defineProperty,L=Object.getOwnPropertyDescriptor,f=(s,t,e,i)=>{for(var n=i>1?void 0:i?L(t,e):t,o=s.length-1,a;o>=0;o--)(a=s[o])&&(n=(i?a(t,e,n):a(n))||n);return i&&n&&F(t,e,n),n};const w="func-plot-element";class d extends _{constructor(){super();h(this,"plotter");h(this,"func");h(this,"plotAnimationRunning",!1);this.animatedDraw=!1,this.xResolution=.05,this.collapsed=!1,this.classes={withBottom:!0},this.editable=!1,this.setFunctionByString("(x) => x - 1")}showWarning(t){if(t.length>0&&console.warn(t),this.shadowRoot===void 0||this.shadowRoot===null)return;const e=this.shadowRoot.getElementById("parseMsg");e!==null&&(e.innerText=t,t.length===0?e.style.display="none":e.style.display="block")}setFunctionByString(t){try{const e=new Function("x",`return ${t}`);this.func={text:t,fn:e},this.showWarning("")}catch(e){console.warn(e)}}setFunction(t,e){this.func={text:t,fn:e}}getValue(t){if(t===void 0)return 0;try{const e=this.func.fn(t);return this.showWarning(""),e}catch(e){return this.showWarning(e),0}}async plot(t){if(!this.hasUpdated)return;this.plotAnimationRunning=!0;let e=this.plotter;if(e===void 0){const n=this.shadowRoot.querySelector("#plot");if(n===null)throw new Error("#plot not found");const o={capacity:0,autoSizeCanvas:!1,digitsPrecision:1,y:{...b.defaultAxis("y"),scaleRange:[-.3,1.3],labelRange:[0,1],colour:y.getCssVariable("fg","gray")},x:{...b.defaultAxis("x"),showLine:!0,scaleRange:[0,1/this.xResolution]},plotSize:{width:100,height:100}};this.plotter=e=b.plot(n,o)}else e.clear();const i=v.numericPercent(this.xResolution);if(t)for await(const n of O.interval(i,100))e.add(this.getValue(n));else for(let n of i)e.add(this.getValue(n));this.plotAnimationRunning=!1}updated(t){super.updated(t),this.plot(this.animatedDraw),this.collapsed||this.demoMove()}demoOpacity(){if(this.collapsed)return;const t=v.numericPercent(.01);this.demoInit((e,i)=>{const n=t.next();let o=1;return n.done||(o=this.getValue(n.value)),o=Math.floor(o*100),i.fillStyle=`hsla(200,80%,50%,${o}%)`,i.fillRect(0,0,e.width,e.height),!n.done})}demoHue(){if(this.collapsed)return;const t=100,e=v.numericPercent(1/t);let i=0;this.demoInit((n,o,a)=>{const l=Math.floor(n.width/t),r=e.next();let c=1;return r.done||(c=this.getValue(r.value)),o.fillStyle=y.interpolate(c,"blue","red","hsl"),o.fillRect(i,0,l,n.height),i+=l,!r.done},!1)}demoSize(){if(this.collapsed)return;const t=v.numericPercent(.01),e=y.getCssVariable("yellow","yellow");this.demoInit((i,n)=>{const o=i.height-40,a={x:0,y:0,width:i.width,height:i.height},l=t.next();let r=1;return l.done||(r=this.getValue(l.value)),r=Math.floor(r*o),n.font=`${r}px serif`,n.fillStyle=e,I.textBlockAligned(n,["RELAX"],{bounds:a,horiz:"center",vert:"center"}),!l.done})}demoMove(){if(this.collapsed)return;const t=y.getCssVariable("yellow","yellow"),e=v.numericPercent(.01),i=10;this.demoInit((n,o)=>{o.fillStyle=t,o.beginPath();const a=n.width-4*i,l=e.next(),r=n.height/2-i/2;let c=1;l.done||(c=this.getValue(l.value));const p=i+i+c*a;return o.arc(p,r,i,0,Math.PI*2),o.fill(),!l.done})}demoInit(t,e=!0){if(this.collapsed)return;const i=this.shadowRoot.querySelector("#demoCanvas");if(i===null){console.error("#demoCanvas not found :(");return}const n=i.parentElement,o=n.getBoundingClientRect(),a=0,l={width:o.width-a-a,height:o.height-a-a};i.height=n.clientHeight,i.width=n.clientWidth;let r=0;const c=()=>{const p=i.getContext("2d");p.save(),p.translate(a,a),e&&p.clearRect(0,0,l.width,l.height);const A=t(l,p,r++);p.restore(),A&&window.requestAnimationFrame(c)};window.requestAnimationFrame(c)}connectedCallback(){super.connectedCallback(),document.addEventListener("visibilitychange",t=>{document.visibilityState==="visible"&&this.plot(!1)})}playPlot(){this.plotAnimationRunning||this.plot(!0)}fnEdit(t){const e=t.target;this.setFunctionByString(e.value),this.plot(!1)}renderEditable(){if(!this.editable)return m``;const t=this.func;return m`
    <div class="controls">
      <label for="txtFunc">Function</label>
      <input @input="${this.fnEdit}" id="txtFunc" type="text" value="${t.text}">
    </div>
    <div id="parseMsg" style="display:none">
      Some warning
    </div>
    `}render(){return this.collapsed?m`
      <canvas @click="${this.playPlot}" @pointerenter="${this.playPlot}" id="plot"></canvas>
      `:m`
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
  `]);f([g()],d.prototype,"classes",2);f([g({type:String})],d.prototype,"fn",2);f([g({type:Boolean})],d.prototype,"animatedDraw",2);f([g({type:Boolean})],d.prototype,"editable",2);f([g({attribute:!0,type:Boolean})],d.prototype,"collapsed",2);f([g({type:Number})],d.prototype,"xResolution",2);customElements.get(w)||customElements.define(w,d);const M="easing-gallery-element";class C extends _{constructor(){super()}updated(t){super.updated(t),this.shadowRoot.querySelectorAll("[data-easing]").forEach(e=>{const i=e.getAttribute("data-easing"),n=new d;n.collapsed=!0,n.setFunction(i,x.get(i)),e.appendChild(n)})}renderEasing(t){return m`
    <div data-easing="${t}" class="easing">
      <h1>${t}</h1>
    </div>
    `}render(){const t=[...x.getEasings()].sort();return m`
    <div id="container">
      ${t.map(e=>this.renderEasing(e))}
    </div>
    `}}h(C,"styles",[R,E`
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
    `]);customElements.define(M,C);importEl("easingGallery","easing-gallery-element",{});const z=()=>{document.querySelectorAll("[data-easing]").forEach(s=>{const t=document.createElement("func-plot-element");s.append(t);const e=s.getAttribute("fn"),i=s.getAttribute("easing"),n=s.getAttribute("editable");if(t.editable=n!=="false"&&n!==null,e!==null&&e.length>0)t.setFunctionByString(e);else if(i!==null&&i.length>0){const o=x.get(i);o===void 0?console.error(`Could not find easing: ${i}`):t.setFunction(i,o)}else console.warn("Neither fn or easing attributes defined for function plot.")})};setTimeout(()=>z(),10);D("Z12Vj7s",{name:"SidebarToggle",value:!0},async()=>{const[{default:s},{default:t}]=await Promise.all([u(()=>import("./SidebarToggle.3829f389.js"),["assets/SidebarToggle.3829f389.js","assets/vendor.d6870787.js"]),u(()=>import("./client.81b7a97f.js"),["assets/client.81b7a97f.js","assets/vendor.d6870787.js"])]);return(e,i)=>t(e)(s,{class:"astro-LPHCP5C4"},i)});P("Z19tYHH",{name:"TableOfContents",value:"(min-width: 50em)"},async()=>{const[{default:s},{default:t}]=await Promise.all([u(()=>import("./TableOfContents.a11bce0e.js"),["assets/TableOfContents.a11bce0e.js","assets/vendor.d6870787.js"]),u(()=>import("./client.81b7a97f.js"),["assets/client.81b7a97f.js","assets/vendor.d6870787.js"])]);return(e,i)=>t(e)(s,{headers:[{depth:2,slug:"usage",text:"Usage"},{depth:3,slug:"time-based",text:"Time-based"},{depth:3,slug:"tick-based",text:"Tick-based"},{depth:2,slug:"its-a-function",text:"It's a function"},{depth:2,slug:"demos",text:"Demos"},{depth:2,slug:"custom-curves",text:"Custom curves"},{depth:3,slug:"simple-cubic-beziers",text:"Simple cubic beziers"},{depth:2,slug:"defined-easings",text:"Defined easings"},{depth:2,slug:"credits",text:"Credits"}],class:"astro-LR56V2JR"},i)});T("1Gmxo9",{name:"ThemeToggleButton",value:!0},async()=>{const[{default:s},{default:t}]=await Promise.all([u(()=>import("./ThemeToggleButton.2eaeae2d.js"),["assets/ThemeToggleButton.2eaeae2d.js","assets/vendor.d6870787.js"]),u(()=>import("./client.81b7a97f.js"),["assets/client.81b7a97f.js","assets/vendor.d6870787.js"])]);return(e,i)=>t(e)(s,{class:"astro-64IQMT5R"},i)});P("Z19tYHH",{name:"TableOfContents",value:"(max-width: 50em)"},async()=>{const[{default:s},{default:t}]=await Promise.all([u(()=>import("./TableOfContents.a11bce0e.js"),["assets/TableOfContents.a11bce0e.js","assets/vendor.d6870787.js"]),u(()=>import("./client.81b7a97f.js"),["assets/client.81b7a97f.js","assets/vendor.d6870787.js"])]);return(e,i)=>t(e)(s,{headers:[{depth:2,slug:"usage",text:"Usage"},{depth:3,slug:"time-based",text:"Time-based"},{depth:3,slug:"tick-based",text:"Tick-based"},{depth:2,slug:"its-a-function",text:"It's a function"},{depth:2,slug:"demos",text:"Demos"},{depth:2,slug:"custom-curves",text:"Custom curves"},{depth:3,slug:"simple-cubic-beziers",text:"Simple cubic beziers"},{depth:2,slug:"defined-easings",text:"Defined easings"},{depth:2,slug:"credits",text:"Credits"}],class:"astro-EDKM2WF4"},i)});
