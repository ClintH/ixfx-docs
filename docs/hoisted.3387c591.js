import{ak as degreeToRadian,ai as Arc_exports}from"./chunks/chunk-QOZ2BRCA.14308385.js";import"./chunks/chunk-OE2F6QKM.34a70cb8.js";import"./chunks/chunk-U4IZE4J2.1410a545.js";import"./chunks/chunk-MW3GDUJU.b2443a15.js";import{a as createAfter,b as createIn}from"./chunks/chunk-BSJKVIJG.f7604bb7.js";import{f as fromEvent,c as debounceTime}from"./client-shim.cda72367.js";import"./chunks/ReplPad.982adf15.js";import"./chunks/chunk-6SYKIMQH.63e605dc.js";window.degreeToRadian=degreeToRadian;document.querySelectorAll(".arc").forEach(el=>{const id=el.id,editorId=id.replace("Txt",""),editor=document.getElementById(editorId);if(editor===null){console.warn(`Could not find editor ${editorId}`);return}const starting=el.value,errorEl=createAfter(el,"div");errorEl.classList.add("arcError"),errorEl.style.borderRadius="3px",errorEl.style.color="pink",errorEl.style.display="none";const update=()=>{try{const a=eval("("+el.value+")");if(Arc_exports.isArc(a)){const r=a;try{Arc_exports.guard(r),editor.setArc(r);const e=editor.getBounds();r.radius>e.width/2||r.radius>e.height/2?showError(`Arc might be too large to see. You probably want a radius of less than ${Math.floor(e.height/2)}`):hideError()}catch(e){showError(e)}}else showError("Arcs need to have radius, startRadian and endRadian defined.")}catch(r){console.error(r),showError("Syntax error")}},errorMsg=createIn(errorEl,"div");errorMsg.style.paddingBottom="1em";const errorReset=createIn(errorEl,"button");errorReset.innerText="Reset",errorReset.addEventListener("click",()=>{el.value=starting,el.setAttribute("value",starting),update()});const showError=r=>{errorMsg.innerText=r,errorEl.style.display="block"},hideError=()=>{errorEl.style.display="none"};fromEvent(el,"input").pipe(debounceTime(400)).subscribe(r=>{update()})});
