import{A as O,M as D,S as J,s as U,d as $,t as S,e as G,f as P,h as T,j as k,k as H,w as X}from"./chunk-RGWQELNS.82f84363.js";import{_ as g,s as Y,S as Z,c as y,d as u,f as o,e as f}from"./chunk-4WJCK6OW.dc07580d.js";var tt={};g(tt,{Arrays:()=>O,Maps:()=>D,Queues:()=>B,Sets:()=>J,Stacks:()=>L,circularArray:()=>x,map:()=>p,mapArray:()=>rt,mapCircular:()=>st,mapMutable:()=>dt,mapSet:()=>at,queue:()=>Q,queueMutable:()=>q,setMutable:()=>U,simpleMapArrayMutable:()=>Y,stack:()=>V,stackMutable:()=>N});var c,l,_=class extends Array{constructor(t){super();if(y(this,c,void 0),y(this,l,void 0),Number.isNaN(t))throw Error("capacity is NaN");f(this,c,t),f(this,l,0)}add(t){const e=_.from(this);return e[o(this,l)]=t,f(e,c,o(this,c)),f(e,l,o(this,l)+1===o(this,c)?0:o(this,l)+1),e}get pointer(){return o(this,l)}get isFull(){return o(this,c)===0?!1:this.length===o(this,c)}},et=_;c=new WeakMap;l=new WeakMap;var x=t=>new et(t),h,v=class extends Z{constructor(t,e={}){super();y(this,h,new Map),u(this,"groupBy"),u(this,"type"),this.type=t,this.groupBy=e.groupBy??S}debugString(){const t=Array.from(o(this,h).keys());let e=`Keys: ${t.join(", ")}\r
`;return t.forEach(r=>{const a=o(this,h).get(r);if(a!==void 0){const i=this.type.toArray(a);i!==void 0&&(e+=` - ${r} (${this.type.count(a)}) = ${JSON.stringify(i)}\r
`)}else e+=` - ${r} (undefined)\r
`}),e}get isEmpty(){return o(this,h).size===0}clear(){o(this,h).clear(),super.fireEvent("clear",!0)}addKeyedValues(t,...e){const r=o(this,h).get(t);r===void 0?(o(this,h).set(t,this.type.add(void 0,e)),super.fireEvent("addedKey",{key:t}),super.fireEvent("addedValues",{values:e})):(o(this,h).set(t,this.type.add(r,e)),super.fireEvent("addedValues",{values:e}))}addValue(...t){t.forEach(e=>this.addKeyedValues(this.groupBy(e),e))}hasKeyValue(t,e){const r=o(this,h).get(t);return r===void 0?!1:this.type.has(r,e)}has(t){return o(this,h).has(t)}deleteKeyValue(t,e){const r=o(this,h).get(t);if(r===void 0)return!1;const a=this.type.count(r),i=this.type.without(r,e),s=i.length;return o(this,h).set(t,this.type.add(void 0,i)),a>s}delete(t){return o(this,h).get(t)===void 0?!1:(o(this,h).delete(t),this.fireEvent("deleteKey",{key:t}),!0)}findKeyForValue(t){return Array.from(o(this,h).keys()).find(a=>{const i=o(this,h).get(a);if(i===void 0)throw Error("Bug: map could not be accessed");return!!this.type.has(i,t)})}count(t){const e=o(this,h).get(t);return e===void 0?0:this.type.count(e)}get(t){const e=o(this,h).get(t);if(e!==void 0)return this.type.toArray(e)}getSource(t){return o(this,h).get(t)}keys(){return Array.from(o(this,h).keys())}keysAndCounts(){return this.keys().map(r=>[r,this.count(r)])}merge(t){t.keys().forEach(r=>{const a=t.get(r);a!==void 0&&this.addKeyedValues(r,...a)})}};h=new WeakMap;var rt=(t={})=>{const e=t.comparer===void 0?t.toString===void 0?(i,s)=>t.toString(i)===t.toString(s):$:t.comparer,r={add:(i,s)=>i===void 0?[...s]:[...i,...s],count:i=>i.length,find:(i,s)=>i.find(s),filter:(i,s)=>i.filter(s),toArray:i=>i,has:(i,s)=>i.find(n=>e(n,s))!==void 0,without:(i,s)=>i.filter(n=>!e(n,s))};return new v(r,t)},at=t=>{const e=t?.hash??S,r=(s,n)=>e(s)===e(n),a={add:(s,n)=>G(s,e,...n),count:s=>s.size,find:(s,n)=>P(s,n),filter:(s,n)=>T(s,n),toArray:s=>k(s),has:(s,n)=>H(s,n,r),without:(s,n)=>X(k(s),n,r)};return new v(a,t)},st=t=>{const e=$,r={add:(a,i)=>(a===void 0&&(a=x(t.capacity)),i.forEach(s=>a=a?.add(s)),a),count:a=>a.length,find:(a,i)=>a.find(i),filter:(a,i)=>a.filter(i),toArray:a=>a,has:(a,i)=>a.find(s=>e(s,i))!==void 0,without:(a,i)=>a.filter(s=>!e(s,i))};return new v(r,t)},L={};g(L,{stack:()=>V,stackMutable:()=>N});var it=(t,e,r)=>{const a=e.length+r.length,i=t.overflowPolicy??"additions",s=t.capacity??a,n=a-s;switch(t.debug&&console.log(`Stack.push: stackLen: ${e.length} potentialLen: ${a} toRemove: ${n} policy: ${i}`),i){case"additions":return t.debug&&console.log(`Stack.push:DiscardAdditions: stackLen: ${e.length} slice: ${a-s} toAddLen: ${r.length}`),e.length===t.capacity?e:[...e,...r.slice(0,r.length-n)];case"newer":return n>=e.length?r.slice(Math.max(0,r.length-s),Math.min(r.length,s)+1):(t.debug&&console.log(` from orig: ${e.slice(0,n-1)}`),[...e.slice(0,n-1),...r.slice(0,Math.min(r.length,s-n+1))]);case"older":return[...e,...r].slice(n);default:throw new Error(`Unknown overflow policy ${i}`)}},R=(t,e,...r)=>{const a=e.length+r.length;return t.capacity&&a>t.capacity?it(t,e,r):[...e,...r]},A=(t,e)=>{if(e.length===0)throw new Error("Stack is empty");return e.slice(0,e.length-1)},m=(t,e)=>e[e.length-1],F=(t,e)=>e.length===0,K=(t,e)=>t.capacity?e.length>=t.capacity:!1,w=class{constructor(t,e){u(this,"opts"),u(this,"data"),this.opts=t,this.data=e}push(...t){return new w(this.opts,R(this.opts,this.data,...t))}pop(){return new w(this.opts,A(this.opts,this.data))}forEach(t){this.data.forEach(t)}forEachFromTop(t){[...this.data].reverse().forEach(t)}get isEmpty(){return F(this.opts,this.data)}get isFull(){return K(this.opts,this.data)}get peek(){return m(this.opts,this.data)}get length(){return this.data.length}},nt=class{constructor(t,e){u(this,"opts"),u(this,"data"),this.opts=t,this.data=e}push(...t){return this.data=R(this.opts,this.data,...t),this.data.length}forEach(t){this.data.forEach(t)}forEachFromTop(t){[...this.data].reverse().forEach(t)}pop(){const t=m(this.opts,this.data);return A(this.opts,this.data),t}get isEmpty(){return F(this.opts,this.data)}get isFull(){return K(this.opts,this.data)}get peek(){return m(this.opts,this.data)}get length(){return this.data.length}},V=(t={},...e)=>new w({...t},[...e]),N=(t,...e)=>new nt({...t},[...e]),B={};g(B,{queue:()=>Q,queueMutable:()=>q});var E=(t,e)=>{t.debug&&console.log(`queue:${e}`)},ot=(t,e,r)=>{const a=e.length+r.length,i=t.capacity??a,s=a-i,n=t.discardPolicy??"additions";switch(E(t,`queueLen: ${e.length} potentialLen: ${a} toRemove: ${s} policy: ${n}`),n){case"additions":return E(t,`enqueue:DiscardAdditions: queueLen: ${e.length} slice: ${a-i} toAddLen: ${r.length}`),e.length===t.capacity?e:[...e,...r.slice(0,s-1)];case"newer":return s>=e.length?r.slice(Math.max(0,r.length-i),Math.min(r.length,i)+1):(E(t,` from orig: ${e.slice(0,s-1)}`),[...e.slice(0,s-1),...r.slice(0,Math.min(r.length,i-s+1))]);case"older":return[...e,...r].slice(s);default:throw new Error(`Unknown overflow policy ${n}`)}},C=(t,e,...r)=>{if(t===void 0)throw new Error("opts parameter undefined");const a=e.length+r.length,i=t.capacity&&a>t.capacity,s=i?ot(t,e,r):[...e,...r];if(t.capacity&&s.length!==t.capacity&&i)throw new Error(`Bug! Expected return to be at capacity. Return len: ${s.length} capacity: ${t.capacity} opts: ${JSON.stringify(t)}`);if(!t.capacity&&s.length!==a)throw new Error(`Bug! Return length not expected. Return len: ${s.length} expected: ${a} opts: ${JSON.stringify(t)}`);return s},j=(t,e)=>{if(e.length===0)throw new Error("Queue is empty");return e.slice(1)},M=(t,e)=>e[0],z=(t,e)=>e.length===0,I=(t,e)=>t.capacity?e.length>=t.capacity:!1,b=class{constructor(t,e){if(u(this,"opts"),u(this,"data"),t===void 0)throw new Error("opts parameter undefined");this.opts=t,this.data=e}enqueue(...t){return new b(this.opts,C(this.opts,this.data,...t))}dequeue(){return new b(this.opts,j(this.opts,this.data))}get isEmpty(){return z(this.opts,this.data)}get isFull(){return I(this.opts,this.data)}get length(){return this.data.length}get peek(){return M(this.opts,this.data)}},ht=class{constructor(t,e){if(u(this,"opts"),u(this,"data"),t===void 0)throw new Error("opts parameter undefined");this.opts=t,this.data=e}enqueue(...t){return this.data=C(this.opts,this.data,...t),this.data.length}dequeue(){const t=M(this.opts,this.data);return this.data=j(this.opts,this.data),t}get isEmpty(){return z(this.opts,this.data)}get isFull(){return I(this.opts,this.data)}get length(){return this.data.length}get peek(){return M(this.opts,this.data)}},Q=(t={},...e)=>(t={...t},new b(t,[...e])),q=(t={},...e)=>new ht({...t},[...e]),ut=(t,e)=>{const r=new Map(t.entries());return e.forEach(a=>{if(a[0]===void 0)throw new Error("key cannot be undefined");if(a[1]===void 0)throw new Error("value cannot be undefined");r.set(a[0],a[1])}),r},ct=(t,e)=>{const r=new Map(t.entries());return e.forEach(a=>{if(a.key===void 0)throw new Error("key cannot be undefined");if(a.value===void 0)throw new Error("value cannot be undefined");r.set(a.key,a.value)}),r},lt=(t,e)=>t.has(e),d=(t,...e)=>{if(t===void 0)throw new Error("map parameter is undefined");if(e===void 0)throw new Error("data parameter i.s undefined");if(e.length===0)return t;const r=e[0];return typeof r.key!="undefined"&&typeof r.value!="undefined"?ct(t,e):ut(t,e)},pt=(t,e,r)=>{const a=new Map(t.entries());return a.set(e,r),a},W=(t,e)=>{const r=new Map(t.entries());return r.delete(e),r},p=t=>{if(t===void 0)return p([]);if(Array.isArray(t))return p(d(new Map,...t));const e=t;return{add:(...r)=>{const a=d(e,...r);return p(a)},get:r=>e.get(r),delete:r=>p(W(e,r)),clear:()=>p(),has:r=>e.has(r),entries:()=>e.entries(),isEmpty:()=>e.size===0}},dt=(...t)=>{let e=d(new Map,...t);return{add:(...r)=>{e=d(e,...r)},delete:r=>{e=W(e,r)},clear:()=>{e=d(new Map)},set:(r,a)=>{e=pt(e,r,a)},get:r=>e.get(r),entries:()=>e.entries(),isEmpty:()=>e.size===0,has:r=>lt(e,r)}};export{st as m,V as s};
