import{s as c,l as d,y as o,e as t,d as a}from"./vendor.c33530a8.js";const f=({headers:n=[]})=>{const s=c([]),[i,h]=d(void 0);return o(()=>{const e=()=>{const l=document.querySelectorAll("article :is(h1, h2, h3, h4)");s.current=Array.from(l).map(r=>({id:r.id,topOffset:r.getBoundingClientRect().top+window.scrollY}))};return e(),window.addEventListener("resize",e),()=>{window.removeEventListener("resize",e)}},[]),t(a,{children:[t("h2",{class:"heading",children:"On this page"}),t("ul",{children:[t("li",{class:`header-link depth-2 ${i==="overview"?"active":""}`.trim(),children:t("a",{href:"#overview",children:"Overview"})}),n.filter(({depth:e})=>e>1&&e<4).map(e=>t("li",{class:`header-link depth-${e.depth} ${i===e.slug?"active":""}`.trim(),children:t("a",{href:`#${e.slug}`,children:e.text})}))]})]})};export{f as default};
