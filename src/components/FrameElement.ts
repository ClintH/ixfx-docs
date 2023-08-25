import {LitElement, html, css} from 'lit';
import {property} from 'lit/decorators.js';
import {elStyles} from './styles.js';

export const tagName = 'frame-element';

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

  @property()
  declare title: string;

  @property()
  declare src: string;

  constructor() {
    super();
    this.src = ``;
    this.title = ``;
  }

  render() {
    if (this.src.length == 0) return html``;
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

customElements.define(tagName, FrameElement);
