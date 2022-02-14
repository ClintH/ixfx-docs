var d=Object.defineProperty;var u=(n,e,t)=>e in n?d(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var p=(n,e,t)=>(u(n,typeof e!="symbol"?e+"":e,t),t);import{a as f,b as h,d as m,f as v}from"./vendor.1de7a7ed.js";import{f as b,K as g}from"./bundle.517499b3.js";import{e as j}from"./styles.94e3cd83.js";import"./chunk-3SMTKDXD.7befeba5.js";import"./chunk-UWLZSNHO.00e5f090.js";import"./chunk-V6WGO73W.4b0edf4f.js";import"./chunk-6JTGCZJL.784fcc38.js";import"./chunk-FRVUOYS5.3d3ad9f9.js";import"./chunk-5WNVOIIJ.b9e34901.js";import"./chunk-YFNN25WV.1363eb0c.js";import"./chunk-MBZ4GFG7.8e6d603a.js";import"./chunk-IV26GIHI.38b15ea0.js";var x=Object.defineProperty,O=Object.getOwnPropertyDescriptor,_=(n,e,t,o)=>{for(var s=o>1?void 0:o?O(e,t):e,i=n.length-1,a;i>=0;i--)(a=n[i])&&(s=(o?a(e,t,s):a(s))||s);return o&&s&&x(e,t,s),s};const y="freq-letters";class c extends f{constructor(){super();this.text="Hello there! - Obi-wan Kenobi"}_onInput(e){this.text=e.target.value}render(){const e=b();for(let r=0;r<this.text.length;r++){const l=this.text.toLocaleUpperCase().charAt(r);l!==" "&&e.add(l)}const t=e.entriesSorted("valueReverse"),o=g.minMaxAvg(t),s=Math.min(t.length,3),i=t.slice(0,s),a=r=>Math.round(r[1]/o.total*100);return m`
    <div class="container">
      <div class="toolbar">
        <input @input="${this._onInput}" type="text" .value="${this.text}">
      </div>
      <div>
        Top ${s} letters:
        <ol>
        ${i.map(r=>m`<li>'${r[0]}' ${a(r)}%</li>`)}
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
`]);_([v()],c.prototype,"text",2);customElements.define(y,c);export{c as FreqLettersElement,y as tagName};
