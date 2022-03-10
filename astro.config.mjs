// Full Astro Configuration API Documentation:
// https://docs.astro.build/reference/configuration-reference
import {nodeResolve} from '@rollup/plugin-node-resolve';

// @ts-check
export default /** @type {import('astro').AstroUserConfig} */ ({
  dist: './docs/',
  buildOptions: {
    site: `https://clinth.github.io/ixfx-docs/`
  },
  markdownOptions: {
    render: [
      `@astrojs/markdown-remark`,
      {
        remarkPlugins: [[`remark-gfm`, {behavior: `prepend`}]]
      }
    ]
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
    plugins: [
      nodeResolve({
        extensions: [`.js`, `.ts`]
      })
    ]
  }
});
