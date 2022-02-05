var p=Object.defineProperty;var u=(e,t,i)=>t in e?p(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i;var c=(e,t,i)=>(u(e,typeof t!="symbol"?t+"":t,i),i);import{s as v,r as g,$ as y,e as o}from"./vendor.ae2f83e2.js";import{o as m}from"./chunk-RGWQELNS.82f84363.js";import"./chunk-4WJCK6OW.dc07580d.js";import{S as h}from"./chunk-5VE7K3W4.abc39e5b.js";import"./chunk-TD4SHBHU.a3ff9292.js";var R=Object.defineProperty,b=Object.getOwnPropertyDescriptor,d=(e,t,i,r)=>{for(var s=r>1?void 0:r?b(t,i):t,n=e.length-1,l;n>=0;n--)(l=e[n])&&(s=(r?l(t,i,s):l(s))||s);return r&&s&&R(t,i,s),s};const f="arc-editor";class a extends v{constructor(){super();this.radius=20,this.startRadian=0,this.endRadian=Math.PI,this.strokeStyle='var(--accent-bold, "yellow")'}getArc(){return{startRadian:this.startRadian,endRadian:this.endRadian,radius:this.radius,counterClockwise:this.counterClockwise}}setArc(t){this.radius=t.radius,this.startRadian=t.startRadian,this.endRadian=t.endRadian,this.counterClockwise=t.counterClockwise}getBounds(){const t=h.svg(this.shadowRoot.querySelector("svg"));return{width:t.width,height:t.height}}renderSvg(){const t=h.svg(this.shadowRoot.querySelector("svg"),{fillStyle:"transparent",strokeStyle:this.strokeStyle,strokeWidth:3});t.clear();const i=t.width,r=t.height,s=this.getArc(),n={x:i/2,y:r/2};t.path(m.toSvg(n,s))}async updated(){this.renderSvg()}render(){return y`
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
		`}}c(a,"styles",g`
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
  `);d([o()],a.prototype,"startRadian",2);d([o()],a.prototype,"strokeStyle",2);d([o()],a.prototype,"endRadian",2);d([o()],a.prototype,"counterClockwise",2);d([o({type:Number})],a.prototype,"radius",2);try{customElements.define(f,a)}catch(e){console.log(e)}export{a as ArcEditor,f as tagName};
