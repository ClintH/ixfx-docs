import {LitElement, html, css} from 'lit';
import {elStyles} from '../styles.js';
import {Grids} from 'ixfx/lib/geometry';
import {GridEditor} from './GridEditor.js';
import {Colour, Drawing} from 'ixfx/lib/visual';
import {setMutable} from 'ixfx/lib/collections';

export const tagName = 'grid-visitor-element';

export class GridVisitorElement extends LitElement {
  static readonly styles = [
    elStyles,
    css`
    #grid {
      --grid-color:var(--divider);
      --hover-color: var(--bg-contrast);
      --selected-color: var(--yellow);
    }
    `
  ];

  visitorKind: string;
  lastClicked: Grids.Cell = {x: 0, y: 0};
  stopping = false;

  constructor() {
    super();
    this.visitorKind = `Random Contiguous`;
  }

  protected updated(_changedProperties: Map<string | number | symbol, unknown>): void {
    const el = this.shadowRoot.getElementById(`grid`) as GridEditor;

    el.addEventListener(`cellPointerUp`, (ev: CustomEvent) => {
      this.lastClicked = ev.detail as Grids.Cell;
      this.stop();
      setTimeout(() => this.start(), 100);
    });
  }

  onVisitorChange(evt) {
    this.visitorKind = (evt.target as HTMLInputElement).value;
  }

  updateButtons(running: boolean) {
    (this.shadowRoot.getElementById(`btnStart`) as HTMLButtonElement).disabled = running;
    (this.shadowRoot.getElementById(`btnStop`) as HTMLButtonElement).disabled = !running;
  }

  start() {
    const el = this.shadowRoot.getElementById(`grid`) as GridEditor;
    const delayMs = 100;
    const grid = el.getGrid();
    const visited = setMutable<Grids.Cell>(c => Grids.cellKeyString(c));
    const visitOpts = {visited};
    const lastClicked = this.lastClicked;
    let visitor;
    switch (this.visitorKind) {
      case `Depth`:
        visitor = Grids.visitorDepth(grid, lastClicked, visitOpts);
        break;
      case `Breadth`:
        visitor = Grids.visitorBreadth(grid, lastClicked, visitOpts);
        break;
      case `Row`:
        visitor = Grids.visitorRow(grid, lastClicked, visitOpts);
        break;
      case `Column`:
        visitor = Grids.visitorColumn(grid, lastClicked, visitOpts);
        break;
      case `Random Contiguous`:
        visitor = Grids.visitorRandomContiguous(grid, lastClicked, visitOpts);
        break;
      default:
        visitor = Grids.visitorRandom(grid, lastClicked, visitOpts);
    }

    this.stopping = false;
    el.cellRenderer = (cell, r, ctx) => {
      if (visited.has(cell)) {
        ctx.fillStyle = `pink`;
        ctx.fillRect(r.x, r.y, r.width, r.height);
        return true;
      }
      return false;
    };

    this.updateButtons(true);

    const run = () => {
      if (this.stopping) return;
      const v = visitor.next();
      const cell = v.value;
      const done = v.done;
      if (done) {
        this.updateButtons(false);
        el.selectedCell = lastClicked;
        return;
      }
      // @ts-ignore
      el.selectedCell = cell;
      setTimeout(run, delayMs);
    }
    setTimeout(run, delayMs);
  }

  stop() {
    const el = this.shadowRoot.getElementById(`grid`) as GridEditor;
    if (!this.stopping) {
      this.updateButtons(false);
    }
    this.stopping = true;
    el.selectedCell = this.lastClicked;
  }

  render() {
    return html`
    <div class="toolbar centered">
      <section>
        <button @click="${this.start}" id="btnStart">Start</button>
        <button disabled @click="${this.stop}" id="btnStop">Stop</button>
      </section>
      <section>
        <label>Function:</label>
        <select @input="${this.onVisitorChange}" id="selVisTechnique">
          <option>Random Contiguous</option>
          <option>Random</option>
          <option>Depth</option>
          <option>Breadth</option>
          <option>Row</option>
          <option>Column</option>
        </select>
      </section>
    </div>
    <div>
      <grid-editor rows="15" cols="15" pixelSize="15" id="grid" />
    </div>
    `;
  }
}

customElements.define(tagName, GridVisitorElement);
