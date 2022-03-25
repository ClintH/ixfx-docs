import{b as c,r as d,$ as m,a as u}from"./client-shim.cda72367.js";import{f,K as v}from"./chunks/chunk-HYVQIQVS.ac4108eb.js";import"./chunks/chunk-OMXZMOOU.e9ad33f4.js";import"./chunks/chunk-TSWQ4JT6.e4dc2800.js";import"./chunks/chunk-PHF3FPUO.fbbc39e3.js";import"./chunks/chunk-QIWUQGQJ.e6594f26.js";import"./chunks/chunk-QAZYUFOI.8a9663bc.js";import"./chunks/chunk-SJVFW73P.e7d5b176.js";import"./chunks/chunk-DTRNDG6C.d0f370a4.js";import"./chunks/chunk-HGDBKEIQ.5ba97fe9.js";import"./chunks/chunk-XFTV7E35.542cf193.js";import"./chunks/chunk-U4IZE4J2.68fe18db.js";import{e as h}from"./chunks/styles.b557ca03.js";import"./chunks/chunk-FQLUQVDZ.735c98e3.js";var g=Object.defineProperty,x=Object.getOwnPropertyDescriptor,_=(a,e,o,i)=>{for(var t=i>1?void 0:i?x(e,o):e,n=a.length-1,s;n>=0;n--)(s=a[n])&&(t=(i?s(e,o,t):s(t))||t);return i&&t&&g(e,o,t),t};const b="freq-letters";class l extends c{static styles=[h,d`
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
`];constructor(){super();this.text="Hello there! - Obi-wan Kenobi"}_onInput(e){this.text=e.target.value}render(){const e=f();for(let r=0;r<this.text.length;r++){const p=this.text.toLocaleUpperCase().charAt(r);p!==" "&&e.add(p)}const o=e.entriesSorted("valueReverse"),i=v.minMaxAvg(o),t=Math.min(o.length,3),n=o.slice(0,t),s=r=>Math.round(r[1]/i.total*100);return m`
    <div class="container">
      <div class="toolbar">
        <input @input="${this._onInput}" type="text" .value="${this.text}">
      </div>
      <div>
        Top ${t} letters:
        <ol>
        ${n.map(r=>m`<li>'${r[0]}' ${s(r)}%</li>`)}
        </ol>
        </div>
    </div>
		`}}_([u()],l.prototype,"text",2);customElements.define(b,l);export{l as FreqLettersElement,b as tagName};
