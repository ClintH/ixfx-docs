var h=Object.defineProperty;var p=(t,e,s)=>e in t?h(t,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[e]=s;var r=(t,e,s)=>(p(t,typeof e!="symbol"?e+"":e,s),s);import{a as u,b as c,d,o as g,f as m}from"./vendor.1de7a7ed.js";import{l as f}from"./chunk-MBZ4GFG7.8e6d603a.js";import"./chunk-V6WGO73W.4b0edf4f.js";import{e as v}from"./styles.94e3cd83.js";var y=Object.defineProperty,x=Object.getOwnPropertyDescriptor,b=(t,e,s,l)=>{for(var o=l>1?void 0:l?x(e,s):e,i=t.length-1,n;i>=0;i--)(n=t[i])&&(o=(l?n(e,s,o):n(o))||o);return l&&o&&y(e,s,o),o};const C="log-element";class a extends u{constructor(){super();r(this,"logger");r(this,"logContainer");this.logger=null,this.logContainer=null}init(){this.logContainer===null&&(this.logContainer=this.shadowRoot.querySelector("#stream"),this.logContainer!==null&&(this.logger=f(this.logContainer,{minIntervalMs:20,capacity:150})))}error(e){this.init(),this.logger!==null?(this.logger.error(e),this.updateLog()):console.error(e)}clear(){this.logger!==null&&(this.logger.clear(),this.requestUpdate(),this.updateLog())}log(e){this.init(),this.logger!==null?(this.logger.log(e),this.updateLog()):console.log(e)}toggleExpand(){this.expanded=!this.expanded}updateLog(){const e=this.shadowRoot.querySelector(".toolbar");e!==null&&(this.isEmpty?e.classList.add("empty"):e.classList.remove("empty"))}get isEmpty(){return this.init(),this.logger!==null?this.logger.isEmpty:!0}renderTools(){return d`
    <button title="${this.expanded?"Collapse":"Expand"} log" @click=${this.toggleExpand}> ${this.expanded?"-":"+"}</button>
    <button title="Clear log" @click=${this.clear}>C</button>
    `}render(){const e={expanded:this.expanded};return d`
      <div class=${g(e)}>
        <div class=${g(e)} id="stream"></div>
        <div class="toolbar empty vertical mini">
          ${this.renderTools()}
        </div>
      </div>
        `}}r(a,"styles",[v,c`
    :host>div {
      display: flex;
    }
    #stream {
      overflow-y: auto;
      flex-grow: 1;
      max-height: 15em;
    }
    #stream:not(.expanded) {
      max-height: 3.5em;
    }
    .toolbar.empty {
      display: none;
    }
    `]);b([m({type:Boolean})],a.prototype,"expanded",2);customElements.define(C,a);
