import{b as u,r as h,$ as m}from"./client-shim.cda72367.js";import{e as g}from"./chunks/styles.591694aa.js";import{W as v,ae as s}from"./chunks/chunk-QOZ2BRCA.14308385.js";import"./chunks/chunk-OE2F6QKM.34a70cb8.js";import"./chunks/chunk-U4IZE4J2.1410a545.js";import"./chunks/chunk-25KFP6OF.934c8512.js";import"./chunks/chunk-6SYKIMQH.63e605dc.js";const b="grid-visitor-element";class C extends u{static styles=[g,h`
    #grid {
      --grid-color:var(--divider);
      --hover-color: var(--bg-contrast);
      --selected-color: var(--yellow);
    }
    `];visitorKind;lastClicked={x:0,y:0};stopping=!1;constructor(){super();this.visitorKind="Random Contiguous"}updated(t){this.shadowRoot.getElementById("grid").addEventListener("cellPointerUp",e=>{this.lastClicked=e.detail,this.stop(),setTimeout(()=>this.start(),100)})}onVisitorChange(t){this.visitorKind=t.target.value}updateButtons(t){this.shadowRoot.getElementById("btnStart").disabled=t,this.shadowRoot.getElementById("btnStop").disabled=!t}start(){const t=this.shadowRoot.getElementById("grid"),d=100,e=t.getGrid(),c=v(r=>s.cellKeyString(r)),n={visited:c},i=this.lastClicked;let o;switch(this.visitorKind){case"Depth":o=s.visitorDepth(e,i,n);break;case"Breadth":o=s.visitorBreadth(e,i,n);break;case"Row":o=s.visitorRow(e,i,n);break;case"Column":o=s.visitorColumn(e,i,n);break;case"Random Contiguous":o=s.visitorRandomContiguous(e,i,n);break;default:o=s.visitorRandom(e,i,n)}this.stopping=!1,t.cellRenderer=(r,l,a)=>c.has(r)?(a.fillStyle="pink",a.fillRect(l.x,l.y,l.width,l.height),!0):!1,this.updateButtons(!0);const p=()=>{if(this.stopping)return;const r=o.next(),l=r.value;if(r.done){this.updateButtons(!1),t.selectedCell=i;return}t.selectedCell=l,setTimeout(p,d)};setTimeout(p,d)}stop(){const t=this.shadowRoot.getElementById("grid");this.stopping||this.updateButtons(!1),this.stopping=!0,t.selectedCell=this.lastClicked}render(){return m`
    <div class="toolbar centered">
      <section>
        <button @click="${this.start}" id="btnStart">Start</button>
        <button disabled @click="${this.stop}" id="btnStop">Stop</button>
      </section>
      <section>
        <label>Function:</label>
        <select @input="${this.onVisitorChange}" id="selVisTechnique">
          <option>Random Contiguous</option>
          <option>Random</option>
          <option>Depth</option>
          <option>Breadth</option>
          <option>Row</option>
          <option>Column</option>
        </select>
      </section>
    </div>
    <div>
      <grid-editor rows="15" cols="15" pixelSize="15" id="grid" />
    </div>
    `}}customElements.define(b,C);export{C as GridVisitorElement,b as tagName};
