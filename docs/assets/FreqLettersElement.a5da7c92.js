var u=Object.defineProperty;var d=(r,t,e)=>t in r?u(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e;var p=(r,t,e)=>(d(r,typeof t!="symbol"?t+"":t,e),e);import{s as f,r as h,$ as m,e as v}from"./vendor.aa1ac2c8.js";import{f as g,K as j}from"./bundle.213777ea.js";import{e as x}from"./styles.07fc92cf.js";import"./chunk-DBBTHACN.e5311635.js";import"./chunk-HCHJFXUB.cd82ab14.js";import"./chunk-EGNKYH6P.1933f072.js";import"./chunk-5JM3IB7G.99fc65d7.js";import"./chunk-AGSKCOEP.dcc7b64e.js";import"./chunk-2NL2I57L.fde27681.js";import"./chunk-GAMNYXM7.7acacbe3.js";import"./chunk-DIQ6ZWAQ.94b98cf2.js";var b=Object.defineProperty,_=Object.getOwnPropertyDescriptor,y=(r,t,e,o)=>{for(var n=o>1?void 0:o?_(t,e):t,i=r.length-1,a;i>=0;i--)(a=r[i])&&(n=(o?a(t,e,n):a(n))||n);return o&&n&&b(t,e,n),n};const M="freq-letters";class c extends f{constructor(){super();this.text="Hello there! - Obi-wan Kenobi"}_onInput(t){this.text=t.target.value}render(){const t=g();for(let s=0;s<this.text.length;s++){const l=this.text.toLocaleUpperCase().charAt(s);l!==" "&&t.add(l)}const e=t.entriesSorted("valueReverse"),o=j.minMaxAvg(e),n=Math.min(e.length,3),i=e.slice(0,n),a=s=>Math.round(s[1]/o.total*100);return m`
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
		`}}p(c,"styles",[x,h`
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
`]);y([v()],c.prototype,"text",2);customElements.define(M,c);export{c as FreqLettersElement,M as tagName};
