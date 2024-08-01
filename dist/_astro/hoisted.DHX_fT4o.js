import{css as m,LitElement as y,html as f}from"lit";import{n as h,t as C}from"./property.CuQZeMxo.js";import{C as u,G as r,r as w,F as x,e as _}from"./chunk-VFOO3T2I.BGqEI_wx.js";var b=Object.defineProperty,E=Object.getOwnPropertyDescriptor,S=(t,e,s)=>e in t?b(t,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[e]=s,d=(t,e,s,l)=>{for(var i=l>1?void 0:l?E(e,s):e,n=t.length-1,a;n>=0;n--)(a=t[n])&&(i=(l?a(e,s,i):a(i))||i);return l&&i&&b(e,s,i),i},z=(t,e,s)=>(S(t,e+"",s),s);let c=class extends y{lastCanvasSize={rows:0,cols:0,shape:15};cellRenderer;hoveredCell;constructor(){super(),this.rows=5,this.cols=5,this.showToolbar=!1,this.pixelSize=15}onChanged(){const t=new CustomEvent("change",{bubbles:!0,composed:!0,detail:this.getGrid()});this.dispatchEvent(t)}getGrid(){const t=typeof this.rows=="string"?parseInt(this.rows):this.rows,e=typeof this.cols=="string"?parseInt(this.cols):this.cols,s=typeof this.pixelSize=="string"?parseInt(this.pixelSize):this.pixelSize;return{rows:t,cols:e,size:s}}_sizeInput(t){const e=t.target,s=e.value,l=parseInt(s);switch(e.id){case"rows":this.rows=l;break;case"cols":this.cols=l;break}this.onChanged()}draw(){const t=this.getGrid(),e=this.shadowRoot?.getElementById("previewCanvas"),s=u.getCssVariable("hover-color","black",this),l=u.getCssVariable("selected-color","yellow",this);if(e===null)return;const i=e.getContext("2d");if(i===null)return;const n=3;r.isEqual(t,this.lastCanvasSize)||(e.width=t.cols*t.size+n+n,e.height=t.rows*t.size+n+n),i.clearRect(0,0,e.width,e.height),i.translate(n,n),i.strokeStyle=u.getCssVariable("grid-color","whitesmoke",this);for(const a of r.cells(t)){let o=r.rectangleForCell(t,a);this.cellRenderer!==void 0&&this.cellRenderer(a,o,i),r.cellEquals(a,this.selectedCell)?(i.fillStyle=l,i.fillRect(o.x,o.y,o.width,o.height)):r.cellEquals(a,this.hoveredCell)?(i.fillStyle=s,i.fillRect(o.x,o.y,o.width,o.height)):i.strokeRect(o.x,o.y,o.width,o.height)}}async updated(){this.draw()}_cellPointerUp(t){const e=r.cellAtPoint(this.getGrid(),{x:t.offsetX,y:t.offsetY});if(e===void 0)return;this.selectedCell=e;const s=new CustomEvent("cellPointerUp",{bubbles:!0,composed:!0,detail:e});this.dispatchEvent(s)}_cellPointerMove(t){const e=r.cellAtPoint(this.getGrid(),{x:t.offsetX,y:t.offsetY});if(r.cellEquals(e,this.hoveredCell)||(this.hoveredCell=e,this.draw()),e===void 0)return;const s=new CustomEvent("cellPointerMove",{bubbles:!0,composed:!0,detail:e});this.dispatchEvent(s),this.title=`Cell ${e.x}, ${e.y}`}renderToolbar(){return this.showToolbar?f`
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
      </div>`}};z(c,"styles",m`
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
  `);d([h()],c.prototype,"selectedCell",2);d([h()],c.prototype,"rows",2);d([h()],c.prototype,"cols",2);d([h()],c.prototype,"pixelSize",2);d([h()],c.prototype,"showToolbar",2);c=d([C("grid-editor")],c);const p=w("#dataGrid"),G=w("#dataGridRead"),v=new Map;x.button("#btnDataRandom",()=>g());p.cellRenderer=(t,e,s)=>{const l=v.get(r.cellKeyString(t));if(l!==void 0)return s.fillStyle=l.colour,s.fillRect(e.x,e.y,e.width,e.height),!0};p.addEventListener("cellPointerMove",t=>{const e=t.detail;if(e===void 0)return;const s=v.get(r.cellKeyString(e));G.innerText=`Cell ${e.x}, ${e.y} has data ${JSON.stringify(s)}`});const g=()=>{const t=p.getGrid(),e=["bisque","cadetblue","cornflowerblue","coral"],s=()=>_.randomElement(e);for(let l of r.cells(t))v.set(r.cellKeyString(l),{colour:s(),funk:Math.random()});p.draw()};g();
