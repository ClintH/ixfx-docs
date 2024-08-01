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
const tagName = "frame-element";
class FrameElement extends LitElement {
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
    return html`
			<div class="container">
        <div class="titleBar">
          <div>${title}</div>
          <div class="toolbar">
            <a class="icon icon-external-link" title="Open demo in new window" target="_blank" href="${src}">Open</a> 
          </div>
        </div>
        <iframe src="${src}"></iframe>
      </div>
		`;
  }
}
__decorateClass([
  property()
], FrameElement.prototype, "title", 2);
__decorateClass([
  property()
], FrameElement.prototype, "src", 2);
customElements.define(tagName, FrameElement);

var $$module3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  tagName: tagName
}, Symbol.toStringTag, { value: 'Module' }));

export { $$module3 as $ };
