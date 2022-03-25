import"./chunks/loader.c806e4ef.js";import{b,r as x,$ as p,o as P,a as h}from"./client-shim.cda72367.js";import{e as E}from"./chunks/styles.b557ca03.js";import"./chunks/chunk-PHF3FPUO.fbbc39e3.js";import{E as v}from"./chunks/chunk-QIWUQGQJ.e6594f26.js";import"./chunks/chunk-XFTV7E35.542cf193.js";import"./chunks/chunk-U4IZE4J2.68fe18db.js";import{P as y,C as m,D as R}from"./chunks/chunk-TSWQ4JT6.e4dc2800.js";import"./chunks/chunk-QAZYUFOI.8a9663bc.js";import"./chunks/chunk-DTRNDG6C.d0f370a4.js";import{G as g}from"./chunks/chunk-HYVQIQVS.ac4108eb.js";import"./chunks/chunk-OMXZMOOU.e9ad33f4.js";import"./chunks/chunk-SJVFW73P.e7d5b176.js";import{f as $}from"./chunks/chunk-HGDBKEIQ.5ba97fe9.js";import"./chunks/chunk-FQLUQVDZ.735c98e3.js";var A=Object.defineProperty,C=Object.getOwnPropertyDescriptor,f=(r,t,e,i)=>{for(var n=i>1?void 0:i?C(t,e):t,o=r.length-1,s;o>=0;o--)(s=r[o])&&(n=(i?s(t,e,n):s(n))||n);return i&&n&&A(t,e,n),n};const w="func-plot-element";class d extends b{static styles=[E,x`
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
  `];plotter;func;constructor(){super();this.animatedDraw=!1,this.xResolution=.05,this.collapsed=!1,this.classes={withBottom:!0},this.editable=!1,this.setFunctionByString("(x) => x - 1")}showWarning(t){if(t.length>0&&console.warn(t),this.shadowRoot===void 0||this.shadowRoot===null)return;const e=this.shadowRoot.getElementById("parseMsg");e!==null&&(e.innerText=t,t.length===0?e.style.display="none":e.style.display="block")}setFunctionByString(t){try{const e=new Function("x",`return ${t}`);this.func={text:t,fn:e},this.showWarning("")}catch(e){console.warn(e)}}setFunction(t,e){this.func={text:t,fn:e}}getValue(t){if(t===void 0)return 0;try{const e=this.func.fn(t);return this.showWarning(""),e}catch(e){return this.showWarning(e),0}}async plot(t){if(!this.hasUpdated)return;this.plotAnimationRunning=!0;let e=this.plotter;if(e===void 0){const n=this.shadowRoot.querySelector("#plot");if(n===null)throw new Error("#plot not found");const o={capacity:0,autoSizeCanvas:!1,digitsPrecision:1,y:{...y.defaultAxis("y"),scaleRange:[-.3,1.3],labelRange:[0,1],colour:m.getCssVariable("fg","gray")},x:{...y.defaultAxis("x"),showLine:!0,scaleRange:[0,1/this.xResolution]},plotSize:{width:100,height:100}};this.plotter=e=y.plot(n,o)}else e.clear();const i=g.rangePercent(this.xResolution);if(t)for await(const n of $.interval(i,100))e.add(this.getValue(n));else for(let n of i)e.add(this.getValue(n));this.plotAnimationRunning=!1}updated(t){super.updated(t),this.plot(this.animatedDraw),this.collapsed||this.demoMove()}demoOpacity(){if(this.collapsed)return;const t=g.rangePercent(.01);this.demoInit((e,i)=>{const n=t.next();let o=1;return n.done||(o=this.getValue(n.value)),o=Math.floor(o*100),i.fillStyle=`hsla(200,80%,50%,${o}%)`,i.fillRect(0,0,e.width,e.height),!n.done})}demoHue(){if(this.collapsed)return;const t=100,e=g.rangePercent(1/t);let i=0;this.demoInit((n,o,s)=>{const l=Math.floor(n.width/t),a=e.next();let c=1;return a.done||(c=this.getValue(a.value)),o.fillStyle=m.interpolate(c,"blue","red","hsl"),o.fillRect(i,0,l,n.height),i+=l,!a.done},!1)}demoSize(){if(this.collapsed)return;const t=g.rangePercent(.01),e=m.getCssVariable("yellow","yellow");this.demoInit((i,n)=>{const o=i.height-40,s={x:0,y:0,width:i.width,height:i.height},l=t.next();let a=1;return l.done||(a=this.getValue(l.value)),a=Math.floor(a*o),n.font=`${a}px serif`,n.fillStyle=e,R.textBlockAligned(n,["RELAX"],{bounds:s,horiz:"center",vert:"center"}),!l.done})}demoMove(){if(this.collapsed)return;const t=m.getCssVariable("yellow","yellow"),e=g.rangePercent(.01),i=10;this.demoInit((n,o)=>{o.fillStyle=t,o.beginPath();const s=n.width-4*i,l=e.next(),a=n.height/2-i/2;let c=1;l.done||(c=this.getValue(l.value));const u=i+i+c*s;return o.arc(u,a,i,0,Math.PI*2),o.fill(),!l.done})}demoInit(t,e=!0){if(this.collapsed)return;const i=this.shadowRoot.querySelector("#demoCanvas");if(i===null){console.error("#demoCanvas not found :(");return}const n=i.parentElement,o=n.getBoundingClientRect(),s=0,l={width:o.width-s-s,height:o.height-s-s};i.height=n.clientHeight,i.width=n.clientWidth;let a=0;const c=()=>{const u=i.getContext("2d");u.save(),u.translate(s,s),e&&u.clearRect(0,0,l.width,l.height);const S=t(l,u,a++);u.restore(),S&&window.requestAnimationFrame(c)};window.requestAnimationFrame(c)}connectedCallback(){super.connectedCallback(),document.addEventListener("visibilitychange",t=>{document.visibilityState==="visible"&&this.plot(!1)})}plotAnimationRunning=!1;playPlot(){this.plotAnimationRunning||this.plot(!0)}fnEdit(t){const e=t.target;this.setFunctionByString(e.value),this.plot(!1)}renderEditable(){if(!this.editable)return p``;const t=this.func;return p`
    <div class="controls">
      <label for="txtFunc">Function</label>
      <input @input="${this.fnEdit}" id="txtFunc" type="text" value="${t.text}">
    </div>
    <div id="parseMsg" style="display:none">
      Some warning
    </div>
    `}render(){return this.collapsed?p`
      <canvas @click="${this.playPlot}" @pointerenter="${this.playPlot}" id="plot"></canvas>
      `:p`
      <div id="container" class=${P(this.classes)}>
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
      `}}f([h()],d.prototype,"classes",2);f([h({type:String})],d.prototype,"fn",2);f([h({type:Boolean})],d.prototype,"animatedDraw",2);f([h({type:Boolean})],d.prototype,"editable",2);f([h({attribute:!0,type:Boolean})],d.prototype,"collapsed",2);f([h({type:Number})],d.prototype,"xResolution",2);customElements.get(w)||customElements.define(w,d);const F="easing-gallery-element";class B extends b{static styles=[E,x`
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
    `];constructor(){super()}updated(t){super.updated(t),this.shadowRoot.querySelectorAll("[data-easing]").forEach(e=>{const i=e.getAttribute("data-easing"),n=new d;n.collapsed=!0,n.setFunction(i,v.get(i)),e.appendChild(n)})}renderEasing(t){return p`
    <div data-easing="${t}" class="easing">
      <h1>${t}</h1>
    </div>
    `}render(){const t=[...v.getEasings()].sort();return p`
    <div id="container">
      ${t.map(e=>this.renderEasing(e))}
    </div>
    `}}customElements.define(F,B);importEl("easingGallery","easing-gallery-element",{});const M=()=>{document.querySelectorAll("[data-easing]").forEach(r=>{const t=document.createElement("func-plot-element");r.append(t);const e=r.getAttribute("fn"),i=r.getAttribute("easing"),n=r.getAttribute("editable");if(t.editable=n!=="false"&&n!==null,e!==null&&e.length>0)t.setFunctionByString(e);else if(i!==null&&i.length>0){const o=v.get(i);o===void 0?console.error(`Could not find easing: ${i}`):t.setFunction(i,o)}else console.warn("Neither fn or easing attributes defined for function plot.")})};setTimeout(()=>M(),10);
