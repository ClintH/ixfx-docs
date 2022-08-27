var f=Object.defineProperty;var h=(s,e,t)=>e in s?f(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var o=(s,e,t)=>(h(s,typeof e!="symbol"?e+"":e,t),t);import{a as g,r as u,$ as v}from"./vendor.c33530a8.js";import{e as m}from"./styles.801fcc34.js";import{G as l,D as C,e as w}from"./chunk-GK535KVL.5ac52ed3.js";import"./chunk-OE2F6QKM.bc057148.js";const y="grid-offset-element";class n extends g{constructor(){super();o(this,"selectedCell");o(this,"grid");o(this,"wrapStyle");o(this,"distance");this.selectedCell={x:0,y:0},this.wrapStyle="stop",this.distance=2}offsets(){const e=this.shadowRoot.getElementById("offsetsGrid"),t=e.selectedCell,i=l.offsetCardinals(this.grid,t,this.distance,this.wrapStyle);e.cellRenderer=(a,d,c)=>{const r=Object.entries(i).find(p=>l.cellEquals(p[1],a));return r===void 0?!1:(C.textBlockAligned(c,r[0],{vert:"center",horiz:"center",bounds:d,fillStyle:w.getCssVariable("fg","yellow")}),!0)}}onCellPointerMove(e){const t=e.detail;if(t===void 0)return;const i=e.target;i.selectedCell=t,this.offsets()}updated(e){const t=this.shadowRoot.getElementById("offsetsGrid");t.addEventListener("cellPointerMove",i=>this.onCellPointerMove(i)),this.grid=t.getGrid()}onWrapChange(e){this.wrapStyle=e.target.value}onDistanceChange(e){this.distance=parseInt(e.target.value)}render(){return v`
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
    `}}o(n,"styles",[m,u`
    #offsetsGrid {
      --grid-color:var(--divider);
      --hover-color: var(--bg-contrast);
      --selected-color: var(--yellow);
    }
    `]);customElements.define(y,n);export{n as GridOffsetElement,y as tagName};
