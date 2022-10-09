/* eslint-disable */
import {LitElement, html, css} from 'lit';
import {property} from 'lit/decorators.js';
import {Circles, Arcs, Lines, Points, Polar, Vectors, radianToDegree} from 'ixfx/lib/geometry';
import {themeChangeObservable, DragDrop} from 'ixfx/lib/dom';
import {Palette} from 'ixfx/lib/visual';
import * as Svg from 'ixfx/lib/svg';
import {elStyles} from '../styles.js';

export const tagName = `vector-element`;

export class VectorElement extends LitElement {
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
      .drag-sel {
        outline: 2px solid pink;
      }
  `];

  @property()
  declare width: number;

  @property()
  declare height: number;

  origin: Points.Point;
  pointB: Points.Point;
  pointA: Points.Point;
  palette: Palette.Palette;

  dragDisposePtA: any;
  dragDisposePtB: any;

  constructor() {
    super();
    this.palette = Palette.create();
    this.palette.setElementBase(this);
    this.width = 300;
    this.height = 300;
    this.origin = {x: 150, y: 150};
    this.pointA = {x: 150, y: 100};
    this.pointB = {x: 200, y: 200}

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

  titledPoint(svg: Svg.SvgHelper, id: string, pt: Points.Point, title: string, hidden = false) {
    //const svg = Svg.makeHelper(this.shadowRoot.querySelector(`svg`));
    const poleColour = this.palette.get(`fgDim`, `black`);
    const radius = hidden ? 10 : 5;
    const elem = svg.circle(
      {radius, ...pt},
      {fillStyle: hidden ? `transparent` : poleColour, strokeStyle: `none`},
      `#${id}`
    );

    // Ideally a layout function to determine text pos
    // pos = radialLayout(pt, { dist: [5, 10], angle: 45, bounds: { ... }})
    // need to be able to prefer certain angles. In this case, want to indicate
    // that text should be on the outside of line. Label A away from the angle of A-B, for example.
    svg.text(
      title,
      Points.sum(pt, 5, 20),
      {fillStyle: poleColour, userSelect: false, strokeStyle: `none`},
      `#${id}-label`
    );

    return elem;
  }

  updatePoints(svg: Svg.SvgHelper, a: Points.Point = this.pointA, b: Points.Point = this.pointB) {
    this.pointA = a;
    this.pointB = b;

    const line = {a: a, b: b};
    const vectorPolar = Vectors.fromLinePolar(line);
    const vectorCartesian = Vectors.fromLineCartesian(line);

    const event = new CustomEvent(`vector-change`, {
      detail: {
        a: this.pointA,
        b: this.pointB,
        polar: vectorPolar,
        cartesian: vectorCartesian,
        angleDeg: radianToDegree(vectorPolar.angleRadian)
      }
    });
    this.dispatchEvent(event);

    const poleColour = this.palette.get(`fgDim`, `black`);
    //const textColour = this.palette.get(`fg`, `gray`);

    const triangleMarker2 = {
      id: `triangle`,
      fillStyle: poleColour,
      strokeWidth: 0
    }

    // Edge connecting A and B
    const edge = svg.line(line, {
      markerEnd: triangleMarker2,
      strokeStyle: poleColour, strokeWidth: 4
    }, `#line-a-b`);

    const pointB = this.titledPoint(svg, `point-b`, b, `B ${Points.toString(b, 0)}`, true);
    const pointA = this.titledPoint(svg, `point-a`, a, `A ${Points.toString(a, 0)}`);

    // Line to y-axis
    const lineToY = {a: {x: b.x, y: a.y}, b: b}
    svg.line(lineToY, {strokeDash: `4`, strokeWidth: 2, strokeStyle: poleColour}, `#line-to-y`);

    // Line to x-axis
    const lineToX = {a: {x: b.x, y: a.y}, b: a}
    svg.line(lineToX, {strokeDash: `4`, strokeWidth: 2, strokeStyle: poleColour}, `#line-to-x`);

    return {pointB, pointA, edge};
  }

  renderSvg() {
    if (this.dragDisposePtA !== undefined) this.dragDisposePtA();
    if (this.dragDisposePtB !== undefined) this.dragDisposePtB();

    const me = this;
    const origin = this.origin;
    const poleColour = this.palette.get(`fgDim`, `black`);

    const svg = Svg.makeHelper(this.shadowRoot.querySelector(`svg`));

    svg.clear();
    const arrowPadding = 15;
    const w = svg.width;
    const h = svg.height;

    Svg.Elements.grid(svg.parent, origin, 25, w, h, {strokeWidth: 2, opacity: 0.3});

    // Pole axis
    const triangleMarker = {
      id: `triangle`,
      fillStyle: poleColour,
      strokeWidth: 2
    }

    // X axis
    const poleAxisLineX = Lines.fromNumbers(arrowPadding, origin.y, w - arrowPadding, origin.y);
    svg.line(poleAxisLineX, {
      fillStyle: `none`,
      markerEnd: triangleMarker,
      markerStart: triangleMarker,
      strokeWidth: 3,
      strokeStyle: poleColour,
      opacity: 0.3
    });
    svg.text(`X`, {x: w - arrowPadding, y: origin.y + 20}, {strokeStyle: `none`, fillStyle: poleColour});

    // Y axis
    const poleAxisLineY = Lines.fromNumbers(origin.x, arrowPadding, origin.x, h - arrowPadding);
    svg.line(poleAxisLineY, {
      fillStyle: `none`,
      markerEnd: triangleMarker,
      markerStart: triangleMarker,
      strokeWidth: 3,
      strokeStyle: poleColour,
      opacity: 0.3
    });
    svg.text(`Y`, {x: origin.x + 15, y: arrowPadding + 5}, {strokeStyle: `none`, fillStyle: poleColour});

    const {pointA, pointB} = this.updatePoints(svg);

    this.dragDisposePtA = DragDrop.draggable(pointB, {
      abort(reason, state) {

      },
      progress(state) {
        const token = state.token as Points.Point;
        me.updatePoints(svg, undefined, {
          x: token.x + state.delta.x,
          y: token.y + state.delta.y
        });
        return true;
      },
      start() {
        return {allow: true, token: me.pointB}
      },
      success() {

      }
    });

    this.dragDisposePtB = DragDrop.draggable(pointA, {
      progress(state) {
        const token = state.token as Points.Point;
        me.updatePoints(svg, {
          x: token.x + state.delta.x,
          y: token.y + state.delta.y
        });
        return true;
      },
      start() {
        return {allow: true, token: me.pointA}
      },
    })
    // A point
    //const pointA = svg.circle({radius: 5, ...this.pointA}, {fillStyle: poleColour, strokeStyle: `none`});
    //svg.text('A', Points.sum(origin, 5, 20), {fillStyle: poleColour, strokeStyle: `none`});


  }

  async updated() {
    this.renderSvg();
  }

  /*
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
*/
  render() {
    return html`
      <div id="container">
      <svg style="font-size: 1em" viewBox="0 0 ${this.width} ${this.height}" width=${this.width} height=${this.height}> </svg>
        </div>
          `;
  }
}

customElements.define(tagName, VectorElement);