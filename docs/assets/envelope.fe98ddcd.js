import{d as h,a as p}from"./chunk-ZTVWXQ34.a8bb2adc.js";import"./chunk-HF2GNML5.47466bb1.js";import"./chunk-IARP4YHS.d362b978.js";import"./chunk-G4S3XAFG.00fb0b2a.js";import{F as a}from"./chunk-DIQ6ZWAQ.94b98cf2.js";import{r as v}from"./chunk-EGNKYH6P.1933f072.js";import{P as b,a as w}from"./chunk-URTBDQYG.939553de.js";import"./chunk-MQKU5S5M.fc8875ae.js";import{f as k,m as j,d as D}from"./vendor.d9edd6b2.js";const o=document.getElementById("envDataLog"),g=b.create();g.add("series-",b.getCssVariable("accent-bold","yellow"));const n=w.plot("#envData",{capacity:300,showYAxis:!0,palette:g,lineWidth:3,autoSizeCanvas:!0});let c=!1,l={...h(),attackBend:1,decayBend:-1,releaseBend:1},t=p({...l,shouldLoop:c});t.addEventListener("change",e=>{a.button("#btnRelease").disabled=e.newState!=="sustain"});a.button("#btnTriggerHold",()=>{o.clear(),t.trigger(!0),s()});a.button("#btnRelease",()=>{t.release()});a.button("#btnTrigger",()=>{o.clear(),t.trigger(),s()});const E=a.select("#selectShow",e=>{n.clear(),o.log(""),s()});k(v("#envEditor"),"change").pipe(j(e=>e.detail),D(1e3)).subscribe(e=>{l=e,i()});const i=()=>{try{t=p({...l,shouldLoop:c}),t.trigger(),o.clear(),n.clear(),s()}catch(e){o.error(e)}};a.checkbox("#chkLooping",e=>{c=e,i()});let r=!1;const s=()=>{if(r)return;const e=function(){let[d,f,u]=t.compute();if(u<0)debugger;if(d===void 0){r=!1;return}const m=E.value==="raw"?u:f;n.add(m),o.log(`${d} ${m.toFixed(3)}`),t.isDone?(console.log("Envelope done"),r=!1):(r=!0,window.requestAnimationFrame(e))};window.requestAnimationFrame(e)};i();
