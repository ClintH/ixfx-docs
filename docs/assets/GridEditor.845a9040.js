var f=Object.defineProperty;var w=(t,e,s)=>e in t?f(t,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[e]=s;var h=(t,e,s)=>(w(t,typeof e!="symbol"?e+"":e,s),s);import{s as b,r as m,$ as u,e as c,n as g}from"./vendor.a3225d27.js";import{P as v}from"./chunk-FM2K2PHF.079c4314.js";import"./chunk-X3ZGK7G7.0ec20d2d.js";import{G as a}from"./chunk-OW53XONI.6c7bafde.js";import"./chunk-776RPVJQ.ce76deb3.js";import"./chunk-HCHJFXUB.99dbbc1f.js";var y=Object.defineProperty,x=Object.getOwnPropertyDescriptor,n=(t,e,s,i)=>{for(var r=i>1?void 0:i?x(e,s):e,o=t.length-1,d;o>=0;o--)(d=t[o])&&(r=(i?d(e,s,r):d(r))||r);return i&&r&&y(e,s,r),r},p;let l=(p=class extends b{constructor(){super();h(this,"lastCanvasSize",{rows:0,cols:0,shape:15});h(this,"cellRenderer");this.rows=5,this.cols=5,this.showToolbar=!1,this.pixelSize=15}onChanged(){const t=new CustomEvent("change",{bubbles:!0,composed:!0,detail:this.getGrid()});this.dispatchEvent(t)}getGrid(){const t=typeof this.rows=="string"?parseInt(this.rows):this.rows,e=typeof this.cols=="string"?parseInt(this.cols):this.cols,s=typeof this.pixelSize=="string"?parseInt(this.pixelSize):this.pixelSize;return{rows:t,cols:e,size:s}}_sizeInput(t){const e=t.target,s=e.value,i=parseInt(s);switch(e.id){case"rows":this.rows=i;break;case"cols":this.cols=i;break}this.onChanged()}draw(){const t=this.getGrid(),e=this.shadowRoot?.getElementById("previewCanvas");if(e===null)return;const s=e.getContext("2d");if(s===null)return;const i=3;a.isEqual(t,this.lastCanvasSize)||(e.width=t.cols*t.size+i+i,e.height=t.rows*t.size+i+i),s.clearRect(0,0,e.width,e.height),s.translate(i,i),s.strokeStyle=v.getCssVariable("grid-color","whitesmoke",this);for(const r of a.cells(t)){let o=a.rectangleForCell(r,t);this.cellRenderer!==void 0&&this.cellRenderer(r,o,s),r.x==this.selectedCell?.x&&r.y==this.selectedCell?.y?(s.fillStyle=v.getCssVariable("hover-color","black",this),s.fillRect(o.x,o.y,o.width,o.height)):s.strokeRect(o.x,o.y,o.width,o.height)}}async updated(){this.draw()}_cellPointerUp(t){const e=a.cellAtPoint({x:t.offsetX,y:t.offsetY},this.getGrid());if(e===void 0)return;this.selectedCell=e;const s=new CustomEvent("cellPointerUp",{bubbles:!0,composed:!0,detail:e});this.dispatchEvent(s)}_cellPointerMove(t){const e=a.cellAtPoint({x:t.offsetX,y:t.offsetY},this.getGrid());if(e===void 0)return;const s=new CustomEvent("cellPointerMove",{bubbles:!0,composed:!0,detail:e});this.dispatchEvent(s),this.title=`Cell ${e.x}, ${e.y}`}renderToolbar(){return this.showToolbar?u`
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
  </div>`:""}render(){return u`
      <div class="container">
        ${this.renderToolbar()}
        <div id="preview"><canvas @pointermove="${this._cellPointerMove}" @pointerup="${this._cellPointerUp}" id="previewCanvas"></div>  
      </div>`}},h(p,"styles",m`
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
  `),p);n([c()],l.prototype,"selectedCell",2);n([c()],l.prototype,"rows",2);n([c()],l.prototype,"cols",2);n([c()],l.prototype,"pixelSize",2);n([c()],l.prototype,"showToolbar",2);l=n([g("grid-editor")],l);
