import{c as h,g as u,f as g}from"./client-shim.8cb18301.js";import{e as m}from"./chunks/styles.b86f48e3.js";import{I as v,o as n}from"./chunks/chunk-35TJPVSI.8bc3f32a.js";const b="grid-visitor-element";class C extends h{static styles=[m,u`
    #grid {
      --grid-color:var(--divider);
      --hover-color: var(--bg-contrast);
      --selected-color: var(--yellow);
    }
    `];visitorKind;lastClicked={x:0,y:0};stopping=!1;constructor(){super();this.visitorKind="Random Contiguous"}updated(t){this.shadowRoot.getElementById("grid").addEventListener("cellPointerUp",e=>{console.log(e.detail),this.lastClicked=e.detail,this.stop(),setTimeout(()=>this.start(),100)})}onVisitorChange(t){this.visitorKind=t.target.value}updateButtons(t){this.shadowRoot.getElementById("btnStart").disabled=t,this.shadowRoot.getElementById("btnStop").disabled=!t}start(){const t=this.shadowRoot.getElementById("grid"),d=100,e=t.getGrid(),c=v.mutable(i=>n.cellKeyString(i)),l={visited:c},o=this.lastClicked;let s;switch(console.log("lastClicked",o),this.visitorKind){case"Depth":s=n.visitorDepth(e,o,l);break;case"Breadth":s=n.visitorBreadth(e,o,l);break;case"Row":s=n.visitorRow(e,o,l);break;case"Column":s=n.visitorColumn(e,o,l);break;case"Random Contiguous":s=n.visitorRandomContiguous(e,o,l);break;default:s=n.visitorRandom(e,o,l)}this.stopping=!1,t.cellRenderer=(i,r,a)=>c.has(i)?(a.fillStyle="pink",a.fillRect(r.x,r.y,r.width,r.height),!0):!1,this.updateButtons(!0);const p=()=>{if(!this.stopping)try{const i=s.next(),r=i.value;if(i.done){this.updateButtons(!1),t.selectedCell=o;return}t.selectedCell=r,setTimeout(p,d)}catch(i){console.error(i)}};setTimeout(p,d)}stop(){const t=this.shadowRoot.getElementById("grid");this.stopping||this.updateButtons(!1),this.stopping=!0,t.selectedCell=this.lastClicked}render(){return g`
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
