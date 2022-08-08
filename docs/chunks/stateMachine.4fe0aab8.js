import{l as f,V as p,W as h,X as O}from"./chunk-CWNWYEFL.2e02d266.js";import"./chunk-IP2OCIJK.bdd1e666.js";const o=f("#dataStream",{capacity:8,timestamp:!1});let i;const S={morningRoutine:{description:{sleep:"wakeup",wakeup:["coffee","breakfast"],coffee:"bike",breakfast:"bike",bike:null},initialState:"sleep"},loop:{description:{tideGoesIn:"tideGoesOut",tideGoesOut:"tideGoesIn"},initialState:"tideIn"},bread:{description:{plain:["toasted","buttered","eaten"],toasted:["buttered","eaten","diced"],buttered:["eaten","marmaladed"],marmaladed:"eaten",diced:"sprinkled-on-soup","sprinkled-on-soup":null,eaten:null},initialState:"plain"}},d=document.getElementById("btnChangeState"),c=document.getElementById("descrValidate"),a=document.getElementById("jsonDescr");a.addEventListener("input",()=>{console.log(a.innerText);let[e,t]=k(a.innerText);e?(t="\u2714 OK",c.classList.remove("error")):(t=t,c.classList.add("error")),c.innerHTML=t});const b=document.getElementById("currentState"),m=p("#selDescrInitial"),n=p("#selPossibleNext",void 0,{placeholderOpt:"-- Auto --",autoSelectAfterChoice:0}),g=p("#selDemoMachines",e=>{let t=S[e];a.innerText=JSON.stringify(t.description,void 0,2),m.setOpts(Object.keys(t.description),t.initialState)},{shouldAddChoosePlaceholder:!0,autoSelectAfterChoice:0});g.setOpts(Object.keys(S));const k=e=>{try{const t=JSON.parse(e);return m.setOpts(Object.keys(t)),[!0,""]}catch(t){return[!1,t.message]}},x=h("#btnSetDescr",()=>{try{let e=a.innerText;const t=JSON.parse(e),l=m.value,s=v(l,t);i=s,u(s),o.clear()}catch(e){console.error(e),o.error(e.message),u(void 0)}}),u=e=>{if(e===void 0){d.disabled=!0,n.disabled=!0,b.innerText="(invalid JSON)",n.setOpts([]);return}b.innerText=`Current state: ${e.state}`,n.setOpts(e.states.filter(t=>e.isValid(t)[0])),d.disabled=e.isDone,n.disabled=e.isDone},v=(e,t)=>{let l={debug:!1},s=new O(e,t,l);return s.addEventListener("change",r=>{o.log(`${r.priorState} -> ${r.newState}`),u(s)}),s.addEventListener("stop",r=>{o.log(`Done: ${r.state}`)}),s};d.addEventListener("click",()=>{if(i===void 0){o.log("No machine set");return}n.isSelectedPlaceholder?i.next():i.state=n.value});g.select(1,!0);x.click();
