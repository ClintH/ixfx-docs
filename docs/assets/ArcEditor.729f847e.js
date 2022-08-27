var p=Object.defineProperty;var u=(e,t,i)=>t in e?p(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i;var c=(e,t,i)=>(u(e,typeof t!="symbol"?t+"":t,i),i);import{a as v,r as g,$ as y,b as o}from"./vendor.c33530a8.js";import{c as h,A as m}from"./chunk-GK535KVL.5ac52ed3.js";import"./chunk-OE2F6QKM.bc057148.js";var R=Object.defineProperty,b=Object.getOwnPropertyDescriptor,d=(e,t,i,r)=>{for(var a=r>1?void 0:r?b(t,i):t,n=e.length-1,l;n>=0;n--)(l=e[n])&&(a=(r?l(t,i,a):l(a))||a);return r&&a&&R(t,i,a),a};const w="arc-editor";class s extends v{constructor(){super();this.radius=20,this.startRadian=0,this.endRadian=Math.PI,this.strokeStyle='var(--accent-bold, "yellow")'}getArc(){return{startRadian:this.startRadian,endRadian:this.endRadian,radius:this.radius,counterClockwise:this.counterClockwise}}setArc(t){this.radius=t.radius,this.startRadian=t.startRadian,this.endRadian=t.endRadian,this.counterClockwise=t.counterClockwise}getBounds(){const t=h.makeHelper(this.shadowRoot.querySelector("svg"));return{width:t.width,height:t.height}}renderSvg(){const t=h.makeHelper(this.shadowRoot.querySelector("svg"),{fillStyle:"transparent",strokeStyle:this.strokeStyle,strokeWidth:3});t.clear();const i=t.width,r=t.height,a=this.getArc(),n={x:i/2,y:r/2};t.path(m.toSvg(a,n))}async updated(){this.renderSvg()}render(){return y`
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
		`}}c(s,"styles",g`
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
  `);d([o()],s.prototype,"startRadian",2);d([o()],s.prototype,"strokeStyle",2);d([o()],s.prototype,"endRadian",2);d([o()],s.prototype,"counterClockwise",2);d([o({type:Number})],s.prototype,"radius",2);try{customElements.define(w,s)}catch(e){console.log(e)}export{s as ArcEditor,w as tagName};
