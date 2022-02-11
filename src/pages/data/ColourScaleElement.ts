import {LitElement, html, css} from 'lit';
import {property} from 'lit/decorators.js';
import {elStyles} from '../../components/styles.js';
import {Colour} from 'ixfx/lib/visual';

export const tagName = 'colourscale-element';

export class ColourScaleElement extends LitElement {
  static readonly styles = [
    elStyles,
    css``
  ];

  @property({type: Number})
  declare height: number;

  @property({type: Number})
  declare width: number;

  @property({type: String})
  declare colourSpace: string;

  constructor() {
    super();
    this.width = 200;
    this.height = 50;
    this.colourSpace = `hsl`;
  }

  drawGradient() {
    const el = this.shadowRoot.getElementById(`plot`) as HTMLCanvasElement;
    const ctx = el.getContext(`2d`);

    const height = this.height;
    const width = this.width;
    const steps = 50;
    const pxPerStep = width / steps;
    const amtPerStep = 1 / steps;
    const colourSpace = Colour.getColourSpace(this.colourSpace);

    const start = {h: 345, s: 1, l: 0.5}; //Colour.getNamed(`red`);
    const end = {h: 134, s: 1, l: 0.5};//Colour.getNamed(`blue`);
    let amt = 0;
    let x = 0;
    ctx.fillStyle = `purple`;
    ctx.fillRect(0, 0, this.width, height);

    console.log(`amt: ${amtPerStep} px: ${pxPerStep}`);

    for (let i = 0; i < steps; i++) {
      const colour = colourSpace.lerp(amt, start, end);
      const colourCss = colourSpace.toCss(colour);
      console.log(`amt: ${amt} css: ${colourCss}`);
      ctx.fillStyle = colourCss;
      ctx.fillRect(x, 0, pxPerStep, height);
      amt += amtPerStep;
      x += pxPerStep;
    }
  }

  async updated() {
    this.drawGradient();
  }

  render() {
    return html`
			<div class="container">     
        <canvas width="${this.width}" height="${this.height}" id="plot" />
			</div>
		`;
  }
}

customElements.define(tagName, ColourScaleElement);
