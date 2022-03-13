import{b as u,r as h,$ as g}from"./client-shim.cda72367.js";import{e as m}from"./chunks/styles.b557ca03.js";import{s as v,T as s}from"./chunks/chunk-6TM6SJDV.d463ae79.js";import"./chunks/chunk-QLMTBJ7O.4bda2143.js";import"./chunks/chunk-4THA4YVV.4ccaabcd.js";import"./chunks/chunk-FQLUQVDZ.735c98e3.js";const b="grid-visitor-element";class C extends u{static styles=[m,h`
    #grid {
      --grid-color:var(--divider);
      --hover-color: var(--bg-contrast);
      --selected-color: var(--yellow);
    }
    `];visitorKind;lastClicked={x:0,y:0};stopping=!1;constructor(){super();this.visitorKind="Random Contiguous"}updated(t){this.shadowRoot.getElementById("grid").addEventListener("cellPointerUp",e=>{this.lastClicked=e.detail,this.stop(),setTimeout(()=>this.start(),100)})}onVisitorChange(t){this.visitorKind=t.target.value}updateButtons(t){this.shadowRoot.getElementById("btnStart").disabled=t,this.shadowRoot.getElementById("btnStop").disabled=!t}start(){const t=this.shadowRoot.getElementById("grid"),d=100,e=t.getGrid(),c=v(r=>s.cellKeyString(r)),n={visited:c},i=this.lastClicked;let o;switch(this.visitorKind){case"Depth":o=s.visitorDepth(e,i,n);break;case"Breadth":o=s.visitorBreadth(e,i,n);break;case"Row":o=s.visitorRow(e,i,n);break;case"Column":o=s.visitorColumn(e,i,n);break;case"Random Contiguous":o=s.visitorRandomContiguous(e,i,n);break;default:o=s.visitorRandom(e,i,n)}this.stopping=!1,t.cellRenderer=(r,l,a)=>c.has(r)?(a.fillStyle="pink",a.fillRect(l.x,l.y,l.width,l.height),!0):!1,this.updateButtons(!0);const p=()=>{if(this.stopping)return;const r=o.next(),l=r.value;if(r.done){this.updateButtons(!1),t.selectedCell=i;return}t.selectedCell=l,setTimeout(p,d)};setTimeout(p,d)}stop(){const t=this.shadowRoot.getElementById("grid");this.stopping||this.updateButtons(!1),this.stopping=!0,t.selectedCell=this.lastClicked}render(){return g`
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
