import{g as u}from"../client-shim.cda72367.js";import{u as p}from"./chunk-OMXZMOOU.e9ad33f4.js";const g=()=>{const i=window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1"?"/pad/index.html":"/ixfx-docs/pad/index.html",a=document.querySelectorAll("pre>code"),l="// repl-pad",r=[];for(const t of a){const o=t.children.item(0);let e=o.innerText;if(!e.startsWith(l))continue;const n=e.substring(l.length);let c="";n.length>0&&n.startsWith("#")&&(c=p(n," ",1));const h={group:c,uri:"",el:t,markerEl:o,src:t.innerText.substring(e.length)};r.push(h)}const s=new Map;for(const t of r)if(t.group.length>0){let o=s.get(t.group);o===void 0&&(o={blocks:[],name:t.group,src:"",uri:""},s.set(t.group,o)),o.blocks.push(t),o.src+=t.src.trim()+`

`}for(const t of r){if(t.group.length>0){const o=s.get(t.group);o.uri.length===0&&(o.uri=u(o.src.trim(),i)),t.uri=o.uri}else t.uri=u(t.src.trim(),i);t.markerEl.innerHTML=`// <a style="color: unset" href="${t.uri}">repl-pad</a>`}};g();