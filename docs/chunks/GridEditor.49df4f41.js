import{b as u,r as w,$ as v,a as d,n as f}from"../client-shim.cda72367.js";import{C as p,o as a}from"./chunk-S53RO4O7.5935c3a9.js";import"./chunk-IP2OCIJK.fba3b97b.js";var b=Object.defineProperty,g=Object.getOwnPropertyDescriptor,h=(t,e,i,r)=>{for(var s=r>1?void 0:r?g(e,i):e,o=t.length-1,n;o>=0;o--)(n=t[o])&&(s=(r?n(e,i,s):n(s))||s);return r&&s&&b(e,i,s),s};let c=class extends u{static styles=w`
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
  `;lastCanvasSize={rows:0,cols:0,shape:15};cellRenderer;hoveredCell;constructor(){super();this.rows=5,this.cols=5,this.showToolbar=!1,this.pixelSize=15}onChanged(){const t=new CustomEvent("change",{bubbles:!0,composed:!0,detail:this.getGrid()});this.dispatchEvent(t)}getGrid(){const t=typeof this.rows=="string"?parseInt(this.rows):this.rows,e=typeof this.cols=="string"?parseInt(this.cols):this.cols,i=typeof this.pixelSize=="string"?parseInt(this.pixelSize):this.pixelSize;return{rows:t,cols:e,size:i}}_sizeInput(t){const e=t.target,i=e.value,r=parseInt(i);switch(e.id){case"rows":this.rows=r;break;case"cols":this.cols=r;break}this.onChanged()}draw(){const t=this.getGrid(),e=this.shadowRoot?.getElementById("previewCanvas"),i=p.getCssVariable("hover-color","black",this),r=p.getCssVariable("selected-color","yellow",this);if(e===null)return;const s=e.getContext("2d");if(s===null)return;const o=3;a.isEqual(t,this.lastCanvasSize)||(e.width=t.cols*t.size+o+o,e.height=t.rows*t.size+o+o),s.clearRect(0,0,e.width,e.height),s.translate(o,o),s.strokeStyle=p.getCssVariable("grid-color","whitesmoke",this);for(const n of a.cells(t)){let l=a.rectangleForCell(n,t);this.cellRenderer!==void 0&&this.cellRenderer(n,l,s),a.cellEquals(n,this.selectedCell)?(s.fillStyle=r,s.fillRect(l.x,l.y,l.width,l.height)):a.cellEquals(n,this.hoveredCell)?(s.fillStyle=i,s.fillRect(l.x,l.y,l.width,l.height)):s.strokeRect(l.x,l.y,l.width,l.height)}}async updated(){this.draw()}_cellPointerUp(t){const e=a.cellAtPoint({x:t.offsetX,y:t.offsetY},this.getGrid());if(e===void 0)return;this.selectedCell=e;const i=new CustomEvent("cellPointerUp",{bubbles:!0,composed:!0,detail:e});this.dispatchEvent(i)}_cellPointerMove(t){const e=a.cellAtPoint({x:t.offsetX,y:t.offsetY},this.getGrid());if(a.cellEquals(e,this.hoveredCell)||(this.hoveredCell=e,this.draw()),e===void 0)return;const i=new CustomEvent("cellPointerMove",{bubbles:!0,composed:!0,detail:e});this.dispatchEvent(i),this.title=`Cell ${e.x}, ${e.y}`}renderToolbar(){return this.showToolbar?v`
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
      </div>`}};h([d()],c.prototype,"selectedCell",2);h([d()],c.prototype,"rows",2);h([d()],c.prototype,"cols",2);h([d()],c.prototype,"pixelSize",2);h([d()],c.prototype,"showToolbar",2);c=h([f("grid-editor")],c);
