/* eslint-disable */
import {LitElement, html, css} from 'lit';
import {property} from 'lit/decorators.js';
import {themeChangeObservable} from 'ixfx/lib/dom';
import {Palette} from 'ixfx/lib/visual';
import * as Svg from 'ixfx/lib/svg';
import {elStyles} from './styles.js';

export const tagName = `arrayvis-element`;

export class ArrayVisElement extends LitElement {
  static readonly styles = [
    elStyles,
    css`
      #container {
        display: flex;
        align-items: center;
        flex-direction: column;
      }
  `];

  // @property()
  // declare width: number;

  // @property()
  // declare height: number;

  @property()
  declare data: unknown[];

  palette: Palette.Palette;
  constructor() {
    super();
    this.data = [`apples`, `oranges`, `passionfruit`];
    this.palette = Palette.create();
    this.palette.setElementBase(this);
    // this.width = 500;
    // this.height = 300;

    // themeChangeObservable().subscribe(() => {
    //   this.updated();
    // });
  }

  renderValue(v: unknown) {
    if (typeof v === `string`) {
      return html`\`${v}\``
    } else if (typeof v === `number`) {
      return html`${v}`
    } else if (typeof v == `boolean`) {
      if (v) return html`true`;
      return html`false`;
    } else {
      return html`${JSON.stringify(v, undefined, 2)}`
    }
  }
  renderItem(v: unknown) {
    return html`<div>${this.renderValue(v)}</div>`
  }

  renderArray() {
    const d = this.data;
    return html`
    <div class="items">
    ${d.forEach(v => this.renderItem(v))}
    </div>
    `
  }

  render() {
    return html`
    <div id="container">
    ${this.renderArray()}
    </div> 
    `
  }
}

customElements.define(tagName, ArrayVisElement);