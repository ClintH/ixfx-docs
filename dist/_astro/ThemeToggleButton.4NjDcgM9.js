import{l as c,y as m}from"./hooks.module.CJPd-mOi.js";/* empty css                        */const n=["light","dark"],h=[React.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"20",height:"20",viewBox:"0 0 20 20",fill:"currentColor"},React.createElement("path",{fillRule:"evenodd",d:"M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z",clipRule:"evenodd"})),React.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"20",height:"20",viewBox:"0 0 20 20",fill:"currentColor"},React.createElement("path",{d:"M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"}))],d=()=>{const[t,l]=c(()=>typeof localStorage<"u"&&localStorage.getItem("theme")?localStorage.getItem("theme"):window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");return m(()=>{const e=document.documentElement;t==="light"?e.classList.remove("theme-dark"):e.classList.add("theme-dark")},[t]),React.createElement("div",{class:"theme-toggle"},n.map((e,o)=>{const r=h[o],a=e===t;return React.createElement("label",{className:a?" checked":""},r,React.createElement("input",{type:"radio",name:"theme-toggle",checked:a,value:e,title:`Use ${e} theme`,"aria-label":`Use ${e} theme`,onChange:()=>{localStorage.setItem("theme",e),l(e)}}))}))};export{d as default};