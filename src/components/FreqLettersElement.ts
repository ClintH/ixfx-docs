/* eslint-disable */
import {LitElement, html, css} from 'lit';
import {property} from 'lit/decorators.js';

import {frequencyMutable} from 'ixfx';
import {KeyValues} from 'ixfx';
import {elStyles} from './styles.js';

export const tagName = `freq-letters`;

export class FreqLettersElement extends LitElement {
  static readonly styles = [
    elStyles,
    css`
  .container {
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 1em;
  }
  
  ol {
    margin: 0;
    margin-top: 0.3em;
    padding: 0;
  }
  
  input {
    width: 15em;
    margin-right: 1em;
    margin-left: 0.3em;
    padding: 0.3em;
    font-size: 1.5em;  
  }
`];

  // #toolbar {
  //   display: flex;
  //   padding: 1em;
  // }
  // #toolbar input {
  //   width: 15em;
  //   margin-right: 1em;
  //   margin-left: 0.3em;
  //   padding: 0.3em;
  //   font-size: 1.5em;
  // }
  @property()
  declare text: string;

  constructor() {
    super();
    this.text = `Hello there! - Obiwan Kenobi`;
  }

  _onInput(el) {
    this.text = el.target.value;
  }

  render() {
    const freq = frequencyMutable();
    for (let i = 0; i < this.text.length; i++) {
      const letter = this.text.toLocaleUpperCase().charAt(i);
      if (letter === ` `) continue; // Skip spaces;
      freq.add(letter);
    }
    const sorted = freq.entriesSorted(`valueReverse`);
    const mma = KeyValues.minMaxAvg(sorted);
    const amount = Math.min(sorted.length, 3);
    const top = sorted.slice(0, amount);

    const percent = (kv) => Math.round(kv[1] / mma.total * 100);
    return html`
    <div class="container">
      <div class="toolbar">
        <input @input="${this._onInput}" type="text" .value="${this.text}">
      </div>
      <div>
        Top ${amount} letters:
        <ol>
        ${top.map(kv => html`<li>'${kv[0]}' ${percent(kv)}%</li>`)}
        </ol>
        </div>
    </div>
		`;
  }
}
customElements.define(tagName, FreqLettersElement);
