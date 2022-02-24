var d=Object.defineProperty;var u=(r,t,e)=>t in r?d(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e;var l=(r,t,e)=>(u(r,typeof t!="symbol"?t+"":t,e),e);import{s as h,r as f,$ as m,e as b}from"./vendor.a3225d27.js";import{f as v,K as j}from"./bundle.09734b0b.js";import{e as g}from"./styles.0da1a4a9.js";import"./chunk-4QHRIV2D.a888d38b.js";import"./chunk-GLOC4ABQ.1540f006.js";import"./chunk-57USKCMY.8e2e6641.js";import"./chunk-YDTVC7MM.cb3895f8.js";import"./chunk-E6FEPMVF.c62dcddf.js";import"./chunk-VAHXRYL4.7bd99bcd.js";import"./chunk-6RSYJ7PX.b9b486b6.js";import"./chunk-HEUMPV43.b1865ec8.js";import"./chunk-MLAH6NN5.257adfe4.js";import"./chunk-C2GSEUUB.5e1d8426.js";import"./chunk-YNVHP56G.6e14c695.js";var x=Object.defineProperty,M=Object.getOwnPropertyDescriptor,_=(r,t,e,o)=>{for(var n=o>1?void 0:o?M(t,e):t,i=r.length-1,a;i>=0;i--)(a=r[i])&&(n=(o?a(t,e,n):a(n))||n);return o&&n&&x(t,e,n),n};const y="freq-letters";class c extends h{constructor(){super();this.text="Hello there! - Obi-wan Kenobi"}_onInput(t){this.text=t.target.value}render(){const t=v();for(let s=0;s<this.text.length;s++){const p=this.text.toLocaleUpperCase().charAt(s);p!==" "&&t.add(p)}const e=t.entriesSorted("valueReverse"),o=j.minMaxAvg(e),n=Math.min(e.length,3),i=e.slice(0,n),a=s=>Math.round(s[1]/o.total*100);return m`
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
		`}}l(c,"styles",[g,f`
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
`]);_([b()],c.prototype,"text",2);customElements.define(y,c);export{c as FreqLettersElement,y as tagName};
