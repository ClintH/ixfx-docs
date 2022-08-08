/* eslint-disable */
import {LitElement, html, css} from 'lit';
import {property} from 'lit/decorators.js';
import {Circles, Lines, radianToDegree} from 'ixfx/lib/geometry';
import {themeChangeObservable} from 'ixfx/lib/dom';
import {Svg, Palette} from 'ixfx/lib/visual';
import {elStyles} from '../styles.js';

export const tagName = `angles-element`;

export class AnglesElement extends LitElement {
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
    this.width = 400;
    this.height = 400;

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

  lastCircle: Circles.CirclePositioned | undefined;

  renderSvg() {
    const svg = Svg.makeHelper(
      this.shadowRoot.querySelector(`svg`),
      {fillStyle: `transparent`}
    );

    svg.clear();
    const w = svg.width;
    const h = svg.height;

    let radius = svg.height * 0.30;
    let center = {x: w / 2, y: h / 2};
    const traceStyle = {
      strokeStyle: this.palette.get(`axis-color`, `orange`),
      strokeWidth: 3
    };
    const labelStyle: Svg.TextDrawingOpts = {
      strokeStyle: `transparent`,
      fillStyle: this.palette.get(`fgDim`, `orange`),
      anchor: `middle`,
      align: `hanging`
    };

    let c: Circles.CirclePositioned = {radius: radius, ...center};
    this.lastCircle = c;
    svg.circle(c, traceStyle);

    // let horiz = Lines.fromNumbers(0, center.y, w, center.y);
    // svg.line(horiz, traceStyle);

    // let vert = Lines.fromNumbers(center.x, 0, center.x, h);
    // svg.line(vert, traceStyle);

    const labelC = {...c, radius: radius + 20};

    const addRadian = (rad: number, label?: string, opts: Svg.TextDrawingOpts = labelStyle) => {
      if (label === undefined) label = rad.toString();
      const pt = Circles.point(labelC, rad);
      svg.text(label, {x: pt.x, y: pt.y}, opts);
    }

    addRadian(0, `0`, {...labelStyle, anchor: `start`, align: `middle`});
    addRadian(Math.PI, `Math.PI`, {...labelStyle, align: `middle`, anchor: `end`});
    addRadian(Math.PI / 2, `Math.PI/2`, {...labelStyle, align: `text-bottom`});
    addRadian(3 * Math.PI / 2, `3*Math.PI/2`, {...labelStyle, align: `hanging`});
  }

  async updated() {
    this.renderSvg();
  }

  _pointerMove(ev: PointerEvent) {
    const svg = Svg.makeHelper(this.shadowRoot.querySelector(`svg`));
    const ptr = {
      x: ev.offsetX,
      y: ev.offsetY
    }

    const c = this.lastCircle;
    if (c === undefined) return;

    const lineToCursor = Lines.fromPoints(c, ptr);
    const lineExtended = Lines.extendFromA(lineToCursor, 200);

    // Get intersections
    const intersections = Circles.intersectionLine(c, lineExtended);
    if (intersections.length !== 1) return;

    const inter = intersections[0];

    // Draw ray to intersection point
    const ray = Lines.extendFromA(Lines.fromPoints(c, inter), 10);
    svg.line(ray, {
      strokeWidth: 3,
      strokeStyle: this.palette.get(`accent-bold`, `yellow`)
    }, `#pointerRay`);

    // Compute radians
    const lineRad = Lines.angleRadian(ray) * -1;

    // Simplify radians
    let rad = Math.round((lineRad / Math.PI) * 100) / 100;
    if (rad < 0) rad = Math.abs(rad + 1) + 1;
    let radStr = ``;
    if (rad == 1) radStr = `π`;
    else if (rad == 0.17) radStr = `π/6`;
    else if (rad == 0.25) radStr = `π/4`
    else if (rad == 0.33) radStr = `π/3`
    else if (rad == 0.5) radStr = `π/2`;
    else if (rad == 0.58) radStr = `7π/12`;
    else if (rad == 0.6) radStr = `π/4`;
    else if (rad == 0.75) radStr = `3π/4`;
    else if (rad == 0.92) radStr = `11π/12`;
    else if (rad == 1.17) radStr = `7π/6`;
    else if (rad == 1.25) radStr = `5π/4`;
    else if (rad == 1.33) radStr = `4π/3`;
    else if (rad == 1.5) radStr = `3π/2`
    else if (rad == 1.58) radStr = `19π/12`;
    else if (rad == 1.75) radStr = `7π/4`;
    else if (rad == 1.92) radStr = `23π/12`;
    else if (rad == 0) radStr = `0 or 2π`;
    else radStr = `${rad.toFixed(2)}π`;

    // Compute degrees
    let deg = radianToDegree(lineRad);

    // Simplify degrees
    if (deg < 0) deg = Math.abs(deg + 180) + 180;
    const degStr = Math.round(deg);

    // Update labels
    const labelStyle: Svg.TextDrawingOpts = {
      strokeStyle: `transparent`,
      fillStyle: this.palette.get(`fgDim`, `black`),
      anchor: `middle`
    }
    svg.text(`Radians: ${radStr}`, {x: c.x, y: c.y}, labelStyle, `#radiansLabel`);
    svg.text(`Degrees: ${degStr}`, {x: c.x, y: c.y + 20}, labelStyle, `#degreesLabel`);
  }

  render() {
    return html`
			<div id="container">
        <svg @pointermove="${this._pointerMove}" style="font-size: 1em" viewBox="0 0 ${this.width} ${this.height}" width=${this.width} height=${this.height}></svg>
			</div>
		`;
  }
}

customElements.define(tagName, AnglesElement);