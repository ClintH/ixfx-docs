var u=Object.defineProperty;var f=(r,e,t)=>e in r?u(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t;var p=(r,e,t)=>(f(r,typeof e!="symbol"?e+"":e,t),t);import{s as d,r as h,$ as m,e as v}from"./vendor.ae2f83e2.js";import{f as g,K as x}from"./bundle.ef063f06.js";import{e as j}from"./styles.a04561a2.js";import"./chunk-63GPL4EQ.94292053.js";import"./chunk-4WJCK6OW.dc07580d.js";import"./chunk-KYWIDCWW.7a3a5fae.js";import"./chunk-RGWQELNS.82f84363.js";import"./chunk-5VE7K3W4.abc39e5b.js";import"./chunk-TD4SHBHU.a3ff9292.js";var b=Object.defineProperty,_=Object.getOwnPropertyDescriptor,y=(r,e,t,o)=>{for(var n=o>1?void 0:o?_(e,t):e,i=r.length-1,a;i>=0;i--)(a=r[i])&&(n=(o?a(e,t,n):a(n))||n);return o&&n&&b(e,t,n),n};const W="freq-letters";class l extends d{constructor(){super();this.text="Hello there! - Obiwan Kenobi"}_onInput(e){this.text=e.target.value}render(){const e=g();for(let s=0;s<this.text.length;s++){const c=this.text.toLocaleUpperCase().charAt(s);c!==" "&&e.add(c)}const t=e.entriesSorted("valueReverse"),o=x.minMaxAvg(t),n=Math.min(t.length,3),i=t.slice(0,n),a=s=>Math.round(s[1]/o.total*100);return m`
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
`]);y([v()],l.prototype,"text",2);customElements.define(W,l);export{l as FreqLettersElement,W as tagName};
