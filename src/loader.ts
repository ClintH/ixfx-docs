/**
 * As of writing, Astro has trouble loading client-rendered
 * Lit elements:
 * https://github.com/withastro/astro/issues/2526
 * 
 * Attributes are also not properly passed.
 * 
 * This is a dirty workaround. 
 */

import {LitElement} from "lit";

export const importEl = (parentIdOrEl: string | Element, name: string, attribs?: any) => {
  const parent = typeof parentIdOrEl === `string` ? document.getElementById(parentIdOrEl) : parentIdOrEl;
  if (parent === null) throw new Error(`parent could not be found: ${parentIdOrEl}`);
  const el = document.createElement(name) as LitElement;
  if (el === null) throw new Error(`Element could not be created: ${name}`);
  if (attribs !== undefined) {
    for (const [key, value] of Object.entries(attribs)) {
      el.setAttribute(key, value as string);
    }
  }
  parent.append(el);
  return el;
}
//@ts-ignore
window.importEl = importEl;
