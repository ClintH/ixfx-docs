var m=Object.defineProperty;var v=(r,t,e)=>t in r?m(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e;var c=(r,t,e)=>(v(r,typeof t!="symbol"?t+"":t,e),e);import{a as b,r as C,$ as f}from"./vendor.d6870787.js";import{e as R}from"./styles.8e3dc5e5.js";import{o as k,W as n}from"./chunk-ODBLOXCD.602f7099.js";import"./chunk-AWXCQ245.1dcbd11a.js";import"./chunk-3CYWIYMP.09a63feb.js";import"./chunk-FQLUQVDZ.7e80d7b0.js";const y="grid-visitor-element";class g extends b{constructor(){super();c(this,"visitorKind");c(this,"lastClicked",{x:0,y:0});c(this,"stopping",!1);this.visitorKind="Random Contiguous"}updated(t){this.shadowRoot.getElementById("grid").addEventListener("cellPointerUp",o=>{this.lastClicked=o.detail,this.stop(),setTimeout(()=>this.start(),100)})}onVisitorChange(t){this.visitorKind=t.target.value}updateButtons(t){this.shadowRoot.getElementById("btnStart").disabled=t,this.shadowRoot.getElementById("btnStop").disabled=!t}start(){const t=this.shadowRoot.getElementById("grid"),e=100,o=t.getGrid(),u=k(d=>n.cellKeyString(d)),l={visited:u},i=this.lastClicked;let s;switch(this.visitorKind){case"Depth":s=n.visitorDepth(o,i,l);break;case"Breadth":s=n.visitorBreadth(o,i,l);break;case"Row":s=n.visitorRow(o,i,l);break;case"Column":s=n.visitorColumn(o,i,l);break;case"Random Contiguous":s=n.visitorRandomContiguous(o,i,l);break;default:s=n.visitorRandom(o,i,l)}this.stopping=!1,t.cellRenderer=(d,a,p)=>u.has(d)?(p.fillStyle="pink",p.fillRect(a.x,a.y,a.width,a.height),!0):!1,this.updateButtons(!0);const h=()=>{if(this.stopping)return;const d=s.next(),a=d.value;if(d.done){this.updateButtons(!1),t.selectedCell=i;return}t.selectedCell=a,setTimeout(h,e)};setTimeout(h,e)}stop(){const t=this.shadowRoot.getElementById("grid");this.stopping||this.updateButtons(!1),this.stopping=!0,t.selectedCell=this.lastClicked}render(){return f`
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
    `}}c(g,"styles",[R,C`
    #grid {
      --grid-color:var(--divider);
      --hover-color: var(--bg-contrast);
      --selected-color: var(--yellow);
    }
    `]);customElements.define(y,g);export{g as GridVisitorElement,y as tagName};
