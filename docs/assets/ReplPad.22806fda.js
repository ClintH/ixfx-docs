import{k as a}from"./vendor.c33530a8.js";import{u as h}from"./chunk-OE2F6QKM.bc057148.js";const f=()=>{const i=window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1"?"/pad/index.html":"/ixfx-docs/pad/index.html",u=document.querySelectorAll("pre>code"),l="// repl-pad",r=[];for(const o of u){const t=o.children.item(0);let s=t.innerText;if(!s.startsWith(l))continue;const n=s.substring(l.length);let c="";n.length>0&&n.startsWith("#")&&(c=h(n," ",1));const p={group:c,uri:"",el:o,markerEl:t,src:o.innerText.substring(s.length)};r.push(p)}const e=new Map;for(const o of r)if(o.group.length>0){let t=e.get(o.group);t===void 0&&(t={blocks:[],name:o.group,src:"",uri:""},e.set(o.group,t)),t.blocks.push(o),t.src+=o.src.trim()+`

`}for(const o of r){if(o.group.length>0){const t=e.get(o.group);t.uri.length===0&&(t.uri=a(t.src.trim(),i)),o.uri=t.uri}else o.uri=a(o.src.trim(),i);o.markerEl.innerHTML=`<a style="color: var(--yellow)">//</span> <a title="Open in repl-pad" style="font-weight:bold; color: var(--yellow)" href="${o.uri}">repl-pad</a>`}};f();
