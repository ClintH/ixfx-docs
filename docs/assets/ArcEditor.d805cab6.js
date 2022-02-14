var p=Object.defineProperty;var u=(e,t,a)=>t in e?p(e,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[t]=a;var c=(e,t,a)=>(u(e,typeof t!="symbol"?t+"":t,a),a);import{a as v,b as m,d as g,f as o}from"./vendor.1de7a7ed.js";import{u as y}from"./chunk-UWLZSNHO.00e5f090.js";import"./chunk-6JTGCZJL.784fcc38.js";import{S as h}from"./chunk-3SMTKDXD.7befeba5.js";import"./chunk-FRVUOYS5.3d3ad9f9.js";import"./chunk-V6WGO73W.4b0edf4f.js";var f=Object.defineProperty,b=Object.getOwnPropertyDescriptor,d=(e,t,a,r)=>{for(var i=r>1?void 0:r?b(t,a):t,n=e.length-1,l;n>=0;n--)(l=e[n])&&(i=(r?l(t,a,i):l(i))||i);return r&&i&&f(t,a,i),i};const R="arc-editor";class s extends v{constructor(){super();this.radius=20,this.startRadian=0,this.endRadian=Math.PI,this.strokeStyle='var(--accent-bold, "yellow")'}getArc(){return{startRadian:this.startRadian,endRadian:this.endRadian,radius:this.radius,counterClockwise:this.counterClockwise}}setArc(t){this.radius=t.radius,this.startRadian=t.startRadian,this.endRadian=t.endRadian,this.counterClockwise=t.counterClockwise}getBounds(){const t=h.makeHelper(this.shadowRoot.querySelector("svg"));return{width:t.width,height:t.height}}renderSvg(){const t=h.makeHelper(this.shadowRoot.querySelector("svg"),{fillStyle:"transparent",strokeStyle:this.strokeStyle,strokeWidth:3});t.clear();const a=t.width,r=t.height,i=this.getArc(),n={x:a/2,y:r/2};t.path(y.toSvg(i,n))}async updated(){this.renderSvg()}render(){return g`
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
  `);d([o()],s.prototype,"startRadian",2);d([o()],s.prototype,"strokeStyle",2);d([o()],s.prototype,"endRadian",2);d([o()],s.prototype,"counterClockwise",2);d([o({type:Number})],s.prototype,"radius",2);try{customElements.define(R,s)}catch(e){console.log(e)}export{s as ArcEditor,R as tagName};
