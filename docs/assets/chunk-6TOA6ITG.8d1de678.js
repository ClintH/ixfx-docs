import{S as A,b as M}from"./chunk-HCHJFXUB.99dbbc1f.js";import{b as c,d as o,e as i}from"./chunk-X3ZGK7G7.0ec20d2d.js";var l,y,f,d,p,v=class extends A{constructor(e,s,a={debug:!1}){super();c(this,l,void 0),c(this,y,void 0),c(this,f,void 0),c(this,d,void 0),c(this,p,void 0);const[t,u]=v.validate(e,s);if(!t)throw new Error(u);o(this,p,e),o(this,f,s),o(this,y,a.debug??!1),o(this,l,e),o(this,d,!1)}get states(){return Object.keys(i(this,f))}static validate(e,s){const a=Object.keys(s),t=new Set,u=new Set;for(let h=0;h<a.length;h++){const r=a[h];if(t.has(r))return[!1,`Key ${r} is already used`];if(t.add(r),typeof a[h]!="string")return[!1,`Key[${h}] is not a string`];const n=s[r];if(n===void 0)return[!1,`Key ${r} value is undefined`];if(typeof n=="string"){if(u.add(n),n===r)return[!1,`Loop present for ${r}`]}else if(Array.isArray(n)){if(!M(n))return[!1,`Key ${r} value is not an array of strings`];if(n.forEach(g=>u.add(g)),n.find(g=>g===r))return[!1,`Loop present for ${r}`]}else if(n!==null)return[!1,`Key ${r} has a value that is neither null, string or array`]}const $=Array.from(u).find(h=>!t.has(h));return $?[!1,`Potential state '${$}' does not exist as a top-level state`]:s[e]===void 0?[!1,`Initial state ${e} not present`]:[!0,""]}next(){const e=i(this,f)[i(this,l)];if(e===null)return null;if(Array.isArray(e))if(typeof e[0]=="string")this.state=e[0];else throw new Error("Error in machine description. Potential state array does not contain strings");else if(typeof e=="string")this.state=e;else throw new Error("Error in machine description. Potential state is neither array nor string");return this.state}get isDone(){return i(this,d)}reset(){o(this,d,!1),o(this,l,i(this,p))}static isValid(e,s,a){if(a[s]===void 0)return[!1,`Machine cannot change to non-existent state ${s}`];const t=a[e];if(Array.isArray(t)){if(!t.includes(s))return[!1,`Machine cannot ${e} -> ${s}. Allowed transitions: ${t.join(", ")}`]}else if(s!==t&&t!=="*")return[!1,`Machine cannot ${e} -> ${s}. Allowed transition: ${t}`];return[!0,"ok"]}isValid(e){return v.isValid(this.state,e,i(this,f))}set state(e){const s=i(this,l),[a,t]=v.isValid(s,e,i(this,f));if(!a)throw new Error(t);i(this,y)&&console.log(`StateMachine: ${s} -> ${e}`),o(this,l,e),i(this,f)[e]===null&&o(this,d,!0),setTimeout(()=>{this.fireEvent("change",{newState:e,priorState:s}),this.isDone&&this.fireEvent("stop",{state:e})},1)}get state(){return i(this,l)}},b=v;l=new WeakMap;y=new WeakMap;f=new WeakMap;d=new WeakMap;p=new WeakMap;export{b as S};
