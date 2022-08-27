import{b as h,r as p,Z as c,Y as u,$ as v,a as d}from"./client-shim.9530acfc.js";var g=Object.defineProperty,y=Object.getOwnPropertyDescriptor,o=(s,t,r,i)=>{for(var e=i>1?void 0:i?y(t,r):t,n=s.length-1,l;n>=0;n--)(l=s[n])&&(e=(i?l(t,r,e):l(e))||e);return i&&e&&g(t,r,e),e};const m="arc-editor";class a extends h{static styles=p`
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
  `;constructor(){super();this.radius=20,this.startRadian=0,this.endRadian=Math.PI,this.strokeStyle='var(--accent-bold, "yellow")'}getArc(){return{startRadian:this.startRadian,endRadian:this.endRadian,radius:this.radius,counterClockwise:this.counterClockwise}}setArc(t){this.radius=t.radius,this.startRadian=t.startRadian,this.endRadian=t.endRadian,this.counterClockwise=t.counterClockwise}getBounds(){const t=c.makeHelper(this.shadowRoot.querySelector("svg"));return{width:t.width,height:t.height}}renderSvg(){const t=c.makeHelper(this.shadowRoot.querySelector("svg"),{fillStyle:"transparent",strokeStyle:this.strokeStyle,strokeWidth:3});t.clear();const r=t.width,i=t.height,e=this.getArc(),n={x:r/2,y:i/2};t.path(u.toSvg(e,n))}async updated(){this.renderSvg()}render(){return v`
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
		`}}o([d()],a.prototype,"startRadian",2);o([d()],a.prototype,"strokeStyle",2);o([d()],a.prototype,"endRadian",2);o([d()],a.prototype,"counterClockwise",2);o([d({type:Number})],a.prototype,"radius",2);try{customElements.define(m,a)}catch(s){console.log(s)}export{a as ArcEditor,m as tagName};
