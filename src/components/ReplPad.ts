//import {fromQuery} from 'https://unpkg.com/@clinth/repl-pad@0.0.2/dist/link.js';
import {fromQuery} from '@clinth/repl-pad/dist/link.js';

const r = fromQuery(`pre`, `pad.html`);

for (const {el, uri} of r) {
  const link = document.createElement(`a`);
  link.href = uri;
  link.innerText = `Edit`;
  el.parentNode.insertBefore(link, el.nextSibling);
}