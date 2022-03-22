import{b as d,r as c,$ as p}from"./client-shim.cda72367.js";import{e as f}from"./chunks/styles.b557ca03.js";import{T as i}from"./chunks/chunk-ZTHSWHI3.b2cf17c9.js";import"./chunks/chunk-U4IZE4J2.68fe18db.js";import{D as h,C as g}from"./chunks/chunk-Y34DFPYJ.e44e5be3.js";import"./chunks/chunk-XQHW4NES.f66c7e52.js";import"./chunks/chunk-DTRNDG6C.d0f370a4.js";import"./chunks/chunk-FQLUQVDZ.735c98e3.js";const m="grid-offset-element";class u extends d{static styles=[f,c`
    #offsetsGrid {
      --grid-color:var(--divider);
      --hover-color: var(--bg-contrast);
      --selected-color: var(--yellow);
    }
    `];selectedCell;grid;wrapStyle;distance;constructor(){super();this.selectedCell={x:0,y:0},this.wrapStyle="stop",this.distance=2}offsets(){const e=this.shadowRoot.getElementById("offsetsGrid"),t=e.selectedCell,s=i.offsetCardinals(this.grid,t,this.distance,this.wrapStyle);e.cellRenderer=(r,l,n)=>{const o=Object.entries(s).find(a=>i.cellEquals(a[1],r));return o===void 0?!1:(h.textBlockAligned(n,o[0],{vert:"center",horiz:"center",bounds:l,fillStyle:g.getCssVariable("fg","yellow")}),!0)}}onCellPointerMove(e){const t=e.detail;if(t===void 0)return;const s=e.target;s.selectedCell=t,this.offsets()}updated(e){const t=this.shadowRoot.getElementById("offsetsGrid");t.addEventListener("cellPointerMove",s=>this.onCellPointerMove(s)),this.grid=t.getGrid()}onWrapChange(e){this.wrapStyle=e.target.value}onDistanceChange(e){this.distance=parseInt(e.target.value)}render(){return p`
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
