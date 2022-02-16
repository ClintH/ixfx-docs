var u=Object.defineProperty;var d=(r,t,e)=>t in r?u(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e;var p=(r,t,e)=>(d(r,typeof t!="symbol"?t+"":t,e),e);import{s as f,r as h,$ as m,e as v}from"./vendor.a3225d27.js";import{f as b,K as g}from"./bundle.f174d965.js";import{e as j}from"./styles.af89b8ed.js";import"./chunk-MTK5JJI3.2542cf04.js";import"./chunk-UWLZSNHO.60128285.js";import"./chunk-25RM45LF.6197efee.js";import"./chunk-6JTGCZJL.ec4f5d4b.js";import"./chunk-FRVUOYS5.9da9d51c.js";import"./chunk-HMIKWFIT.8fbf0b10.js";import"./chunk-YFNN25WV.35b6f5f2.js";import"./chunk-BWZCVD5D.b52e1602.js";import"./chunk-KWHKIGT7.cb30f031.js";var x=Object.defineProperty,_=Object.getOwnPropertyDescriptor,y=(r,t,e,o)=>{for(var n=o>1?void 0:o?_(t,e):t,i=r.length-1,a;i>=0;i--)(a=r[i])&&(n=(o?a(t,e,n):a(n))||n);return o&&n&&x(t,e,n),n};const K="freq-letters";class c extends f{constructor(){super();this.text="Hello there! - Obi-wan Kenobi"}_onInput(t){this.text=t.target.value}render(){const t=b();for(let s=0;s<this.text.length;s++){const l=this.text.toLocaleUpperCase().charAt(s);l!==" "&&t.add(l)}const e=t.entriesSorted("valueReverse"),o=g.minMaxAvg(e),n=Math.min(e.length,3),i=e.slice(0,n),a=s=>Math.round(s[1]/o.total*100);return m`
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
		`}}p(c,"styles",[j,h`
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
`]);y([v()],c.prototype,"text",2);customElements.define(K,c);export{c as FreqLettersElement,K as tagName};
