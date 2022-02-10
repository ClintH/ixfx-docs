/**
 * As of writing, Astro has trouble loading client-rendered
 * Lit elements:
 * https://github.com/withastro/astro/issues/2526
 * 
 * Attributes are also not properly passed.
 * 
 * This is a dirty workaround. 
 */

export const importEl = (parentId: string, name: string, attribs: any) => {
  const el = document.createElement(name);
  for (const [key, value] of Object.entries(attribs)) {
    el.setAttribute(key, value);
  }
  document.getElementById(parentId).append(el);
}
//@ts-ignore
window.importEl = importEl;
