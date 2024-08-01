import { c as createComponent, r as renderTemplate, m as maybeRenderHead, a as renderComponent } from './astro/server__cawITtY.mjs';
import 'kleur/colors';
/* empty css                                */

const $$EnvelopePlay = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate` ${maybeRenderHead()}<div class="toolbar" data-astro-cid-v32rc4qy> <section data-astro-cid-v32rc4qy> <button id="btnTrigger" data-astro-cid-v32rc4qy>Trigger</button> </section> <section data-astro-cid-v32rc4qy> <button id="btnTriggerHold" data-astro-cid-v32rc4qy>Trigger & Hold</button> <button id="btnRelease" data-astro-cid-v32rc4qy>Release</button> </section> <section data-astro-cid-v32rc4qy> <label for="chkLooping" data-astro-cid-v32rc4qy>
Looping
</label> <input type="checkbox" id="chkLooping" data-astro-cid-v32rc4qy> </section> <section data-astro-cid-v32rc4qy> <label for="selectShow" data-astro-cid-v32rc4qy>
Show
</label> <select id="selectShow" data-astro-cid-v32rc4qy> <option value="scaled" data-astro-cid-v32rc4qy>Scaled</option> <option value="raw" data-astro-cid-v32rc4qy>Raw</option> </select> </section> </div> <div class="stackVertical" data-astro-cid-v32rc4qy> <div id="envData" data-astro-cid-v32rc4qy></div> <div style="display: flex" data-astro-cid-v32rc4qy> ${renderComponent($$result, "log-element", "log-element", { "id": "envDataLog", "data-astro-cid-v32rc4qy": true })} </div> </div>`;
}, "/Users/af4766/repos/ixfx-docs/src/pages/modulation/EnvelopePlay.astro", void 0);

const $$file = "/Users/af4766/repos/ixfx-docs/src/pages/modulation/EnvelopePlay.astro";
const $$url = "/modulation/EnvelopePlay";

export { $$EnvelopePlay as default, $$file as file, $$url as url };
