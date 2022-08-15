import{b as h,r as p,$ as u,a as o}from"./client-shim.cda72367.js";import{x as c,v}from"./chunks/chunk-S53RO4O7.5935c3a9.js";import"./chunks/chunk-IP2OCIJK.fba3b97b.js";var g=Object.defineProperty,y=Object.getOwnPropertyDescriptor,d=(r,t,s,i)=>{for(var e=i>1?void 0:i?y(t,s):t,n=r.length-1,l;n>=0;n--)(l=r[n])&&(e=(i?l(t,s,e):l(e))||e);return i&&e&&g(t,s,e),e};const m="arc-editor";class a extends h{static styles=p`
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
  `;constructor(){super();this.radius=20,this.startRadian=0,this.endRadian=Math.PI,this.strokeStyle='var(--accent-bold, "yellow")'}getArc(){return{startRadian:this.startRadian,endRadian:this.endRadian,radius:this.radius,counterClockwise:this.counterClockwise}}setArc(t){this.radius=t.radius,this.startRadian=t.startRadian,this.endRadian=t.endRadian,this.counterClockwise=t.counterClockwise}getBounds(){const t=c.makeHelper(this.shadowRoot.querySelector("svg"));return{width:t.width,height:t.height}}renderSvg(){const t=c.makeHelper(this.shadowRoot.querySelector("svg"),{fillStyle:"transparent",strokeStyle:this.strokeStyle,strokeWidth:3});t.clear();const s=t.width,i=t.height,e=this.getArc(),n={x:s/2,y:i/2};t.path(v.toSvg(e,n))}async updated(){this.renderSvg()}render(){return u`
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
		`}}d([o()],a.prototype,"startRadian",2);d([o()],a.prototype,"strokeStyle",2);d([o()],a.prototype,"endRadian",2);d([o()],a.prototype,"counterClockwise",2);d([o({type:Number})],a.prototype,"radius",2);try{customElements.define(m,a)}catch(r){console.log(r)}export{a as ArcEditor,m as tagName};
