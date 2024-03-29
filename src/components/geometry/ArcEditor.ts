/* eslint-disable */
import {LitElement, html, css} from 'lit';
import {property} from 'lit/decorators.js';
import {Arcs} from 'ixfx/lib/geometry';
import {Svg} from 'ixfx/lib/visual';

export const tagName = `arc-editor`;

export class ArcEditor extends LitElement {
  static readonly styles = css`
  #container {
    display: flex;
    align-items: center;
    flex-direction: column
  }
  #toolbar {
    display: flex;
    padding: 1em;
    display: none;
  }
  #toolbar input {
    width: 3em;
    margin-right: 1em;
    margin-left: 0.3em;
  }
  `;

  @property()
  declare startRadian: number;

  @property()
  declare strokeStyle: string;

  @property()
  declare endRadian: number;

  @property()
  declare counterClockwise: boolean;

  @property({type: Number})
  declare radius: number;

  constructor() {
    super();
    this.radius = 20;
    this.startRadian = 0;
    this.endRadian = Math.PI;
    this.strokeStyle = `var(--accent-bold, "yellow")`;
  }

  getArc(): Arcs.Arc {
    return {
      startRadian: this.startRadian,
      endRadian: this.endRadian,
      radius: this.radius,
      counterClockwise: this.counterClockwise
    };
  }

  setArc(arc: Arcs.Arc) {
    this.radius = arc.radius;
    this.startRadian = arc.startRadian;
    this.endRadian = arc.endRadian;
    this.counterClockwise = arc.counterClockwise;
  }

  getBounds() {
    const svg = Svg.makeHelper(
      this.shadowRoot.querySelector(`svg`)
    );
    return {width: svg.width, height: svg.height};
  }

  renderSvg() {
    const svg = Svg.makeHelper(
      this.shadowRoot.querySelector(`svg`),
      {fillStyle: `transparent`, strokeStyle: this.strokeStyle, strokeWidth: 3}
    );

    svg.clear();
    const w = svg.width;
    const h = svg.height;
    const a = this.getArc();
    //  console.log(JSON.stringify(a));

    const origin = {x: w / 2, y: h / 2};
    svg.path(Arcs.toSvg(a, origin));
  }

  async updated() {
    this.renderSvg();
  }

  render() {
    return html`
			<div id="container">
        <div id="toolbar">
          <div class="opt">
            <label>Radius:</label>
            <input type="number" id="radius" value=${this.radius}>
          </div>
          <div class="opt">
            <label>Start radian:</label>
            <input type="number" id="startRadian" value=${this.startRadian}>
          </div>
          <div class="opt">
            <label>End radian:</label>
            <input type="number" id="endRadian" value=${this.endRadian}>
          </div>
        </div>
        <svg width=200 height=200></svg>
			</div>
		`;
  }
}

try {
  customElements.define(tagName, ArcEditor);
} catch (ex) {
  console.log(ex);
}