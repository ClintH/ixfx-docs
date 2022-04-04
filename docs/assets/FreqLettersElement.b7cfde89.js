var d=Object.defineProperty;var u=(o,t,e)=>t in o?d(o,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):o[t]=e;var l=(o,t,e)=>(u(o,typeof t!="symbol"?t+"":t,e),e);import{a as f,r as v,$ as c,b as h}from"./vendor.d6870787.js";import{f as g,K as x}from"./chunk-PUGMC3D4.b587e8b3.js";import"./chunk-LZ7XWTRR.a62618b8.js";import"./chunk-AW5RWBWK.f5ac0da0.js";import"./chunk-ODBLOXCD.602f7099.js";import"./chunk-7TKMEWX5.f8def376.js";import"./chunk-3CYWIYMP.09a63feb.js";import"./chunk-VFK4G76S.4e6d0279.js";import"./chunk-4DU25RMK.d28002ea.js";import"./chunk-XYAFQIIV.7cd12906.js";import"./chunk-I3R3AECV.3528ce89.js";import"./chunk-AWXCQ245.1dcbd11a.js";import{e as _}from"./styles.8e3dc5e5.js";import"./chunk-FQLUQVDZ.7e80d7b0.js";var b=Object.defineProperty,y=Object.getOwnPropertyDescriptor,$=(o,t,e,n)=>{for(var r=n>1?void 0:n?y(t,e):t,s=o.length-1,a;s>=0;s--)(a=o[s])&&(r=(n?a(t,e,r):a(r))||r);return n&&r&&b(t,e,r),r};const O="freq-letters";class p extends f{constructor(){super();this.text="Hello there! - Obi-wan Kenobi"}_onInput(t){this.text=t.target.value}render(){const t=g();for(let i=0;i<this.text.length;i++){const m=this.text.toLocaleUpperCase().charAt(i);m!==" "&&t.add(m)}const e=t.entriesSorted("valueReverse"),n=x.minMaxAvg(e),r=Math.min(e.length,3),s=e.slice(0,r),a=i=>Math.round(i[1]/n.total*100);return c`
    <div class="container">
      <div class="toolbar">
        <input @input="${this._onInput}" type="text" .value="${this.text}">
      </div>
      <div>
        Top ${r} letters:
        <ol>
        ${s.map(i=>c`<li>'${i[0]}' ${a(i)}%</li>`)}
        </ol>
        </div>
    </div>
		`}}l(p,"styles",[_,v`
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
`]);$([h()],p.prototype,"text",2);customElements.define(O,p);export{p as FreqLettersElement,O as tagName};
