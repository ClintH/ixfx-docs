var p=Object.defineProperty;var u=(e,t,i)=>t in e?p(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i;var c=(e,t,i)=>(u(e,typeof t!="symbol"?t+"":t,i),i);import{s as v,r as m,$ as g,e as d}from"./vendor.d9edd6b2.js";import{A as y}from"./chunk-UWLZSNHO.ed4a88a1.js";import"./chunk-6JTGCZJL.d1807a28.js";import{S as h}from"./chunk-3SMTKDXD.e3dcb359.js";import"./chunk-FRVUOYS5.39dff0b3.js";import"./chunk-V6WGO73W.92c7aaab.js";var b=Object.defineProperty,R=Object.getOwnPropertyDescriptor,o=(e,t,i,r)=>{for(var a=r>1?void 0:r?R(t,i):t,n=e.length-1,l;n>=0;n--)(l=e[n])&&(a=(r?l(t,i,a):l(a))||a);return r&&a&&b(t,i,a),a};const f="arc-editor";class s extends v{constructor(){super();this.radius=20,this.startRadian=0,this.endRadian=Math.PI,this.strokeStyle='var(--accent-bold, "yellow")'}getArc(){return{startRadian:this.startRadian,endRadian:this.endRadian,radius:this.radius,counterClockwise:this.counterClockwise}}setArc(t){this.radius=t.radius,this.startRadian=t.startRadian,this.endRadian=t.endRadian,this.counterClockwise=t.counterClockwise}getBounds(){const t=h.makeHelper(this.shadowRoot.querySelector("svg"));return{width:t.width,height:t.height}}renderSvg(){const t=h.makeHelper(this.shadowRoot.querySelector("svg"),{fillStyle:"transparent",strokeStyle:this.strokeStyle,strokeWidth:3});t.clear();const i=t.width,r=t.height,a=this.getArc(),n={x:i/2,y:r/2};t.path(y.toSvg(a,n))}async updated(){this.renderSvg()}render(){return g`
			<div id="container">
        <div id="toolbar">
          <div class="opt">
            <label>Radius:</label>
            <input type="number" id="radius" value=${this.radius}>
          </div>
          <div class="opt">
            <label>Start radian:</label>
            <input type="number" id="startRadian" value=${this.startRadian}>
          </div>
          <div class="opt">
            <label>End radian:</label>
            <input type="number" id="endRadian" value=${this.endRadian}>
          </div>
        </div>
        <svg width=200 height=200></svg>
			</div>
		`}}c(s,"styles",m`
  #container {
    display: flex;
    align-items: center;
    flex-direction: column
  }
  #toolbar {
    display: flex;
    padding: 1em;
    display: none;
  }
  #toolbar input {
    width: 3em;
    margin-right: 1em;
    margin-left: 0.3em;
  }
  `);o([d()],s.prototype,"startRadian",2);o([d()],s.prototype,"strokeStyle",2);o([d()],s.prototype,"endRadian",2);o([d()],s.prototype,"counterClockwise",2);o([d({type:Number})],s.prototype,"radius",2);try{customElements.define(f,s)}catch(e){console.log(e)}export{s as ArcEditor,f as tagName};
