var m=Object.defineProperty;var f=(t,e,r)=>e in t?m(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r;var d=(t,e,r)=>(f(t,typeof e!="symbol"?e+"":e,r),r);import{s as u,r as h,$ as s,o as b,e as c}from"./vendor.f6fa5898.js";import{a as v}from"./chunk-4QHRIV2D.a888d38b.js";import"./chunk-VAHXRYL4.7bd99bcd.js";import"./chunk-6RSYJ7PX.b9b486b6.js";import"./chunk-GLOC4ABQ.1540f006.js";import"./chunk-57USKCMY.8e2e6641.js";import"./chunk-E6FEPMVF.c62dcddf.js";import{e as y}from"./styles.34e14318.js";import"./chunk-YDTVC7MM.cb3895f8.js";var g=Object.defineProperty,x=Object.getOwnPropertyDescriptor,p=(t,e,r,i)=>{for(var a=i>1?void 0:i?x(e,r):e,n=t.length-1,l;n>=0;n--)(l=t[n])&&(a=(i?l(e,r,a):l(a))||a);return i&&a&&g(e,r,a),a};const $="arrayvis-element";class o extends u{constructor(){super();d(this,"palette");this.data=["apples","oranges","passionfruit"],this.palette=v.create(),this.palette.setElementBase(this),this.indexes=!1,this.classes={withBottom:!0}}renderValue(e){let r="";return typeof e=="string"?r=`"${e}"`:typeof e=="number"?r=`${e}`:typeof e=="boolean"?e?r="true":r="false":r=JSON.stringify(e,void 0,2),s`<div class="content">${r}</div>`}renderItem(e,r){return s`<div title="Index ${r}" class="item">
      ${this.indexes?s`<label>x${r}</label>`:s``}
      ${this.renderValue(e)}
    </div>`}renderArray(){const e=this.data;return Array.isArray(e)?s`
    <div id="items">
    ${e.map((r,i)=>this.renderItem(r,i))}
    </div>
    `:s`(err: data is not an array: ${typeof e})`}render(){return s`
    <div id="container" class=${b(this.classes)}>
    ${this.renderArray()}
    </div> 
    `}}d(o,"styles",[y,h`
      :host {
        --margin: 0.2em;
        --border: 3px solid;
      }
      #container {
        display: flex;
        align-items: center;
        flex-direction: column;
      }
      #items {
        border-left: var(--border) var(--fg);
        border-right: var(--border) var(--fg);
        display: flex;
        flex-direction: column;
        max-height: 40vh;
        overflow-y: auto;
        border-radius: 0.2em;
      }
      #container.withBottom #items {
        border-bottom: var(--border) var(--fg);
      }

      .item {
        display: flex;
        flex-direction: row;
        margin: var(--margin);
        cursor: default;
        background-color: var(--bg-contrast);
        color: var(--fg);
        opacity: 0.8;
      }
      .item:hover {
        opacity: 1.0;
      }
      label {
        opacity:0.6;
        margin-right: var(--margin);
        padding: var(--margin);

      }
      .content {
        padding: var(--margin);
        text-align: center;
        flex-grow: 1;
      }
  `]);p([c({attribute:!1,type:Array})],o.prototype,"data",2);p([c({attribute:!0,type:Boolean})],o.prototype,"indexes",2);p([c()],o.prototype,"classes",2);customElements.define($,o);
