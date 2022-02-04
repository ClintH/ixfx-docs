var d=Object.defineProperty;var u=(r,e,t)=>e in r?d(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t;var p=(r,e,t)=>(u(r,typeof e!="symbol"?e+"":e,t),t);import{s as f,r as h,$ as m,e as v}from"./vendor.ae2f83e2.js";import{m as g,K as x}from"./bundle.f04190c0.js";import"./chunk-L7NPGFXB.2df40d37.js";import"./chunk-RRAKEYPR.51ea3209.js";import"./chunk-HKPWQDQW.6ecee2ff.js";import"./chunk-EJYCGNKW.43480ee8.js";import"./chunk-ZKEVKSIO.c58141c6.js";import"./chunk-2THIUUNP.1ea09146.js";import"./chunk-U6RUNGK3.ce89a9ef.js";var j=Object.defineProperty,b=Object.getOwnPropertyDescriptor,K=(r,e,t,i)=>{for(var n=i>1?void 0:i?b(e,t):e,s=r.length-1,a;s>=0;s--)(a=r[s])&&(n=(i?a(e,t,n):a(n))||n);return i&&n&&j(e,t,n),n};const _="freq-letters";class l extends f{constructor(){super();this.text="Hello there! - Obiwan Kenobi"}_onInput(e){this.text=e.target.value}render(){const e=g();for(let o=0;o<this.text.length;o++){const c=this.text.toLocaleUpperCase().charAt(o);c!==" "&&e.add(c)}const t=e.entriesSorted("valueReverse"),i=x.minMaxAvg(t),n=Math.min(t.length,3),s=t.slice(0,n),a=o=>Math.round(o[1]/i.total*100);return m`
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
		`}}p(l,"styles",h`
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
  `);K([v()],l.prototype,"text",2);customElements.define(_,l);export{l as FreqLettersElement,_ as tagName};
