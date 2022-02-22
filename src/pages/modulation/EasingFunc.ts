import {importEl} from '../../loader.js';
import {Easings} from 'ixfx/lib/modulation';
import {FuncPlotElement} from '../../components/FuncPlotElement.js';

document.querySelectorAll(`[data-easing]`).forEach(el => {
  const plot = importEl(el, `funcplot-element`) as FuncPlotElement;
  const fnAttr = el.getAttribute(`fn`);
  const easingAttr = el.getAttribute(`easing`);

  if (fnAttr !== null && fnAttr.length > 0) {
    const fn = new Function(`x`, ` return ${fnAttr}`);
    plot.func = fn; //fnWrapper;  
  } else if (easingAttr !== null && easingAttr.length > 0) {
    const easingFn = Easings.get(easingAttr as Easings.EasingName);
    if (easingFn === undefined) {
      console.error(`Could not find easing: ${easingAttr}`);
    } else {
      plot.func = easingFn;
    }
  } else {
    console.warn(`Neither fn or easing attributes defined for function plot.`);
  }

  // Give component time to render before plotting
  setTimeout(() => {
    plot.plot();
  }, 1000);
});


