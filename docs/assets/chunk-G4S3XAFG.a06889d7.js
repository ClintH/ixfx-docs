import{b as c,c as a}from"./chunk-UDOW5UY7.00d3a5c3.js";var s,b=class{constructor(){c(this,s,new Map)}add(r,...t){const e=a(this,s).get(r);e===void 0?a(this,s).set(r,t):a(this,s).set(r,[...e,...t])}debugString(){let r="";return Array.from(a(this,s).keys()).every(e=>{const i=a(this,s).get(e);i!==void 0&&(r+=e+` (${i.length}) = ${JSON.stringify(i)}\r
`)}),r}get(r){return a(this,s).get(r)}delete(r,t){const e=a(this,s).get(r);if(e===void 0)return!1;const i=e.filter(n=>n!==t);return a(this,s).set(r,i),i.length<e.length}clear(){a(this,s).clear()}};s=new WeakMap;var l=()=>new b,o,v=class{constructor(){c(this,o,l())}fireEvent(r,t){const e=a(this,o).get(r);e!==void 0&&e.forEach(i=>{try{i(t,this)}catch(n){console.debug("Event listener error: ",n)}})}addEventListener(r,t){a(this,o).add(r,t)}removeEventListener(r,t){a(this,o).delete(r,t)}clearEventListeners(){a(this,o).clear()}};o=new WeakMap;var h=(r,t="",e="?")=>{if(Number.isNaN(r))throw new Error(`Parameter '${e}' is NaN`);if(typeof r!="number")throw new Error(`Parameter '${e}' does not have type of number`);switch(t){case"positive":if(r<0)throw new Error(`Parameter ${e} must be at least zero`);break;case"negative":if(r>0)throw new Error(`Parameter ${e} must be zero or lower`);break;case"aboveZero":if(r<=0)throw new Error(`Parameter ${e} must be above zero`);break;case"belowZero":if(r>=0)throw new Error(`Parameter ${e} must be below zero`);break;case"percentage":if(r>1||r<0)throw new Error(`Parameter ${e} must be in percentage range (0 to 1)`);break;case"nonZero":if(r===0)throw new Error(`Parameter ${e} must non-zero.`);break;case"bipolar":if(r>1||r<-1)throw new Error(`Parameter ${e} must be in bipolar percentage range (-1 to 1)`);break}return!0},u=(r,t="?")=>h(r,"percentage",t),f=(r,t="",e="?")=>{if(h(r,t,e),!Number.isInteger(r))throw new Error(`Paramter ${e} is not an integer`)},g=r=>Array.isArray(r)?r.find(t=>typeof t!="string")===void 0:!1,p=(r,t="?")=>{if(!Array.isArray(r))throw new Error(`Parameter '${t}' is expected to be an array'`)};export{v as S,p as a,g as b,f as i,h as n,u as p,l as s};