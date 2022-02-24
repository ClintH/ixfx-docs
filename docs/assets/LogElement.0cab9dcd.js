var d=Object.defineProperty;var p=(t,e,o)=>e in t?d(t,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[e]=o;var r=(t,e,o)=>(p(t,typeof e!="symbol"?e+"":e,o),o);import{s as u,r as c,$ as g,o as h,e as m}from"./vendor.62e1b176.js";import{l as f}from"./chunk-C2GSEUUB.5e1d8426.js";import"./chunk-6RSYJ7PX.b9b486b6.js";import{e as v}from"./styles.b95397cf.js";import"./chunk-YDTVC7MM.cb3895f8.js";var y=Object.defineProperty,b=Object.getOwnPropertyDescriptor,x=(t,e,o,l)=>{for(var s=l>1?void 0:l?b(e,o):e,i=t.length-1,n;i>=0;i--)(n=t[i])&&(s=(l?n(e,o,s):n(s))||s);return l&&s&&y(e,o,s),s};const C="log-element";class a extends u{constructor(){super();r(this,"logger");r(this,"logContainer");this.logger=null,this.logContainer=null}init(){this.logContainer===null&&(this.logContainer=this.shadowRoot.querySelector("#stream"),this.logContainer!==null&&(this.logger=f(this.logContainer,{minIntervalMs:20,capacity:150})))}error(e){this.init(),this.logger!==null?(this.logger.error(e),this.updateLog()):console.error(e)}clear(){this.logger!==null&&(this.logger.clear(),this.requestUpdate(),this.updateLog())}log(e){this.init(),this.logger!==null?(this.logger.log(e),this.updateLog()):console.log(e)}toggleExpand(){this.expanded=!this.expanded}updateLog(){const e=this.shadowRoot.querySelector(".toolbar");e!==null&&(this.isEmpty?e.classList.add("empty"):e.classList.remove("empty"))}get isEmpty(){return this.init(),this.logger!==null?this.logger.isEmpty:!0}renderTools(){return g`
    <button title="${this.expanded?"Collapse":"Expand"} log" @click=${this.toggleExpand}> ${this.expanded?"-":"+"}</button>
    <button title="Clear log" @click=${this.clear}>C</button>
    `}render(){const e={expanded:this.expanded};return g`
      <div class=${h(e)}>
        <div class=${h(e)} id="stream"></div>
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
    `]);x([m({type:Boolean})],a.prototype,"expanded",2);customElements.define(C,a);
