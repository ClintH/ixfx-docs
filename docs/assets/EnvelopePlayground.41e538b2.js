var O=Object.defineProperty;var S=(e,t,i)=>t in e?O(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i;var o=(e,t,i)=>(S(e,typeof t!="symbol"?t+"":t,i),i);import{i as R,b as y,n as T,a as C,$ as v,r as A,g as D,h as q,m as F,j}from"./vendor.c33530a8.js";import{f,D as _,e as P,B as N,g as V,l as z,h as b,i as B,F as c,j as U}from"./chunk-GK535KVL.5ac52ed3.js";import"./chunk-OE2F6QKM.bc057148.js";import{e as E}from"./styles.801fcc34.js";var W=Object.defineProperty,H=Object.getOwnPropertyDescriptor,p=(e,t,i,a)=>{for(var s=a>1?void 0:a?H(t,i):t,n=e.length-1,r;n>=0;n--)(r=e[n])&&(s=(a?r(t,i,s):r(s))||s);return a&&s&&W(t,i,s),s};const J=e=>{if(!(e===null||typeof e>"u"||e==="undefined"))try{if(typeof e=="string")return e.length===0?void 0:JSON.parse(e)}catch(t){console.log(e),console.error(t)}};var m;let u=(m=class extends C{constructor(){super();o(this,"attackPreview");this.data=f(),this.json=void 0}connectedCallback(){this.hasAttribute("json")||this.setAttribute("json",this.innerText),super.connectedCallback()}onChanged(){const e=new CustomEvent("change",{bubbles:!0,composed:!0,detail:this.data});this.dispatchEvent(e)}_durationInput(e){const t=e.target,i=t.value,a=parseInt(i);switch(t.id){case"attackDuration":this.data={...this.data,attackDuration:a};break;case"decayDuration":this.data={...this.data,decayDuration:a};break;case"releaseDuration":this.data={...this.data,releaseDuration:a};break}this.onChanged()}_bendInput(e){const t=e.target,i=t.value,a=parseFloat(i)/100;switch(t.id){case"attackBend":this.data={...this.data,attackBend:a};break;case"decayBend":this.data={...this.data,decayBend:a};break;case"releaseBend":this.data={...this.data,releaseBend:a}}this.onChanged()}_valueInput(e){const t=e.target,i=t.value,a=parseFloat(i)/100;switch(t.id){case"initialValue":this.data={...this.data,initialLevel:a};break;case"peakLevel":this.data={...this.data,peakLevel:a};break;case"sustainLevel":this.data={...this.data,sustainLevel:a};break;case"releaseLevel":this.data={...this.data,releaseLevel:a};break}this.onChanged()}renderPreviews(){if(this.data===void 0)return;const e=this.data;this.renderPreview("attackPreview",e.attackBend,e.initialLevel,e.peakLevel),this.renderPreview("decayPreview",e.decayBend,e.peakLevel,e.sustainLevel),this.renderPreview("releasePreview",e.releaseBend,e.sustainLevel,e.releaseLevel);const{ctx:t,width:i,height:a}=this.setupCtx("sustainPreview"),s=e.sustainLevel??1;t!==void 0&&(_.line(t,{a:{x:0,y:(1-s)*a},b:{x:i,y:(1-s)*a}}),t.resetTransform())}setupCtx(e){const t=this.shadowRoot?.getElementById(e);if(t===null)return console.warn(`Canvas ${e} not found`),{ctx:void 0,width:0,padding:0,height:0};const i=t.getContext("2d");if(i===null)return console.warn(`Canvas ctx could not be created for ${e}`),{ctx:void 0,width:0,padding:0,height:0};const a=4,s=100,n=100;return i.clearRect(0,0,s,n),i.strokeStyle=P.getCssVariable("accent-bold","yellow"),i.lineWidth=3,i.translate(a/2,a/2),{ctx:i,padding:a,width:s-a-a,height:n-a-a}}renderPreview(e,t,i,a){t===void 0&&(t=0),i===void 0&&(i=0),a===void 0&&(a=1);const{ctx:s,width:n,height:r}=this.setupCtx(e);if(s===void 0)return;const I=N.quadraticBend({x:0,y:(1-i)*r},{x:n,y:(1-a)*r},t);_.bezier(s,I),s.resetTransform()}async updated(){this.renderPreviews()}_reset(){this.data=f(),this.requestUpdate()}_copy(){V(this.data)}render(){if(this.data===void 0)return v`<div>(undefined envelope)</div>`;const e=this.data;return v`
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
</div>`}},o(m,"styles",[E]),m);p([R("#attackPreview")],u.prototype,"attackPreview",2);p([y()],u.prototype,"data",2);p([y({converter:J,type:Object})],u.prototype,"json",2);u=p([T("envelope-editor")],u);var M=Object.defineProperty,G=Object.getOwnPropertyDescriptor,K=(e,t,i,a)=>{for(var s=a>1?void 0:a?G(t,i):t,n=e.length-1,r;n>=0;n--)(r=e[n])&&(s=(a?r(t,i,s):r(s))||s);return a&&s&&M(t,i,s),s};const Q="log-element";class w extends C{constructor(){super();o(this,"logger");o(this,"logContainer");this.logger=null,this.logContainer=null}init(){this.logContainer===null&&(this.logContainer=this.shadowRoot.querySelector("#stream"),this.logContainer!==null&&(this.logger=z(this.logContainer,{minIntervalMs:20,capacity:150})))}error(t){this.init(),this.logger!==null?(this.logger.error(t),this.updateLog()):console.error(t)}clear(){this.logger!==null&&(this.logger.clear(),this.requestUpdate(),this.updateLog())}log(t){this.init(),this.logger!==null?(this.logger.log(t),this.updateLog()):console.log(t)}toggleExpand(){this.expanded=!this.expanded}updateLog(){const t=this.shadowRoot.querySelector(".toolbar");t!==null&&(this.isEmpty?t.classList.add("empty"):t.classList.remove("empty"))}get isEmpty(){return this.init(),this.logger!==null?this.logger.isEmpty:!0}renderTools(){return v`
    <button title="${this.expanded?"Collapse":"Expand"} log" @click=${this.toggleExpand}> ${this.expanded?"-":"+"}</button>
    <button title="Clear log" @click=${this.clear}>C</button>
    `}render(){const t={expanded:this.expanded};return v`
      <div class=${D(t)}>
        <div class=${D(t)} id="stream"></div>
        <div class="toolbar empty vertical mini">
          ${this.renderTools()}
        </div>
      </div>
        `}}o(w,"styles",[E,A`
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
    `]);K([y({type:Boolean})],w.prototype,"expanded",2);customElements.define(Q,w);const d=document.getElementById("envDataLog"),x=b.plot("#envData",{capacity:300,defaultSeriesVariable:"accent",x:{...b.defaultAxis("x"),showLine:!1},y:{...b.defaultAxis("y"),showLine:!1,colour:P.getCssVariable("fg","grey")},lineWidth:3,autoSizeCanvas:!0,debug:!1});let $=!1,L={...f(),attackBend:1,decayBend:-1,releaseBend:1},l=B({...L,shouldLoop:$});l.addEventListener("change",e=>{c.button("#btnRelease").disabled=e.newState!=="sustain"});c.button("#btnTriggerHold",()=>{d.clear(),l.trigger(!0),g()});c.button("#btnRelease",()=>{l.release()});c.button("#btnTrigger",()=>{d.clear(),l.trigger(),g()});const X=c.select("#selectShow",e=>{x.clear(),d.log(""),g()});q(U("#envEditor"),"change").pipe(F(e=>e.detail),j(1e3)).subscribe(e=>{L=e,k()});const k=()=>{try{l=B({...L,shouldLoop:$}),l.trigger(),d.clear(),x.clear(),g()}catch(e){d.error(e)}};c.checkbox("#chkLooping",e=>{$=e,k()});let h=!1;const g=()=>{if(h)return;const e=function(){let[t,i,a]=l.compute();if(a<0)debugger;if(t===void 0){h=!1;return}const s=X.value==="raw"?a:i;x.add(s),d.log(`${t} ${s.toFixed(3)}`),l.isDone?(console.log("Envelope done"),h=!1):(h=!0,window.requestAnimationFrame(e))};window.requestAnimationFrame(e)};k();
