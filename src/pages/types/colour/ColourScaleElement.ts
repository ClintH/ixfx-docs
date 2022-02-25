import {LitElement, html, css} from 'lit';
import {property} from 'lit/decorators.js';
import {elStyles} from '../../../components/styles.js';
import {Colour} from 'ixfx/lib/visual';
import {interpolate} from 'ixfx';

export const tagName = 'colourscale-element';

export class ColourScaleElement extends LitElement {
  static readonly styles = [
    elStyles,
    css`
    .stop {
      width: 5em;
      height: 5em;
      border: 1px solid black;
    }
    .swatch {
      height: 5em;
      flex-grow: 1
    }
    .steps {
      display: flex;
      flex-wrap: wrap;
      border: 1px solid black;
    }
    .spaces h1 {
        font-size: 1em;
      }
    }
    .controls .vertical {
      align-items: left;
    }
    `
  ];

  @property({type: Number})
  declare steps: number;

  @property({type: Number})
  declare width: number;

  @property({type: String})
  declare colourSpace: string;

  @property({type: String})
  declare fromColour: string;

  @property({type: String})
  declare toColour: string;

  constructor() {
    super();
    this.width = 200;
    this.steps = 5;
    this.colourSpace = `hsl`;
    this.fromColour = `rgb(129,254,233)`;//`hsl(0, 100%, 50%)`;
    this.toColour = `rgb(246,110,255)`; // `hsl(300, 100%, 50%)`;
  }

  renderSteps(space: Colour.Spaces) {
    const steps = Math.max(2, this.steps);
    const opts: Colour.InterpolationOpts = {
      space: space,
    }
    const colours = Colour.scale(steps, opts, this.fromColour, this.toColour);
    const coloursHtml = colours.map((c, i) => html`<div title="${c} - Step ${i}/${steps}" class="swatch" style="background-color: ${c}"></div>`)
    return html`<div class="space"><h1>${space}</h1>
    <div class="steps">${coloursHtml}</div>`
  }

  stepsUpdate(ev) {
    this.steps = parseInt((ev.target as HTMLInputElement).value);
  }

  fromColourUpdate(ev) {
    this.fromColour = (ev.target as HTMLInputElement).value;
  }

  toColourUpdate(ev) {
    this.toColour = (ev.target as HTMLInputElement).value;
  }

  render() {
    const stops = [this.fromColour, this.toColour];
    return html`
      <div class="toolbar controls">
        <div class="vertical">
          <label for="stepsRange">Steps:</label>
          <input @input=${this.stepsUpdate} type="number" min="2" max="500" value=${this.steps} id="stepsRange">
        </div>
        <div class="vertical">
          <label for="fromColour">From</label>
          <input @input=${this.fromColourUpdate} type="color" id="fromColour" value=${Colour.toHex(this.fromColour)}>
        </div>
        <div class="vertical">
          <label for="toColour">To</label>
          <input @input=${this.toColourUpdate} type="color" id="toColour" value=${Colour.toHex(this.toColour)}>
        </div>

      </div>
			<div class="spaces">
        ${this.renderSteps(`rgb`)}
        ${this.renderSteps(`cubehelix`)}
        ${this.renderSteps(`hsl`)}
        ${this.renderSteps(`lab`)}
        ${this.renderSteps(`hcl`)}

      </div>
		`;
  }
}

customElements.define(tagName, ColourScaleElement);
