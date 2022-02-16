var u=Object.defineProperty;var d=(r,t,e)=>t in r?u(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e;var p=(r,t,e)=>(d(r,typeof t!="symbol"?t+"":t,e),e);import{s as f,r as h,$ as m,e as v}from"./vendor.aa1ac2c8.js";import{f as g,K as j}from"./bundle.de3f4299.js";import{e as x}from"./styles.07fc92cf.js";import"./chunk-MTK5JJI3.e8b09b21.js";import"./chunk-UWLZSNHO.b417c615.js";import"./chunk-25RM45LF.24c9c7e0.js";import"./chunk-6JTGCZJL.667a6ecc.js";import"./chunk-FRVUOYS5.f63d7587.js";import"./chunk-2WJ6TYOJ.2dad6d87.js";import"./chunk-YFNN25WV.cd60277c.js";import"./chunk-BWZCVD5D.693f13ba.js";import"./chunk-X6JGXZI6.a11e40d9.js";var b=Object.defineProperty,_=Object.getOwnPropertyDescriptor,y=(r,t,e,o)=>{for(var n=o>1?void 0:o?_(t,e):t,i=r.length-1,c;i>=0;i--)(c=r[i])&&(n=(o?c(t,e,n):c(n))||n);return o&&n&&b(t,e,n),n};const O="freq-letters";class a extends f{constructor(){super();this.text="Hello there! - Obi-wan Kenobi"}_onInput(t){this.text=t.target.value}render(){const t=g();for(let s=0;s<this.text.length;s++){const l=this.text.toLocaleUpperCase().charAt(s);l!==" "&&t.add(l)}const e=t.entriesSorted("valueReverse"),o=j.minMaxAvg(e),n=Math.min(e.length,3),i=e.slice(0,n),c=s=>Math.round(s[1]/o.total*100);return m`
    <div class="container">
      <div class="toolbar">
        <input @input="${this._onInput}" type="text" .value="${this.text}">
      </div>
      <div>
        Top ${n} letters:
        <ol>
        ${i.map(s=>m`<li>'${s[0]}' ${c(s)}%</li>`)}
        </ol>
        </div>
    </div>
		`}}p(a,"styles",[x,h`
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
`]);y([v()],a.prototype,"text",2);customElements.define(O,a);export{a as FreqLettersElement,O as tagName};
