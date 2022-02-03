# ixfx-docs

This is the documentation for [ixfx](https://github.com/ClintH/ixfx). It uses [Astro](https://astro.build/) and [Lit](https://lit.dev/) components.

## Developing

Run a live-reloading server for developing:

```
npm run dev
```

Use `npm run preview` to run a server using these files as a final check.

### Building

Build static files to `./docs`, ready for push to GH Pages:

```
npm run clean
npm run build
```

If necessary, API docs should be generated from ixfx repository and copied to `./docs/api/`.

(in ixfx repo)
```
npm run docs
```

Assuming `ixfx-docs` is a sibling directory to `ixfx`, ixfx package script can copy them:

(in ixfx repo)
```
npm run docs && npm run copyApiDocs
```