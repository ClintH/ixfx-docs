var d=Object.defineProperty;var u=(r,e,t)=>e in r?d(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t;var p=(r,e,t)=>(u(r,typeof e!="symbol"?e+"":e,t),t);import{s as f,r as h,$ as m,e as v}from"./vendor.994fac77.js";import{m as g,K as x}from"./bundle.606f4dfe.js";import"./chunk-L7NPGFXB.27ec158a.js";import"./chunk-O3VPZBOU.e8cd7407.js";import"./chunk-RELB4ERA.359f0ce7.js";import"./chunk-C54446BC.dacc5f5a.js";import"./chunk-D6LT45IM.142de38b.js";import"./chunk-XM3ONRUN.91524ce4.js";import"./chunk-BLJYULJU.fe21a7d9.js";var j=Object.defineProperty,b=Object.getOwnPropertyDescriptor,_=(r,e,t,i)=>{for(var n=i>1?void 0:i?b(e,t):e,s=r.length-1,a;s>=0;s--)(a=r[s])&&(n=(i?a(e,t,n):a(n))||n);return i&&n&&j(e,t,n),n};const O="freq-letters";class c extends f{constructor(){super();this.text="Hello there! - Obiwan Kenobi"}_onInput(e){this.text=e.target.value}render(){const e=g();for(let o=0;o<this.text.length;o++){const l=this.text.toLocaleUpperCase().charAt(o);l!==" "&&e.add(l)}const t=e.entriesSorted("valueReverse"),i=x.minMaxAvg(t),n=Math.min(t.length,3),s=t.slice(0,n),a=o=>Math.round(o[1]/i.total*100);return m`
    <div id="container">
      <div id="toolbar">
        <input @input="${this._onInput}" type="text" .value="${this.text}">
      </div>
      <div>
        Top ${n} letters:
        <ol>
        ${s.map(o=>m`<li>'${o[0]}' ${a(o)}%</li>`)}
        </ol>
        </div>
    </div>
		`}}p(c,"styles",h`
  #container {
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 1em;
  }
  #toolbar {
    display: flex;
    padding: 1em;
  }
  #toolbar input {
    width: 15em;
    margin-right: 1em;
    margin-left: 0.3em;
    padding: 0.3em;
    font-size: 1.5em;
  }
  ol {
    margin: 0;
    margin-top: 0.3em;
    padding: 0;
  }
  `);_([v()],c.prototype,"text",2);customElements.define(O,c);export{c as FreqLettersElement,O as tagName};
