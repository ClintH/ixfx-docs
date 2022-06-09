import{b as c,r as h,$ as u,a as n}from"./client-shim.cda72367.js";import{ah as v}from"./chunks/chunk-QOZ2BRCA.9bf98e98.js";import"./chunks/chunk-OE2F6QKM.34a70cb8.js";import"./chunks/chunk-U4IZE4J2.1410a545.js";import{b as p}from"./chunks/chunk-FJ2C6UZS.5dabe3fc.js";import"./chunks/chunk-25KFP6OF.fcfc3207.js";import"./chunks/chunk-BSJKVIJG.f7604bb7.js";import"./chunks/chunk-4X2SZKK7.4dbfee46.js";import"./chunks/chunk-6SYKIMQH.63e605dc.js";var m=Object.defineProperty,g=Object.getOwnPropertyDescriptor,d=(a,t,s,i)=>{for(var e=i>1?void 0:i?g(t,s):t,o=a.length-1,l;o>=0;o--)(l=a[o])&&(e=(i?l(t,s,e):l(e))||e);return i&&e&&m(t,s,e),e};const y="arc-editor";class r extends c{static styles=h`
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
  `;constructor(){super();this.radius=20,this.startRadian=0,this.endRadian=Math.PI,this.strokeStyle='var(--accent-bold, "yellow")'}getArc(){return{startRadian:this.startRadian,endRadian:this.endRadian,radius:this.radius,counterClockwise:this.counterClockwise}}setArc(t){this.radius=t.radius,this.startRadian=t.startRadian,this.endRadian=t.endRadian,this.counterClockwise=t.counterClockwise}getBounds(){const t=p.makeHelper(this.shadowRoot.querySelector("svg"));return{width:t.width,height:t.height}}renderSvg(){const t=p.makeHelper(this.shadowRoot.querySelector("svg"),{fillStyle:"transparent",strokeStyle:this.strokeStyle,strokeWidth:3});t.clear();const s=t.width,i=t.height,e=this.getArc(),o={x:s/2,y:i/2};t.path(v.toSvg(e,o))}async updated(){this.renderSvg()}render(){return u`
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
		`}}d([n()],r.prototype,"startRadian",2);d([n()],r.prototype,"strokeStyle",2);d([n()],r.prototype,"endRadian",2);d([n()],r.prototype,"counterClockwise",2);d([n({type:Number})],r.prototype,"radius",2);try{customElements.define(y,r)}catch(a){console.log(a)}export{r as ArcEditor,y as tagName};
