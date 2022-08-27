import{b as c,r as a,M as s,Q as u,$ as g,a as m}from"./client-shim.9530acfc.js";import{e as p}from"./chunks/styles.b6bfd690.js";var h=Object.defineProperty,f=Object.getOwnPropertyDescriptor,v=(n,o,l,t)=>{for(var e=t>1?void 0:t?f(o,l):o,r=n.length-1,i;r>=0;r--)(i=n[r])&&(e=(t?i(o,l,e):i(e))||e);return t&&e&&h(o,l,e),e};const y="grid-colour-element";class d extends c{static styles=[p,a`
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
    `];colours=new Map;constructor(){super();this.title=""}updated(o){const l=this.shadowRoot.getElementById("grid");l.cellRenderer=(t,e,r)=>{const i=this.colours.get(s.cellKeyString(t));if(i!==void 0)return r.fillStyle=i.colour,r.fillRect(e.x,e.y,e.width,e.height),!0},l.addEventListener("cellPointerMove",t=>{const e=t.detail;if(e===void 0)return;const r=this.colours.get(s.cellKeyString(e));this.title=`Cell ${e.x}, ${e.y} has data ${JSON.stringify(r)}`})}random(){const o=this.shadowRoot.getElementById("grid");if(o===null)throw new Error("Grid not found");const l=o.getGrid(),t=["bisque","cadetblue","cornflowerblue","coral"],e=()=>u.randomElement(t);for(let r of s.cells(l))this.colours.set(s.cellKeyString(r),{colour:e(),funk:Math.random()});o.draw()}render(){return g`
    <section>
      <grid-editor rows="15" cols="15" pixelSize="20" id="grid"></grid-editor>
      <button @click="${this.random}">Randomise</button>
      <div id="title">${this.title}</div>
    </section>
    `}}v([m({attribute:!0,type:String})],d.prototype,"title",2);customElements.define(y,d);export{d as GridColourElement,y as tagName};
