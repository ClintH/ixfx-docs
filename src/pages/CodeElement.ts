import {Text} from 'ixfx';
import {LitElement, html, css} from 'lit';
import {property} from 'lit/decorators.js';
import {Block} from 'typescript';
import {elStyles} from '../components/styles.js';

export const tagName = 'code-element';

type BlockResult = {
  msg: string,
  state: `` | `error` | `info`,
  keep: boolean
}

export class CodeElement extends LitElement {
  static readonly styles = [
    elStyles,
    css`
    :host {
      --font: Consolas, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", Monaco, "Courier New", Courier, monospace;
      --font-size: 1em;
    }
    #container {
      font-size: var(--font-size);
      font-family: var(--font);
      display: flex;
      flex-direction: row;
      flex-grow: 1;
      height:100%;
    }
    #left {
      display: flex;
      flex-grow: 1;
      min-width: 50vw;
    }
  
    #input {
      background-color: transparent;
      color: inherit;
      border: 0;
      font-family: var(--font);
      font-size: var(--font-size);
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0;
    }
    #input:focus {
      outline: none;
    }
    #right {
      flex-grow: 1;
      color: var(--fg-dim, gray);
    }

    #output {
      white-space: nowrap;
      overflow: hidden;
    }
    #output .error {
      color: var(--red, red);
    }
    #output .info {
      color: var(--blue, blue);
    }
    `
  ];

  @property({type: String})
  declare code: string;

  constructor() {
    super();
    console.log(location.search);
    const s = location.search;
    if (s) {
      try {
        this.code = atob(s.substring(1));
      } catch (e) {
        console.log(e);
        this.code = `let a = 1;a`;
      }
    } else {
      this.code = `let a = 1;a`;
    }
  }

  prettify(r: any): string {
    let msg = r;
    if (r === undefined) msg = `undef.`;
    else if (typeof r === `number`) {
      msg = r.toString();
    } else if (typeof r === `string`) {
      msg = `"${r}"`;
    } else if (typeof r === `object`) {
      msg = JSON.stringify(r);
    }
    return msg;
  }

  /**
   * Simple tokeniser
   * TODO: Use a proper parser like typescript or recast
   * https://astexplorer.net/
   * @param l Text
   * @returns 
   */
  statementBreaker(l: string): string[] {
    let blocks = [];
    let parenth = 0;
    let curlies = 0;
    let square = 0;
    let mark = 0;

    let backticked = false;
    let singleQuote = false;
    let doubleQuote = false;

    for (let i = 0; i < l.length; i++) {
      const c = l.charAt(i);
      const prevC = i > 0 ? l.charAt(i - 1) : ``;

      if (c === '`') {
        backticked = !backticked;
      } else if (backticked) continue;

      if (c === "'" && prevC !== "\\") {
        singleQuote = !singleQuote;
      } else if (singleQuote) continue;

      if (c === '"' && prevC !== "\\") {
        doubleQuote = !doubleQuote;
      } else if (doubleQuote) continue;

      if (c === `[`) square++;
      else if (c === '{') curlies++;
      else if (c === '(') parenth++;
      else if (c === ']') square--;
      else if (c === '}') curlies--;
      else if (c === ')') parenth--;
      else if (c === '\n' || c === '\r' || c === `;`) {
        // New line
        if (parenth || curlies || square) {
          // Ignore, because we're inside a region
        } else {
          // End of line
          blocks.push(l.substring(mark, i));
          mark = i + 1;
        }
      }
    }
    blocks.push(l.substring(mark, l.length));
    return blocks;
  }

  async importIntercept(l: string): Promise<BlockResult> {
    const skipReply: BlockResult = {msg: ``, state: ``, keep: false};

    // Find URI
    const uriDouble = Text.between(l, '"');
    const uriSingle = Text.between(l, "'");
    if (uriDouble === undefined && uriSingle === undefined) return skipReply;

    const uri = uriDouble ?? uriSingle;
    const importWhat = Text.between(l, '{', '}');
    if (importWhat === undefined) return skipReply;

    let importWhatSplit = importWhat.split(',');

    try {
      let module = await import(uri);
      const keys = Object.keys(module);

      keys.forEach(k => {
        if (importWhatSplit.includes(k)) {
          window[k] = module[k];
        } else {
          //console.warn(`Skipping from imported module: ${k}`);
        }
      });
      return {msg: `(imported)`, keep: false, state: `info`};
    } catch (ex) {
      return {msg: ex.toString(), state: `error`, keep: false}
    }
  }

  /**
   * Executes a block of code: a statement, or a block like a function or loop
   * 
   * TODO: Ideally it steps through lines within a function
   * @param block 
   * @param prior 
   */
  async block(block: string, prior: string): Promise<BlockResult> {
    let result: BlockResult = {msg: `&nbsp;`, state: ``, keep: false};
    let l = block.trim();

    const isDeclaration = (l.startsWith(`let `) || l.startsWith(`const `) || l.startsWith(`var `));

    if (l.length == 0 || l.startsWith('//')) return result;

    try {
      if (l.startsWith(`import `)) return await this.importIntercept(l);

      const js = prior + `;\n` + l;

      const r = eval(js);
      if (!isDeclaration) result = {msg: this.prettify(r), state: ``, keep: true};
      result.keep = true;

    } catch (ex) {
      result = {keep: false, msg: ex.toString(), state: `error`};
    }
    return result;
  }

  async _codeChange(evt) {
    const txt = (evt.target as HTMLTextAreaElement).value;
    const output = this.shadowRoot.getElementById(`output`);

    const blocks = this.statementBreaker(txt);
    const results = [];
    let prior = ``;

    for (let i = 0; i < blocks.length; i++) {
      const r = await this.block(blocks[i], prior);
      results.push(r);
      if (r.keep) prior += blocks[i] + ';\n';
    }

    const resultsHtml = results.map(b => `<div title="${b.msg}" class="${b.state}">${b.msg}</div>`)
    output.innerHTML = resultsHtml.join('\n');


    let enc = btoa(txt); //Buffer.from(txt.substring(1), `base64`).toString();
    console.log(enc);
    location.search = enc;
  }

  _codeChangeImpl(evt) {
    this._codeChange(evt);
  }

  _onRightMouseUp(evt: Event) {
    //evt.preventDefault();
    //evt.stopPropagation();
    // this.shadowRoot.getElementById(`input`).focus();
  }

  _onKeyDown(evt: Event) {
  }

  render() {
    return html`
    <div @keyup="${this._onKeyDown}" @keydown="${this._onKeyDown}" id="container">
      <div id="left">
        <textarea spellcheck="false" @input="${this._codeChangeImpl}" id="input">${this.code}</textarea>
      </div>
      <div @mouseup="${this._onRightMouseUp}" id="right">
        <div id="output">
          Some output
        </div>
      </div>
    </div>
		`;
  }
}

customElements.define(tagName, CodeElement);
