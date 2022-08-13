import{b as c,r as d,$ as p,a as u}from"./client-shim.cda72367.js";import{M as f,R as v}from"./chunks/chunk-VMFDTDO4.003de47f.js";import"./chunks/chunk-IP2OCIJK.bdd1e666.js";import{e as h}from"./chunks/styles.b4645976.js";var g=Object.defineProperty,x=Object.getOwnPropertyDescriptor,_=(a,t,n,s)=>{for(var e=s>1?void 0:s?x(t,n):t,o=a.length-1,i;o>=0;o--)(i=a[o])&&(e=(s?i(t,n,e):i(e))||e);return s&&e&&g(t,n,e),e};const b="freq-letters";class m extends c{static styles=[h,d`
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
`];constructor(){super();this.text="Hello there! - Obi-wan Kenobi"}_onInput(t){this.text=t.target.value}render(){const t=f();for(let r=0;r<this.text.length;r++){const l=this.text.toLocaleUpperCase().charAt(r);l!==" "&&t.add(l)}const n=t.entriesSorted("valueReverse"),s=v.minMaxAvg(n),e=Math.min(n.length,3),o=n.slice(0,e),i=r=>Math.round(r[1]/s.total*100);return p`
    <div class="container">
      <div class="toolbar">
        <input @input="${this._onInput}" type="text" .value="${this.text}">
      </div>
      <div>
        Top ${e} letters:
        <ol>
        ${o.map(r=>p`<li>'${r[0]}' ${i(r)}%</li>`)}
        </ol>
        </div>
    </div>
		`}}_([u()],m.prototype,"text",2);customElements.define(b,m);export{m as FreqLettersElement,b as tagName};
