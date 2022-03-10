var d=Object.defineProperty;var u=(o,t,e)=>t in o?d(o,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):o[t]=e;var l=(o,t,e)=>(u(o,typeof t!="symbol"?t+"":t,e),e);import{a as f,r as v,$ as c,b as h}from"./vendor.92dd9f01.js";import{f as g,K as x}from"./chunk-2OQPH7JM.baa0bd0a.js";import"./chunk-6IKSZCHO.71757621.js";import"./chunk-A3OQLAFF.9e3d5139.js";import"./chunk-EHKPP5SR.5374a9f6.js";import"./chunk-B7RHPX6D.163a8542.js";import"./chunk-TDKAXZAS.1af599a9.js";import"./chunk-QVRQKKRB.4ee1b7cb.js";import"./chunk-NP7XBFS5.4dc9bdd2.js";import"./chunk-FYQLQT42.b3fcc6fb.js";import"./chunk-LHJ7JM7H.7de6f0d4.js";import"./chunk-JBDRQ5KW.018a4769.js";import{e as _}from"./styles.9b5dda15.js";import"./chunk-FQLUQVDZ.8e87cdc9.js";var b=Object.defineProperty,y=Object.getOwnPropertyDescriptor,$=(o,t,e,n)=>{for(var r=n>1?void 0:n?y(t,e):t,s=o.length-1,a;s>=0;s--)(a=o[s])&&(r=(n?a(t,e,r):a(r))||r);return n&&r&&b(t,e,r),r};const O="freq-letters";class p extends f{constructor(){super();this.text="Hello there! - Obi-wan Kenobi"}_onInput(t){this.text=t.target.value}render(){const t=g();for(let i=0;i<this.text.length;i++){const m=this.text.toLocaleUpperCase().charAt(i);m!==" "&&t.add(m)}const e=t.entriesSorted("valueReverse"),n=x.minMaxAvg(e),r=Math.min(e.length,3),s=e.slice(0,r),a=i=>Math.round(i[1]/n.total*100);return c`
    <div class="container">
      <div class="toolbar">
        <input @input="${this._onInput}" type="text" .value="${this.text}">
      </div>
      <div>
        Top ${r} letters:
        <ol>
        ${s.map(i=>c`<li>'${i[0]}' ${a(i)}%</li>`)}
        </ol>
        </div>
    </div>
		`}}l(p,"styles",[_,v`
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
`]);$([h()],p.prototype,"text",2);customElements.define(O,p);export{p as FreqLettersElement,O as tagName};
