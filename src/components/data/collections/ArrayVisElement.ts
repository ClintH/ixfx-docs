/* eslint-disable */
import {LitElement, html, css} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {Palette} from 'ixfx/lib/visual';
import {elStyles} from '../../styles.js';
import {Stacks, Queues} from 'ixfx/lib/collections';

export const tagName = `array-vis-element`;

export class ArrayVisElement extends LitElement {
  static readonly styles = [
    elStyles,
    css`
      :host {
        --margin: 0.2em;
        --border: 3px solid;
      }
      #container {
        display: flex;
        align-items: center;
        flex-direction: column;
      }
      #items {
        border-left: var(--border) var(--fg);
        border-right: var(--border) var(--fg);
        display: flex;
        flex-direction: column;
        max-height: 40vh;
        overflow-y: auto;
        border-radius: 0.2em;
      }
      #container.withBottom #items {
        border-bottom: var(--border) var(--fg);
      }

      .item {
        display: flex;
        flex-direction: row;
        margin: var(--margin);
        cursor: default;
        background-color: var(--bg-contrast);
        color: var(--fg);
        opacity: 0.8;
      }
      .item:hover {
        opacity: 1.0;
      }
      label {
        opacity:0.6;
        margin-right: var(--margin);
        padding: var(--margin);

      }
      .content {
        padding: var(--margin);
        text-align: center;
        flex-grow: 1;
      }
  `];

  @property({attribute: false, type: Array})
  declare data: unknown[];

  @property({attribute: true, type: Boolean})
  declare indexes: boolean;

  @property()
  declare classes;

  palette: Palette.Palette;

  constructor() {
    super();
    this.data = [`apples`, `oranges`, `passionfruit`];
    this.palette = Palette.create();
    this.palette.setElementBase(this);
    this.indexes = false;
    this.classes = {withBottom: true};
  }

  renderValue(v: unknown) {
    let vs = '';
    if (typeof v === `string`) {
      vs = `"${v}"`
    } else if (typeof v === `number`) {
      vs = `${v}`
    } else if (typeof v == `boolean`) {
      if (v) vs = `true`;
      else vs = `false`;
    } else {
      vs = JSON.stringify(v, undefined, 2);
    }
    return html`<div class="content">${vs}</div>`;
  }

  renderItem(v: unknown, index: number) {
    return html`<div title="Index ${index}" class="item">
      ${this.indexes ? html`<label>x${index}</label>` : html``}
      ${this.renderValue(v)}
    </div>`
  }

  renderArray() {
    const d = this.data;
    if (!Array.isArray(d)) {
      return html`(err: data is not an array: ${typeof d})`;
    }
    return html`
    <div id="items">
    ${d.map((v, i) => this.renderItem(v, i))}
    </div>
    `
  }

  render() {
    return html`
    <div id="container" class=${classMap(this.classes)}>
    ${this.renderArray()}
    </div> 
    `
  }
}

customElements.define(tagName, ArrayVisElement);