var d=Object.defineProperty;var u=(r,e,t)=>e in r?d(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t;var p=(r,e,t)=>(u(r,typeof e!="symbol"?e+"":e,t),t);import{s as f,r as h,$ as m,e as v}from"./vendor.a3225d27.js";import{f as g,K as b}from"./bundle.46f9cf95.js";import{e as x}from"./styles.810aebe3.js";import"./chunk-EZEZXIPN.e33bee28.js";import"./chunk-HCHJFXUB.99dbbc1f.js";import"./chunk-X3ZGK7G7.0ec20d2d.js";import"./chunk-OW53XONI.6c7bafde.js";import"./chunk-6TOA6ITG.8d1de678.js";import"./chunk-FM2K2PHF.079c4314.js";import"./chunk-776RPVJQ.ce76deb3.js";var j=Object.defineProperty,_=Object.getOwnPropertyDescriptor,y=(r,e,t,o)=>{for(var n=o>1?void 0:o?_(e,t):e,i=r.length-1,a;i>=0;i--)(a=r[i])&&(n=(o?a(e,t,n):a(n))||n);return o&&n&&j(e,t,n),n};const O="freq-letters";class c extends f{constructor(){super();this.text="Hello there! - Obiwan Kenobi"}_onInput(e){this.text=e.target.value}render(){const e=g();for(let s=0;s<this.text.length;s++){const l=this.text.toLocaleUpperCase().charAt(s);l!==" "&&e.add(l)}const t=e.entriesSorted("valueReverse"),o=b.minMaxAvg(t),n=Math.min(t.length,3),i=t.slice(0,n),a=s=>Math.round(s[1]/o.total*100);return m`
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
`]);y([v()],c.prototype,"text",2);customElements.define(O,c);export{c as FreqLettersElement,O as tagName};
