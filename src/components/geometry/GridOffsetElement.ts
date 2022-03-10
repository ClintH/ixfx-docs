import {LitElement, html, css} from 'lit';
import {elStyles} from '../styles.js';
import {Grids} from 'ixfx/lib/geometry';
import {GridEditor} from './GridEditor.js';
import {Colour, Drawing} from 'ixfx/lib/visual';

export const tagName = 'grid-offset-element';

export class GridOffsetElement extends LitElement {
  static readonly styles = [
    elStyles,
    css`
    #offsetsGrid {
      --grid-color:var(--divider);
      --hover-color: var(--bg-contrast);
      --selected-color: var(--yellow);
    }
    `
  ];

  selectedCell: Grids.Cell;
  grid: Grids.Grid;
  wrapStyle: string;
  distance: number;

  constructor() {
    super();
    this.selectedCell = {x: 0, y: 0};
    this.wrapStyle = `stop`;
    this.distance = 2;
  }

  offsets() {
    const el = this.shadowRoot.getElementById(`offsetsGrid`) as GridEditor;
    const selected = el.selectedCell;

    const offsets = Grids.offsetCardinals(this.grid, selected, this.distance, this.wrapStyle as Grids.BoundsLogic);
    el.cellRenderer = (cell, rect, ctx) => {
      const kv = Object.entries(offsets).find(t => Grids.cellEquals(t[1], cell));
      if (kv === undefined) return false;
      Drawing.textBlockAligned(ctx, kv[0], {
        vert: `center`,
        horiz: `center`,
        bounds: rect,
        fillStyle: Colour.getCssVariable(`fg`, `yellow`)
      })
      return true;
    }
  }

  onCellPointerMove(ev) {
    const cell = ev.detail;
    if (cell === undefined) return;

    const el = ev.target as GridEditor;
    el.selectedCell = cell;
    this.offsets();
  }

  protected updated(_changedProperties: Map<string | number | symbol, unknown>): void {
    const el = this.shadowRoot.getElementById(`offsetsGrid`) as GridEditor;
    el.addEventListener(`cellPointerMove`, (ev) => this.onCellPointerMove(ev));
    this.grid = el.getGrid();
  }

  onWrapChange(evt) {
    this.wrapStyle = (evt.target as HTMLInputElement).value;
  }

  onDistanceChange(evt) {
    this.distance = parseInt((evt.target as HTMLInputElement).value);
  }

  render() {
    return html`
    <div class="toolbar centered">
      <section>
        <label>Bounds:</label>
        <select id="selOffsetsWrap" @input="${this.onWrapChange}" title="How should coordinate wrapping behave?">
          <option>stop</option>
          <option>wrap</option>
          <option>undefined</option>
        </select>
      </section>
      <section>
        <label>Distance:</label>
        <input title="Coordinate distance" @input="${this.onDistanceChange}" type="range" id="rangeOffsetsDistance" value="${this.distance}" min="1" max="4">
      </section>
    </div>
    <div>
      <grid-editor rows="5" cols="5" pixelSize="30" id="offsetsGrid" />
    </div>
    `;
  }
}

customElements.define(tagName, GridOffsetElement);
