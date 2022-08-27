var f=Object.defineProperty;var b=(t,e,s)=>e in t?f(t,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[e]=s;var d=(t,e,s)=>(b(t,typeof e!="symbol"?e+"":e,s),s);import{a as g,r as m,$ as w,b as p,n as y}from"./vendor.c33530a8.js";import{e as v,G as a}from"./chunk-GK535KVL.5ac52ed3.js";import"./chunk-OE2F6QKM.bc057148.js";var C=Object.defineProperty,x=Object.getOwnPropertyDescriptor,h=(t,e,s,r)=>{for(var i=r>1?void 0:r?x(e,s):e,o=t.length-1,n;o>=0;o--)(n=t[o])&&(i=(r?n(e,s,i):n(i))||i);return r&&i&&C(e,s,i),i},u;let c=(u=class extends g{constructor(){super();d(this,"lastCanvasSize",{rows:0,cols:0,shape:15});d(this,"cellRenderer");d(this,"hoveredCell");this.rows=5,this.cols=5,this.showToolbar=!1,this.pixelSize=15}onChanged(){const t=new CustomEvent("change",{bubbles:!0,composed:!0,detail:this.getGrid()});this.dispatchEvent(t)}getGrid(){const t=typeof this.rows=="string"?parseInt(this.rows):this.rows,e=typeof this.cols=="string"?parseInt(this.cols):this.cols,s=typeof this.pixelSize=="string"?parseInt(this.pixelSize):this.pixelSize;return{rows:t,cols:e,size:s}}_sizeInput(t){const e=t.target,s=e.value,r=parseInt(s);switch(e.id){case"rows":this.rows=r;break;case"cols":this.cols=r;break}this.onChanged()}draw(){const t=this.getGrid(),e=this.shadowRoot?.getElementById("previewCanvas"),s=v.getCssVariable("hover-color","black",this),r=v.getCssVariable("selected-color","yellow",this);if(e===null)return;const i=e.getContext("2d");if(i===null)return;const o=3;a.isEqual(t,this.lastCanvasSize)||(e.width=t.cols*t.size+o+o,e.height=t.rows*t.size+o+o),i.clearRect(0,0,e.width,e.height),i.translate(o,o),i.strokeStyle=v.getCssVariable("grid-color","whitesmoke",this);for(const n of a.cells(t)){let l=a.rectangleForCell(n,t);this.cellRenderer!==void 0&&this.cellRenderer(n,l,i),a.cellEquals(n,this.selectedCell)?(i.fillStyle=r,i.fillRect(l.x,l.y,l.width,l.height)):a.cellEquals(n,this.hoveredCell)?(i.fillStyle=s,i.fillRect(l.x,l.y,l.width,l.height)):i.strokeRect(l.x,l.y,l.width,l.height)}}async updated(){this.draw()}_cellPointerUp(t){const e=a.cellAtPoint({x:t.offsetX,y:t.offsetY},this.getGrid());if(e===void 0)return;this.selectedCell=e;const s=new CustomEvent("cellPointerUp",{bubbles:!0,composed:!0,detail:e});this.dispatchEvent(s)}_cellPointerMove(t){const e=a.cellAtPoint({x:t.offsetX,y:t.offsetY},this.getGrid());if(a.cellEquals(e,this.hoveredCell)||(this.hoveredCell=e,this.draw()),e===void 0)return;const s=new CustomEvent("cellPointerMove",{bubbles:!0,composed:!0,detail:e});this.dispatchEvent(s),this.title=`Cell ${e.x}, ${e.y}`}renderToolbar(){return this.showToolbar?w`
  <div class="toolbar">
    <section>
      <div class="row">
        <label>Rows:</label>
        <input @input="${this._sizeInput}" .value="${this.rows}" id="rows" type="number" min="1" max="500">
      </div>
      <div class="row">
        <label>Cols:</label>
        <input @input="${this._sizeInput}" .value="${this.cols}" id="cols" type="number" min="1" max="500">
      </div>
    </section>
    <section>
      <select>
        <option>Fill with</option>
      </select>
    </section>
  </div>`:""}_pointerLeave(){this.hoveredCell=void 0}render(){return w`
      <div class="container">
        ${this.renderToolbar()}
        <div id="preview"><canvas @pointerleave="${this._pointerLeave}" @pointermove="${this._cellPointerMove}" @pointerup="${this._cellPointerUp}" id="previewCanvas"></div>  
      </div>`}},d(u,"styles",m`
  .container {
  }
  label {
    user-select: none;
  }
  .row {
    padding-right: 0.5em;
  }
  .row>label {

  }
  input[type="number"] {
    width: 2.5em;
  }
  #preview {
    display: flex;
    justify-content: center;
  }
  section {
    display: flex;
  }
  section>h2 {
    font-size: 80%;
    text-align: center;
  }
  .toolbar {
    display: flex;
    justify-content: center;
    margin: 0.5em;
    flex-wrap: wrap;
    font-size: 80%;
  }
  .toolbar > * {
    margin-left: 0.3em;
    margin-right: 0.3em;
  }
  `),u);h([p()],c.prototype,"selectedCell",2);h([p()],c.prototype,"rows",2);h([p()],c.prototype,"cols",2);h([p()],c.prototype,"pixelSize",2);h([p()],c.prototype,"showToolbar",2);c=h([y("grid-editor")],c);
