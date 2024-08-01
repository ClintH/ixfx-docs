import { c as createComponent, r as renderTemplate, m as maybeRenderHead } from './astro/server__cawITtY.mjs';
import 'kleur/colors';
import 'clsx';

const $$ModuleList = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div>
Modules available:<br> <select size="5"> <option>arrays</option> <option>collections</option> <option>components</option> <option>dom</option> <option>forms</option> <option>flow</option> <option>generators</option> <option>geometry</option> <option>keyValues</option> <option>maps</option> <option>modulation</option> <option>polar</option> <option>random</option> <option>sets</option> <option>stateMachine</option> <option>timers</option> <option>visual</option> </select> </div>`;
}, "/Users/af4766/repos/ixfx-docs/src/pages/ModuleList.astro", void 0);

const $$file = "/Users/af4766/repos/ixfx-docs/src/pages/ModuleList.astro";
const $$url = "/ModuleList";

export { $$ModuleList as default, $$file as file, $$url as url };
