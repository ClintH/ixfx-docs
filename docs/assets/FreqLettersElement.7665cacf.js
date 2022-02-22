var u=Object.defineProperty;var d=(r,t,e)=>t in r?u(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e;var l=(r,t,e)=>(d(r,typeof t!="symbol"?t+"":t,e),e);import{s as f,r as h,$ as m,e as v}from"./vendor.a3225d27.js";import{f as j,K as g}from"./bundle.293982e7.js";import{e as x}from"./styles.0da1a4a9.js";import"./chunk-5LTT7AGF.2750761f.js";import"./chunk-7CELPBFO.f6fe4a50.js";import"./chunk-V2CC3OS2.f8999184.js";import"./chunk-YDTVC7MM.cb3895f8.js";import"./chunk-E6FEPMVF.c62dcddf.js";import"./chunk-672VRZPI.818522b7.js";import"./chunk-6RSYJ7PX.b9b486b6.js";import"./chunk-PJBWMDPZ.4ed5cce9.js";import"./chunk-MLAH6NN5.257adfe4.js";import"./chunk-QC5UDUYU.8c389651.js";import"./chunk-TZCTWNJW.f780cc2a.js";var b=Object.defineProperty,P=Object.getOwnPropertyDescriptor,M=(r,t,e,o)=>{for(var n=o>1?void 0:o?P(t,e):t,i=r.length-1,a;i>=0;i--)(a=r[i])&&(n=(o?a(t,e,n):a(n))||n);return o&&n&&b(t,e,n),n};const _="freq-letters";class c extends f{constructor(){super();this.text="Hello there! - Obi-wan Kenobi"}_onInput(t){this.text=t.target.value}render(){const t=j();for(let s=0;s<this.text.length;s++){const p=this.text.toLocaleUpperCase().charAt(s);p!==" "&&t.add(p)}const e=t.entriesSorted("valueReverse"),o=g.minMaxAvg(e),n=Math.min(e.length,3),i=e.slice(0,n),a=s=>Math.round(s[1]/o.total*100);return m`
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
		`}}l(c,"styles",[x,h`
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
`]);M([v()],c.prototype,"text",2);customElements.define(_,c);export{c as FreqLettersElement,_ as tagName};
