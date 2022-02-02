// Full Astro Configuration API Documentation:
// https://docs.astro.build/reference/configuration-reference
import {fileURLToPath} from 'url';
import {resolve, dirname} from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import alias from '@rollup/plugin-alias';


// @type-check enabled!
// VSCode and other TypeScript-enabled text editors will provide auto-completion,
// helpful tooltips, and warnings if your exported object is invalid.
// You can disable this by removing "@ts-check" and `@type` comments below.

// @ts-check
export default /** @type {import('astro').AstroUserConfig} */ ({
  dist: './docs/',
  buildOptions: {
    site: `https://clinth.github.io/ixfx/`
  },
  renderers: [
    // Enable the Preact renderer to support Preact JSX components.
    `@astrojs/renderer-preact`,
    // Enable the Preact renderer to support Preact JSX components.
    // Enable the React renderer, for the Algolia search component
    //`@astrojs/renderer-react`,
    `@astrojs/renderer-lit`
  ],
  vite: {
    build: {
      target: `esnext`
    },
    // resolve: {
    //   alias: {
    //     '~': () => {
    //       const base = resolve(dirname(fileURLToPath(import.meta.url)), `../src/`);
    //       console.log(base);
    //       return base;
    //     }
    //   }
    // },
    plugins: [
      tsconfigPaths({root: `../`}),
      alias({
        entries: [
          {find: `~/`, replacement: resolve(dirname(fileURLToPath(import.meta.url)), `../src/`)}
        ]
      }),
      nodeResolve({
        extensions: [`.js`, `.ts`]
      })
    ]
  }
});
