import{b as u,r as f,$ as v,a as p,n as w}from"../client-shim.cda72367.js";import{C as d}from"./chunk-C37FD3JM.0197111f.js";import"./chunk-4THA4YVV.4ccaabcd.js";import"./chunk-DTRNDG6C.d0f370a4.js";import{T as a}from"./chunk-6TM6SJDV.d463ae79.js";import"./chunk-QLMTBJ7O.4bda2143.js";var b=Object.defineProperty,m=Object.getOwnPropertyDescriptor,h=(t,e,i,r)=>{for(var s=r>1?void 0:r?m(e,i):e,l=t.length-1,n;l>=0;l--)(n=t[l])&&(s=(r?n(e,i,s):n(s))||s);return r&&s&&b(e,i,s),s};let c=class extends u{static styles=f`
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
  `;lastCanvasSize={rows:0,cols:0,shape:15};cellRenderer;hoveredCell;constructor(){super();this.rows=5,this.cols=5,this.showToolbar=!1,this.pixelSize=15}onChanged(){const t=new CustomEvent("change",{bubbles:!0,composed:!0,detail:this.getGrid()});this.dispatchEvent(t)}getGrid(){const t=typeof this.rows=="string"?parseInt(this.rows):this.rows,e=typeof this.cols=="string"?parseInt(this.cols):this.cols,i=typeof this.pixelSize=="string"?parseInt(this.pixelSize):this.pixelSize;return{rows:t,cols:e,size:i}}_sizeInput(t){const e=t.target,i=e.value,r=parseInt(i);switch(e.id){case"rows":this.rows=r;break;case"cols":this.cols=r;break}this.onChanged()}draw(){const t=this.getGrid(),e=this.shadowRoot?.getElementById("previewCanvas"),i=d.getCssVariable("hover-color","black",this),r=d.getCssVariable("selected-color","yellow",this);if(e===null)return;const s=e.getContext("2d");if(s===null)return;const l=3;a.isEqual(t,this.lastCanvasSize)||(e.width=t.cols*t.size+l+l,e.height=t.rows*t.size+l+l),s.clearRect(0,0,e.width,e.height),s.translate(l,l),s.strokeStyle=d.getCssVariable("grid-color","whitesmoke",this);for(const n of a.cells(t)){let o=a.rectangleForCell(n,t);this.cellRenderer!==void 0&&this.cellRenderer(n,o,s),a.cellEquals(n,this.selectedCell)?(s.fillStyle=r,s.fillRect(o.x,o.y,o.width,o.height)):a.cellEquals(n,this.hoveredCell)?(s.fillStyle=i,s.fillRect(o.x,o.y,o.width,o.height)):s.strokeRect(o.x,o.y,o.width,o.height)}}async updated(){this.draw()}_cellPointerUp(t){const e=a.cellAtPoint({x:t.offsetX,y:t.offsetY},this.getGrid());if(e===void 0)return;this.selectedCell=e;const i=new CustomEvent("cellPointerUp",{bubbles:!0,composed:!0,detail:e});this.dispatchEvent(i)}_cellPointerMove(t){const e=a.cellAtPoint({x:t.offsetX,y:t.offsetY},this.getGrid());if(a.cellEquals(e,this.hoveredCell)||(this.hoveredCell=e,this.draw()),e===void 0)return;const i=new CustomEvent("cellPointerMove",{bubbles:!0,composed:!0,detail:e});this.dispatchEvent(i),this.title=`Cell ${e.x}, ${e.y}`}renderToolbar(){return this.showToolbar?v`
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
  </div>`:""}_pointerLeave(){this.hoveredCell=void 0}render(){return v`
      <div class="container">
        ${this.renderToolbar()}
        <div id="preview"><canvas @pointerleave="${this._pointerLeave}" @pointermove="${this._cellPointerMove}" @pointerup="${this._cellPointerUp}" id="previewCanvas"></div>  
      </div>`}};h([p()],c.prototype,"selectedCell",2);h([p()],c.prototype,"rows",2);h([p()],c.prototype,"cols",2);h([p()],c.prototype,"pixelSize",2);h([p()],c.prototype,"showToolbar",2);c=h([w("grid-editor")],c);
