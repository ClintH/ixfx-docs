var d=Object.defineProperty;var u=(r,t,e)=>t in r?d(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e;var p=(r,t,e)=>(u(r,typeof t!="symbol"?t+"":t,e),e);import{s as h,r as f,$ as m,e as b}from"./vendor.d9edd6b2.js";import{f as v,K as g}from"./bundle.b4bb55b3.js";import{e as j}from"./styles.f341ab18.js";import"./chunk-3SMTKDXD.e3dcb359.js";import"./chunk-UWLZSNHO.ed4a88a1.js";import"./chunk-V6WGO73W.92c7aaab.js";import"./chunk-6JTGCZJL.d1807a28.js";import"./chunk-FRVUOYS5.39dff0b3.js";import"./chunk-WBZCIVUA.3304c7c5.js";import"./chunk-YFNN25WV.a6803c71.js";import"./chunk-MBZ4GFG7.e6b9ac15.js";import"./chunk-IV26GIHI.026acd94.js";var x=Object.defineProperty,_=Object.getOwnPropertyDescriptor,y=(r,t,e,o)=>{for(var n=o>1?void 0:o?_(t,e):t,i=r.length-1,a;i>=0;i--)(a=r[i])&&(n=(o?a(t,e,n):a(n))||n);return o&&n&&x(t,e,n),n};const O="freq-letters";class c extends h{constructor(){super();this.text="Hello there! - Obi-wan Kenobi"}_onInput(t){this.text=t.target.value}render(){const t=v();for(let s=0;s<this.text.length;s++){const l=this.text.toLocaleUpperCase().charAt(s);l!==" "&&t.add(l)}const e=t.entriesSorted("valueReverse"),o=g.minMaxAvg(e),n=Math.min(e.length,3),i=e.slice(0,n),a=s=>Math.round(s[1]/o.total*100);return m`
    <div class="container">
      <div class="toolbar">
        <input @input="${this._onInput}" type="text" .value="${this.text}">
      </div>
      <div>
        Top ${n} letters:
        <ol>
        ${i.map(s=>m`<li>'${s[0]}' ${a(s)}%</li>`)}
        </ol>
        </div>
    </div>
		`}}p(c,"styles",[j,f`
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
`]);y([b()],c.prototype,"text",2);customElements.define(O,c);export{c as FreqLettersElement,O as tagName};
