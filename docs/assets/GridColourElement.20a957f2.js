var a=Object.defineProperty;var u=(i,t,r)=>t in i?a(i,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):i[t]=r;var d=(i,t,r)=>(u(i,typeof t!="symbol"?t+"":t,r),r);import{a as g,r as m,$ as p,b as f}from"./vendor.c33530a8.js";import{e as h}from"./styles.801fcc34.js";import{G as n,d as v}from"./chunk-GK535KVL.5ac52ed3.js";import"./chunk-OE2F6QKM.bc057148.js";var y=Object.defineProperty,b=Object.getOwnPropertyDescriptor,w=(i,t,r,o)=>{for(var e=o>1?void 0:o?b(t,r):t,l=i.length-1,s;l>=0;l--)(s=i[l])&&(e=(o?s(t,r,e):s(e))||e);return o&&e&&y(t,r,e),e};const x="grid-colour-element";class c extends g{constructor(){super();d(this,"colours",new Map);this.title=""}updated(t){const r=this.shadowRoot.getElementById("grid");r.cellRenderer=(o,e,l)=>{const s=this.colours.get(n.cellKeyString(o));if(s!==void 0)return l.fillStyle=s.colour,l.fillRect(e.x,e.y,e.width,e.height),!0},r.addEventListener("cellPointerMove",o=>{const e=o.detail;if(e===void 0)return;const l=this.colours.get(n.cellKeyString(e));this.title=`Cell ${e.x}, ${e.y} has data ${JSON.stringify(l)}`})}random(){const t=this.shadowRoot.getElementById("grid");if(t===null)throw new Error("Grid not found");const r=t.getGrid(),o=["bisque","cadetblue","cornflowerblue","coral"],e=()=>v.randomElement(o);for(let l of n.cells(r))this.colours.set(n.cellKeyString(l),{colour:e(),funk:Math.random()});t.draw()}render(){return p`
    <section>
      <grid-editor rows="15" cols="15" pixelSize="20" id="grid"></grid-editor>
      <button @click="${this.random}">Randomise</button>
      <div id="title">${this.title}</div>
    </section>
    `}}d(c,"styles",[h,m`
    #grid {
      --grid-color:var(--divider);
      --hover-color: var(--bg-contrast);
      --selected-color: var(--yellow);
    }
    section {
      display: flex;
      background-color: aliceblue;
      border: 2px solid black;
      flex-direction: column;
      color: black;
      padding: 1em;
      max-width: 350px;
      margin: 0 auto;
      align-items: center;
    }
    `]);w([f({attribute:!0,type:String})],c.prototype,"title",2);customElements.define(x,c);export{c as GridColourElement,x as tagName};
