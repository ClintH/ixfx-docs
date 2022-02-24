import {LitElement, html, css} from 'lit';
import {property} from 'lit/decorators.js';
import {elStyles} from '../../components/styles.js';
import {Easings} from 'ixfx/lib/modulation';
import {FuncPlotElement} from '../../components/FuncPlotElement.js';
import {importEl} from '../../loader.js';

export const tagName = 'easinggallery-element';

export class EasingGalleryElement extends LitElement {
  static readonly styles = [
    elStyles,
    css`
    .controls .vertical {
      align-items: left;
    }
    .easing {
      display: flex;
      padding: 0.3em;
      margin: 0.3em;
      min-width: 7em;
      min-height: 7em;
      flex-direction: column;
      overflow: hidden;
    }
    .easing h1 {
      font-size: 1em;
    }
    #container {
      display: flex;
      flex-wrap: wrap;
    }
    funcplot-element {
    }
    `
  ];

  constructor() {
    super();
  }

  protected updated(_changedProperties: Map<string | number | symbol, unknown>): void {
    super.updated(_changedProperties);

    this.shadowRoot.querySelectorAll(`[data-easing]`).forEach(el => {
      const easingAttr = el.getAttribute(`data-easing`);
      const plotEl = new FuncPlotElement();
      plotEl.collapsed = true;
      plotEl.setFunction(easingAttr, Easings.get(easingAttr as Easings.EasingName));
      el.appendChild(plotEl);
    });
  }

  renderEasing(name: Easings.EasingName) {
    return html`
    <div data-easing="${name}" class="easing">
      <h1>${name}</h1>
    </div>
    `;
  }

  render() {
    const easings = [...Easings.getEasings()].sort();
    return html`
    <div id="container">
      ${easings.map(name => this.renderEasing(name as Easings.EasingName))}
    </div>
    `;
  }
}

customElements.define(tagName, EasingGalleryElement);
