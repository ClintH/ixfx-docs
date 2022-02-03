// Full Astro Configuration API Documentation:
// https://docs.astro.build/reference/configuration-reference
import {fileURLToPath} from 'url';
import {resolve, dirname} from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import alias from '@rollup/plugin-alias';

// @ts-check
export default /** @type {import('astro').AstroUserConfig} */ ({
  dist: './docs/',
  buildOptions: {
    site: `https://clinth.github.io/ixfx-docs/`
  },
  renderers: [
    `@astrojs/renderer-preact`,
    `@astrojs/renderer-lit`
  ],
  vite: {
    build: {
      target: `esnext`,
      rollupOptions: {
        external: [
          'lit'
        ]
      }
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
      //tsconfigPaths({root: `../`}),
      // alias({
      //   entries: [
      //     {find: `~/`, replacement: resolve(dirname(fileURLToPath(import.meta.url)), `../src/`)}
      //   ]
      // }),
      nodeResolve({
        extensions: [`.js`, `.ts`]
      })
    ]
  }
});
