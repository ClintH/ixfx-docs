var d=Object.defineProperty;var u=(r,t,e)=>t in r?d(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e;var p=(r,t,e)=>(u(r,typeof t!="symbol"?t+"":t,e),e);import{s as f,r as h,$ as m,e as b}from"./vendor.d9edd6b2.js";import{f as v,K as g}from"./bundle.adef3714.js";import{e as j}from"./styles.99f68bf2.js";import"./chunk-URTBDQYG.939553de.js";import"./chunk-HF2GNML5.47466bb1.js";import"./chunk-EGNKYH6P.1933f072.js";import"./chunk-G4S3XAFG.00fb0b2a.js";import"./chunk-MQKU5S5M.fc8875ae.js";import"./chunk-ZTVWXQ34.a8bb2adc.js";import"./chunk-IARP4YHS.d362b978.js";import"./chunk-DIQ6ZWAQ.94b98cf2.js";var x=Object.defineProperty,_=Object.getOwnPropertyDescriptor,y=(r,t,e,o)=>{for(var n=o>1?void 0:o?_(t,e):t,i=r.length-1,a;i>=0;i--)(a=r[i])&&(n=(o?a(t,e,n):a(n))||n);return o&&n&&x(t,e,n),n};const M="freq-letters";class l extends f{constructor(){super();this.text="Hello there! - Obi-wan Kenobi"}_onInput(t){this.text=t.target.value}render(){const t=v();for(let s=0;s<this.text.length;s++){const c=this.text.toLocaleUpperCase().charAt(s);c!==" "&&t.add(c)}const e=t.entriesSorted("valueReverse"),o=g.minMaxAvg(e),n=Math.min(e.length,3),i=e.slice(0,n),a=s=>Math.round(s[1]/o.total*100);return m`
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
		`}}p(l,"styles",[j,h`
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
`]);y([b()],l.prototype,"text",2);customElements.define(M,l);export{l as FreqLettersElement,M as tagName};
