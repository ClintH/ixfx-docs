var d=Object.defineProperty;var u=(r,t,e)=>t in r?d(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e;var p=(r,t,e)=>(u(r,typeof t!="symbol"?t+"":t,e),e);import{s as h,r as f,$ as m,e as v}from"./vendor.aa1ac2c8.js";import{f as g,K as j}from"./bundle.d5f56056.js";import{e as x}from"./styles.a87e34e4.js";import"./chunk-WGSYSC7J.a829d299.js";import"./chunk-3TSPSTUR.0c63f691.js";import"./chunk-UDOW5UY7.00d3a5c3.js";import"./chunk-G4S3XAFG.a06889d7.js";import"./chunk-FPOHJL6J.981a7808.js";import"./chunk-GI2JUAJJ.a179dd58.js";import"./chunk-IARP4YHS.e1edd6af.js";import"./chunk-JLAHASPM.045da619.js";var S=Object.defineProperty,_=Object.getOwnPropertyDescriptor,y=(r,t,e,o)=>{for(var n=o>1?void 0:o?_(t,e):t,i=r.length-1,a;i>=0;i--)(a=r[i])&&(n=(o?a(t,e,n):a(n))||n);return o&&n&&S(t,e,n),n};const P="freq-letters";class c extends h{constructor(){super();this.text="Hello there! - Obiwan Kenobi"}_onInput(t){this.text=t.target.value}render(){const t=g();for(let s=0;s<this.text.length;s++){const l=this.text.toLocaleUpperCase().charAt(s);l!==" "&&t.add(l)}const e=t.entriesSorted("valueReverse"),o=j.minMaxAvg(e),n=Math.min(e.length,3),i=e.slice(0,n),a=s=>Math.round(s[1]/o.total*100);return m`
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
		`}}p(c,"styles",[x,f`
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
`]);y([v()],c.prototype,"text",2);customElements.define(P,c);export{c as FreqLettersElement,P as tagName};
