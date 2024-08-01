import { LitElement, css, html } from 'lit';
import { property } from 'lit/decorators.js';
import { e as elStyles } from './styles.9b8f8965.mjs';

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};
const tagName = "demo-element";
class DemoElement extends LitElement {
  static styles = [
    elStyles,
    css`
    :host {
      display: block;
    }
    .container {
      border: 1px solid black;
      padding: 0.5em;
      border-radius: 3px;
      background-color: var(--bg-mono);
      color: var(--fg-mono);
      display:flex;
      margin-top: 1em;
      margin-bottom: 1em;
      flex-direction: column;
      height: 100%;
      width: 100%;
    }
    .toolbar a.icon:visited, .toolbar a.icon:link {
      color: var(--fg-mono);
    }

    .toolbar {
      opacity: 0.3;
      transition: opacity 1s ease-out;
    }
    .titleBar:hover .toolbar {
      opacity: 1.0;
      transition: opacity 0.3s ease-in;
    }
    .titleBar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 0.5em;
    }

    iframe {
      flex-grow: 1;
    }
    `
  ];
  constructor() {
    super();
    this.src = ``;
    this.title = ``;
  }
  render() {
    if (this.src.length == 0)
      return html``;
    const src = this.src;
    const title = this.title;
    const demoBase = `https://clinth.github.io/ixfx-demos`;
    const editBase = `https://github.com/ClintH/ixfx-demos/tree/main/`;
    const demoUrl = demoBase + src;
    const editUrl = editBase + src;
    return html`
			<div class="container">
        <div class="titleBar">
          <div>${title}</div>
          <div class="toolbar">
            <a class="icon icon-external-link" title="View source" target="_blank" href="${editUrl}">Source</a> 
            <a class="icon icon-external-link" title="Open demo in new window" target="_blank" href="${demoUrl}">Open</a> 
          </div>
        </div>

        <iframe src="${demoUrl}"></iframe>
      </div>
		`;
  }
}
__decorateClass([
  property()
], DemoElement.prototype, "title", 2);
__decorateClass([
  property()
], DemoElement.prototype, "src", 2);
customElements.define(tagName, DemoElement);

var $$module2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  tagName: tagName
}, Symbol.toStringTag, { value: 'Module' }));

export { $$module2 as $ };
