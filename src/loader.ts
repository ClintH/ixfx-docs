/**
 * As of writing, Astro has trouble loading client-rendered
 * Lit elements:
 * https://github.com/withastro/astro/issues/2526
 * 
 * Attributes are also not properly passed.
 * 
 * This is a dirty workaround. 
 */

export const importEl = (parentId: string, name: string, attribs?: any) => {
  const parent = document.getElementById(parentId);
  if (parent === null) throw new Error(`parent could not be found: ${parentId}`);
  const el = document.createElement(name);
  if (el === null) throw new Error(`Element could not be created: ${name}`);
  if (attribs !== undefined) {
    for (const [key, value] of Object.entries(attribs)) {
      el.setAttribute(key, value);
    }
  }
  parent.append(el);
  return el;
}
//@ts-ignore
window.importEl = importEl;
