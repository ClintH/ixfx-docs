
import { fromText } from '@clinth/repl-pad/dist/link.js';
import { afterMatch, beforeMatch } from 'ixfx/lib/text';

type Block = {
  el: HTMLElement
  group: string
  markerEl: HTMLElement
  src: string
  uri: string
}

type Group = {
  name: string
  src: string
  blocks: Block[]
  uri: string
}

/**
 * Looks for pretty-formatted code blocks that originated in Markdown.
 * 
 * If the source block has the comment // repl-pad it will be have an sketch pad link created.
 * 
 * ```
 * <pre class="language-js">
 *  <code>
 *    <span class="token comment">// repl-pad</span>
 *    ...
 *  </code>
 * </pre>
 * ```
 * 
 * If repl-pad is followed with '#' the text up until a space is considered the group name for code.
 * Eg: `// repl-pad#hello` associates snippet with group `hello`. Groups use a common repl-pad URI,
 * and code is concatenated. This allows snippets to be interspersed in Markdown source, but unified
 * in the repl-pad.
 * TODO: This should be a build-time process instead of at run-time. Might need to be a remark plugin?
 * @returns 
 */
export const preBlocks = (): void => {
  const localhost = window.location.hostname === `localhost` || window.location.hostname === `127.0.0.1`;
  const baseUri = localhost ? '/pad/index.html' : '/ixfx-docs/pad/index.html';
  const els = document.querySelectorAll(`pre>code`);
  const marker = '// repl-pad';
  const blocks: Block[] = [];

  // First scan for blocks
  for (const el of els) {
    // Check for marker
    const firstChild = el.children.item(0) as HTMLElement;
    let firstLine = firstChild.innerText;
    if (!firstLine.startsWith(marker)) continue;

    // Is it part of a group?
    const withoutMarker = firstLine.substring(marker.length);
    let group = '';
    if (withoutMarker.length > 0) {
      // repl-pad#1
      if (withoutMarker.startsWith(`#`)) {
        // Get group id, eg '1'
        group = afterMatch(withoutMarker, '#', { fallback: `1` });
      }
    }

    const b = {
      group,
      uri: ``,
      el: el as HTMLElement,
      markerEl: firstChild,
      src: (el as HTMLElement).innerText.substring(firstLine.length)
    };
    blocks.push(b);
  }

  // Aggregate groups
  const groups = new Map<string, Group>();
  for (const b of blocks) {
    if (b.group.length > 0) {
      let group = groups.get(b.group);
      if (group === undefined) {
        group = { blocks: [], name: b.group, src: ``, uri: `` }
        groups.set(b.group, group);
      }
      group.blocks.push(b);
      group.src += b.src.trim() + '\n\n';
    }
  }

  for (const b of blocks) {
    if (b.group.length > 0) {
      const g = groups.get(b.group);

      // Assign URI for group if not yet done
      if (g.uri.length === 0) {
        g.uri = fromText(g.src.trim(), baseUri);
      }

      // Use group URI for block
      b.uri = g.uri;
    } else {
      // Not associated with a group
      b.uri = fromText(b.src.trim(), baseUri);
    }

    b.markerEl.innerHTML = `<a style="color: var(--yellow)">//</span> <a title="Open in repl-pad" style="font-weight:bold; color: var(--yellow)" href="${ b.uri }">repl-pad</a>`;
  }
}

preBlocks();
