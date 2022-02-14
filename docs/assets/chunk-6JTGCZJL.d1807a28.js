import{h,j as s}from"./chunk-V6WGO73W.92c7aaab.js";var i,b=class{constructor(){h(this,i,new Map)}add(r,...t){const e=s(this,i).get(r);e===void 0?s(this,i).set(r,t):s(this,i).set(r,[...e,...t])}debugString(){let r="";return Array.from(s(this,i).keys()).every(e=>{const n=s(this,i).get(e);n!==void 0&&(r+=e+` (${n.length}) = ${JSON.stringify(n)}\r
`)}),r}get(r){return s(this,i).get(r)}delete(r,t){const e=s(this,i).get(r);if(e===void 0)return!1;const n=e.filter(a=>a!==t);return s(this,i).set(r,n),n.length<e.length}clear(){s(this,i).clear()}};i=new WeakMap;var w=()=>new b,o,g=class{constructor(){h(this,o,w())}fireEvent(r,t){const e=s(this,o).get(r);e!==void 0&&e.forEach(n=>{try{n(t,this)}catch(a){console.debug("Event listener error: ",a)}})}addEventListener(r,t){s(this,o).add(r,t)}removeEventListener(r,t){s(this,o).delete(r,t)}clearEventListeners(){s(this,o).clear()}};o=new WeakMap;var c=(r,t="",e="?")=>{if(Number.isNaN(r))throw new Error(`Parameter '${e}' is NaN`);if(typeof r!="number")throw new Error(`Parameter '${e}' does not have type of number (${r})`);switch(t){case"positive":if(r<0)throw new Error(`Parameter ${e} must be at least zero (${r})`);break;case"negative":if(r>0)throw new Error(`Parameter ${e} must be zero or lower (${r})`);break;case"aboveZero":if(r<=0)throw new Error(`Parameter ${e} must be above zero (${r})`);break;case"belowZero":if(r>=0)throw new Error(`Parameter ${e} must be below zero (${r})`);break;case"percentage":if(r>1||r<0)throw new Error(`Parameter ${e} must be in percentage range (0 to 1). (${r})`);break;case"nonZero":if(r===0)throw new Error(`Parameter ${e} must non-zero. (${r})`);break;case"bipolar":if(r>1||r<-1)throw new Error(`Parameter ${e} must be in bipolar percentage range (-1 to 1). (${r})`);break}return!0},$=(r,t="?")=>c(r,"percentage",t),d=(r,t="",e="?")=>{if(c(r,t,e),!Number.isInteger(r))throw new Error(`Paramter ${e} is not an integer`)},E=r=>Array.isArray(r)?r.find(t=>typeof t!="string")===void 0:!1,p=(r,t="?")=>{if(!Array.isArray(r))throw new Error(`Parameter '${t}' is expected to be an array'`)};export{g as S,d as a,p as b,E as i,c as n,$ as p,w as s};
