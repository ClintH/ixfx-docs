import{b as c,r as d,$ as l,a as u}from"./client-shim.cda72367.js";import{f,K as v}from"./chunks/chunk-WJABS4L4.582bcbed.js";import"./chunks/chunk-FJ2C6UZS.5dabe3fc.js";import"./chunks/chunk-MY6T4L6C.0016bfb7.js";import"./chunks/chunk-QOZ2BRCA.9bf98e98.js";import"./chunks/chunk-25KFP6OF.fcfc3207.js";import"./chunks/chunk-MW3GDUJU.b2443a15.js";import"./chunks/chunk-BSJKVIJG.f7604bb7.js";import"./chunks/chunk-4X2SZKK7.4dbfee46.js";import"./chunks/chunk-OE2F6QKM.34a70cb8.js";import"./chunks/chunk-U4IZE4J2.1410a545.js";import{e as h}from"./chunks/styles.591694aa.js";import"./chunks/chunk-6SYKIMQH.63e605dc.js";var g=Object.defineProperty,x=Object.getOwnPropertyDescriptor,_=(a,e,o,i)=>{for(var t=i>1?void 0:i?x(e,o):e,n=a.length-1,s;n>=0;n--)(s=a[n])&&(t=(i?s(e,o,t):s(t))||t);return i&&t&&g(e,o,t),t};const b="freq-letters";class m extends c{static styles=[h,d`
  .container {
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 1em;
  }
  
  ol {
    margin: 0;
    margin-top: 0.3em;
    padding: 0;
  }
  
  input {
    width: 15em;
    margin-right: 1em;
    margin-left: 0.3em;
    padding: 0.3em;
    font-size: 1.5em;  
  }
`];constructor(){super();this.text="Hello there! - Obi-wan Kenobi"}_onInput(e){this.text=e.target.value}render(){const e=f();for(let r=0;r<this.text.length;r++){const p=this.text.toLocaleUpperCase().charAt(r);p!==" "&&e.add(p)}const o=e.entriesSorted("valueReverse"),i=v.minMaxAvg(o),t=Math.min(o.length,3),n=o.slice(0,t),s=r=>Math.round(r[1]/i.total*100);return l`
    <div class="container">
      <div class="toolbar">
        <input @input="${this._onInput}" type="text" .value="${this.text}">
      </div>
      <div>
        Top ${t} letters:
        <ol>
        ${n.map(r=>l`<li>'${r[0]}' ${s(r)}%</li>`)}
        </ol>
        </div>
    </div>
		`}}_([u()],m.prototype,"text",2);customElements.define(b,m);export{m as FreqLettersElement,b as tagName};
