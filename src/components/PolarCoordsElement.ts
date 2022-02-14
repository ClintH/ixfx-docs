/* eslint-disable */
import {LitElement, html, css} from 'lit';
import {property} from 'lit/decorators.js';
import {Circles, Arcs, Lines, Points, Polar, radianToDegree} from 'ixfx/lib/geometry';
import {themeChangeObservable} from 'ixfx/lib/dom';
import {Palette} from 'ixfx/lib/visual';
import * as Svg from 'ixfx/lib/svg';
import {elStyles} from './styles.js';

export const tagName = `polar-coords-element`;

export class PolarCoordsElement extends LitElement {
  static readonly styles = [
    elStyles,
    css`
      :host {
        color: var(--label-color, green);
      }
      #container {
        display: flex;
        align-items: center;
        flex-direction: column;
      }
      #container>svg {
        touch-action: none;
      }
  `];

  @property()
  declare radian: number | undefined;

  @property()
  declare degree: number | undefined;

  @property()
  declare width: number;

  @property()
  declare height: number;

  palette: Palette.Palette;
  constructor() {
    super();
    this.palette = Palette.create();
    this.palette.setElementBase(this);
    this.width = 500;
    this.height = 300;

    themeChangeObservable().subscribe(records => {
      this.updated();
    });
  }

  setDegrees(degress: number) {
    this.degree = degress;
    this.radian = undefined;
  }

  setRadians(radians: number) {
    this.degree = undefined;
    this.radian = radians;
  }

  getBounds() {
    const svg = Svg.makeHelper(
      this.shadowRoot.querySelector(`svg`)
    );
    return {width: svg.width, height: svg.height};
  }

  renderSvg() {
    const poleColour = this.palette.get(`fgDim`, `black`);
    const svg = Svg.makeHelper(
      this.shadowRoot.querySelector(`svg`),
      {fillStyle: `transparent`, strokeWidth: 3}
    );

    svg.clear();
    const w = svg.width;
    const h = svg.height;
    const minWh = Math.min(w / 2, h / 2);
    const center = {x: w / 2, y: h / 2};

    Svg.Elements.grid(svg.parent, center, 25, w, h);

    // Pole
    const axisYOffset = 25;
    svg.circle({radius: 3, ...center}, {fillStyle: poleColour, strokeStyle: `none`})
    svg.text('Origin', Points.sum(center, 2, axisYOffset), {fillStyle: poleColour, strokeStyle: `none`});

    // Pole axis
    const triangleMarker = {
      id: `triangle`,
      fillStyle: poleColour
    }

    const poleAxisLine = Lines.fromNumbers(center.x, center.y, center.x + minWh - 10, center.y);
    svg.line(poleAxisLine, {fillStyle: `none`, markerEnd: triangleMarker, strokeStyle: poleColour});
    svg.text(`A`, {x: center.x + minWh - 35, y: center.y + 20}, {strokeStyle: `none`, fillStyle: poleColour});
  }

  async updated() {
    this.renderSvg();
  }

  _pointerMove(ev: PointerEvent) {
    ev.preventDefault();
    const targetColour = this.palette.get(`accent-bold`, `yellow`);
    const angleColour = this.palette.get(`fg-dim`, `yellow`);

    const svg = Svg.makeHelper(this.shadowRoot.querySelector(`svg`));
    const w = svg.width;
    const h = svg.height;
    const center = {x: w / 2, y: h / 2};

    const ptr = {
      x: ev.offsetX,
      y: ev.offsetY
    }

    // Center to cursor line
    const lineToCursor = Lines.fromPoints(center, ptr);
    svg.line(lineToCursor, {
      strokeDash: `5`,
      strokeStyle: targetColour
    }, `#pointerRay`);
    const lineToCursorDistance = Lines.length(lineToCursor);

    // Draw point at cursor
    svg.circle({radius: 5, ...ptr}, {
      fillStyle: targetColour,
      strokeStyle: `none`
    }, `#targetCircle`);

    // Calculate angle
    const polar = Polar.fromCartesian(ptr, center);
    const polarAngleDeg = radianToDegree(polar.angleRadian);

    // Draw arc
    const rad = Math.PI * 2 - polar.angleRadian;
    let arc: Arcs.ArcPositioned = {
      endRadian: rad,
      startRadian: 0,
      radius: Math.min(100, lineToCursorDistance),
      ...center
    }
    let arcSvgOpts = {
      sweep: true,
      largeArc: rad > Math.PI ? false : true
    }
    if (Math.round(polarAngleDeg) !== 0) svg.path(Arcs.toSvg(arc, arcSvgOpts), {strokeStyle: angleColour}, `#arc`);

    // Update angle labels
    const labelStyle: Svg.TextDrawingOpts = {
      strokeStyle: `transparent`,
      fillStyle: targetColour,
      anchor: `middle`
    }

    svg.text(`(${Math.round(lineToCursorDistance)}, ${Math.floor(polarAngleDeg)}°)`, {x: ptr.x, y: ptr.y + 40}, labelStyle, `#coordLabel`);
  }

  render() {
    return html`
			<div id="container">
        <svg @pointermove="${this._pointerMove}" style="font-size: 1em" viewBox="0 0 ${this.width} ${this.height}" width=${this.width} height=${this.height}></svg>
			</div>
		`;
  }
}

customElements.define(tagName, PolarCoordsElement);