# ixfx-docs

This is the documentation for [ixfx](https://github.com/ClintH/ixfx). It uses [Astro](https://astro.build/) and [Lit](https://lit.dev/) components.

[View online](https://clinth.github.io/ixfx-docs/).

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

# Gotchas: Client-side code

## Approach 1: Heavy Astro file

For live demos of ixfx code, one option is demonstrated in data/collections/stack.md. An Astro component (StackVis.astro) is imported via the Markdown frontmatter. It can then be inserted into the document was a faux HTML tag.

StackVis.astro in turn consists of some HTML, and references, via SCRIPT tags a .ts file to provide interactivity. It must also reference any Lit elements used by the .ts file.

In the .ts file, interactivity is provided, and one can freely import from ixfx or elsewhere.