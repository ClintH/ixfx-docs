import"./chunks/GridEditor.e10c3209.js";import{r as d,F as s,o as n,A as c}from"./chunks/chunk-VMFDTDO4.003de47f.js";import"./chunks/chunk-IP2OCIJK.bdd1e666.js";import"./client-shim.cda72367.js";const l=d("#dataGrid"),u=d("#dataGridRead"),a=new Map;s.button("#btnDataRandom",()=>i());l.cellRenderer=(r,e,t)=>{const o=a.get(n.cellKeyString(r));if(o!==void 0)return t.fillStyle=o.colour,t.fillRect(e.x,e.y,e.width,e.height),!0};l.addEventListener("cellPointerMove",r=>{const e=r.detail;if(e===void 0)return;const t=a.get(n.cellKeyString(e));u.innerText=`Cell ${e.x}, ${e.y} has data ${JSON.stringify(t)}`});const i=()=>{const r=l.getGrid(),e=["bisque","cadetblue","cornflowerblue","coral"],t=()=>c.randomElement(e);for(let o of n.cells(r))a.set(n.cellKeyString(o),{colour:t(),funk:Math.random()});l.draw()};i();