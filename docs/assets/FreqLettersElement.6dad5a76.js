var u=Object.defineProperty;var d=(r,t,e)=>t in r?u(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e;var p=(r,t,e)=>(d(r,typeof t!="symbol"?t+"":t,e),e);import{s as f,r as h,$ as m,e as v}from"./vendor.d00e998c.js";import{f as g,K as x}from"./bundle.978286b9.js";import{e as b}from"./styles.820370d3.js";import"./chunk-NT44FLGP.251679ab.js";import"./chunk-4WJCK6OW.7396b794.js";import"./chunk-VN6BZR7Y.59fd31c7.js";import"./chunk-KYWIDCWW.4c25be89.js";import"./chunk-G44UTPJC.92d22f4f.js";import"./chunk-SG7ZQ2JY.9cef9652.js";var j=Object.defineProperty,_=Object.getOwnPropertyDescriptor,y=(r,t,e,o)=>{for(var n=o>1?void 0:o?_(t,e):t,i=r.length-1,a;i>=0;i--)(a=r[i])&&(n=(o?a(t,e,n):a(n))||n);return o&&n&&j(t,e,n),n};const $="freq-letters";class l extends f{constructor(){super();this.text="Hello there! - Obiwan Kenobi"}_onInput(t){this.text=t.target.value}render(){const t=g();for(let s=0;s<this.text.length;s++){const c=this.text.toLocaleUpperCase().charAt(s);c!==" "&&t.add(c)}const e=t.entriesSorted("valueReverse"),o=x.minMaxAvg(e),n=Math.min(e.length,3),i=e.slice(0,n),a=s=>Math.round(s[1]/o.total*100);return m`
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
		`}}p(l,"styles",[b,h`
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
`]);y([v()],l.prototype,"text",2);customElements.define($,l);export{l as FreqLettersElement,$ as tagName};
