import{c as d,g as c,f}from"./client-shim.8cb18301.js";import{e as p}from"./chunks/styles.b86f48e3.js";import{o as i,D as g,C as h}from"./chunks/chunk-XLMUH3F2.3f4780f6.js";const u="grid-offset-element";class v extends d{static styles=[p,c`
    #offsetsGrid {
      --grid-color:var(--divider);
      --hover-color: var(--bg-contrast);
      --selected-color: var(--yellow);
    }
    `];selectedCell;grid;wrapStyle;distance;constructor(){super();this.selectedCell={x:0,y:0},this.wrapStyle="stop",this.distance=2}offsets(){const e=this.shadowRoot.getElementById("offsetsGrid"),t=e.selectedCell,s=i.offsetCardinals(this.grid,t,this.distance,this.wrapStyle);e.cellRenderer=(r,l,n)=>{const o=Object.entries(s).find(a=>i.cellEquals(a[1],r));return o===void 0?!1:(g.textBlockAligned(n,o[0],{vert:"center",horiz:"center",bounds:l,fillStyle:h.getCssVariable("fg","yellow")}),!0)}}onCellPointerMove(e){const t=e.detail;if(t===void 0)return;const s=e.target;s.selectedCell=t,this.offsets()}updated(e){const t=this.shadowRoot.getElementById("offsetsGrid");t.addEventListener("cellPointerMove",s=>this.onCellPointerMove(s)),this.grid=t.getGrid()}onWrapChange(e){this.wrapStyle=e.target.value}onDistanceChange(e){this.distance=parseInt(e.target.value)}render(){return f`
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
    `}}customElements.define(u,v);export{v as GridOffsetElement,u as tagName};