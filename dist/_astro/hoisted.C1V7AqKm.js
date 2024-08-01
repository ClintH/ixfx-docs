import{css as Ee,LitElement as ke,html as B}from"lit";import{n as se,t as Xe}from"./property.CuQZeMxo.js";import{d as ee,D as be,C as Te,B as qe,c as Ke,l as et,P as J,a as Se,F as j,r as tt}from"./chunk-VFOO3T2I.BGqEI_wx.js";/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const rt=(t,e,r)=>(r.configurable=!0,r.enumerable=!0,Reflect.decorate&&typeof e!="object"&&Object.defineProperty(t,e,r),r);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function nt(t,e){return(r,n,i)=>{const o=s=>s.renderRoot?.querySelector(t)??null;return rt(r,n,{get(){return o(this)}})}}const Ce=Ee`
  :host {
    display: block;
    --black: hsl(206, 11%, 12%);
    --white: hsl(206, 11%, 82%);

    --light-accent: hsl(217, 48%, 55%);
    --light-accent-text:hsl(217, 38%, 45%);
    --light-accent-bold:hsl(217, 100%, 45%);

    --dark-accent: hsl(217, 48%, 75%);
    --dark-accent-text:hsl(217, 78%, 75%);
    --dark-accent-bold:hsl(217, 78%, 75%);

    --dark-bg: hsl(229, 20%, 20%);
    --dark-bg-dim: hsl(231, 21%, 29%);
    --dark-fg: hsl(231, 28%, 73%);
    --dark-fg-bright: hsl(231, 28%, 82%);
    --dark-fgDim: hsl(231, 12%, 50%);
  
    --dark-yellow: hsl(39, 100%, 71%);
    --dark-purple: hsl(276, 68%, 75%);
    --dark-blue: hsl(197, 100%, 77%);
    --dark-green: hsl(68, 55%, 60%);
    
    --light-bg: hsl(0, 0%, 98%);
    --light-bg-dim: hsl(194, 16%, 94%);
    --light-fg: hsl(200, 16%, 62%);
    --light-fgDim: hsl(200, 16%, 32%);
    --light-fg-bright: hsl(200, 16%, 92%);

    --light-yellow: hsl(39, 100%, 59%);
    --light-purple: hsl(256, 90%, 65%);
    --light-blue: hsl(217, 38%, 55%);
    --light-green: hsl(85, 40%, 54%);

    --yellow: red;
    --radius: 1em;
    --padding: 0.3em;
    --padding-text: 0.8em;

    --divider: red;
    --light-external-link: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iMzAiIGhlaWdodD0iMzAiCnZpZXdCb3g9IjAgMCAzMCAzMCIKc3R5bGU9IiBmaWxsOiMwMDAwMDA7Ij48cGF0aCBkPSJNIDI1Ljk4MDQ2OSAyLjk5MDIzNDQgQSAxLjAwMDEgMS4wMDAxIDAgMCAwIDI1Ljg2OTE0MSAzIEwgMjAgMyBBIDEuMDAwMSAxLjAwMDEgMCAxIDAgMjAgNSBMIDIzLjU4NTkzOCA1IEwgMTMuMjkyOTY5IDE1LjI5Mjk2OSBBIDEuMDAwMSAxLjAwMDEgMCAxIDAgMTQuNzA3MDMxIDE2LjcwNzAzMSBMIDI1IDYuNDE0MDYyNSBMIDI1IDEwIEEgMS4wMDAxIDEuMDAwMSAwIDEgMCAyNyAxMCBMIDI3IDQuMTI2OTUzMSBBIDEuMDAwMSAxLjAwMDEgMCAwIDAgMjUuOTgwNDY5IDIuOTkwMjM0NCB6IE0gNiA3IEMgNC45MDY5MzcyIDcgNCA3LjkwNjkzNzIgNCA5IEwgNCAyNCBDIDQgMjUuMDkzMDYzIDQuOTA2OTM3MiAyNiA2IDI2IEwgMjEgMjYgQyAyMi4wOTMwNjMgMjYgMjMgMjUuMDkzMDYzIDIzIDI0IEwgMjMgMTQgTCAyMyAxMS40MjE4NzUgTCAyMSAxMy40MjE4NzUgTCAyMSAxNiBMIDIxIDI0IEwgNiAyNCBMIDYgOSBMIDE0IDkgTCAxNiA5IEwgMTYuNTc4MTI1IDkgTCAxOC41NzgxMjUgNyBMIDE2IDcgTCAxNCA3IEwgNiA3IHoiPjwvcGF0aD48L3N2Zz4=') no-repeat left top;
    --dark-external-link: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iMzAiIGhlaWdodD0iMzAiCnZpZXdCb3g9IjAgMCAxNzIgMTcyIgpzdHlsZT0iIGZpbGw6IzAwMDAwMDsiPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIGZvbnQtZmFtaWx5PSJub25lIiBmb250LXdlaWdodD0ibm9uZSIgZm9udC1zaXplPSJub25lIiB0ZXh0LWFuY2hvcj0ibm9uZSIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0wLDE3MnYtMTcyaDE3MnYxNzJ6IiBmaWxsPSJub25lIj48L3BhdGg+PGcgZmlsbD0iI2ZmZmZmZiI+PHBhdGggZD0iTTE0OC45NTQ2OSwxNy4xNDQwMWMtMC4yMTM2NCwwLjAwNjc1IC0wLjQyNjczLDAuMDI1NDQgLTAuNjM4MjgsMC4wNTU5OWgtMzMuNjQ5NzRjLTIuMDY3NjUsLTAuMDI5MjQgLTMuOTkwODcsMS4wNTcwOSAtNS4wMzMyMiwyLjg0M2MtMS4wNDIzNiwxLjc4NTkyIC0xLjA0MjM2LDMuOTk0NzQgMCw1Ljc4MDY2YzEuMDQyMzYsMS43ODU5MiAyLjk2NTU4LDIuODcyMjUgNS4wMzMyMiwyLjg0M2gyMC41NTkzOGwtNTkuMDEzMDIsNTkuMDEzMDJjLTEuNDk3NzgsMS40MzgwMiAtMi4xMDExMywzLjU3MzQgLTEuNTc3MzUsNS41ODI2YzAuNTIzNzgsMi4wMDkyIDIuMDkyODQsMy41NzgyNiA0LjEwMjA0LDQuMTAyMDRjMi4wMDkyLDAuNTIzNzggNC4xNDQ1OCwtMC4wNzk1NyA1LjU4MjYsLTEuNTc3MzVsNTkuMDEzMDIsLTU5LjAxMzAydjIwLjU1OTM4Yy0wLjAyOTI0LDIuMDY3NjUgMS4wNTcwOSwzLjk5MDg3IDIuODQzLDUuMDMzMjJjMS43ODU5MiwxLjA0MjM2IDMuOTk0NzQsMS4wNDIzNiA1Ljc4MDY2LDBjMS43ODU5MiwtMS4wNDIzNiAyLjg3MjI1LC0yLjk2NTU4IDIuODQzLC01LjAzMzIydi0zMy42NzIxNGMwLjIzMTExLC0xLjY3MDc2IC0wLjI4NTExLC0zLjM1ODUzIC0xLjQxMTI5LC00LjYxNDE1Yy0xLjEyNjE3LC0xLjI1NTYyIC0yLjc0ODA2LC0xLjk1MTcyIC00LjQzNDAyLC0xLjkwMzA0ek0zNC40LDQwLjEzMzMzYy02LjI2Njg5LDAgLTExLjQ2NjY3LDUuMTk5NzcgLTExLjQ2NjY3LDExLjQ2NjY3djg2YzAsNi4yNjY4OSA1LjE5OTc3LDExLjQ2NjY3IDExLjQ2NjY3LDExLjQ2NjY3aDg2YzYuMjY2ODksMCAxMS40NjY2NywtNS4xOTk3NyAxMS40NjY2NywtMTEuNDY2Njd2LTU3LjMzMzMzdi0xNC43ODEyNWwtMTEuNDY2NjcsMTEuNDY2Njd2MTQuNzgxMjV2NDUuODY2NjdoLTg2di04Nmg0NS44NjY2N2gxMS40NjY2N2gzLjMxNDU4bDExLjQ2NjY3LC0xMS40NjY2N2gtMTQuNzgxMjVoLTExLjQ2NjY3eiI+PC9wYXRoPjwvZz48L2c+PC9zdmc+') no-repeat left top;
  }

  .icon {
    display: inline-block;
    padding-left: 1.4em;
    padding-right: 1.2em;
  }

  .controls {
    display: flex;
    justify-content: center;
  }

  .controls.wrappable {
    flex-wrap: wrap;
  }

  .controls .vertical {
    display: flex;
    flex-direction: column;
  }

  .controls h2 {
   
    text-align: center;
  }

  .controls label {
    display: flex;
    flex-direction: column;
    font-size: 80%;
    user-select: none;
  }

  .icon-external-link {
    background: var(--external-link);
    background-size: 1.2em;
  }

  a.icon:link {
    text-decoration: none;
  }
  a.icon:visited, a.icon:link {
    color: var(--fg);
  }

  iframe {
    border: none;
    margin: 0;
    padding: 0;
  }
  
  button, .toolbar .radios label {
    border: 0;
    padding: 0.5em 1em;
    font-size: 1rem;
    align-items: center;
    gap: 0.25em;
    border-radius: 99em;
    color: var(--fg-contrast-dim);
    background-color: var(--bg-contrast);
    transition: color 0.3s ease-out;
    cursor: pointer;
    user-select: none;
  }
  
  button:hover {
    color: var(--fg-contrast);
    transition: color 0.3s ease-in;
  }

  button[disabled], button[disabled]:hover {
    opacity: 0.6;
    background-color: var(--theme-code-inline-bg);
    cursor: default;
  }

  .toolbar {
    display: flex;
    margin: 0.5em;
    flex-wrap: wrap;
  }

  .toolbar.rightJustify {
    justify-content: flex-end;
   
  }

  .toolbar.centered {
    justify-content: center;
  }
  .toolbar.vertical {
    flex-direction: column;
    justify-content: center;
  }
  
  .toolbar input {
    min-width: 3em;
    margin-right: 1vw;
    margin-left: 1vw;
  }
  .vertical input {
    margin-left: 0;
  }
  .toolbar.mini, .toolbar.mini>button {
    font-size: 80%;
  }
  .toolbar > * {
    margin-left: var(--padding);
    margin-right: var(--padding);
  }

  .toolbar.vertical > * {
    margin-top: var(--padding);
    margin-bottom: var(--padding);
  }

  .radios input[type="radio"] {
    opacity: 0;
    position: fixed;
    width: 0;
  }

  .radios label {
    display: inline-block;
    opacity: 0.5;
    font-size: 80% !important;
    transition: all 0.3s ease-in;
  }

  .radios label:hover {
    opacity: 0.8;
    transition: opacity 0.3s ease-in;
  }
  
  .radios input[type="radio"]:checked + label {
    background-color: var(--bg-contrast);
    font-size: 100%;
    opacity: 1;
    transition: all 0.3s ease-in;
  }

  .radios input[type="radio"]:focus + label {
    border: 1px solid var(--fg);
  }
  
  .icon {
    opacity: 0.6;
    transition: opacity 0.5s ease-out;
  }
  .icon:hover {
    opacity: 1;
    transition: opacity 0.3s ease-in;
  }


  @media (prefers-color-scheme: dark) {
    :host {
      --bg-mono: var(--black);
      --bg: var(--dark-bg);
      --bg-dim: var(--dark-bg-dim);

      --divider: hsl(229, 30%, 30%);

      --accent: var(--dark-accent);
      --accent-text: var(--dark-accent-text);
      --accent-bold: var(--dark-accent-bold);

      --fg: var(--dark-fg);
      --fg-mono: var(--dark-fgDim);
      --fgDim: var(--dark-fgDim);
      --fg-bright: var(--dark-fg-bright);
      
      --purple: var(--dark-purple);
      --green: var(--dark-green);
      --blue: var(--dark-blue);

      --external-link: var(--dark-external-link);
    }
  }

  
  @media (prefers-color-scheme: light) {
    :host {
    --bg-mono: var(--white);
    --bg: var(--light-bg);
    --bg-dim: var(--light-bg-dim);
    
    --divider: hsl(193, 10%, 84%);

    --accent: var(--light-accent);
    --accent-bold: var(--light-accent-bold);
    --accent-text: var(--light-accent-text);

    --fg: var(--light-fg);
    --fg-mono: var(--light-fgDim);
    --fgDim: var(--light-fgDim);
    --fg-bright: var(--light-fg-bright);
    --purple: var(--light-purple);
    --green: var(--light-green);
    --blue: var(--light-blue);

    --bg-contrast: hsl(200, 16%, 92%);
    --fg-contrast: hsl(200, 16%, 22%);
    --fg-contrast-dim: hsl(200, 16%, 62%);

    --external-link: var(--light-external-link);
    }
  }
`;var ze=Object.defineProperty,it=Object.getOwnPropertyDescriptor,ot=(t,e,r)=>e in t?ze(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,R=(t,e,r,n)=>{for(var i=n>1?void 0:n?it(e,r):e,o=t.length-1,s;o>=0;o--)(s=t[o])&&(i=(n?s(e,r,i):s(i))||i);return n&&i&&ze(e,r,i),i},st=(t,e,r)=>(ot(t,e+"",r),r);const at=t=>{if(!(t===null||typeof t>"u"||t==="undefined"))try{if(typeof t=="string")return t.length===0?void 0:JSON.parse(t)}catch(e){console.log(t),console.error(e)}};let D=class extends ke{attackPreview;constructor(){super(),this.data=ee(),this.json=void 0}connectedCallback(){this.hasAttribute("json")||this.setAttribute("json",this.innerText),super.connectedCallback()}onChanged(){const t=new CustomEvent("change",{bubbles:!0,composed:!0,detail:this.data});this.dispatchEvent(t)}_durationInput(t){const e=t.target,r=e.value,n=parseInt(r);switch(e.id){case"attackDuration":this.data={...this.data,attackDuration:n};break;case"decayDuration":this.data={...this.data,decayDuration:n};break;case"releaseDuration":this.data={...this.data,releaseDuration:n};break}this.onChanged()}_bendInput(t){const e=t.target,r=e.value,n=parseFloat(r)/100;switch(e.id){case"attackBend":this.data={...this.data,attackBend:n};break;case"decayBend":this.data={...this.data,decayBend:n};break;case"releaseBend":this.data={...this.data,releaseBend:n}}this.onChanged()}_valueInput(t){const e=t.target,r=e.value,n=parseFloat(r)/100;switch(e.id){case"initialValue":this.data={...this.data,initialLevel:n};break;case"peakLevel":this.data={...this.data,peakLevel:n};break;case"sustainLevel":this.data={...this.data,sustainLevel:n};break;case"releaseLevel":this.data={...this.data,releaseLevel:n};break}this.onChanged()}renderPreviews(){if(this.data===void 0)return;const t=this.data;this.renderPreview("attackPreview",t.attackBend,t.initialLevel,t.peakLevel),this.renderPreview("decayPreview",t.decayBend,t.peakLevel,t.sustainLevel),this.renderPreview("releasePreview",t.releaseBend,t.sustainLevel,t.releaseLevel);const{ctx:e,width:r,height:n}=this.setupCtx("sustainPreview"),i=t.sustainLevel??1;e!==void 0&&(be.line(e,{a:{x:0,y:(1-i)*n},b:{x:r,y:(1-i)*n}}),e.resetTransform())}setupCtx(t){const e=this.shadowRoot?.getElementById(t);if(e===null)return console.warn(`Canvas ${t} not found`),{ctx:void 0,width:0,padding:0,height:0};const r=e.getContext("2d");if(r===null)return console.warn(`Canvas ctx could not be created for ${t}`),{ctx:void 0,width:0,padding:0,height:0};const n=4,i=100,o=100;return r.clearRect(0,0,i,o),r.strokeStyle=Te.getCssVariable("accent-bold","yellow"),r.lineWidth=3,r.translate(n/2,n/2),{ctx:r,padding:n,width:i-n-n,height:o-n-n}}renderPreview(t,e,r,n){e===void 0&&(e=0),r===void 0&&(r=0),n===void 0&&(n=1);const{ctx:i,width:o,height:s}=this.setupCtx(t);if(i===void 0)return;const c=qe.quadraticBend({x:0,y:(1-r)*s},{x:o,y:(1-n)*s},e);be.bezier(i,c),i.resetTransform()}async updated(){this.renderPreviews()}_reset(){this.data=ee(),this.requestUpdate()}_copy(){Ke(this.data)}render(){if(this.data===void 0)return B`<div>(undefined envelope)</div>`;const t=this.data;return B`
<div class="container">
<div id="preview">
</div>  
<div class="controls wrappable">
  <div class="vertical">
    <h2>Attack</h2>
    <canvas title="Preview of attack stage" id="attackPreview" width="100" height="100"></canvas>
    <label>Duration: ${t.attackDuration} ms
      <input @input="${this._durationInput}" .value="${t.attackDuration}" type="range" id="attackDuration" min="0" max="5000">
    </label>
    <label>Bend: ${t.attackBend}
      <input @input="${this._bendInput}" .value="${t.attackBend*100}" type="range" id="attackBend" min="-100" max="100">
    </label>
    <label>Initial: ${t.initialLevel}
      <input @input="${this._valueInput}" .value=${t.initialLevel*100} type="range" id="initialValue" min="0" max="100">
    </label>
  </div>
  <div class="vertical">
    <h2>Decay</h2>
    <canvas title="Preview of decay stage" id="decayPreview" width="100" height="100"></canvas>
    <label>Duration: ${t.decayDuration} ms
      <input @input="${this._durationInput}" .value="${t.decayDuration}" type="range" id="decayDuration" min="0" max="5000">
    </label>
    <label>Bend: ${t.decayBend}
      <input @input="${this._bendInput}" .value="${t.decayBend*100}" type="range" id="decayBend" min="-100" max="100">
    </label>
    <label>Peak: ${t.peakLevel}
      <input @input="${this._valueInput}" .value="${t.peakLevel*100}" type="range" id="peakLevel" min="0" max="100">
    </label>
  </div>
  <div class="vertical">
    <h2>Sustain</h2>
    <canvas title="Preview of sustain stage" id="sustainPreview" width="100" height="100"></canvas>
    <label>Level: ${t.sustainLevel}
      <input @input="${this._valueInput}" .value="${t.sustainLevel*100}" type="range" id="sustainLevel" min="0" max="100">
    </label>
  </div>
  <div class="vertical">
    <h2>Release</h2>
    <canvas title="Preview of release stage" id="releasePreview" width="100" height="100"></canvas>
    <label>Duration: ${t.releaseDuration} ms
      <input @input="${this._durationInput}" .value="${t.releaseDuration}" type="range" id="releaseDuration" min="0" max="5000">
    </label>
    <label>Bend: ${t.releaseBend}
      <input @input="${this._bendInput}" .value="${t.releaseBend*100}" type="range" id="releaseBend" min="-100" max="100">
    </label>
    <label>Release: ${t.releaseLevel}
      <input @input="${this._valueInput}" .value="${t.releaseLevel*100}" type="range" id="releaseLevel" min="0" max="100">
    </label>
  </div>
</div>
<div class="toolbar centered mini">
  <button title="Reset envelope to starting state" @click="${this._reset}">Reset</button>
  <button title="Copy envelope data to clipboard" @click="${this._copy}">Copy envelope</button>
</div>
</div>`}};st(D,"styles",[Ce]);R([nt("#attackPreview")],D.prototype,"attackPreview",2);R([se()],D.prototype,"data",2);R([se({converter:at,type:Object})],D.prototype,"json",2);D=R([Xe("envelope-editor")],D);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ae=globalThis,Y=ae.trustedTypes,me=Y?Y.createPolicy("lit-html",{createHTML:t=>t}):void 0,Oe="$lit$",b=`lit$${Math.random().toFixed(9).slice(2)}$`,Pe="?"+b,lt=`<${Pe}>`,M=document,U=()=>M.createComment(""),T=t=>t===null||typeof t!="object"&&typeof t!="function",Be=Array.isArray,ct=t=>Be(t)||typeof t?.[Symbol.iterator]=="function",X=`[ 	
\f\r]`,k=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ae=/-->/g,we=/>/g,A=RegExp(`>|${X}(?:([^\\s"'>=/]+)(${X}*=${X}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Me=/'/g,xe=/"/g,Ye=/^(?:script|style|textarea|title)$/i,$=Symbol.for("lit-noChange"),g=Symbol.for("lit-nothing"),Ie=new WeakMap,w=M.createTreeWalker(M,129);function Ue(t,e){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return me!==void 0?me.createHTML(e):e}const ut=(t,e)=>{const r=t.length-1,n=[];let i,o=e===2?"<svg>":"",s=k;for(let c=0;c<r;c++){const a=t[c];let l,u,d=-1,h=0;for(;h<a.length&&(s.lastIndex=h,u=s.exec(a),u!==null);)h=s.lastIndex,s===k?u[1]==="!--"?s=Ae:u[1]!==void 0?s=we:u[2]!==void 0?(Ye.test(u[2])&&(i=RegExp("</"+u[2],"g")),s=A):u[3]!==void 0&&(s=A):s===A?u[0]===">"?(s=i??k,d=-1):u[1]===void 0?d=-2:(d=s.lastIndex-u[2].length,l=u[1],s=u[3]===void 0?A:u[3]==='"'?xe:Me):s===xe||s===Me?s=A:s===Ae||s===we?s=k:(s=A,i=void 0);const p=s===A&&t[c+1].startsWith("/>")?" ":"";o+=s===k?a+lt:d>=0?(n.push(l),a.slice(0,d)+Oe+a.slice(d)+b+p):a+b+(d===-2?c:p)}return[Ue(t,o+(t[r]||"<?>")+(e===2?"</svg>":"")),n]};class S{constructor({strings:e,_$litType$:r},n){let i;this.parts=[];let o=0,s=0;const c=e.length-1,a=this.parts,[l,u]=ut(e,r);if(this.el=S.createElement(l,n),w.currentNode=this.el.content,r===2){const d=this.el.content.firstChild;d.replaceWith(...d.childNodes)}for(;(i=w.nextNode())!==null&&a.length<c;){if(i.nodeType===1){if(i.hasAttributes())for(const d of i.getAttributeNames())if(d.endsWith(Oe)){const h=u[s++],p=i.getAttribute(d).split(b),y=/([.?@])?(.*)/.exec(h);a.push({type:1,index:o,name:y[2],strings:p,ctor:y[1]==="."?ht:y[1]==="?"?ft:y[1]==="@"?pt:Z}),i.removeAttribute(d)}else d.startsWith(b)&&(a.push({type:6,index:o}),i.removeAttribute(d));if(Ye.test(i.tagName)){const d=i.textContent.split(b),h=d.length-1;if(h>0){i.textContent=Y?Y.emptyScript:"";for(let p=0;p<h;p++)i.append(d[p],U()),w.nextNode(),a.push({type:2,index:++o});i.append(d[h],U())}}}else if(i.nodeType===8)if(i.data===Pe)a.push({type:2,index:o});else{let d=-1;for(;(d=i.data.indexOf(b,d+1))!==-1;)a.push({type:7,index:o}),d+=b.length-1}o++}}static createElement(e,r){const n=M.createElement("template");return n.innerHTML=e,n}}function _(t,e,r=t,n){if(e===$)return e;let i=n!==void 0?r._$Co?.[n]:r._$Cl;const o=T(e)?void 0:e._$litDirective$;return i?.constructor!==o&&(i?._$AO?.(!1),o===void 0?i=void 0:(i=new o(t),i._$AT(t,r,n)),n!==void 0?(r._$Co??=[])[n]=i:r._$Cl=i),i!==void 0&&(e=_(t,i._$AS(t,e.values),i,n)),e}class dt{constructor(e,r){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:r},parts:n}=this._$AD,i=(e?.creationScope??M).importNode(r,!0);w.currentNode=i;let o=w.nextNode(),s=0,c=0,a=n[0];for(;a!==void 0;){if(s===a.index){let l;a.type===2?l=new Q(o,o.nextSibling,this,e):a.type===1?l=new a.ctor(o,a.name,a.strings,this,e):a.type===6&&(l=new vt(o,this,e)),this._$AV.push(l),a=n[++c]}s!==a?.index&&(o=w.nextNode(),s++)}return w.currentNode=M,i}p(e){let r=0;for(const n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(e,n,r),r+=n.strings.length-2):n._$AI(e[r])),r++}}class Q{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,r,n,i){this.type=2,this._$AH=g,this._$AN=void 0,this._$AA=e,this._$AB=r,this._$AM=n,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const r=this._$AM;return r!==void 0&&e?.nodeType===11&&(e=r.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,r=this){e=_(this,e,r),T(e)?e===g||e==null||e===""?(this._$AH!==g&&this._$AR(),this._$AH=g):e!==this._$AH&&e!==$&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):ct(e)?this.k(e):this._(e)}S(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.S(e))}_(e){this._$AH!==g&&T(this._$AH)?this._$AA.nextSibling.data=e:this.T(M.createTextNode(e)),this._$AH=e}$(e){const{values:r,_$litType$:n}=e,i=typeof n=="number"?this._$AC(e):(n.el===void 0&&(n.el=S.createElement(Ue(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===i)this._$AH.p(r);else{const o=new dt(i,this),s=o.u(this.options);o.p(r),this.T(s),this._$AH=o}}_$AC(e){let r=Ie.get(e.strings);return r===void 0&&Ie.set(e.strings,r=new S(e)),r}k(e){Be(this._$AH)||(this._$AH=[],this._$AR());const r=this._$AH;let n,i=0;for(const o of e)i===r.length?r.push(n=new Q(this.S(U()),this.S(U()),this,this.options)):n=r[i],n._$AI(o),i++;i<r.length&&(this._$AR(n&&n._$AB.nextSibling,i),r.length=i)}_$AR(e=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);e&&e!==this._$AB;){const n=e.nextSibling;e.remove(),e=n}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}}class Z{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,r,n,i,o){this.type=1,this._$AH=g,this._$AN=void 0,this.element=e,this.name=r,this._$AM=i,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=g}_$AI(e,r=this,n,i){const o=this.strings;let s=!1;if(o===void 0)e=_(this,e,r,0),s=!T(e)||e!==this._$AH&&e!==$,s&&(this._$AH=e);else{const c=e;let a,l;for(e=o[0],a=0;a<o.length-1;a++)l=_(this,c[n+a],r,a),l===$&&(l=this._$AH[a]),s||=!T(l)||l!==this._$AH[a],l===g?e=g:e!==g&&(e+=(l??"")+o[a+1]),this._$AH[a]=l}s&&!i&&this.j(e)}j(e){e===g?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class ht extends Z{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===g?void 0:e}}class ft extends Z{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==g)}}class pt extends Z{constructor(e,r,n,i,o){super(e,r,n,i,o),this.type=5}_$AI(e,r=this){if((e=_(this,e,r,0)??g)===$)return;const n=this._$AH,i=e===g&&n!==g||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,o=e!==g&&(n===g||i);i&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class vt{constructor(e,r,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=r,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){_(this,e)}}const gt=ae.litHtmlPolyfillSupport;gt?.(S,Q),(ae.litHtmlVersions??=[]).push("3.1.3");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const yt={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},bt=t=>(...e)=>({_$litDirective$:t,values:e});class mt{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,r,n){this._$Ct=e,this._$AM=r,this._$Ci=n}_$AS(e,r){return this.update(e,r)}update(e,r){return this.render(...r)}}/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const De=bt(class extends mt{constructor(t){if(super(t),t.type!==yt.ATTRIBUTE||t.name!=="class"||t.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter(e=>t[e]).join(" ")+" "}update(t,[e]){if(this.st===void 0){this.st=new Set,t.strings!==void 0&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter(n=>n!=="")));for(const n in e)e[n]&&!this.nt?.has(n)&&this.st.add(n);return this.render(e)}const r=t.element.classList;for(const n of this.st)n in e||(r.remove(n),this.st.delete(n));for(const n in e){const i=!!e[n];i===this.st.has(n)||this.nt?.has(n)||(i?(r.add(n),this.st.add(n)):(r.remove(n),this.st.delete(n)))}return $}});var At=Object.defineProperty,wt=(t,e,r,n)=>{for(var i=void 0,o=t.length-1,s;o>=0;o--)(s=t[o])&&(i=s(e,r,i)||i);return i&&At(e,r,i),i};const Mt="log-element";class He extends ke{logger;logContainer;static styles=[Ce,Ee`
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
    `];constructor(){super(),this.logger=null,this.logContainer=null}init(){this.logContainer===null&&(this.logContainer=this.shadowRoot.querySelector("#stream"),this.logContainer!==null&&(this.logger=et(this.logContainer,{minIntervalMs:20,capacity:150})))}error(e){this.init(),this.logger!==null?(this.logger.error(e),this.updateLog()):console.error(e)}clear(){this.logger!==null&&(this.logger.clear(),this.requestUpdate(),this.updateLog())}log(e){this.init(),this.logger!==null?(this.logger.log(e),this.updateLog()):console.log(e)}toggleExpand(){this.expanded=!this.expanded}updateLog(){const e=this.shadowRoot.querySelector(".toolbar");e!==null&&(this.isEmpty?e.classList.add("empty"):e.classList.remove("empty"))}get isEmpty(){return this.init(),this.logger!==null?this.logger.isEmpty:!0}renderTools(){return B`
    <button title="${this.expanded?"Collapse":"Expand"} log" @click=${this.toggleExpand}> ${this.expanded?"-":"+"}</button>
    <button title="Clear log" @click=${this.clear}>C</button>
    `}render(){const e={expanded:this.expanded};return B`
      <div class=${De(e)}>
        <div class=${De(e)} id="stream"></div>
        <div class="toolbar empty vertical mini">
          ${this.renderTools()}
        </div>
      </div>
        `}}wt([se({type:Boolean})],He.prototype,"expanded");customElements.define(Mt,He);var te=function(t,e){return te=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(r,n){r.__proto__=n}||function(r,n){for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(r[i]=n[i])},te(t,e)};function E(t,e){if(typeof e!="function"&&e!==null)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");te(t,e);function r(){this.constructor=t}t.prototype=e===null?Object.create(e):(r.prototype=e.prototype,new r)}function xt(t,e,r,n){function i(o){return o instanceof r?o:new r(function(s){s(o)})}return new(r||(r=Promise))(function(o,s){function c(u){try{l(n.next(u))}catch(d){s(d)}}function a(u){try{l(n.throw(u))}catch(d){s(d)}}function l(u){u.done?o(u.value):i(u.value).then(c,a)}l((n=n.apply(t,e||[])).next())})}function Re(t,e){var r={label:0,sent:function(){if(o[0]&1)throw o[1];return o[1]},trys:[],ops:[]},n,i,o,s;return s={next:c(0),throw:c(1),return:c(2)},typeof Symbol=="function"&&(s[Symbol.iterator]=function(){return this}),s;function c(l){return function(u){return a([l,u])}}function a(l){if(n)throw new TypeError("Generator is already executing.");for(;s&&(s=0,l[0]&&(r=0)),r;)try{if(n=1,i&&(o=l[0]&2?i.return:l[0]?i.throw||((o=i.return)&&o.call(i),0):i.next)&&!(o=o.call(i,l[1])).done)return o;switch(i=0,o&&(l=[l[0]&2,o.value]),l[0]){case 0:case 1:o=l;break;case 4:return r.label++,{value:l[1],done:!1};case 5:r.label++,i=l[1],l=[0];continue;case 7:l=r.ops.pop(),r.trys.pop();continue;default:if(o=r.trys,!(o=o.length>0&&o[o.length-1])&&(l[0]===6||l[0]===2)){r=0;continue}if(l[0]===3&&(!o||l[1]>o[0]&&l[1]<o[3])){r.label=l[1];break}if(l[0]===6&&r.label<o[1]){r.label=o[1],o=l;break}if(o&&r.label<o[2]){r.label=o[2],r.ops.push(l);break}o[2]&&r.ops.pop(),r.trys.pop();continue}l=e.call(t,r)}catch(u){l=[6,u],i=0}finally{n=o=0}if(l[0]&5)throw l[1];return{value:l[0]?l[1]:void 0,done:!0}}}function C(t){var e=typeof Symbol=="function"&&Symbol.iterator,r=e&&t[e],n=0;if(r)return r.call(t);if(t&&typeof t.length=="number")return{next:function(){return t&&n>=t.length&&(t=void 0),{value:t&&t[n++],done:!t}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")}function L(t,e){var r=typeof Symbol=="function"&&t[Symbol.iterator];if(!r)return t;var n=r.call(t),i,o=[],s;try{for(;(e===void 0||e-- >0)&&!(i=n.next()).done;)o.push(i.value)}catch(c){s={error:c}}finally{try{i&&!i.done&&(r=n.return)&&r.call(n)}finally{if(s)throw s.error}}return o}function z(t,e,r){if(r||arguments.length===2)for(var n=0,i=e.length,o;n<i;n++)(o||!(n in e))&&(o||(o=Array.prototype.slice.call(e,0,n)),o[n]=e[n]);return t.concat(o||Array.prototype.slice.call(e))}function I(t){return this instanceof I?(this.v=t,this):new I(t)}function It(t,e,r){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var n=r.apply(t,e||[]),i,o=[];return i={},s("next"),s("throw"),s("return"),i[Symbol.asyncIterator]=function(){return this},i;function s(h){n[h]&&(i[h]=function(p){return new Promise(function(y,v){o.push([h,p,y,v])>1||c(h,p)})})}function c(h,p){try{a(n[h](p))}catch(y){d(o[0][3],y)}}function a(h){h.value instanceof I?Promise.resolve(h.value.v).then(l,u):d(o[0][2],h)}function l(h){c("next",h)}function u(h){c("throw",h)}function d(h,p){h(p),o.shift(),o.length&&c(o[0][0],o[0][1])}}function Dt(t){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var e=t[Symbol.asyncIterator],r;return e?e.call(t):(t=typeof C=="function"?C(t):t[Symbol.iterator](),r={},n("next"),n("throw"),n("return"),r[Symbol.asyncIterator]=function(){return this},r);function n(o){r[o]=t[o]&&function(s){return new Promise(function(c,a){s=t[o](s),i(c,a,s.done,s.value)})}}function i(o,s,c,a){Promise.resolve(a).then(function(l){o({value:l,done:c})},s)}}function f(t){return typeof t=="function"}function $t(t){var e=function(n){Error.call(n),n.stack=new Error().stack},r=t(e);return r.prototype=Object.create(Error.prototype),r.prototype.constructor=r,r}var q=$t(function(t){return function(r){t(this),this.message=r?r.length+` errors occurred during unsubscription:
`+r.map(function(n,i){return i+1+") "+n.toString()}).join(`
  `):"",this.name="UnsubscriptionError",this.errors=r}});function re(t,e){if(t){var r=t.indexOf(e);0<=r&&t.splice(r,1)}}var W=function(){function t(e){this.initialTeardown=e,this.closed=!1,this._parentage=null,this._finalizers=null}return t.prototype.unsubscribe=function(){var e,r,n,i,o;if(!this.closed){this.closed=!0;var s=this._parentage;if(s)if(this._parentage=null,Array.isArray(s))try{for(var c=C(s),a=c.next();!a.done;a=c.next()){var l=a.value;l.remove(this)}}catch(v){e={error:v}}finally{try{a&&!a.done&&(r=c.return)&&r.call(c)}finally{if(e)throw e.error}}else s.remove(this);var u=this.initialTeardown;if(f(u))try{u()}catch(v){o=v instanceof q?v.errors:[v]}var d=this._finalizers;if(d){this._finalizers=null;try{for(var h=C(d),p=h.next();!p.done;p=h.next()){var y=p.value;try{$e(y)}catch(v){o=o??[],v instanceof q?o=z(z([],L(o)),L(v.errors)):o.push(v)}}}catch(v){n={error:v}}finally{try{p&&!p.done&&(i=h.return)&&i.call(h)}finally{if(n)throw n.error}}}if(o)throw new q(o)}},t.prototype.add=function(e){var r;if(e&&e!==this)if(this.closed)$e(e);else{if(e instanceof t){if(e.closed||e._hasParent(this))return;e._addParent(this)}(this._finalizers=(r=this._finalizers)!==null&&r!==void 0?r:[]).push(e)}},t.prototype._hasParent=function(e){var r=this._parentage;return r===e||Array.isArray(r)&&r.includes(e)},t.prototype._addParent=function(e){var r=this._parentage;this._parentage=Array.isArray(r)?(r.push(e),r):r?[r,e]:e},t.prototype._removeParent=function(e){var r=this._parentage;r===e?this._parentage=null:Array.isArray(r)&&re(r,e)},t.prototype.remove=function(e){var r=this._finalizers;r&&re(r,e),e instanceof t&&e._removeParent(this)},t.EMPTY=function(){var e=new t;return e.closed=!0,e}(),t}();W.EMPTY;function Qe(t){return t instanceof W||t&&"closed"in t&&f(t.remove)&&f(t.add)&&f(t.unsubscribe)}function $e(t){f(t)?t():t.unsubscribe()}var Ze={onUnhandledError:null,onStoppedNotification:null,Promise:void 0,useDeprecatedSynchronousErrorHandling:!1,useDeprecatedNextContext:!1},We={setTimeout:function(t,e){for(var r=[],n=2;n<arguments.length;n++)r[n-2]=arguments[n];return setTimeout.apply(void 0,z([t,e],L(r)))},clearTimeout:function(t){var e=We.delegate;return(e?.clearTimeout||clearTimeout)(t)},delegate:void 0};function Ge(t){We.setTimeout(function(){throw t})}function _e(){}function _t(t){t()}var le=function(t){E(e,t);function e(r){var n=t.call(this)||this;return n.isStopped=!1,r?(n.destination=r,Qe(r)&&r.add(n)):n.destination=Et,n}return e.create=function(r,n,i){return new ne(r,n,i)},e.prototype.next=function(r){this.isStopped||this._next(r)},e.prototype.error=function(r){this.isStopped||(this.isStopped=!0,this._error(r))},e.prototype.complete=function(){this.isStopped||(this.isStopped=!0,this._complete())},e.prototype.unsubscribe=function(){this.closed||(this.isStopped=!0,t.prototype.unsubscribe.call(this),this.destination=null)},e.prototype._next=function(r){this.destination.next(r)},e.prototype._error=function(r){try{this.destination.error(r)}finally{this.unsubscribe()}},e.prototype._complete=function(){try{this.destination.complete()}finally{this.unsubscribe()}},e}(W),Lt=Function.prototype.bind;function K(t,e){return Lt.call(t,e)}var Nt=function(){function t(e){this.partialObserver=e}return t.prototype.next=function(e){var r=this.partialObserver;if(r.next)try{r.next(e)}catch(n){O(n)}},t.prototype.error=function(e){var r=this.partialObserver;if(r.error)try{r.error(e)}catch(n){O(n)}else O(e)},t.prototype.complete=function(){var e=this.partialObserver;if(e.complete)try{e.complete()}catch(r){O(r)}},t}(),ne=function(t){E(e,t);function e(r,n,i){var o=t.call(this)||this,s;if(f(r)||!r)s={next:r??void 0,error:n??void 0,complete:i??void 0};else{var c;o&&Ze.useDeprecatedNextContext?(c=Object.create(r),c.unsubscribe=function(){return o.unsubscribe()},s={next:r.next&&K(r.next,c),error:r.error&&K(r.error,c),complete:r.complete&&K(r.complete,c)}):s=r}return o.destination=new Nt(s),o}return e}(le);function O(t){Ge(t)}function jt(t){throw t}var Et={closed:!0,next:_e,error:jt,complete:_e},ce=function(){return typeof Symbol=="function"&&Symbol.observable||"@@observable"}();function kt(t){return t}function Tt(t){return t.length===0?kt:t.length===1?t[0]:function(r){return t.reduce(function(n,i){return i(n)},r)}}var x=function(){function t(e){e&&(this._subscribe=e)}return t.prototype.lift=function(e){var r=new t;return r.source=this,r.operator=e,r},t.prototype.subscribe=function(e,r,n){var i=this,o=Ct(e)?e:new ne(e,r,n);return _t(function(){var s=i,c=s.operator,a=s.source;o.add(c?c.call(o,a):a?i._subscribe(o):i._trySubscribe(o))}),o},t.prototype._trySubscribe=function(e){try{return this._subscribe(e)}catch(r){e.error(r)}},t.prototype.forEach=function(e,r){var n=this;return r=Le(r),new r(function(i,o){var s=new ne({next:function(c){try{e(c)}catch(a){o(a),s.unsubscribe()}},error:o,complete:i});n.subscribe(s)})},t.prototype._subscribe=function(e){var r;return(r=this.source)===null||r===void 0?void 0:r.subscribe(e)},t.prototype[ce]=function(){return this},t.prototype.pipe=function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];return Tt(e)(this)},t.prototype.toPromise=function(e){var r=this;return e=Le(e),new e(function(n,i){var o;r.subscribe(function(s){return o=s},function(s){return i(s)},function(){return n(o)})})},t.create=function(e){return new t(e)},t}();function Le(t){var e;return(e=t??Ze.Promise)!==null&&e!==void 0?e:Promise}function St(t){return t&&f(t.next)&&f(t.error)&&f(t.complete)}function Ct(t){return t&&t instanceof le||St(t)&&Qe(t)}function zt(t){return f(t?.lift)}function ue(t){return function(e){if(zt(e))return e.lift(function(r){try{return t(r,this)}catch(n){this.error(n)}});throw new TypeError("Unable to lift unknown Observable type")}}function H(t,e,r,n,i){return new Ot(t,e,r,n,i)}var Ot=function(t){E(e,t);function e(r,n,i,o,s,c){var a=t.call(this,r)||this;return a.onFinalize=s,a.shouldUnsubscribe=c,a._next=n?function(l){try{n(l)}catch(u){r.error(u)}}:t.prototype._next,a._error=o?function(l){try{o(l)}catch(u){r.error(u)}finally{this.unsubscribe()}}:t.prototype._error,a._complete=i?function(){try{i()}catch(l){r.error(l)}finally{this.unsubscribe()}}:t.prototype._complete,a}return e.prototype.unsubscribe=function(){var r;if(!this.shouldUnsubscribe||this.shouldUnsubscribe()){var n=this.closed;t.prototype.unsubscribe.call(this),!n&&((r=this.onFinalize)===null||r===void 0||r.call(this))}},e}(le),Pt={now:function(){return Date.now()},delegate:void 0},Bt=function(t){E(e,t);function e(r,n){return t.call(this)||this}return e.prototype.schedule=function(r,n){return this},e}(W),ie={setInterval:function(t,e){for(var r=[],n=2;n<arguments.length;n++)r[n-2]=arguments[n];return setInterval.apply(void 0,z([t,e],L(r)))},clearInterval:function(t){var e=ie.delegate;return(e?.clearInterval||clearInterval)(t)},delegate:void 0},Yt=function(t){E(e,t);function e(r,n){var i=t.call(this,r,n)||this;return i.scheduler=r,i.work=n,i.pending=!1,i}return e.prototype.schedule=function(r,n){var i;if(n===void 0&&(n=0),this.closed)return this;this.state=r;var o=this.id,s=this.scheduler;return o!=null&&(this.id=this.recycleAsyncId(s,o,n)),this.pending=!0,this.delay=n,this.id=(i=this.id)!==null&&i!==void 0?i:this.requestAsyncId(s,this.id,n),this},e.prototype.requestAsyncId=function(r,n,i){return i===void 0&&(i=0),ie.setInterval(r.flush.bind(r,this),i)},e.prototype.recycleAsyncId=function(r,n,i){if(i===void 0&&(i=0),i!=null&&this.delay===i&&this.pending===!1)return n;n!=null&&ie.clearInterval(n)},e.prototype.execute=function(r,n){if(this.closed)return new Error("executing a cancelled action");this.pending=!1;var i=this._execute(r,n);if(i)return i;this.pending===!1&&this.id!=null&&(this.id=this.recycleAsyncId(this.scheduler,this.id,null))},e.prototype._execute=function(r,n){var i=!1,o;try{this.work(r)}catch(s){i=!0,o=s||new Error("Scheduled action threw falsy error")}if(i)return this.unsubscribe(),o},e.prototype.unsubscribe=function(){if(!this.closed){var r=this,n=r.id,i=r.scheduler,o=i.actions;this.work=this.state=this.scheduler=null,this.pending=!1,re(o,this),n!=null&&(this.id=this.recycleAsyncId(i,n,null)),this.delay=null,t.prototype.unsubscribe.call(this)}},e}(Bt),Ne=function(){function t(e,r){r===void 0&&(r=t.now),this.schedulerActionCtor=e,this.now=r}return t.prototype.schedule=function(e,r,n){return r===void 0&&(r=0),new this.schedulerActionCtor(this,e).schedule(n,r)},t.now=Pt.now,t}(),Ut=function(t){E(e,t);function e(r,n){n===void 0&&(n=Ne.now);var i=t.call(this,r,n)||this;return i.actions=[],i._active=!1,i}return e.prototype.flush=function(r){var n=this.actions;if(this._active){n.push(r);return}var i;this._active=!0;do if(i=r.execute(r.state,r.delay))break;while(r=n.shift());if(this._active=!1,i){for(;r=n.shift();)r.unsubscribe();throw i}},e}(Ne),Ht=new Ut(Yt),Fe=function(t){return t&&typeof t.length=="number"&&typeof t!="function"};function Rt(t){return f(t?.then)}function Qt(t){return f(t[ce])}function Zt(t){return Symbol.asyncIterator&&f(t?.[Symbol.asyncIterator])}function Wt(t){return new TypeError("You provided "+(t!==null&&typeof t=="object"?"an invalid object":"'"+t+"'")+" where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.")}function Gt(){return typeof Symbol!="function"||!Symbol.iterator?"@@iterator":Symbol.iterator}var Ft=Gt();function Vt(t){return f(t?.[Ft])}function Jt(t){return It(this,arguments,function(){var r,n,i,o;return Re(this,function(s){switch(s.label){case 0:r=t.getReader(),s.label=1;case 1:s.trys.push([1,,9,10]),s.label=2;case 2:return[4,I(r.read())];case 3:return n=s.sent(),i=n.value,o=n.done,o?[4,I(void 0)]:[3,5];case 4:return[2,s.sent()];case 5:return[4,I(i)];case 6:return[4,s.sent()];case 7:return s.sent(),[3,2];case 8:return[3,10];case 9:return r.releaseLock(),[7];case 10:return[2]}})})}function Xt(t){return f(t?.getReader)}function de(t){if(t instanceof x)return t;if(t!=null){if(Qt(t))return qt(t);if(Fe(t))return Kt(t);if(Rt(t))return er(t);if(Zt(t))return Ve(t);if(Vt(t))return tr(t);if(Xt(t))return rr(t)}throw Wt(t)}function qt(t){return new x(function(e){var r=t[ce]();if(f(r.subscribe))return r.subscribe(e);throw new TypeError("Provided object does not correctly implement Symbol.observable")})}function Kt(t){return new x(function(e){for(var r=0;r<t.length&&!e.closed;r++)e.next(t[r]);e.complete()})}function er(t){return new x(function(e){t.then(function(r){e.closed||(e.next(r),e.complete())},function(r){return e.error(r)}).then(null,Ge)})}function tr(t){return new x(function(e){var r,n;try{for(var i=C(t),o=i.next();!o.done;o=i.next()){var s=o.value;if(e.next(s),e.closed)return}}catch(c){r={error:c}}finally{try{o&&!o.done&&(n=i.return)&&n.call(i)}finally{if(r)throw r.error}}e.complete()})}function Ve(t){return new x(function(e){nr(t,e).catch(function(r){return e.error(r)})})}function rr(t){return Ve(Jt(t))}function nr(t,e){var r,n,i,o;return xt(this,void 0,void 0,function(){var s,c;return Re(this,function(a){switch(a.label){case 0:a.trys.push([0,5,6,11]),r=Dt(t),a.label=1;case 1:return[4,r.next()];case 2:if(n=a.sent(),!!n.done)return[3,4];if(s=n.value,e.next(s),e.closed)return[2];a.label=3;case 3:return[3,1];case 4:return[3,11];case 5:return c=a.sent(),i={error:c},[3,11];case 6:return a.trys.push([6,,9,10]),n&&!n.done&&(o=r.return)?[4,o.call(r)]:[3,8];case 7:a.sent(),a.label=8;case 8:return[3,10];case 9:if(i)throw i.error;return[7];case 10:return[7];case 11:return e.complete(),[2]}})})}function he(t,e){return ue(function(r,n){var i=0;r.subscribe(H(n,function(o){n.next(t.call(e,o,i++))}))})}var ir=Array.isArray;function or(t,e){return ir(e)?t.apply(void 0,z([],L(e))):t(e)}function sr(t){return he(function(e){return or(t,e)})}function ar(t,e,r,n,i,o,s,c){var a=[],l=0,u=0,d=!1,h=function(){d&&!a.length&&!l&&e.complete()},p=function(v){return l<n?y(v):a.push(v)},y=function(v){l++;var ye=!1;de(r(v,u++)).subscribe(H(e,function(F){e.next(F)},function(){ye=!0},void 0,function(){if(ye)try{l--;for(var F=function(){var V=a.shift();s||y(V)};a.length&&l<n;)F();h()}catch(V){e.error(V)}}))};return t.subscribe(H(e,p,function(){d=!0,h()})),function(){}}function Je(t,e,r){return r===void 0&&(r=1/0),f(e)?Je(function(n,i){return he(function(o,s){return e(n,o,i,s)})(de(t(n,i)))},r):(typeof e=="number"&&(r=e),ue(function(n,i){return ar(n,i,t,r)}))}var lr=["addListener","removeListener"],cr=["addEventListener","removeEventListener"],ur=["on","off"];function oe(t,e,r,n){if(f(r)&&(n=r,r=void 0),n)return oe(t,e,r).pipe(sr(n));var i=L(fr(t)?cr.map(function(c){return function(a){return t[c](e,a,r)}}):dr(t)?lr.map(je(t,e)):hr(t)?ur.map(je(t,e)):[],2),o=i[0],s=i[1];if(!o&&Fe(t))return Je(function(c){return oe(c,e,r)})(de(t));if(!o)throw new TypeError("Invalid event target");return new x(function(c){var a=function(){for(var l=[],u=0;u<arguments.length;u++)l[u]=arguments[u];return c.next(1<l.length?l:l[0])};return o(a),function(){return s(a)}})}function je(t,e){return function(r){return function(n){return t[r](e,n)}}}function dr(t){return f(t.addListener)&&f(t.removeListener)}function hr(t){return f(t.on)&&f(t.off)}function fr(t){return f(t.addEventListener)&&f(t.removeEventListener)}function pr(t,e){return e===void 0&&(e=Ht),ue(function(r,n){var i=null,o=null,s=null,c=function(){if(i){i.unsubscribe(),i=null;var l=o;o=null,n.next(l)}};function a(){var l=s+t,u=e.now();if(u<l){i=this.schedule(void 0,l-u),n.add(i);return}c()}r.subscribe(H(n,function(l){o=l,s=e.now(),i||(i=e.schedule(a,t),n.add(i))},function(){c(),n.complete()},void 0,function(){o=i=null}))})}const N=document.getElementById("envDataLog"),fe=J.plot("#envData",{capacity:300,defaultSeriesVariable:"accent",x:{...J.defaultAxis("x"),showLine:!1},y:{...J.defaultAxis("y"),showLine:!1,colour:Te.getCssVariable("fg","grey")},lineWidth:3,autoSizeCanvas:!0,debug:!1});let pe=!1,ve={...ee(),attackBend:1,decayBend:-1,releaseBend:1},m=Se({...ve,shouldLoop:pe});m.addEventListener("change",t=>{j.button("#btnRelease").disabled=t.newState!=="sustain"});j.button("#btnTriggerHold",()=>{N.clear(),m.trigger(!0),G()});j.button("#btnRelease",()=>{m.release()});j.button("#btnTrigger",()=>{N.clear(),m.trigger(),G()});const vr=j.select("#selectShow",t=>{fe.clear(),N.log(""),G()});oe(tt("#envEditor"),"change").pipe(he(t=>t.detail),pr(1e3)).subscribe(t=>{ve=t,ge()});const ge=()=>{try{m=Se({...ve,shouldLoop:pe}),m.trigger(),N.clear(),fe.clear(),G()}catch(t){N.error(t)}};j.checkbox("#chkLooping",t=>{pe=t,ge()});let P=!1;const G=()=>{if(P)return;const t=function(){let[e,r,n]=m.compute();if(n<0)debugger;if(e===void 0){P=!1;return}const i=vr.value==="raw"?n:r;fe.add(i),N.log(`${e} ${i.toFixed(3)}`),m.isDone?(console.log("Envelope done"),P=!1):(P=!0,window.requestAnimationFrame(t))};window.requestAnimationFrame(t)};ge();
