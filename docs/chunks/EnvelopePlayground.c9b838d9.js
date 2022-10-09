import{i as E,a as m,b as I,c as k,f as h,g as O,o as $,h as S,m as R,j as T}from"../client-shim.d2daba34.js";import{d as b,D as L,C as D,B as A,c as q,l as F,P as g,a as _,F as d,r as j}from"./chunk-GT5YUDV6.83942b61.js";import"./chunk-X4RNBMU5.3ea1d229.js";import{e as C}from"./styles.292fc193.js";var N=Object.defineProperty,V=Object.getOwnPropertyDescriptor,v=(e,t,s,a)=>{for(var i=a>1?void 0:a?V(t,s):t,n=e.length-1,r;n>=0;n--)(r=e[n])&&(i=(a?r(t,s,i):r(i))||i);return a&&i&&N(t,s,i),i};const z=e=>{if(!(e===null||typeof e>"u"||e==="undefined"))try{if(typeof e=="string")return e.length===0?void 0:JSON.parse(e)}catch(t){console.log(e),console.error(t)}};let c=class extends k{static styles=[C];attackPreview;constructor(){super();this.data=b(),this.json=void 0}connectedCallback(){this.hasAttribute("json")||this.setAttribute("json",this.innerText),super.connectedCallback()}onChanged(){const e=new CustomEvent("change",{bubbles:!0,composed:!0,detail:this.data});this.dispatchEvent(e)}_durationInput(e){const t=e.target,s=t.value,a=parseInt(s);switch(t.id){case"attackDuration":this.data={...this.data,attackDuration:a};break;case"decayDuration":this.data={...this.data,decayDuration:a};break;case"releaseDuration":this.data={...this.data,releaseDuration:a};break}this.onChanged()}_bendInput(e){const t=e.target,s=t.value,a=parseFloat(s)/100;switch(t.id){case"attackBend":this.data={...this.data,attackBend:a};break;case"decayBend":this.data={...this.data,decayBend:a};break;case"releaseBend":this.data={...this.data,releaseBend:a}}this.onChanged()}_valueInput(e){const t=e.target,s=t.value,a=parseFloat(s)/100;switch(t.id){case"initialValue":this.data={...this.data,initialLevel:a};break;case"peakLevel":this.data={...this.data,peakLevel:a};break;case"sustainLevel":this.data={...this.data,sustainLevel:a};break;case"releaseLevel":this.data={...this.data,releaseLevel:a};break}this.onChanged()}renderPreviews(){if(this.data===void 0)return;const e=this.data;this.renderPreview("attackPreview",e.attackBend,e.initialLevel,e.peakLevel),this.renderPreview("decayPreview",e.decayBend,e.peakLevel,e.sustainLevel),this.renderPreview("releasePreview",e.releaseBend,e.sustainLevel,e.releaseLevel);const{ctx:t,width:s,height:a}=this.setupCtx("sustainPreview"),i=e.sustainLevel??1;t!==void 0&&(L.line(t,{a:{x:0,y:(1-i)*a},b:{x:s,y:(1-i)*a}}),t.resetTransform())}setupCtx(e){const t=this.shadowRoot?.getElementById(e);if(t===null)return console.warn(`Canvas ${e} not found`),{ctx:void 0,width:0,padding:0,height:0};const s=t.getContext("2d");if(s===null)return console.warn(`Canvas ctx could not be created for ${e}`),{ctx:void 0,width:0,padding:0,height:0};const a=4,i=100,n=100;return s.clearRect(0,0,i,n),s.strokeStyle=D.getCssVariable("accent-bold","yellow"),s.lineWidth=3,s.translate(a/2,a/2),{ctx:s,padding:a,width:i-a-a,height:n-a-a}}renderPreview(e,t,s,a){t===void 0&&(t=0),s===void 0&&(s=0),a===void 0&&(a=1);const{ctx:i,width:n,height:r}=this.setupCtx(e);if(i===void 0)return;const B=A.quadraticBend({x:0,y:(1-s)*r},{x:n,y:(1-a)*r},t);L.bezier(i,B),i.resetTransform()}async updated(){this.renderPreviews()}_reset(){this.data=b(),this.requestUpdate()}_copy(){q(this.data)}render(){if(this.data===void 0)return h`<div>(undefined envelope)</div>`;const e=this.data;return h`
<div class="container">
<div id="preview">
</div>  
<div class="controls wrappable">
  <div class="vertical">
    <h2>Attack</h2>
    <canvas title="Preview of attack stage" id="attackPreview" width="100" height="100"></canvas>
    <label>Duration: ${e.attackDuration} ms
      <input @input="${this._durationInput}" .value="${e.attackDuration}" type="range" id="attackDuration" min="0" max="5000">
    </label>
    <label>Bend: ${e.attackBend}
      <input @input="${this._bendInput}" .value="${e.attackBend*100}" type="range" id="attackBend" min="-100" max="100">
    </label>
    <label>Initial: ${e.initialLevel}
      <input @input="${this._valueInput}" .value=${e.initialLevel*100} type="range" id="initialValue" min="0" max="100">
    </label>
  </div>
  <div class="vertical">
    <h2>Decay</h2>
    <canvas title="Preview of decay stage" id="decayPreview" width="100" height="100"></canvas>
    <label>Duration: ${e.decayDuration} ms
      <input @input="${this._durationInput}" .value="${e.decayDuration}" type="range" id="decayDuration" min="0" max="5000">
    </label>
    <label>Bend: ${e.decayBend}
      <input @input="${this._bendInput}" .value="${e.decayBend*100}" type="range" id="decayBend" min="-100" max="100">
    </label>
    <label>Peak: ${e.peakLevel}
      <input @input="${this._valueInput}" .value="${e.peakLevel*100}" type="range" id="peakLevel" min="0" max="100">
    </label>
  </div>
  <div class="vertical">
    <h2>Sustain</h2>
    <canvas title="Preview of sustain stage" id="sustainPreview" width="100" height="100"></canvas>
    <label>Level: ${e.sustainLevel}
      <input @input="${this._valueInput}" .value="${e.sustainLevel*100}" type="range" id="sustainLevel" min="0" max="100">
    </label>
  </div>
  <div class="vertical">
    <h2>Release</h2>
    <canvas title="Preview of release stage" id="releasePreview" width="100" height="100"></canvas>
    <label>Duration: ${e.releaseDuration} ms
      <input @input="${this._durationInput}" .value="${e.releaseDuration}" type="range" id="releaseDuration" min="0" max="5000">
    </label>
    <label>Bend: ${e.releaseBend}
      <input @input="${this._bendInput}" .value="${e.releaseBend*100}" type="range" id="releaseBend" min="-100" max="100">
    </label>
    <label>Release: ${e.releaseLevel}
      <input @input="${this._valueInput}" .value="${e.releaseLevel*100}" type="range" id="releaseLevel" min="0" max="100">
    </label>
  </div>
</div>
<div class="toolbar centered mini">
  <button title="Reset envelope to starting state" @click="${this._reset}">Reset</button>
  <button title="Copy envelope data to clipboard" @click="${this._copy}">Copy envelope</button>
</div>
</div>`}};v([E("#attackPreview")],c.prototype,"attackPreview",2);v([m()],c.prototype,"data",2);v([m({converter:z,type:Object})],c.prototype,"json",2);c=v([I("envelope-editor")],c);var U=Object.defineProperty,W=Object.getOwnPropertyDescriptor,H=(e,t,s,a)=>{for(var i=a>1?void 0:a?W(t,s):t,n=e.length-1,r;n>=0;n--)(r=e[n])&&(i=(a?r(t,s,i):r(i))||i);return a&&i&&U(t,s,i),i};const J="log-element";class P extends k{logger;logContainer;static styles=[C,O`
    :host>div {
      display: flex;
    }
    #stream {
      // overflow-y: auto;
      flex-grow: 1;
      max-height: 15em;
    }
    #stream:not(.expanded) {
      max-height: 3.5em;
    }
    .toolbar.empty {
      display: none;
    }
    `];constructor(){super();this.logger=null,this.logContainer=null}init(){this.logContainer===null&&(this.logContainer=this.shadowRoot.querySelector("#stream"),this.logContainer!==null&&(this.logger=F(this.logContainer,{minIntervalMs:20,capacity:150})))}error(t){this.init(),this.logger!==null?(this.logger.error(t),this.updateLog()):console.error(t)}clear(){this.logger!==null&&(this.logger.clear(),this.requestUpdate(),this.updateLog())}log(t){this.init(),this.logger!==null?(this.logger.log(t),this.updateLog()):console.log(t)}toggleExpand(){this.expanded=!this.expanded}updateLog(){const t=this.shadowRoot.querySelector(".toolbar");t!==null&&(this.isEmpty?t.classList.add("empty"):t.classList.remove("empty"))}get isEmpty(){return this.init(),this.logger!==null?this.logger.isEmpty:!0}renderTools(){return h`
    <button title="${this.expanded?"Collapse":"Expand"} log" @click=${this.toggleExpand}> ${this.expanded?"-":"+"}</button>
    <button title="Clear log" @click=${this.clear}>C</button>
    `}render(){const t={expanded:this.expanded};return h`
      <div class=${$(t)}>
        <div class=${$(t)} id="stream"></div>
        <div class="toolbar empty vertical mini">
          ${this.renderTools()}
        </div>
      </div>
        `}}H([m({type:Boolean})],P.prototype,"expanded",2);customElements.define(J,P);const o=document.getElementById("envDataLog"),y=g.plot("#envData",{capacity:300,defaultSeriesVariable:"accent",x:{...g.defaultAxis("x"),showLine:!1},y:{...g.defaultAxis("y"),showLine:!1,colour:D.getCssVariable("fg","grey")},lineWidth:3,autoSizeCanvas:!0,debug:!1});let f=!1,w={...b(),attackBend:1,decayBend:-1,releaseBend:1},l=_({...w,shouldLoop:f});l.addEventListener("change",e=>{d.button("#btnRelease").disabled=e.newState!=="sustain"});d.button("#btnTriggerHold",()=>{o.clear(),l.trigger(!0),p()});d.button("#btnRelease",()=>{l.release()});d.button("#btnTrigger",()=>{o.clear(),l.trigger(),p()});const M=d.select("#selectShow",e=>{y.clear(),o.log(""),p()});S(j("#envEditor"),"change").pipe(R(e=>e.detail),T(1e3)).subscribe(e=>{w=e,x()});const x=()=>{try{l=_({...w,shouldLoop:f}),l.trigger(),o.clear(),y.clear(),p()}catch(e){o.error(e)}};d.checkbox("#chkLooping",e=>{f=e,x()});let u=!1;const p=()=>{if(u)return;const e=function(){let[t,s,a]=l.compute();if(a<0)debugger;if(t===void 0){u=!1;return}const i=M.value==="raw"?a:s;y.add(i),o.log(`${t} ${i.toFixed(3)}`),l.isDone?(console.log("Envelope done"),u=!1):(u=!0,window.requestAnimationFrame(e))};window.requestAnimationFrame(e)};x();
