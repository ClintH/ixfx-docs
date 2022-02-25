var u=Object.defineProperty;var d=(r,t,e)=>t in r?u(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e;var l=(r,t,e)=>(d(r,typeof t!="symbol"?t+"":t,e),e);import{s as h,r as f,$ as m,e as v}from"./vendor.a59a155e.js";import{f as j,K as g}from"./chunk-IRTA6V53.d9034266.js";import"./chunk-JV2C55HY.cd1c20e3.js";import"./chunk-HEUMPV43.90b57ae6.js";import"./chunk-VAHXRYL4.a924033a.js";import"./chunk-C2GSEUUB.5e1d8426.js";import"./chunk-6RSYJ7PX.b9b486b6.js";import"./chunk-YNVHP56G.0c46a1b2.js";import"./chunk-MLAH6NN5.d44956e5.js";import"./chunk-GLOC4ABQ.54c1521f.js";import"./chunk-57USKCMY.339b34ad.js";import"./chunk-E6FEPMVF.c62dcddf.js";import{e as b}from"./styles.a023d167.js";import"./chunk-YDTVC7MM.cb3895f8.js";var x=Object.defineProperty,M=Object.getOwnPropertyDescriptor,_=(r,t,e,o)=>{for(var n=o>1?void 0:o?M(t,e):t,i=r.length-1,a;i>=0;i--)(a=r[i])&&(n=(o?a(t,e,n):a(n))||n);return o&&n&&x(t,e,n),n};const y="freq-letters";class c extends h{constructor(){super();this.text="Hello there! - Obi-wan Kenobi"}_onInput(t){this.text=t.target.value}render(){const t=j();for(let s=0;s<this.text.length;s++){const p=this.text.toLocaleUpperCase().charAt(s);p!==" "&&t.add(p)}const e=t.entriesSorted("valueReverse"),o=g.minMaxAvg(e),n=Math.min(e.length,3),i=e.slice(0,n),a=s=>Math.round(s[1]/o.total*100);return m`
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
		`}}l(c,"styles",[b,f`
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
`]);_([v()],c.prototype,"text",2);customElements.define(y,c);export{c as FreqLettersElement,y as tagName};
