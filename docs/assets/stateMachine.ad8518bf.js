import{l as f,s as l,b as g}from"./chunk-MBZ4GFG7.e6b9ac15.js";import"./chunk-V6WGO73W.92c7aaab.js";import{S as k}from"./chunk-YFNN25WV.a6803c71.js";import"./chunk-6JTGCZJL.d1807a28.js";const a=f("#dataStream",{capacity:8,timestamp:!1});let i;const b={morningRoutine:{description:{sleep:"wakeup",wakeup:["coffee","breakfast"],coffee:"bike",breakfast:"bike",bike:null},initialState:"sleep"},loop:{description:{tideGoesIn:"tideGoesOut",tideGoesOut:"tideGoesIn"},initialState:"tideIn"},bread:{description:{plain:["toasted","buttered","eaten"],toasted:["buttered","eaten","diced"],buttered:["eaten","marmaladed"],marmaladed:"eaten",diced:"sprinkled-on-soup","sprinkled-on-soup":null,eaten:null},initialState:"plain"}},d=document.getElementById("btnChangeState"),u=document.getElementById("descrValidate"),o=document.getElementById("jsonDescr");o.addEventListener("input",()=>{console.log(o.innerText);let[e,t]=O(o.innerText);e?(t="\u2714 OK",u.classList.remove("error")):(t=t,u.classList.add("error")),u.innerHTML=t});const S=document.getElementById("currentState"),p=l("#selDescrInitial"),n=l("#selPossibleNext",void 0,{placeholderOpt:"-- Auto --",autoSelectAfterChoice:0}),h=l("#selDemoMachines",e=>{let t=b[e];o.innerText=JSON.stringify(t.description,void 0,2),p.setOpts(Object.keys(t.description),t.initialState)},{shouldAddChoosePlaceholder:!0,autoSelectAfterChoice:0});h.setOpts(Object.keys(b));const O=e=>{try{const t=JSON.parse(e);return p.setOpts(Object.keys(t)),[!0,""]}catch(t){return[!1,t.message]}},x=g("#btnSetDescr",()=>{try{let e=o.innerText;const t=JSON.parse(e),c=p.value,s=v(c,t);i=s,m(s),a.clear()}catch(e){console.error(e),a.error(e.message),m(void 0)}}),m=e=>{if(e===void 0){d.disabled=!0,n.disabled=!0,S.innerText="(invalid JSON)",n.setOpts([]);return}S.innerText=`Current state: ${e.state}`,n.setOpts(e.states.filter(t=>e.isValid(t)[0])),d.disabled=e.isDone,n.disabled=e.isDone},v=(e,t)=>{let c={debug:!1},s=new k(e,t,c);return s.addEventListener("change",r=>{a.log(`${r.priorState} -> ${r.newState}`),m(s)}),s.addEventListener("stop",r=>{a.log(`Done: ${r.state}`)}),s};d.addEventListener("click",()=>{if(i===void 0){a.log("No machine set");return}n.isSelectedPlaceholder?i.next():i.state=n.value});h.select(1,!0);x.click();