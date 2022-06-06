import{b as d,r as c,$ as p}from"./client-shim.cda72367.js";import{e as f}from"./chunks/styles.591694aa.js";import{ae as i,C as h}from"./chunks/chunk-QOZ2BRCA.14308385.js";import"./chunks/chunk-OE2F6QKM.34a70cb8.js";import"./chunks/chunk-U4IZE4J2.1410a545.js";import{D as g}from"./chunks/chunk-FJ2C6UZS.54105029.js";import"./chunks/chunk-25KFP6OF.934c8512.js";import"./chunks/chunk-BSJKVIJG.f7604bb7.js";import"./chunks/chunk-4X2SZKK7.4dbfee46.js";import"./chunks/chunk-6SYKIMQH.63e605dc.js";const m="grid-offset-element";class u extends d{static styles=[f,c`
    #offsetsGrid {
      --grid-color:var(--divider);
      --hover-color: var(--bg-contrast);
      --selected-color: var(--yellow);
    }
    `];selectedCell;grid;wrapStyle;distance;constructor(){super();this.selectedCell={x:0,y:0},this.wrapStyle="stop",this.distance=2}offsets(){const e=this.shadowRoot.getElementById("offsetsGrid"),t=e.selectedCell,s=i.offsetCardinals(this.grid,t,this.distance,this.wrapStyle);e.cellRenderer=(r,l,n)=>{const o=Object.entries(s).find(a=>i.cellEquals(a[1],r));return o===void 0?!1:(g.textBlockAligned(n,o[0],{vert:"center",horiz:"center",bounds:l,fillStyle:h.getCssVariable("fg","yellow")}),!0)}}onCellPointerMove(e){const t=e.detail;if(t===void 0)return;const s=e.target;s.selectedCell=t,this.offsets()}updated(e){const t=this.shadowRoot.getElementById("offsetsGrid");t.addEventListener("cellPointerMove",s=>this.onCellPointerMove(s)),this.grid=t.getGrid()}onWrapChange(e){this.wrapStyle=e.target.value}onDistanceChange(e){this.distance=parseInt(e.target.value)}render(){return p`
    <div class="toolbar centered">
      <section>
        <label>Bounds:</label>
        <select id="selOffsetsWrap" @input="${this.onWrapChange}" title="How should coordinate wrapping behave?">
          <option>stop</option>
          <option>wrap</option>
          <option>undefined</option>
        </select>
      </section>
      <section>
        <label>Distance:</label>
        <input title="Coordinate distance" @input="${this.onDistanceChange}" type="range" id="rangeOffsetsDistance" value="${this.distance}" min="1" max="4">
      </section>
    </div>
    <div>
      <grid-editor rows="5" cols="5" pixelSize="30" id="offsetsGrid" />
    </div>
    `}}customElements.define(m,u);export{u as GridOffsetElement,m as tagName};
