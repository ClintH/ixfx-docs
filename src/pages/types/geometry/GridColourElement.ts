import {LitElement, html, css} from 'lit';
import {elStyles} from '../../../components/styles.js';
import {Grids} from 'ixfx/lib/geometry';
import {GridEditor} from './GridEditor.js';
import {Colour, Drawing} from 'ixfx/lib/visual';
import {Arrays} from 'ixfx/lib/collections';
import {property} from 'lit/decorators.js';

export const tagName = 'grid-colour-element';

export class GridColourElement extends LitElement {
  static readonly styles = [
    elStyles,
    css`
    #grid {
      --grid-color:var(--divider);
      --hover-color: var(--bg-contrast);
      --selected-color: var(--yellow);
    }
    section {
      display: flex;
      background-color: aliceblue;
      border: 2px solid black;
      flex-direction: column;
      color: black;
      padding: 1em;
      max-width: 350px;
      margin: 0 auto;
      align-items: center;
    }
    `
  ];

  @property({attribute: true, type: String})
  declare title;

  colours = new Map();

  constructor() {
    super();
    this.title = ``;
  }

  protected updated(_changedProperties: Map<string | number | symbol, unknown>): void {
    const el = this.shadowRoot.getElementById(`grid`) as GridEditor;
    el.cellRenderer = (cell, rect, ctx) => {
      const d = this.colours.get(Grids.cellKeyString(cell));
      if (d === undefined) return;
      ctx.fillStyle = d.colour;
      ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
      return true;
    };

    el.addEventListener(`cellPointerMove`, (evt) => {
      // @ts-ignore
      const cell = evt.detail;
      if (cell === undefined) return;
      const d = this.colours.get(Grids.cellKeyString(cell));

      this.title = `Cell ${cell.x}, ${cell.y} has data ${JSON.stringify(d)}`;
    });
  }

  random() {
    const el = this.shadowRoot.getElementById(`grid`) as GridEditor;
    if (el === null) throw new Error(`Grid not found`);
    const shape = el.getGrid();
    const colours = [`bisque`, `cadetblue`, `cornflowerblue`, `coral`]
    const randomColour = () => Arrays.randomElement(colours);
    for (let cell of Grids.cells(shape)) {
      this.colours.set(Grids.cellKeyString(cell), {colour: randomColour(), funk: Math.random()});
    }
    el.draw();
  }

  render() {
    return html`
    <section>
      <grid-editor rows="15" cols="15" pixelSize="20" id="grid"></grid-editor>
      <button @click="${this.random}">Randomise</button>
      <div id="title">${this.title}</div>
    </section>
    `;
  }
}

customElements.define(tagName, GridColourElement);
