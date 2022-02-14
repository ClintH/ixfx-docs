/* eslint-disable */
import {LitElement, html, css} from 'lit';
import {property} from 'lit/decorators.js';
import {Circles, Arcs, Lines, Points, Polar, radianToDegree} from 'ixfx/lib/geometry';
import {themeChangeObservable} from 'ixfx/lib/dom';
import {Palette} from 'ixfx/lib/visual';
import * as Svg from 'ixfx/lib/svg';
import {elStyles} from './styles.js';

export const tagName = `cartesian-element`;

export class CartesianElement extends LitElement {
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
  `];

  @property()
  declare width: number;

  @property()
  declare height: number;

  origin: Points.Point;
  palette: Palette.Palette;
  constructor() {
    super();
    this.palette = Palette.create();
    this.palette.setElementBase(this);
    this.width = 500;
    this.height = 300;
    this.origin = {x: 10, y: 10};

    themeChangeObservable().subscribe(records => {
      this.updated();
    });
  }

  getBounds() {
    const svg = Svg.makeHelper(
      this.shadowRoot.querySelector(`svg`)
    );
    return {width: svg.width, height: svg.height};
  }

  renderSvg() {
    const origin = this.origin;
    const poleColour = `black`;
    const svg = Svg.makeHelper(
      this.shadowRoot.querySelector(`svg`),
      {fillStyle: `transparent`, strokeWidth: 3}
    );

    svg.clear();
    const w = svg.width;
    const h = svg.height - 40;

    Svg.Elements.grid(svg.parent, origin, 25, w, h);

    // Pole
    svg.circle({radius: 5, ...origin}, {fillStyle: poleColour, strokeStyle: `none`})
    svg.text('Origin', Points.sum(origin, 5, 20), {fillStyle: poleColour, strokeStyle: `none`});

    // Pole axis
    const triangleMarker = {
      id: `triangle`,
      fillStyle: poleColour
    }
    const labelOffset = 20;
    const poleAxisLineX = Lines.fromNumbers(origin.x, origin.y, origin.x + w - labelOffset, origin.y);
    svg.line(poleAxisLineX, {fillStyle: `none`, markerEnd: triangleMarker, strokeStyle: poleColour});
    svg.text(`X`, {x: origin.x + w - 45, y: origin.y + labelOffset}, {strokeStyle: `none`, fillStyle: poleColour});

    const poleAxisLineY = Lines.fromNumbers(origin.x, origin.y, origin.x, h);
    svg.line(poleAxisLineY, {fillStyle: `none`, markerEnd: triangleMarker, strokeStyle: poleColour});
    svg.text(`Y`, {x: origin.x + 10, y: origin.y + h - labelOffset - 10}, {strokeStyle: `none`, fillStyle: poleColour});

  }

  async updated() {
    this.renderSvg();
  }

  _pointerMove(ev: PointerEvent) {
    const targetColour = this.palette.get(`accent-bold`, `yellow`);
    const angleColour = this.palette.get(`fg-dim`, `yellow`);
    const origin = this.origin;

    const svg = Svg.makeHelper(this.shadowRoot.querySelector(`svg`));
    const w = svg.width;
    const h = svg.height;

    const ptr = {
      x: ev.offsetX,
      y: ev.offsetY
    }

    if (ptr.x < origin.x) ptr.x = origin.x;
    if (ptr.y < origin.y) ptr.y = origin.y

    // Origin to cursor line
    const lineToCursor = Lines.fromPoints(origin, ptr);
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

    // Coordinate label
    const labelStyle: Svg.TextDrawingOpts = {
      strokeStyle: `transparent`,
      fillStyle: targetColour,
      anchor: `middle`
    }
    svg.text(`(${Math.round(ptr.x - origin.x)}, ${Math.round(ptr.y - origin.y)})`,
      {x: ptr.x, y: ptr.y + 40},
      labelStyle,
      `#coordLabel`);
  }

  render() {
    return html`
      <div id="container">
      <svg @pointermove="${this._pointerMove}" style="font-size: 1em" viewBox="0 0 ${this.width} ${this.height}" width=${this.width} height=${this.height}> </svg>
        </div>
          `;
  }
}

customElements.define(tagName, CartesianElement);