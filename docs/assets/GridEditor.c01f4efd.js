var w=Object.defineProperty;var b=(t,e,s)=>e in t?w(t,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[e]=s;var p=(t,e,s)=>(b(t,typeof e!="symbol"?e+"":e,s),s);import{a as m,r as g,$ as f,b as d,n as y}from"./vendor.d6870787.js";import{C as v}from"./chunk-LZ7XWTRR.a62618b8.js";import{W as a}from"./chunk-ODBLOXCD.602f7099.js";import"./chunk-3CYWIYMP.09a63feb.js";import"./chunk-4DU25RMK.d28002ea.js";import"./chunk-AWXCQ245.1dcbd11a.js";var C=Object.defineProperty,x=Object.getOwnPropertyDescriptor,h=(t,e,s,r)=>{for(var i=r>1?void 0:r?x(e,s):e,l=t.length-1,n;l>=0;l--)(n=t[l])&&(i=(r?n(e,s,i):n(i))||i);return r&&i&&C(e,s,i),i},u;let c=(u=class extends m{constructor(){super();p(this,"lastCanvasSize",{rows:0,cols:0,shape:15});p(this,"cellRenderer");p(this,"hoveredCell");this.rows=5,this.cols=5,this.showToolbar=!1,this.pixelSize=15}onChanged(){const t=new CustomEvent("change",{bubbles:!0,composed:!0,detail:this.getGrid()});this.dispatchEvent(t)}getGrid(){const t=typeof this.rows=="string"?parseInt(this.rows):this.rows,e=typeof this.cols=="string"?parseInt(this.cols):this.cols,s=typeof this.pixelSize=="string"?parseInt(this.pixelSize):this.pixelSize;return{rows:t,cols:e,size:s}}_sizeInput(t){const e=t.target,s=e.value,r=parseInt(s);switch(e.id){case"rows":this.rows=r;break;case"cols":this.cols=r;break}this.onChanged()}draw(){const t=this.getGrid(),e=this.shadowRoot?.getElementById("previewCanvas"),s=v.getCssVariable("hover-color","black",this),r=v.getCssVariable("selected-color","yellow",this);if(e===null)return;const i=e.getContext("2d");if(i===null)return;const l=3;a.isEqual(t,this.lastCanvasSize)||(e.width=t.cols*t.size+l+l,e.height=t.rows*t.size+l+l),i.clearRect(0,0,e.width,e.height),i.translate(l,l),i.strokeStyle=v.getCssVariable("grid-color","whitesmoke",this);for(const n of a.cells(t)){let o=a.rectangleForCell(n,t);this.cellRenderer!==void 0&&this.cellRenderer(n,o,i),a.cellEquals(n,this.selectedCell)?(i.fillStyle=r,i.fillRect(o.x,o.y,o.width,o.height)):a.cellEquals(n,this.hoveredCell)?(i.fillStyle=s,i.fillRect(o.x,o.y,o.width,o.height)):i.strokeRect(o.x,o.y,o.width,o.height)}}async updated(){this.draw()}_cellPointerUp(t){const e=a.cellAtPoint({x:t.offsetX,y:t.offsetY},this.getGrid());if(e===void 0)return;this.selectedCell=e;const s=new CustomEvent("cellPointerUp",{bubbles:!0,composed:!0,detail:e});this.dispatchEvent(s)}_cellPointerMove(t){const e=a.cellAtPoint({x:t.offsetX,y:t.offsetY},this.getGrid());if(a.cellEquals(e,this.hoveredCell)||(this.hoveredCell=e,this.draw()),e===void 0)return;const s=new CustomEvent("cellPointerMove",{bubbles:!0,composed:!0,detail:e});this.dispatchEvent(s),this.title=`Cell ${e.x}, ${e.y}`}renderToolbar(){return this.showToolbar?f`
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
  </div>`:""}_pointerLeave(){this.hoveredCell=void 0}render(){return f`
      <div class="container">
        ${this.renderToolbar()}
        <div id="preview"><canvas @pointerleave="${this._pointerLeave}" @pointermove="${this._cellPointerMove}" @pointerup="${this._cellPointerUp}" id="previewCanvas"></div>  
      </div>`}},p(u,"styles",g`
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
  `),u);h([d()],c.prototype,"selectedCell",2);h([d()],c.prototype,"rows",2);h([d()],c.prototype,"cols",2);h([d()],c.prototype,"pixelSize",2);h([d()],c.prototype,"showToolbar",2);c=h([y("grid-editor")],c);
