import {LitElement, html, css} from 'lit';
import {property} from 'lit/decorators.js';
import {elStyles} from './styles.js';

export const tagName = 'demo-element';

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
    const demoBase = import.meta.env.DEV ?
      `http://127.0.0.1:5555` :
      `https://clinth.github.io/ixfx-demos`
    const editBase = `https://github.com/ClintH/ixfx-demos/tree/main/`

    const demoUrl = demoBase + src;
    const editUrl = editBase + src;
    return html`
			<div class="container">
        <div class="titleBar">
          <div>${title}</div>
          <div class="toolbar">
            <a class="icon icon-external-link" title="Edit code" target="_blank" href="${editUrl}">Edit</a> 
            <a class="icon icon-external-link" title="Open demo in new window" target="_blank" href="${demoUrl}">Open</a> 
          </div>
        </div>

        <iframe src="${demoUrl}"></iframe>
      </div>
		`;
  }
}

customElements.define(tagName, DemoElement);
