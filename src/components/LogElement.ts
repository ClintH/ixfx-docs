import {LitElement, html, css} from 'lit';
import {classMap} from 'lit/directives/class-map.js';
import {property} from 'lit/decorators.js';

import {Forms, resolveEl, log, Log} from 'ixfx/lib/dom';
import {elStyles} from './styles.js';

export const tagName = 'log-element';

export class LogElement extends LitElement {

  logger: Log | null;
  logContainer: HTMLElement | null;

  static styles = [
    elStyles,
    css`
    :host>div {
      display: flex;
    }
    #stream {
      // overflow-y: auto;
      flex-grow: 1;
      max-height: 15em;
    }
    #stream:not(.expanded) {
      max-height: 3.5em;
    }
    .toolbar.empty {
      display: none;
    }
    `
  ];
  @property({type: Boolean})
  declare expanded: boolean;

  constructor() {
    super();
    this.logger = null;
    this.logContainer = null;
  }

  init() {
    if (this.logContainer !== null) return;
    this.logContainer = this.shadowRoot.querySelector(`#stream`);
    if (this.logContainer === null) return;

    this.logger = log(this.logContainer, {
      minIntervalMs: 20,
      capacity: 150
    });
  }

  error(err: unknown) {
    this.init();
    if (this.logger !== null) {
      this.logger.error(err);
      this.updateLog();
    } else {
      console.error(err);
    }
  }

  clear() {
    if (this.logger !== null) {
      this.logger.clear();
      this.requestUpdate();
      this.updateLog();
    }
  }

  log(msg: string | number | object | undefined) {
    this.init();
    if (this.logger !== null) {
      this.logger.log(msg);
      this.updateLog();
    } else {
      console.log(msg);
    }
  }

  toggleExpand() {
    this.expanded = !this.expanded;
  }

  updateLog() {
    const toolbarEl = this.shadowRoot.querySelector(`.toolbar`);
    if (toolbarEl === null) return;
    if (this.isEmpty) {
      toolbarEl.classList.add(`empty`);
    } else {
      toolbarEl.classList.remove(`empty`);
    }
  }

  get isEmpty() {
    this.init();
    if (this.logger !== null) {
      return this.logger.isEmpty;
    }
    return true;
  }

  renderTools() {
    return html`
    <button title="${this.expanded ? `Collapse` : `Expand`} log" @click=${this.toggleExpand}> ${this.expanded ? `-` : `+`}</button>
    <button title="Clear log" @click=${this.clear}>C</button>
    `
  }

  render() {
    const classes = {expanded: this.expanded};
    return html`
      <div class=${classMap(classes)}>
        <div class=${classMap(classes)} id="stream"></div>
        <div class="toolbar empty vertical mini">
          ${this.renderTools()}
        </div>
      </div>
        `;
  }
}

customElements.define(tagName, LogElement);
