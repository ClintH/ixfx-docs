var y=Object.defineProperty;var m=(e,t,i)=>t in e?y(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i;var o=(e,t,i)=>(m(e,typeof t!="symbol"?t+"":t,i),i);import{j as w,e as u,n as f,s as g,$ as v}from"./vendor.ae2f83e2.js";import{D as h,P as k}from"./chunk-5VE7K3W4.abc39e5b.js";import{q as $}from"./chunk-4WJCK6OW.dc07580d.js";import{B as x}from"./chunk-RGWQELNS.82f84363.js";import"./chunk-TD4SHBHU.a3ff9292.js";import{d as p}from"./chunk-63GPL4EQ.94292053.js";import"./chunk-KYWIDCWW.7a3a5fae.js";import{e as L}from"./styles.a04561a2.js";var P=Object.defineProperty,D=Object.getOwnPropertyDescriptor,d=(e,t,i,a)=>{for(var n=a>1?void 0:a?D(t,i):t,s=e.length-1,r;s>=0;s--)(r=e[s])&&(n=(a?r(t,i,n):r(n))||n);return a&&n&&P(t,i,n),n};const B=e=>{if(!(e===null||typeof e=="undefined"||e==="undefined"))try{if(typeof e=="string")return e.length===0?void 0:JSON.parse(e)}catch(t){console.log(e),console.error(t)}};var c;let l=(c=class extends g{constructor(){super();o(this,"attackPreview");this.data=p(),this.json=void 0}connectedCallback(){this.hasAttribute("json")||this.setAttribute("json",this.innerText),super.connectedCallback()}onChanged(){const e=new CustomEvent("change",{bubbles:!0,composed:!0,detail:this.data});this.dispatchEvent(e)}_durationInput(e){const t=e.target,i=t.value,a=parseInt(i);switch(t.id){case"attackDuration":this.data={...this.data,attackDuration:a};break;case"decayDuration":this.data={...this.data,decayDuration:a};break;case"releaseDuration":this.data={...this.data,releaseDuration:a};break}this.onChanged()}_bendInput(e){const t=e.target,i=t.value,a=parseFloat(i)/100;switch(t.id){case"attackBend":this.data={...this.data,attackBend:a};break;case"decayBend":this.data={...this.data,decayBend:a};break;case"releaseBend":this.data={...this.data,releaseBend:a}}this.onChanged()}_valueInput(e){const t=e.target,i=t.value,a=parseFloat(i)/100;switch(t.id){case"initialValue":this.data={...this.data,initialLevel:a};break;case"peakLevel":this.data={...this.data,peakLevel:a};break;case"sustainLevel":this.data={...this.data,sustainLevel:a};break;case"releaseLevel":this.data={...this.data,releaseLevel:a};break}this.onChanged()}renderPreviews(){if(this.data===void 0)return;const e=this.data;this.renderPreview("attackPreview",e.attackBend,e.initialLevel,e.peakLevel),this.renderPreview("decayPreview",e.decayBend,e.peakLevel,e.sustainLevel),this.renderPreview("releasePreview",e.releaseBend,e.sustainLevel,e.releaseLevel);const{ctx:t,width:i,height:a}=this.setupCtx("sustainPreview"),n=e.sustainLevel??1;t!==void 0&&(h.line(t,{a:{x:0,y:(1-n)*a},b:{x:i,y:(1-n)*a}}),t.resetTransform())}setupCtx(e){const t=this.shadowRoot?.getElementById(e);if(t===null)return console.warn(`Canvas ${e} not found`),{ctx:void 0,width:0,padding:0,height:0};const i=t.getContext("2d");if(i===null)return console.warn(`Canvas ctx could not be created for ${e}`),{ctx:void 0,width:0,padding:0,height:0};const a=4,n=100,s=100;return i.clearRect(0,0,n,s),i.strokeStyle=k.getCssVariable("accent-bold","yellow"),i.lineWidth=3,i.translate(a/2,a/2),{ctx:i,padding:a,width:n-a-a,height:s-a-a}}renderPreview(e,t,i,a){t===void 0&&(t=0),i===void 0&&(i=0),a===void 0&&(a=1);const{ctx:n,width:s,height:r}=this.setupCtx(e);if(n===void 0)return;const b=x.quadraticBend({x:0,y:(1-i)*r},{x:s,y:(1-a)*r},t);h.bezier(n,b),n.resetTransform()}async updated(){this.renderPreviews()}_reset(){this.data=p(),this.requestUpdate()}_copy(){$(this.data)}render(){if(this.data===void 0)return v`<div>(undefined envelope)</div>`;const e=this.data;return v`
<div class="container">
<div id="preview">
</div>  
<div class="controls">
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
<div class="toolbar">
  <button title="Reset envelope to starting state" @click="${this._reset}">Reset</button>
  <button title="Copy envelope data to clipboard" @click="${this._copy}">Copy envelope</button>
</div>
</div>`}},o(c,"styles",[L]),c);d([w("#attackPreview")],l.prototype,"attackPreview",2);d([u()],l.prototype,"data",2);d([u({converter:B,type:Object})],l.prototype,"json",2);l=d([f("envelope-editor")],l);
